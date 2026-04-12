---
title: Build Activity Timeline
slug: build-activity-timeline
category: typescript
type: data transformation
difficulty: medium
penalty: 0
hasPreview: false
---

## Focus areas

- grouping and aggregation
- sorting by derived values
- immutable transformation
- clear output modeling

## Task

You are given a flat list of user activity records. Implement a function that converts this data into a timeline summary grouped by day.

Each output day should include the day, the total number of activities for that day, and a list of users who were active on that day. For each active user, include how many activities they performed that day and the timestamp of their latest activity for that day.

The goal is to transform noisy event data into a structure that is ready for reporting or UI rendering.

## Expected input / output

- Input:
  - an array of activity objects
  - each activity has:
    - `id: string`
    - `userId: string`
    - `userName: string`
    - `type: "comment" | "like" | "login" | "logout" | "purchase"`
    - `createdAt: string`
- Output:
  - an array of objects in this shape:
    - `date: string`
    - `totalActivities: number`
    - `users: Array<{ userId: string; userName: string; activityCount: number; latestActivityAt: string }>`

Preserve input immutability. Group activities by the UTC calendar date derived from `createdAt`. Sort output days by date descending. Sort users inside each day by activity count descending, then `latestActivityAt` descending, then `userName` ascending.

## Requirements

- Return one output item per date that appears in the input
- Derive the output date from the UTC date portion of `createdAt`
- `totalActivities` must be the number of all activities that happened on that date
- Users should appear only once per day
- For each user on a given date:
  - count all their activities for that date
  - keep the most recent `createdAt` value as `latestActivityAt`
  - if multiple records for the same `userId` on the same day contain different `userName` values, use the `userName` from the latest activity for that user on that day
- Do not mutate the input array or any input objects
- Keep the function pure
- Assume all timestamps are valid ISO strings

## Optional edge cases

- empty input returns an empty array
- the same user appears across multiple days
- records arrive in random order
- two users have the same `activityCount` and the same `latestActivityAt`

## Out of scope

- filtering by activity type
- locale-based date formatting
- time zone conversion beyond using UTC day grouping
- validation of malformed timestamps
