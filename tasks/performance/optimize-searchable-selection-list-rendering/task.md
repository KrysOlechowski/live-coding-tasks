---
title: "Optimize Searchable Selection List Rendering"
category: "performance"
taskType: "optimize-performance"
difficulty: "medium"
hasPreview: "true"
previewEntry: "main.tsx"
primarySkill: "Reducing unnecessary React rerenders in interactive lists"
secondarySkill: "Keeping derived data and selection state predictable"
problemShape: "unnecessary-rerender-isolation"
interviewFocus: "Identify and reduce avoidable rerenders while preserving visible behavior"
reviewFocus:
  - "performance"
  - "correctness"
  - "ui-behavior"
  - "readability"
tags:
  - "react"
  - "performance"
  - "rerenders"
  - "state"
  - "derived-data"
---

# Optimize Searchable Selection List Rendering

## Context

You are working on a small admin-style React screen used to review and select customer records before exporting them.

The current implementation works functionally, but it becomes noticeably sluggish when the list contains many items. Typing in the search input, toggling one customer, or changing the “show selected only” option causes more rendering work than necessary.

Your task is to improve the performance of the screen without changing the user-facing behavior.

## Goal

Optimize the searchable customer selection list so that common interactions avoid unnecessary rerenders and expensive recalculations, while keeping the code readable and maintainable.

## Requirements

- The screen must display a list of customers.
- Each customer row must show:
  - customer name
  - email
  - status
  - whether the customer is selected
- The user must be able to search customers by name or email.
- The user must be able to toggle individual customers as selected or unselected.
- The user must be able to switch between:
  - all matching customers
  - only selected matching customers
- The UI must show a selected count.
- The selected count must stay correct after:
  - searching
  - toggling a row
  - enabling or disabling “show selected only”
- Toggling one customer should not cause every visible customer row to rerender unnecessarily.
- Derived list data should not be recalculated more often than needed.
- Optimization should not make the component structure harder to understand than the original version.

## Constraints

- Do not change the visible behavior of the screen.
- Do not remove existing features.
- Do not introduce external state-management libraries.
- Do not virtualize the list.
- Do not solve the problem by hiding rendering issues behind artificial delays or debouncing only.
- Keep the solution appropriate for a live-coding interview-sized React task.

## Non-goals

- Building a full data table system.
- Adding pagination.
- Adding server-side search.
- Adding animations or visual redesign.
- Creating a benchmark suite.

## Acceptance Criteria

- Searching still filters customers by name or email.
- Selecting and unselecting customers works correctly.
- “Show selected only” works together with search.
- The selected count is always accurate.
- Rendering is improved so that toggling one row does not rerender every row unnecessarily.
- Expensive derived data is computed only when its actual inputs change.
- The final code remains easy to explain during an interview.
