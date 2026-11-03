import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import yaml from "js-yaml";

export const ROOT = process.cwd();
export const ALLOWED_CATEGORIES = ["react", "typescript", "data-transformation", "algorithms", "async", "api-integration", "testing", "performance"];
export const ALLOWED_TASK_TYPES = ["build-from-requirements", "fix-bug", "refactor-existing-code", "complete-partial-implementation", "write-tests", "model-types", "handle-edge-cases", "optimize-performance", "review-and-improve"];
export const ALLOWED_DIFFICULTIES = ["easy", "medium", "hard"];
export const MASTERY_LABELS = { 1: "Needs another pass", 2: "Partially working", 3: "Mostly working", 4: "Interview-ready", 5: "Strong solution" };
export const OUTCOMES = ["needs-practice", "improving", "demonstrated"];

export function parseFrontmatter(content, filePath = "Markdown file") {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${filePath}: missing YAML frontmatter.`);
  const data = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(`${filePath}: frontmatter must be an object.`);
  return { data, body: match[2].trim() };
}

export async function readOptionalFile(filePath) {
  try { return await fs.readFile(filePath, "utf8"); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
}

export async function readDirectoryOrEmpty(dir) {
  try { return await fs.readdir(dir, { withFileTypes: true }); }
  catch (error) { if (error.code === "ENOENT") return []; throw error; }
}

export async function collectTaskDirs() {
  const tasks = [];
  for (const category of await readDirectoryOrEmpty(path.join(ROOT, "tasks"))) {
    if (!category.isDirectory()) continue;
    for (const task of await readDirectoryOrEmpty(path.join(ROOT, "tasks", category.name))) {
      if (task.isDirectory()) tasks.push({ category: category.name, slug: task.name, dir: path.join(ROOT, "tasks", category.name, task.name) });
    }
  }
  return tasks.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function readTopicCatalog() {
  return JSON.parse(await fs.readFile(path.join(ROOT, "data/topic-catalog.json"), "utf8"));
}

export async function readTaskRecord(task) {
  const taskDoc = parseFrontmatter(await fs.readFile(path.join(task.dir, "task.md"), "utf8"), `${task.slug}/task.md`);
  const reviewSource = await readOptionalFile(path.join(task.dir, "review.md"));
  return { ...task, metadata: taskDoc.data, taskBody: taskDoc.body,
    review: reviewSource === null ? null : parseFrontmatter(reviewSource, `${task.slug}/review.md`),
    scaffold: JSON.parse(await fs.readFile(path.join(task.dir, "scaffold.json"), "utf8")) };
}

export function resolveTaskFile(taskDir, relativePath) {
  if (typeof relativePath !== "string" || !relativePath || relativePath.includes("\\")) throw new Error("Manifest paths must be task-relative paths.");
  const resolved = path.resolve(taskDir, relativePath);
  const relative = path.relative(taskDir, resolved);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Manifest paths must stay inside the task directory.");
  return resolved;
}

export async function checkedTaskFile(taskDir, relativePath) {
  const resolved = resolveTaskFile(taskDir, relativePath);
  const realTaskDir = await fs.realpath(taskDir);
  const realFile = await fs.realpath(resolved);
  const relative = path.relative(realTaskDir, realFile);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Manifest file resolves outside the task directory.");
  return resolved;
}

export async function readScaffoldFiles(taskDir, manifest) {
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.files) || !manifest.files.length) throw new Error("scaffold.json requires schemaVersion 1 and a non-empty files array.");
  const used = new Set();
  const files = [];
  for (const entry of manifest.files) {
    const workingFile = await checkedTaskFile(taskDir, entry.working);
    const snapshotFile = await checkedTaskFile(taskDir, entry.snapshot);
    if (used.has(workingFile) || used.has(snapshotFile) || workingFile === snapshotFile) throw new Error("Manifest file paths must be unique.");
    used.add(workingFile); used.add(snapshotFile);
    if (![".ts", ".tsx"].includes(path.extname(entry.working)) || !entry.snapshot.endsWith(`.scaffold${path.extname(entry.working)}`) || entry.working.includes(".scaffold.")) throw new Error("Manifest must pair working TypeScript files with scaffold snapshots.");
    const content = await fs.readFile(snapshotFile);
    if (!/^[a-f0-9]{64}$/.test(entry.sha256 ?? "") || createHash("sha256").update(content).digest("hex") !== entry.sha256) throw new Error(`snapshot hash mismatch: ${entry.snapshot}`);
    files.push({ workingFile, snapshotFile, content });
  }
  if (manifest.files.filter((entry) => ["main.ts", "main.tsx"].includes(entry.working)).length !== 1) throw new Error("Manifest requires exactly one main.ts or main.tsx.");
  return files;
}

const text = (value) => typeof value === "string" && value.trim().length > 0;
const list = (value) => Array.isArray(value) && value.every(text);
export function validateCatalog(catalog) {
  if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.topics) || !catalog.topics.length) throw new Error("Topic catalog requires schemaVersion 1 and topics.");
  const ids = new Set();
  for (const topic of catalog.topics) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id) || ids.has(topic.id) || !text(topic.label) || !ALLOWED_CATEGORIES.includes(topic.category) || !text(topic.focus)) throw new Error(`Invalid or duplicate catalog topic: ${topic.id}`);
    ids.add(topic.id);
  }
}

export async function validateRecord(record, catalog) {
  const m = record.metadata;
  const topics = new Set(catalog.topics.map((topic) => topic.id));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)) throw new Error("Invalid task slug.");
  if (m.category !== record.category || !ALLOWED_CATEGORIES.includes(m.category) || !ALLOWED_TASK_TYPES.includes(m.taskType) || !ALLOWED_DIFFICULTIES.includes(m.difficulty)) throw new Error("Invalid category, taskType, or difficulty.");
  if (typeof m.createdAt !== "string" || Number.isNaN(Date.parse(m.createdAt))) throw new Error("task.md requires a valid createdAt timestamp (run scaffold:init).");
  for (const key of ["title", "problemShape", "interviewFocus"]) if (!text(m[key])) throw new Error(`task.md requires ${key}.`);
  if (!list(m.reviewFocus) || !m.reviewFocus.length || !list(m.topics) || !m.topics.length || new Set(m.topics).size !== m.topics.length || m.topics.some((id) => !topics.has(id))) throw new Error("task.md requires reviewFocus and unique canonical topics.");
  for (const heading of ["Context", "Goal", "Requirements", "Acceptance Criteria"]) if (!record.taskBody.includes(`## ${heading}`)) throw new Error(`task.md requires ${heading}.`);
  const plan = await fs.readFile(path.join(record.dir, "interviewer.md"), "utf8");
  for (const heading of ["Expected behavior", "Important cases", "Review focus"]) if (!plan.includes(`## ${heading}`)) throw new Error(`interviewer.md requires ${heading}.`);
  await readScaffoldFiles(record.dir, record.scaffold);
  if (m.hasPreview !== undefined && typeof m.hasPreview !== "boolean") throw new Error("hasPreview must be a boolean.");
  if (m.hasPreview === true) {
    if (typeof m.previewEntry !== "string" || !m.previewEntry.endsWith(".tsx") || !record.scaffold.files.some((entry) => entry.working === m.previewEntry)) throw new Error("Preview entry must be a manifest working TSX file.");
    await checkedTaskFile(record.dir, m.previewEntry);
  } else if (m.previewEntry !== undefined) throw new Error("previewEntry requires hasPreview: true.");
  if (record.review) {
    const { data: r, body } = record.review;
    if (typeof r.reviewedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(r.reviewedAt) || Number.isNaN(Date.parse(r.reviewedAt))) throw new Error("reviewedAt must be an ISO UTC timestamp string.");
    if (!Number.isInteger(r.mastery) || !MASTERY_LABELS[r.mastery] || !["yes", "partially", "no"].includes(r.requirementVerdict)) throw new Error("Invalid review mastery or requirementVerdict.");
    if (!Array.isArray(r.topicSignals) || !r.topicSignals.length) throw new Error("Review requires topicSignals.");
    const seen = new Set();
    for (const signal of r.topicSignals) {
      if (!m.topics.includes(signal.topic) || seen.has(signal.topic) || !OUTCOMES.includes(signal.outcome) || !text(signal.evidence)) throw new Error("Review signals must use unique task topics, a valid outcome, and evidence.");
      seen.add(signal.topic);
    }
    for (const heading of ["Result", "Mastery", "Findings", "Strengths", "Next step"]) if (!body.includes(`## ${heading}`)) throw new Error(`review.md requires ${heading}.`);
  }
}

