# Create Task

Use this skill when the user asks Codex to invent, design, or create a new live-coding task without providing a complete Task Package.

## Read first

- `codex/codex_create_task.md` — source of truth
- `TASK_TAXONOMY.md`
- `docs/data-contracts.md`
- `data/learning-summary.json`
- `data/task-index.json`
- `data/topic-catalog.json`

## Checklist

- Apply user constraints and current learning priorities.
- Create one valid Task Package v1.
- Keep the candidate brief free of follow-ups and solution hints.
- Continue into `agent-skills/scaffold-task.md` without asking for a manual copy step.
- Do not reveal interviewer-only content in the final response.
- Run `npm run finalize:tasks`.
