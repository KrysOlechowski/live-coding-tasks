---
title: "Fix Stale Account Lookup Results"
category: "async"
taskType: "fix-bug"
difficulty: "medium"
hasPreview: "true"
previewEntry: "main.tsx"
primarySkill: "Preventing stale async responses from overwriting newer UI state"
secondarySkill: "Managing loading, error, and retry behavior predictably"
problemShape: "stale-async-response"
interviewFocus: "debugging-process"
reviewFocus:
  - "correctness"
  - "async-safety"
  - "ui-behavior"
  - "edge-cases"
tags:
  - "async"
  - "race-condition"
  - "loading-state"
  - "error-handling"
  - "debugging"
---

# Fix Stale Account Lookup Results

## Context

You are working on a small internal account lookup widget.

The widget lets a support agent search for an account by email address. The existing implementation already performs fake async lookups, but users report that the UI sometimes shows the wrong account after typing quickly or retrying after an error.

## Goal

Fix the broken async behavior so the widget always displays results for the latest requested email address.

The task is not to redesign the widget. Your goal is to debug the async state flow and make loading, success, error, and retry behavior predictable.

## Requirements

- The widget should let the user enter an email address.
- The user should be able to submit a lookup request.
- Submitting an empty email should show a validation error without starting a lookup.
- While a lookup is in progress:
  - the UI should show a loading state
  - the submit button should communicate that work is in progress
- If the lookup succeeds:
  - show the account result for the email that was most recently submitted
  - clear any previous async error
  - stop showing the loading state
- If the lookup fails:
  - show the error for the email that was most recently submitted
  - keep the searched email visible
  - stop showing the loading state
- If multiple lookups overlap, older responses must not overwrite newer UI state.
- Editing the input after a completed lookup should not immediately erase the last result unless a new lookup starts or the input is cleared.
- Clearing the input should clear validation errors, async errors, and the displayed account result.
- Retrying after an error should run a new lookup for the current email and should not reuse stale error or success state.

## Constraints

- Do not add real API calls.
- Do not add external data-fetching libraries.
- Keep the solution local to the task files.
- Keep the UI simple and focused on behavior.
- You may use React state, refs, effects, or other built-in React tools where appropriate.

## Non-goals

- Do not implement authentication.
- Do not add routing.
- Do not build a full support dashboard.
- Do not implement caching across different emails.
- Do not add server-side persistence.

## Acceptance Criteria

- The widget never displays an account result from an older request after a newer request has been submitted.
- The loading state always reflects the latest active lookup.
- Success and error states cannot be overwritten by stale async responses.
- Empty input validation does not trigger an async lookup.
- Retry behavior works after an error.
- Clearing the input resets the widget to a clean state.
- The implementation is readable enough to explain during a live-coding interview.
