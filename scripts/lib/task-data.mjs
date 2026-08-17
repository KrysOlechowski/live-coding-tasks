import { promises as fs } from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();
export const TASKS_ROOT = path.join(ROOT, "tasks");

export const ALLOWED_CATEGORIES = [
  "react",
  "typescript",
  "data-transformation",
  "algorithms",
  "async",
  "api-integration",
  "testing",
  "performance",
];

export const ALLOWED_TASK_TYPES = [
  "build-from-requirements",
  "fix-bug",
  "refactor-existing-code",
  "complete-partial-implementation",
  "write-tests",
  "model-types",
  "handle-edge-cases",
  "optimize-performance",
  "review-and-improve",
];

export const ALLOWED_DIFFICULTIES = ["easy", "medium", "hard"];

export const MASTERY_LABELS = {
  1: "Needs another pass",
  2: "Partially working",
  3: "Mostly working",
  4: "Interview-ready",
  5: "Strong solution",
};

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseScalar(value) {
  const unquoted = stripQuotes(value.trim());

  if (unquoted === "true") {
    return true;
  }

  if (unquoted === "false") {
    return false;
  }

  if (/^-?\d+$/.test(unquoted)) {
    return Number(unquoted);
  }

  return unquoted;
}

export function parseFrontmatter(content, filePath = "Markdown file") {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`${filePath} is missing a valid frontmatter block.`);
  }

  const data = {};
  let currentArrayKey = null;

  for (const line of match[1].split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    if (trimmedLine.startsWith("- ")) {
      if (!currentArrayKey || !Array.isArray(data[currentArrayKey])) {
        throw new Error(`${filePath} has an invalid list item: ${trimmedLine}`);
      }

      data[currentArrayKey].push(parseScalar(trimmedLine.slice(2)));
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");

    if (separatorIndex === -1) {
      throw new Error(`${filePath} has an invalid frontmatter line: ${trimmedLine}`);
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (!value) {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = parseScalar(value);
    currentArrayKey = null;
  }

  return {
    data,
    body: match[2].trim(),
  };
}

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function readOptionalFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function readDirectoryOrEmpty(directoryPath) {
  try {
    return await fs.readdir(directoryPath, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function collectTaskDirs() {
  const categoryEntries = await readDirectoryOrEmpty(TASKS_ROOT);
  const taskDirs = [];

  for (const categoryEntry of categoryEntries) {
    if (!categoryEntry.isDirectory()) {
      continue;
    }

    const category = categoryEntry.name;
    const categoryPath = path.join(TASKS_ROOT, category);
    const taskEntries = await readDirectoryOrEmpty(categoryPath);

    for (const taskEntry of taskEntries) {
      if (!taskEntry.isDirectory()) {
        continue;
      }

      taskDirs.push({
        category,
        slug: taskEntry.name,
        dir: path.join(categoryPath, taskEntry.name),
      });
    }
  }

  return taskDirs.sort((left, right) => left.dir.localeCompare(right.dir));
}

export async function readTopicCatalog() {
  const filePath = path.join(ROOT, "data", "topic-catalog.json");
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

export async function readTaskRecord(task) {
  const taskPath = path.join(task.dir, "task.md");
  const interviewerPath = path.join(task.dir, "interviewer.md");
  const sessionPath = path.join(task.dir, "session.json");
  const scaffoldPath = path.join(task.dir, "scaffold.json");
  const reviewPath = path.join(task.dir, "review.md");

  const [taskSource, interviewerSource, sessionSource, scaffoldSource, reviewSource] =
    await Promise.all([
      fs.readFile(taskPath, "utf8"),
      fs.readFile(interviewerPath, "utf8"),
      fs.readFile(sessionPath, "utf8"),
      fs.readFile(scaffoldPath, "utf8"),
      readOptionalFile(reviewPath),
    ]);

  const taskDocument = parseFrontmatter(taskSource, taskPath);
  const interviewerDocument = parseFrontmatter(
    interviewerSource,
    interviewerPath,
  );

  return {
    ...task,
    taskPath,
    interviewerPath,
    sessionPath,
    reviewPath,
    taskSource,
    taskFrontmatter: taskDocument.data,
    taskBody: taskDocument.body,
    interviewerSource,
    interviewerFrontmatter: interviewerDocument.data,
    interviewerBody: interviewerDocument.body,
    session: JSON.parse(sessionSource),
    scaffoldPath,
    scaffold: JSON.parse(scaffoldSource),
    reviewSource,
  };
}

export function getActiveAttempt(session) {
  return session.attempts.find(
    (attempt) => attempt.id === session.activeAttemptId,
  );
}

export function getMarkdownSection(content, heading) {
  const lines = content.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === `## ${heading}`);

  if (headingIndex === -1) {
    return [];
  }

  const nextHeadingIndex = lines.findIndex(
    (line, index) => index > headingIndex && line.trim().startsWith("## "),
  );

  return lines.slice(
    headingIndex + 1,
    nextHeadingIndex === -1 ? undefined : nextHeadingIndex,
  );
}

export function parseReviewMastery(reviewSource) {
  const lines = getMarkdownSection(reviewSource, "Mastery");
  const levelLine = lines.find((line) => line.trim().startsWith("Level:"));
  const reasonLine = lines.find((line) => line.trim().startsWith("Reason:"));
  const levelMatch = levelLine
    ?.trim()
    .match(/^Level:\s*([1-5])\/5\s+—\s+(.+?)\s*$/);
  const reason = reasonLine?.trim().replace(/^Reason:\s*/, "") ?? "";

  if (!levelMatch || !reason) {
    return null;
  }

  return {
    level: Number(levelMatch[1]),
    label: levelMatch[2],
    reason,
  };
}

export function parseReviewVerdict(reviewSource) {
  const lines = getMarkdownSection(reviewSource, "Requirement check");
  const verdictLine = lines.find((line) =>
    line.trim().startsWith("- Meets the task requirements:"),
  );

  return (
    verdictLine
      ?.trim()
      .match(/^- Meets the task requirements:\s*(yes|partially|no)\s*$/)?.[1] ??
    null
  );
}
