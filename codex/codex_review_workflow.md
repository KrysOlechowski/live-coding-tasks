# Codex Review Workflow

## Purpose

This document explains how Codex should review completed live-coding tasks in this repository.

The goal is to provide practical interview-style feedback and save it in a consistent format.

---

## Main rule

Review the candidate's solution like a realistic technical interviewer.

Anchor the review in the actual task requirements.
Before criticizing implementation details, first decide whether the solution meets the required behavior.
Do not let one minor issue dominate the whole review if the core task is solved.

Be practical and concise.
Do not rewrite the whole solution immediately.
Do not turn the review into a full tutorial unless explicitly asked.

---

## When to use this workflow

Use this workflow when:

- a task solution is finished
- the candidate asks for review
- the candidate asks for interview-style feedback
- the candidate wants follow-up questions after solving the task

---

## Review location

Save the review inside the task folder as:

`review.md`

Example:

- `tasks/react/search-filter-users/review.md`
- `tasks/async/async-account-widget/review.md`

If `review.md` already exists, update it instead of creating a duplicate.
`review.md` should represent the latest review only.

---

## What to evaluate

Evaluate the solution based on what is relevant for the task.

Possible areas:

- correctness
- readability
- maintainability
- edge cases
- state management
- React quality
- TypeScript quality
- async flow handling
- error handling
- data transformation quality
- general coding quality

Do not force irrelevant categories.

---

## Review style

Keep the review:

- realistic
- practical
- concise
- interviewer-like

Prefer clear observations over long theory.

Prioritize issues in this order:

1. required behavior and correctness
2. important edge cases explicitly relevant to the task
3. maintainability and readability
4. optional polish

Do not over-focus on one low-impact issue while missing broader technical quality.

Good:

- what is good
- what is weak
- what is missing
- what could be improved

Avoid:

- rewriting everything from scratch too early
- over-explaining basic concepts unless asked
- giving a full solved alternative unless asked

---

## review.md structure

# Task Review

## Requirement check

- Meets the task requirements: yes / partially / no
- Most important missing or incorrect behavior: ...

## Strengths

- ...
- ...
- ...

## Weaknesses

- ...
- ...
- ...

## Missed edge cases

- ...
- ...

## What a stronger candidate would improve

- ...
- ...

## Follow-up questions

- ...
- ...
- ...

## Final verdict

[short summary]

---

## Strengths

List the parts that are clearly good.

Examples:

- clear structure
- readable naming
- correct core logic
- good use of local state
- clean separation of concerns
- reasonable handling of errors

---

## Requirement check

Start by explicitly judging whether the solution actually meets the task.
This should be short and practical.

Example placeholder lines:

- Meets the task requirements: yes
- Meets the task requirements: partially
- Meets the task requirements: no
- These are only examples of wording. Replace them with task-specific findings.
- Most important missing or incorrect behavior: [insert the biggest task-specific gap here]
- Example: clear filters does not reset category
- Example: retry still leaves stale error UI visible

Do not skip this section.
If the task is mostly correct, say so clearly.
If the task is only partially solved, say so clearly.

---

## Weaknesses

List the main weaknesses without exaggerating.

Examples:

- logic mixed in one place
- weak handling of edge cases
- too much duplicated code
- unnecessary complexity
- incomplete state handling

Keep weaknesses proportional.
Do not present a minor UX issue, wording issue, or polish item as the main failure if the core logic is correct.
If the biggest issue is only a requirement-detail mismatch, say so explicitly instead of making the review sound broader than it is.

---

## Missed edge cases

Only list edge cases that actually matter for the task.

Examples:

- empty input
- invalid values
- retry not handled
- loading state missing
- no-result scenario missing

---

## What a stronger candidate would improve

This section should explain what would make the solution better in an interview context.

Examples:

- cleaner separation of responsibilities
- safer handling of invalid input
- better naming
- more complete async state handling
- reduced unnecessary re-renders

---

## Follow-up questions

Add 2 or 3 realistic follow-up questions.

Examples:

- What would you refactor next?
- How would this change if the dataset became very large?
- Would you keep this state local or move it elsewhere?
- How would you test this?
- What if the API response became inconsistent?

Keep the questions practical and relevant.

---

## Penalty handling

Do not encode review outcome in the folder name.

If the review should affect the task's penalty level, update the `penalty` field in `task.md` frontmatter instead.

Penalty guidance:

- `0` = solid solution
- `1` = one important issue
- `2` = multiple important issues
- `3` = core logic broken or largely unsolved

Keep the folder name stable and based on the task slug.

## Final verdict

Give a short summary.

Examples:

- Solid baseline solution with a few missed edge cases.
- Good practical solution, but could be cleaner and more robust.
- Correct direction, but the implementation needs stronger handling of async and edge states.

The final verdict must clearly answer two questions:

- did the candidate solve the task?
- if not, what is the single most important gap?

Keep it short.

---

## Updating topic tracking

After reviewing a task, update `/gpt/gpt_topics.md` if needed.

Only add:

- genuinely new covered topics
- genuinely new task types

Do not spam the file with near-duplicates.

After review-related updates (including `review.md`, `task.md` frontmatter, or `gpt_topics.md`), run:

`npm run sync:metadata`

---

## Penalty decision guidance

Use the numeric `penalty` field conservatively, but update it when the review clearly shows real task failure.

Typical guidance:

- `0` → the task is correct, solid, and meets requirements
- `1` → one important requirement or behavior is still wrong or missing
- `2` → multiple important requirements are wrong or missing, or the solution is significantly incomplete
- `3` → the core logic is broken or the task is largely unsolved

Do not raise the penalty for:

- style-only improvements
- optional refactors
- minor naming suggestions
- "stronger candidate" polish that does not affect correctness

## Review-to-penalty mapping

Use the language in the review as a direct signal for the `penalty` field in `task.md` frontmatter.

Examples:

- "one core requirement is still missing" → at least `1`
- "one important requirement or behavior is still wrong or missing" → at least `1`
- "partial fix" → at least `1`
- "incomplete solution" → at least `1`
- "multiple important requirements are wrong or missing" → at least `2`
- "core logic is broken" → `3`
- "solid solution" or "meets requirements" → `0`

Never assign a penalty based mainly on:

- typo-level issues
- summary wording that does not affect core behavior
- small presentation mismatches
- optional refactor suggestions

A penalty requires a real gap in required behavior, correctness, or important edge-case handling.

When in doubt:

- prefer `0` for style-only improvements
- raise the penalty when a required behavior is still missing or wrong

---

## Important behavior

When reviewing:

1. inspect the current task files
2. evaluate the solution based on the actual task
3. create or update `review.md`
4. determine the correct numeric penalty level from the review
5. update the `penalty` field in `task.md` frontmatter if needed
6. keep the task folder name unchanged
7. update `/gpt/gpt_topics.md` only if the task introduced something meaningfully new

---

## Goal

The review should help the candidate understand, in priority order:

- what was good
- what was weak
- what a stronger interview answer or implementation would look like
- whether the task was actually solved or only partially solved
