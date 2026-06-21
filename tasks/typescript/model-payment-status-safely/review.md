# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important incorrect behavior: `main.ts:118` returns the status value (`"paid"` or `"refunded"`) instead of the payment's `receiptUrl`, so `getReceiptLink` has the right return type but the wrong runtime result.

## Mastery

Level: 3/5 — Mostly working

Reason: The discriminated union, narrowing, and exhaustive switches are clear and compile safely, but one required helper is behaviorally incorrect and the model can enforce forbidden fields more strictly.

## Weaknesses

- `main.ts:118` returns `payment.status` from `getReceiptLink`. Return `payment.receiptUrl` inside the already narrowed `paid` and `refunded` cases.
- `main.ts:8`–`main.ts:36` omit fields that are invalid for each variant, which rejects invalid object literals but can still accept a pre-existing structurally compatible object carrying extra metadata. Optional `never` fields would express the “must not have” constraints more strictly.

## Strengths

- `main.ts:1`–`main.ts:43` separates common fields from status-specific variants cleanly and gives required metadata non-optional types.
- `main.ts:93`–`main.ts:108` uses status narrowing correctly, removes unnecessary fallbacks, and provides an exhaustive `assertNever` check.
- `main.ts:110`–`main.ts:125` keeps helper signatures simple, avoids `any` and unsafe assertions, and handles every status explicitly where appropriate.

## Missed edge cases

- none

## What a stronger candidate would improve

- Verify helper semantics with the sample output, not only successful compilation; the current return type cannot distinguish a receipt URL from another arbitrary string.
- Encode forbidden variant properties as optional `never` fields when strict prevention of extra domain metadata is part of the requirement.

## Main learning takeaway

- Type correctness does not guarantee domain correctness when multiple values share the same primitive type; verify that narrowed branches return the intended field.

## Suggested next step

- Change `getReceiptLink` to return `payment.receiptUrl` for `paid` and `refunded`, then rerun the file and confirm the paid sample prints its URL.

## Follow-up questions

- How would you model the variants if `currency` were limited to a known set of codes?
- Why does `assertNever(payment)` make adding a new payment status easier to detect?
- How would optional `never` properties change assignment behavior for objects created outside this file?

## Final verdict

The main domain-modeling approach is readable and mostly interview-ready. Fix the receipt helper and tighten forbidden properties to fully satisfy the safety goal.
