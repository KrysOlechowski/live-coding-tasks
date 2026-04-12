---
title: Pick Latest Profile Per User
slug: pick-latest-profile-per-user
category: typescript
type: data transformation
difficulty: easy
penalty: 0
hasPreview: false
---

## Focus areas

- grouping by identifier
- selecting latest record
- immutable transformation

## Task

You are given a flat list of user profile snapshots. Implement a function that returns one final profile per user based on the most recent update.

The goal is to reduce repeated historical records into a clean current-state summary.

## Expected input / output

- Input:
  - an array of profile objects
  - each profile has:
    - `id: string`
    - `userId: string`
    - `email: string`
    - `role: "user" | "admin" | "moderator"`
    - `updatedAt: string`
- Output:
  - an array of objects in this shape:
    - `userId: string`
    - `email: string`
    - `role: "user" | "admin" | "moderator"`
    - `updatedAt: string`

Preserve input immutability. Keep only one output item per `userId`. Preserve the order of first appearance of each `userId` in the input.

## Requirements

- Return one output item per unique `userId`
- For each user, keep the record with the latest `updatedAt`
- If two records for the same `userId` have the same `updatedAt`, keep the one that appears later in the input
- Copy `email`, `role`, and `updatedAt` from the chosen record
- Do not mutate the input array or any input objects
- Keep the function pure
- Assume all timestamps are valid ISO strings

## Optional edge cases

- empty input returns an empty array
- one user has only one record
- records for the same user appear non-consecutively
- multiple users have updates interleaved in the input

## Out of scope

- validating email format
- sorting by timestamp
- deduplicating by email
- filtering by role
