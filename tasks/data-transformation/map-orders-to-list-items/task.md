---
title: "Map orders to list items"
category: "data-transformation"
taskType: "build-from-requirements"
difficulty: "easy"
primarySkill: "Transform nested order data into a display-ready shape with Array.map"
secondarySkill: "Preserve input order and avoid mutating source records"
problemShape: "one-to-one-record-projection"
interviewFocus: "One-to-one immutable data projection for frontend display"
reviewFocus:
  - "correctness"
  - "type-safety"
  - "readability"
  - "maintainability"
tags:
  - "typescript"
  - "data-transformation"
  - "array-map"
  - "immutable-data"
---

# Map orders to list items

## Context

An order API returns records with nested customer data and values that are not ready to display directly. A frontend list needs a smaller, flat representation of each order.

The starter contains the input and output types, sample orders, and a helper for formatting prices.

## Goal

Implement `toOrderListItems` so it transforms the provided orders into display-ready list items.

## Requirements

- Use `Array.prototype.map` to create the result.
- Return exactly one list item for every order, in the same order as the input.
- Copy the order `id`.
- Build `customerName` from the customer's first and last name, separated by one space.
- Format `totalCents` with the provided `formatMoney` helper and store it as `totalLabel`.
- Set `status` to `"Paid"` when `isPaid` is `true`, otherwise set it to `"Pending"`.
- Do not mutate the input array or its records.

## Acceptance Criteria

- The sample input produces two correctly shaped `OrderListItem` records.
- Output length and order match the input.
- An empty input returns an empty array.
- The returned values satisfy the `OrderListItem` type without assertions or `any`.
- The source orders remain unchanged after the transformation.

