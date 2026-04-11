import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

const TASKS_ROOT = path.join(process.cwd(), "tasks");

type TaskCategory = "debugging" | "react" | "typescript" | string;
type TaskDifficulty = "easy" | "medium" | "hard" | string;

type TaskFrontmatter = {
  title: string;
  slug: string;
  category: TaskCategory;
  type: string;
  difficulty: TaskDifficulty;
  penalty: number;
  hasPreview: boolean;
  previewEntry?: string;
};

export type TaskSummary = TaskFrontmatter & {
  taskBody: string;
  taskFilePath: string;
  mainFileName: string | null;
  promptFilePath: string | null;
  reviewFilePath: string | null;
};

export type TaskDocument = TaskSummary & {
  promptBody: string | null;
  reviewBody: string | null;
};

type TaskFilters = {
  category?: string;
  difficulty?: string;
  penalty?: string;
  preview?: string;
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

  return trimmedValue;
}

function parseFrontmatter(source: string): {
  data: Record<string, boolean | number | string>;
  body: string;
} {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Task file is missing frontmatter.");
  }

  const [, rawFrontmatter, body] = match;
  const data: Record<string, boolean | number | string> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");

    if (separatorIndex === -1) {
      throw new Error(`Invalid frontmatter line: "${trimmedLine}"`);
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1);
    data[key] = parseFrontmatterValue(value);
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

function coerceFrontmatter(
  data: Record<string, boolean | number | string>,
  filePath: string,
): TaskFrontmatter {
  const title = data.title;
  const slug = data.slug;
  const category = data.category;
  const type = data.type;
  const difficulty = data.difficulty;
  const penalty = data.penalty;
  const hasPreview = data.hasPreview;
  const previewEntry = data.previewEntry;

  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof category !== "string" ||
    typeof type !== "string" ||
    typeof difficulty !== "string" ||
    typeof penalty !== "number" ||
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
    type,
    difficulty,
    penalty,
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
  const frontmatter = coerceFrontmatter(data, taskFilePath);

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
  };
}

export const getAllTasks = cache(async (): Promise<TaskSummary[]> => {
  const categoryEntries = await fs.readdir(TASKS_ROOT, { withFileTypes: true });
  const tasks: TaskSummary[] = [];
  const seenSlugs = new Set<string>();

  for (const categoryEntry of categoryEntries) {
    if (!categoryEntry.isDirectory()) {
      continue;
    }

    const category = categoryEntry.name;
    const taskEntries = await fs.readdir(path.join(TASKS_ROOT, category), {
      withFileTypes: true,
    });

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
    penalties: Array.from(new Set(tasks.map((task) => String(task.penalty)))).sort(),
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

    if (filters.penalty && String(task.penalty) !== filters.penalty) {
      return false;
    }

    if (filters.preview === "with-preview" && !task.hasPreview) {
      return false;
    }

    if (filters.preview === "without-preview" && task.hasPreview) {
      return false;
    }

    return true;
  });
}

export function getPenaltyLabel(penalty: number) {
  if (penalty <= 0) {
    return "No penalty";
  }

  return `${"★".repeat(penalty)}${"☆".repeat(Math.max(0, 3 - penalty))}`;
}
