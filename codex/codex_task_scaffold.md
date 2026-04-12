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

`tasks/<category>/<slug>/`

Examples:

- `tasks/react/search-filter-users/`
- `tasks/dsa/group-and-sort-transactions/`
- `tasks/debugging/fix-broken-widget/`

Use the category from the task brief.
Use a stable slug for the folder name.
Do not create tasks directly under `tasks/` without a category folder.

---

## Default files

### For React / UI / frontend component tasks

Create:

- `task.md`
- `prompt.md`
- `main.tsx`
- `main.scaffold.tsx` (exact snapshot of the initial `main.tsx` scaffold)

### For non-React coding tasks

Create:

- `task.md`
- `prompt.md`
- `main.ts`
- `main.scaffold.ts` (exact snapshot of the initial `main.ts` scaffold)

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

- frontmatter metadata for:
  - title
  - slug
  - category
  - type
  - difficulty
  - penalty
  - preview information when relevant
- focus areas
- task description
- requirements
- optional edge cases

Keep it short and readable.

Do not include the solution in `task.md`.
Do not duplicate `category`, `type`, or `difficulty` in the markdown body when they already exist in frontmatter.

---

## prompt.md

`prompt.md` should contain the exact task brief content starting from the line that begins with `Title`.

This means `prompt.md` should preserve the task text 1:1 from the provided task brief, including sections such as:

- Title
- Category
- Type
- Difficulty
- Focus areas
- Task
- Requirements
- Optional edge cases
- What Codex should scaffold
- any other task sections that appear after `Title`

Do not rewrite, summarize, clean up, or transform that content.

If the user message includes any leading instruction text before the task brief, for example:

- `create another task:`
- `scaffold this task:`
- `add a new task:`

then ignore everything before the line that begins with `Title`.

The purpose of `prompt.md` is to preserve the exact task brief content from `Title` onward.

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
- for non-React `main.ts` tasks with sample data, a tiny direct-run block guarded by `if (import.meta.main)` so the file can be executed with `tsx` without extra imports

### Not allowed:

- full implementation of the task
- completed filtering / sorting / async logic
- completed business logic
- full polished UI
- solving the interview problem

After creating `main.tsx` or `main.ts`, create an exact snapshot copy as `main.scaffold.tsx` or `main.scaffold.ts`.
This snapshot is used to restore the original scaffold later.

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
- `prompt.md`
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
- if sample input is included, prefer making the scaffold directly runnable with:
  ```ts
  if (import.meta.main) {
    console.log(exampleFunction(sampleInput));
  }
  ```
- keep the direct-run block tiny and generic; it should only help inspect output, not solve the task

---

## Important behavior

When given a task brief:

1. read the category and difficulty from the task brief
2. create the task folder under `tasks/<category>/<slug>/`
3. choose the smallest useful scaffold
4. create `task.md` with frontmatter metadata and the structured task brief body
5. create `prompt.md` by copying the exact task brief content starting from the line that begins with `Title`
6. create only the necessary starter code files
7. add TODO comments where the main logic belongs
8. run `npm run finalize:tasks` and fix any reported task-structure or metadata issues
9. stop before solving the task

`npm run finalize:tasks` is mandatory.  
Do not ask the user to run validation or metadata commands manually.

---

## Folder naming summary

Use this naming rule for each new task folder:

`tasks/<category>/<slug>/`

Examples:

- `tasks/react/search-filter-users/`
- `tasks/dsa/group-and-sort-transactions/`
- `tasks/debugging/fix-broken-widget/`

---

## Goal

The scaffold should help the candidate start quickly,
but it must still leave the real interview work for the candidate.
