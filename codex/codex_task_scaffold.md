# Codex Task Scaffold Workflow

## Purpose

This document explains how Codex should scaffold new live-coding tasks in this repository.

The goal is to create a minimal, interview-appropriate starting point for a task without solving the core problem.

## Main rule

Create the smallest useful scaffold.

Do not overengineer the task structure.
Do not create unnecessary files.
Do not implement the full solution.

---

## Category handling

Each task brief should include a category.

Use that category to decide where the task folder should be created.

Do not guess a different category if one is already provided in the task brief.
If the category is missing, ask for clarification instead of choosing silently.

## Task location

Create each new task inside:

`tasks/<category>/<difficulty-prefix><task-name>/`

Examples:

- `tasks/react/_search-filter-users/`
- `tasks/dsa/__group-and-sort-transactions/`
- `tasks/debugging/___fix-broken-widget/`

Use the category from the task brief.
Use the difficulty prefix from the task brief.
Do not create tasks directly under `tasks/` without a category folder.

## Difficulty-based folder naming

Use the task difficulty to prefix the task folder name:

- `_` for `easy`
- `__` for `medium`
- `___` for `hard`

Examples:

- `tasks/react/_search-filter-users/`
- `tasks/dsa/__group-and-sort-transactions/`
- `tasks/debugging/___fix-broken-widget/`

Do not use any other prefix format.

If the task brief does not include difficulty, ask for clarification instead of guessing.

---

## Default files

### For React / UI / frontend component tasks

Create:

- `task.md`
- `main.tsx`

### For non-React coding tasks

Create:

- `task.md`
- `main.ts`

---

## Additional files

Only create extra files if they are clearly needed for the task.

Possible optional files:

- `types.ts`
- `mockData.ts`
- `api.ts`

Do **not** create these files by default.

Examples:

- create `mockData.ts` only if the task needs realistic input data
- create `api.ts` only if the task includes async fetching and a mock fetch function is useful
- create `types.ts` only if the task has enough types to justify separation

---

## task.md

`task.md` should contain:

- task title
- category
- type
- difficulty
- focus areas
- task description
- requirements
- optional edge cases

Keep it short and readable.

Do not include the solution in `task.md`.

---

## main.tsx / main.ts

Create only a minimal starter.

### Allowed:

- imports
- basic type definitions if needed
- empty function signatures
- minimal component skeleton
- TODO comments for the core logic
- minimal sample data only if clearly necessary
- a minimal export or render target if needed for the task to run

### Not allowed:

- full implementation of the task
- completed filtering / sorting / async logic
- completed business logic
- full polished UI
- solving the interview problem

---

## TODO comments

Use TODO comments to mark where the candidate should implement the core logic.

Examples:

- `// TODO: implement filtering logic`
- `// TODO: handle loading and error states`
- `// TODO: transform the input data`

---

## File naming

Prefer simple file names:

- `task.md`
- `main.tsx`
- `main.ts`
- `types.ts`
- `mockData.ts`
- `api.ts`

Do not invent extra naming conventions unless the task clearly requires it.

---

## React task guidance

For React tasks:

- keep the component small
- keep the starter minimal
- do not build extra structure unless needed
- do not add unnecessary styling
- do not introduce extra libraries unless explicitly requested

---

## Non-React task guidance

For algorithm / data transformation / utility tasks:

- prefer a single `main.ts`
- add minimal sample input only if needed
- keep the file focused on the problem

---

## Important behavior

When given a task brief:

1. read the category and difficulty from the task brief
2. create the task folder under `tasks/<category>/<difficulty-prefix><task-name>/`
3. choose the smallest useful scaffold
4. create only the necessary files
5. add TODO comments where the main logic belongs
6. stop before solving the task

---

## Folder naming summary

Use this naming rule for each new task folder:

`tasks/<category>/<difficulty-prefix><task-name>/`

Difficulty prefix mapping:

- `_` = easy
- `__` = medium
- `___` = hard

Examples:

- `tasks/react/_search-filter-users/`
- `tasks/dsa/__group-and-sort-transactions/`
- `tasks/debugging/___fix-broken-widget/`

---

## Goal

The scaffold should help the candidate start quickly,
but it must still leave the real interview work for the candidate.
