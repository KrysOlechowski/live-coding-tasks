# Live Coding 2.0 Architecture and Workflow

## Document status

This document describes the agreed direction for Live Coding 2.0 and reconciles it with the repository as it exists today.

The status labels are intentional:

- **Implemented** — supported by the current repository.
- **Target** — accepted 2.0 behavior that is not implemented end to end yet.
- **Open implementation detail** — the responsibility is agreed, but its exact schema or command still needs to be defined before implementation.
- **Legacy** — current behavior that remains operational during migration but should not become a second source of truth.

## Purpose

Live Coding is an interview-practice system for frontend-oriented and selected broader coding exercises. It should preserve more than the final implementation: it should also capture how the candidate reasons, responds to changing requirements, uses assistance, and improves across sessions.

The system has three product responsibilities:

1. provide a focused environment for realistic, interview-sized tasks;
2. turn reviews and session evidence into useful learning history;
3. present tasks, completed reviews, UI previews, and topics worth revisiting through the existing website.

## Agreed architecture decisions

The following decisions define the intended 2.0 architecture:

- The repository is the only source of truth for tasks and learning history.
- Notion is not part of the task workflow.
- PostgreSQL, Supabase, or another remote database is not required for the core system.
- Codex is the default task designer and executor of repository workflows.
- ChatGPT remains available as an optional task-design surface when conversational brainstorming is useful.
- Codex-created and ChatGPT-created tasks use the same Task Package contract and enter the same repository workflow.
- Canonical information is stored in small human-readable task files; indexes and compact context files are generated from them.
- The current task website, including filtering, task details, reviews, and UI previews, is retained and extended.
- One task uses one evolving implementation. Follow-ups do not create separate stage solutions.

## System overview

```text
Default path
Codex create-task
      │
      ├───────────────┐
      │               │
      │        Optional path
      │        ChatGPT designs a task
      │               │
      │        Codex import-task
      │               │
      └───────┬───────┘
              ↓
     canonical Task Package
              ↓
      validate and scaffold
              ↓
 Core Task → checkpoint → follow-up(s)
              ↓
         one final review
              ↓
 canonical task and session artifacts
              ↓
 validation and generated summaries
      ├───────────────┬────────────────┐
      ↓               ↓                ↓
 task website   learning summary   ChatGPT context
                                      file
```

Both creation paths must converge before scaffolding. There must not be separate task formats, review logic, or learning-history rules for ChatGPT and Codex.

## Roles and boundaries

### Repository: source of truth

**Target; partially implemented.** The repository owns:

- task metadata and candidate briefs;
- interviewer plans and staged follow-ups;
- starter snapshots and candidate implementations;
- session checkpoints and coaching telemetry;
- detailed final reviews;
- canonical topic identifiers;
- learning signals used to select future tasks;
- generated indexes and compact context files.

Generated artifacts must never become independently edited sources of truth. They are recreated from canonical task files and stable repository contracts.

### Codex: default workflow engine

**Partially implemented.** Codex currently supports scaffolding, progressive read-only coaching, and final review through the existing agent workflow files.

**Target.** Codex supports separate, narrowly scoped workflows:

- `create-task` — designs a new task using taxonomy and current learning data;
- `import-task` — validates and normalizes a Task Package created in ChatGPT;
- `scaffold-task` — creates only the files needed for the exercise and never solves it;
- `interview-session` — records stage completion, creates non-spoiling checkpoints, and reveals one planned follow-up at a time;
- `interview-coach` — gives progressive help without editing the candidate implementation and records compact assistance telemetry;
- `review-task` — performs one final review after all active stages and writes learning signals.

These are separate instruction contracts, not separate products or necessarily separate model instances. Each workflow must define its triggers, allowed reads and writes, prohibitions, and required output.

### ChatGPT: optional task designer

**Target.** ChatGPT is not required for normal operation. It is an optional conversational environment for exploring or refining a task idea.

ChatGPT does not automatically receive current repository history. The user provides a compact generated context file that contains the Task Package format, taxonomy, topic roadmap, recent coverage, and the highest-priority learning signals. ChatGPT returns a Task Package; it does not scaffold repository files or update learning history.

Codex then imports the package, validates it against repository contracts, and reports incompatible or missing fields. Import must not silently change candidate requirements or hidden follow-ups merely to make an invalid package pass validation.

### Website: task and learning browser

**Implemented and retained.** The existing Next.js website remains a first-class part of Live Coding 2.0. It must continue to provide:

