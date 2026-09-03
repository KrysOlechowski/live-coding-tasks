---
schemaVersion: 1
plannedFollowUps: 0
primaryTopics:
  - "effect-lifecycle"
secondaryTopics:
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 1
- Interactions: 1
- Edge cases: 0
- Conceptual depth: 1
- Change surface: 0
- Follow-up escalation: 0
- Total: 3
- Rating: easy
- Rationale: One missing lifecycle relationship causes the bug in a single effect, while the candidate must still explain ownership across dependency changes and unmount.

## Core Task

### Purpose

Revisit effect lifecycle through an external event subscription rather than another network request, with emphasis on independently deriving the cleanup relationship.

### Expected evidence

- Traces which subscriptions remain active after a channel change.
- Connects the returned unsubscribe operation to the effect execution that created it.
- Prevents obsolete callbacks from updating the current event list.
- Explains why the same lifecycle handling covers both dependency changes and unmount.
- Recognizes correct setup-cleanup symmetry under development Strict Mode.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: effect-lifecycle
- Prompt: After the component subscribes to Operations and the user selects Support, which callbacks can still update the event list with the current implementation?
- Purpose: Check whether the candidate can trace active external work across a dependency change before editing the effect.
- Expected evidence: Identifies callbacks from both the previous and current channel because the previous subscription remains active.

#### core-start-2

- Kind: diagnostic
- Topic: effect-lifecycle
- Prompt: Which operation started by this effect has a lifetime independent from the effect function finishing, and what evidence in the provided API exposes that lifetime?
- Purpose: Help the candidate distinguish completing an effect setup function from ending the external resource it created without naming the repair.
- Expected evidence: Identifies the live subscription and connects its returned stop function or ongoing console events to its independent lifetime.

### Checkpoint questions

#### core-checkpoint-1

- Kind: teaching
- Topic: effect-lifecycle
- Prompt: Why does returning the unsubscribe operation from this effect cover both a selected-channel change and component unmount?
- Purpose: Reinforce effect ownership across both cleanup triggers that were not fully explained in the previous task.
- Expected evidence: Explains that React ends the current effect execution before replacing it and when removing the component, invoking the same cleanup in both cases.

#### core-checkpoint-2

- Kind: prediction
- Topic: effect-lifecycle
- Prompt: In development Strict Mode, React may run setup, cleanup, and setup again. What console sequence would indicate that this subscription lifecycle is handled correctly?
- Purpose: Turn Strict Mode behavior into a practical diagnostic signal rather than treating it as duplicate-event noise.
- Expected evidence: Predicts balanced subscribe-unsubscribe-subscribe events with only the final subscription remaining active.

### Review focus

- One live subscription for the current effect execution.
- Correct cleanup on dependency change and unmount.
- No obsolete-channel events after switching.
- Minimal change that preserves existing event-list behavior.

