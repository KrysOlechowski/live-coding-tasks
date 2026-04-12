import { promises as fs } from "node:fs";
import path from "node:path";

const TASKS_ROOT = path.join(process.cwd(), "tasks");

const REQUIRED_FRONTMATTER_KEYS = [
  "title",
  "slug",
  "category",
  "type",
  "difficulty",
  "penalty",
  "hasPreview",
];

const ALLOWED_DIFFICULTIES = new Set(["easy", "medium", "hard"]);
const ALLOWED_PENALTIES = new Set(["0", "1", "2", "3"]);
const REQUIRED_REVIEW_SECTIONS = [
  "Requirement check",
  "Strengths",
  "Weaknesses",
  "Missed edge cases",
  "What a stronger candidate would improve",
  "Follow-up questions",
  "Final verdict",
];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return null;
  }

  const data = {};

  for (const line of match[1].split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();
    data[key] = value;
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

function hasUseClientDirective(content) {
  const firstLine = getFirstNonEmptyLine(content.replace(/^\uFEFF/, ""));
  return firstLine === '"use client";' || firstLine === "'use client';";
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
  const promptMdPath = path.join(task.dir, "prompt.md");
  const mainTsPath = path.join(task.dir, "main.ts");
  const mainTsxPath = path.join(task.dir, "main.tsx");
  const scaffoldTsPath = path.join(task.dir, "main.scaffold.ts");
  const scaffoldTsxPath = path.join(task.dir, "main.scaffold.tsx");
  const reviewMdPath = path.join(task.dir, "review.md");

  const [hasTaskMd, hasPromptMd, hasMainTs, hasMainTsx, hasScaffoldTs, hasScaffoldTsx, hasReviewMd] =
    await Promise.all([
      fileExists(taskMdPath),
      fileExists(promptMdPath),
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

  if (!hasPromptMd) {
    errors.push("missing prompt.md");
  } else {
    const promptMd = await fs.readFile(promptMdPath, "utf8");
    const promptFirstLine = getFirstNonEmptyLine(promptMd.replace(/^\uFEFF/, ""));

    if (promptFirstLine !== "Title") {
      errors.push('prompt.md should preserve the brief and start with "Title"');
    }
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

  if (frontmatter.slug && frontmatter.slug !== task.slug) {
    errors.push(`frontmatter slug mismatch (expected "${task.slug}", got "${frontmatter.slug}")`);
  }

  if (frontmatter.category && frontmatter.category !== task.category) {
    errors.push(
      `frontmatter category mismatch (expected "${task.category}", got "${frontmatter.category}")`,
    );
  }

  if (frontmatter.difficulty && !ALLOWED_DIFFICULTIES.has(frontmatter.difficulty)) {
    errors.push(
      `frontmatter difficulty must be one of: ${Array.from(ALLOWED_DIFFICULTIES).join(", ")}`,
    );
  }

  if (frontmatter.penalty && !ALLOWED_PENALTIES.has(frontmatter.penalty)) {
    errors.push(
      `frontmatter penalty must be one of: ${Array.from(ALLOWED_PENALTIES).join(", ")}`,
    );
  }

  if (frontmatter.hasPreview && !["true", "false"].includes(frontmatter.hasPreview)) {
    errors.push('frontmatter hasPreview must be "true" or "false"');
  }

  const hasPreview = frontmatter.hasPreview === "true";
  const previewEntry = frontmatter.previewEntry;

  if (hasPreview) {
    if (!previewEntry) {
      errors.push("frontmatter hasPreview=true but previewEntry is missing");
    } else {
      const previewEntryPath = path.join(task.dir, previewEntry);
      if (!(await fileExists(previewEntryPath))) {
        errors.push(`previewEntry points to missing file: ${previewEntry}`);
      } else if (task.category === "react" && previewEntry.endsWith(".tsx")) {
        const previewEntryContent = await fs.readFile(previewEntryPath, "utf8");

        if (!hasUseClientDirective(previewEntryContent)) {
          errors.push(
            'React preview entry must start with "use client"; to avoid Next.js Server Component preview errors',
          );
        }
      }
    }
  } else if (previewEntry) {
    errors.push("frontmatter previewEntry should be omitted when hasPreview=false");
  }

  if (!hasReviewMd && frontmatter.penalty && Number(frontmatter.penalty) > 0) {
    errors.push("penalty > 0 requires review.md");
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
