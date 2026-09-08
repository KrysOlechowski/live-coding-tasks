import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const TESTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_ROOT = path.resolve(TESTS_DIR, "../..");
const FIXTURE_PATHS = [
  "package.json",
  "scripts",
  "tasks",
  "data",
  "chatgpt",
  "src/lib",
];

async function createFixture(t) {
  const fixtureRoot = await fs.mkdtemp(
    path.join(os.tmpdir(), "live-coding-workflow-"),
  );

  t.after(async () => {
    await fs.rm(fixtureRoot, { recursive: true, force: true });
  });

  for (const relativePath of FIXTURE_PATHS) {
    await fs.cp(
      path.join(SOURCE_ROOT, relativePath),
      path.join(fixtureRoot, relativePath),
      { recursive: true },
    );
  }

  return fixtureRoot;
}

async function runNode(root, script, args = []) {
  return execFileAsync(process.execPath, [script, ...args], {
    cwd: root,
    maxBuffer: 10 * 1024 * 1024,
  });
}

test("the current task repository passes contract validation", async () => {
  const { stdout } = await runNode(
    SOURCE_ROOT,
    "scripts/validate-tasks.mjs",
  );

  assert.match(stdout, /Validated [1-9]\d* task folder\(s\)/);
});

test("validation rejects an active question ID without a pending question", async (t) => {
  const fixtureRoot = await createFixture(t);
  const sessionPath = path.join(
    fixtureRoot,
    "tasks/react/fix-cart-summary-state/session.json",
  );
  const session = JSON.parse(await fs.readFile(sessionPath, "utf8"));
  session.attempts.at(-1).activeQuestionId = "missing-question";
  await fs.writeFile(sessionPath, `${JSON.stringify(session, null, 2)}\n`);

  await assert.rejects(
    runNode(fixtureRoot, "scripts/validate-tasks.mjs"),
    (error) => {
      assert.match(error.stderr, /activeQuestionId must be null without a pending question/);
      return true;
    },
  );
});

test("validation rejects an unexpectedly changed scaffold snapshot", async (t) => {
  const fixtureRoot = await createFixture(t);
  const snapshotPath = path.join(
    fixtureRoot,
    "tasks/typescript/model-process-state-with-discriminated-union/main.scaffold.ts",
  );
  await fs.appendFile(snapshotPath, "\n// accidental snapshot edit\n");

  await assert.rejects(
    runNode(fixtureRoot, "scripts/validate-tasks.mjs"),
    (error) => {
      assert.match(error.stderr, /snapshot hash mismatch/);
      return true;
    },
  );
});

test("an incomplete checkpoint survives implementation and checkpoint retries", async (t) => {
  const fixtureRoot = await createFixture(t);
  const sessionPath = path.join(
    fixtureRoot,
    "tasks/algorithms/compare-product-snapshots/session.json",
  );
  const session = JSON.parse(await fs.readFile(sessionPath, "utf8"));
  const attempt = session.attempts.find((item) => item.id === session.activeAttemptId);
  attempt.status = "in-progress";
  attempt.activeStageId = "core";
  attempt.activeQuestionId = null;
  attempt.questions = [];
  attempt.review = null;
  attempt.endedAt = null;
  attempt.startedAt = attempt.createdAt;
  const core = attempt.stages[0];
  core.checkpoint = {
    recordedAt: attempt.createdAt,
    outcome: "incomplete",
    observations: ["A required behavior remains unfinished."],
    knowledgeSignals: [],
  };
  for (const stage of attempt.stages) {
    stage.skipReason = null;
    stage.adaptation = null;
    if (stage.id !== "core") {
      stage.status = "locked";
      stage.checkpoint = null;
    }
  }
  await fs.rm(path.join(path.dirname(sessionPath), "review.md"), { force: true });

  for (const status of ["in-progress", "checkpoint", "skipped"]) {
    core.status = status;
    core.skipReason = status === "skipped" ? "Candidate stopped and requested review." : null;
    attempt.status = status === "skipped" ? "ready-for-review" : "in-progress";
    attempt.activeStageId = status === "skipped" ? null : "core";
    for (const stage of attempt.stages.slice(1)) {
      stage.status = status === "skipped" ? "skipped" : "locked";
      stage.skipReason = status === "skipped" ? "Candidate stopped before this stage." : null;
    }
    await fs.writeFile(sessionPath, `${JSON.stringify(session, null, 2)}\n`);
    await runNode(fixtureRoot, "scripts/validate-tasks.mjs");
  }

  core.status = "in-progress";
  core.skipReason = null;
  attempt.status = "in-progress";
  attempt.activeStageId = "core";
  core.checkpoint.outcome = "passed";
  await fs.writeFile(sessionPath, `${JSON.stringify(session, null, 2)}\n`);
  await assert.rejects(
    runNode(fixtureRoot, "scripts/validate-tasks.mjs"),
    (error) => {
      assert.match(error.stderr, /checkpoint requires completed status/);
      return true;
    },
  );
});

test("reset restores every manifest file and starts a fresh attempt", async (t) => {
  const fixtureRoot = await createFixture(t);
  const taskRelativePath = "tasks/react/fix-cart-summary-state";
  const taskPath = path.join(fixtureRoot, taskRelativePath);
  const manifestPath = path.join(taskPath, "scaffold.json");
  const supportSnapshot = "export const initialValue = 1;\n";
  const supportHash = createHash("sha256")
    .update(supportSnapshot)
    .digest("hex");

  await fs.writeFile(path.join(taskPath, "support.scaffold.ts"), supportSnapshot);
  await fs.writeFile(path.join(taskPath, "support.ts"), "export const changed = true;\n");

  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  manifest.files.push({
    working: "support.ts",
    snapshot: "support.scaffold.ts",
    sha256: supportHash,
  });
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  await runNode(fixtureRoot, "scripts/restore-scaffold.mjs", [taskRelativePath]);

  assert.equal(
    await fs.readFile(path.join(taskPath, "main.tsx"), "utf8"),
    await fs.readFile(path.join(taskPath, "main.scaffold.tsx"), "utf8"),
  );
  assert.equal(
    await fs.readFile(path.join(taskPath, "support.ts"), "utf8"),
    supportSnapshot,
  );
  await assert.rejects(fs.access(path.join(taskPath, "review.md")));

  const session = JSON.parse(
    await fs.readFile(path.join(taskPath, "session.json"), "utf8"),
  );
  assert.equal(session.activeAttemptId, "attempt-2");
  assert.equal(session.attempts[0].status, "reset");
  assert.equal(session.attempts[1].status, "ready");
  assert.equal(session.attempts[1].activeQuestionId, null);
  assert.deepEqual(session.attempts[1].questions, []);

  const taskIndex = JSON.parse(
    await fs.readFile(path.join(fixtureRoot, "data/task-index.json"), "utf8"),
  );
  assert.equal(
    taskIndex.tasks.find((task) => task.slug === "fix-cart-summary-state").status,
    "ready",
  );
});
