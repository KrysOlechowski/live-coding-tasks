# Review

## Findings

1. `displayName` is incorrect when `firstName` exists but `lastName` is missing or empty.
   In [main.ts](/Users/krystian/Documents/Projects/live-coding-tasks/tasks/typescript/_format-table-rows-from-partial-user-data_**/main.ts), `getDisplayName()` handles "no names" and "last name only", but not "first name only". That produces values like `"Ada undefined"` instead of `"Ada"`.

2. `statusLabel` does not handle differently-cased status values.
   The task explicitly mentions inputs like `"ACTIVE"`, but `getStatusLabel()` switches on the raw trimmed value. `"ACTIVE"` and `"INVITED"` therefore become `"Unknown"` instead of the expected mapped labels.

## Summary

The solution is close and the overall structure is readable, but two important requirement cases are still missing: single-part names and case-insensitive status normalization.
