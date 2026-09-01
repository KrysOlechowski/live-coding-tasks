---
title: "Cancel an obsolete report preview request"
category: "async"
taskType: "complete-partial-implementation"
difficulty: "easy"
hasPreview: true
previewEntry: "main.tsx"
primarySkill: "Cancel asynchronous work owned by an obsolete React effect"
secondarySkill: "Distinguish expected cancellation from a genuine request failure"
problemShape: "effect-owned-request-cancellation"
interviewFocus: "AbortController ownership, effect cleanup, and cancellation handling"
reviewFocus:
  - "correctness"
  - "async-safety"
  - "ui-behavior"
  - "error-handling"
tags:
  - "react"
  - "async"
  - "abort-controller"
  - "effect-cleanup"
---

# Cancel an obsolete report preview request

## Context

An analytics panel loads a preview whenever the user selects a report. The mock API already accepts an optional `AbortSignal` and logs request events in the browser console.

The component currently starts a new request when the selection changes, but it never stops work started by the previous effect. Expected cancellation would also be handled like a normal error by the current code.

## Goal

Complete the request lifecycle so work owned by an obsolete effect is cancelled and expected cancellation does not appear as a failure.

## Requirements

- Create an `AbortController` for each report-loading effect.
- Pass its signal to the provided `fetchReport` function.
- Cancel the effect's request when its cleanup runs.
- Do not show an error for an expected abort.
- Continue to show genuine request failures.
- Preserve the existing report selection and loading behavior.

## Constraints

- Do not change the provided mock API behavior or report data.
- Do not add external dependencies.
- Keep the implementation inside the existing component and mock API boundary.

## Acceptance Criteria

- Switching from the slow report to another report cancels the slow request.
- Removing the component while a request is active would cancel that request through the same cleanup.
- An aborted request does not replace the current preview or show an error.
- Selecting the unavailable report still displays its genuine error.
- Request events in the browser console distinguish completed, cancelled, and failed work.

