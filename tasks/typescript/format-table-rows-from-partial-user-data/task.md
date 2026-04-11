---
title: Format table rows from partial user data
slug: format-table-rows-from-partial-user-data
category: typescript
type: data-transformation
difficulty: easy
penalty: 2
hasPreview: false
---

# Format table rows from partial user data

## Focus areas

- optional field handling
- deriving UI-friendly values
- keeping transformation logic readable

## Task

You are given a list of users from an API. Some fields may be missing or partially filled.

Write a TypeScript function that converts each user into a table row shape for the UI.

For each user, derive:

- `id`
- `displayName`
- `displayEmail`
- `statusLabel`
- `isContactable`

Use these rules:

- `displayName`:
- use `"firstName lastName"` if at least one meaningful part exists
- if both are missing or empty, use `"Unknown user"`
- `displayEmail`:
- use the trimmed email if it is non-empty
- otherwise use `"No email"`
- `statusLabel`:
- `"active"` -> `"Active"`
- `"invited"` -> `"Invited"`
- `"disabled"` -> `"Disabled"`
- anything else or missing -> `"Unknown"`
- `isContactable`:
- `true` only if the user is `"active"` and has a real email

Return a new array and do not mutate the input.

## Requirements

- use TypeScript
- create a function that transforms the input into a UI-friendly array
- handle missing or empty string fields safely
- do not mutate the original input
- keep the solution interview-sized and easy to explain

## Optional edge cases

- `firstName` contains only spaces
- `lastName` is missing
- `email` is an empty string
- `status` is uppercase, e.g. `"ACTIVE"`
- both name fields are missing