- a browsable task library;
- filters based on task metadata and progress, including difficulty and Mastery;
- a detail page for each task;
- access to the latest `review.md` for reviewed tasks;
- an interactive preview route when a task requires visible UI work.

**Target extension.** The home page also presents a small “Topics to revisit” list generated from current learning history. Each useful entry should show the topic, its priority, relevant evidence or summary counts, and links to related tasks without exposing full session logs.

## Canonical Task Package

**Implemented as the shared creation/import contract.** The Task Package is the common hand-off contract for both creation paths. Its serialized Markdown format is defined in [`docs/data-contracts.md`](./data-contracts.md), with a complete example in [`docs/examples/task-package-v1.md`](./examples/task-package-v1.md). It contains:

1. task metadata compatible with `TASK_TAXONOMY.md`;
2. a candidate-safe brief;
3. an interviewer plan with zero to three staged follow-ups;
4. the skills and canonical topics the task is intended to exercise;
5. review focus and acceptance criteria.

The candidate brief must not reveal follow-ups, hidden edge cases, pseudocode, implementation hints, expected solution structure, or review answers.

The Task Package is normalized into repository files before the session starts. ChatGPT is expected to output the contract directly; prose brainstorming notes are not imported as task requirements. Codex creation and import skills converge on the same scaffold workflow, while repository validation checks the materialized artifacts.

## Target task directory

Each task represents one complete interview session:

```text
tasks/<category>/<slug>/
├── task.md                 # metadata and candidate-safe brief
├── interviewer.md          # staged interviewer plan and follow-ups
├── session.json            # stage state, checkpoints, help, learning signals
├── main.scaffold.ts        # or main.scaffold.tsx
├── main.ts                 # or main.tsx; the one evolving implementation
└── review.md               # latest full review; present after review
```

Optional files such as `api.ts`, `mockData.ts`, `types.ts`, tests, or preview helpers should exist only when the exercise requires them.

`interviewer.md` is hidden from the normal candidate-facing website and normal solving flow, but it is not a security boundary. If the repository is public, a determined candidate can inspect it. The purpose of the separation is to avoid accidental spoilers, not to provide confidential storage.

### `task.md`

**Implemented in its current single-stage form.** `task.md` contains frontmatter plus a self-contained candidate brief. It normally includes:

- Context
- Goal
- Requirements
- Constraints, when useful
- Non-goals, when useful
- Acceptance Criteria

Task artifacts are normally written in English even when the conversation with the candidate uses another language. The current frontmatter model remains authoritative until the 2.0 schema is deliberately implemented.

### `interviewer.md`

**Target.** This file stores the interviewer plan created with the task. Each follow-up should describe:

- the requirement to reveal;
- why it adds learning value;
- the skills or topics tested;
- any checkpoint evidence it expects;
- relevant final-review focus.

It must not be rendered in the ordinary task details view. A follow-up should add a meaningful constraint, edge case, changed API behavior, bug scenario, testing requirement, accessibility requirement, performance concern, or trade-off.

If the candidate has already implemented the intended behavior, the session workflow should adapt the follow-up into an explanation or trade-off question instead of silently discarding it. A follow-up may also be skipped when the session ends or it is no longer logically applicable; the reason should be recorded.

### `session.json`

**Implemented in workflow, validation, generation, and reset.** This is compact structured evidence, not a transcript. The field-level contract, allowed states, review signals, and reset behavior are defined in [`docs/data-contracts.md`](./data-contracts.md), with a reviewed example in [`docs/examples/session-v1.reviewed.json`](./examples/session-v1.reviewed.json). It holds:

- current stage and stage completion state;
- at most one active required interviewer question, including whether it was answered or explicitly declined;
- planned, completed, adapted, or skipped follow-ups;
- concise checkpoint outcomes;
- assistance totals grouped by stage and canonical topic;
- the strongest hint level used where useful;
- final learning signals created during review.

The file keeps multiple compact attempts so reset can start fresh without erasing useful historical evidence. It remains small enough to validate, aggregate, and understand without loading full conversations.

### `review.md`

**Implemented for the current workflow; session-aware expansion is a target.** `review.md` remains the latest detailed, human-readable technical assessment. It evaluates the final code against the candidate brief and all active follow-ups, includes high-signal findings with file references, and records Mastery, a learning takeaway, and a concrete next step.

Historical structured evidence belongs in `session.json`; `review.md` remains the latest review rather than an append-only event log.

## Learning data model

### Canonical topics

**Contract defined; workflow integration is a target.** Learning signals use stable topic IDs so aliases such as “race conditions,” “stale requests,” and “out-of-order responses” do not accidentally become unrelated topics.

