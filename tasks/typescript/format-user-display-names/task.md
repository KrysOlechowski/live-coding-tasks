---
title: Format User Display Names
slug: format-user-display-names
category: typescript
type: data transformation
difficulty: easy
penalty: 1
hasPreview: false
---

## Focus areas

- string normalization
- conditional formatting
- immutable transformation

## Task

You are given a list of users. Implement a function that returns a new array of display names ready for UI rendering.

Each display name should be built from the user's first name and last name when available. The output should be trimmed, normalized, and safe to render in a simple user list.

## Expected input / output

- Input:
  - an array of user objects
  - each user has:
    - `id: string`
    - `firstName: string | null`
    - `lastName: string | null`
    - `nickname?: string | null`
- Output:
  - an array of objects in this shape:
    - `id: string`
    - `displayName: string`

Preserve the original input order. Do not mutate the input array or its objects. Trim leading and trailing whitespace from all used name parts and collapse repeated internal spaces into a single space.

## Requirements

- Return one output item for each input user
- Build `displayName` using these rules:
  - if both `firstName` and `lastName` are non-empty after trimming, use `"firstName lastName"`
  - if only one of them is non-empty after trimming, use that single value
  - otherwise, if `nickname` is non-empty after trimming, use `nickname`
  - otherwise, use `"Anonymous"`
- Treat `null`, `undefined`, empty strings, and whitespace-only strings as missing values
- Normalize spacing inside each used value before building the final `displayName`
- Keep the function pure

## Optional edge cases

- Input contains already normalized values
- `nickname` exists but should not be used when a valid first name or last name is available

## Out of scope

- sorting
- locale-aware casing
- deduplication
- validation errors for malformed input
