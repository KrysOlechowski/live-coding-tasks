# Review

## Findings

1. `main.tsx:53-55`
   The stale-data issue is avoided by always resetting the selection to `users[0]` whenever the list changes. That breaks a required behavior: the app should keep the current selection when that user still exists in the refreshed list, and only update the details to the fresh version of that same user.

## Notes

- The details panel will now show refreshed object data instead of a stale object reference.
- The implementation stays small and does not rely on a full page reload.
- The empty-list and removed-user cases are not handled explicitly, but the rendered fallback still prevents a crash in the details panel.

## Penalty

Recommended `penalty: 1` because one important requirement is still missing.
