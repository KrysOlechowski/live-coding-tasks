# Derived practice index

`data/practice-index.json` is generated, never authored. `finalize:tasks` reads canonical task/review files locally and produces:

- `tasks`: metadata, creation/review time, Mastery, verdict, summary, and preview entry.
- `topics`: assignment/review counts, number of tasks with a `needs-practice` signal, latest explicit outcome/evidence/date/task, and related reviewed task slugs.

For each topic, assessments are ordered by UTC timestamp descending, with slug as a deterministic tie-break. A later review that does not assess a topic has no effect on that topic. A newer `demonstrated` assessment removes it from current practice priorities; earlier difficulty counts remain historical context, not an unresolved deficit. It means demonstrated in the latest task, not durable mastery.

Priority order: latest `needs-practice`, then `improving`; within each, more tasks showing difficulty, then newer assessment, then topic ID. Unassessed topics are coverage opportunities, not weaknesses.

The home panel shows up to three assessed topics, with remaining topics expandable, outcome labels, exact evidence, dates in Europe/Warsaw, and links to source tasks. Current gaps precede demonstrated topics. No panel appears without assessment evidence.

`task:design-context` analyzes the entire current repository locally on every call; it does not rely on a stale index. It returns at most five priorities, eight coverage entries, fourteen candidate topics, and ten task metadata records. `--category`, `--difficulty`, `--topic`, and `--shape` constrain selection or find related tasks. Counts include all matching records even when examples are capped. Explicit constraints override automatic suggestions.

For overlap checks, query a selected topic/shape; inspect specific related briefs when needed. Full indexes and hundreds of review files must not be copied into model context. No heuristic can guarantee semantic novelty; the designer still judges similarity.
