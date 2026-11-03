import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parseFrontmatter, MASTERY_LABELS } from "../../scripts/lib/task-data.mjs";

export type TopicOutcome = "needs-practice" | "improving" | "demonstrated";
export type PracticeTopic = {
  id: string;
  label: string;
  category: string;
  assignedCount: number;
  reviewedCount: number;
  difficultyCount: number;
  outcome: TopicOutcome | null;
  evidence: string | null;
  reviewedAt: string | null;
  latestTask: string | null;
  relatedTasks: string[];
};
export type TaskSummary = {
  slug: string;
  title: string;
  category: string;
  taskType: string;
  difficulty: string;
  problemShape: string;
  topics: string[];
  hasPreview: boolean;
  previewEntry: string | null;
  mainFileName: string;
  createdAt: string;
  reviewedAt: string | null;
  mastery: number | null;
  requirementVerdict: "yes" | "partially" | "no" | null;
  summary: string;
};
export type PracticeIndex = { schemaVersion: number; tasks: TaskSummary[]; topics: PracticeTopic[] };
export type TaskDocument = TaskSummary & { taskBody: string; reviewBody: string | null };
export type TaskFilters = { category?: string; difficulty?: string; mastery?: string; preview?: string; progress?: string };

export const getPracticeIndex = cache(async (): Promise<PracticeIndex> => {
  return JSON.parse(await fs.readFile(path.join(process.cwd(), "data/practice-index.json"), "utf8")) as PracticeIndex;
});
export const getAllTasks = cache(async () => (await getPracticeIndex()).tasks);

export const getTaskBySlug = cache(async (slug: string): Promise<TaskDocument | null> => {
  const task = (await getAllTasks()).find((entry) => entry.slug === slug);
  if (!task) return null;
  const taskDir = path.join(process.cwd(), "tasks", task.category, task.slug);
  const taskBody = parseFrontmatter(await fs.readFile(path.join(taskDir, "task.md"), "utf8")).body;
  let reviewBody: string | null = null;
  if (task.reviewedAt) reviewBody = parseFrontmatter(await fs.readFile(path.join(taskDir, "review.md"), "utf8")).body;
  return { ...task, taskBody, reviewBody };
});

export async function getTaskFilterOptions() {
  const tasks = await getAllTasks();
  return {
    categories: Array.from(new Set(tasks.map((task) => task.category))).sort(),
    difficulties: ["easy", "medium", "hard"],
    masteryLevels: ["1", "2", "3", "4", "5"],
    progress: ["not-reviewed", "reviewed"],
  };
}
export function filterTasks(tasks: TaskSummary[], filters: TaskFilters): TaskSummary[] {
  return tasks.filter((task) => {
    if (filters.category && task.category !== filters.category) return false;
    if (filters.difficulty && task.difficulty !== filters.difficulty) return false;
    if (filters.mastery && String(task.mastery) !== filters.mastery) return false;
    if (filters.preview === "with-preview" && !task.hasPreview) return false;
    if (filters.preview === "without-preview" && task.hasPreview) return false;
    if (filters.progress === "not-reviewed" && task.reviewedAt !== null) return false;
    if (filters.progress === "reviewed" && task.reviewedAt === null) return false;
    return true;
  });
}
export function getMasteryLabel(mastery: number) {
  return `Mastery: ${mastery}/5 — ${MASTERY_LABELS[mastery as keyof typeof MASTERY_LABELS]}`;
}
export function getProgressLabel(reviewed: boolean) { return reviewed ? "Reviewed" : "Not reviewed"; }
