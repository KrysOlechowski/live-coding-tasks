---
title: Normalize order statuses for UI
slug: normalize-order-statuses-for-ui
category: typescript
type: data-transformation
difficulty: easy
penalty: 0
hasPreview: false
---

# Normalize order statuses for UI

## Focus areas

- discriminated unions
- safe normalization of API-like data
- mapping backend values to UI-friendly labels

## Task

You are given a list of orders coming from an API.

The API is inconsistent:

- some orders use `status`
- some use `state`
- some values are unexpected or missing

Write a TypeScript function that normalizes each order into a UI-friendly shape:

- `id`
- `displayStatus`
- `isFinal`
- `canBeCancelled`

Use these rules:

- `"pending"` and `"new"` -> `"Pending"`
- `"paid"` and `"confirmed"` -> `"Confirmed"`
- `"shipped"` -> `"Shipped"`
- `"delivered"` -> `"Delivered"`
- `"cancelled"` and `"canceled"` -> `"Cancelled"`
- any unknown or missing value -> `"Unknown"`

## Behavior rules

- `isFinal` is `true` only for `"Delivered"` and `"Cancelled"`
- `canBeCancelled` is `true` only for `"Pending"` and `"Confirmed"`

Return a new array and do not mutate the input.

## Requirements

- use TypeScript
- create a function that transforms the raw input into a UI-friendly array
- handle both `status` and `state`
- handle missing and unexpected values safely
- do not mutate the original input
- keep the solution interview-sized and easy to explain

## Optional edge cases

- both `status` and `state` exist, but have different values
- `status` value is uppercase, e.g. `"PAID"`
- `status` is an empty string
- one order is missing both `status` and `state`
