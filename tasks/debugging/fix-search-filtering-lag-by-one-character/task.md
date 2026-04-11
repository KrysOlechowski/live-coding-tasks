---
title: Fix search filtering lag by one character
slug: fix-search-filtering-lag-by-one-character
category: debugging
type: bug-fix
difficulty: easy
penalty: 0
hasPreview: true
previewEntry: main.tsx
---

# Fix search filtering lag by one character

## Focus areas

- controlled inputs
- React state timing
- debugging derived filtered state

## Task

You are given a small React component with:

- a search input
- a list of items
- filtering logic that should update as the user types

Right now, the filtered list lags by one character.
For example, when the user types "rea", the UI still shows results for "re".

Fix the bug so that filtering always uses the latest input value.

Keep the solution small and easy to explain.

## Requirements

- use React and TypeScript
- fix the bug without rewriting the whole component
- filtering should always use the latest typed value
- keep the input controlled
- keep the solution interview-sized and easy to explain

## Optional edge cases

- the input is cleared back to an empty string
- the user types very quickly
- the filtering is case-insensitive
- the list contains items with leading or trailing spaces
