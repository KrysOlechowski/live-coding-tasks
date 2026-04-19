# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important missing or incorrect behavior: some invalid bracket sequences return `true` because the function remembers an earlier balanced prefix even after a later mismatch.

## Weaknesses

- `tasks/typescript/check-whether-brackets-are-balanced/main.ts:40` sets `isCorrect = true` whenever the stack becomes empty during iteration. That is too early for this task, because a later invalid closing bracket can still appear and should make the whole result `false`.
- `tasks/typescript/check-whether-brackets-are-balanced/main.ts:24`, `tasks/typescript/check-whether-brackets-are-balanced/main.ts:30`, and `tasks/typescript/check-whether-brackets-are-balanced/main.ts:36` break out of the loop on mismatch instead of returning `false` or otherwise invalidating the final result. Because of that, inputs such as `())(` and `(()))(` incorrectly return `true`, which breaks the core correctness requirement.

## Strengths

- `tasks/typescript/check-whether-brackets-are-balanced/main.ts:2` correctly filters out non-bracket characters before validation.
- The stack-based approach is the right overall strategy for this problem.
- The implementation correctly rejects odd-length bracket-only sequences early, which is a useful optimization.

## Missed edge cases

- A string that contains a balanced prefix followed by an invalid closing bracket, such as `())(`.
- A string that becomes balanced in the middle and then becomes invalid later, such as `(()))(`.

## What a stronger candidate would improve

- Keep the same stack approach, but base the final result on “no mismatches occurred and the stack is empty at the end” instead of tracking whether the stack was ever empty during the loop.

## Main learning takeaway

- In stack-validation tasks, “balanced so far” is not the same as “balanced overall”; the final verdict must reflect the entire traversal.

## Suggested next step

- Re-test your function on `())(`, `(()))(`, and `({[]})` and inspect how `isCorrect` changes after each character.

## Follow-up questions

- Why is “stack empty at some point” weaker than “stack empty at the end with no mismatches”?
- What would change if angle brackets also had to be supported?
- Can you simplify the branching by using a bracket-pair lookup object?

## Final verdict

The overall approach is good, but one important correctness issue remains: invalid suffixes after an earlier balanced prefix can still produce `true`.
