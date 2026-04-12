# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: no blocker; the implementation satisfies the required unread-count, per-item update, and conditional rendering behavior.

## Weaknesses

- No significant weaknesses for this task. The only small cleanup point is that the TODO comments at `main.tsx:20` and `main.tsx:26` no longer match the implemented code, which adds a bit of noise in a finished solution.

## Strengths

- `main.tsx:21` derives the unread count directly from state instead of storing duplicate state, which is the right fit for this task.
- `main.tsx:28` updates only the clicked notification and preserves immutability by returning a new object only for the matching item.
- `main.tsx:48` keeps the original list order and correctly swaps the unread button for the `Read` label once an item is marked as read.

## Missed edge cases

- None beyond the optional cases. The current rendering also behaves sensibly for an empty list and for an all-read list.

## What a stronger candidate would improve

- Remove stale scaffold TODO comments so the final submission reads as intentional finished code.
- Optionally simplify `main.tsx:21` from an explicit `filter` callback body to a shorter boolean predicate for slightly cleaner signal in an interview.

## Main learning takeaway

- For simple UI-state tasks, the strongest solution is usually derived state plus one precise immutable update path, without introducing extra state or abstractions.

## Suggested next step

- Do one final cleanup pass after the logic works: remove stale scaffold comments and tighten any now-obvious expressions.

## Follow-up questions

- Why is `unreadCount` better as derived state than as its own `useState` value here?
- How would you prevent unnecessary object creation if the user clicks `Mark as read` on an item that is already read?
- If the notification row became more complex, when would you consider extracting it into a separate component?

## Final verdict

Correct solution. The required behavior is implemented cleanly, the state updates are immutable, and the remaining feedback is only minor cleanup rather than a logic issue.
