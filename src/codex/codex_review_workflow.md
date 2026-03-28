# Codex Review Workflow

## Purpose

This document explains how Codex should review completed live-coding tasks in this repository.

The goal is to provide practical interview-style feedback and save it in a consistent format.

---

## Main rule

Review the candidate's solution like a realistic technical interviewer.

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

- `tasks/search-filter-users/review.md`
- `tasks/async-account-widget/review.md`

If `review.md` already exists, update it instead of creating a duplicate.

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

Use this format:

# Task Review

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

## Weaknesses

List the main weaknesses without exaggerating.

Examples:

- logic mixed in one place
- weak handling of edge cases
- too much duplicated code
- unnecessary complexity
- incomplete state handling

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

## Final verdict

Give a short summary.

Examples:

- Solid baseline solution with a few missed edge cases.
- Good practical solution, but could be cleaner and more robust.
- Correct direction, but the implementation needs stronger handling of async and edge states.

Keep it short.

---

## Updating topic tracking

After reviewing a task, update `gpt/gpt_topics.md` if needed.

Only add:

- genuinely new covered topics
- genuinely new task types

Do not spam the file with near-duplicates.

---

## Important behavior

When reviewing:

1. inspect the current task files
2. evaluate the solution based on the actual task
3. create or update `review.md`
4. update `gpt/gpt_topics.md` only if the task introduced something meaningfully new

---

## Goal

The review should help the candidate understand:

- what was good
- what was weak
- what a stronger interview answer or implementation would look like

without turning the feedback into unnecessary theory.
