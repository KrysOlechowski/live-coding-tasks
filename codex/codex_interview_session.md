# Codex Interview Session Workflow

## Purpose

Run Core Task and follow-up stages without exposing future requirements. Ask
valuable questions only at stage start and checkpoint, and store compact evidence
in `session.json`; do not perform the final review here.

## Read first

- current task's `task.md`
- current task's `interviewer.md`
- current task's `session.json`
- current task's working implementation
- `docs/data-contracts.md`

Do not inspect unrelated task folders.

## Question principles

- Use the planned questions in `interviewer.md` in declared order.
- Ask at most one question at a time.
- Two questions per timing is a target, not a quota; a plan may contain fewer
  only when omitted questions would be leading, repetitive, or low-value.
- Start questions diagnose reasoning without naming the intended solution.
- Checkpoint questions may use counterexamples, transfer, or teaching value.
- A teaching question outside declared topics cannot reduce the requirement
  verdict or Mastery.
- Full responses are never stored. Store one concise evidence sentence.

## Start or resume

1. Resolve the active attempt from `activeAttemptId`.
2. If its status is `ready`, change it to `in-progress`, set `startedAt`, and
   change the Core stage from `available` to `in-progress`.
3. If `activeQuestionId` references a pending question, repeat that exact prompt
   and say that the candidate must answer or decline before continuing.
4. Otherwise, find the first planned `start` question for the active stage that
   is not yet present in `questions`. Append it as pending, set
   `activeQuestionId`, finalize, and ask it.
5. When all start questions are resolved, tell the candidate to work on the
   active implementation without revealing locked stages.
6. If the attempt is `ready-for-review`, direct the candidate to final review.
7. If it is `reviewed`, offer reset only when the user asks to repeat the task.

## Ask a question

Before showing a planned question, append this compact record to `questions`:

- exact interviewer question ID, stage, timing, kind, topic, and prompt;
- `source: "planned"`;
- current UTC `askedAt`;
- `status: "pending"` with null resolution fields.

Set `activeQuestionId` to that ID and run `npm run finalize:tasks`. For a dynamic
adaptation, use `source: "adapted"`, an ID ending in `-adapted-1`, and a prompt
equal to the stage's `adaptation`.

Tell the candidate clearly: “Answer this question now, or explicitly say that
you decline. The session will wait until one of those happens.”

## Resolve a question

When the candidate answers:

1. change the active question to `answered`;
2. set `resolvedAt` and one concise evidence sentence;
3. clear `activeQuestionId`;
4. run finalization;
5. if another question exists for the current timing, append and ask it;
6. if the stage is `checkpoint` and no checkpoint question remains, complete
   the stage automatically;
7. otherwise tell the candidate to continue implementation.

An explicit refusal uses `declined` and records that choice. Silence, immediate
coding, a later completion command, or a topic change is never a decline.

## Request and complete a checkpoint

When the candidate says the current stage is finished:

1. If a question is pending, repeat it and stop.
2. Change the active stage to `checkpoint`.
3. Ask the first planned checkpoint question not yet present in the history.
4. Resolve checkpoint questions one at a time. After the final resolution,
   inspect the candidate brief, current stage, implementation, and relevant
   checks without requiring another completion command.
5. Record one concise checkpoint with `passed`, `passed-with-issues`, or
   `incomplete`. Use question evidence contextually; do not copy full answers.
6. If required behavior remains incomplete, return the stage to `in-progress`
   and give one non-spoiling requirement reminder.
7. Otherwise mark it `completed` and reveal exactly one next follow-up.
8. Set the next stage to `in-progress` and ask its first valuable start question
   after revealing the requirement.
9. If the candidate already implemented the follow-up behavior, store a short
   `adaptation`, set the stage to `checkpoint`, and ask one adapted explanation
   or trade-off question instead.
10. After the final stage, set the attempt to `ready-for-review`, clear
    `activeStageId`, require `activeQuestionId` to be null, and tell the candidate
    that final review is available.
11. Run `npm run finalize:tasks` after every session-state change.

## Skip or stop

- A skipped stage needs a concise `skipReason`.
- If the candidate stops but wants review, resolve or explicitly decline any
  pending question, mark unfinished stages skipped, and set `ready-for-review`.
- If the candidate ends without review, mark the attempt `abandoned`, set
  `endedAt`, clear `activeQuestionId`, and preserve compact evidence.

## Hard rules

- Never reveal more than one locked follow-up.
- Never ask questions during coding unless the candidate explicitly invokes
  coaching.
- Never complete a stage while a question is pending.
- Never treat silence as negative evidence.
- Do not expose checkpoint observations when they would spoil a later stage.
- Do not assign Mastery or write `review.md`.
- Do not edit the candidate implementation.
- Preserve one evolving candidate implementation throughout the attempt.
