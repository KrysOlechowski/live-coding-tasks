---
title: "Fix project member role updates"
category: "data-transformation"
taskType: "fix-bug"
difficulty: "medium"
primarySkill: "Apply an immutable update across nested shared references"
secondarySkill: "Use reference identity deliberately for changed and unchanged data"
problemShape: "nested-immutable-update-with-structural-sharing"
interviewFocus: "Reference identity, aliasing, and targeted immutable updates"
reviewFocus:
  - "correctness"
  - "edge-cases"
  - "readability"
  - "maintainability"
tags:
  - "typescript"
  - "immutable-data"
  - "reference-equality"
  - "structural-sharing"
---

# Fix project member role updates

## Context

A project store keeps a list of members. Other parts of the application may still hold references to the original list and its nested objects.

`updateMemberRole` should return an updated result, but the current implementation also changes data owned by the caller. It additionally creates a new array even when the requested member does not exist, which makes change detection report an update that never happened.

## Goal

Fix `updateMemberRole` so it performs a targeted immutable update and uses reference identity consistently to represent what actually changed.

## Requirements

- When the member exists, return a new members array.
- Update only that member's `role` and append one entry to `roleHistory`.
- Do not mutate the input array, the original member, or its original `roleHistory` array.
- Create new references for the updated member and its changed `roleHistory`.
- Preserve the original `profile` reference because the profile is unchanged.
- Preserve the original object references for all unaffected members.
- When `memberId` is not found, return the original members array reference unchanged.
- Keep the supplied public types and function signature.

## Constraints

- Do not deep-clone the complete collection.
- Do not use JSON serialization as a cloning mechanism.
- Do not mutate first and restore the original data afterward.

## Acceptance Criteria

- The included update changes Alice's role to `admin` only in the returned result.
- Alice receives exactly one new role-history entry with the supplied role and timestamp.
- The source member and its original history remain unchanged.
- The updated Alice object and history have new references.
- Alice's unchanged profile and the unaffected Bob object retain their original references.
- An unknown member ID returns the exact original array reference.
