# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: none; the Core task and `Add two` follow-up both behave as required.

## Mastery

Level: 4/5 — Interview-ready

Reason: All core and follow-up behaviors are correct and the summary has one source of truth; only the render-captured update helpers leave a minor robustness improvement.

## Weaknesses

- `main.tsx:57`-`main.tsx:80` calculates every next cart from the `cartItems` captured by the current render. The present handlers perform one update per action and are correct, but composing multiple helper calls in one event could discard an earlier update; previous-state-dependent transitions would be safer when expressed against React's latest state.

## Strengths

- `main.tsx:49`-`main.tsx:51` keeps `cartItems` as the single source of truth and derives the summary instead of synchronizing duplicate state.
- `main.tsx:31`-`main.tsx:38` calculates both summary fields in one clear function and naturally produces zero values for an empty cart.
- `main.tsx:57`-`main.tsx:68` handles both new and existing products, including the follow-up amount, with one immutable cart transition.
- `main.tsx:70`-`main.tsx:80` preserves the minimum quantity and removes only the selected product.

## Missed edge cases

- none

## What a stronger candidate would improve

- Make cart transitions consume the latest state supplied by React, then explain why the current single-update `Add two` implementation works while repeated synchronous updates need different handling.
- Be ready to justify whether `useMemo` at `main.tsx:51` is useful for this small calculation or whether direct derivation would be simpler.

## Main learning takeaway

- Keep calculated UI values derived from one source of truth, and express previous-state-dependent changes against the latest state when updates may be composed.

## Suggested next step

- Refactor the cart mutation helpers to use previous-state updates without changing any visible behavior.

## Follow-up questions

- What would happen if `addProduct(product)` were called twice synchronously in one event handler?
- When would memoizing the cart summary become worthwhile, and how would you verify that?
- How would you test the cart through user-visible behavior rather than implementation details?

## Final verdict

The task is solved correctly and independently. The state model is substantially safer than the scaffold, the full UI behavior is preserved, and the remaining improvement is about making otherwise-correct transitions more reusable under composed updates.
