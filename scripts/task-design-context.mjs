import { loadRepository, buildPracticeIndex, practicePriorities, ALLOWED_CATEGORIES, ALLOWED_DIFFICULTIES, ALLOWED_TASK_TYPES } from "./lib/task-data.mjs";

function options(args) {
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, "");
    if (!["category", "difficulty", "topic", "shape"].includes(key) || !args[i + 1]) throw new Error("Usage: npm run task:design-context -- [--category async] [--difficulty medium] [--topic debounce] [--shape timer-lifecycle]");
    result[key] = args[i + 1];
  }
  if (result.category && !ALLOWED_CATEGORIES.includes(result.category)) throw new Error("Unknown category.");
  if (result.difficulty && !ALLOWED_DIFFICULTIES.includes(result.difficulty)) throw new Error("Unknown difficulty.");
  return result;
}

try {
  const filters = options(process.argv.slice(2));
  const { records, catalog } = await loadRepository();
  if (filters.topic && !catalog.topics.some((topic) => topic.id === filters.topic)) throw new Error("Unknown topic. Add a new canonical topic to data/topic-catalog.json before selecting it.");
  const index = buildPracticeIndex(records, catalog);
  const eligible = (item) => !filters.category || item.category === filters.category;
  const priorities = practicePriorities(index.topics).filter(eligible);
  const coverage = index.topics.filter(eligible).sort((a, b) => a.assignedCount - b.assignedCount || a.id.localeCompare(b.id));
  const chosenIds = new Set([...priorities.slice(0, 5), ...coverage.slice(0, 8)].map((topic) => topic.id));
  if (filters.topic) chosenIds.add(filters.topic);
  const related = index.tasks.filter((task) =>
    (filters.topic && task.topics.includes(filters.topic)) || (filters.shape && task.problemShape === filters.shape));
  // Full history is examined locally. Only bounded candidates are sent to the model.
  const examples = related.length ? related : index.tasks.filter(eligible);
  const context = {
    filters, totalTasks: index.tasks.length,
    guidance: "Respect user constraints. Revisit a gap in a different problem shape; otherwise diversify coverage. Unreviewed work is not evidence of mastery. Check related task briefs if similarity is unclear.",
    priorities: priorities.slice(0, 5).map(({ id, outcome, evidence, difficultyCount, latestTask, reviewedAt }) => ({ topic: id, outcome, evidence: evidence?.slice(0, 240), difficultyCount, latestTask, reviewedAt })),
    candidates: catalog.topics.filter((topic) => chosenIds.has(topic.id)).slice(0, 14),
    coverage: [...(filters.topic ? coverage.filter((topic) => topic.id === filters.topic) : []), ...coverage.filter((topic) => topic.id !== filters.topic)].slice(0, 8).map(({ id, assignedCount, reviewedCount }) => ({ topic: id, assignedCount, reviewedCount })),
    categoryCoverage: Object.fromEntries(ALLOWED_CATEGORIES.map((category) => [category, index.tasks.filter((task) => task.category === category).length])),
    taskTypeCoverage: Object.fromEntries(ALLOWED_TASK_TYPES.map((taskType) => [taskType, index.tasks.filter((task) => task.taskType === taskType).length])),
    shapeCoverage: Object.fromEntries([...new Set(index.tasks.map((task) => task.problemShape))].sort().map((shape) => [shape, index.tasks.filter((task) => task.problemShape === shape).length]).slice(0, 12)),
    relatedTaskCount: related.length,
    tasks: examples.sort((a, b) => (b.reviewedAt ?? b.createdAt).localeCompare(a.reviewedAt ?? a.createdAt) || a.slug.localeCompare(b.slug)).slice(0, 10)
      .map(({ slug, category, taskType, difficulty, problemShape, topics, mastery }) => ({ slug, category, taskType, difficulty, problemShape, topics, mastery })),
  };
  console.log(JSON.stringify(context, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
