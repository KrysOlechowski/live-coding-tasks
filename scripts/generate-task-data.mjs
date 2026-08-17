import { promises as fs } from "node:fs";
import path from "node:path";

import {
  ROOT,
  collectTaskDirs,
  getActiveAttempt,
  readTaskRecord,
  readTopicCatalog,
} from "./lib/task-data.mjs";

const TASK_INDEX_FILE = path.join(ROOT, "data", "task-index.json");
const LEARNING_SUMMARY_FILE = path.join(
  ROOT,
  "data",
  "learning-summary.json",
);
const PRIORITY_RANK = { low: 1, medium: 2, high: 3 };
const PRIORITY_BY_RANK = { 1: "low", 2: "medium", 3: "high" };

function latestDate(left, right) {
  if (!left) {
    return right ?? null;
  }

  if (!right) {
    return left;
  }

  return left > right ? left : right;
}

function toTaskIndexItem(record) {
  const activeAttempt = getActiveAttempt(record.session);
  const review = activeAttempt?.review ?? null;

  return {
    slug: record.slug,
    title: record.taskFrontmatter.title,
    category: record.taskFrontmatter.category,
    taskType: record.taskFrontmatter.taskType,
    difficulty: record.taskFrontmatter.difficulty,
    primarySkill: record.taskFrontmatter.primarySkill,
    secondarySkill: record.taskFrontmatter.secondarySkill,
    problemShape: record.taskFrontmatter.problemShape,
    reviewFocus: record.taskFrontmatter.reviewFocus,
    tags: record.taskFrontmatter.tags,
    primaryTopics: record.interviewerFrontmatter.primaryTopics,
    secondaryTopics: record.interviewerFrontmatter.secondaryTopics,
    hasPreview: record.taskFrontmatter.hasPreview === true,
    previewEntry: record.taskFrontmatter.previewEntry ?? null,
    status: activeAttempt.status,
    createdAt: record.session.attempts[0].createdAt,
    mastery: review?.mastery ?? null,
    needsRepetition: review?.needsRepetition ?? null,
    reviewedAt: review?.reviewedAt ?? null,
  };
}

function updateRepetitionState(state, event) {
  const { signal } = event;

  if (signal.outcome === "needs-practice") {
    const signalRank = PRIORITY_RANK[signal.priority] ?? 0;

    if (signalRank < PRIORITY_RANK.medium) {
      return;
    }

    if (!state.open) {
      state.open = true;
      state.priorityRank = signalRank;
      state.evidenceCount = 1;
      state.relatedTasks.clear();
    } else {
      state.evidenceCount += 1;
      state.priorityRank = Math.max(state.priorityRank, signalRank);

      if (state.evidenceCount > 1) {
        state.priorityRank = Math.min(PRIORITY_RANK.high, state.priorityRank + 1);
      }
    }

    state.relatedTasks.add(event.slug);
    state.lastReviewedAt = event.reviewedAt;
    state.lastMastery = event.mastery;
    return;
  }

  if (signal.outcome === "improved") {
    if (state.open && state.priorityRank === PRIORITY_RANK.high) {
      state.priorityRank = PRIORITY_RANK.medium;
    }

    state.lastReviewedAt = event.reviewedAt;
    state.lastMastery = event.mastery;
    return;
  }

  if (signal.outcome === "demonstrated") {
    if (["independent", "minimal-help"].includes(signal.independence)) {
      state.open = false;
      state.priorityRank = 0;
      state.evidenceCount = 0;
      state.relatedTasks.clear();
    } else if (state.open && state.priorityRank === PRIORITY_RANK.high) {
      state.priorityRank = PRIORITY_RANK.medium;
    }

    state.lastReviewedAt = event.reviewedAt;
    state.lastMastery = event.mastery;
  }
}

