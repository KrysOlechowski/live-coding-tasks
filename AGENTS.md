# AGENTS.md

## Purpose

This repository is used for live-coding interview practice.

## General rules

- Keep all task scaffolding lightweight and interview-appropriate.
- Do not solve the full task unless explicitly asked.
- Keep task size realistic for a live coding interview.
- Prefer practical frontend tasks by default, but allow broader coding tasks such as algorithms, async, API integration, testing, performance, TypeScript modeling, and data transformation when appropriate.
- Follow the taxonomy in `/TASK_TAXONOMY.md`.
- Use `category` for technical domain and `taskType` for candidate activity or interview mode.
- Do not use `debugging` or `refactor` as categories; use taskType values such as `fix-bug`, `refactor-existing-code`, or `review-and-improve`.

## Agent skills

- Use `/agent-skills/create-task.md` when the user asks Codex to invent or design a new task without providing a complete Task Package.
- Use `/agent-skills/import-task.md` when the user provides a Task Package created in ChatGPT or explicitly asks to import one.
- Use `/agent-skills/scaffold-task.md` after task creation/import or when the user asks to scaffold a complete Task Package.
- Use `/agent-skills/interview-session.md` for `$session`, `$interview-session`, starting/resuming an attempt, completing a stage, revealing a follow-up, or ending a session.
- Use `/agent-skills/review-task.md` automatically when the user asks to review, check, or evaluate a completed solution. The user does not need to name this skill.
- Use `/agent-skills/interview-coach.md` when a request starts with `$coach` or `$interview-coach`, or clearly asks for coaching or hints during active solving.
- Do not use a skill file unless the request matches one of these workflows.
- Task ideas may be designed by Codex directly or imported from ChatGPT. Both paths use Task Package v1 and the same scaffold/session/review flow.
- Task reset uses `npm run restore:scaffold -- tasks/<category>/<slug>` and regenerates derived data automatically.

## Workspace boundaries

### `/tasks`

- Use `/tasks` as the main workspace for live-coding tasks.
- Create new task folders inside `/tasks/<category>/<slug>/`.
- Use the category from the task brief when creating the task folder.
- Use a stable slug for the folder name.
- Keep all task-related files there, including `task.md`, `interviewer.md`, `session.json`, `main.tsx` or `main.ts`, and `review.md`.

### `/codex`

- Use `/codex` for Codex-specific workflow documents and instructions.
- Read these files when scaffolding or reviewing tasks.
- Do not create task solutions inside `/codex`.

### `/data` and `/chatgpt`

- `/data/topic-catalog.json` is authored canonical topic data.
- `/data/task-index.json` and `/data/learning-summary.json` are generated; never edit them manually.
- `/chatgpt/task-designer-context.md` is generated and may be attached to ChatGPT for optional task design.
- Do not create task scaffolds, solutions, or reviews in `/data`, `/chatgpt`, or legacy `/gpt`.
- Treat `/gpt` as migration-only compatibility data until it is removed deliberately.

## Task scaffolding

- Once a Task Package is created or imported, use `/agent-skills/scaffold-task.md`, then follow `/codex/codex_task_scaffold.md`.
- When given a validated Task Package, create the smallest useful scaffold.
- Create only the files that are clearly needed for the task.
- Default files:
  - `task.md`
  - `interviewer.md`
  - `session.json`
  - `main.tsx` for React tasks
  - `main.ts` for non-React tasks
- Always keep a scaffold snapshot copy:
  - `main.scaffold.tsx` for React tasks
  - `main.scaffold.ts` for non-React tasks
- `main.scaffold.*` must be an exact copy of the initial scaffolded `main.*` file.
- Only create extra files like `types.ts`, `mockData.ts`, or `api.ts` when they are clearly necessary.
- Add TODO comments where the core interview logic should be implemented.
- For `fix-bug`, `refactor-existing-code`, `optimize-performance`, and `review-and-improve`, do not add TODO comments that reveal the exact issue.
- Store task metadata in `task.md` frontmatter instead of encoding it in the folder name.
- Task frontmatter should use the workflow fields defined in `/TASK_TAXONOMY.md`.
- Do not implement the full solution during scaffolding.
- Use `category + taskType` to decide scaffold shape.
- For `fix-bug`, scaffold intentionally broken code matching the brief.
- For `refactor-existing-code`, scaffold working but intentionally messy, duplicated, unsafe, or hard-to-maintain code.
- For `complete-partial-implementation`, scaffold clear missing implementation sections without solving them.
- For `write-tests`, scaffold behavior or weak/incomplete tests depending on the brief.
- Scaffold is complete only when `npm run finalize:tasks` passes.
- After creating or renaming task folders/files, Codex must run `npm run finalize:tasks` automatically before finishing the response.
- Do not ask the user to run metadata/validation commands manually.

## Task review

- For full review requests, use `/agent-skills/review-task.md` first, then follow `/codex/codex_review_workflow.md`.
- When asked to review a finished task, behave like a realistic technical interviewer.
- Read `/codex/codex_review_workflow.md` when reviewing tasks. Calibrate review severity using the task requirements, `reviewFocus`, and the rules in that workflow.
- Treat messages like `review my solution`, `review this task`, `do a review`, or `zrób review` as a request for a full repository review workflow.
- A full review workflow means: inspect the task files, create/update `review.md`, update existing task tracking if the repo has a mechanism for it, and run `npm run finalize:tasks`.
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
- Prefer high-signal findings over minor polish.
- For each major issue, explain both the broken requirement and the implementation detail that causes it when both are visible.
- Do not explain junior-level basics unless they are directly relevant to a bug or missing requirement.
- Keep issue explanations short and specific to the task.
- Include one short learning takeaway and one concrete next step in `review.md`.
- Include a Mastery rating in `review.md`, inferred from the task requirements, `reviewFocus`, and highest-signal findings.
- Treat Mastery as honest positive progress feedback. Do not use penalty stars or penalty scoring.
- Keep the top-line verdict in `Requirement check` consistent with the actual findings; do not mark the task as solved if the review still says an explicit requirement is unmet.
- `review.md` should represent only the latest review for the task.
- A full final review requires the active session attempt to be `ready-for-review`. If a stage is unfinished, use the interview-session workflow first.
- Save compact structured review and topic signals in the active attempt in `session.json`.
- After review updates, Codex must run `npm run finalize:tasks` automatically before finishing the response.
- For each important issue in review findings, include a concrete file reference in `path:line` form.
- In `Missed edge cases`, list only true edge cases beyond baseline requirements. Do not repeat the main missing requirement from `Requirement check`.

## Task folder renaming

- The task folder name should stay stable after creation.
- Never rename a task folder just to reflect difficulty or review outcome.
- There must be only one task folder for a given task at a time.
- If a task folder ever needs to be renamed, move/rename the current folder instead of copying or recreating it.

## Learning tracking

- `interviewer.md` declares the canonical topics planned for the task.
- `session.json` stores checkpoints, material coaching events, attempts, and final topic signals.
- `npm run finalize:tasks` regenerates cross-task learning data and the optional ChatGPT context.
- Do not manually edit generated learning summaries.
