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

## Task location

Create each new task inside:

`tasks/<task-name>/`

Use short, readable kebab-case names for task folders.

Examples:

- `tasks/search-filter-users/`
- `tasks/async-account-widget/`
- `tasks/group-transactions/`

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

1. choose the smallest useful scaffold
2. create only the necessary files
3. add TODO comments where the main logic belongs
4. stop before solving the task

If the task brief is ambiguous, prefer the lighter scaffold.

---

## Goal

The scaffold should help the candidate start quickly,
but it must still leave the real interview work for the candidate.
