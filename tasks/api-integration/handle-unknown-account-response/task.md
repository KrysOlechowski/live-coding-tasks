---
title: "Handle an unknown account API response safely"
category: "api-integration"
taskType: "complete-partial-implementation"
difficulty: "medium"
hasPreview: true
previewEntry: "main.tsx"
primarySkill: "Narrow an unknown API payload into a safe application model"
secondarySkill: "Keep valid service errors separate from malformed responses"
problemShape: "unknown-response-narrowing"
interviewFocus: "Runtime validation, type narrowing, and a safe API boundary"
reviewFocus:
  - "correctness"
  - "type-safety"
  - "error-handling"
  - "ui-behavior"
tags:
  - "typescript"
  - "api"
  - "unknown"
  - "type-narrowing"
---

# Handle an unknown account API response safely

## Context

An account dashboard receives data from an external service. The request itself succeeds, but the service response is typed as `unknown` because runtime data cannot be trusted to match the application's TypeScript types.

The provided UI already requests sample responses and knows how to display a safe application result. The missing decoder must decide whether the payload represents a valid account, a known service error, or a malformed response.

## Goal

Implement the response decoder so the rest of the component receives only validated, type-safe data.

## Requirements

The external service may return either of these valid shapes:

- A success response with `status: "success"` and an `account` containing a string `id`, string `name`, `plan` equal to `"free"` or `"pro"`, and a numeric `seats` value.
- An error response with `status: "error"` and an `error` containing `code` equal to `"NOT_FOUND"` or `"FORBIDDEN"` and a string `message`.

Implement `decodeAccountResponse` so that:

- valid success responses become the existing success application result;
- valid service errors become the existing service-error application result;
- every other value becomes an invalid-response application result;
- no property is read before the containing value has been checked safely;
- malformed nested fields, `null`, arrays, missing properties, and unsupported literal values do not cause a runtime error.

## Constraints

- Keep the provided mock API responses unchanged.
- Do not use `any`, broad type assertions, or non-null assertions to bypass validation.
- Do not add external dependencies.
- Preserve the existing UI and submit behavior.

## Non-goals

- Transport-level request failures are not part of the Core Task.
- Schema-validation libraries are not required.

## Acceptance Criteria

- `acct-pro` and `acct-free` display their account details.
- `missing` and `forbidden` display the service-provided error message.
- `broken` displays the malformed-response message without crashing.
- Unsupported account IDs follow the provided mock API behavior.
- TypeScript can verify the decoded result without `any` or unsafe assertions.
