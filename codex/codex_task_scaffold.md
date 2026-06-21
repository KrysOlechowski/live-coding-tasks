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

## Taxonomy Handling

Each task brief should include `category`, `taskType`, and `difficulty`.

Use `category` to decide where the task folder should be created.
Use `category + taskType` to decide the scaffold shape.

Do not guess a different category if one is already provided in the task brief.
If `category`, `taskType`, or `difficulty` is missing, ask for clarification instead of choosing silently.

Follow `/TASK_TAXONOMY.md`.

Allowed categories:

- `react`
- `typescript`
- `data-transformation`
- `algorithms`
- `async`
- `api-integration`
- `testing`
- `performance`

Do not use `debugging` or `refactor` as categories. Represent those through `taskType`.

## Task location

Create each new task inside:

`tasks/<category>/<slug>/`

Examples:

- `tasks/react/search-filter-users/`
- `tasks/data-transformation/normalize-orders/`
- `tasks/async/fix-stale-search-results/`

Use the category from the task brief.
Use a stable slug for the folder name.
Do not create tasks directly under `tasks/` without a category folder.

---

## Default files

### For React / UI / frontend component tasks

Create:

- `task.md`
- `main.tsx`
- `main.scaffold.tsx` (exact snapshot of the initial `main.tsx` scaffold)

If the React scaffold is intended to be rendered by the Next.js task preview app, start the preview entry file with:

```tsx
"use client";
```

Treat this as the default for React preview entries, even for small scaffolds. This avoids Next.js Server Component errors when the scaffold uses hooks or event handlers.

If a task involves visible UI behavior, user interactions, component state, loading/error/success states, or a widget-style interface, scaffold it as a React/TSX task and add preview metadata, even when its category is `async`, `api-integration`, `performance`, or another non-React category.
Do not add preview metadata for pure utility, algorithm, TypeScript-only, or other non-UI tasks.

### For non-React coding tasks

Create:

- `task.md`
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

- frontmatter metadata for exactly these workflow fields:
  - title
  - category
  - taskType
  - difficulty
  - hasPreview and previewEntry when the task has a runtime UI preview
  - primarySkill
  - secondarySkill
  - problemShape
  - interviewFocus
  - reviewFocus
  - tags
- context
- goal
- requirements
- constraints when useful
- non-goals when useful
- acceptance criteria

Keep it short and readable.

Do not include the solution in `task.md`.
Do not duplicate `category`, `taskType`, or `difficulty` in the markdown body when they already exist in frontmatter.

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
- for non-React `main.ts` tasks with sample data, a tiny direct-run `console.log(...)` at file scope so the file can be executed with `tsx` without extra imports

### Not allowed:

- full implementation of the task
- completed filtering / sorting / async logic
- completed business logic
- full polished UI
- solving the interview problem

After creating `main.tsx` or `main.ts`, create an exact snapshot copy as `main.scaffold.tsx` or `main.scaffold.ts`.
This snapshot is used to restore the original scaffold later.

## taskType Guidance

- `build-from-requirements`: scaffold empty or partial behavior from the task brief, with TODO comments for core logic.
- `fix-bug`: scaffold intentionally broken code that matches the task brief and gives the candidate something concrete to fix.
- `refactor-existing-code`: scaffold working but intentionally messy, duplicated, unsafe, or hard-to-maintain code.
- `complete-partial-implementation`: scaffold missing implementation sections clearly, without solving them.
- `write-tests`: scaffold behavior or weak/incomplete tests depending on the brief. Create the minimal test file required by the repo test setup, if one exists. Do not introduce a new test framework. If there is no existing test setup, keep the scaffold minimal and mention the limitation in the final summary.
- `model-types`: scaffold type definitions or signatures that leave the modeling work to the candidate.
- `handle-edge-cases`: scaffold baseline structure while leaving edge-case handling incomplete.
- `optimize-performance`: scaffold behavior that works but has avoidable repeated work, rendering cost, or complexity.
- `review-and-improve`: scaffold an implementation with targeted issues to inspect and improve.

---

## TODO comments

Use TODO comments to mark where the candidate should implement the core logic.
For `fix-bug`, `refactor-existing-code`, `optimize-performance`, and `review-and-improve` tasks, avoid TODO comments that reveal the exact issue. The scaffold may include natural comments, but it should not point directly to the bug, refactor target, or performance problem.

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
- if the task has a runtime preview, default the preview entry to a Client Component with `"use client"` at the top of the file

---

## Non-React task guidance

For algorithm / data transformation / utility tasks:

- prefer a single `main.ts`
- add minimal sample input only if needed
- keep the file focused on the problem
- if sample input is included, prefer making the scaffold directly runnable with:
  ```ts
  console.log(exampleFunction(sampleInput));
  ```
- keep the direct-run call tiny and generic; it should only help inspect output, not solve the task

---

## Important behavior

When given a task brief:

1. read `category`, `taskType`, and `difficulty` from the task brief
2. create the task folder under `tasks/<category>/<slug>/`
3. choose the smallest useful scaffold
4. create `task.md` with frontmatter metadata and the structured task brief body
5. create only the necessary starter code files
6. add TODO comments where the main logic belongs
7. preserve the distinction between `main.scaffold.*` and `main.*`
8. update `/gpt/gpt_topics.md` by adding one row to the Task History table
9. run `npm run finalize:tasks` and fix any reported task-structure or metadata issues
10. stop before solving the task

The `gpt_topics.md` row should use:

- `slug`: task folder name
- `category`: from task frontmatter
- `taskType`: from task frontmatter
- `difficulty`: from task frontmatter
- `primarySkill`: from task frontmatter
- `problemShape`: from task frontmatter
- `status`: `generated`
- `notes`: short useful note for repetition avoidance, or `-` if none

`npm run finalize:tasks` is mandatory.  
Do not ask the user to run validation or metadata commands manually.

---

## Folder naming summary

Use this naming rule for each new task folder:

`tasks/<category>/<slug>/`

Examples:

- `tasks/react/search-filter-users/`
- `tasks/data-transformation/normalize-orders/`
- `tasks/async/fix-stale-search-results/`

---

## Goal

The scaffold should help the candidate start quickly,
but it must still leave the real interview work for the candidate.
