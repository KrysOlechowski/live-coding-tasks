# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: None. Core and follow-up behavior are complete; the remaining concerns are independent explanation and maintainability.

## Mastery

Level: 3/5 — Mostly working

Reason: All Core and follow-up requirements are met, but the API-boundary and exhaustive-checking decisions required repeated direct guidance and were not yet explained precisely.

## Weaknesses

- `main.tsx:80` is the correct boundary where `unknown` becomes `AccountLookupResult`, but the session showed that the reason for placing validation there was not understood independently until a direct explanation.
- `main.tsx:231` implements a correct exhaustive renderer, but the compile-time guarantee at `main.tsx:266` was added after implementation-level coaching and its `never` error was still described imprecisely at the checkpoint.
- `main.tsx:93` and `main.tsx:116` use deeply nested validation branches. They are correct, but small focused guards or flatter early returns would make the decoder easier to audit and extend.

## Strengths

- `main.tsx:80` safely narrows top-level and nested unknown values, including `null`, arrays, missing properties, wrong types, and unsupported literals without assertions or `any`.
- `main.tsx:93` keeps a valid service error separate from malformed data, while `main.tsx:116` creates a fully validated account model for the UI.
- `main.tsx:147` extends the boundary with a precise maintenance result and preserves the invalid-response path for malformed maintenance payloads.
- `main.tsx:231` centralizes rendering and covers every application-result variant with an `assertNever` boundary.

## Missed edge cases

- none

## What a stronger candidate would improve

- Explain before coding that external data remains `unknown` only until the decoder validates it, after which all consumers rely on one stable application model.
- Explain the exhaustive check precisely: an omitted union member reaches the default branch as its concrete type, which is not assignable to the `never` parameter.
- Flatten the decoder enough that each valid response shape can be reviewed without tracing several nested blocks.

## Main learning takeaway

- Validate `unknown` once at the external boundary, return a stable union, and make every union consumer exhaustive so future variants cannot be ignored silently.

## Suggested next step

- Repeat a smaller unknown-response decoder with an exhaustive consumer without coaching, focusing on explaining the boundary and the resulting `never` error in your own words.

## Follow-up questions

- How would you test malformed nested payloads without coupling tests to the internal checks?
- When would you extract reusable type guards, and when would that abstraction make validation harder to read?
- Why is `unknown` safer than `any` at an external API boundary?

## Final verdict

The final implementation is correct, type-safe, and complete across Core and follow-up requirements. The main remaining gap is independence: the important boundary and exhaustive-checking decisions required substantial coaching, so the next repetition should test whether the same reasoning can be reproduced without guidance.
