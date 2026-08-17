import { createHash } from "node:crypto";
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

  await fs.mkdir(path.dirname(workingFile), { recursive: true });
  await fs.writeFile(workingFile, restoredContent, "utf8");
}

function resolveTaskFile(taskDir, relativePath, label) {
  if (typeof relativePath !== "string" || relativePath.trim().length === 0) {
    throw new Error(`${label} must be a non-empty task-relative path.`);
  }

  const resolvedPath = path.resolve(taskDir, relativePath);
  const taskRelativePath = path.relative(taskDir, resolvedPath);

  if (
    taskRelativePath === "" ||
    taskRelativePath.startsWith("..") ||
    path.isAbsolute(taskRelativePath)
  ) {
    throw new Error(`${label} must stay inside the task directory.`);
  }

  return resolvedPath;
}

async function readScaffoldFiles(taskDir) {
  const manifestPath = path.join(taskDir, "scaffold.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

  if (manifest?.schemaVersion !== 1) {
    throw new Error("scaffold.json schemaVersion must be 1.");
  }

  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    throw new Error("scaffold.json files must be a non-empty array.");
  }

  const manifestPaths = new Set();
  const files = [];

  for (const [index, entry] of manifest.files.entries()) {
    const label = `scaffold.json files[${index}]`;

    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error(`${label} must be an object.`);
    }

    const workingFile = resolveTaskFile(taskDir, entry.working, `${label} working`);
    const snapshotFile = resolveTaskFile(
      taskDir,
      entry.snapshot,
      `${label} snapshot`,
    );

    if (workingFile === snapshotFile) {
      throw new Error(`${label} working and snapshot paths must differ.`);
    }

    if (manifestPaths.has(workingFile) || manifestPaths.has(snapshotFile)) {
      throw new Error(`${label} reuses a working or snapshot file path.`);
    }
    manifestPaths.add(workingFile);
    manifestPaths.add(snapshotFile);

    if (!/^[a-f0-9]{64}$/.test(entry.sha256 ?? "")) {
      throw new Error(`${label} sha256 must be a lowercase 64-character hash.`);
    }

    const snapshotContent = await fs.readFile(snapshotFile);
    const actualHash = createHash("sha256").update(snapshotContent).digest("hex");

    if (actualHash !== entry.sha256) {
      throw new Error(
        `${label} snapshot hash mismatch for ${entry.snapshot}; reset stopped before changing working files.`,
      );
    }

    files.push({ workingFile, snapshotFile });
  }

  const mainEntries = manifest.files.filter((entry) =>
    ["main.ts", "main.tsx"].includes(entry.working),
  );

  if (mainEntries.length !== 1) {
    throw new Error(
      "scaffold.json must contain exactly one main.ts or main.tsx working entry.",
    );
  }

  return files;
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
    activeQuestionId: null,
    questions: [],
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
    attempt.questions.length > 0 ||
    attempt.stages.some((stage) => stage.checkpoint !== null)
  );
}

function closePendingQuestionForReset(attempt, timestamp) {
  const pendingQuestion = attempt.questions.find(
    (question) => question.status === "pending",
  );

  if (pendingQuestion) {
    pendingQuestion.status = "declined";
    pendingQuestion.resolvedAt = timestamp;
    pendingQuestion.evidence =
      "The attempt was reset before the question was answered.";
  }

  attempt.activeQuestionId = null;
}

async function resetSession(taskDir) {
  const sessionFile = path.join(taskDir, "session.json");
  const session = JSON.parse(await fs.readFile(sessionFile, "utf8"));

  if (session.schemaVersion !== 2) {
    throw new Error("session.json schemaVersion must be 2 before reset.");
  }
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
    closePendingQuestionForReset(activeAttempt, timestamp);

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
  const scaffoldFiles = await readScaffoldFiles(taskDir);

  for (const { snapshotFile, workingFile } of scaffoldFiles) {
    await restoreWorkingFile(snapshotFile, workingFile);
    console.log(
      `Restored ${path.relative(ROOT, workingFile)} from ${path.relative(ROOT, snapshotFile)}.`,
    );
  }

  await removeReview(taskDir);
  await resetSession(taskDir);
  await finalizeTasks();
}

void main();
