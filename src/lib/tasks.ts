import { promises as fs } from "node:fs";
import type { Dirent } from "node:fs";
import path from "node:path";
import { cache } from "react";

const TASKS_ROOT = path.join(process.cwd(), "tasks");

type TaskCategory = string;
type TaskDifficulty = "easy" | "medium" | "hard" | string;

type TaskFrontmatter = {
  title: string;
  slug: string;
  category: TaskCategory;
  taskType: string;
  difficulty: TaskDifficulty;
  hasPreview: boolean;
  previewEntry?: string;
};

export type TaskMastery = {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  reason: string;
};

export type TaskSummary = TaskFrontmatter & {
  taskBody: string;
  taskFilePath: string;
  mainFileName: string | null;
  promptFilePath: string | null;
  reviewFilePath: string | null;
  hasReview: boolean;
  mastery: TaskMastery | null;
};

export type TaskDocument = TaskSummary & {
  promptBody: string | null;
  reviewBody: string | null;
};

type TaskFilters = {
  category?: string;
  difficulty?: string;
  mastery?: string;
  preview?: string;
  progress?: string;
};

function parseFrontmatterValue(value: string): boolean | number | string {
  const trimmedValue = value.trim();

  if (trimmedValue === "true") {
    return true;
  }

  if (trimmedValue === "false") {
    return false;
  }

  if (/^-?\d+$/.test(trimmedValue)) {
    return Number(trimmedValue);
  }

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

function parseFrontmatter(source: string): {
  data: Record<string, boolean | number | string | string[]>;
  body: string;
} {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Task file is missing frontmatter.");
  }

  const [, rawFrontmatter, body] = match;
  const data: Record<string, boolean | number | string | string[]> = {};
  let currentArrayKey: string | null = null;

  for (const line of rawFrontmatter.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    if (trimmedLine.startsWith("- ")) {
      const currentValue = currentArrayKey ? data[currentArrayKey] : null;

      if (!Array.isArray(currentValue)) {
        throw new Error(`Invalid frontmatter line: "${trimmedLine}"`);
      }

      currentValue.push(String(parseFrontmatterValue(trimmedLine.slice(2))));
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");

    if (separatorIndex === -1) {
      throw new Error(`Invalid frontmatter line: "${trimmedLine}"`);
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1);

    if (!value.trim()) {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = parseFrontmatterValue(value);
    currentArrayKey = null;
  }

  return {
    data,
    body: body.trim(),
  };
}

async function readOptionalFile(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    const typedError = error as NodeJS.ErrnoException;

    if (typedError.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function readOptionalDirectory(
  directoryPath: string,
): Promise<Dirent[]> {
  try {
    return await fs.readdir(directoryPath, { withFileTypes: true });
  } catch (error) {
    const typedError = error as NodeJS.ErrnoException;

    if (typedError.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function parseMastery(reviewBody: string): TaskMastery | null {
  const lines = reviewBody.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === "## Mastery");

  if (headingIndex === -1) {
    return null;
  }

  const nextHeadingIndex = lines.findIndex(
    (line, index) => index > headingIndex && line.trim().startsWith("## "),
  );
  const sectionLines = lines.slice(
    headingIndex + 1,
    nextHeadingIndex === -1 ? undefined : nextHeadingIndex,
  );
  const levelLine = sectionLines.find((line) => line.trim().startsWith("Level:"));
  const reasonLine = sectionLines.find((line) => line.trim().startsWith("Reason:"));
  const levelMatch = levelLine
    ?.trim()
    .match(/^Level:\s*([1-5])\/5\s+—\s+(.+?)\s*$/);
  const reason = reasonLine?.trim().replace(/^Reason:\s*/, "") ?? "";

  if (!levelMatch || !reason) {
    return null;
  }

  return {
    level: Number(levelMatch[1]) as TaskMastery["level"],
    label: levelMatch[2],
    reason,
  };
}

function coerceFrontmatter(
  data: Record<string, boolean | number | string | string[]>,
  filePath: string,
  fallbackSlug: string,
): TaskFrontmatter {
  const title = data.title;
  const slug = data.slug ?? fallbackSlug;
  const category = data.category;
  const taskType = data.taskType ?? data.type;
  const difficulty = data.difficulty;
  const hasPreview = data.hasPreview === true || data.hasPreview === "true";
  const previewEntry = data.previewEntry;

  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof category !== "string" ||
    typeof taskType !== "string" ||
    typeof difficulty !== "string" ||
    typeof hasPreview !== "boolean"
  ) {
    throw new Error(`Invalid task frontmatter in ${filePath}`);
  }

  if (previewEntry !== undefined && typeof previewEntry !== "string") {
    throw new Error(`Invalid previewEntry in ${filePath}`);
  }

  return {
    title,
    slug,
    category,
    taskType,
    difficulty,
    hasPreview,
    previewEntry,
  };
}

async function readTaskSummary(
  category: string,
  slug: string,
): Promise<TaskSummary | null> {
  const taskDir = path.join(TASKS_ROOT, category, slug);
  const taskFilePath = path.join(taskDir, "task.md");
  const taskFile = await readOptionalFile(taskFilePath);

  if (!taskFile) {
    return null;
  }

  const { data, body } = parseFrontmatter(taskFile);
  const frontmatter = coerceFrontmatter(data, taskFilePath, slug);

  if (frontmatter.slug !== slug) {
    throw new Error(
      `Task slug mismatch for ${taskFilePath}. Expected "${slug}" but found "${frontmatter.slug}".`,
    );
  }

  if (frontmatter.category !== category) {
    throw new Error(
      `Task category mismatch for ${taskFilePath}. Expected "${category}" but found "${frontmatter.category}".`,
    );
  }

  const mainTsxPath = path.join(taskDir, "main.tsx");
  const mainTsPath = path.join(taskDir, "main.ts");
  const promptFilePath = path.join(taskDir, "prompt.md");
  const reviewFilePath = path.join(taskDir, "review.md");

  const [mainTsxExists, mainTsExists, promptBody, reviewBody] = await Promise.all([
    readOptionalFile(mainTsxPath).then((value) => value !== null),
    readOptionalFile(mainTsPath).then((value) => value !== null),
    readOptionalFile(promptFilePath),
    readOptionalFile(reviewFilePath),
  ]);

  const mainFileName = mainTsxExists ? "main.tsx" : mainTsExists ? "main.ts" : null;

  return {
    ...frontmatter,
    taskBody: body,
    taskFilePath,
    mainFileName,
    promptFilePath: promptBody ? promptFilePath : null,
    reviewFilePath: reviewBody ? reviewFilePath : null,
    hasReview: reviewBody !== null,
    mastery: reviewBody ? parseMastery(reviewBody) : null,
  };
}

export const getAllTasks = cache(async (): Promise<TaskSummary[]> => {
  const categoryEntries = await readOptionalDirectory(TASKS_ROOT);
  const tasks: TaskSummary[] = [];
  const seenSlugs = new Set<string>();

  for (const categoryEntry of categoryEntries) {
    if (!categoryEntry.isDirectory()) {
      continue;
    }

    const category = categoryEntry.name;
    const taskEntries = await readOptionalDirectory(path.join(TASKS_ROOT, category));

    for (const taskEntry of taskEntries) {
      if (!taskEntry.isDirectory()) {
        continue;
      }

      const summary = await readTaskSummary(category, taskEntry.name);

      if (!summary) {
        continue;
      }

      if (seenSlugs.has(summary.slug)) {
        throw new Error(`Duplicate task slug detected: "${summary.slug}"`);
      }

      seenSlugs.add(summary.slug);
      tasks.push(summary);
    }
  }

  return tasks.sort((left, right) => left.title.localeCompare(right.title));
});

export const getTaskBySlug = cache(async (slug: string): Promise<TaskDocument | null> => {
  const task = (await getAllTasks()).find((entry) => entry.slug === slug);

  if (!task) {
    return null;
  }

  const [promptBody, reviewBody] = await Promise.all([
    task.promptFilePath ? readOptionalFile(task.promptFilePath) : Promise.resolve(null),
    task.reviewFilePath ? readOptionalFile(task.reviewFilePath) : Promise.resolve(null),
  ]);

  return {
    ...task,
    promptBody: promptBody?.trim() ?? null,
    reviewBody: reviewBody?.trim() ?? null,
  };
});

export async function getTaskFilterOptions() {
  const tasks = await getAllTasks();

  return {
    categories: Array.from(new Set(tasks.map((task) => task.category))).sort(),
    difficulties: Array.from(new Set(tasks.map((task) => task.difficulty))).sort(),
    masteryLevels: Array.from(
      new Set(
        tasks.flatMap((task) =>
          task.mastery ? [String(task.mastery.level)] : [],
        ),
      ),
    ).sort((left, right) => Number(left) - Number(right)),
    progress: ["not-started", "reviewed"],
  };
}

export function filterTasks(tasks: TaskSummary[], filters: TaskFilters): TaskSummary[] {
  return tasks.filter((task) => {
    if (filters.category && task.category !== filters.category) {
      return false;
    }

    if (filters.difficulty && task.difficulty !== filters.difficulty) {
      return false;
    }

    if (filters.mastery && String(task.mastery?.level) !== filters.mastery) {
      return false;
    }

    if (filters.preview === "with-preview" && !task.hasPreview) {
      return false;
    }

    if (filters.preview === "without-preview" && task.hasPreview) {
      return false;
    }

    if (filters.progress === "not-started" && task.hasReview) {
      return false;
    }

    if (filters.progress === "reviewed" && !task.hasReview) {
      return false;
    }

    return true;
  });
}

export function getMasteryLabel(mastery: TaskMastery) {
  return `Mastery: ${mastery.level}/5 — ${mastery.label}`;
}

export function getProgressLabel(hasReview: boolean) {
  return hasReview ? "Reviewed" : "Not started";
}
