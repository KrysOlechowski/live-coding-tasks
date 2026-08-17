# Import Task

Use this skill when the user provides a complete Task Package created in ChatGPT or explicitly asks to import one.

## Read first

- `codex/codex_import_task.md` — source of truth
- `docs/data-contracts.md`
- `TASK_TAXONOMY.md`
- `data/topic-catalog.json`
- the provided Task Package

## Checklist

- Validate the whole package before writing anything.
- Stop with concrete errors instead of creating a partial task.
- Do not silently change candidate requirements or follow-ups.
- Continue into `agent-skills/scaffold-task.md` when valid.
- Run `npm run finalize:tasks`.
