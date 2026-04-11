# Task Review

## Requirement check

- Meets the task requirements: no.
- Most important missing or incorrect behavior: `tasks/typescript/group-orders-by-status/main.ts:37` does not add orders to buckets, so grouped arrays stay empty.

## Strengths

- Types are clear and interview-appropriate (`OrderStatus`, `Order`).
- Return shape is sensible for downstream UI logic.
- Input is not mutated.

## Weaknesses

- Core grouping behavior is missing in the loop body.
- Because no item is pushed, order preservation per bucket is not satisfied.

## Missed edge cases

- none

## What a stronger candidate would improve

- Implement the accumulation step directly in the existing loop.
- Add a tiny usage assertion (or test) to prove grouped output contains expected items.

## Follow-up questions

- Why did you choose preinitialized buckets instead of building keys lazily?
- How would you handle unknown statuses from an API without weakening TypeScript safety?

## Final verdict

Task is currently unsolved due to one core behavior gap: orders are never added to status groups.