The authored [`data/topic-catalog.json`](../data/topic-catalog.json) defines the initial IDs, labels, primary categories, descriptions, and aliases. Taxonomy describes task shape; the topic catalog describes knowledge being practiced. Finalization validates task, checkpoint, coach, and review references against it.

### Review signals

**Target.** The final review writes compact topic-level signals to `session.json`. At minimum, a topic that still needs practice records:

```json
{
  "topicId": "request-cancellation",
  "outcome": "needs-practice",
  "priority": "high",
  "independence": "guided",
  "evidence": "The requirement was completed only after strong coaching."
}
```

The complete v1 field set is defined in [`docs/data-contracts.md`](./data-contracts.md). The semantics below are part of the intended workflow.

#### Repetition priority

Use `high` when one or more of these are true:

- a core concept was misunderstood;
- an important requirement remained unmet;
- the same gap recurs across tasks;
- strong coaching was required and the skill was not later demonstrated independently;
- performance in the primary topic broadly corresponds to Mastery 1–2.

Use `medium` when:

- there is a meaningful gap or missed edge case;
- the candidate completed the work only after clear guidance;
- the topic is improving but not yet stable;
- performance in an important topic broadly corresponds to Mastery 3.

Use `low` for minor issues, a small hint, optional polish, or a topic that was later explained or demonstrated independently in the same session.

Task-level `needsRepetition` is derived rather than manually decided:

```text
needsRepetition = at least one topic has medium or high repetition priority
```

This value is a snapshot of the task at review time. It is not rewritten merely because later practice resolves the topic.

The global “Topics to revisit” list is current, generated state. A topic may leave that list after a later task explicitly tests it and the final review records that it was demonstrated with sufficient independence. Repeated gaps raise its current priority.

Coach hint count is evidence, not an automatic penalty. Review must consider the hint level, stage, topic, importance of the requirement, and whether the candidate later demonstrated the skill independently.

### Generated repository views

**Target.** The intended derived artifacts are:

- `data/task-index.json` — compact task metadata and progress used by tooling and, where useful, the website;
- `data/learning-summary.json` — current topic priorities, coverage, recent outcomes, assistance aggregates, and related task references;
- `chatgpt/task-designer-context.md` — a small generated file the user can attach to ChatGPT;
- the existing preview manifest under `src/lib/` — generated UI preview registration.

These files must be reproducible from canonical repository content and must not be edited by hand.

The ChatGPT context should remain intentionally small. It should include the contract and topic roadmap, a limited recent-task window, top topics to revisit, under-practiced topics, and compact category/problem-shape statistics. It should not include full implementations, reviews, or coach conversations.

Codex does not need the ChatGPT context file as its primary input. It can read the canonical taxonomy, topic catalog, task artifacts, and generated learning summary directly. Both task designers therefore receive different-sized views of the same repository evidence.

## Target end-to-end workflow

### Path A: Codex creates the task

1. The user requests a new task, optionally adding difficulty, focus, or exclusions.
2. `create-task` checks that generated learning data is current.
3. Codex reads the taxonomy, topic catalog, learning summary, and recent task coverage.
4. Codex selects a useful, non-repetitive learning target and creates a valid Task Package.
5. `scaffold-task` writes the candidate brief, interviewer plan, initial session state, implementation scaffold, and exact scaffold snapshot.
6. Repository validation and derived-data generation run automatically.

### Path B: ChatGPT creates the task

1. The user attaches the current generated task-designer context to ChatGPT.
2. The user discusses the desired task and asks ChatGPT for the final Task Package.
3. The user passes that package to Codex.
4. `import-task` validates taxonomy values, required sections, candidate/interviewer separation, size, and internal consistency.
5. If valid, the same `scaffold-task` workflow used by Path A creates the repository files.
6. Repository validation and derived-data generation run automatically.

ChatGPT is therefore optional but fully supported. Its absence does not block task creation, and its presence does not create a second persistence path.

### Interview session

1. The candidate solves the Core Task in the single `main.ts` or `main.tsx` file.
2. The candidate may request progressive coaching at any stage.
3. Coaching remains read-only with respect to candidate code, but may append compact telemetry to `session.json`.
4. A required checkpoint, explanation, or trade-off question is persisted as `activeQuestion` before it is shown. The candidate must answer it or explicitly decline; silence never becomes negative evidence automatically.
5. When the candidate declares the stage complete, `interview-session` first blocks on any pending question, then records a concise checkpoint after the question is resolved.
6. The checkpoint normally remains silent when feedback would spoil a later follow-up.
7. `interview-session` reveals the next applicable follow-up and updates the stage state.
8. The candidate evolves the same implementation.
9. Steps 2–8 repeat until all active follow-ups are completed, adapted, skipped with a reason, or the session is ended.

