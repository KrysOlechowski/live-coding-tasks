# Task Review

## Requirement check

- Meets the task requirements: yes.
- Most important missing or incorrect behavior: none.

## Strengths

- Handles both `status` and `state` inputs.
- Unknown or missing values are normalized safely to `"Unknown"`.
- Case-insensitive normalization is implemented.
- Transformation is immutable (`map`-based).

## Weaknesses

- No major functional weaknesses.

## Missed edge cases

- none

## What a stronger candidate would improve

- Document explicit precedence when both `status` and `state` are present.
- Add focused tests for precedence and unknown-value normalization.

## Follow-up questions

- What precedence rule did you choose when both `status` and `state` exist, and why?
- How would you make status mapping easier to extend without touching core logic?

## Final verdict

Solid solution that meets requirements and is production-usable for the defined scope.
