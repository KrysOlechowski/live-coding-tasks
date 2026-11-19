---
reviewedAt: "2026-11-19T22:36:58Z"
mastery: 5
requirementVerdict: yes
topicSignals:
  - topic: discriminated-unions
    outcome: demonstrated
    evidence: "Literal channel types distinguish all three variants, reject invalid payloads, and allow safe property access in describeNotification (main.ts:1-33)."
---

# Task Review

## Result

All explicit requirements are met. Focused strict TypeScript checks accepted
three valid variants and rejected 20 invalid payloads covering missing fields,
incorrect field types, unrelated channel fields, and an unsupported channel.
Unguarded access to a variant-specific field was also rejected.

Runtime assertions verified the three supplied sample outputs and six additional
empty-string and whitespace cases. Frozen inputs were accepted and remained
unchanged. Checks used temporary files; the candidate solution was not modified.

## Mastery

5/5 — Strong solution. The three variants encode their required fields precisely,
and the formatter uses the resulting narrowing safely and directly.

## Findings

No material issues. The default branch correctly narrows to the remaining push
variant for the specified three-channel model. There are no assertions, type
escapes, suppression comments, or input mutations.

## Strengths

- Distinct literal channel types connect each payload to its required fields
  (main.ts:6-23).
- The formatter is concise and preserves the specified text exactly without
  unnecessary normalization or runtime validation (main.ts:25-33).

## Next step

Commit the completed exercise. Reuse this pattern when a field's value determines
which other properties are available: encode that relationship in the variants
so control-flow checks can narrow the whole object.
