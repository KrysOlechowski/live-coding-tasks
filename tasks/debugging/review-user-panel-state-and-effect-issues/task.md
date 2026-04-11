---
title: Review user panel state and effect issues
slug: review-user-panel-state-and-effect-issues
category: debugging
type: debugging
difficulty: easy
penalty: 2
hasPreview: true
previewEntry: main.tsx
---

# Review user panel state and effect issues

## Focus areas

- copied props into local state
- derived state stored separately
- inconsistent sources of truth
- incorrect useEffect usage
- maintainability in React components

## Task

This is a React + TypeScript code review exercise.

You are given a small user panel component. Your job is not to add features. Your job is to review the code, identify important issues, prioritize them, and suggest improvements.

The component is intended to be realistic for a long-lived frontend codebase. It contains a few meaningful problems related to state, effects, and maintainability.

In the review discussion, focus on:

- correctness
- stale or inconsistent state
- maintainability
- effect logic
- what may break when props change

## Requirements

- use React and TypeScript
- review the code rather than re-implementing the component from scratch
- identify meaningful issues that matter in practice
- prioritize the most important problems over minor details
- explain likely consequences when props or data change
- suggest improvements that would make the component safer and easier to maintain

## Optional edge cases

- `users` prop changes after initial render
- `selectedUserId` no longer matches any user
- a user has no name
- filtered or derived values become stale after prop changes

## Interviewer notes

This exercise is meant to test whether the candidate can:

- read code under time pressure
- spot practical React problems
- explain consequences instead of only naming issues
- reason about stale state and multiple sources of truth

Possible follow-up questions:

- Which issue is the most serious and why?
- What would you derive during render instead of storing in state?
- How would this behave after a re-fetch from the parent?
- Would you remove local state entirely or keep part of it?
