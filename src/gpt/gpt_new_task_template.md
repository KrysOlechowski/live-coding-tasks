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

## Output format

Use this structure when generating a new task:

### Title

[task title]

### Type

[from scratch / bug fix / refactor / async / data transformation / UI state / debugging / algorithms / data structures]

### Difficulty

[easy / medium]

### Focus areas

- ...
- ...
- ...

### Task

[short task description]

### Requirements

- ...
- ...
- ...

### Optional edge cases

- ...
- ...
- ...

### What Codex should scaffold

- create only the minimal files needed
- do not solve the main task
- add TODO comments for the main logic
- default expectation: `task.md` and `main.tsx` or `main.ts`
- create extra files only if clearly needed

## Important rules

- Do not repeat tasks that are too similar to topics already listed in `gpt_topics.md`
- Prefer practical frontend tasks by default, but allow broader coding tasks such as data structures, algorithms, debugging, or data transformation when useful
- Keep tasks suitable for live coding
- Keep tasks realistic and not too large
- Avoid giving the solution unless explicitly requested
