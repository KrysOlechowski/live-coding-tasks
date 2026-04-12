# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important missing or incorrect behavior: `main.ts:20`, `main.ts:23`, `main.ts:26`, and `main.ts:29` only trim the selected name parts. The task explicitly requires collapsing repeated internal spaces as well, so values like `" Mary   Ann "` would still render as `"Mary   Ann"` instead of `"Mary Ann"`.

## Weaknesses

- `main.ts:15-29` checks for non-empty values correctly, but the implementation never normalizes internal whitespace before building `displayName`. That leaves one explicit requirement unmet and is the main gap in an otherwise solid solution.

## Strengths

- `main.ts:19-32` follows the required fallback order correctly: full name, single name part, nickname, then `"Anonymous"`.
- `main.ts:35-38` preserves input order and returns a new array instead of mutating the original one.
- `main.ts:15-17` correctly treats `null`, `undefined`, empty strings, and whitespace-only strings as missing values.

## Missed edge cases

- None beyond the main normalization issue.

## What a stronger candidate would improve

- Extract one small normalization helper and use it consistently for all name parts instead of repeating `.trim()` checks and returns in multiple branches.
- Add one sample case with repeated internal spaces so the normalization rule is visible in the output, not just implied by the task text.

## Main learning takeaway

- When a task says "normalized," implement that normalization explicitly in one reusable place instead of relying on partial cleanup like `.trim()`.

## Suggested next step

- Add a helper that turns any used name value into either a normalized string or a missing value, then build `displayName` from those normalized parts.

## Follow-up questions

- How would you write a small helper so trimming and internal-space collapsing happen exactly once?
- What test input would you add to prove that nickname normalization works too, not just first and last names?
- Why is `map` a better fit than mutating the original array for this task?

## Final verdict

Mostly correct solution with one explicit requirement still missing. The fallback logic, immutability, and missing-value handling are good, but internal whitespace normalization needs to be implemented for the task to be fully complete.
