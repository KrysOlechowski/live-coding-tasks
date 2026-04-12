---
title: Order Status Summary
slug: order-status-summary
category: typescript
type: data transformation
difficulty: easy
penalty: 3
hasPreview: false
---

## Focus areas

- array iteration
- object accumulation
- immutable data transformation

## Task

Implement a function that takes a list of orders and returns a summary object grouped by status.

Each order has an `id`, `customerName`, and `status`.

The function should return an object with exactly three keys: `pending`, `paid`, and `shipped`.

## Expected input / output

- Input: an array of order objects
- Each order has:
  - `id: string`
  - `customerName: string`
  - `status: "pending" | "paid" | "shipped"`
- Output:
  - `pending: Order[]`
  - `paid: Order[]`
  - `shipped: Order[]`

Preserve the original order of items within each status group. Do not mutate the input array or the original order objects.

## Requirements

- Return an object with all three status keys even if some groups are empty
- Place each order in exactly one group based on its status
- Preserve the original order of orders inside each group
- Keep the implementation type-safe in TypeScript
- Do not sort the result unless sorting is explicitly required
- Treat the function as a pure transformation

## Optional edge cases

- Empty input array
- All orders belong to the same status
- One or two status groups are empty
