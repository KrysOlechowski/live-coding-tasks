---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "stale-async-responses"
  - "async-state-modeling"
secondaryTopics:
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
- Rationale: The candidate must coordinate several visible states across overlapping asynchronous completions, then extend the lifecycle without replacing the Core Task guarantee.

## Core Task

### Purpose

Evaluate whether the candidate can distinguish request order from completion order and keep a complete search UI aligned with the latest query.

### Expected evidence

- Reproduces or traces the ordering problem before changing the implementation.
- Protects results, loading, and errors consistently rather than fixing only the result list.
- Handles clearing the input while an earlier request is still pending.
- Can state the rule that determines whether a completion may affect the UI.
- Preserves the provided API, layout, and TypeScript safety.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: stale-async-responses
- Prompt: If `al` is entered and then `ali` is entered before the first search finishes, what completion orders are possible and what could the current widget display?
- Purpose: Check whether the candidate can reason about initiation and completion order before choosing a repair.
- Expected evidence: Describes both completion orders and identifies that the older completion can overwrite newer visible state.

#### core-start-2

- Kind: diagnostic
- Topic: async-state-modeling
- Prompt: Which visible values must belong to the same logical search for the widget to be internally consistent?
- Purpose: Test whether the candidate treats the bug as a complete state-lifecycle problem rather than only a result-list problem.
- Expected evidence: Includes the current query, results, loading indicator, error, and empty or no-results state.

### Checkpoint questions

#### core-checkpoint-1

- Kind: counterexample
- Topic: stale-async-responses
- Prompt: What prevents an older failed request from showing an error after the newest request has already succeeded?
- Purpose: Verify that the chosen ordering guarantee applies equally to successful and failed completions.
- Expected evidence: Applies one precise latest-request rule to both branches instead of special-casing only results.

#### core-checkpoint-2

- Kind: teaching
- Topic: async-state-modeling
- Prompt: Explain how your implementation decides when loading may become false and why an older request cannot make that decision for a newer one.
- Purpose: Check ownership of the complete UI-state model and expose partial fixes that leave loading inconsistent.
- Expected evidence: Connects the loading transition to the currently relevant request rather than any request that happens to finish.

### Review focus

- Latest-query correctness across success, error, loading, empty input, and no results.
- Consistency of the acceptance rule across every asynchronous branch.
- Clarity and proportionality of the state model.

## Follow-up 1

### Reveal

The search now represents expensive work that should stop when it is no longer useful. Extend the mock API to accept an `AbortSignal`, then cancel the previous search when a new non-empty query starts and when the widget unmounts. Cancellation must not appear as an error, and all Core Task behavior must remain correct.

### Purpose

Distinguish preventing stale UI writes from cancelling underlying work and test cleanup across query changes and component lifecycle boundaries.

### Topics

- request-cancellation
- effect-lifecycle

### Expected evidence

- Extends the async boundary with a clear cancellation contract.
- Cancels superseded work and work owned by an unmounted widget.
- Treats expected cancellation differently from a real request failure.
- Preserves the Core Task's latest-query guarantee even if cancellation races with completion.

### Start questions

#### follow-up-1-start-1

- Kind: tradeoff
- Topic: request-cancellation
- Prompt: What is the difference between ignoring a completion that is no longer relevant and stopping the underlying work?
- Purpose: Make the candidate distinguish the guarantees and costs of stale-write protection and cancellation.
- Expected evidence: Explains that both can protect visible state, while only cancellation asks the async operation to stop consuming work.

#### follow-up-1-start-2

- Kind: prediction
- Topic: effect-lifecycle
- Prompt: At which two lifecycle transitions does the currently owned search become obsolete in this requirement?
- Purpose: Check whether cleanup ownership covers both replacement by a new query and removal of the component.
- Expected evidence: Identifies superseding query changes and unmount as separate cleanup boundaries.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: counterexample
- Topic: request-cancellation
- Prompt: What happens if cancellation and a successful completion occur almost at the same time?
- Purpose: Verify that cancellation supplements rather than replaces the Core Task's ordering guarantee.
- Expected evidence: Explains why visible state remains tied to the latest request regardless of which event wins the race.

#### follow-up-1-checkpoint-2

- Kind: teaching
- Topic: effect-lifecycle
- Prompt: Why should an expected cancellation not use the same UI error path as a failed latest request?
- Purpose: Reinforce the semantic distinction between lifecycle cleanup and a user-visible failure.
- Expected evidence: Describes cancellation as an intentional obsolete-work outcome and preserves real failure reporting.

### Review focus

- Correct cancellation on replacement and unmount.
- Separation of expected cancellation from genuine errors.
- Preservation of all Core Task ordering and UI-state behavior.
