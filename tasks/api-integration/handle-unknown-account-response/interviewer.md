---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "type-narrowing"
  - "type-safe-api-modeling"
secondaryTopics:
  - "response-adaptation"
  - "exhaustive-checking"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 1
- Interactions: 1
- Edge cases: 1
- Conceptual depth: 1
- Change surface: 1
- Follow-up escalation: 1
- Total: 6
- Rating: medium
- Rationale: The candidate must validate nested unknown data at a boundary, preserve distinctions between outcomes, and extend both the model and its consumer during the follow-up.

## Core Task

### Purpose

Evaluate whether the candidate can treat an external TypeScript type as insufficient runtime evidence and narrow unknown nested data before exposing it to application code.

### Expected evidence

- Checks container values before reading their properties.
- Distinguishes objects from `null`, arrays, and primitive values.
- Validates nested fields and supported literal values.
- Returns a stable application-facing result for success, known failure, and malformed data.
- Avoids assertions that merely silence the compiler.

### Start questions

#### core-start-1

- Kind: diagnostic
- Topic: type-narrowing
- Prompt: The request has resolved successfully, but its result is typed as `unknown`. Which account properties can the UI safely read at that moment, and why?
- Purpose: Check whether the candidate distinguishes request success from runtime evidence about the response shape.
- Expected evidence: States that no account property is safe until runtime checks establish the required containing and nested shapes.

#### core-start-2

- Kind: prediction
- Topic: type-safe-api-modeling
- Prompt: What kinds of payloads could look roughly like a success response but still be unsafe for this UI to consume?
- Purpose: Surface whether the candidate anticipates malformed nested values rather than checking only the top-level status.
- Expected evidence: Mentions examples such as missing account data, wrong field types, unsupported literal values, `null`, or arrays.

### Checkpoint questions

#### core-checkpoint-1

- Kind: counterexample
- Topic: type-narrowing
- Prompt: Why is checking only that the payload is an object and has `status: "success"` insufficient before returning a typed account?
- Purpose: Verify that the candidate understands that narrowing must cover the complete data later trusted by the UI.
- Expected evidence: Identifies that the nested account and every required field still need runtime evidence.

#### core-checkpoint-2

- Kind: transfer
- Topic: response-adaptation
- Prompt: At what boundary should `unknown` stop flowing through the application, and what does the rest of the UI gain from that decision?
- Purpose: Turn the local implementation into a reusable API-boundary design lesson.
- Expected evidence: Places validation near the external boundary and explains that downstream code can then rely on one stable application model.

### Review focus

- Complete validation of every value trusted by the application model.
- Safe handling of object boundaries, literal unions, and nested data.
- Clear separation between a valid service error and malformed external data.

## Follow-up 1

### Reveal

The API can now return a valid maintenance response with `status: "maintenance"`, a string `message`, and a numeric `retryAfterSeconds`. Support this response in the decoder and UI, then make result rendering exhaustive so TypeScript reports a missing application-result variant when another one is added later. Malformed maintenance responses must still use the invalid-response path.

### Purpose

Test whether the validated boundary and application model are easy to extend, and whether all consumers remain complete as the set of valid outcomes grows.

### Topics

- type-safe-api-modeling
- exhaustive-checking

### Expected evidence

- Adds a precise maintenance variant without weakening existing variants.
- Validates every maintenance-specific field at runtime.
- Updates the UI through narrowed variant handling.
- Uses a compile-time exhaustive strategy rather than a silent broad fallback.

### Start questions

#### follow-up-1-start-1

- Kind: prediction
- Topic: type-safe-api-modeling
- Prompt: When a new valid API outcome is introduced, which boundaries and consumers in the current design need to change together?
- Purpose: Check whether the candidate can trace a variant from external validation through the application model to visible behavior.
- Expected evidence: Includes the decoder, application result type, and UI renderer.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: teaching
- Topic: exhaustive-checking
- Prompt: What compile-time signal should appear if a future application-result variant is added but the renderer is not updated?
- Purpose: Reinforce exhaustive handling as protection for future changes rather than only a stylistic switch pattern.
- Expected evidence: Explains that the unhandled value should remain non-`never` and cause a TypeScript error at the exhaustive boundary.

### Review focus

- Correct runtime validation of the new response.
- Precise extension of the application result model.
- Exhaustive UI handling without unsafe assertions or broad fallbacks.
