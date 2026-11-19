---
title: Notification Types
category: typescript
taskType: model-types
difficulty: easy
problemShape: discriminated-union-modeling
interviewFocus: Type-safe notification variants and safe property access
reviewFocus:
  - type-safety
  - correctness
  - readability
topics:
  - discriminated-unions
createdAt: 2026-11-19T21:58:10.575Z
---

# Notification Types

## Context

A notification service supports email, SMS, and push notifications. The starter
type allows incomplete payloads and unrelated channel fields. Callers need a
type-safe contract, and the UI needs a short description of each notification.

Expected time: 15–20 minutes.

## Goal

Replace the permissive `Notification` type with a model of the three supported
variants, then implement `describeNotification`.

## Requirements

1. Use `channel` to identify each variant. Only `"email"`, `"sms"`, and `"push"`
   are supported.
2. Every notification requires a string `message`. Each channel also requires
   these string fields:

   | Channel | Additional required fields |
   | --- | --- |
   | `email` | `to`, `subject` |
   | `sms` | `phoneNumber` |
   | `push` | `deviceToken`, `title` |

3. TypeScript must reject object literals with missing required fields,
   unsupported channels, or fields belonging to a different channel when they
   are assigned directly to `Notification`.
4. Implement `describeNotification(notification: Notification): string` with
   exactly these formats:

   | Channel | Output |
   | --- | --- |
   | `email` | `Email to {to}: {subject}` |
   | `sms` | `SMS to {phoneNumber}: {message}` |
   | `push` | `Push to {deviceToken}: {title}` |

5. Access variant-specific properties safely. Do not use `any`, type assertions,
   non-null assertions, or TypeScript error-suppression comments to bypass the
   type model. Do not mutate the input.

## Acceptance Criteria

- All three sample payloads in `main.ts` compile and produce the expected
  descriptions below, in order:

  ```text
  Email to maya@example.com: Welcome
  SMS to +48123456789: Your code is 1234
  Push to device-42: New message
  ```

- An email payload without `subject` is rejected at compile time.
- An SMS payload containing an email-only `subject` is rejected when assigned
  directly as an object literal to `Notification`.
- A push payload without `deviceToken` is rejected at compile time.
- A payload with `channel: "fax"` is rejected at compile time.
- Variant-specific fields cannot be accessed without first establishing the
  appropriate channel.
- Empty strings are valid and are inserted into the output unchanged. Input
  strings are not trimmed or otherwise normalized.

## Constraints and Non-goals

Work in `main.ts`. Keep the exported type and function names and the sample
payloads. You may add supporting types and local checks in that file.

Assume inputs already satisfy `Notification`. Runtime validation, sending
notifications, UI work, and exact-object enforcement for previously declared
variables are outside the scope of this exercise.
