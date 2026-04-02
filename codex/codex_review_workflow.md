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

- `tasks/react/_search-filter-users/review.md`
- `tasks/async/__async-account-widget/review.md`

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

---

## Folder penalty markers

After review, update the task folder name to reflect the penalty level.
Add penalty markers only if the solution contains serious issues.

Penalty markers:

- no marker → solid solution, no serious issues
- `_*` → 1 serious issue
- `_**` → 2 serious issues
- `_***` → 3 serious issues

A serious issue means a meaningful problem in correctness or requirement coverage, not a minor improvement suggestion.
If the review says the solution still misses a required behavior, key requirement, or important edge case, apply at least one penalty marker.
If the review describes the solution as partial, incomplete, or not fully solving the task, apply penalty markers.
If the review says the solution is solid and meets the task requirements, keep no penalty marker.

Examples:

- `tasks/dsa/__group-and-sort-transactions`
- `tasks/dsa/__group-and-sort-transactions_*`
- `tasks/dsa/__group-and-sort-transactions_**`
- `tasks/dsa/__group-and-sort-transactions_***`

Do not add penalty markers for minor style issues or tiny improvements.
Only use them for clearly important problems such as:

- wrong core logic
- missing key requirement
- broken async handling
- important edge cases missed
- solution that does not really solve the task

## Folder renaming after review

After writing or updating `review.md`, renaming the task folder to match the penalty level is required, not optional.

Rules:

- keep the original difficulty prefix (`_`, `__`, or `___`)
- keep the original task name
- update only the penalty suffix
- remove old penalty suffix before applying a new one
- never exceed 3 penalty stars
- if there are no serious issues, remove any existing penalty suffix

Do not skip the rename step.
If the review shows one or more serious issues, the folder name must be updated to include the correct penalty suffix.
If the review shows no serious issues, the folder name must not keep an old penalty suffix.

Rename the existing task folder in place.
Never create a second task folder just to add or remove a penalty suffix.
After the rename, only one folder should remain for that task.

Examples:

- `tasks/react/_search-filter-users` → `tasks/react/_search-filter-users_*`
- `tasks/dsa/__group-and-sort-transactions_*` → `tasks/dsa/__group-and-sort-transactions_**`
- `tasks/debugging/___fix-broken-widget_***` → `tasks/debugging/___fix-broken-widget_**` if the review is updated and the solution improved

If the current folder is `tasks/<category>/<name>` and the penalty becomes `_*`,
the result must be the same folder renamed to `tasks/<category>/<name>_*`,
not a newly created sibling folder.

---

## Important behavior

When reviewing:

1. inspect the current task files
2. evaluate the solution based on the actual task
3. create or update `review.md`
4. determine the correct penalty level from the review
5. rename the existing task folder in place to match the penalty level
6. update `/gpt/gpt_topics.md` only if the task introduced something meaningfully new

---

## Penalty decision guidance

Use penalty markers conservatively, but apply them when the review clearly shows real task failure.

Typical guidance:

- no marker → the task is correct, solid, and meets requirements
- `_*` → one important requirement or behavior is still wrong or missing
- `_**` → multiple important requirements are wrong or missing, or the solution is significantly incomplete
- `_***` → the core logic is broken or the task is largely unsolved

Do not add penalty markers for:

- style-only improvements
- optional refactors
- minor naming suggestions
- "stronger candidate" polish that does not affect correctness

---

## Review-to-penalty mapping

Use the language in the review as a direct signal for folder penalties.

Examples:

- "one core requirement is still missing" → at least `_*`
- "one important requirement or behavior is still wrong or missing" → at least `_*`
- "partial fix" → at least `_*`
- "incomplete solution" → at least `_*`
- "multiple important requirements are wrong or missing" → at least `_**`
- "core logic is broken" → at least `_***`
- "solid solution" or "meets requirements" → no penalty

Never assign a penalty based mainly on:

- typo-level issues
- summary wording that does not affect core behavior
- small presentation mismatches
- optional refactor suggestions

A penalty requires a real gap in required behavior, correctness, or important edge-case handling.

When in doubt:

- prefer no penalty for style-only improvements
- apply a penalty when a required behavior is still missing or wrong

---

## Goal

The review should help the candidate understand, in priority order:

- what was good
- what was weak
- what a stronger interview answer or implementation would look like
- whether the task was actually solved or only partially solved
