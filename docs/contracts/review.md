# Review contract

The task's `review.md` is the sole authored source for its latest assessment. No copy is stored in a session or separate learning log.

```yaml
---
reviewedAt: "2026-11-03T12:00:00Z"
mastery: 3
requirementVerdict: partially
topicSignals:
  - topic: debounce
    outcome: needs-practice
    evidence: "Repeated calls do not reset the timer (main.ts:12)."
---
```

- `reviewedAt`: current ISO 8601 UTC timestamp, quoted as a string.
- `mastery`: integer 1–5.
- `requirementVerdict`: `yes` (all explicit behavior met), `partially` (some explicit behavior unmet), `no` (core behavior broken/missing).
- `topicSignals`: one or more unique topics declared in `task.md` that were actually assessed. Do not force a signal for unassessed topics.
- `outcome`: `needs-practice`, `improving`, or `demonstrated`.
- `evidence`: one short, concrete English sentence grounded in the code, checks, or available earlier evidence. Do not claim observed improvement without comparison evidence.

Body has exactly the five review sections: `## Result`, `## Mastery`, `## Findings`, `## Strengths`, `## Next step`, under `# Task Review`. The Result and Mastery prose must agree with frontmatter; the UI derives the numeric badge from frontmatter. See `codex/codex_review_workflow.md` for editorial guidance.

Re-review replaces this file with a new assessment time. Reset removes it and its signals from the current aggregate. There is no attempt archive. The index retains only the latest review per saved task, and task creation times distinguish newer assignments from older ones.

Run `npm run finalize:tasks` after changes. This validates the YAML and rebuilds all derived views without calling a model.
