import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import yaml from "js-yaml";
import { buildPracticeIndex, parseFrontmatter } from "../lib/task-data.mjs";

const exec = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const run = (cwd, script, args = []) => exec(process.execPath, [path.join(cwd, script), ...args], { cwd });

async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "practice-workflow-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  for (const name of ["scripts", "data"]) await fs.cp(path.join(root, name), path.join(dir, name), { recursive: true });
  await fs.symlink(path.join(root, "node_modules"), path.join(dir, "node_modules"), "dir");
  return dir;
}

const markdown = (data, body) => `---\n${yaml.dump(data, { schema: yaml.JSON_SCHEMA })}---\n${body}\n`;
async function task(dir, slug = "debounce-practice", topic = "debounce") {
  const target = path.join(dir, "tasks/async", slug);
  await fs.mkdir(target, { recursive: true });
  const metadata = { title: slug, category: "async", taskType: "fix-bug", difficulty: "medium", problemShape: "timer-lifecycle", interviewFocus: "Timer behavior", reviewFocus: ["correctness"], topics: [topic] };
  await fs.writeFile(path.join(target, "task.md"), markdown(metadata, "# Timer exercise\n\n## Context\nA delayed action.\n\n## Goal\nFix the behavior.\n\n## Requirements\n- Reset on repeated calls.\n\n## Acceptance Criteria\n- Only the latest call fires."));
  await fs.writeFile(path.join(target, "interviewer.md"), "# Evaluation\n\n## Expected behavior\nLatest call fires.\n\n## Important cases\nRapid repeated calls.\n\n## Review focus\nTimer cleanup.");
  await fs.writeFile(path.join(target, "main.ts"), "export const startingValue = 1;\n");
  await run(dir, "scripts/init-scaffold.mjs", [`tasks/async/${slug}`]);
  return target;
}
async function review(target, outcome = "needs-practice", reviewedAt = "2026-11-03T12:00:00Z", topic = "debounce") {
  const data = { reviewedAt, mastery: outcome === "demonstrated" ? 4 : 2, requirementVerdict: outcome === "demonstrated" ? "yes" : "partially", topicSignals: [{ topic, outcome, evidence: "Repeated calls: timer reset checked (main.ts:1)." }] };
  await fs.writeFile(path.join(target, "review.md"), markdown(data, "# Task Review\n\n## Result\nBehavior assessed.\n\n## Mastery\nConsistent with the metadata.\n\n## Findings\nTimer behavior.\n\n## Strengths\nSmall implementation.\n\n## Next step\nCheck rapid calls."));
}

// Independent CLI fixtures keep real practice history empty.
test("empty repository validates and finalizes without seed tasks", async (t) => {
  const dir = await fixture(t);
  const { stdout } = await run(dir, "scripts/finalize-tasks.mjs");
  assert.match(stdout, /Validated 0 task/);
  assert.deepEqual(JSON.parse(await fs.readFile(path.join(dir, "data/practice-index.json"))).tasks, []);
});

test("initializer creates exact snapshots and stable creation time; refuses to replace them", async (t) => {
  const dir = await fixture(t);
  const target = await task(dir);
  const source = await fs.readFile(path.join(target, "main.ts"));
  assert.deepEqual(await fs.readFile(path.join(target, "main.scaffold.ts")), source);
  const manifest = JSON.parse(await fs.readFile(path.join(target, "scaffold.json")));
  assert.equal(manifest.files[0].sha256, createHash("sha256").update(source).digest("hex"));
  assert.ok(parseFrontmatter(await fs.readFile(path.join(target, "task.md"), "utf8")).data.createdAt);
  await assert.rejects(run(dir, "scripts/init-scaffold.mjs", ["tasks/async/debounce-practice"]), /already exists/);
  await run(dir, "scripts/validate-tasks.mjs");
});

test("aggregation uses the latest explicit assessment per topic, independent of task ordering", async (t) => {
  const dir = await fixture(t);
  const a = await task(dir, "z-old-gap");
  const b = await task(dir, "a-new-success");
  const c = await task(dir, "unrelated-review", "request-cancellation");
  await review(a, "needs-practice", "2026-10-01T12:00:00Z");
  await review(b, "demonstrated", "2026-11-01T12:00:00Z");
  await review(c, "needs-practice", "2026-11-03T12:00:00Z", "request-cancellation");
  await run(dir, "scripts/finalize-tasks.mjs");
  const index = JSON.parse(await fs.readFile(path.join(dir, "data/practice-index.json")));
  const signal = index.topics.find((item) => item.id === "debounce");
  assert.equal(signal.outcome, "demonstrated");
  assert.equal(signal.latestTask, "a-new-success");
  assert.equal(signal.difficultyCount, 1);
  assert.equal(signal.reviewedCount, 2);
  const context = JSON.parse((await run(dir, "scripts/task-design-context.mjs")).stdout);
  assert.ok(!context.priorities.some((item) => item.topic === "debounce"));
  assert.equal(context.priorities[0].topic, "request-cancellation");
  // Re-review replaces an assessment, never adds another event for the same task.
  await review(b, "improving", "2026-11-04T12:00:00Z");
  await run(dir, "scripts/finalize-tasks.mjs");
  const next = JSON.parse(await fs.readFile(path.join(dir, "data/practice-index.json")));
  assert.equal(next.topics.find((item) => item.id === "debounce").reviewedCount, 2);
  assert.equal(next.topics.find((item) => item.id === "debounce").outcome, "improving");
});

