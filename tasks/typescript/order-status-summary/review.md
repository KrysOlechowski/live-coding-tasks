# Task Review

## Requirement check

- Meets the task requirements: no
- Most important missing or incorrect behavior: the function does not group orders into the correct status buckets. `paid` orders are added to both `pending` and `paid`, `pending` orders are added to `shipped`, and `shipped` orders are never handled at all in [main.ts](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/typescript/order-status-summary/main.ts:21).

## Weaknesses

- `main.ts:21` the core grouping logic is incorrect, which breaks the main task requirement to place each order in exactly one matching group. The root cause is the conditional mapping itself: the first branch checks for `"paid"` but pushes into `pending`, and there is no branch for `"shipped"`.
- `main.ts:21` uses `.map()` only for side effects. That makes the intent less clear in a data-transformation task and is a sign the iteration method was chosen incorrectly.
- `main.ts:33` and `main.ts:47` add `console.log` side effects, which conflicts with the requirement to treat the function as a pure transformation.

## Strengths

- `main.ts:1` the type model is clean and matches the task well.
- `main.ts:15` the result shape is initialized with all three required keys, which is the right starting structure.
- `main.ts:15` the implementation does not mutate the input array or the original order objects.

## Missed edge cases

- All `shipped` orders: this currently returns an empty `shipped` group because that status is never handled in `main.ts:28`.

## What a stronger candidate would improve

- Make the grouping branch directly reflect the status values so each order can only land in one array.
- Use an iteration method that matches the intent, such as `for...of` or `reduce`, and remove debugging side effects from the final solution.

## Main learning takeaway

- In transformation tasks, the first thing to verify is that each branch maps input states to output buckets exactly once. Small condition-to-target mismatches break the whole solution even when the types look correct.

## Suggested next step

- Rewrite the loop so it has one correct path per status, then test it against an input containing `pending`, `paid`, and `shipped` orders.

## Follow-up questions

- Why is `.map()` a weaker fit here than `for...of` or `reduce`?
- How would you quickly prove that every order ends up in exactly one bucket?
- If a new status were added later, how would you structure the code to reduce the chance of bucket-mapping mistakes?

## Final verdict

The task is not solved yet because the central grouping behavior is wrong. The type setup and initial object shape are fine, but the implementation needs one correct, side-effect-free pass over the input to meet the requirements.
