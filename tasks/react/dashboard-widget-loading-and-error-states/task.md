---
title: Dashboard widget loading and error states
slug: dashboard-widget-loading-and-error-states
category: react
type: ui-state
difficulty: easy
penalty: 1
hasPreview: true
previewEntry: main.tsx
---

# Dashboard widget loading and error states

## Focus areas

- conditional rendering
- independent widget states
- clear loading / error / success UI

## Task

Build a small dashboard with three widgets. Each widget has its own local state and can be in one of these states: `loading`, `success`, or `error`.

Render the dashboard so that:

- each widget handles its own state independently
- one widget being in error does not block the others
- the UI stays clear and easy to understand

Use the simple mock data already defined in `main.tsx`. No real API calls are needed.

## Requirements

- render exactly three widgets
- each widget should display one of: loading, error, or success state
- keep the dashboard usable even if one widget is in error
- do not use one global status for the whole page
- keep the code interview-sized and easy to explain
- use React and TypeScript

## Optional edge cases

- two widgets are loading while one already failed
- a widget has success state but empty data
- error message is missing, so show a safe fallback message
