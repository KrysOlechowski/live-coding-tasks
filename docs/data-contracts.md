# Contract map

Read only the contract needed for the operation:

- Task creation, imports, and snapshots: [task](contracts/task.md).
- Review frontmatter and assessment outcomes: [review](contracts/review.md).
- Derived index, priorities, and bounded selection context: [practice index](contracts/practice-index.md).

Local validation lives in `scripts/lib/task-data.mjs`. `npm run finalize:tasks` validates canonical files and rebuilds the index and preview manifest. Generated files are never manually edited.
