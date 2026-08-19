---
title: "Fix stale customer search results"
category: "async"
taskType: "fix-bug"
difficulty: "medium"
hasPreview: true
previewEntry: "main.tsx"
primarySkill: "Keep search UI state aligned with the latest asynchronous request"
secondarySkill: "Handle loading, error, result, and empty states consistently"
problemShape: "stale-async-response"
interviewFocus: "Reason about request order, completion order, and observable UI state"
reviewFocus:
  - "correctness"
  - "async-safety"
  - "ui-behavior"
  - "error-handling"
tags:
  - "react"
  - "async"
  - "search"
  - "stale-responses"
---

# Fix stale customer search results

## Context

An internal customer search widget requests matching customers whenever its input changes. The provided mock API intentionally takes different amounts of time for different queries.

When a user types quickly, the visible results, loading indicator, or error can describe an older query instead of the current input.

## Goal

Fix the existing widget so every visible search state belongs to the latest non-empty query.

## Requirements

- Results from an older request must never replace results for a newer query.
- The loading indicator must describe only the latest query's request.
- A failure from the latest request must show its error and clear results that no longer apply.
- A failure from an older request must not replace a newer query's state.
- Clearing the input must clear results, loading state, and errors immediately.
- A request that finishes after the input was cleared must not repopulate the widget.

## Constraints

- Keep the provided mock API and customer data unchanged during the Core Task.
- Do not add external dependencies.
- Preserve the existing visible layout and immediate search-on-change behavior.

## Non-goals

- Debouncing is not required.
- Caching previous searches is not required.

## Acceptance Criteria

- Entering `al` and then `ali` quickly cannot leave results for `al` visible after the requests finish.
- Entering `error` and then a valid longer query quickly cannot leave the older error visible.
- Loading, success, failure, no-results, and cleared-input states all correspond to the current input.
- Existing TypeScript types remain intact without `any` or unsafe assertions.
