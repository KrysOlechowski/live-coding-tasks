---
title: "Compare product snapshots"
category: "algorithms"
taskType: "build-from-requirements"
difficulty: "medium"
primarySkill: "Match records by identity across two collections efficiently"
secondarySkill: "Explain time and space complexity and preserve deterministic output order"
problemShape: "two-snapshot-record-diff"
interviewFocus: "Lookup structure selection and complexity trade-offs when comparing product snapshots"
reviewFocus:
  - "correctness"
  - "performance"
  - "edge-cases"
  - "readability"
tags:
  - "typescript"
  - "map"
  - "set"
  - "record-matching"
  - "big-o"
---

# Compare product snapshots

## Context

A product catalog receives a new snapshot from an external system. Before updating the UI, it needs a report of products added, removed, and changed since the previous snapshot.

The starter provides types and two sample snapshots. This is a utility task with no UI or network requests. Allow about 35–45 minutes for the session.

## Goal

Implement `compareProducts(previous, current)` and explain the time and space complexity of your approach.

## Requirements

- Match products by their case-sensitive string `id`. IDs are unique within each input snapshot.
- Return `added`: products present only in `current`, using their current records.
- Return `removed`: products present only in `previous`, using their previous records.
- Return `changed`: pairs `{ before, after }` for matching IDs where `name` or `priceCents` differs. Compare field values exactly; a new object with identical values is unchanged.
- Omit unchanged products. A change of ID is a removal and an addition.
- Preserve `current` order for `added` and `changed`; preserve `previous` order for `removed`.
- Do not mutate either input array or any product. Returning references to input records is allowed; deep copying is not required.
- Aim for expected `O(n + m)` time, where `n` and `m` are the input lengths, under the usual average constant-time keyed-lookup assumption. Explain auxiliary memory separately from the returned report. You choose the data structures.

## Constraints

- Products already satisfy the provided type. Prices are non-negative integer amounts in cents; no input parsing or validation is needed.
- Use built-in JavaScript/TypeScript features without external libraries.
- No generic deep comparison, sorting, or UI is required.

## Acceptance Criteria

- For the sample, `added` contains `p-4`, `removed` contains `p-2`, and `changed` contains the before/after pair for `p-1`; `p-3` is omitted.
- A name-only change and a price-only change are both detected.
- Both empty snapshots produce three empty arrays; an empty snapshot on one side classifies every product from the other side correctly.
- Reordering otherwise identical products does not create changes, and separate objects with equal field values remain unchanged.
- Multiple additions, removals, and changes follow the specified output order.
- Inputs remain unchanged, and the complexity explanation matches the implementation.
