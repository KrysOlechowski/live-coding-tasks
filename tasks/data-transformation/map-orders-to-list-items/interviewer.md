---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "immutable-transformations"
  - "stable-ordering"
secondaryTopics:
  - "grouping-and-aggregation"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 0
- Interactions: 1
- Edge cases: 1
- Conceptual depth: 0
- Change surface: 0
- Follow-up escalation: 1
- Total: 3
- Rating: easy
- Rationale: The Core is one local record projection; the follow-up adds a small nested aggregation and one empty-collection boundary.

## Core Task

### Purpose

Evaluate whether the candidate can turn nested source records into a clear one-to-one display model using an immutable array transformation.

### Expected evidence

- Produces one new output object for each input record.
- Reads nested source fields accurately.
- Preserves the input order and handles an empty array naturally.
- Avoids mutation, unsafe assertions, and unnecessary intermediate state.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: stable-ordering
- Prompt: Before coding, describe the first output record you expect from the sample input and where each value comes from.
- Purpose: Confirm that the candidate understands the source-to-target field relationships and positional correspondence.
- Expected evidence: Connects each output field to the correct source field or formatting rule without changing record order.

### Checkpoint questions

#### core-checkpoint-1

- Kind: counterexample
- Topic: immutable-transformations
- Prompt: What observable check could show that this function accidentally changed a source order instead of only creating output records?
- Purpose: Verify that the candidate can distinguish a returned transformation from mutation of caller-owned data.
- Expected evidence: Describes comparing or reusing the original input after the call and identifies nested records as caller-owned data.

### Review focus

- Correct one-to-one field projection.
- Preservation of length and order.
- Immutability of the source array and records.
- Clear TypeScript-compatible return values.

## Follow-up 1

### Reveal

Each order now contains an `items` array whose entries have a numeric `quantity`.

Extend each list item with `itemCount`, equal to the total quantity across that order's items. An order with no items must have an `itemCount` of `0`.

### Purpose

Add a small nested aggregation while keeping the outer one-to-one transformation intact.

### Topics

- grouping-and-aggregation
- immutable-transformations

### Expected evidence

- Extends the input and output models without weakening their types.
- Calculates the quantity total independently for each order.
- Handles an empty items array and preserves the existing output behavior.

### Start questions

- None: The revealed requirement is small and does not need an additional diagnostic question.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: counterexample
- Topic: grouping-and-aggregation
- Prompt: Which two small inputs would demonstrate both quantity aggregation and the empty-items boundary?
- Purpose: Check that the candidate can select examples that distinguish item-entry count from total quantity.
- Expected evidence: Uses multiple quantities in one order and a separate order with no items.

### Review focus

- Correct per-order quantity aggregation.
- Empty-items behavior.
- Preservation of the Core transformation and input immutability.

