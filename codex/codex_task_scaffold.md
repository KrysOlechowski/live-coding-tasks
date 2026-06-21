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
- `main.scaffold.tsx` (restorable snapshot of the initial `main.tsx` scaffold)

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
- `main.scaffold.ts` (restorable snapshot of the initial `main.ts` scaffold)

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

After creating `main.tsx` or `main.ts`, create a snapshot copy as `main.scaffold.tsx` or `main.scaffold.ts`.
This snapshot is used to restore the original scaffold later.

## Scaffold snapshot diagnostics

- Keep scaffold snapshots as real, readable code. Do not comment out their contents just to silence diagnostics.
- Preserve the initial scaffold code unchanged, except for leading scaffold-only diagnostic suppressions when intentional task errors would otherwise create editor, lint, or build noise.
- Add suppressions only when needed and keep them as narrow as practical. Examples include `// @ts-nocheck` for intentional TypeScript errors in `.ts` or `.tsx` snapshots and narrowly scoped ESLint comments explicitly marked `scaffold-only`.
- Scaffold snapshots should not participate in normal task validation or project type-checking. If they currently do, fix the shared config or validation workflow instead of changing individual task logic.
- Do not add scaffold-only suppressions to working files by default.
- The restore workflow strips leading `// @ts-nocheck` directives and leading comments marked `scaffold-only`, so restored working files retain normal TypeScript and ESLint feedback. Normal comments, task hints, and TODOs remain intact.

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

### UI scaffold styling

- Prefer standard Tailwind utilities when a close built-in token exists.
- Avoid unnecessary arbitrary utilities such as `rounded-[2rem]`, `p-[16px]`, `mt-[24px]`, `text-[14px]`, and `bg-[#ffffff]`.
- Prefer built-in equivalents such as `rounded-4xl`, `p-4`, `mt-6`, `text-sm`, and `bg-white`.
- Use arbitrary values only when the exact custom value matters to the task, layout, or visual behavior.
- Before finishing a UI scaffold, scan changed UI files and replace obvious arbitrary utilities with built-in Tailwind utilities.

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
6. add TODO comments where appropriate, without revealing hidden bugs, refactor targets, or performance issues
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

## Final response after scaffolding

After scaffolding a new task, include a local run or debug command that points to the working file, not the scaffold snapshot.

For non-UI tasks, include this as the primary local run command:

`npx tsx --watch tasks/<category>/<slug>/main.ts`

If the working file is TSX, use `main.tsx` instead of `main.ts`.

For UI / preview tasks, include the preview app command first when applicable. You may also include an `npx tsx --watch ...` command only if the task file contains useful top-level examples, helper calls, or console-based checks.

Examples:

- `npx tsx --watch tasks/typescript/model-payment-status-safely/main.ts`
- `npx tsx --watch tasks/data-transformation/normalize-orders/main.ts`
- `npx tsx --watch tasks/async/fix-stale-account-lookup-results/main.tsx`

Do not point the run command to `main.scaffold.ts` or `main.scaffold.tsx`.
Do not invent a run command for files that are not directly useful to execute.

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
