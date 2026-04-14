# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important missing or incorrect behavior: numeric ordering is not reliable, so the function can miss gaps or return them in the wrong order for some valid inputs.

## Weaknesses

- `tasks/typescript/find-missing-sequence-numbers/main.ts:14` uses `.sort()` without a numeric comparator. That sorts numbers lexicographically, so inputs like `1, 2, 10` become `1, 10, 2`, which breaks the requirement to find all missing integers between the real minimum and maximum values.
- `tasks/typescript/find-missing-sequence-numbers/main.ts:46` also uses `.sort()` without a numeric comparator when ordering missing values inside each gap. That can violate the explicit requirement to return missing numbers in ascending order once values reach multiple digits.

## Strengths

- The solution handles the empty input case correctly.
- Duplicate sequence values are removed before gap detection, which matches the task requirements.
- The input array and input objects are not mutated.

## Missed edge cases

- Multi-digit values such as `1, 2, 10`.
- Mixed negative and positive values combined with larger absolute values, where lexicographic sorting becomes even less intuitive.

## What a stronger candidate would improve

- Keep the same overall approach, but make the ordering explicitly numeric instead of relying on JavaScript's default string-based sort behavior.

## Main learning takeaway

- When a task depends on numeric order, never rely on bare `.sort()` in JavaScript or TypeScript; make the ordering rule explicit.

## Suggested next step

- Re-test your function with `[{ sequence: 1 }, { sequence: 2 }, { sequence: 10 }]` and inspect the intermediate sorted arrays before changing anything else.

## Follow-up questions

- How would you solve this task without sorting at all?
- What is the time-cost tradeoff between using a `Set` plus range scan versus sorting first?
- Why does default `.sort()` behave differently for numbers than many people expect?

## Final verdict

The solution is close and the overall direction is good, but one important requirement is still unmet because numeric ordering is handled incorrectly.
