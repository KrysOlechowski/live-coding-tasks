---
title: Normalize profile completion badge
slug: normalize-profile-completion-badge
category: typescript
type: data-transformation
difficulty: easy
penalty: 0
hasPreview: false
---

# Normalize profile completion badge

## Focus areas

- deriving UI values from partial data
- handling optional fields safely
- writing clear business rules in TypeScript

## Task

You are given a list of user profiles from an API.

Each profile may contain incomplete data.

Write a TypeScript function that transforms each profile into a UI-friendly shape with these fields:

- `id`
- `displayName`
- `completionLabel`
- `isComplete`

Use these rules:

- `displayName`:
- use the trimmed name if it exists and is non-empty
- otherwise use `"Unnamed user"`
- `isComplete` is `true` only if:
- `name` exists and is non-empty after trimming
- `email` exists and is non-empty after trimming
- `role` is one of: `"admin"`, `"editor"`, `"viewer"`
- `completionLabel`:
- `"Complete"` if `isComplete === true`
- `"Incomplete"` otherwise

Return a new array and do not mutate the input.

## Requirements

- use TypeScript
- create a function that transforms the raw input into a UI-friendly array
- handle missing or empty string fields safely
- handle unexpected role values safely
- do not mutate the original input
- keep the solution interview-sized and easy to explain

## Optional edge cases

- `name` contains only spaces
- `email` is an empty string
- `role` is uppercase, e.g. `"ADMIN"`
- `role` is `"guest"`
- multiple profiles are incomplete for different reasons
