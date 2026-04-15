# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: none

## Weaknesses

- No major weaknesses found for the stated task scope.

## Strengths

- `tasks/typescript/find-first-non-repeating-character/main.ts:2` handles the empty input case correctly by returning `null`.
- `tasks/typescript/find-first-non-repeating-character/main.ts:9` iterates through characters in original order, so the selected result respects the main task requirement.
- `tasks/typescript/find-first-non-repeating-character/main.ts:10` counts matches using exact character equality, which correctly keeps spaces, punctuation, and casing differences as distinct characters.

## Missed edge cases

- None beyond the stated task requirements stood out. The included console-based examples already cover empty input, repeated characters, punctuation, and case sensitivity.

## What a stronger candidate would improve

- The current solution is correct. A stronger follow-up would be reducing repeated filtering work by separating frequency counting from the ordered lookup pass.

## Main learning takeaway

- For “first matching item in original order” tasks, correctness usually comes from splitting the problem into two ideas: total counts and then ordered selection.

## Suggested next step

- Re-implement the same task once with a frequency map and a second pass through the string, then compare the tradeoff against your current approach.

## Follow-up questions

- How would you adapt this if the task asked for the first non-repeating character index instead of the character?
- What changes if you want the comparison to be case-insensitive while still returning the original character?
- Why might a two-pass frequency-map solution scale better on long strings?

## Final verdict

Correct solution for the requested task. The behavior matches the brief, and the implementation handles the relevant edge cases cleanly.
