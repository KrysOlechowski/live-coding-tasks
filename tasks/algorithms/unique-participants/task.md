---
title: Unique participants
category: algorithms
taskType: build-from-requirements
difficulty: easy
problemShape: deduplicate-by-key
interviewFocus: Deduplicate records while preserving first occurrences and input order
reviewFocus:
  - correctness
  - edge-cases
  - readability
topics:
  - map-set
createdAt: 2026-11-11T12:46:26.136Z
---

# Unique participants

## Context

An event registration export may contain multiple records for the same participant. The first registration is the one that should appear on the participant list.

## Goal

Implement `uniqueParticipants` in `main.ts`. Suggested time: 15–20 minutes.

## Requirements

- Accept a read-only array of participants with string `id` and `name` fields.
- Return a new array containing one participant for each distinct `id`.
- Keep the first record for each `id`, even if later records have a different name.
- Preserve the order in which distinct IDs first appear.
- Compare IDs exactly, including case. Treat IDs as opaque strings; no validation or normalization is required.
- Do not modify the input array or its participant objects. Returned participants may reference the original objects.
- Return an empty array for an empty input.
- No UI, network calls, or external dependencies are needed.

## Acceptance Criteria

For this input:

```ts
[
  { id: "p2", name: "Maya" },
  { id: "p1", name: "Leo" },
  { id: "p2", name: "Maya Updated" },
  { id: "p3", name: "Maya" },
]
```

the result is:

```ts
[
  { id: "p2", name: "Maya" },
  { id: "p1", name: "Leo" },
  { id: "p3", name: "Maya" },
]
```

An input with no duplicate IDs retains every participant in its original order. Repeated IDs produce only their first record, and the input remains unchanged.
