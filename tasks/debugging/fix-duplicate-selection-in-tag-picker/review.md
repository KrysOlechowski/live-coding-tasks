# Review

## Findings

No material issues found.

## Assessment

The fix correctly removes the duplicate-add behavior and restores predictable toggle behavior:

- unselected tags are added
- selected tags are removed
- the state array is updated immutably

The solution also stays small and interview-appropriate.

## Notes

- This is easy to explain in an interview because the toggle logic is still local and straightforward.
- A functional state update could make the handler more defensive against future changes that trigger multiple updates from the same stale closure, but the current solution satisfies the task as written.