export async function loadRepository() {
  const catalog = await readTopicCatalog();
  validateCatalog(catalog);
  const records = [];
  const slugs = new Set();
  for (const task of await collectTaskDirs()) {
    if (slugs.has(task.slug)) throw new Error(`Duplicate task slug: ${task.slug}`);
    slugs.add(task.slug);
    const record = await readTaskRecord(task);
    try { await validateRecord(record, catalog); }
    catch (error) { throw new Error(`${task.slug}: ${error.message}`); }
    records.push(record);
  }
  return { records, catalog };
}

export function buildPracticeIndex(records, catalog) {
  const tasks = records.map((r) => ({ slug: r.slug, title: r.metadata.title, category: r.category, taskType: r.metadata.taskType,
    difficulty: r.metadata.difficulty, problemShape: r.metadata.problemShape, topics: r.metadata.topics,
    hasPreview: r.metadata.hasPreview === true, previewEntry: r.metadata.previewEntry ?? null,
    mainFileName: r.scaffold.files.find((file) => ["main.ts", "main.tsx"].includes(file.working)).working,
    createdAt: r.metadata.createdAt,
    reviewedAt: r.review?.data.reviewedAt ?? null, mastery: r.review?.data.mastery ?? null,
    requirementVerdict: r.review?.data.requirementVerdict ?? null,
    summary: r.taskBody.split(/\r?\n/).find((line) => line.trim() && !line.startsWith("#")) ?? "",
  })).sort((a, b) => a.title.localeCompare(b.title));
  const topics = catalog.topics.map((topic) => {
    const events = records.flatMap((record) => (record.review?.data.topicSignals ?? [])
      .filter((signal) => signal.topic === topic.id)
      .map((signal) => ({ slug: record.slug, reviewedAt: record.review.data.reviewedAt, ...signal })))
      .sort((a, b) => Date.parse(b.reviewedAt) - Date.parse(a.reviewedAt) || a.slug.localeCompare(b.slug));
    const latest = events[0];
    return { id: topic.id, label: topic.label, category: topic.category,
      assignedCount: tasks.filter((task) => task.topics.includes(topic.id)).length,
      reviewedCount: events.length, difficultyCount: events.filter((event) => event.outcome === "needs-practice").length,
      outcome: latest?.outcome ?? null, evidence: latest?.evidence ?? null, reviewedAt: latest?.reviewedAt ?? null,
      latestTask: latest?.slug ?? null, relatedTasks: events.map((event) => event.slug) };
  });
  return { schemaVersion: 1, tasks, topics };
}

export function practicePriorities(topics) {
  const rank = { "needs-practice": 0, improving: 1 };
  return topics.filter((topic) => topic.outcome in rank).sort((a, b) =>
    rank[a.outcome] - rank[b.outcome] || b.difficultyCount - a.difficultyCount ||
    Date.parse(b.reviewedAt) - Date.parse(a.reviewedAt) || a.id.localeCompare(b.id));
}

export async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
