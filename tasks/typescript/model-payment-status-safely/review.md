# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important missing behavior: `main.ts:8`–`main.ts:36` omit forbidden fields instead of declaring them as optional `never`. This rejects incompatible fresh object literals, but a pre-existing object with extra metadata can still be assigned to `Payment`, so the “must not have” constraints are not fully enforced.

## Mastery

Level: 3/5 — Mostly working

Reason: The union, helper behavior, narrowing, and exhaustiveness are correct and readable, but the central impossible-state guarantee still has a structural-typing gap.

## Weaknesses

- `main.ts:8`–`main.ts:36` should explicitly forbid metadata that does not belong to each variant with optional `never` properties. That would prevent values such as a paid payment carrying `failedReason`, even when the value was first stored in another variable.
- `main.scaffold.ts:1`–`main.scaffold.ts:98` has been commented out instead of remaining the unchanged initial scaffold snapshot required by the repository workflow.

## Strengths

- `main.ts:1`–`main.ts:43` cleanly separates shared fields from status-specific required metadata.
- `main.ts:93`–`main.ts:108` uses discriminant narrowing and `assertNever` correctly, so missing future statuses are surfaced by TypeScript.
- `main.ts:114`–`main.ts:125` now returns `receiptUrl` only for states that can contain it and handles every status exhaustively.
- The solution avoids `any`, unsafe assertions, external libraries, and unnecessary abstraction.

## Missed edge cases

- none

## What a stronger candidate would improve

- Make forbidden fields part of the type contract rather than relying only on excess-property checks for object literals.
- Remove completed TODO comments from `main.ts:82` and `main.ts:128`, and restore the original scaffold snapshot.

## Main learning takeaway

- In a structural type system, omitting a property from a union member is weaker than explicitly forbidding it with `property?: never`.

## Suggested next step

- Add optional `never` properties for invalid metadata on each payment variant, then verify assignment using both direct object literals and objects stored in intermediate variables.

## Follow-up questions

- Why can excess-property checking behave differently for an object literal and an intermediate variable?
- Would you keep the repeated optional `never` fields inline or extract reusable forbidden-field helper types?
- How would you test exhaustiveness if a new `cancelled` status were added?

## Final verdict

The helper logic is now correct and the solution demonstrates good discriminated-union fundamentals. Tightening forbidden properties would fully deliver the task's impossible-state guarantee.