A checkpoint is evidence capture, not a partial review. It should record an outcome such as `passed`, `passed-with-issues`, or `incomplete`, plus concise observed issues, assistance used, and knowledge signals.

### Final review and regeneration

1. `review-task` runs after the Core Task and all active follow-ups are resolved.
2. It reads the brief, interviewer plan, final implementation, relevant tests, checkpoints, and assistance evidence.
3. It writes the latest detailed `review.md`.
4. It writes final structured topic signals and session outcome to `session.json`.
5. Finalization validates canonical task files and regenerates the task index, learning summary, ChatGPT context, and preview manifest.
6. The website and the next task-creation request use the updated generated views.

Mastery remains a five-level evidence-based signal. It reflects understanding across the session; it does not mechanically reward final correctness or subtract points per hint.

### Reset

**Implemented.** Reset restores `main.*` from the exact `main.scaffold.*` snapshot and removes the current review. It closes the current attempt as `reset` when it contains useful evidence, preserves that compact history in `session.json`, starts a fresh active attempt, and regenerates derived data. Current task progress follows only the active attempt.

## Current repository behavior

The repository currently implements the following baseline:

| Concern | Current behavior | 2.0 status |
| --- | --- | --- |
| Taxonomy | `TASK_TAXONOMY.md` defines eight categories, nine task types, difficulty, skills, problem shape, interview focus, and review focus. | Implemented current contract. |
| Task generation | Separate Codex create/import skills share Task Package v1; optional ChatGPT receives generated bounded context. | Implemented workflow; both paths still need live end-to-end exercise. |
| Repetition guard | Generated task and learning data track recent shapes, assigned coverage, reviewed evidence, and current repetition priorities. | Implemented; legacy `gpt/` files are no longer part of normal finalization. |
| Scaffolding | Codex creates `task.md`, `interviewer.md`, `session.json`, minimal `main.*`, and an exact `main.scaffold.*` snapshot. | Implemented for Task Package v1. |
| UI task preview | `hasPreview` and `previewEntry` generate imports and routes through the Next.js app. | Implemented and retained. |
| Candidate implementation | The candidate edits one working `main.*` file. | Implemented and retained. |
| Coaching | `$coach` provides progressive code-read-only assistance and may append one material help event to the active session. | Implemented workflow; telemetry needs live exercise. |
| Interviewer plan | V1 plans are materialized, kept off candidate pages, and validated against topic/follow-up contracts. | Implemented. |
| Follow-ups | The interview-session workflow tracks locked stages and reveals one applicable follow-up at a time. | Implemented workflow; needs live exercise. |
| Session questions and checkpoints | Required questions persist across turns, unanswered questions block stage completion, and completed stages store compact non-spoiling evidence in `session.json`. | Implemented workflow and validation. |
| Final review | Review is gated by session readiness and writes both `review.md` and matching structured learning signals. | Implemented workflow and validation; needs live exercise. |
| Structured learning history | Session attempts are canonical; generators produce task index, coverage, repetition priorities, and bounded ChatGPT context. | Implemented. |
| Restore | `restore:scaffold` restores code, preserves meaningful prior attempts, starts a fresh attempt, and finalizes automatically. | Implemented and exercised on the initial task. |
| Validation/finalization | `finalize:tasks` validates topics, task/interviewer/session/review contracts and regenerates task data, previews, and ChatGPT context. | Implemented. |
| Task browser | Next.js indexes frontmatter, filters by category, difficulty, Mastery, preview availability, and review progress, renders details and reviews, and serves optional previews. | Implemented and retained. |
| Topics-to-revisit view | The home page renders generated current priorities with evidence, coach counts, Mastery, and task links. | Implemented; initially shows an empty state until a review creates signals. |

The repository now includes one medium async/UI task with a visible preview, interviewer plan, locked follow-up, initial session state, and generated metadata. It is intentionally unsolved so the session and review flow can be exercised with real candidate work.

## Current executable contracts

Until migration work changes them deliberately, these files remain authoritative for current repository operations:

