---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "derived-ui-state"
secondaryTopics:
  - "react-state-updates"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 1
- Interactions: 0
- Edge cases: 0
- Conceptual depth: 0
- Change surface: 1
- Follow-up escalation: 0
- Total: 2
- Rating: easy
- Rationale: The task has one localized source-of-truth bug and a direct single-transition extension.

## Core Task

### Purpose

Evaluate whether the candidate can trace inconsistent React UI state and restore one reliable relationship between cart contents and their visible summary.

### Expected evidence

- Reproduces the inconsistency before changing the implementation.
- Identifies which cart values are canonical and which values are calculated from them.
- Keeps all supported cart actions consistent with the summary.
- Preserves the existing behavior and TypeScript safety.
- Avoids adding unnecessary synchronization mechanisms or dependencies.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: derived-ui-state
- Prompt: After one click on a quantity button, which cart values are read, scheduled for update, and displayed on the next render?
- Purpose: Test whether the candidate can trace the existing data flow before naming a solution.
- Expected evidence: Identifies that the rows and summary are updated from values captured at different moments.

#### core-start-2

- Kind: diagnostic
- Topic: derived-ui-state
- Prompt: Which relationship between the cart rows, item count, and total price must remain true after every cart action?
- Purpose: Make the candidate state the invariant without prescribing how to implement it.
- Expected evidence: Describes the item count and total as calculations over the current cart contents.

### Checkpoint questions

#### core-checkpoint-1

- Kind: tradeoff
- Topic: derived-ui-state
- Prompt: Why does your solution keep the summary consistent, and what alternative synchronization approach would be more fragile?
- Purpose: Check that the candidate understands the chosen state model rather than only the visible fix.
- Expected evidence: Explains one source of truth and the risk of independently synchronized state.

#### core-checkpoint-2

- Kind: counterexample
- Topic: derived-ui-state
- Prompt: What guarantees that removing the final cart item produces an item count and total price of zero?
- Purpose: Use the empty transition to test whether the invariant holds at a boundary.
- Expected evidence: Connects the empty collection to the summary calculation without a special stale fallback.

### Review focus

- Correctness after add, increment, decrement, and remove actions.
- Consistency between canonical and calculated UI data.
- Clarity and maintainability of the resulting state model.

## Follow-up 1

### Reveal

Add an `Add two` action for each available product. One click must add exactly two units, including when the product is not yet in the cart, and the summary must remain correct.

### Purpose

Test whether updates that depend on previous React state remain reliable when one user action performs multiple related changes before the next render.

### Topics

- react-state-updates

### Expected evidence

- Adds exactly two units for both existing and new cart products.
- Uses a state-transition approach that remains correct across grouped or batched updates.
- Keeps the order summary consistent without introducing another independent source of truth.

### Start questions

#### follow-up-1-start-1

- Kind: prediction
- Topic: react-state-updates
- Prompt: If an event handler called the current add operation twice before React rendered again, what result would you expect and why?
- Purpose: Surface assumptions about render-captured state and batching before implementation.
- Expected evidence: Distinguishes two requested changes from two reliably accumulated state transitions.

#### follow-up-1-start-2

- Kind: tradeoff
- Topic: react-state-updates
- Prompt: Would you model Add two as two increments or as one transition with an amount, and what guarantee does your choice rely on?
- Purpose: Encourage an explicit transition design instead of accidental batching behavior.
- Expected evidence: Chooses a coherent approach and explains how it reads the current cart.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: counterexample
- Topic: react-state-updates
- Prompt: How does the implementation behave differently when the product is absent versus already present?
- Purpose: Verify both required branches through reasoning rather than only one manual click.
- Expected evidence: Explains the initial quantity and the incremented quantity for the two branches.

#### follow-up-1-checkpoint-2

- Kind: transfer
- Topic: react-state-updates
- Prompt: What would need to change if several cart updates could be composed inside one event or async callback?
- Purpose: Transfer the solution to a case where stale render closures become observable.
- Expected evidence: Describes a transition based on React's latest state or an equivalent composition strategy.

### Review focus

- Correctness of previous-state-dependent updates.
- Behavior under React update batching.
- Preservation of the core-task state model.
