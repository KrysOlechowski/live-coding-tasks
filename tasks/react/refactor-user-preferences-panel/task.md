---
title: "Refactor User Preferences Panel"
category: "react"
taskType: "refactor-existing-code"
difficulty: "medium"
hasPreview: "true"
previewEntry: "main.tsx"
primarySkill: "Simplifying React component state and rendering logic"
secondarySkill: "Preserving UI behavior while improving readability"
problemShape: "state-and-rendering-simplification"
interviewFocus: "Refactor a working but messy React component without changing its visible behavior"
reviewFocus:
  - "readability"
  - "correctness"
  - "ui-behavior"
  - "state-management"
  - "edge-cases"
tags:
  - "react"
  - "refactor"
  - "state"
  - "derived-state"
  - "conditional-rendering"
---

# Refactor User Preferences Panel

## Context

You are working on a React settings screen for a small SaaS admin app.

The existing `UserPreferencesPanel` component works, but it has become difficult to maintain. It contains too many local state variables, repeated conditional rendering, duplicated labels, and UI branches that are hard to reason about.

Your task is to refactor the existing implementation while preserving the current user-facing behavior.

## Goal

Improve the structure, readability, and maintainability of the preferences panel without changing what the user can see or do.

## Requirements

- The panel must allow the user to edit notification preferences.
- The panel must allow the user to edit display preferences.
- The panel must show whether there are unsaved changes.
- The user must be able to reset changes back to the original preferences.
- The user must be able to save changes.
- The save action must only be available when there are unsaved changes.
- The reset action must only be available when there are unsaved changes.
- The UI must clearly show when saving is in progress.
- The UI must show a success message after saving succeeds.
- The UI must show an error message after saving fails.
- Changing any preference after a success or error message must clear the old message.
- The refactor should reduce duplicated rendering logic.
- The refactor should avoid storing values in state when they can be derived from existing state.
- The refactor should make the main component easier to scan and explain.

## Constraints

- Do not change the visible behavior of the panel.
- Do not remove existing preferences or actions.
- Do not introduce external state-management libraries.
- Do not rewrite the screen as a completely different feature.
- Do not change the public API of helper functions unless the starter code is internally inconsistent.
- Keep the solution appropriate for a focused live-coding task.

## Non-goals

- Adding new preference categories.
- Adding form validation beyond what already exists.
- Adding routing.
- Adding backend persistence.
- Adding animations or visual redesign.
- Adding a full form library.

## Acceptance Criteria

- Existing preference controls still work correctly.
- Unsaved changes are detected correctly.
- Save is disabled when there are no changes.
- Reset is disabled when there are no changes.
- Reset restores the original preferences.
- Saving shows a loading state.
- Successful save shows a success message.
- Failed save shows an error message.
- Editing after success or error clears the old message.
- The component has less duplicated JSX and less unnecessary state than before.
- The final code is easier to read, review, and explain during an interview.
