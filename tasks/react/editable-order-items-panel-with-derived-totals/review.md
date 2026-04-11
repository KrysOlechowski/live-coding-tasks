# Task Review

## Requirement check

- Meets the task requirements: yes.
- Most important missing or incorrect behavior: none.

## Strengths

- Quantity increment/decrement behavior is correct and bounded at `1`.
- Remove flow and empty state behavior are correct.
- `totalItems` and `totalPrice` are derived from `items`, avoiding duplicated state.
- Code stays interview-sized and readable.

## Weaknesses

- No major functional weaknesses.

## Missed edge cases

- none

## What a stronger candidate would improve

- Use functional `setItems(current => ...)` consistently in handlers for safer concurrent updates.
- Add a small interaction test for remove and quantity updates.

## Follow-up questions

- Why is deriving totals during render safer than storing them in separate state?
- How would you test that removing the last item immediately shows empty state?

## Final verdict

Good, complete implementation that meets the task requirements with only minor polish opportunities.
