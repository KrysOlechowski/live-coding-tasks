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

## Requirement verdict rule

- exact mismatch on an explicit required behavior -> usually `partially`
- minor markup or readability issue with correct user-visible behavior -> usually still `yes`
- do not mix `yes` with wording that says an explicit requirement is still missing

## Mastery guide

- `1/5 — Needs another pass`: major requirements are missing or substantial rework is needed
- `2/5 — Partially working`: some core behavior works, but important requirements remain broken
- `3/5 — Mostly working`: the main behavior works, but meaningful issues remain
- `4/5 — Interview-ready`: requirements are met with only minor improvement opportunities
- `5/5 — Strong solution`: correct, readable, robust, and easy to explain

Infer Mastery from the task requirements, `reviewFocus`, and highest-signal findings.
Use it as honest positive progress feedback, never as penalty scoring.
