import assert from "node:assert/strict";
import { test } from "node:test";
import { tsImport } from "tsx/esm/api";

const { default: { filterTasks } } = await tsImport("../../src/lib/tasks.ts", import.meta.url);
const tasks = [
  { slug: "guided", repeat: true, reviewedAt: null, mastery: null, category: "async", difficulty: "easy", hasPreview: false },
  { slug: "reviewed-revisit", repeat: true, reviewedAt: "2026-11-25T10:00:00Z", mastery: 3, category: "react", difficulty: "medium", hasPreview: true },
  { slug: "unmarked", repeat: false, reviewedAt: null, mastery: null, category: "async", difficulty: "easy", hasPreview: false },
];
const slugs = (filters) => filterTasks(tasks, filters).map((task) => task.slug);

test("revisit filter includes flagged tasks regardless of review status", () => {
  assert.deepEqual(slugs({ repeat: "to-revisit" }), ["guided", "reviewed-revisit"]);
  assert.deepEqual(slugs({ repeat: "" }), tasks.map((task) => task.slug));
  assert.deepEqual(slugs({}), tasks.map((task) => task.slug));
});

test("revisit filter combines with existing filters without changing their behavior", () => {
  assert.deepEqual(slugs({ progress: "not-reviewed" }), ["guided", "unmarked"]);
  assert.deepEqual(slugs({ repeat: "to-revisit", progress: "not-reviewed" }), ["guided"]);
  assert.deepEqual(slugs({ repeat: "to-revisit", progress: "reviewed", mastery: "3", category: "react", difficulty: "medium", preview: "with-preview" }), ["reviewed-revisit"]);
  assert.deepEqual(slugs({ repeat: "to-revisit", category: "async", difficulty: "easy", preview: "without-preview" }), ["guided"]);
  assert.deepEqual(slugs({ repeat: "to-revisit", mastery: "5" }), []);
});
