---
title: "Model Payment Status Safely"
category: "typescript"
taskType: "model-types"
difficulty: "medium"
primarySkill: "Modeling impossible states with discriminated unions"
secondarySkill: "Writing safe status rendering and transition helpers"
problemShape: "discriminated-union-state"
interviewFocus: "type-safety-and-domain-modeling"
reviewFocus:
  - "type-safety"
  - "correctness"
  - "edge-cases"
  - "readability"
tags:
  - "typescript"
  - "discriminated-union"
  - "domain-modeling"
  - "exhaustiveness"
  - "type-narrowing"
---

# Model Payment Status Safely

## Context

You are working on a small payment-domain utility used by an internal billing dashboard.

The current payment model is too loose. It uses one object type with many optional fields, which allows impossible combinations such as a paid payment with a failure reason or a refunded payment without refund metadata.

## Goal

Replace the loose payment model with a safer discriminated union and update the related helper functions so they work with the new model.

This task is focused on TypeScript domain modeling, not UI.

## Requirements

- Model payment states using a discriminated union based on `status`.
- The valid statuses are:
  - `draft`
  - `pending`
  - `paid`
  - `failed`
  - `refunded`
- Every payment should have `id`, `amount`, `currency`, and `createdAt`.
- A `draft` payment must not have payment, failure, or refund metadata.
- A `pending` payment must have `submittedAt` and must not have payment, failure, or refund metadata.
- A `paid` payment must have `paidAt`, may have `receiptUrl`, and must not have failure or refund metadata.
- A `failed` payment must have `failedAt` and `failedReason`, and must not have payment or refund metadata.
- A `refunded` payment must have `paidAt`, `refundId`, and `refundedAt`; may have `receiptUrl` and `refundReason`; and must not have `failedReason`.
- Update these helpers so they are type-safe:
  - `getPaymentStatusLabel(payment)`
  - `getPaymentTimelineLabel(payment)`
  - `canRefund(payment)`
  - `getReceiptLink(payment)`
- `getReceiptLink(payment)` should only return a string when the payment state can actually have a receipt.
- Avoid `any`.
- Avoid unsafe type assertions unless they are clearly justified.
- Use exhaustive handling for payment statuses where appropriate.

## Constraints

- Do not add React UI.
- Do not add external libraries.
- Do not change the public function names unless necessary.
- Keep the solution local to the task files.
- Prefer readable TypeScript over clever type tricks.

## Non-goals

- Do not implement real payment processing.
- Do not add API calls.
- Do not add persistence.
- Do not add routing or UI.
- Do not model every possible real-world payment edge case.

## Acceptance Criteria

- TypeScript rejects impossible states such as:
  - `status: "paid"` with `failedReason`
  - `status: "failed"` with `paidAt`
  - `status: "refunded"` without `refundId`
  - `status: "draft"` with refund metadata
- Helper functions compile without `any`.
- Helper functions use TypeScript narrowing based on `status`.
- All valid statuses are handled.
- Adding a new status makes incomplete status handling easier to notice.
- The final solution is readable enough to explain during a live-coding interview.
