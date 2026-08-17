---
title: "Model process state with a discriminated union"
category: "typescript"
taskType: "model-types"
difficulty: "medium"
primarySkill: "Model mutually exclusive states with TypeScript discriminated unions"
secondarySkill: "Narrow types safely when processing state"
problemShape: "Replace loosely modeled optional fields with explicit process states"
interviewFocus: "Type modeling, narrowing, and preventing impossible state combinations"
reviewFocus:
  - "correctness"
  - "type-safety"
tags:
  - "typescript"
  - "discriminated-unions"
  - "type-narrowing"
---

# Model process state with a discriminated union

## Context

A background import process can be in one of several states.

The current implementation represents the process using a single object with multiple optional properties. This makes it possible to construct contradictory or incomplete states, such as a completed process without a result or a failed process without an error.

The application also contains functions that inspect this state and return information about the current process.

## Goal

Refactor the process-state model so that each valid state has an explicit shape and invalid combinations cannot be represented by the TypeScript types.

Update the existing functions to work with the new model.

## Requirements

The process must support these states:

- `idle`
- `running`
- `completed`
- `failed`

Each state should contain only the data that is meaningful for that state.

A running process contains its progress as a number.

A completed process contains information about how many records were imported.

A failed process contains an error message.

Refactor the existing process-state type and update all affected functions so they safely handle every possible state.

Do not weaken the types using `any`, broad type assertions, or optional properties that recreate the original ambiguity.

## Acceptance Criteria

- Every valid process state can be represented.
- Contradictory state combinations are rejected by TypeScript.
- State-specific data is available only when appropriate for that state.
- Existing behavior is preserved after the refactor.
- Functions processing the state handle all supported states.
- The solution does not rely on `any` or unsafe type assertions.
