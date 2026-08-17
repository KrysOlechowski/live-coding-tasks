# Interview Session

Use this skill for `$session`, `$interview-session`, starting or resuming an attempt, completing a stage, revealing the next follow-up, or ending an active interview session.

## Read first

- `codex/codex_interview_session.md` — source of truth
- `docs/data-contracts.md`
- the current task's `task.md`, `interviewer.md`, `session.json`, and working implementation

## Checklist

- Resolve only the current task and active attempt.
- Start or resume the active stage without revealing locked follow-ups.
- Ask only planned start/checkpoint questions, one at a time.
- Persist each shown question in `questions` and point `activeQuestionId` to the pending one.
- Never close a stage while a question is pending; silence is not a decline.
- Accept an explicit answer or decline, retain concise evidence, and continue automatically to the next question or checkpoint action.
- On stage completion, record one concise checkpoint.
- Reveal at most one applicable follow-up.
- Never edit candidate code, assign Mastery, or write `review.md`.
- Run `npm run finalize:tasks` after session-state changes.
