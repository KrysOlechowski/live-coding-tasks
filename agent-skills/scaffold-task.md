# Scaffold Task

Use this skill automatically when the user asks to scaffold, create, set up, or generate files for a new task from a provided `task.md` or full task brief. The user does not need to name the skill.

## Read first

- `TASK_TAXONOMY.md`
- `codex/codex_task_scaffold.md` — source of truth for the full workflow
- `gpt/gpt_topics.md`
- the provided `task.md` or task brief

## Checklist

- Do not solve the task.
- Create `tasks/<category>/<slug>/`; avoid unrelated task folders.
- Use `.tsx` for React/UI tasks and `.ts` for non-UI tasks.
- Create `main.scaffold.*` as real starting code, then copy it exactly to `main.*`.
- Add preview metadata only for UI/preview tasks, following `codex/codex_task_scaffold.md`.
- Use scaffold-only suppressions only when that workflow permits and requires them.
- Update `gpt/gpt_topics.md`.
- Include a useful local run/debug command in the final response when applicable.
- Run `npm run finalize:tasks` and fix failures before finishing.

## Final response

Include:

- the created task folder
- created or updated files
- whether preview metadata was added
- a useful local run/debug command when applicable
- commands that passed
