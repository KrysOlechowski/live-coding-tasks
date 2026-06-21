import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TASKS_ROOT = path.join(ROOT, "tasks");
const TOPICS_FILE = path.join(ROOT, "gpt", "gpt_topics.md");

function getTargetTaskDir() {
  const input = process.argv[2];

  if (!input) {
    throw new Error(
      "Missing task directory argument. Usage: npm run restore:scaffold -- tasks/<category>/<slug>\nRestores the working file, removes review.md, resets topic status to generated, then requires npm run finalize:tasks.",
    );
  }

  const taskDir = path.resolve(ROOT, input);
  const relativeTaskDir = path.relative(TASKS_ROOT, taskDir);

  if (
    relativeTaskDir.startsWith("..") ||
    path.isAbsolute(relativeTaskDir) ||
    relativeTaskDir.split(path.sep).length !== 2
  ) {
    throw new Error("Task directory must match tasks/<category>/<slug>.");
  }

  return taskDir;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function stripLeadingScaffoldSuppressions(content, workingFile) {
  const hasByteOrderMark = content.startsWith("\uFEFF");
  let nextContent = hasByteOrderMark ? content.slice(1) : content;
  const isTypeScript = [".ts", ".tsx"].includes(path.extname(workingFile));
  let removedSuppression = false;

  while (true) {
    const leadingComment = nextContent.match(
      /^([ \t\r\n]*)(\/\/[^\r\n]*(?:\r?\n|$)|\/\*[\s\S]*?\*\/(?:[ \t]*(?:\r?\n|$))?)/,
    );

    if (!leadingComment) {
      break;
    }

    const comment = leadingComment[2];
    const isTypeScriptNoCheck =
      isTypeScript && /^\/\/\s*@ts-nocheck(?:\s|$)/.test(comment.trimEnd());
    const isScaffoldOnly = /scaffold-only/i.test(comment);

    if (!isTypeScriptNoCheck && !isScaffoldOnly) {
      break;
    }

    nextContent = nextContent.slice(leadingComment[0].length);
    removedSuppression = true;
  }

  if (removedSuppression) {
    nextContent = nextContent.replace(/^(?:[ \t]*\r?\n)+/, "");
  }

  return `${hasByteOrderMark ? "\uFEFF" : ""}${nextContent}`;
}

async function restoreWorkingFile(scaffoldFile, workingFile) {
  const scaffoldContent = await fs.readFile(scaffoldFile, "utf8");
  const restoredContent = stripLeadingScaffoldSuppressions(
    scaffoldContent,
    workingFile,
  );

  await fs.writeFile(workingFile, restoredContent, "utf8");
}

async function removeReview(taskDir) {
  const reviewFile = path.join(taskDir, "review.md");

  try {
    await fs.unlink(reviewFile);
    console.log(`Removed ${path.relative(ROOT, reviewFile)}.`);
  } catch (error) {
    if (error?.code === "ENOENT") {
      console.log(`No review found at ${path.relative(ROOT, reviewFile)}.`);
      return;
    }

    throw error;
  }
}

async function resetTopicStatus(taskDir) {
  const slug = path.basename(taskDir);
  const topics = await fs.readFile(TOPICS_FILE, "utf8");
  let updated = false;

  const nextTopics = topics
    .split("\n")
    .map((line) => {
      if (!line.startsWith("|")) {
        return line;
      }

      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());

      if (cells.length !== 8 || cells[0] !== slug) {
        return line;
      }

      cells[6] = "generated";
      cells[7] = "-";
      updated = true;
      return `| ${cells.join(" | ")} |`;
    })
    .join("\n");

  if (!updated) {
    console.log(`No topic history row found for ${slug}.`);
    return;
  }

  await fs.writeFile(TOPICS_FILE, nextTopics, "utf8");
  console.log(`Reset ${slug} topic status to generated.`);
}

async function main() {
  const taskDir = getTargetTaskDir();
  const scaffoldTsx = path.join(taskDir, "main.scaffold.tsx");
  const scaffoldTs = path.join(taskDir, "main.scaffold.ts");
  const mainTsx = path.join(taskDir, "main.tsx");
  const mainTs = path.join(taskDir, "main.ts");
  let restoredFile;

  if (await exists(scaffoldTsx)) {
    await restoreWorkingFile(scaffoldTsx, mainTsx);
    restoredFile = mainTsx;
  } else if (await exists(scaffoldTs)) {
    await restoreWorkingFile(scaffoldTs, mainTs);
    restoredFile = mainTs;
  } else {
    throw new Error(
      `No scaffold snapshot found in ${path.relative(ROOT, taskDir)}. Expected main.scaffold.tsx or main.scaffold.ts.`,
    );
  }

  console.log(`Restored ${path.relative(ROOT, restoredFile)} from scaffold snapshot.`);
  await removeReview(taskDir);
  await resetTopicStatus(taskDir);
  console.log("Run npm run finalize:tasks to refresh generated metadata.");
}

void main();
