---
title: Normalize Order History
slug: normalize-order-history
category: typescript
type: data transformation
difficulty: medium
penalty: 0
hasPreview: false
---

## Focus areas

- grouping related records
- conflict resolution rules
- immutable transformation
- sorting derived output

## Task

You are given a flat list of order events. Implement a function that converts these events into a normalized order history summary.

Each order may appear in multiple records over time. Your task is to group records by order, determine the latest status, calculate the total paid amount, and return a clean summary sorted by most recent activity.

## Expected input / output

- Input:
  - an array of event objects
  - each event has:
    - `id: string`
    - `orderId: string`
    - `customerId: string`
    - `customerName: string`
    - `type: "created" | "paid" | "shipped" | "cancelled" | "refunded"`
    - `amount?: number`
    - `createdAt: string`
- Output:
  - an array of objects in this shape:
    - `orderId: string`
    - `customerId: string`
    - `customerName: string`
    - `latestStatus: "created" | "paid" | "shipped" | "cancelled" | "refunded"`
    - `totalPaid: number`
    - `lastEventAt: string`

Preserve input immutability. Group all events by `orderId`. Sort output by `lastEventAt` descending, and when timestamps are equal, sort by `orderId` ascending.

## Requirements

- Return one output item per unique `orderId`
- Determine `lastEventAt` as the latest `createdAt` value within the order group
- Determine `latestStatus` from the event with the latest `createdAt`
- Calculate `totalPaid` as:
  - sum all paid amounts
  - subtract all refunded amounts
  - ignore amounts from other event types
- Assume missing `amount` on paid or refunded should be treated as `0`
- If multiple events for the same order share the exact same latest `createdAt`, choose `latestStatus` using this priority:
  - cancelled
  - refunded
  - shipped
  - paid
  - created
- If multiple records for the same order contain different `customerName` values, use the `customerName` from the latest event for that order. If there is still a tie on timestamp, use the same priority rule as for `latestStatus`
- Keep the function pure
- Do not mutate the input array or any input objects

## Optional edge cases

- empty input returns an empty array
- the same order has multiple paid events
- an order is paid and later partially refunded
- events arrive in random order
- multiple events for one order have identical timestamps

## Out of scope

- validating business correctness of status transitions
- currency formatting
- grouping by customer
- detecting duplicate event IDs
