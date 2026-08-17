# Live Coding 2.0 Data Contracts

## Status

This document defines the implemented version 1 contracts for Live Coding 2.0. Repository validation and generation enforce the materialized task, interviewer, session, review, topic, and derived-data invariants described here; live session behavior is carried out through the matching Codex workflows.

The contracts deliberately preserve the existing `task.md` frontmatter so the 2.0 migration can be incremental.

## Contract principles

- Repository task files are canonical.
- ChatGPT and Codex produce the same Task Package format.
- Generated indexes and summaries are never edited manually.
- Candidate-visible requirements and interviewer-only stages are separate artifacts.
- Session data is compact structured evidence, not a conversation transcript.
- Topic IDs come from one canonical catalog.
- IDs use lowercase kebab-case and remain stable after creation.
- Timestamps use ISO 8601 UTC, for example `2026-08-17T14:30:00Z`.
- Every serialized contract contains `schemaVersion: 1`.

## Task Package v1

The Task Package is a temporary hand-off artifact. It is not stored inside a task directory after import. Codex creates or imports it, validates it, then materializes its two contained files and creates the remaining scaffold artifacts.

Use this exact outer structure:

````markdown
---
schemaVersion: 1
slug: "stable-task-slug"
---

# Live Coding Task Package

## task.md

```markdown
...complete task.md...
```

## interviewer.md

```markdown
...complete interviewer.md...
```
````

Rules:

- `slug` must be unique across all task categories and use lowercase kebab-case.
- The package contains exactly one `task.md` block and one `interviewer.md` block.
- The fenced blocks contain complete file contents, not summaries or patches.
- ChatGPT must output only the final package when the user finishes brainstorming.
- The package must not contain scaffold code, a solution, pseudocode, or temporary discussion notes.
- Codex may normalize whitespace and quoting, but must not silently change requirements, follow-ups, taxonomy values, or learning topics.
- Missing or incompatible information causes an import error that identifies what must be corrected.

### `task.md` contract

The contained `task.md` uses the current repository format. Its frontmatter contains exactly these required workflow fields:

- `title`
- `category`
- `taskType`
- `difficulty`
- `primarySkill`
- `secondarySkill`
- `problemShape`
- `interviewFocus`
- `reviewFocus`
- `tags`

For a visible UI task it may additionally contain:

- `hasPreview: true`
- `previewEntry: "main.tsx"` or another valid task-local entry

For a non-preview task, both preview fields should normally be omitted. Allowed taxonomy values remain defined by `TASK_TAXONOMY.md`.

The Markdown body starts with one `#` task title and contains:

- `## Context`
- `## Goal`
- `## Requirements`
- `## Acceptance Criteria`

`## Constraints` and `## Non-goals` are optional. The brief must be self-contained and candidate-safe.

### `interviewer.md` contract

The contained `interviewer.md` uses this frontmatter:

```yaml
---
schemaVersion: 1
plannedFollowUps: 1
primaryTopics:
  - "stale-async-responses"
secondaryTopics:
  - "request-cancellation"
---
```

Required rules:

- `plannedFollowUps` is an integer from `0` to `3`.
- `primaryTopics` contains one or two IDs from `data/topic-catalog.json`.
- `secondaryTopics` contains zero to three IDs from the same catalog.
- A topic may not appear in both arrays.
- Every ID listed in a follow-up's `### Topics` section also appears in one of the frontmatter topic arrays.
- The number of `## Follow-up N` sections equals `plannedFollowUps`.
- Follow-up numbering is continuous and begins at 1.

The body uses this structure:

```markdown
# Interviewer Plan

## Core Task

### Purpose

Why this task is useful now.

### Expected evidence

- Observable evidence of understanding.

### Checkpoint focus

- Evidence to capture without spoiling a later stage.

### Review focus

- The highest-signal review concerns for this stage.

## Follow-up 1

### Reveal

The exact additional requirement shown to the candidate.

### Purpose

Why this follow-up adds learning value.

### Topics

- canonical-topic-id

### Expected evidence

- Observable evidence of understanding.

### Review focus

- The highest-signal review concerns for this stage.
```

Each follow-up must introduce meaningful learning value. The interviewer plan may state expected concepts and evidence, but it must not contain a complete solution, code, pseudocode, or a replacement implementation.

