import { promises as fs } from "node:fs";
import path from "node:path";

const TASKS_ROOT = path.join(process.cwd(), "tasks");

const REQUIRED_FRONTMATTER_KEYS = [
  "title",
  "category",
  "taskType",
  "difficulty",
  "primarySkill",
  "secondarySkill",
  "problemShape",
  "interviewFocus",
  "reviewFocus",
  "tags",
];

const ALLOWED_CATEGORIES = new Set([
  "react",
  "typescript",
  "data-transformation",
  "algorithms",
  "async",
  "api-integration",
  "testing",
  "performance",
]);
const ALLOWED_TASK_TYPES = new Set([
  "build-from-requirements",
  "fix-bug",
  "refactor-existing-code",
  "complete-partial-implementation",
  "write-tests",
  "model-types",
  "handle-edge-cases",
  "optimize-performance",
  "review-and-improve",
]);
const ALLOWED_DIFFICULTIES = new Set(["easy", "medium", "hard"]);
const REQUIRED_REVIEW_SECTIONS = [
  "Requirement check",
  "Strengths",
  "Weaknesses",
  "Missed edge cases",
  "What a stronger candidate would improve",
  "Main learning takeaway",
  "Suggested next step",
  "Follow-up questions",
  "Final verdict",
];

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return null;
  }

  const data = {};
  let currentArrayKey = null;

  for (const line of match[1].split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    if (trimmedLine.startsWith("- ")) {
      if (!currentArrayKey || !Array.isArray(data[currentArrayKey])) {
        return null;
      }

      data[currentArrayKey].push(stripQuotes(trimmedLine.slice(2).trim()));
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (!value) {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = stripQuotes(value);
    currentArrayKey = null;
  }

  return data;
}

function getFirstNonEmptyLine(content) {
  for (const line of content.split("\n")) {
    if (line.trim()) {
      return line.trim();
    }
  }

  return "";
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectTaskDirs() {
  const categoryEntries = await fs.readdir(TASKS_ROOT, { withFileTypes: true });
  const taskDirs = [];

  for (const categoryEntry of categoryEntries) {
    if (!categoryEntry.isDirectory()) {
      continue;
    }

    const category = categoryEntry.name;
    const categoryPath = path.join(TASKS_ROOT, category);
    const taskEntries = await fs.readdir(categoryPath, { withFileTypes: true });

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

async function validateTaskDir(task) {
  const errors = [];
  const taskMdPath = path.join(task.dir, "task.md");
  const mainTsPath = path.join(task.dir, "main.ts");
  const mainTsxPath = path.join(task.dir, "main.tsx");
  const scaffoldTsPath = path.join(task.dir, "main.scaffold.ts");
  const scaffoldTsxPath = path.join(task.dir, "main.scaffold.tsx");
  const reviewMdPath = path.join(task.dir, "review.md");

  const [hasTaskMd, hasMainTs, hasMainTsx, hasScaffoldTs, hasScaffoldTsx, hasReviewMd] =
    await Promise.all([
      fileExists(taskMdPath),
      fileExists(mainTsPath),
      fileExists(mainTsxPath),
      fileExists(scaffoldTsPath),
      fileExists(scaffoldTsxPath),
      fileExists(reviewMdPath),
    ]);

  if (!hasTaskMd) {
    errors.push("missing task.md");
    return errors;
  }

  if (hasMainTs && hasMainTsx) {
    errors.push("both main.ts and main.tsx exist; expected exactly one");
  } else if (!hasMainTs && !hasMainTsx) {
    errors.push("missing main.ts or main.tsx");
  }

  if (hasMainTs && !hasScaffoldTs) {
    errors.push("missing main.scaffold.ts");
  }

  if (hasMainTsx && !hasScaffoldTsx) {
    errors.push("missing main.scaffold.tsx");
  }

  const taskMd = await fs.readFile(taskMdPath, "utf8");
  const frontmatter = parseFrontmatter(taskMd);

  if (!frontmatter) {
    errors.push("task.md missing valid frontmatter block");
    return errors;
  }

  for (const key of REQUIRED_FRONTMATTER_KEYS) {
    if (!frontmatter[key]) {
      errors.push(`frontmatter missing key: ${key}`);
    }
  }

  for (const key of Object.keys(frontmatter)) {
    if (!REQUIRED_FRONTMATTER_KEYS.includes(key)) {
      errors.push(`frontmatter includes unsupported workflow key: ${key}`);
    }
  }

  if (frontmatter.category && frontmatter.category !== task.category) {
    errors.push(
      `frontmatter category mismatch (expected "${task.category}", got "${frontmatter.category}")`,
    );
  }

  if (frontmatter.category && !ALLOWED_CATEGORIES.has(frontmatter.category)) {
    errors.push(
      `frontmatter category must be one of: ${Array.from(ALLOWED_CATEGORIES).join(", ")}`,
    );
  }

  if (frontmatter.taskType && !ALLOWED_TASK_TYPES.has(frontmatter.taskType)) {
    errors.push(
      `frontmatter taskType must be one of: ${Array.from(ALLOWED_TASK_TYPES).join(", ")}`,
    );
  }

  if (frontmatter.difficulty && !ALLOWED_DIFFICULTIES.has(frontmatter.difficulty)) {
    errors.push(
      `frontmatter difficulty must be one of: ${Array.from(ALLOWED_DIFFICULTIES).join(", ")}`,
    );
  }

  for (const key of ["reviewFocus", "tags"]) {
    if (frontmatter[key] && !Array.isArray(frontmatter[key])) {
      errors.push(`frontmatter ${key} must be a YAML list`);
    }
  }

  if (hasReviewMd) {
    const reviewMd = await fs.readFile(reviewMdPath, "utf8");
    const reviewFirstLine = getFirstNonEmptyLine(reviewMd);

    if (reviewFirstLine !== "# Task Review") {
      errors.push('review.md must start with "# Task Review"');
    }

    for (const section of REQUIRED_REVIEW_SECTIONS) {
      const sectionPattern = new RegExp(`^##\\s+${escapeRegex(section)}\\s*$`, "m");
      if (!sectionPattern.test(reviewMd)) {
        errors.push(`review.md missing required section: ${section}`);
      }
    }
  }

  return errors;
}

async function main() {
  const taskDirs = await collectTaskDirs();
  const allErrors = [];

  for (const task of taskDirs) {
    const errors = await validateTaskDir(task);
    if (errors.length > 0) {
      allErrors.push({
        task: path.relative(process.cwd(), task.dir),
        errors,
      });
    }
  }

  if (allErrors.length > 0) {
    console.error("Task validation failed:");
    for (const taskError of allErrors) {
      console.error(`- ${taskError.task}`);
      for (const error of taskError.errors) {
        console.error(`  - ${error}`);
      }
    }
    process.exit(1);
  }

  console.log(`Validated ${taskDirs.length} task folder(s).`);
}

void main();