function buildLearningSummary(taskIndex, records, catalog) {
  const topicById = new Map(catalog.topics.map((topic) => [topic.id, topic]));
  const coverageByTopic = new Map(
    catalog.topics.map((topic) => [
      topic.id,
      {
        topicId: topic.id,
        label: topic.label,
        category: topic.category,
        assignedTasks: new Set(),
        reviewedAttempts: 0,
        demonstratedAttempts: 0,
        coachHints: 0,
        lastReviewedAt: null,
      },
    ]),
  );
  const reviewEvents = [];

  for (const record of records) {
    const assignedTopics = new Set([
      ...record.interviewerFrontmatter.primaryTopics,
      ...record.interviewerFrontmatter.secondaryTopics,
    ]);

    for (const topicId of assignedTopics) {
      coverageByTopic.get(topicId)?.assignedTasks.add(record.slug);
    }

    for (const attempt of record.session.attempts) {
      for (const coachEvent of attempt.coachEvents) {
        const coverage = coverageByTopic.get(coachEvent.topicId);
        if (coverage) {
          coverage.coachHints += 1;
        }
      }

      if (!attempt.review) {
        continue;
      }

      const topicsInReview = new Map();

      for (const signal of attempt.review.topicSignals) {
        const coverage = coverageByTopic.get(signal.topicId);

        if (coverage) {
          coverage.lastReviewedAt = latestDate(
            coverage.lastReviewedAt,
            attempt.review.reviewedAt,
          );
        }

        const previous = topicsInReview.get(signal.topicId);
        topicsInReview.set(signal.topicId, {
          demonstrated:
            previous?.demonstrated || signal.outcome === "demonstrated",
        });

        reviewEvents.push({
          slug: record.slug,
          reviewedAt: attempt.review.reviewedAt,
          mastery: attempt.review.mastery.level,
          signal,
        });
      }

      for (const [topicId, result] of topicsInReview) {
        const coverage = coverageByTopic.get(topicId);
        if (!coverage) {
          continue;
        }

        coverage.reviewedAttempts += 1;
        if (result.demonstrated) {
          coverage.demonstratedAttempts += 1;
        }
      }
    }
  }

  reviewEvents.sort((left, right) =>
    left.reviewedAt.localeCompare(right.reviewedAt),
  );

  const repetitionByTopic = new Map();

  for (const event of reviewEvents) {
    let state = repetitionByTopic.get(event.signal.topicId);

    if (!state) {
      state = {
        open: false,
        priorityRank: 0,
        evidenceCount: 0,
        relatedTasks: new Set(),
        lastReviewedAt: null,
        lastMastery: null,
      };
      repetitionByTopic.set(event.signal.topicId, state);
    }

    updateRepetitionState(state, event);
  }

  const topicsToRevisit = [...repetitionByTopic.entries()]
    .filter(([, state]) => state.open)
    .map(([topicId, state]) => {
      const topic = topicById.get(topicId);
      const coverage = coverageByTopic.get(topicId);

      return {
        topicId,
        label: topic.label,
        category: topic.category,
        priority: PRIORITY_BY_RANK[state.priorityRank],
        evidenceCount: state.evidenceCount,
        coachHints: coverage.coachHints,
        lastMastery: state.lastMastery,
        lastReviewedAt: state.lastReviewedAt,
        relatedTasks: [...state.relatedTasks].sort(),
      };
    })
    .sort((left, right) => {
      const priorityDifference =
        PRIORITY_RANK[right.priority] - PRIORITY_RANK[left.priority];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (right.lastReviewedAt ?? "").localeCompare(
        left.lastReviewedAt ?? "",
      );
    });

  const topicCoverage = [...coverageByTopic.values()]
    .map((coverage) => ({
      topicId: coverage.topicId,
      label: coverage.label,
      category: coverage.category,
      assignedTasks: coverage.assignedTasks.size,
      reviewedAttempts: coverage.reviewedAttempts,
      demonstratedAttempts: coverage.demonstratedAttempts,
      coachHints: coverage.coachHints,
      lastReviewedAt: coverage.lastReviewedAt,
    }))
    .sort((left, right) => left.label.localeCompare(right.label));

  const underPracticedTopics = topicCoverage
    .filter((topic) => topic.assignedTasks === 0)
    .map(({ topicId, label, category }) => ({ topicId, label, category }));

  const categoryCoverage = Object.fromEntries(
    [...new Set(catalog.topics.map((topic) => topic.category))]
      .sort()
      .map((category) => [
        category,
        taskIndex.filter((task) => task.category === category).length,
      ]),
  );
  const taskTypeCoverage = Object.fromEntries(
    [...new Set(taskIndex.map((task) => task.taskType))]
      .sort()
      .map((taskType) => [
        taskType,
        taskIndex.filter((task) => task.taskType === taskType).length,
      ]),
  );
  const recentTasks = [...taskIndex]
    .sort((left, right) => {
      const leftDate = left.reviewedAt ?? left.createdAt;
      const rightDate = right.reviewedAt ?? right.createdAt;
      return rightDate.localeCompare(leftDate);
    })
    .slice(0, 12)
    .map((task) => ({
      slug: task.slug,
      category: task.category,
      taskType: task.taskType,
      difficulty: task.difficulty,
      problemShape: task.problemShape,
      primaryTopics: task.primaryTopics,
      status: task.status,
      mastery: task.mastery?.level ?? null,
    }));

  return {
    schemaVersion: 1,
    topicsToRevisit,
    underPracticedTopics,
    topicCoverage,
    recentTasks,
    categoryCoverage,
    taskTypeCoverage,
  };
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  const [taskDirs, catalog] = await Promise.all([
    collectTaskDirs(),
    readTopicCatalog(),
  ]);
  const records = await Promise.all(taskDirs.map(readTaskRecord));
  const tasks = records
    .map(toTaskIndexItem)
    .sort((left, right) => left.title.localeCompare(right.title));
  const taskIndex = { schemaVersion: 1, tasks };
  const learningSummary = buildLearningSummary(tasks, records, catalog);

  await Promise.all([
    writeJson(TASK_INDEX_FILE, taskIndex),
    writeJson(LEARNING_SUMMARY_FILE, learningSummary),
  ]);

  console.log(
    `Generated task index for ${tasks.length} task(s) and learning summary for ${catalog.topics.length} topic(s).`,
  );
}

void main();
