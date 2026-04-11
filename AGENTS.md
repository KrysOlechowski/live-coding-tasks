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
- Create new task folders inside `/tasks/<category>/<slug>/`.
- Use the category from the task brief when creating the task folder.
- Use a stable slug for the folder name.
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
- Store task metadata in `task.md` frontmatter instead of encoding it in the folder name.
- Do not implement the full solution during scaffolding.
- After creating or renaming task folders/files, run `npm run sync:metadata`.

## Task review

- When asked to review a finished task, behave like a realistic technical interviewer.
- Treat messages like `review my solution`, `review this task`, `do a review`, or `zrób review` as a request for a full repository review workflow.
- A full review workflow means: inspect the task files, create/update `review.md`, update `penalty` in `task.md` frontmatter when needed, and run `npm run sync:metadata`.
- Do not stop at chat-only feedback when the user asks for review.
- Treat messages like `give me a little hint`, `daj hint`, or `explain this part` as discussion/help requests, not as review workflow requests.
- Evaluate:
  - correctness
  - readability
  - maintainability
  - edge cases
  - React / TypeScript quality when relevant
  - general coding quality for non-frontend tasks
- Keep review practical and concise.
- `review.md` should represent only the latest review for the task.
- If the review needs to reflect task quality, update the `penalty` field in `task.md` frontmatter instead of renaming the folder.
- After review updates (including `gpt_topics.md`), run `npm run sync:metadata`.
- For each important issue in review findings, include a concrete file reference in `path:line` form.
- In `Missed edge cases`, list only true edge cases beyond baseline requirements. Do not repeat the main missing requirement from `Requirement check`.

## Task folder renaming

- The task folder name should stay stable after creation.
- Never rename a task folder just to reflect difficulty or review outcome.
- There must be only one task folder for a given task at a time.
- If a task folder ever needs to be renamed, move/rename the current folder instead of copying or recreating it.

## Topic tracking

- When a task is completed or reviewed, update `/gpt/gpt_topics.md` with the main covered topics if they are not already listed.
