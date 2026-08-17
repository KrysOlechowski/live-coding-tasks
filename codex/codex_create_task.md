# Codex Create Task Workflow

## Purpose

Design and scaffold one new Live Coding 2.0 task using repository learning data. Codex is the default task designer; ChatGPT is optional.

## Read first

- `TASK_TAXONOMY.md`
- `docs/data-contracts.md`
- `data/topic-catalog.json`
- `data/task-index.json`
- `data/learning-summary.json`
- `codex/codex_task_scaffold.md`

## Workflow

1. Run `npm run generate:task-data` if generated learning data may be stale.
2. Read current topics to revisit, assigned coverage, reviewed coverage, and recent problem shapes.
3. Apply optional user constraints such as difficulty, category, focus, or exclusions.
4. Choose one interview-sized learning target. Do not treat an assigned or in-progress topic as mastered.
5. Create a valid Task Package v1 with a candidate-safe `task.md` and a separate `interviewer.md`.
6. Use only canonical topic IDs from `data/topic-catalog.json`.
7. Check that the brief does not reveal hidden follow-ups or a solution strategy.
8. Continue directly into the scaffold workflow; do not require the user to copy the package back to Codex.

## Selection rules

- Prefer a current medium/high repetition need when it can be tested through a meaningfully different scenario.
- Otherwise prefer under-practiced categories, task types, problem shapes, and topics.
- Avoid repeating only the surface story while testing the same mental pattern.
- Keep one or two primary skills and zero to three useful follow-ups.
- Follow explicit user constraints over automatic selection preferences.

## Hard rules

- Do not solve the task.
- Do not place hidden follow-ups in `task.md` or the final chat summary.
- Do not invent topic aliases when an existing canonical ID matches.
- Do not edit generated JSON or ChatGPT context manually.
- Run the complete scaffold finalization before finishing.
