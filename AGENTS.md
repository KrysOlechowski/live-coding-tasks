# AGENTS.md

## Purpose

This repository is used for live-coding interview practice.

## General rules

- Keep all task scaffolding lightweight and interview-appropriate.
- Do not solve the full task unless explicitly asked.
- Keep task size realistic for a live coding interview.
- Prefer practical frontend tasks by default, but allow broader coding tasks such as data structures, algorithms, debugging, refactoring, and data transformation when appropriate.

## Workspace boundaries

### `/tasks`

- Use `/tasks` as the main workspace for live-coding tasks.
- Create new task folders inside `/tasks/<category>/<difficulty-prefix><task-name>/`.
- Use the category and difficulty from the task brief when creating the task folder.
- Keep all task-related files there, such as `task.md`, `main.tsx` or `main.ts`, and `review.md`.

### `/codex`

- Use `/codex` for Codex-specific workflow documents and instructions.
- Read these files when scaffolding or reviewing tasks.
- Do not create task solutions inside `/codex`.

### `/gpt`

- The `/gpt` folder is used for ChatGPT-side workflow and topic tracking.
- Do not use `/gpt` as a task workspace.
- Do not create task scaffolds, solution files, or review files inside `/gpt`.
- Only read or update `/gpt/gpt_topics.md` when topic tracking is needed.
- Treat `/gpt` as supporting context, not as the place where implementation work happens.

## Task scaffolding

- When given a task brief, create the smallest useful scaffold.
- Create only the files that are clearly needed for the task.
- Default files:
  - `task.md`
  - `main.tsx` for React tasks
  - `main.ts` for non-React tasks
- Only create extra files like `types.ts`, `mockData.ts`, or `api.ts` when they are clearly necessary.
- Add TODO comments where the core interview logic should be implemented.
- Use difficulty-based folder prefixes: `_` = easy, `__` = medium, `___` = hard.
- Do not implement the full solution during scaffolding.

## Task review

- When asked to review a finished task, behave like a realistic technical interviewer.
- Evaluate:
  - correctness
  - readability
  - maintainability
  - edge cases
  - React / TypeScript quality when relevant
  - general coding quality for non-frontend tasks
- Keep review practical and concise.
- After writing or updating `review.md`, renaming the task folder to match the penalty level is required, not optional.
- If one important requirement or behavior is still missing, rename the task folder with `_*`.
- If multiple important requirements are still wrong or missing, rename the task folder with `_**`.
- If the core logic is broken or the task is largely unsolved, rename the task folder with `_***`.
- If the solution is solid and meets requirements, keep no penalty suffix.

## Task folder renaming

- When a review changes the penalty level, rename the existing task folder in place.
- Never create a second task folder just to add or remove a penalty suffix.
- There must be only one task folder for a given task at a time.
- If a folder with the updated penalty suffix is needed, move/rename the current folder instead of copying or recreating it.

## Topic tracking

- When a task is completed or reviewed, update `/gpt/gpt_topics.md` with the main covered topics if they are not already listed.
