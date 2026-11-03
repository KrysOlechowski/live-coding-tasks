# AGENTS.md

This repository is for live-coding interview practice. Keep exercises small and practical. Do not solve candidate tasks unless explicitly asked. Write task artifacts, starter comments, and UI copy in English; chat may be Polish.

## Workflow routing

Read only the matching skill and its linked contract:

- Ideas, recommendations, or choosing an exercise: `agent-skills/propose-task/SKILL.md`.
- Creating an exercise, scaffolding, or importing a supplied brief/Task Package: `agent-skills/create-task/SKILL.md`.
- Reviewing a candidate solution: `agent-skills/review-task/SKILL.md`.
- Ordinary hints and explanations are conversation, with no session or coaching workflow and no tracking writes.
- A request to create a task authorizes selecting and scaffolding it in one turn. A request only for proposals stops at proposals.

## Repository boundaries

- Store tasks in `tasks/<category>/<stable-slug>/`. Use `category` for domain and `taskType` for activity, following `TASK_TAXONOMY.md`.
- `task.md` is the candidate brief; `interviewer.md` holds concise evaluation criteria. Keep interviewer content out of the UI and creation summary.
- `review.md` is the latest review and sole source of Mastery and topic outcomes. No session files, question logs, checkpoints, or coaching telemetry.
- `scaffold.json` lists every candidate-editable TS/TSX file, immutable snapshot, and SHA-256. Use `npm run scaffold:init -- <task-path> [working-files...]` to create it; use `npm run restore:scaffold -- <task-path>` to reset.
- Do not rename task folders to reflect difficulty or review results.
- `data/topic-catalog.json` is authored; it is currently a temporary seed, not a frequency ranking. Custom topics may be added for user-requested exercises.
- `data/practice-index.json` and `src/lib/generated-task-preview-manifest.tsx` are generated. Never edit them manually.
- Run `npm run finalize:tasks` after creating, reviewing, deleting, renaming, or resetting tasks, and fix failures before finishing. Do not ask the user to run it.
- Use `npm run task:design-context` for selection. Do not read every task, review, or the full generated index into model context; inspect related briefs only when needed.
- Repository workflow changes must update the relevant contract and behavior tests. `npm run check` runs finalization, tests, lint, and build, with one synchronization.
