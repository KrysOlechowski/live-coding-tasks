---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "lookup-and-matching"
  - "complexity-analysis"
secondaryTopics:
  - "normalization-and-lookups"
  - "stable-ordering"
  - "immutable-transformations"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 1
- Interactions: 1
- Edge cases: 1
- Conceptual depth: 1
- Change surface: 0
- Follow-up escalation: 1
- Total: 5
- Rating: medium
- Rationale: Comparing two sources requires deliberate identity matching and a justified lookup cost. One focused function handles independent boundaries, and the follow-up adds duplicate resolution with a precise ordering rule. Expected session time is 35–45 minutes.

## Core Task

### Purpose

Practice previously uncovered lookup selection and complexity analysis using product data. The task differs from prior one-to-one projection and nested immutable update exercises while reinforcing preservation of caller-owned inputs.

### Expected evidence

- Distinguishes record identity from equality of the compared business fields.
- Classifies additions, removals, and changes correctly across both snapshots.
- Chooses appropriate keyed lookup structures and explains whether Map, Set, or another structure fits the values needed; using both Map and Set is not mandatory.
- Avoids repeated full-array searches that make the comparison quadratic.
- Preserves required ordering without mutating or sorting inputs.
- Explains the average lookup assumption, total time, auxiliary storage, and output storage separately.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: lookup-and-matching
- Prompt: What should the report contain if a product keeps its ID and values but moves to a different position and is represented by a new object?
- Purpose: Establish the identity and change contract before implementation without prescribing a technique.
- Expected evidence: Recognizes the product as unchanged regardless of position or object reference.

### Checkpoint questions

#### core-checkpoint-1

- Kind: tradeoff
- Topic: complexity-analysis
- Prompt: With n previous and m current products, what are the time and auxiliary-space costs of your implementation, and which operation-cost assumptions support those bounds?
- Purpose: Distinguish reasoning about actual work from repeating a Big-O label.
- Expected evidence: Accounts for all traversals and stored records, separates returned output, and qualifies average keyed-lookup costs where relevant.

#### core-checkpoint-2

- Kind: tradeoff
- Topic: lookup-and-matching
- Prompt: In your implementation, where would a Set of IDs be sufficient, and where would access to the corresponding product record still be necessary?
- Purpose: Evaluate the distinction between membership and value retrieval after the candidate has chosen a design.
- Expected evidence: Explains membership-only uses versus business-field comparison and before/after retrieval without claiming both structures are required.

### Review focus

- Complete classification and exact field comparison.
- Expected linear total work, with a defensible memory trade-off.
- Stable output ordering, empty-side behavior, and non-mutation.
- Review reference equality only as it affects the explicit value-comparison requirement; no deep-clone requirement.

## Follow-up 1

### Reveal

Snapshots may now contain repeated IDs. Within each snapshot, only the last occurrence of an ID counts; earlier occurrences are ignored completely. Compare these effective snapshots using the existing rules. Each ID must appear at most once in the report. Output order follows the positions of the surviving last occurrences: current positions for added/changed, previous positions for removed. Preserve the expected linear-time target and do not mutate the inputs.

### Purpose

Extend identity matching to deterministic duplicate resolution and make the relationship between replacement and ordering explicit.

### Topics

- normalization-and-lookups
- stable-ordering
- complexity-analysis

### Expected evidence

- Treats duplicate resolution independently within each source.
- Uses final records for classification and comparison, including changes reverted by later duplicates.
- Emits each ID once, ordered by the surviving occurrence rather than its first appearance.
- Preserves the time target and explains any added memory.

### Start questions

- None: The reveal defines a focused contract extension; additional questions before implementation would risk directing the ordering strategy.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: counterexample
- Topic: stable-ordering
- Prompt: If previous is empty and current contains IDs A, B, A in that order, what should added contain and in which order? How does your implementation ensure that?
- Purpose: Distinguish choosing the final value from preserving the position of the final occurrence.
- Expected evidence: Predicts B followed by the final A, and justifies that ordering from the actual implementation.

### Review focus

- Last-occurrence precedence and ordering are both satisfied.
- No duplicate report entries or false changes caused by discarded records.
- Core classification, input preservation, and expected linear work remain intact.
