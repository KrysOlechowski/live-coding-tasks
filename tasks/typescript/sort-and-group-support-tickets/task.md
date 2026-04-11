# Sort and group support tickets

- Category: typescript
- Type: data transformation
- Difficulty: easy

## Focus areas

- sorting by multiple rules
- grouping UI data into sections
- handling optional and inconsistent fields safely

## Task

You are given a list of support tickets from an API.

Each ticket may contain:

- `id`
- `title`
- `priority`
- `status`
- optional `assignee`

Write a TypeScript function that prepares the tickets for rendering in the UI.

The function should:

- group tickets into these sections:
- `Open`
- `In Progress`
- `Closed`
- `Unknown`
- sort tickets inside each section by:
1. higher priority first
2. then alphabetically by title
- return a new UI-friendly structure without mutating the input

## Behavior rules

- status mapping:
- `"open"` -> `Open`
- `"in_progress"` and `"in-progress"` -> `In Progress`
- `"closed"` and `"done"` -> `Closed`
- anything else or missing -> `Unknown`
- priority mapping for sorting:
- `"high"` -> highest
- `"medium"` -> middle
- `"low"` -> lowest
- anything else or missing -> lowest
- `displayAssignee`:
- use trimmed assignee name if it exists and is non-empty
- otherwise use `"Unassigned"`

## Requirements

- use TypeScript
- create a function that transforms the raw input into grouped UI data
- handle missing or unexpected status, priority, and assignee safely
- sort each group with the required rules
- do not mutate the original input
- keep the solution interview-sized and easy to explain

## Optional edge cases

- `title` contains leading or trailing spaces
- `status` is uppercase, e.g. `"OPEN"`
- `priority` is unknown, e.g. `"urgent"`
- `assignee` is an empty string
- two tickets have the same priority and title
