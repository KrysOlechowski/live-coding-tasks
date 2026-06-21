# Codex Review Workflow

## Purpose

This document explains how Codex should review completed live-coding tasks in this repository.

The goal is to provide practical interview-style feedback, save it in a consistent format, and help the candidate learn from the review without turning it into a long tutorial.

---

## Main rule

Review the candidate's solution like a realistic technical interviewer.

Anchor the review in the actual task requirements.
Before criticizing implementation details, first decide whether the solution meets the required behavior.
Use `category`, `taskType`, `primarySkill`, `problemShape`, and `reviewFocus` from `task.md` frontmatter to calibrate what matters most.
Calibrate severity using the explicit task requirements, `reviewFocus`, and the priority rules in this document.

Prefer high-signal review over exhaustive review.
Do not let one minor issue dominate the whole review if the core task is solved.
Do not turn the review into a full tutorial or a full rewrite unless explicitly asked.
Do not modify the candidate's solution during review unless explicitly asked. Save feedback in `review.md` instead.

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
2. read frontmatter, especially `category`, `taskType`, `primarySkill`, `problemShape`, and `reviewFocus`
3. inspect the current solution files
   When the user provides an explicit task path or opens/adds a file from a task folder, treat that folder as the current task. Inspect only that task folder, shared workflow files, and `/gpt/gpt_topics.md`. Do not inspect unrelated task folders unless explicitly asked.
4. compare the implementation against each explicit requirement
5. identify the highest-signal findings
6. infer an evidence-based Mastery level from the requirements, `reviewFocus`, and highest-signal findings
7. create or update `review.md`
8. update the matching row in `/gpt/gpt_topics.md` and set status to `reviewed`
9. run `npm run finalize:tasks`

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
- test coverage
- performance
- general coding quality

Do not force irrelevant categories.
Do not review beyond the task scope.
Do not promote optional polish above broken required behavior.
Prefer the areas listed in `reviewFocus` when deciding what to prioritize.

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

## Mastery

Level: X/5 — Label

Reason: Short explanation.

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

## Mastery

Infer Mastery during review. The user should not provide it manually.
Treat it as positive progress feedback, not punishment, while keeping the rating honest and evidence-based.
Base it on the actual task requirements, `reviewFocus`, and the highest-signal findings.

Use exactly one of these levels and labels:

- `1/5 — Needs another pass`: major requirements are missing, the solution does not run reliably, or substantial rework is needed
- `2/5 — Partially working`: some core behavior works, but important requirements are still broken
- `3/5 — Mostly working`: the main behavior works, but meaningful edge cases or quality issues remain
- `4/5 — Interview-ready`: the solution meets the requirements with only minor improvement opportunities
- `5/5 — Strong solution`: the solution is correct, readable, robust, and easy to explain

Keep the reason to one short explanation that matches the requirement verdict and findings.
Do not inflate the level to make the review sound more positive.
Do not use penalty stars or penalty scoring.

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

## Updating topic tracking

After saving `review.md`, update the matching row in `/gpt/gpt_topics.md` and set status to `reviewed`.

Track generated task history and coverage, not raw topic lists.

Only add or update entries that reflect real task history.

Do not spam the file with near-duplicates.

After review-related updates, run:

`npm run finalize:tasks`

---

## Final chat response

When the review is complete, keep the final chat response concise and include:

- the main finding
- the Mastery level
- the suggested git name, printed in chat only and not saved to `review.md`
- whether `review.md` was saved
- whether `/gpt/gpt_topics.md` was updated
- which validation commands passed, if any were run

Use this exact format for the suggested git name:

```txt
tasks/<category>/<task-folder-name>
```

Rules:

- use `category` from `task.md` frontmatter
- use the task folder name as the last path segment
- do not include spaces
- do not include quotes
- do not invent a different naming scheme
- do not run git commands

---

## Goal

The review should help the candidate understand, in priority order:

- whether the task was actually solved or only partially solved
- what the highest-signal weaknesses are
- what was good
- what a stronger interview answer or implementation would look like
- what single lesson is most worth carrying into the next task
