# Review Task

Use this skill automatically when the user asks to review a solution, check an implementation, or evaluate a completed task. The user does not need to name the skill.

## Read first

- `codex/codex_review_workflow.md` — source of truth for the full workflow
- `codex/review_rubric.md`
- the current task's `task.md`
- the current `main.ts` or `main.tsx`

## Checklist

- Inspect only the current task and shared workflow/tracking files.
- Do not modify, solve, or patch solution files.
- Compare the implementation with the actual requirements and frontmatter review focus.
- Create or replace `review.md` using `codex/codex_review_workflow.md`.
- Include the required evidence-based Mastery section and concrete `path:line` references.
- Update `gpt/gpt_topics.md`.
- Run `npm run finalize:tasks` and fix workflow-file failures before finishing.
- Run `npm run build` when the review workflow, TypeScript changes, preview/app code, or validation risk makes it useful.
- Keep Suggested Git Name in the final chat response only; never save it in `review.md`.

## Final response

Include:

- the main finding
- Mastery level
- confirmation that `review.md` was saved
- commands that passed
- Suggested Git Name in the required chat-only format
