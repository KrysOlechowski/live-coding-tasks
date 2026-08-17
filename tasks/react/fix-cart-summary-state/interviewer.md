---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "derived-ui-state"
secondaryTopics:
  - "react-state-updates"
---

# Interviewer Plan

## Core Task

### Purpose

Evaluate whether the candidate can trace inconsistent React UI state and restore one reliable relationship between cart contents and their visible summary.

### Expected evidence

- Reproduces the inconsistency before changing the implementation.
- Identifies which cart values are canonical and which values are calculated from them.
- Keeps all supported cart actions consistent with the summary.
- Preserves the existing behavior and TypeScript safety.
- Avoids adding unnecessary synchronization mechanisms or dependencies.

### Checkpoint focus

- Ask the candidate to describe why the rows and summary can disagree.
- Ask which data should be treated as the source of truth.
- Check every supported cart action, including the transition to an empty cart.

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

### Review focus

- Correctness of previous-state-dependent updates.
- Behavior under React update batching.
- Preservation of the core-task state model.
