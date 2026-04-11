# Task Review

## Requirement check

- Meets the task requirements: yes.
- Most important missing or incorrect behavior: none.

## Strengths

- `query` stays controlled and filtering uses current value, fixing lag-by-one behavior.
- Case-insensitive matching behavior is preserved.
- Solution is small and easy to explain in interview context.

## Weaknesses

- `tasks/debugging/fix-search-filtering-lag-by-one-character/main.tsx:2` keeps an unused `useEffect` import (cleanup only).

## Missed edge cases

- none

## What a stronger candidate would improve

- Remove unused import to keep the file clean.
- Add a tiny test that verifies no lag on consecutive keystrokes.

## Follow-up questions

- Why is derived filtering during render preferable here over storing filtered state?
- What bug appears when filtering logic depends on stale state snapshots?

## Final verdict

Core bug fix is correct; only minor cleanup remains.
