# Review workflow

Review the selected solution against the actual brief, private evaluation criteria, taskType, difficulty, and reviewFocus. No session, questions, or completion ceremony is required.

Read working files and relevant existing tests. Verify behavior through focused examples or checks where needed. Clearly distinguish checks performed from conclusions based only on code inspection. Do not run a full app build for a pure utility review unless a concrete risk warrants it.

Write only `review.md`, following `docs/contracts/review.md`, then run `npm run finalize:tasks`. Do not edit the candidate's solution unless explicitly requested. Replace the previous review; do not append a conversation or attempt history.

Use five sections:

- Result: whether all explicit requirements are met, plus meaningful validation evidence or limits.
- Mastery: the 1–5 rating and one task-specific reason.
- Findings: prioritize 1–3 material issues; include all blockers if more exist. For each, include `path:line`, affected behavior, cause, a small failing scenario when useful, and a short improvement direction. Label requirement failures, quality issues, and optional improvements distinctly. Say no material issues when appropriate.
- Strengths: 1–2 concrete good decisions.
- Next step: one practical next action and one reusable takeaway, which may share a short paragraph.

Do not repeat the same finding across sections. Do not manufacture weaknesses, teach unrelated basics, add mandatory follow-up questions, or paste a full solution. Correct behavior plus optional polish remains a `yes` verdict.

Mastery labels: 1 Needs another pass; 2 Partially working; 3 Mostly working; 4 Interview-ready; 5 Strong solution. Calibrate to actual correctness and quality. Optional polish alone does not force a lower rating. Do not infer independent understanding from code alone or from help in another chat.

Record only topics actually assessed. `needs-practice` identifies a concrete unresolved gap; `improving` needs observable earlier evidence of progress and a remaining weakness; `demonstrated` means correct application in this task. A missing assessment is not a negative signal. Keep evidence specific and short. The script aggregates these explicit judgments; it does not interpret prose or infer concepts.

Finish with the main finding, Mastery, a link to the saved review, and checks performed. Keep the chat answer short.

End the chat response with a suggested Git commit message in a copyable text block, using the repository convention `tasks/<category>/<stable-slug>` (for example, `tasks/react/selectable-product-table`). Derive both parts from the reviewed task. Keep this suggestion out of `review.md`; suggesting a message does not authorize running Git commit or staging files.
