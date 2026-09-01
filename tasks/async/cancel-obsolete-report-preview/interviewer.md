---
schemaVersion: 1
plannedFollowUps: 0
primaryTopics:
  - "request-cancellation"
  - "effect-lifecycle"
secondaryTopics:
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 0
- Interactions: 1
- Edge cases: 1
- Conceptual depth: 1
- Change surface: 0
- Follow-up escalation: 0
- Total: 3
- Rating: easy
- Rationale: The intended mechanism is explicit and the change is local, while the candidate must still connect effect ownership with cleanup and distinguish cancellation from a real failure.

## Core Task

### Purpose

Give the candidate a focused repetition of request cancellation and effect lifecycle after those topics were not demonstrated in the earlier search task.

### Expected evidence

- Creates one cancellation owner for each effect execution.
- Connects cleanup to the asynchronous work started by that execution.
- Passes the matching signal through the existing API boundary.
- Treats expected cancellation differently from a genuine failure.
- Explains both dependency-change and unmount cleanup using the same ownership rule.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: effect-lifecycle
- Prompt: When the selected report changes while loading is still in progress, what happens to the previous effect execution and to the asynchronous work it already started?
- Purpose: Separate React's effect lifecycle from the independent lifetime of work started by the effect.
- Expected evidence: Recognizes that cleanup can run while the asynchronous operation would otherwise continue on its own.

#### core-start-2

- Kind: diagnostic
- Topic: request-cancellation
- Prompt: Which outcomes from `fetchReport` represent a real failure for the user, and which outcome represents work that is no longer needed?
- Purpose: Check whether the candidate can classify cancellation before implementing error handling.
- Expected evidence: Distinguishes the unavailable-report failure from an intentional abort caused by lifecycle cleanup.

### Checkpoint questions

#### core-checkpoint-1

- Kind: teaching
- Topic: request-cancellation
- Prompt: Why is the controller created for one effect execution instead of being shared by every report request?
- Purpose: Reinforce cancellation ownership rather than memorization of the API syntax.
- Expected evidence: Explains that cleanup should abort exactly the work started by the corresponding effect execution and that an aborted controller cannot be reused for later work.

#### core-checkpoint-2

- Kind: transfer
- Topic: effect-lifecycle
- Prompt: At which lifecycle moments can this cleanup run, and why does the same cleanup correctly cover each of them?
- Purpose: Connect the implemented cleanup to both dependency replacement and unmount without adding another coding stage.
- Expected evidence: Identifies dependency change and unmount, and explains that both end ownership of the current effect's request.

### Review focus

- One controller and signal per effect execution.
- Cleanup cancellation on dependency change and unmount.
- Expected aborts excluded from the genuine error path.
- Existing loading, success, and real-failure behavior preserved.
