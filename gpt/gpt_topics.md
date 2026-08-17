# GPT Task History

Use this file to avoid repetitive live-coding tasks. When available, ChatGPT should check the history before generating a new task and prefer underused categories, taskTypes, and problemShapes.

Codex should update this file during task scaffolding and review. The user should not need to maintain it manually.

## Repetition Guard Rules

- Do not repeat the same `problemShape` too soon unless explicitly requested.
- Avoid too many tasks with the same `category + taskType` combination.
- Avoid repeated simple grouping, counting, deduplication, filtering, or mapping tasks.
- Prefer underused categories, taskTypes, and problemShapes.
- Use optional `focus` and `avoid` when provided by the user.

## Status Values

- `generated`: task brief exists and Codex scaffold has been created.
- `reviewed`: Codex review has been saved.
- `solved`: optional/manual status if the user wants to mark a solved task before review.

## Task History

### Reviewed

#### fix-cart-summary-state
- Category: react
- Task type: fix-bug
- Difficulty: medium
- Primary skill: Keep derived cart summary data consistent with React state
- Problem shape: Repair duplicated derived state that falls behind its source state
- Notes: Reviewed solution derives the order summary from cartItems and completes the Add two follow-up; next improvement is making mutation helpers robust to composed previous-state updates.
