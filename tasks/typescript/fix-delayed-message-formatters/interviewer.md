---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "scope-and-closures"
secondaryTopics:
  - "declaration-lifecycle"
---

# Interviewer Plan

## Difficulty calibration

- Diagnosis: 1
- Interactions: 1
- Edge cases: 1
- Conceptual depth: 2
- Change surface: 0
- Follow-up escalation: 1
- Total: 6
- Rating: medium
- Rationale: The code change is local, but the candidate must distinguish related lexical bindings, explain delayed closure reads, and reason precisely about declaration initialization in the follow-up.

## Core Task

### Purpose

Evaluate whether the candidate can trace lexical bindings through nested scopes and repair callbacks that observe the wrong binding when invoked after their factory has returned.

The task also checks whether the candidate can distinguish a block-scoped shadowed binding from a mutable binding shared by several closures.

### Expected evidence

- Predicts the existing output by tracing which binding each returned function reads.
- Gives every formatter stable access to the display name selected for its recipient.
- Preserves the delayed callback API, input order, and preferred-name behavior.
- Explains that a closure retains access to a binding rather than taking an automatic value snapshot.
- Avoids mutation, global state, and unrelated restructuring.

### Start questions

#### core-start-1

- Kind: prediction
- Topic: scope-and-closures
- Prompt: Before editing the code, what four strings will the sample formatters produce, and which declaration supplies the displayed name in each case?
- Purpose: Diagnose whether the candidate can trace nested lexical scopes before attempting a fix.
- Expected evidence: Distinguishes the block-local preferred-name binding from the outer binding used by the remaining callbacks.

#### core-start-2

- Kind: diagnostic
- Topic: scope-and-closures
- Prompt: The returned functions run after `createMessageFormatters` has finished. Which values or bindings do they still need access to at that point?
- Purpose: Check the candidate's mental model of delayed callbacks without prescribing a code change.
- Expected evidence: Identifies the prefix and the recipient-specific display name as data retained through lexical scope.

### Checkpoint questions

#### core-checkpoint-1

- Kind: transfer
- Topic: scope-and-closures
- Prompt: Why can a returned formatter still read locally declared data after the factory call that created it has returned?
- Purpose: Verify that the working fix is supported by an explicit closure model.
- Expected evidence: Explains retained lexical bindings and does not describe local variables as universally destroyed on return.

#### core-checkpoint-2

- Kind: counterexample
- Topic: scope-and-closures
- Prompt: What behavior would reappear if one mutable display-name binding were declared outside the per-recipient callback and reassigned for each recipient?
- Purpose: Confirm that the candidate understands the original failure mode rather than only the final syntax.
- Expected evidence: Predicts that multiple delayed callbacks would observe the final value of the shared binding.

### Review focus

- Correct recipient-to-formatter association for delayed and repeated calls.
- Accurate reasoning about lexical scope, captured bindings, and shadowing.
- Preservation of the public API, ordering, and input immutability.
- A small, readable fix without accidental shared state.

## Follow-up 1

### Reveal

Keep the observable behavior unchanged, but ensure that every per-recipient binding is declared in the narrowest block that owns it. Then compare what would happen if such a binding were read before its declaration in the same block when declared with `var`, `let`, or `const`.

### Purpose

Extend the closure reasoning into declaration lifecycle: hoisting, initialization, temporal dead zone behavior, and the interaction between shadowing and an outer binding.

### Topics

- scope-and-closures
- declaration-lifecycle

### Expected evidence

- Keeps per-recipient state local to the iteration that owns it.
- Explains that a later block declaration can shadow an outer binding throughout that block.
- Distinguishes declaration hoisting from initialization and usable values.
- Predicts `var`, `let`, and `const` behavior without relying on trial and error.

### Start questions

#### follow-up-1-start-1

- Kind: prediction
- Topic: declaration-lifecycle
- Prompt: Inside a block that contains a later `let` declaration with the same name as an outer variable, which binding does an earlier read target, and what happens at runtime?
- Purpose: Test the interaction between lexical shadowing and the temporal dead zone.
- Expected evidence: Identifies the inner binding and predicts a runtime reference error before its initialization.

#### follow-up-1-start-2

- Kind: prediction
- Topic: declaration-lifecycle
- Prompt: How would that earlier read behave differently if the inner declaration used `var` instead?
- Purpose: Contrast function-scoped initialization with block-scoped temporal dead zones.
- Expected evidence: Predicts an initialized `undefined` value in the applicable function scope rather than access to the outer binding.

### Checkpoint questions

#### follow-up-1-checkpoint-1

- Kind: teaching
- Topic: declaration-lifecycle
- Prompt: Why is the phrase “the declaration is hoisted” insufficient to predict whether a value can be read before its source line?
- Purpose: Require a precise distinction between binding creation, initialization, scope, and first usable access.
- Expected evidence: Separately explains `var` initialization to `undefined` and the `let`/`const` temporal dead zone.

#### follow-up-1-checkpoint-2

- Kind: transfer
- Topic: scope-and-closures
- Prompt: If a formatter captured a binding before that binding was reassigned, would it preserve the earlier value automatically? Explain the condition that determines the result.
- Purpose: Connect declaration lifetime back to closure behavior and prevent the snapshot misconception.
- Expected evidence: Explains that the closure observes its captured binding and later reassignment is visible unless a distinct per-iteration binding was created.

### Review focus

- Precise distinction between scope, shadowing, hoisting, initialization, and the temporal dead zone.
- Correct comparison of `var`, `let`, and `const` before their declaration lines.
- Whether the final formatter implementation uses clear ownership of per-recipient bindings.
