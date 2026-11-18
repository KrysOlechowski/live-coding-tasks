---
reviewedAt: "2026-11-18T16:31:07Z"
mastery: 3
requirementVerdict: partially
topicSignals:
  - topic: map-set
    outcome: needs-practice
    evidence: "The object-based lookup reorders numeric-looking IDs and skips IDs inherited from Object.prototype."
---

# Task Review

## Result

Requirements are partially met. Focused runtime checks passed 5 of 8 behavior cases, including the brief example, empty input, adjacent duplicates, distinct IDs sharing a name, and an empty-string ID. All eight checks confirmed a new output array and unchanged frozen inputs. Standalone strict TypeScript checking passed. No full application build was needed for this utility review.

## Mastery

3/5 — Mostly working. The core first-occurrence lookup works for common IDs, but exact ID handling and collection behavior leave explicit requirements unmet.

## Findings

1. **Requirement failure — IDs are normalized and changed.** `tasks/algorithms/unique-participants/main.ts:15` lowercases each ID, and line 18 stores that changed ID. Input IDs `A` and `a` must remain separate, but the function returns only the first record with ID `a`. Even a single uppercase ID is altered. Preserve IDs exactly for both lookup and output.
2. **Requirement failure — numeric-looking IDs lose input order.** `tasks/algorithms/unique-participants/main.ts:21` uses `Object.values`, which enumerates array-index keys numerically before other string keys. Input IDs `10`, then `2`, produce `2`, then `10`. Use an output-order strategy that preserves first occurrence for every valid string ID.
3. **Requirement failure — inherited properties are treated as existing participants.** `tasks/algorithms/unique-participants/main.ts:13` creates an object with a prototype, while line 17 checks a property lookup against `undefined`. IDs such as `constructor` and `__proto__` already resolve to inherited values and are skipped. Use storage or an existence check that distinguishes stored IDs from inherited properties.

## Strengths

- The existence check retains the first name for ordinary duplicate IDs instead of overwriting it.
- The implementation returns a separate array and does not mutate the input array or participant objects; frozen-input checks confirmed this behavior.

## Next step

Revise ID handling and the lookup/output representation, then rerun the three failing scenarios above. The reusable takeaway is to choose a keyed collection based on its behavior for arbitrary keys and iteration order, rather than treating a plain object as an interchangeable dictionary.
