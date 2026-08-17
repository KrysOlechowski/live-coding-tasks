---
schemaVersion: 1
slug: "fix-stale-customer-search"
---

# Live Coding Task Package

## task.md

```markdown
---
title: "Fix stale customer search results"
category: "async"
taskType: "fix-bug"
difficulty: "medium"
hasPreview: true
previewEntry: "main.tsx"
primarySkill: "async request ordering"
secondarySkill: "React state modeling"
problemShape: "stale-async-response"
interviewFocus: "race-condition handling in an interactive search flow"
reviewFocus:
  - "correctness"
  - "async-safety"
  - "ui-behavior"
tags:
  - "async"
  - "react"
  - "search"
---

# Fix stale customer search results

## Context

An internal customer search widget requests matching customers whenever the query changes. The mock API intentionally responds at different speeds, and the visible results can end up showing an older query.

## Goal

Fix the existing widget so its visible state always belongs to the most recent search request.

## Requirements

- Typing a query displays the results for the latest submitted query only.
- An older response must not replace results from a newer request.
- The loading state must describe the latest request.
- A failed latest request must show its error without restoring stale results.
- Empty input must clear results, loading state, and errors.

## Constraints

- Keep the provided mock API unchanged.
- Do not add external dependencies.
- Preserve the existing visible layout.

## Non-goals

- Debouncing the input is not required.
- Caching previous search results is not required.

## Acceptance Criteria

- Rapidly entering two different queries cannot leave results from the older query visible.
- Loading, success, empty, and error states correspond to the latest query.
- Existing TypeScript types remain intact.
```

## interviewer.md

```markdown
---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "stale-async-responses"
secondaryTopics:
  - "async-state-modeling"
  - "request-cancellation"
  - "effect-lifecycle"
---

# Interviewer Plan

## Core Task

### Purpose

Test whether the candidate can reason about request order separately from response order and keep related UI state consistent.

### Expected evidence

- Identifies that completion order can differ from request order.
- Protects results, loading, and error state consistently rather than fixing only the visible list.
- Can explain why the chosen approach accepts or rejects a response.

### Checkpoint focus

- Whether rapid query changes preserve the latest request's complete UI state.
- Whether the candidate can explain the race without relying only on trial and error.

### Review focus

- Correctness across success, error, loading, and empty states.
- Clarity of the request-lifecycle model.
- Unnecessary complexity or state duplication.

## Follow-up 1

### Reveal

The widget may now be removed while a search is still pending. Ensure that a late completion cannot update state after the widget is unmounted, while preserving all Core Task behavior.

### Purpose

Extend request-order reasoning into lifecycle cleanup without changing the main problem domain.

### Topics

- request-cancellation
- effect-lifecycle

### Expected evidence

- Handles the pending request when the component lifecycle ends.
- Distinguishes lifecycle cleanup from choosing the latest response.
- Can explain what the chosen cleanup mechanism guarantees.

### Review focus

- Cleanup correctness.
- Preservation of the Core Task behavior.
- Explanation of lifecycle and cancellation trade-offs.
```
