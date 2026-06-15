# GPT New Task Template

## Purpose

Use this template to generate one realistic, self-contained live-coding interview task. The task should be frontend-oriented by default, interview-sized, and focused on one or two clear skills.

Do not include solution hints, starter code, solution code, pseudocode, or code snippets.

## Taxonomy

Use the repo taxonomy:

- `category`: technical domain.
- `taskType`: candidate activity or interview mode.
- `difficulty`: `easy`, `medium`, or `hard`.
- `problemShape`: inferred mental/problem pattern used to avoid repetition.

Allowed categories:

- `react`
- `typescript`
- `data-transformation`
- `algorithms`
- `async`
- `api-integration`
- `testing`
- `performance`

Allowed taskTypes:

- `build-from-requirements`
- `fix-bug`
- `refactor-existing-code`
- `complete-partial-implementation`
- `write-tests`
- `model-types`
- `handle-edge-cases`
- `optimize-performance`
- `review-and-improve`

Do not use `debugging` or `refactor` as categories.

## Output Format

Generate the task artifact exactly in this general shape:

```md
---
title: "..."
category: "react"
taskType: "fix-bug"
difficulty: "medium"
primarySkill: "..."
secondarySkill: "..."
problemShape: "..."
interviewFocus: "..."
reviewFocus:
  - "correctness"
  - "ui-behavior"
  - "edge-cases"
tags:
  - "react"
  - "state"
---

# Task Title

## Context

Short realistic context.

## Goal

Clear goal for the candidate.

## Requirements

Specific, reviewable requirements.

## Constraints

Only include if useful.

## Non-goals

Only include if useful.

## Acceptance Criteria

Reviewable acceptance criteria.
```

Frontmatter should include exactly these workflow fields:

- `title`
- `category`
- `taskType`
- `difficulty`
- `primarySkill`
- `secondarySkill`
- `problemShape`
- `interviewFocus`
- `reviewFocus`
- `tags`

## Content Rules

- Output only the task artifact, with no explanation before or after it, unless the user explicitly asks for discussion.
- Make the task brief self-contained.
- Keep the task realistic, interview-sized, and suitable for manual live-coding practice.
- Practice one or two clear interview skills, not a large project.
- State important behavior explicitly in `Requirements`.
- Include constraints when they clarify implementation boundaries.
- Include non-goals when they prevent scope creep.
- Include reviewable acceptance criteria.
- For React/UI tasks, include visible behavior, user interactions, and important UI states.
- For non-UI tasks, include clear input/output expectations when relevant.
- Use `focus` from the user as a soft direction.
- Use `avoid` and `gpt_topics.md` to avoid repeated topics, domains, problem shapes, or task styles.
- Do not include `focus` or `avoid` as frontmatter fields. They are request parameters only.
- Use `reviewFocus` values that match the task, such as `correctness`, `edge-cases`, `type-safety`, `readability`, `ui-behavior`, `async-safety`, `performance`, or `test-coverage`.
- Prefer underused categories, taskTypes, and problemShapes.

## Quality Check

Before returning the task artifact, verify that:

- the selected `category` matches the actual technical domain
- the selected `taskType` matches the candidate activity
- the `problemShape` is specific enough to help avoid repetition
- the task does not reveal an implementation strategy
- the acceptance criteria are reviewable
- the task can be solved as a focused live-coding exercise
