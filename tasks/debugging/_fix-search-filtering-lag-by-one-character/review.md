# Review

## Findings

1. [main.tsx:2](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/debugging/_fix-search-filtering-lag-by-one-character/main.tsx#L2) `useEffect` is imported but unused. This does not affect behavior, but it should be removed as cleanup.

## Assessment

The main fix is correct. Filtering is now derived directly from the latest `query` value, so the list no longer lags by one character.

The solution also matches the task well:

- the input remains controlled
- filtering uses the latest typed value
- the component stays small and easy to explain
- the case-insensitive behavior is preserved

## Notes

- Deriving `filteredItems` from `query` during render is a good fit here because it avoids synchronizing duplicate state.
