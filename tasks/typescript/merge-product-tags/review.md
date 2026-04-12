# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: no blocker; the implementation correctly merges both tag arrays, ignores empty values, deduplicates case-insensitively, preserves first-seen output order, and keeps the input untouched.

## Weaknesses

- No significant weaknesses for this task. The only small cleanup point is that `main.ts:36-51` deduplicates by mutating the helper's local `tagsList` argument in place, which is still safe here because the caller passes a fresh combined array, but it is a slightly fragile pattern to reuse later.

## Strengths

- `main.ts:16-22` handles `null` and `undefined` tag arrays cleanly by treating them as empty arrays before merging.
- `main.ts:24-30` preserves input order and returns one new output object per product without mutating the original product objects.
- `main.ts:41-49` correctly removes duplicates across both arrays using case-insensitive comparison while preserving the first encountered visible version after trimming.

## Missed edge cases

- None beyond the optional cases. The current logic also behaves correctly when both tag arrays are missing and when all incoming tags are empty or whitespace-only.

## What a stronger candidate would improve

- Replace the in-place blanking approach in `main.ts:44` with a `Set`-based seen-key check so the helper is easier to reason about and safer to reuse.
- Add one focused example or test case that makes the "first visible version wins" rule explicit, for example mixed casing across `tags` and `extraTags`.

## Main learning takeaway

- In data-transformation tasks, the strongest solutions make normalization, deduplication, and immutability explicit at each step instead of relying on incidental behavior.

## Suggested next step

- Refactor the dedup helper so it stays fully non-mutating internally as well, while keeping the same output behavior.

## Follow-up questions

- Why does the current solution still count as pure even though `getUniqueTagsList` mutates its local `tagsList` parameter?
- How would you rewrite the deduplication so it runs in one pass with a `Set` while still preserving the first visible tag?
- If the requirements changed to normalize tags to lowercase in the final output, which part of your pipeline would you change and why?

## Final verdict

Correct solution. The required behavior is implemented cleanly, the merge and dedup rules are respected, and the remaining feedback is only about making the helper logic a bit more robust and readable.
