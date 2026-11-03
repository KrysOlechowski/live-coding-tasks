# Task creation and scaffold

Read `docs/contracts/task.md`. Create `tasks/<category>/<stable-slug>/` with a candidate-safe brief and concise private evaluation criteria.

Starter shape follows taskType:

- build / complete / model / edge cases: leave the intended work unimplemented; use TODOs where useful.
- fix-bug: runnable code containing the stated faulty behavior.
- refactor / optimize / review-and-improve: preserve baseline behavior with the intended quality problem.
- write-tests: provide the behavior to test and only the test scaffolding needed by the existing setup.

Do not disclose the defect or intended technique through TODOs in diagnosis tasks. Do not write a solution or replacement implementation in the private plan.

Use `main.ts` for non-UI tasks and `main.tsx` for React previews. Preview components export a default Client Component (`"use client"`). Keep styling modest and use built-in Tailwind utilities. Add supporting files only when they materially help the exercise.

For non-UI work, include a tiny runnable example when useful; it must not reveal the implementation. Do not introduce a test framework merely to scaffold a task.

After writing all starter files, run:

```sh
npm run scaffold:init -- tasks/<category>/<slug> main.ts
npm run finalize:tasks
```

List additional editable TS/TSX files after `main.ts`; use `main.tsx` for previews. Initialization creates exact snapshot copies, hashes, and creation time. Do not alter snapshots after initialization. Reset verifies all manifest paths and hashes before overwriting working files and removes the current review.

Finish with `npx tsx --watch tasks/<category>/<slug>/main.ts` when directly runnable, or `npm run dev` and the preview URL for UI tasks. Do not expose interviewer-only criteria in the final response.
