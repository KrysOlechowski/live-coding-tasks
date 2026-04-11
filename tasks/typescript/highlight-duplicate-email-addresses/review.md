# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important missing or incorrect behavior: the function mutates the input array by sorting `users` in place, which breaks a required constraint (`tasks/typescript/highlight-duplicate-email-addresses/main.ts:17`).

## Strengths

- Correctly normalizes emails with `trim()` and `toLowerCase()` before grouping (`tasks/typescript/highlight-duplicate-email-addresses/main.ts:20`).
- Uses a `Map` and accumulates matching user IDs in a readable way (`tasks/typescript/highlight-duplicate-email-addresses/main.ts:14`).
- Correctly filters to only duplicated emails (`tasks/typescript/highlight-duplicate-email-addresses/main.ts:32`).

## Weaknesses

- Input mutation: `users.sort(...)` mutates the original array and violates the requirement not to mutate input (`tasks/typescript/highlight-duplicate-email-addresses/main.ts:17`).
- Ordering requirement is not met: output is sorted alphabetically by email instead of preserving first duplicate appearance from input (`tasks/typescript/highlight-duplicate-email-addresses/main.ts:33`).

## Missed edge cases

- none

## What a stronger candidate would improve

- Preserve input order semantics explicitly by tracking first occurrence index for each normalized email.
- Avoid in-place operations on function arguments (use a copied array only when needed).
- Add a few quick tests/examples to lock down ordering and immutability requirements.

## Follow-up questions

- How would you preserve first duplicate appearance without doing a global sort?
- What is the time and space complexity of your current approach vs an order-preserving one-pass approach?
- How would you test that the input array remains unchanged after the function call?

## Final verdict

Good normalization and grouping baseline, but the task is not fully solved because two required behaviors are broken: input immutability and required output ordering.
