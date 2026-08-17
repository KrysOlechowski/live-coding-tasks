# Scaffold Task

Use this skill automatically after `create-task` or `import-task`, or when the user asks to scaffold files from a complete Task Package v1. The user does not need to name the skill.

## Read first

- `TASK_TAXONOMY.md`
- `docs/data-contracts.md`
- `codex/codex_task_scaffold.md` — source of truth for the full workflow
- `data/topic-catalog.json`
- the Task Package's `task.md` and `interviewer.md`

## Checklist

- Do not solve the task.
- Create `tasks/<category>/<slug>/`; avoid unrelated task folders.
- Materialize candidate-safe `task.md` and interviewer-only `interviewer.md`.
- Initialize `session.json` with one Core stage and the planned locked follow-ups.
- Use `.tsx` for React/UI tasks and `.ts` for non-UI tasks.
- Create `main.scaffold.*` as real starting code, then copy it exactly to `main.*`.
- Add preview metadata only for UI/preview tasks, following `codex/codex_task_scaffold.md`.
- Use scaffold-only suppressions only when that workflow permits and requires them.
- Include a useful local run/debug command in the final response when applicable.
- Run `npm run finalize:tasks` and fix failures before finishing.

## Final response

Include:

- the created task folder
- created or updated files
- planned follow-up count without revealing follow-up content
- whether preview metadata was added
- a useful local run/debug command when applicable
- commands that passed
