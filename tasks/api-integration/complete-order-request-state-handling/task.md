---
title: "Complete Order Request State Handling"
category: "api-integration"
taskType: "complete-partial-implementation"
difficulty: "medium"
hasPreview: "true"
previewEntry: "main.tsx"
primarySkill: "Handling request lifecycle states in a React UI"
secondarySkill: "Keeping API-driven UI behavior predictable and recoverable"
problemShape: "request-state-lifecycle"
interviewFocus: "Complete a partially implemented API-driven screen with loading, empty, error, success, and retry behavior"
reviewFocus:
  - "correctness"
  - "ui-behavior"
  - "async-safety"
  - "edge-cases"
  - "readability"
tags:
  - "react"
  - "api-integration"
  - "async"
  - "request-state"
  - "error-handling"
---

# Complete Order Request State Handling

## Context

You are working on a small admin screen that displays recent customer orders fetched from an API.

The starter implementation already contains the basic component structure and a partially implemented API client, but the request lifecycle is incomplete. The screen currently works only for the simplest successful response and does not properly handle loading, empty results, failed requests, or retry behavior.

## Goal

Complete the order list screen so that it correctly handles loading, success, empty, error, and retry states when fetching orders from the API.

## Requirements

- The screen must fetch orders when it is first opened.
- While the initial request is in progress, the UI must show a loading state.
- When the request succeeds with orders, the UI must display the order list.
- Each order item must show:
  - order number
  - customer name
  - total amount
  - status
  - creation date
- When the request succeeds with an empty list, the UI must show an empty state instead of an empty container.
- When the request fails, the UI must show an error state.
- The error state must include a retry action.
- Clicking retry must start a new request.
- While retrying after an error, the UI must clearly indicate that a new request is in progress.
- A successful retry must replace the error state with the order list or empty state.
- The UI must not show stale error messages after a successful retry.
- The UI must not show stale orders after a failed retry unless the starter code explicitly separates initial load and background refresh behavior.
- Request state should be represented clearly enough that impossible or confusing UI combinations are avoided.

## Constraints

- Do not introduce external data-fetching libraries.
- Do not add global state management.
- Do not change the public API contract unless the starter code is internally inconsistent.
- Do not add pagination, sorting, or filtering.
- Keep the solution appropriate for a focused live-coding task.
- Keep the code readable and easy to explain during review.

## Non-goals

- Building a full order management dashboard.
- Implementing authentication.
- Implementing server-side changes.
- Adding optimistic updates.
- Adding caching.
- Adding skeleton loaders unless the starter UI already uses them.

## Acceptance Criteria

- Initial loading state appears before data is available.
- Successful responses with orders render the order list correctly.
- Successful responses with no orders render a clear empty state.
- Failed requests render a clear error state.
- Retry triggers a new request.
- Retry loading state is visible to the user.
- Successful retry clears the previous error.
- Failed retry does not leave the UI in a confusing mixed state.
- The implementation avoids impossible request-state combinations.
- The final code is understandable and suitable for a live-coding interview discussion.
