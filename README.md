# Live Coding Interview Lab

A lightweight repository for interview practice: choose an exercise, solve it, and get a focused review. Task artifacts are in English; you can talk to Codex in Polish.

## Start

```sh
npm install
npm run dev
```

Open http://localhost:3000 for the task library, filters, and practice focus. New repositories can have an empty library. Ask Codex to create the first exercise; no model runs when browsing the UI.

## Working with Codex

- **Proposals:** “Suggest three medium React tasks.” No files are created.
- **Creation:** “Create a medium async task.” Codex selects and scaffolds it directly. You can also supply a brief from ChatGPT.
- **Solving:** edit the working starter and ask normal questions when needed. No session, coaching commands, or mandatory questions.
- **Review:** “Review tasks/async/my-task.” Codex writes a concise review and topic assessments.

The topic catalog is a temporary seed. It supports focused practice and custom exercises; a researched interview-topic catalog will be developed separately. Selection uses all saved task metadata and review signals locally, but sends only bounded context to the model.

## Task files

```text
tasks/<category>/<slug>/
  task.md             # Candidate brief and topic IDs
  interviewer.md      # Private evaluation criteria
  main.ts[x]          # Candidate working file
  main.scaffold.ts[x] # Immutable initial copy
  scaffold.json       # Working/snapshot paths and hashes
  review.md           # Latest assessment, created during review
```

The latest review stores Mastery, verdict, time, and topic signals in YAML frontmatter. Local scripts aggregate these into a disposable practice index. There are no question logs or attempt histories. Reset removes the current review and restores all files listed in the manifest.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Synchronize metadata and start the UI |
| `npm run task:design-context -- --category async` | Bounded selection context from all current tasks/reviews |
| `npm run task:design-context -- --topic debounce --shape timer-lifecycle` | Find related tasks before designing a variant |
| `npm run scaffold:init -- tasks/async/my-task main.ts` | Generate exact snapshots, hashes, and creation time |
| `npm run restore:scaffold -- tasks/async/my-task` | Verify and restore all snapshots; remove review; finalize |
| `npm run finalize:tasks` | Validate and regenerate index/preview once |
| `npm run validate:tasks` | Validate without writing |
| `npm run test:workflow` | Test aggregation, creation, reset, and validation |
| `npm run check` | Finalize once, run tests, lint, and build |

`npm run lint` and `npm run build` independently synchronize metadata; `check` skips their repeated lifecycle hooks.

## References

- [Taxonomy](TASK_TAXONOMY.md)
- [Workflow](docs/workflow.md)
- [Task contract](docs/contracts/task.md)
- [Review contract](docs/contracts/review.md)
- [Aggregation rules](docs/contracts/practice-index.md)
