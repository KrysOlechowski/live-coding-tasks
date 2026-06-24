# Task Review

## Requirement check

- Meets the task requirements: partially
- Most important missing or incorrect behavior: the UI behavior works and row rerenders are mostly isolated, but the expensive visible-list derivation still depends on selection state even when “Show selected only” is off.

## Mastery

Level: 3/5 — Mostly working

Reason: The solution preserves the visible behavior and uses the right React tools for row isolation, but one central performance requirement is still only partially met.

## Weaknesses

- `tasks/performance/optimize-searchable-selection-list-rendering/main.tsx:102` recalculates the full search/filter/sort pipeline whenever `selectedCustomerIdsSet` changes. When “Show selected only” is disabled, toggling a customer should not require recomputing the expensive matching/sorting work because selected state does not affect the visible list.
- `tasks/performance/optimize-searchable-selection-list-rendering/main.tsx:102` mixes search matching, selected-only filtering, and sorting into one memoized derivation. This works, but it makes the dependency boundary less precise than it could be for a performance-focused task.

## Strengths

- `tasks/performance/optimize-searchable-selection-list-rendering/main.tsx:60` wraps `CustomerRow` in `memo`, which lets unchanged rows skip rerendering when their props stay the same.
- `tasks/performance/optimize-searchable-selection-list-rendering/main.tsx:120` uses a stable `handleToggle` callback with a functional state update, avoiding stale state and avoiding a changing callback prop.
- `tasks/performance/optimize-searchable-selection-list-rendering/main.tsx:97` derives a `Set` from selected IDs, making repeated selected-state lookups clearer and cheaper than repeated array scans.
- `tasks/performance/optimize-searchable-selection-list-rendering/main.tsx:142` keeps the selected count simple and correct by reading `selectedCustomerIds.length`.

## Missed edge cases

- none

## What a stronger candidate would improve

- Split the derived data into smaller memoized pieces: one memo for search/sort results that depends only on the query, and a cheaper selected-only filtering step that depends on selected state only when that mode matters.

## Main learning takeaway

- Memoization is strongest when each derived value has the narrowest accurate dependency list; otherwise the code can still recompute expensive work on unrelated state changes.

## Suggested next step

- Separate the query-based matching/sorting from the selected-only filtering so toggling a row does not rerun the expensive search/sort path while showing all customers.

## Follow-up questions

- How would you prove that only the toggled row rerenders after this change?
- How would you restructure the derived data so search/sort and selected-only filtering have separate dependencies?
- At what point would you consider virtualization, and why is it intentionally out of scope for this task?

## Final verdict

The solution is functionally correct and meaningfully improved from the scaffold. It is not fully complete for the performance goal because expensive derived list work still reruns more often than necessary.
