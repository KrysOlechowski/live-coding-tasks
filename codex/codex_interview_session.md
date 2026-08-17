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
3. If `activeQuestion.status` is `pending`, repeat that exact question and explicitly say that the candidate must answer or decline before the stage can close.
4. If it is already `in-progress` without a pending question, resume its `activeStageId` without revealing locked stages.
5. If it is `ready-for-review`, direct the candidate to final review.
6. If it is `reviewed`, offer reset only when the user asks to repeat the task.

## Ask and resolve a checkpoint question

Use at most one active interviewer question at a time.

Before asking a required checkpoint, explanation, or adapted trade-off question:

1. write it to `activeQuestion` with the current `stageId`, exact short `prompt`, current `askedAt`, status `pending`, and null resolution fields;
2. run `npm run finalize:tasks`;
3. tell the candidate clearly: “Answer this question now, or explicitly say that you decline. The stage will remain active until one of those happens.”

When the candidate answers, change the question to `answered`, set `resolvedAt`, and store one concise evidence sentence rather than the full response. When the candidate explicitly declines, use `declined` and record that choice. Run finalization after either state change.

Do not interpret silence, immediate coding, a later completion command, or a topic change as a decline. If the conversation resumes elsewhere, `activeQuestion` is the source of truth.

## Complete a stage

When the candidate says the current stage is finished:

1. If `activeQuestion.status` is `pending`, keep the stage active, repeat the question, and stop. Do not create a checkpoint or silently record missing evidence.
2. If the interviewer plan requires question evidence but `activeQuestion` is null because no question was asked, create and ask it now instead of closing the stage.
3. Inspect the candidate brief, current stage, implementation, and relevant tests.
4. Record a concise checkpoint with `passed`, `passed-with-issues`, or `incomplete`.
5. If `activeQuestion` is `answered` or `declined`, incorporate its concise evidence into the checkpoint and then clear `activeQuestion`.
6. Store only observations and topic evidence useful for the final review. Do not write review prose or Mastery.
7. If the stage is incomplete and the next stage depends on missing core behavior, keep it active and give one non-spoiling requirement reminder.
8. Otherwise mark it `completed` and reveal exactly one next follow-up.
9. If the candidate already implemented the follow-up behavior, store a short `adaptation` and reveal an explanation or trade-off question instead. Persist that adapted question in `activeQuestion` before showing it.
10. After the final active stage, set the attempt to `ready-for-review`, clear `activeStageId`, require `activeQuestion` to be null, and tell the candidate that final review is available.
11. Run `npm run finalize:tasks` after changing session state.

## Skip or stop

- A skipped stage needs a concise `skipReason`.
- If the candidate stops but wants review, mark unrevealed or unfinished follow-ups skipped and set `ready-for-review`.
- If the candidate ends without review, mark the attempt `abandoned`, set `endedAt`, and preserve evidence.

## Hard rules

- Never reveal more than one locked follow-up.
- Never complete a stage or penalize the candidate while an active question is merely unanswered.
- Do not expose silent checkpoint observations when they would spoil a later stage.
- Do not assign Mastery or write `review.md`.
- Do not edit the candidate implementation.
- Preserve one evolving `main.*` file throughout the session.
