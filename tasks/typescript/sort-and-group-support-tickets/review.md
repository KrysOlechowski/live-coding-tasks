# Review

## Findings

1. `groupSupportTickets()` never returns the grouped UI data, so the task is still unsolved.
   In [main.ts](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/typescript/sort-and-group-support-tickets/main.ts), you correctly started building `groupedByStatus` and sorting each section, but the function still ends with `return []`. That means none of the work is exposed in the required `GroupedTickets[]` output.

2. `input.map()` is being used only for side effects.
   This is not a correctness bug by itself, but in [main.ts](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/typescript/sort-and-group-support-tickets/main.ts), `map()` is used only to push into `groupedByStatus`. `forEach()` would communicate the intent more clearly because you are not using the returned mapped array.

## Summary

The normalization and per-section sorting direction are on the right track, but the core function still returns an empty result, so the task is not completed yet.
