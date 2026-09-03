# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: none; obsolete subscriptions are stopped and the existing event-list behavior is preserved.

## Mastery

Level: 3/5 — Mostly working

Reason: The final implementation is correct and minimal, but the callback, returned-cleanup, and effect-lifecycle reasoning required extensive direct guidance.

## Weaknesses

- `session.json:94` records ten concept-explanation events, including several level-4 explanations, before the central change at `main.tsx:67` was completed. The implementation works, but it was not derived independently during this attempt.
- `session.json:53` shows that the candidate could not yet explain why one cleanup covers dependency replacement and unmount; that ownership rule is the main concept tested by the task.

## Strengths

- `main.tsx:67` retains the exact unsubscribe operation created for the current subscription.
- `main.tsx:71` returns a cleanup that invokes that unsubscribe operation, so dependency changes and unmount stop the matching interval.
- `main.tsx:68` preserves the functional state update and five-event limit without adding unrelated changes.
- `session.json:66` correctly predicts the Strict Mode setup-cleanup-setup sequence after the explanations.

## Missed edge cases

- none

## What a stronger candidate would improve

- Trace function values explicitly: identify the callback passed into `subscribeToChannel`, the event later passed into that callback, and the separate unsubscribe function returned to the caller.
- Explain before coding that each effect execution owns one subscription and React ends that ownership on dependency replacement or unmount.

## Main learning takeaway

- A function can be passed as an argument or returned as a value; returning that unsubscribe function from an effect gives React the cleanup for the resource created by that effect.

## Suggested next step

- Recreate the subscription and cleanup flow in a small non-React TypeScript example, then reset this task and implement the effect again without coaching.

## Follow-up questions

- What is the difference between returning `unsubscribe` and calling `unsubscribe()` immediately?
- How does the event object created inside `subscribeToChannel` reach the callback parameter?
- Why must every successful subscription setup have one matching cleanup?

## Final verdict

The solution fully meets the task requirements and keeps the fix appropriately small. The resulting code is correct, but callback flow and effect lifecycle remain guided rather than interview-ready skills.

