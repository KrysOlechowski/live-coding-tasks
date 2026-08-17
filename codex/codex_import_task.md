# Codex Import Task Workflow

## Purpose

Import a Task Package v1 designed in ChatGPT and send it through the same scaffold workflow as a Codex-created task.

## Read first

- the provided Task Package
- `docs/data-contracts.md`
- `TASK_TAXONOMY.md`
- `data/topic-catalog.json`
- `data/task-index.json`
- `codex/codex_task_scaffold.md`

## Validation

Check before writing files:

- outer `schemaVersion` is 1;
- slug is lowercase kebab-case and globally unique;
- exactly one complete `task.md` and one complete `interviewer.md` block exist;
- task metadata uses the repository taxonomy;
- preview metadata is present only when a visible UI preview is required;
- interviewer topic IDs exist in the catalog;
- follow-up count, numbering, headings, and declared topics are consistent;
- difficulty calibration matches `task.md` and follows the repository rubric;
- every stage contains zero to two structured start/checkpoint questions, with a reason when none are useful;
- every question uses a declared topic, has an educational purpose, and start questions do not reveal the intended solution;
- candidate-visible text contains no hidden follow-up, solution, code, pseudocode, or implementation hint;
- task size is realistic for a live-coding session.

## Workflow

1. Report concrete validation failures and stop without creating a partial task.
2. If valid, materialize `task.md` and `interviewer.md` without changing their meaning.
3. Continue into `codex/codex_task_scaffold.md` to create `session.json`, code, scaffold snapshots, and `scaffold.json`.
4. Run `npm run finalize:tasks` and fix all contract failures.

## Hard rules

- Do not silently rewrite requirements or follow-ups to make an invalid package pass.
- Whitespace, quoting, and harmless Markdown normalization are allowed.
- Do not create a second import-specific task format or persistence path.
- Do not solve the task.
