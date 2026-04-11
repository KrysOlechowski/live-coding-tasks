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

  const [hasTaskMd, hasPromptMd, hasMainTs, hasMainTsx, hasScaffoldTs, hasScaffoldTsx] =
    await Promise.all([
      fileExists(taskMdPath),
      fileExists(promptMdPath),
      fileExists(mainTsPath),
      fileExists(mainTsxPath),
      fileExists(scaffoldTsPath),
      fileExists(scaffoldTsxPath),
    ]);

  if (!hasTaskMd) {
    errors.push("missing task.md");
    return errors;
  }

  if (!hasPromptMd) {
    errors.push("missing prompt.md");
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

  const hasPreview = frontmatter.hasPreview === "true";

  if (hasPreview) {
    const previewEntry = frontmatter.previewEntry;

    if (!previewEntry) {
      errors.push("frontmatter hasPreview=true but previewEntry is missing");
    } else {
      const previewEntryPath = path.join(task.dir, previewEntry);
      if (!(await fileExists(previewEntryPath))) {
        errors.push(`previewEntry points to missing file: ${previewEntry}`);
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