## Materialized task directory

After a Task Package passes validation, scaffolding creates:

```text
tasks/<category>/<slug>/
├── task.md
├── interviewer.md
├── session.json
├── main.scaffold.ts     # or main.scaffold.tsx
└── main.ts              # or main.tsx
```

`review.md` is added only after a full review. Optional support files remain task-dependent.

The package's `task.md` and `interviewer.md` contents are materialized without changing their meaning. `session.json` and code scaffolds are created by Codex, never by ChatGPT.

## `session.json` v1

`session.json` stores one or more attempts for the same stable task. Keeping attempts in one compact file preserves useful learning evidence when a task is reset without turning `review.md` into an append-only log.

Top-level shape:

```json
{
  "schemaVersion": 1,
  "taskSlug": "fix-stale-customer-search",
  "activeAttemptId": "attempt-1",
  "attempts": []
}
```

Rules:

- `taskSlug` matches the task folder slug.
- `activeAttemptId` references exactly one item in `attempts`.
- Attempt IDs are sequential: `attempt-1`, `attempt-2`, and so on.
- One attempt is active at a time. Earlier attempts are immutable except when reset adds their final `endedAt` and terminal status.
- Full chat transcripts, source code, and duplicated review prose do not belong here.

### Attempt

Each attempt contains:

```json
{
  "id": "attempt-1",
  "number": 1,
  "status": "ready",
  "createdAt": "2026-08-17T14:25:00Z",
  "startedAt": null,
  "endedAt": null,
  "activeStageId": "core",
  "activeQuestion": null,
  "stages": [],
  "coachEvents": [],
  "review": null
}
```

Allowed attempt statuses:

- `ready` — scaffold exists and solving has not started;
- `in-progress` — the candidate is working through stages;
- `ready-for-review` — every active stage is resolved;
- `reviewed` — a final review and structured review signals exist;
- `abandoned` — the attempt ended without a final review;
- `reset` — the attempt was superseded by a new active attempt.

`createdAt` records when scaffolding created the attempt. `startedAt` remains `null` until solving begins.

`activeStageId` is a stage ID while work can continue and `null` after the attempt becomes `ready-for-review`, `reviewed`, `abandoned`, or `reset`.

`activeQuestion` stores at most one explicit question that must be resolved before the active stage can close. It starts as `null` and must also be `null` for every terminal or `ready-for-review` attempt.

### Active question

When the interviewer asks a required checkpoint, explanation, or trade-off question, store:

```json
{
  "stageId": "core",
  "prompt": "Why does the original optional-property model permit invalid states?",
  "askedAt": "2026-08-17T14:32:00Z",
  "status": "pending",
  "resolvedAt": null,
  "evidence": null
}
```

Allowed statuses:

- `pending` — the candidate has not answered or explicitly declined;
- `answered` — the response was received and `evidence` stores one concise assessment sentence;
- `declined` — the candidate explicitly chose not to answer and `evidence` records that choice.

Rules:

- `stageId` must match `activeStageId` and reference an `available` or `in-progress` stage.
- `prompt` is the exact short question shown to the candidate; it is not a transcript.
- `pending` requires `resolvedAt` and `evidence` to remain `null`.
- `answered` and `declined` require a UTC `resolvedAt` timestamp and concise non-empty `evidence`.
- A stage must not be completed while its active question is `pending`.
- When the stage checkpoint consumes an answered or declined question, copy only the useful evidence into the checkpoint and clear `activeQuestion`.
- Silence is not a decline and must not be converted into negative review evidence. The interviewer repeats the pending question and keeps the stage active.

### Stage

Scaffolding initializes one `core` stage plus one stage for every planned follow-up:

```json
{
  "id": "core",
  "kind": "core",
  "title": "Core Task",
  "status": "available",
  "adaptation": null,
  "skipReason": null,
  "checkpoint": null
}
```

Follow-up stage IDs are `follow-up-1`, `follow-up-2`, and `follow-up-3`. Their titles match the corresponding interviewer-plan headings.

Allowed stage statuses:

