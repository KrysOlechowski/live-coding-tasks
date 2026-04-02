# Review

## Findings

1. [main.tsx:40](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-user-panel-state-and-effect-issues/main.tsx#L40) `users` is copied into `localUsers` state and then treated as a separate source of truth. If the parent re-fetches or changes `users`, this component will keep showing stale data because `localUsers` never resyncs.

2. [main.tsx:41](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-user-panel-state-and-effect-issues/main.tsx#L41) `selectedUser` is stored as a full object instead of being derived from an ID and the current user list. This can drift from `localUsers`, drift from incoming props, and become invalid when the selected user disappears or changes after a parent update.

3. [main.tsx:46](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-user-panel-state-and-effect-issues/main.tsx#L46) `filteredUsers` is stored separately even though it is fully derivable from `localUsers` and `search`. The current effect only depends on `search`, so filtered results go stale when `localUsers` changes, including after `toggleActive` or a future prop refresh.

4. [main.tsx:47](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-user-panel-state-and-effect-issues/main.tsx#L47) `headerText` is also derived state stored separately. That creates another source of truth and the current effect does not update it when the selected user changes in the ways the UI actually cares about.

5. [main.tsx:57](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-user-panel-state-and-effect-issues/main.tsx#L57) The `useEffect` dependency issue is broader than your comment suggests. Replacing `[search]` with only `[localUsers]` would still be wrong. The real problem is storing derived data in state here at all; if kept, both inputs would matter.

6. [main.tsx:64](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-user-panel-state-and-effect-issues/main.tsx#L64) The second effect depends on `selectedUserId`, but the rendered header depends on `selectedUser`. Your comment notices part of this, but the maintainability issue is larger: `headerText` should not need its own state in the first place.

7. [main.tsx:30](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_review-user-panel-state-and-effect-issues/main.tsx#L30) One user has no `name`, but the component renders `user.name` directly in the list and header. That can produce blank buttons or `"undefined (...)"`, which is a practical edge case from the task brief that your review did not call out.

## Assessment

Your review catches that both effects are suspicious, but it misses the most important architectural problems:

- copying props into local state
- storing derived values as separate state
- multiple inconsistent sources of truth for the same data
- stale behavior when props change after the initial render

Those are the core issues this exercise is meant to surface. Because several important review points were missed, this needs a penalty suffix.

## Notes

- The comment about `selectedUserId` in `App` is not a strong review point. Passing an explicit ID is fine; the real issue is how `UserPanel` manages that prop.
- A stronger review would prioritize the data-flow problems first, then explain the effect dependency bugs as symptoms of that design.
