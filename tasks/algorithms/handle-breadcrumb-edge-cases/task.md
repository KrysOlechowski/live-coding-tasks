---
title: "Handle Breadcrumb Edge Cases"
category: "algorithms"
taskType: "handle-edge-cases"
difficulty: "medium"
primarySkill: "Handling edge cases in hierarchical data"
secondarySkill: "Designing predictable output from imperfect input"
problemShape: "hierarchy-reconstruction-edge-cases"
interviewFocus: "Build reliable breadcrumb output from a flat category list with malformed or incomplete relationships"
reviewFocus:
  - "correctness"
  - "edge-cases"
  - "readability"
  - "data-modeling"
tags:
  - "algorithms"
  - "data-structures"
  - "hierarchy"
  - "edge-cases"
  - "breadcrumbs"
---

# Handle Breadcrumb Edge Cases

## Context

You are working on an ecommerce frontend that receives a flat list of product categories from an API.

Each category may reference a parent category. The UI needs to show breadcrumbs for a selected category, but the API data is not always clean. Some categories may reference missing parents, some may be inactive, and some malformed data may accidentally create cycles.

The starter code contains category types, sample data, and a partially implemented breadcrumb function.

## Goal

Complete the breadcrumb builder so it returns a predictable breadcrumb path for a selected category, even when the category data contains edge cases.

## Requirements

- The function must accept:
  - a flat list of categories
  - a selected category ID
- The function must return a breadcrumb path for the selected category.
- Breadcrumb items must be ordered from the highest available ancestor to the selected category.
- Each breadcrumb item must include the category ID and display label.
- If the selected category does not exist, the function must return an empty breadcrumb path.
- If a parent category is missing, the function must return the highest valid partial path it can build.
- If a category is inactive, it must not appear in the breadcrumb path.
- If the selected category is inactive, the function must return an empty breadcrumb path.
- If the category relationships contain a cycle, the function must avoid infinite loops.
- Duplicate category IDs in the input must be handled predictably.
- The function must not mutate the input category list.
- The output must be stable for the same input.

## Constraints

- Do not use external libraries.
- Do not change the public category type unless the starter code is internally inconsistent.
- Do not assume categories are sorted.
- Do not assume parent categories appear before child categories.
- Do not throw for malformed hierarchy data.
- Keep the solution appropriate for a focused live-coding task.

## Non-goals

- Rendering breadcrumbs in React.
- Fetching categories from an API.
- Supporting multiple category trees visually.
- Adding localization.
- Adding permission checks.
- Building a full category management system.

## Acceptance Criteria

- A normal parent-child chain returns a complete breadcrumb path.
- A root category returns a single-item breadcrumb path.
- An unknown selected category ID returns an empty path.
- An inactive selected category returns an empty path.
- Inactive ancestors are excluded from the returned path.
- Missing parents do not crash the function.
- Cycles do not cause infinite loops.
- Duplicate IDs are handled consistently.
- Input categories are not mutated.
- The final implementation is easy to explain during an interview.
