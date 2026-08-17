# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: none in the final implementation; the Core task and both follow-ups are implemented.

## Mastery

Level: 3/5 — Mostly working

Reason: Final code is correct, but the session exposed gaps in independently updating every union consumer and explaining the original modeling problem.

## Weaknesses

- `session.json:55` shows that the first `cancelled` implementation did not update `getProcessProgress`; the correct branch at `main.ts:38` was added after a direct reminder. The final behavior is right, but the consumer audit was not yet systematic.
- `session.json:27` records that the rationale for replacing the optional-property model was not explained. The code demonstrates the pattern, but an interviewer did not receive direct evidence that the underlying invalid-state problem could be articulated.
- `main.ts:11` still contains the scaffold TODO even though the refactor is complete. This is minor, but it leaves misleading maintenance noise in an otherwise focused solution.

## Strengths

- `main.ts:5` models every state as a precise variant and keeps state-specific data required and mutually exclusive without `any` or assertions.
- `main.ts:13` narrows safely before accessing variant data, while `main.ts:26` uses an explicit `never` check to protect the main switch from future missing variants.
- `main.ts:30` and `main.ts:44` preserve the original behavior and now handle cancellation progress and completed-record data correctly.

## Missed edge cases

- none

## What a stronger candidate would improve

- After adding a union member, audit every consumer rather than only the first compiler error. In particular, consider whether fallback returns such as `main.ts:41` should remain intentional or become exhaustive when new states must never be ignored silently.
- Explain the modeling decision before coding: optional properties make validity depend on conventions, while explicit variants move those rules into the type system.

## Main learning takeaway

- Treat every new discriminated-union member as a change across all consumers, and use exhaustive checks wherever a fallback could hide an omission.

## Suggested next step

- Rewrite `getProcessProgress` as an exhaustive state handler and add one small table-driven check covering all five variants.

## Follow-up questions

- Should every function consuming `ProcessState` be exhaustive, or are some fallback values intentional?
- How would you validate a `ProcessState` received as untrusted JSON at runtime?
- How would you represent and enforce a progress value constrained to the range from 0 to 100?

## Final verdict

The final implementation is type-safe and meets the requirements, including cancellation and explicit exhaustiveness. The next step toward interview-ready independence is to update every consumer systematically and explain the modeling rationale without prompting.
