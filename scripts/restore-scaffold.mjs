import { promises as fs } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const TASKS_ROOT = path.join(ROOT, "tasks");

function getTargetTaskDir() {
  const input = process.argv[2];

  if (!input) {
    throw new Error(
      "Missing task directory argument. Usage: npm run restore:scaffold -- tasks/<category>/<slug>",
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

function nowUtc() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
}

function createFreshAttempt(id, number, createdAt, previousStages) {
  return {
    id,
    number,
    status: "ready",
    createdAt,
    startedAt: null,
    endedAt: null,
    activeStageId: "core",
    activeQuestion: null,
    stages: previousStages.map((stage) => ({
      id: stage.id,
      kind: stage.kind,
      title: stage.title,
      status: stage.id === "core" ? "available" : "locked",
      adaptation: null,
      skipReason: null,
      checkpoint: null,
    })),
    coachEvents: [],
    review: null,
  };
}

function hasMeaningfulEvidence(attempt) {
  return (
    attempt.review !== null ||
    attempt.coachEvents.length > 0 ||
    attempt.stages.some((stage) => stage.checkpoint !== null)
  );
}

async function resetSession(taskDir) {
  const sessionFile = path.join(taskDir, "session.json");
  const session = JSON.parse(await fs.readFile(sessionFile, "utf8"));
  const activeIndex = session.attempts.findIndex(
    (attempt) => attempt.id === session.activeAttemptId,
  );

  if (activeIndex === -1) {
    throw new Error("session.json activeAttemptId does not reference an attempt.");
  }

  const activeAttempt = session.attempts[activeIndex];
  const timestamp = nowUtc();

  if (hasMeaningfulEvidence(activeAttempt)) {
    activeAttempt.status = "reset";
    activeAttempt.endedAt = timestamp;
    activeAttempt.activeStageId = null;
    activeAttempt.activeQuestion = null;

    const number = session.attempts.length + 1;
    const nextAttempt = createFreshAttempt(
      `attempt-${number}`,
      number,
      timestamp,
      activeAttempt.stages,
    );
    session.attempts.push(nextAttempt);
    session.activeAttemptId = nextAttempt.id;
    console.log(`Archived ${activeAttempt.id} and created ${nextAttempt.id}.`);
  } else {
    session.attempts[activeIndex] = createFreshAttempt(
      activeAttempt.id,
      activeAttempt.number,
      timestamp,
      activeAttempt.stages,
    );
    console.log(`Reinitialized empty ${activeAttempt.id}.`);
  }

  await fs.writeFile(sessionFile, `${JSON.stringify(session, null, 2)}\n`, "utf8");
}

async function finalizeTasks() {
  const executable = process.platform === "win32" ? "npm.cmd" : "npm";

  await new Promise((resolve, reject) => {
    const child = spawn(executable, ["run", "finalize:tasks"], {
      cwd: ROOT,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`npm run finalize:tasks exited with code ${code}.`));
    });
  });
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
  await resetSession(taskDir);
  await finalizeTasks();
}

void main();