- [`AGENTS.md`](../AGENTS.md) controls routing and repository boundaries.
- [`TASK_TAXONOMY.md`](../TASK_TAXONOMY.md) defines allowed task metadata.
- [`codex/codex_task_scaffold.md`](../codex/codex_task_scaffold.md) defines scaffold behavior.
- [`codex/codex_review_workflow.md`](../codex/codex_review_workflow.md) defines the current review artifact and validation expectations.
- [`agent-skills/interview-coach.md`](../agent-skills/interview-coach.md) defines current coaching behavior.
- `npm run finalize:tasks` validates tasks and regenerates current derived metadata.
- `npm run restore:scaffold -- tasks/<category>/<slug>` resets one task to its original scaffold.

This design document does not silently override those executable contracts. They must be updated as each 2.0 capability is implemented.

## Data ownership

| Data | Authority | Intended representation |
| --- | --- | --- |
| Task taxonomy | Repository | `TASK_TAXONOMY.md` |
| Canonical topic IDs | Repository | [`data/topic-catalog.json`](../data/topic-catalog.json) |
| Candidate brief and metadata | Task directory | `task.md` |
| Interviewer plan and hidden follow-ups | Task directory | `interviewer.md` |
| Session state and compact evidence | Task directory | `session.json` |
| Working implementation | Task directory | `main.ts` or `main.tsx` |
| Original starter snapshot | Task directory | `main.scaffold.ts` or `main.scaffold.tsx` |
| Detailed latest review | Task directory | `review.md` |
| Current cross-task learning summary | Generated repository data | `data/learning-summary.json` |
| Compact task index | Generated repository data | `data/task-index.json` |
| ChatGPT design context | Generated repository document | `chatgpt/task-designer-context.md` |
| UI preview registry | Generated repository code | existing manifest under `src/lib/` |

No external service owns or must synchronize any of this data.

## Implementation sequence

The safest migration is a vertical slice rather than a simultaneous rewrite:

1. **Document the accepted architecture.** This document completes that step.
2. **Define and validate contracts.** Implemented for Task Package, topics, interviewer, session, review, and reset v1.
3. **Extend finalization.** Implemented for task index, learning summary, ChatGPT context, and preview manifest.
4. **Implement the Codex creation path.** Implemented as a routed skill connected to shared scaffolding.
5. **Implement the ChatGPT import path.** Implemented as a routed skill using the same contract and scaffold path.
6. **Implement session workflows.** Implemented for stage state, checkpoints, follow-up reveal, and coaching telemetry.
7. **Make review session-aware.** Implemented in workflow, validation, and generated-data contracts.
8. **Extend the website.** Implemented while preserving current task browsing, filters, reviews, and previews.
9. **Migrate legacy instructions.** README, AGENTS, skills, review/scaffold workflows, and reset are migrated; the old `gpt/` directory remains isolated for later cleanup.
10. **Verify both creation paths.** Exercise one Codex-created and one ChatGPT-imported task through scaffold, session, review, reset, finalization, and website rendering.

## Remaining implementation details

The following details remain after the first implementation slice:

- exercise Codex creation and ChatGPT import on separate real tasks;
- exercise checkpoints, coach telemetry, final review, and topic resolution with real candidate behavior;
- exercise archival of a reviewed attempt during reset;
- define a future schema migration policy only when version 2 is actually needed;
- remove or archive individual legacy files under `gpt/` after confirming no compatibility use remains;
- decide whether `$coach` needs another public alias after normal usage feedback.

The following are no longer open architecture questions: Notion and a remote database are outside the core workflow; Codex can create tasks directly; ChatGPT remains optional; repository files are authoritative; and the existing website features must remain.

## Design guardrails

- Optimize for learning value and realistic interview practice, not metadata volume.
- Keep task scaffolds lightweight and do not solve the exercise during creation or import.
- Keep candidate-facing artifacts free of hidden follow-ups and solution hints.
- Do not let checkpoint feedback spoil a later stage.
- Do not treat silence as a declined answer or close a stage while `activeQuestion` is pending.
- Keep coaching available throughout the session and evaluate assistance contextually.
- Treat coach telemetry as evidence, never as automatic punishment.
- Perform one full review after the active interview flow is complete.
- Preserve one evolving implementation per task.
- Keep detailed diagnostics in `review.md` and compact structured evidence in `session.json`.
- Preserve the task library, filters, task detail pages, completed-review display, and optional UI previews throughout migration.
- Generate cross-task summaries and ChatGPT context from canonical repository files.
- Do not create duplicate sources of truth.
- Do not require a private external service to browse, create, solve, review, reset, or learn from tasks.
- Do not present target capabilities as implemented behavior.
