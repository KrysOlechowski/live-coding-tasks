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

## Difficulty calibration

- Diagnosis: 1
- Interactions: 2
- Edge cases: 1
- Conceptual depth: 1
- Change surface: 1
- Follow-up escalation: 1
- Total: 7
- Rating: medium
- Rationale: The core bug spans asynchronous completion order and several related UI states, while the follow-up adds a distinct component-lifecycle concern.

## Core Task

### Purpose

Test whether the candidate can reason about request order separately from response order and keep related UI state consistent.

### Expected evidence

- Identifies that completion order can differ from request order.
- Protects results, loading, and error state consistently rather than fixing only the visible list.
- Can explain why the chosen approach accepts or rejects a response.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: stale-async-responses
- Prompt: If two searches start in one order but finish in the opposite order, which result will the current component display?
- Purpose: Check whether the candidate can reason about completion order before identifying a repair.
- Expected evidence: Traces both completions and identifies that the older request can overwrite the newer result.

#### core-start-2

- Kind: diagnostic
- Topic: async-state-modeling
- Prompt: Which visible values must all describe the same search request for the UI to be internally consistent?
- Purpose: Test whether the candidate sees the bug as a complete state-lifecycle problem rather than only a result-list problem.
- Expected evidence: Includes results, loading, error, and the active query or request identity.

### Checkpoint questions

#### core-checkpoint-1

- Kind: counterexample
- Topic: stale-async-responses
- Prompt: What happens if an older request fails after the newest request has already succeeded?
- Purpose: Verify that the response-order protection applies consistently to errors as well as successful results.
- Expected evidence: Explains why the older failure cannot replace or invalidate the newest request state.

#### core-checkpoint-2

- Kind: teaching
- Topic: async-state-modeling
- Prompt: Explain the rule your implementation uses to decide whether a completion may update the UI.
- Purpose: Check conceptual ownership of the solution without requiring a specific implementation technique.
- Expected evidence: States a precise acceptance rule tied to the latest request and applies it to loading, success, and failure.

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

### Start questions

#### follow-up-1-start-1

- Kind: prediction
- Topic: effect-lifecycle
- Prompt: What can happen when a pending search completes after the component that started it has been removed?
- Purpose: Surface the lifecycle risk before the candidate changes the implementation.
- Expected evidence: Identifies the late completion and distinguishes it from ordinary stale-result ordering.

#### follow-up-1-start-2

- Kind: tradeoff
- Topic: request-cancellation
- Prompt: What is the difference between preventing a late result from being used and stopping the underlying work?
- Purpose: Separate response ignoring from actual cancellation so the candidate can evaluate guarantees accurately.
- Expected evidence: Explains that the two approaches can preserve UI safety while making different resource and API guarantees.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: counterexample
- Topic: effect-lifecycle
- Prompt: Does your cleanup still work if the query changes and the component remains mounted?
- Purpose: Ensure lifecycle cleanup has not accidentally replaced the Core Task's latest-request protection.
- Expected evidence: Distinguishes effect cleanup during dependency changes from final unmount and preserves both behaviors.

#### follow-up-1-checkpoint-2

- Kind: transfer
- Topic: request-cancellation
- Prompt: What would your approach require from a real HTTP client if you wanted to cancel the network request rather than only ignore its completion?
- Purpose: Connect the mock implementation to a realistic API boundary.
- Expected evidence: Names a cancellation capability or signal contract and explains where it must be passed and cleaned up.

### Review focus

- Cleanup correctness.
- Preservation of the Core Task behavior.
- Explanation of lifecycle and cancellation trade-offs.
```
