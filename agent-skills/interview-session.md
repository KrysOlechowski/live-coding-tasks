# Interview Session

Use this skill for `$session`, `$interview-session`, starting or resuming an attempt, completing a stage, revealing the next follow-up, or ending an active interview session.

## Read first

- `codex/codex_interview_session.md` — source of truth
- `docs/data-contracts.md`
- the current task's `task.md`, `interviewer.md`, `session.json`, and working implementation

## Checklist

- Resolve only the current task and active attempt.
- Start or resume the active stage without revealing locked follow-ups.
- Persist every required interviewer question in `activeQuestion` before asking it.
- Never close a stage while `activeQuestion.status` is `pending`; silence is not a decline.
- Accept an explicit answer or explicit decline, record concise evidence, and clear the question only when its checkpoint is written.
- On stage completion, record one concise checkpoint.
- Reveal at most one applicable follow-up.
- Never edit candidate code, assign Mastery, or write `review.md`.
- Run `npm run finalize:tasks` after session-state changes.