- `locked` — the requirement has not been revealed;
- `available` — it may be started or has just been revealed;
- `in-progress` — the candidate is working on it;
- `completed` — the stage ended and has a checkpoint;
- `skipped` — the stage was not attempted and has a non-empty `skipReason`.

Core starts as `available`; follow-ups start as `locked`. `adaptation` remains `null` unless a follow-up is converted into an explanation or trade-off question because the candidate already implemented the intended behavior. The adapted prompt is recorded as one short sentence.

### Checkpoint

A completed stage contains:

```json
{
  "recordedAt": "2026-08-17T14:55:00Z",
  "outcome": "passed-with-issues",
  "observations": [
    "The visible result is correct, but the candidate could not yet explain the ordering guarantee."
  ],
  "knowledgeSignals": [
    {
      "topicId": "stale-async-responses",
      "signal": "uncertain",
      "evidence": "Needed a prompt to identify the out-of-order response scenario."
    }
  ]
}
```

Allowed checkpoint outcomes are `passed`, `passed-with-issues`, and `incomplete`. Allowed checkpoint knowledge signals are `demonstrated`, `uncertain`, and `gap`.

Checkpoint observations are concise interviewer evidence. They are not displayed automatically to the candidate because doing so may spoil a later follow-up.

### Coach event

Record an event only when assistance materially advances the candidate. Do not record ordinary conversation, encouragement, or interviewer questions that reveal no guidance.

```json
{
  "id": "coach-1",
  "createdAt": "2026-08-17T14:45:00Z",
  "stageId": "core",
  "topicId": "stale-async-responses",
  "level": 2,
  "mode": "hint"
}
```

Allowed modes:

- `hint`
- `concept-explanation`
- `debug-nudge`
- `next-step`
- `rubber-duck`

Help levels:

1. guiding question or tiny hint;
2. narrowed pointer or small hint;
3. explicit concept explanation or strong hint;
4. implementation direction or short example;
5. solution outline explicitly requested by the candidate.

The event count and highest level are evidence for review. They do not directly lower Mastery or set repetition priority.

### Structured review

After review, the attempt contains a compact representation consistent with `review.md`:

```json
{
  "reviewedAt": "2026-08-17T15:30:00Z",
  "requirementVerdict": "partially",
  "mastery": {
    "level": 3,
    "label": "Mostly working",
    "reason": "Core behavior works, but cancellation and explanation of stale results still need practice."
  },
  "needsRepetition": true,
  "topicSignals": [
    {
      "topicId": "request-cancellation",
      "outcome": "needs-practice",
      "priority": "medium",
      "independence": "guided",
      "evidence": "The unmount case was completed only after a direct implementation hint.",
      "stageIds": ["follow-up-1"]
    }
  ]
}
```

Allowed requirement verdicts are `yes`, `partially`, and `no`. Mastery levels and labels must match `TASK_TAXONOMY.md` and the current review workflow.

Allowed topic outcomes:

- `needs-practice` — the review found a remaining knowledge or execution gap;
- `improved` — the topic progressed during the attempt but is not yet stable;
- `demonstrated` — the candidate showed sufficient understanding in this attempt.

Allowed independence values:

- `independent`
- `minimal-help`
- `guided`
- `not-demonstrated`

For `needs-practice`, `priority` is `low`, `medium`, or `high`. For `improved` and `demonstrated`, `priority` is `null`.

`needsRepetition` is a derived snapshot and must equal `true` if and only if at least one `needs-practice` topic signal has `medium` or `high` priority.

### Reset semantics

Reset restores the code snapshot and begins a fresh attempt:

1. restore `main.*` from `main.scaffold.*`;
2. remove the current `review.md`;
3. preserve the existing attempt in `session.json` when it contains a checkpoint, coach event, or review;
4. change that attempt's status to `reset`, set `endedAt`, and keep its structured evidence;
5. clear any active question, append a new initialized attempt, and point `activeAttemptId` to it;
6. regenerate all derived data.

If the active attempt contains no checkpoint, coach event, or review, reset may reinitialize it in place instead of creating empty history.

Historical structured evidence may contribute to longitudinal learning aggregates, but the website's current task progress and current `review.md` always follow the active attempt.

## Topic catalog v1

`data/topic-catalog.json` is authored canonical data. It is not generated.

