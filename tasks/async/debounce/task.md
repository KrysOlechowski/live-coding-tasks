---
title: Debounce
category: async
taskType: complete-partial-implementation
difficulty: easy
problemShape: trailing-call-coalescing
interviewFocus: Invoke a callback once after a quiet period with the latest arguments
reviewFocus:
  - correctness
  - async-safety
  - edge-cases
topics:
  - debounce
createdAt: 2026-11-20T10:04:51.042Z
---

# Debounce

## Context

A search field produces a new value on every keystroke. The application should
wait until typing pauses before running its search callback.

Estimated time: 20–25 minutes.

## Goal

Complete `debounce` in `main.ts` using the supplied public signature. It accepts
a callback and a delay in milliseconds, and returns a callable wrapper.

## Requirements

- Calling the wrapper must not invoke the callback immediately.
- Invoke the callback once after at least `delayMs` milliseconds have passed
  since the most recent wrapper call.
- If another call arrives before the pending callback runs, replace that pending
  invocation. Only the latest call's arguments should reach the callback.
- Preserve all arguments and their order, including callbacks with no arguments.
- After a callback runs, later calls must start a new waiting period.
- Wrappers created by separate `debounce` calls must operate independently.
- A delay of zero must still defer execution until a later timer turn. Multiple
  synchronous calls should produce one invocation with the last arguments.
- The wrapper returns `void` and does not expose the callback's return value.

## Acceptance Criteria

- One call produces exactly one delayed callback invocation.
- With a delay of 200 ms and wrapper calls at approximately 0, 60, and 120 ms,
  the callback runs once, no earlier than approximately 320 ms, with the third
  call's arguments. Actual execution may be later due to timer scheduling.
- Calling the wrapper again after that invocation produces a second delayed
  invocation.
- A callback receiving a string and a number receives both latest values in
  their original order.
- Activity on one wrapper does not postpone or suppress another wrapper's work.
- With a zero delay, the callback has not run when the wrapper returns.

## Constraints

- Assume `delayMs` is a finite, non-negative integer within the platform's
  supported timer range. Input validation is not required.
- Assume callbacks do not throw and do not call their own debounced wrapper.
- Dynamic `this` binding, promises, cancellation, flushing, and leading-edge
  execution are outside the scope of this exercise.
- Do not add dependencies.

Run the example with:

```sh
npx tsx --watch tasks/async/debounce/main.ts
```
