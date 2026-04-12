---
title: Count Messages Per User
slug: count-messages-per-user
category: typescript
type: data transformation
difficulty: easy
penalty: 0
hasPreview: false
---

## Focus areas

- counting occurrences
- object accumulation
- immutable output shaping

## Task

You are given a flat list of chat messages. Implement a function that returns a summary of how many messages each user sent.

The goal is to transform raw event-like data into a compact per-user summary.

## Expected input / output

- Input:
  - an array of message objects
  - each message has:
    - `id: string`
    - `userId: string`
    - `userName: string`
    - `text: string`
- Output:
  - an array of objects in this shape:
    - `userId: string`
    - `userName: string`
    - `messageCount: number`

Preserve input immutability. Preserve the order of first appearance of each user in the input. Each user should appear only once in the output.

## Requirements

- Return one output item per unique `userId`
- Count how many messages belong to each user
- If the same `userId` appears multiple times with different `userName` values, keep the `userName` from the first occurrence
- Do not mutate the input array or any input objects
- Keep the function pure

## Optional edge cases

- empty input returns an empty array
- one user sends all messages
- users appear in interleaved order

## Out of scope

- sorting alphabetically
- trimming or normalizing names
- grouping by message text
- filtering empty messages
