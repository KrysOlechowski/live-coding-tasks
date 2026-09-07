---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "immutable-transformations"
  - "reference-identity"
secondaryTopics:
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 1
- Interactions: 1
- Edge cases: 1
- Conceptual depth: 2
- Change surface: 0
- Follow-up escalation: 1
- Total: 6
- Rating: medium
- Rationale: The code change is local, but the candidate must trace aliases across multiple nesting levels and deliberately choose which references change, remain shared, or signal a no-op.

## Core Task

### Purpose

Evaluate whether the candidate can identify why an outer array copy does not isolate mutations to nested objects and arrays.

The task should also show whether the candidate can use structural sharing intentionally rather than cloning either too little or the complete object graph.

### Expected evidence

- Predicts how the current implementation changes both the result and caller-owned data.
- Produces a new collection, member, and history only for a real matching update.
- Preserves unchanged nested and sibling references deliberately.
- Returns the original collection when no member matches.
- Explains the relationship between aliasing, mutation, and reference equality.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: reference-identity
- Prompt: After the current sample runs, what role remains in `sampleMembers[0]`, and which of the printed reference comparisons will be true?
- Purpose: Diagnose whether the candidate can trace aliases before changing the implementation.
- Expected evidence: Predicts that the copied array still contains the original member and nested history references.

#### core-start-2

- Kind: diagnostic
- Topic: immutable-transformations
- Prompt: What does copying the outer members array isolate, and which values inside it can still be shared with the caller?
- Purpose: Separate outer collection identity from the ownership of its nested values.
- Expected evidence: Distinguishes the new array container from the member, profile, and history references stored inside it.

### Checkpoint questions

#### core-checkpoint-1

- Kind: transfer
- Topic: reference-identity
- Prompt: In the corrected result, which references should differ from the input and which should remain equal? Explain the reason for each level.
- Purpose: Verify that the candidate understands structural sharing rather than only reaching the expected printed values.
- Expected evidence: Identifies the updated array, member, and history as new while retaining the profile and unaffected members.

#### core-checkpoint-2

- Kind: counterexample
- Topic: immutable-transformations
- Prompt: Why would deep-cloning every member avoid the visible mutation but still be a weaker solution for this requirement?
- Purpose: Test whether the candidate can distinguish immutability from indiscriminate copying.
- Expected evidence: Explains lost structural sharing, unnecessary work, and misleading reference changes for unaffected data.

### Review focus

- No mutation of caller-owned objects or nested arrays.
- Correct role and history behavior for the matching member.
- Deliberate structural sharing for unchanged profile and sibling members.
- Original-array identity when the member does not exist.
- Clear, targeted implementation without full deep cloning.

## Follow-up 1

### Reveal

If the matching member already has `nextRole`, treat the request as a no-op: return the exact original members array and do not append a role-history entry. Preserve every existing reference in this case.

### Purpose

Test whether the candidate can distinguish a matched record from a real state transition and use reference identity as a reliable no-change signal.

### Topics

- immutable-transformations
- reference-identity

### Expected evidence

- Detects an unchanged role before creating or mutating replacement data.
- Returns the original array for the no-op.
- Leaves the complete object graph and history unchanged.
- Preserves the original behavior for a genuine role change.

### Start questions

#### follow-up-1-start-1

- Kind: prediction
- Topic: reference-identity
- Prompt: If the requested role already matches, what should `Object.is(result, members)` return, and what should happen to the member's history?
- Purpose: Establish the observable no-op contract before implementation.
- Expected evidence: Predicts the original array reference and no added history entry.

#### follow-up-1-start-2

- Kind: diagnostic
- Topic: immutable-transformations
- Prompt: Which observable changes would prove that an implementation performed work even though the requested role was already current?
- Purpose: Check whether the candidate considers both data and identity when reasoning about a no-op.
- Expected evidence: Identifies a new collection or object reference, an appended event, or mutated input as evidence of an unnecessary transition.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: counterexample
- Topic: immutable-transformations
- Prompt: What would go wrong if the history entry were appended before deciding whether the update is a no-op?
- Purpose: Verify that the candidate recognizes mutation ordering as part of the no-op guarantee.
- Expected evidence: Explains that caller-owned history could change even if the function later returns the original array.

#### follow-up-1-checkpoint-2

- Kind: tradeoff
- Topic: reference-identity
- Prompt: When is returning the same reference for a no-op useful to a consumer, and when would relying only on reference equality be unsafe?
- Purpose: Connect the task's identity contract to practical change detection without treating equality as a universal correctness check.
- Expected evidence: Mentions avoiding unnecessary downstream work while noting that in-place mutation can preserve a reference despite changed data.

### Review focus

- Correct no-op detection for an already-current role.
- No history or reference changes in the no-op path.
- Preservation of the genuine-update behavior from Core.
- Clear explanation of reference equality as a signal rather than proof of immutability.
