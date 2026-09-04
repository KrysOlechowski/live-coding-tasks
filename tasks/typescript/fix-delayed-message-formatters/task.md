---
title: "Fix delayed message formatters"
category: "typescript"
taskType: "fix-bug"
difficulty: "medium"
primarySkill: "Reason about lexical scope and closures when callbacks run later"
secondarySkill: "Distinguish shadowed bindings from values shared by multiple closures"
problemShape: "closure-captured-binding"
interviewFocus: "Lexical scope, closure capture, shadowing, and declaration lifetime"
reviewFocus:
  - "correctness"
  - "readability"
  - "maintainability"
tags:
  - "typescript"
  - "javascript"
  - "closures"
  - "lexical-scope"
  - "shadowing"
---

# Fix delayed message formatters

## Context

A notification service prepares message formatter functions for a list of recipients. The formatters are stored and invoked later, after the whole list has been processed.

The current implementation produces incorrect names for some recipients. Recipients with a preferred name may appear correct, while other formatters can display a name belonging to a different recipient.

## Goal

Fix `createMessageFormatters` so every returned formatter consistently uses the data belonging to the recipient for which it was created.

## Requirements

- Return one formatter for every recipient, preserving input order.
- A formatter should use `preferredName` when it exists; otherwise it should use `name`.
- Every formatter must keep using its own recipient's display name when invoked later.
- Formatters may be invoked in any order and more than once.
- Preserve the supplied prefix and the existing output format.
- Do not mutate the recipients array or its objects.
- Keep the existing public types and function signature.

## Constraints

- Do not eagerly replace the returned functions with formatted strings.
- Do not introduce global mutable state.

## Acceptance Criteria

- The included sample produces `Hello, Alice!`, `Hello, Bobby!`, `Hello, Carol!`, and `Hello, Dani!` in that order.
- Calling only the first formatter after the factory has returned still produces `Hello, Alice!`.
- Calling the same formatter repeatedly produces the same result.
- An empty recipients array returns an empty formatter array.
- The solution remains concise and does not weaken the supplied TypeScript types.
