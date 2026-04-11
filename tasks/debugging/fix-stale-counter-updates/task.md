---
title: Fix stale counter updates
slug: fix-stale-counter-updates
category: debugging
type: bug-fix
difficulty: easy
penalty: 0
hasPreview: true
previewEntry: main.tsx
---

# Fix stale counter updates

## Focus areas

- React state updates
- stale closures
- debugging event handler logic

## Task

You are given a small React component with:

- a counter value
- an Increment twice button
- a Decrement twice button

Right now, clicking either button changes the counter by only 1 instead of 2.

Fix the bug so that each button correctly updates the counter by 2.

Keep the component small and easy to explain.

## Requirements

- use React and TypeScript
- fix the bug without rewriting the whole component
- Increment twice should increase the value by 2
- Decrement twice should decrease the value by 2
- keep the solution interview-sized and easy to explain

## Optional edge cases

- user clicks buttons very quickly
- updates are batched
- a future version adds more repeated updates in one handler
