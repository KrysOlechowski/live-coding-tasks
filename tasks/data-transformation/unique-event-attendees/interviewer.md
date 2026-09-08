---
schemaVersion: 1
plannedFollowUps: 0
primaryTopics:
  - "stable-ordering"
  - "lookup-and-matching"
secondaryTopics:
  - "complexity-analysis"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 0
- Interactions: 0
- Edge cases: 1
- Conceptual depth: 1
- Change surface: 0
- Follow-up escalation: 0
- Total: 2
- Rating: easy
- Rationale: One function applies an explicitly requested collection to string IDs. Empty input, repeated IDs, and case sensitivity are independent boundaries. Explaining first-occurrence order and total work adds a small conceptual requirement. No follow-ups; allow 20–30 minutes including discussion.

## Core Task

### Purpose

Practice Set-based membership after the product-index exercise, and revisit ordering with one input collection. Keep the scope focused after the candidate needed substantial help distinguishing traversal order and total processing cost in earlier work.

### Expected evidence

- Uses Set meaningfully to prevent duplicate output IDs.
- Preserves first-occurrence order without sorting or reversing the output.
- Handles repeated, empty, already-unique, and case-distinct IDs consistently.
- Returns a new array without changing the caller's array.
- Explains that all n input entries must be processed even when only k distinct IDs remain.
- Identifies expected O(n) total time and O(k) storage for the Set and output, with O(1) container overhead for empty input.
- Accepts either direct construction and conversion or explicit membership checks; brevity alone is not a weakness and a manual loop is not required.

### Start questions

- None: The brief defines the output with concrete examples; another prediction before this focused exercise would repeat those requirements without useful additional evidence.

### Checkpoint questions

#### core-checkpoint-1

- Kind: counterexample
- Topic: stable-ordering
- Prompt: For the input ["u-3", "u-1", "u-3", "u-2", "u-1"], what is the output, and what in your implementation ensures that repeated IDs do not change the order?
- Purpose: Verify that the candidate connects the required ordering to actual collection or traversal behavior rather than one lucky example.
- Expected evidence: Predicts u-3, u-1, u-2 and explains why later duplicates neither add entries nor move the original occurrence.

#### core-checkpoint-2

- Kind: tradeoff
- Topic: complexity-analysis
- Prompt: For n input entries and k distinct IDs, what are the expected time cost and the memory costs of your Set and returned array? Explain what changes when every input ID is the same.
- Purpose: Distinguish per-operation cost from total work and input size from the size of the unique collection.
- Expected evidence: Explains expected O(n) time, O(k) Set storage, and O(k) output storage. When every ID is the same, processing still visits all n entries while the Set and result contain one ID.

### Review focus

- Exact first-occurrence ordering, uniqueness, and case-sensitive equality.
- Meaningful Set usage with expected linear work under the stated assumptions.
- Separate input and output arrays and preservation of the source.
- Complexity explanations grounded in the actual implementation. Do not introduce object-reference equality, duplicate-record precedence, or engine internals as requirements.
