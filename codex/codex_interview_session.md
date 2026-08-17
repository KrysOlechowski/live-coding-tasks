# Codex Interview Session Workflow

## Purpose

Run Core Task and follow-up stages without exposing future requirements. Store compact evidence in `session.json`; do not perform the final review here.

## Read first

- current task's `task.md`
- current task's `interviewer.md`
- current task's `session.json`
- current task's working implementation
- `docs/data-contracts.md`

Do not inspect unrelated task folders.

## Start or resume

1. Resolve the active attempt from `activeAttemptId`.
2. If its status is `ready`, change it to `in-progress`, set `startedAt`, and change the active stage from `available` to `in-progress`.
3. If it is already `in-progress`, resume its `activeStageId` without revealing locked stages.
4. If it is `ready-for-review`, direct the candidate to final review.
5. If it is `reviewed`, offer reset only when the user asks to repeat the task.

## Complete a stage

When the candidate says the current stage is finished:

1. Inspect the candidate brief, current stage, implementation, and relevant tests.
2. Record a concise checkpoint with `passed`, `passed-with-issues`, or `incomplete`.
3. Store only observations and topic evidence useful for the final review. Do not write review prose or Mastery.
4. If the stage is incomplete and the next stage depends on missing core behavior, keep it active and give one non-spoiling requirement reminder.
5. Otherwise mark it `completed` and reveal exactly one next follow-up.
6. If the candidate already implemented the follow-up behavior, store a short `adaptation` and reveal an explanation or trade-off question instead.
7. After the final active stage, set the attempt to `ready-for-review`, clear `activeStageId`, and tell the candidate that final review is available.
8. Run `npm run finalize:tasks` after changing session state.

## Skip or stop

- A skipped stage needs a concise `skipReason`.
- If the candidate stops but wants review, mark unrevealed or unfinished follow-ups skipped and set `ready-for-review`.
- If the candidate ends without review, mark the attempt `abandoned`, set `endedAt`, and preserve evidence.

## Hard rules

- Never reveal more than one locked follow-up.
- Do not expose silent checkpoint observations when they would spoil a later stage.
- Do not assign Mastery or write `review.md`.
- Do not edit the candidate implementation.
- Preserve one evolving `main.*` file throughout the session.
