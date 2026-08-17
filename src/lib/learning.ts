import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

const LEARNING_SUMMARY_FILE = path.join(
  process.cwd(),
  "data",
  "learning-summary.json",
);

export type TopicToRevisit = {
  topicId: string;
  label: string;
  category: string;
  priority: "low" | "medium" | "high";
  evidenceCount: number;
  coachHints: number;
  lastMastery: number | null;
  lastReviewedAt: string | null;
  relatedTasks: string[];
};

type LearningSummary = {
  schemaVersion: 1;
  topicsToRevisit: TopicToRevisit[];
};

export const getLearningSummary = cache(async (): Promise<LearningSummary> => {
  const source = await fs.readFile(LEARNING_SUMMARY_FILE, "utf8");
  return JSON.parse(source) as LearningSummary;
});
