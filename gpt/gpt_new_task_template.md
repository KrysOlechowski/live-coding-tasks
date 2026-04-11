# GPT New Task Template

## Purpose

This template is used in ChatGPT to generate new live-coding interview tasks for practice.

The tasks should be tailored to:

- frontend interview preparation
- realistic live coding practice
- the current recruitment context
- topics that have not already been covered in `gpt_topics.md`

The goal is not to generate random interview puzzles.
The goal is to generate realistic tasks for interview preparation, primarily frontend-focused, but sometimes also covering broader coding skills such as data structures, algorithms, debugging, refactoring, or data transformation.

## Category rules

Each task must include a proposed category.

Use one of the existing categories when possible.

Current categories:

- react
- typescript
- dsa
- debugging
- refactor
- async
- testing
- architecture
- api-integration
- performance

If no existing category fits well:

- do not silently invent a new category
- propose a new category explicitly
- explain briefly why the current categories are not a good fit
- ask whether the new category should be added before using it

## Output format

Use this structure when generating a new task:

### Title

[task title]

### Category

[one existing category, or a proposed new category if needed]

### Type

[from scratch / bug fix / refactor / async / data transformation / UI state / debugging]

### Difficulty

[easy / medium / hard]

### Focus areas

- ...
- ...
- ...

### Task

[short task description]

### Expected input / output

- input:
- output:
- any ordering / normalization / immutability expectations:

### Requirements

- ...
- ...
- ...

### Optional edge cases

- ...
- ...
- ...

### Out of scope

- ...
- ...

### What Codex should scaffold

- create only the minimal files needed
- do not solve the main task
- add TODO comments for the main logic
- default expectation: `task.md` and `main.tsx` or `main.ts`
- place the task under `tasks/<category>/<slug>/` using a stable slug
- use `task.md` frontmatter metadata with at least:
  - `title`
  - `slug`
  - `category`
  - `type`
  - `difficulty`
  - `penalty` (default `0`)
  - `hasPreview` (`true` or `false`)
  - `previewEntry` only when `hasPreview` is `true`
- keep `category`, `type`, and `difficulty` in frontmatter, not duplicated in task body
- if the task needs a UI/runtime preview, set `hasPreview: true` and `previewEntry: main.tsx`
- if no UI preview is needed, set `hasPreview: false`
- keep `review.md` as the latest review only (absence of `review.md` means not started yet)
- create extra files only if clearly needed

## Important rules

- Do not repeat tasks that are too similar to topics already listed in `gpt_topics.md`
- Always propose the most suitable existing category before considering a new one
- Prefer practical frontend tasks by default, but allow broader coding tasks such as data structures, algorithms, debugging, or data transformation when useful
- Keep tasks suitable for live coding
- Keep tasks realistic and not too large
- Avoid giving the solution unless explicitly requested
- Keep output as a task brief artifact only, ready to hand off to Codex
- Make the brief self-contained. The candidate should not need to infer missing business rules from surrounding context.
- If a behavior matters for correctness, state it explicitly in `Requirements` instead of implying it indirectly.
- Do not hide required behavior inside `Optional edge cases`.
- Keep `Requirements` behavior-first and testable. Prefer concrete constraints over vague wording such as `handle properly` or `make it robust`.
- Keep `Focus areas` narrow and interview-relevant. Prefer 2 to 4 focus areas.
- For React / UI tasks, describe visible user behavior and important UI states explicitly.
- For TypeScript / data tasks, specify the expected output shape clearly and state ordering, normalization, immutability, or invalid-input expectations when relevant.
