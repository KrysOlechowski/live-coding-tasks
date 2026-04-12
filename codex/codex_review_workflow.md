# Codex Review Workflow

## Purpose

This document explains how Codex should review completed live-coding tasks in this repository.

The goal is to provide practical interview-style feedback, save it in a consistent format, and help the candidate learn from the review without turning it into a long tutorial.

---

## Main rule

Review the candidate's solution like a realistic technical interviewer.

Anchor the review in the actual task requirements.
Before criticizing implementation details, first decide whether the solution meets the required behavior.
Use `codex/review_rubric.md` to calibrate severity, penalty, and what not to mention.

Prefer high-signal review over exhaustive review.
Do not let one minor issue dominate the whole review if the core task is solved.
Do not turn the review into a full tutorial or a full rewrite unless explicitly asked.

---

## When to use this workflow

Use this workflow when:

- a task solution is finished
- the candidate asks for review
- the candidate asks for interview-style feedback
- the candidate wants follow-up questions after solving the task
- the user message includes phrases like `review my solution`, `review this task`, `do a review`, `zrob review`, or `zrób review`

If one of the trigger phrases above is used, treat it as a full review request and do not stop at chat-only feedback.

Complete the workflow end-to-end:

1. inspect `task.md` and extract the explicit requirements
2. inspect the current solution files
3. compare the implementation against each explicit requirement
4. identify the highest-signal findings
5. create or update `review.md`
6. update `penalty` in `task.md` frontmatter when needed
7. update `/gpt/gpt_topics.md` only if the task introduced something meaningfully new
8. run `npm run finalize:tasks`

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
- requirement compliance
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
Do not review beyond the task scope.
Do not promote optional polish above broken required behavior.

---

## Review style

Keep the review:

- realistic
- practical
- concise
- interviewer-like
- issue-first

Prefer clear observations over long theory.
Assume the candidate is at least intermediate level unless the solution clearly shows a more basic gap.
Do not explain junior-level basics unless they are directly necessary to explain a bug or missed requirement.

Prioritize issues in this order:

1. required behavior and correctness
2. important edge cases explicitly relevant to the task
3. maintainability and readability
4. optional polish

Avoid trivial findings unless they materially affect:

- correctness
- requirement compliance
- maintainability
- debugging difficulty
- interview signal

For each major issue, explain briefly:

- what is wrong
- why it matters in this task
- what kind of improvement would fix it

Keep that explanation to 1 to 3 short sentences.
Do not turn one issue into a long essay.

If the task is mostly correct, say so clearly.
If the task is only partially solved, say so clearly.
If the remaining issues are only minor polish, keep the review short.

---

## Findings format

When you describe a concrete issue, include a concrete file reference in `path:line` form.

Examples:

- `main.tsx:32` toggle logic does not close the currently open FAQ item.
- `main.ts:47` function still returns an empty array instead of grouped output.

When possible, each major finding should include:

- the requirement or behavior that is affected
- the `path:line` reference
- the root cause, not only the visible symptom

If the visible behavior and the root cause are different, explain both.
Do not stop at the first symptom if the deeper cause is visible in code.

---

## review.md structure

# Task Review

## Requirement check

- Meets the task requirements: yes / partially / no
- Most important missing or incorrect behavior: ...

## Weaknesses

- ...
- ...
- ...

## Strengths

- ...
- ...
- ...

## Missed edge cases

- ...
- ...

## What a stronger candidate would improve

- ...
- ...

## Main learning takeaway

- ...

## Suggested next step

- ...

## Follow-up questions

- ...
- ...
- ...

## Final verdict

[short summary]

---

## Requirement check

Start by explicitly judging whether the solution actually meets the task.
This should be short and practical.

Before writing the section, compare the implementation against each explicit requirement from `task.md`.
For each requirement, decide:

- met
- partially met
- not met

If multiple bugs are related, explain both:

- the visible behavior problem
- the root cause in the implementation

Do not skip this section.

Use this bar for the top-line verdict:

- `yes` -> all explicit required behaviors are met; only minor polish or clarity issues remain
- `partially` -> the solution mostly works, but at least one explicit requirement is not met exactly
- `no` -> core behavior is broken or the task is not solved

Do not write `yes` if the review still claims an explicit required behavior is missing.
If the remaining issue is only markup polish, wording preference, or non-blocking clarity, keep `yes`.

---

## Weaknesses

List the main weaknesses without exaggerating.
Prefer 1 to 3 high-signal weaknesses.

Do not present a minor polish issue as the main failure if the core logic is correct.
If the biggest issue is only a requirement-detail mismatch, say so explicitly instead of making the review sound broader than it is.
If blockers exist, do not spend review space on low-value minor polish.

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

## Missed edge cases

Only list edge cases that actually matter for the task.
Do not repeat the same baseline requirement gap already listed in `Requirement check`.
If there are no additional edge-case misses beyond the main requirement gap, write `- none`.

---

## What a stronger candidate would improve

This section should explain what would make the solution better in an interview context.
Keep it practical and specific to this task.

---

## Main learning takeaway

Write one short lesson the candidate should remember from this review.
Focus on a reusable engineering habit or decision, not on junior-level theory.

Examples:

- Preserve required behavior first, then optimize structure.
- When order matters, avoid sorting unless the requirement explicitly allows it.
- If mutability is constrained, avoid in-place array operations on function inputs.

---

## Suggested next step

Write one concrete next improvement the candidate should make first.
Do not turn this into a multi-step tutorial.

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
Use `codex/review_rubric.md` as the default calibration guide.

Typical guidance:

- `0` = solid solution, or only minor issues remain
- `1` = mostly correct, but one important requirement or behavior is still wrong or missing
- `2` = multiple important requirements or behaviors are wrong or missing, or the solution is significantly incomplete
- `3` = core logic is broken or the task is largely unsolved

Do not raise the penalty for:

- style-only improvements
- optional refactors
- minor naming suggestions
- stronger-candidate polish that does not affect correctness

Keep the folder name stable and based on the task slug.

---

## Updating topic tracking

After reviewing a task, update `/gpt/gpt_topics.md` if needed.

Only add:

- genuinely new covered topics
- genuinely new task types

Do not spam the file with near-duplicates.

After review-related updates (including `review.md`, `task.md` frontmatter, or `gpt_topics.md`), run:

`npm run finalize:tasks`

---

## Goal

The review should help the candidate understand, in priority order:

- whether the task was actually solved or only partially solved
- what the highest-signal weaknesses are
- what was good
- what a stronger interview answer or implementation would look like
- what single lesson is most worth carrying into the next task
