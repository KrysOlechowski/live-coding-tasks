# Review

## Findings

1. `main.tsx:11-29` / `main.tsx:58-67`
   The task asks for each widget to have its own local state, but the implementation renders a single static `widgets` array and never creates per-widget React state. The UI shows different statuses, but the state management requirement itself is still missing.

## Notes

- The conditional rendering is straightforward and easy to follow.
- The dashboard still renders all three widgets independently, so one error does not block the others.
- Optional edge cases are not fully handled yet. In particular, success with empty data is still unaddressed, and the error fallback message is very minimal.

## Penalty

`_*` because one important requirement is still missing.
