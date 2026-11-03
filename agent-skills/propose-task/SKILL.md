---
name: propose-task
description: Recommend or brainstorm interview exercises from practice priorities and coverage. Use for choosing tasks; do not create files unless creation is requested.
---

Run `npm run task:design-context -- [--category <domain>] [--difficulty <level>] [--topic <id>]`.
Read `codex/codex_create_task.md` for selection rules. Read `TASK_TAXONOMY.md` only if taxonomy or difficulty needs clarification.
Return the requested number of concise ideas with domain, taskType, difficulty, approximate time, target skill, and why it is useful. Do not expose solution strategies.
For a promising topic/shape, rerun context with `--topic` and/or `--shape`; inspect only relevant earlier briefs when similarity remains unclear.
Respect explicit constraints over automatic priorities. Do not create task files for an ideas-only request.
