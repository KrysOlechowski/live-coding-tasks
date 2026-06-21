---
title: "Merge Customer Activity Events"
category: "data-transformation"
taskType: "complete-partial-implementation"
difficulty: "medium"
primarySkill: "Normalizing and merging data from multiple event sources"
secondarySkill: "Deduplicating, sorting, and handling invalid records"
problemShape: "event-normalization-and-deduplication"
interviewFocus: "data-modeling-and-edge-cases"
reviewFocus:
  - "correctness"
  - "data-normalization"
  - "edge-cases"
  - "readability"
tags:
  - "data-transformation"
  - "normalization"
  - "deduplication"
  - "sorting"
  - "edge-cases"
---

# Merge Customer Activity Events

## Context

You are working on a small customer activity utility for an internal support dashboard.

Customer activity arrives from CRM, billing, and support systems. Each source uses a different event shape, but the dashboard needs one normalized timeline that can be rendered consistently.

The current implementation is incomplete and does not handle duplicate events, missing dates, unknown event types, or stable sorting.

## Goal

Implement `mergeCustomerActivityEvents(...)` so it merges raw events from all three sources into a single normalized customer activity timeline.

This is a data transformation task, not a UI task.

## Requirements

- Normalize CRM, billing, and support events into one shared event shape containing:
  - `id`
  - `source`
  - `type`
  - `customerId`
  - `occurredAt`
  - `label`
  - `metadata`
- Merge all valid events into one array.
- Ignore events without:
  - a usable event id
  - a customer id
  - a valid timestamp
- Deduplicate events by normalized event id.
- When duplicate events share an id:
  - keep the event with the most complete data
  - if completeness is tied, keep the first event encountered
- Sort the final timeline by `occurredAt` descending.
- Preserve original relative order when two events have the same timestamp.
- Generate readable labels for known event types.
- Use a safe fallback label for unknown event types.
- Preserve useful source-specific data in `metadata`.
- Do not mutate the input arrays.

### Known event types

- CRM:
  - `profile_updated`
  - `note_added`
  - `owner_changed`
- Billing:
  - `invoice_paid`
  - `invoice_failed`
  - `refund_created`
- Support:
  - `ticket_opened`
  - `ticket_replied`
  - `ticket_closed`

## Constraints

- Use TypeScript.
- Do not add React UI.
- Do not add external libraries.
- Keep the solution local to the task files.
- Prefer small readable helper functions over one large transformation function.
- Avoid `any`.
- Avoid unsafe type assertions unless clearly justified.
- Do not mutate the input arrays.

## Non-goals

- Do not build a dashboard.
- Do not add API calls.
- Do not add persistence.
- Do not implement pagination.
- Do not implement timezone conversion beyond validating and comparing timestamps.

## Acceptance Criteria

- Valid CRM, billing, and support events are normalized into one shared timeline.
- Invalid events are skipped safely.
- Duplicate normalized ids are removed.
- The most complete duplicate wins, with first-encountered order breaking ties.
- Events are sorted by timestamp descending.
- Equal timestamps preserve input order.
- Unknown event types produce safe fallback labels.
- Useful source-specific data is retained in metadata.
- Inputs are not mutated.
- The implementation is readable enough to explain during a live-coding interview.
