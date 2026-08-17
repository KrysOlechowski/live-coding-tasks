---
schemaVersion: 1
plannedFollowUps: 2
primaryTopics:
  - "discriminated-unions"
secondaryTopics:
  - "type-narrowing"
  - "exhaustive-checking"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 1
- Interactions: 1
- Edge cases: 0
- Conceptual depth: 1
- Change surface: 1
- Follow-up escalation: 2
- Total: 6
- Rating: medium
- Rationale: The Core model affects multiple consumers and the follow-ups add a new variant plus compile-time exhaustiveness.

## Core Task

### Purpose

Evaluate whether the candidate can recognize an invalid-state modeling problem and replace loosely related optional fields with a discriminated union.

The task should also demonstrate whether the candidate understands how TypeScript narrows union members based on a discriminant.

### Expected evidence

- Defines distinct variants for the supported process states.
- Uses a stable discriminant shared by all variants.
- Keeps state-specific properties on the appropriate variants.
- Updates consumers to narrow the state before accessing state-specific data.
- Avoids assertions or optional fields that bypass the type model.

### Start questions

#### core-start-1

- Kind: diagnostic
- Topic: discriminated-unions
- Prompt: Give two concrete contradictory or incomplete ProcessState values accepted by the current type and explain why TypeScript accepts them.
- Purpose: Confirm the candidate understands the modeling failure before choosing a replacement.
- Expected evidence: Shows that independent optional properties do not encode relationships between state and data.

#### core-start-2

- Kind: prediction
- Topic: type-narrowing
- Prompt: Which existing consumers currently assume relationships that the ProcessState type does not guarantee?
- Purpose: Make the candidate identify the change surface without naming the intended type construction.
- Expected evidence: Points to state-specific property access or fallback logic that relies on conventions.

### Checkpoint questions

#### core-checkpoint-1

- Kind: counterexample
- Topic: discriminated-unions
- Prompt: Name one formerly valid invalid object that the new model now rejects, and identify which part of the model rejects it.
- Purpose: Verify that the refactor moved a concrete runtime convention into the type system.
- Expected evidence: Connects an impossible combination to the precise variant shapes.

#### core-checkpoint-2

- Kind: transfer
- Topic: type-narrowing
- Prompt: What compile-time feedback do you get if a consumer reads completed-only data before proving that the state is completed?
- Purpose: Check that the candidate can explain how the model changes consumer code.
- Expected evidence: Explains control-flow narrowing rather than relying on an assertion.

### Review focus

- Correct representation of valid and invalid states.
- Quality of discriminated-union modeling.
- Safe type narrowing.
- Preservation of existing runtime behavior.

## Follow-up 1

### Reveal

A new `cancelled` state is introduced.

It must contain a cancellation reason and the progress value reached before cancellation.

Update the model and all state-processing logic to support it.

### Purpose

Test whether the model is easy to extend and whether the candidate can update consumers consistently when a new union member is introduced.

### Topics

- discriminated-unions
- type-narrowing

### Expected evidence

- Adds a new explicit union member.
- Places cancellation-specific data only on that member.
- Updates affected state-processing logic without weakening existing types.

### Start questions

#### follow-up-1-start-1

- Kind: diagnostic
- Topic: type-narrowing
- Prompt: Before editing, which consumers must be audited when a new state variant is added, even if the compiler initially reports only one error?
- Purpose: Prevent a narrow fix that updates the model but leaves behavioral consumers inconsistent.
- Expected evidence: Identifies every function that branches on or extracts data from ProcessState.

#### follow-up-1-start-2

- Kind: diagnostic
- Topic: discriminated-unions
- Prompt: Which cancellation values belong only to the cancelled state, and why should other variants not expose them?
- Purpose: Reinforce precise variant ownership without giving the final type declaration.
- Expected evidence: Keeps reason and reached progress specific to cancellation.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: counterexample
- Topic: type-narrowing
- Prompt: How did you verify that every consumer treats cancelled consistently rather than silently falling back?
- Purpose: Test the habit of auditing the complete union surface.
- Expected evidence: Refers to each consumer and its cancellation-specific behavior.

#### follow-up-1-checkpoint-2

- Kind: transfer
- Topic: discriminated-unions
- Prompt: What future state change would be hardest to notice if a consumer kept a broad fallback branch?
- Purpose: Connect precise modeling with maintainable future extension.
- Expected evidence: Explains how a fallback can hide an unhandled valid variant.

### Review focus

- Extensibility of the model.
- Correct narrowing of the new state.
- Whether existing variants remain precise.

## Follow-up 2

### Reveal

Change the main state-processing function so that TypeScript helps detect any state that has not been handled when another state is added in the future.

### Purpose

Assess understanding of exhaustive checking and using the type system to make future changes safer.

### Topics

- exhaustive-checking
- discriminated-unions

### Expected evidence

- Introduces an exhaustive handling strategy.
- Demonstrates that an unhandled union member produces a compile-time signal.
- Does not use a broad fallback that silently accepts unknown valid states.

### Start questions

#### follow-up-2-start-1

- Kind: tradeoff
- Topic: exhaustive-checking
- Prompt: What does the current missing-return error tell you, and what information would a broad default return hide?
- Purpose: Distinguish an incidental compiler error from an intentional exhaustive guarantee.
- Expected evidence: Explains why a fallback restores compilation without proving complete handling.

#### follow-up-2-start-2

- Kind: diagnostic
- Topic: exhaustive-checking
- Prompt: Which value must become never after all cases are handled for an explicit exhaustiveness check to work?
- Purpose: Test understanding of union narrowing without providing implementation code.
- Expected evidence: Identifies the fully narrowed ProcessState value rather than only its discriminant property.

### Checkpoint questions

#### follow-up-2-checkpoint-1

- Kind: prediction
- Topic: exhaustive-checking
- Prompt: If another variant is added tomorrow, where should compilation fail before that variant is implemented?
- Purpose: Verify the future-change protection provided by the final control flow.
- Expected evidence: Identifies the exhaustive boundary and any other precise consumers.

#### follow-up-2-checkpoint-2

- Kind: tradeoff
- Topic: exhaustive-checking
- Prompt: When would a default branch be intentional, and when would it weaken this closed union model?
- Purpose: Teach that exhaustive handling depends on whether the input set is closed or genuinely open.
- Expected evidence: Distinguishes known union members from untrusted or forward-compatible external values.

### Review focus

- Correct exhaustive-checking technique.
- Compile-time protection against future missing cases.
- Clarity of the resulting control flow.
