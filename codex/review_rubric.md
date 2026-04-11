# Review Rubric

## Main principle

Prefer high-signal review over exhaustive review.
Do not focus on minor polish when required behavior is broken.

## Severity guide

- blocker: breaks an explicit task requirement or core behavior
- medium: solution works partially but has an important technical flaw
- minor: polish or readability issue with low interview impact

## What to include

For each major issue, include:

- the requirement or behavior affected
- a `path:line` reference
- the root cause
- why it matters in this task
- a short improvement direction

## What to avoid

Do not include:

- style-only preferences
- trivial naming comments
- beginner-level explanations unless they are required to understand the bug
- long essays about one issue
- a full replacement solution unless explicitly asked

## Review length

- focus on the 1 to 3 highest-signal weaknesses
- keep each issue explanation short
- if blockers exist, do not spend review space on low-value minor polish

## Learning value

Every review should include:

- one main learning takeaway
- one concrete next step

Keep both short and practical.

## Penalty guide

- `0`: correct solution, or only minor issues remain
- `1`: mostly correct, but one important requirement or behavior is wrong or missing
- `2`: multiple important requirements or behaviors are wrong or missing, or the solution is significantly incomplete
- `3`: core task not solved or core logic is broken