test("bounded context analyzes more tasks than it returns and does not depend on the generated index", async (t) => {
  const dir = await fixture(t);
  const target = await task(dir, "sample");
  // Copy a valid starter to simulate a large library without invoking AI or 100 CLIs.
  for (let i = 0; i < 105; i++) await fs.cp(target, path.join(dir, "tasks/async", `sample-${String(i).padStart(3, "0")}`), { recursive: true });
  await review(path.join(dir, "tasks/async/sample-104"));
  const result = JSON.parse((await run(dir, "scripts/task-design-context.mjs", ["--topic", "debounce", "--shape", "timer-lifecycle"])).stdout);
  assert.equal(result.totalTasks, 106);
  assert.equal(result.relatedTaskCount, 106);
  assert.equal(result.tasks.length, 10);
  assert.equal(result.priorities[0].latestTask, "sample-104");
  assert.equal(result.coverage.find((item) => item.topic === "debounce").assignedCount, 106);
  assert.ok(JSON.stringify(result).length < 14000);
});

test("review validation rejects unknown topics, malformed outcomes, duplicate signals, and invalid metadata", async (t) => {
  const dir = await fixture(t);
  const target = await task(dir);
  await review(target);
  const original = await fs.readFile(path.join(target, "review.md"), "utf8");
  for (const mutate of [
    (data) => { data.topicSignals[0].topic = "stale-responses"; },
    (data) => { data.topicSignals[0].outcome = "unknown"; },
    (data) => { data.topicSignals.push(data.topicSignals[0]); },
    (data) => { data.mastery = 6; },
    (data) => { data.reviewedAt = "not-a-date"; },
  ]) {
    const { data, body } = parseFrontmatter(original);
    mutate(data);
    await fs.writeFile(path.join(target, "review.md"), markdown(data, body));
    await assert.rejects(run(dir, "scripts/validate-tasks.mjs"));
  }
});

test("reset verifies all snapshots before changes and restores multiple files without session state", async (t) => {
  const dir = await fixture(t);
  const target = await task(dir);
  await review(target);
  const manifestPath = path.join(target, "scaffold.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath));
  const support = "export const support = true;\n";
  await fs.writeFile(path.join(target, "support.scaffold.ts"), support);
  await fs.writeFile(path.join(target, "support.ts"), "changed support");
  manifest.files.push({ working: "support.ts", snapshot: "support.scaffold.ts", sha256: createHash("sha256").update(support).digest("hex") });
  await fs.writeFile(manifestPath, JSON.stringify(manifest));
  await fs.writeFile(path.join(target, "main.ts"), "candidate work");
  await fs.appendFile(path.join(target, "support.scaffold.ts"), "corruption");
  await assert.rejects(run(dir, "scripts/restore-scaffold.mjs", ["tasks/async/debounce-practice"]), /hash mismatch/);
  assert.equal(await fs.readFile(path.join(target, "main.ts"), "utf8"), "candidate work");
  await fs.access(path.join(target, "review.md"));
  await fs.writeFile(path.join(target, "support.scaffold.ts"), support);
  await run(dir, "scripts/restore-scaffold.mjs", ["tasks/async/debounce-practice"]);
  assert.equal(await fs.readFile(path.join(target, "support.ts"), "utf8"), support);
  assert.equal(await fs.readFile(path.join(target, "main.ts"), "utf8"), "export const startingValue = 1;\n");
  await assert.rejects(fs.access(path.join(target, "review.md")));
  await assert.rejects(fs.access(path.join(target, "session.json")));
  const index = JSON.parse(await fs.readFile(path.join(dir, "data/practice-index.json")));
  assert.equal(index.tasks[0].mastery, null);
  assert.equal(index.topics.find((item) => item.id === "debounce").outcome, null);
});

test("reset rejects traversal and symlinks before writing outside a task", async (t) => {
  const dir = await fixture(t);
  const target = await task(dir);
  const manifestPath = path.join(target, "scaffold.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath));
  manifest.files[0].working = "../../outside.ts";
  await fs.writeFile(manifestPath, JSON.stringify(manifest));
  await assert.rejects(run(dir, "scripts/restore-scaffold.mjs", ["tasks/async/debounce-practice"]), /inside the task/);
  const outside = path.join(dir, "outside.ts");
  await fs.writeFile(outside, "must remain unchanged");
  await fs.unlink(path.join(target, "main.ts"));
  await fs.symlink(outside, path.join(target, "main.ts"));
  manifest.files[0].working = "main.ts";
  await fs.writeFile(manifestPath, JSON.stringify(manifest));
  await assert.rejects(run(dir, "scripts/restore-scaffold.mjs", ["tasks/async/debounce-practice"]), /outside the task/);
  assert.equal(await fs.readFile(outside, "utf8"), "must remain unchanged");
});

test("empty and unassessed topics are coverage opportunities, not gaps", () => {
  const index = buildPracticeIndex([], { topics: [{ id: "debounce", label: "Debounce", category: "async" }] });
  assert.equal(index.topics[0].outcome, null);
  assert.equal(index.topics[0].difficultyCount, 0);
});
