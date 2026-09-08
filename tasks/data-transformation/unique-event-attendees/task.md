---
title: "Unique event attendees"
category: "data-transformation"
taskType: "build-from-requirements"
difficulty: "easy"
primarySkill: "Deduplicate attendee IDs using Set while preserving first-occurrence order"
secondarySkill: "Explain the time and memory costs of processing duplicates"
problemShape: "first-occurrence-deduplication"
interviewFocus: "Set membership and stable ordering in a single collection"
reviewFocus:
  - "correctness"
  - "performance"
  - "readability"
tags:
  - "typescript"
  - "set"
  - "deduplication"
  - "stable-ordering"
  - "big-o"
---

# Unique event attendees

## Context

An event check-in system records attendee IDs in arrival order. The same attendee may check in more than once. A report needs each attendee listed once, in the order of their first check-in.

This is a small utility task with a suggested session time of 20–30 minutes.

## Goal

Implement `getUniqueAttendeeIds(attendeeIds)` in `main.ts` using the built-in `Set` collection.

## Requirements

- Return a new array containing every distinct ID exactly once.
- Preserve the order of first occurrence. A later occurrence of an existing ID must not move it to a different position in the result.
- Compare IDs exactly and case-sensitively: `"u-1"` and `"U-1"` are different attendees.
- Return an empty array for empty input.
- Do not modify the input array.
- Use `Set` to handle uniqueness. Any approach using it that meets the requirements is acceptable.
- Process the input in expected `O(n)` time, assuming average constant-time membership checks and amortized constant-time insertions. Avoid sorting or repeatedly scanning a growing result array.
- After coding, explain the expected time cost and the memory needed for the Set and returned array. Use `n` for the input length and `k` for the number of distinct IDs.

## Constraints

- All IDs are valid non-empty strings. No trimming, parsing, or validation is needed.
- The input contains IDs only; no attendee objects or UI are required.
- Use standard JavaScript/TypeScript features without external libraries.

## Acceptance Criteria

- `["u-2", "u-1", "u-2", "u-3", "u-1"]` produces `["u-2", "u-1", "u-3"]`.
- `["u-1", "u-1", "u-1"]` produces `["u-1"]`.
- `["u-3", "u-1", "u-2"]` keeps that order.
- `["u-1", "U-1", "u-1"]` produces `["u-1", "U-1"]`.
- `[]` produces `[]`.
- The input is unchanged after the call, and the returned value is a separate array even when all IDs are already unique.

The starter currently returns an empty array. Replace that placeholder with your implementation.
