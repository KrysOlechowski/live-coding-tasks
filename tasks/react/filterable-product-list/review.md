# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: no blocker; the main remaining gap is that the empty state copy and structure are slightly off the spec at `main.tsx:69`

## Weaknesses

- `main.tsx:69` renders the empty state as a raw text node inside the `<ul>` and uses `No products found` instead of the task copy `No products found.`. The user-facing behavior is close, but a dedicated empty-state element would match the requirement more cleanly and keep the markup valid.
- `main.tsx:30` uses the `filter` callback with mixed return types (`boolean`, object, and `undefined`). It works here because `filter` only checks truthiness, but it makes the core condition harder to read and verify in an interview setting than an explicit boolean predicate.

## Strengths

- `main.tsx:50` and `main.tsx:59` wire the input and checkbox as controlled inputs correctly.
- `main.tsx:30` combines both filters in one derived list, keeps the search case-insensitive, and trims whitespace before matching.
- `main.tsx:71` preserves the original product order and avoids mutating the source data by using `filter` and `map`.

## Missed edge cases

- None beyond the baseline requirements. The trimming and empty-search behavior are already handled.

## What a stronger candidate would improve

- Make the empty state a dedicated element with the exact required copy instead of rendering a bare string in the list container.
- Rewrite the filter condition so every branch returns an explicit boolean and the intent is obvious on first read.

## Main learning takeaway

- Once the core behavior works, the next interview signal is whether the final implementation matches the spec precisely and expresses the main condition clearly.

## Suggested next step

- Refactor `visibleProducts` into a small explicit predicate and render the empty state as its own element when the filtered list is empty.

## Follow-up questions

- How would you extract the filtering logic into a pure helper without making this small component more complex than it needs to be?
- If the product list grew to a few thousand items, what would you optimize first and why?

## Final verdict

Solid solution. The required behavior is implemented correctly; the remaining issues are minor clarity and markup/spec-alignment points rather than logic bugs.
