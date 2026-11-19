## Expected behavior

The displayed products and count agree with the current search and category after every interaction. Search is trimmed, case-insensitive name matching; category and search combine. Reset restores the initial view in one click.

## Important cases

- First filter change, successive category changes, and successive search edits.
- Combined filters in either interaction order, including zero matches.
- Clearing search while retaining a category, switching back to All categories, and repeated resets.
- Product order and source data remain unchanged.

## Review focus

- Observable correctness against the acceptance criteria.
- A clear state model that keeps controls, list, count, and empty state consistent.
- Readable, local changes with no new dependencies or unrelated UI work.

Easy scope: one component, synchronous local data, and two familiar filters; no async behavior or performance requirements.
