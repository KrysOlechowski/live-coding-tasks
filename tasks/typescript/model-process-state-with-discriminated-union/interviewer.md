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

### Checkpoint focus

- Ask the candidate why the original optional-property model permits invalid combinations.
- Observe whether narrowing follows naturally from the new type model.
- Check whether the candidate lets the compiler guide the refactor instead of suppressing errors.

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

### Review focus

- Correct exhaustive-checking technique.
- Compile-time protection against future missing cases.
- Clarity of the resulting control flow.