Shape:

```json
{
  "schemaVersion": 1,
  "topics": [
    {
      "id": "stale-async-responses",
      "label": "Stale async responses",
      "category": "async",
      "description": "Prevent older asynchronous results from replacing newer state.",
      "aliases": ["race conditions", "out-of-order responses"]
    }
  ]
}
```

Rules:

- `id` is globally unique, lowercase kebab-case, and never renamed casually.
- `label` is the short website label.
- `category` is one value from `TASK_TAXONOMY.md`.
- `description` states the reusable knowledge area rather than one task scenario.
- `aliases` help designers map natural language to the canonical ID; aliases are not stored in task or session signals.
- Topics may overlap categories conceptually, but each has one primary category to keep the catalog and UI simple.
- Adding a topic is preferred to overloading an existing ID only when the learning evidence is meaningfully distinct.

## Canonical and generated data

Canonical authored or workflow-written files:

- `TASK_TAXONOMY.md`
- `data/topic-catalog.json`
- each task's `task.md`
- each task's `interviewer.md`
- each task's `session.json`
- each task's implementation, scaffold snapshot, optional support files, and `review.md`

Generated files:

- `data/task-index.json`
- `data/learning-summary.json`
- `chatgpt/task-designer-context.md`
- `src/lib/generated-task-preview-manifest.tsx`

Generated files are deterministic: they do not include a volatile generation timestamp. Recency comes from canonical attempt and review timestamps.

### `data/task-index.json`

The task index is a compact list for tooling and the website. Each item should contain only data needed for listing, filtering, routing, and current progress:

- slug, title, category, task type, and difficulty;
- primary skill, problem shape, and tags;
- preview availability and entry;
- active-attempt status;
- current Mastery and `needsRepetition` when the active attempt is reviewed;
- reviewed-at date when present.

Detailed task bodies, interviewer plans, checkpoint observations, and coach events do not belong in the index.

### `data/learning-summary.json`

The learning summary is the compact cross-task input for task selection and the website's repetition list. It should contain:

- current topics to revisit with priority, evidence count, related task slugs, coach-hint totals, and last reviewed date;
- topic coverage with assigned-task and reviewed-attempt counts kept separate;
- under-practiced topics;
- a bounded list of recent tasks and problem shapes;
- compact category and task-type coverage.

Aggregation processes structured reviews in `reviewedAt` order:

1. A `needs-practice` signal with `medium` or `high` priority opens or keeps a topic in the repetition list.
2. Multiple unresolved `needs-practice` signals raise the current priority by one level, capped at `high`.
3. A later `improved` signal keeps the topic open; it may reduce `high` to `medium`, but does not close it.
4. A later `demonstrated` signal closes the topic only when independence is `independent` or `minimal-help`.
5. A `demonstrated` signal marked `guided` is treated as improvement, not resolution.
6. A later medium/high `needs-practice` signal reopens a previously resolved topic.
7. A low-priority signal is retained in coverage but does not appear by itself in the website repetition list.

Assigned or in-progress tasks count toward coverage but never count as demonstrated learning before review.

### `chatgpt/task-designer-context.md`

The ChatGPT context is generated from stable contracts plus `data/learning-summary.json`. It contains:

- the Task Package v1 output rules;
- allowed taxonomy values and canonical topic IDs;
- at most 10 current topics to revisit;
- under-practiced topics;
- at most 12 recent tasks with compact problem-shape and outcome data;
- short coverage statistics and repetition guards.

It excludes full task bodies, interviewer plans, implementations, reviews, checkpoint observations, and coach conversations. The user attaches this file manually when using ChatGPT to design a task.

## Finalization rules

The 2.0 finalization workflow:

1. validate every canonical task artifact;
2. verify that all topic IDs exist in the catalog;
3. verify that interviewer follow-up counts match headings and session stages;
4. verify attempt, stage, active-question, checkpoint, and coach references;
5. verify `review.md` Mastery and verdict against the active attempt's structured review;
6. verify the `needsRepetition` invariant;
7. regenerate the task index, learning summary, ChatGPT context, and preview manifest;
8. fail rather than silently discard invalid learning evidence.

Contract changes must update validation, generators, workflow instructions, and examples together.
