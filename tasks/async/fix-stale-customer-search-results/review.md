# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important missing or incorrect behavior: The Core Task is correct, but the revealed cancellation follow-up is incomplete. `main.tsx:43` creates a controller for a render, while `main.tsx:70` only passes its signal; no previous search is aborted and no unmount cleanup exists.

## Mastery

Level: 3/5 — Mostly working

Reason: Core behavior is correct, but it required substantial guidance and the revealed cancellation and lifecycle follow-up remains incomplete.

## Weaknesses

- `main.tsx:43` does not preserve ownership of the active controller across renders and the implementation never calls `abort()`, so superseded and unmounted work continues instead of meeting the follow-up requirement.
- `main.tsx:23` checks cancellation only before the delay starts. Once `main.tsx:29` is waiting, aborting the signal would not reject or stop that operation.
- `main.tsx:78` sends every caught `Error` through the user-visible failure path, so an expected cancellation is not separated from a genuine latest-request failure.

## Strengths

- `main.tsx:50` uses a component-local request identity, and the same identity guard protects results, errors, and loading in all completion branches.
- `main.tsx:53` invalidates pending completions on every input change, while `main.tsx:60` immediately resets results, loading, and errors for cleared input.
- The implementation keeps the Core Task layout, customer data, and TypeScript types intact.

## Missed edge cases

- none

## What a stronger candidate would improve

- Keep explicit ownership of the active controller, abort it when a new non-empty search replaces it, and clean it up when the component unmounts while retaining the request-identity guard for completion races.
- Make the mock async boundary react to cancellation during its delay and ignore the expected abort outcome without hiding real failures.

## Main learning takeaway

- Ignoring stale completions and cancelling obsolete work solve different problems; robust code usually keeps the ordering guard even after adding cancellation.

## Suggested next step

- Practice a smaller focused exercise that owns one `AbortController` across renders, cancels it on replacement and unmount, and distinguishes `AbortError` from a real failure.

## Follow-up questions

- Why is the request-identity check still useful when the previous request is aborted?
- Which part of the component should own the active controller, and when does that ownership end?
- How would you test that unmount cancellation does not produce a visible error or a state update?

## Final verdict

The latest-request Core behavior is solid in the final code, including success, failure, loading, and cleared-input handling. The solution is only partial overall because the revealed cancellation and lifecycle extension was not completed and the Core implementation needed substantial guidance.
