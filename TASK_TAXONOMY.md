# Task Taxonomy

This is the source of truth for live-coding task taxonomy. It defines how task briefs should describe the interview exercise without encoding review outcome or implementation details into folder names.

## Core Model

- `category`: technical domain being practiced.
- `taskType`: candidate activity or interview mode.
- `difficulty`: expected interview difficulty: `easy`, `medium`, or `hard`.
- `problemShape`: inferred mental pattern used to vary tasks and avoid repetition.
- `interviewFocus`: concise statement of what the interview is testing.
- `reviewFocus`: checklist of qualities Codex should prioritize during review.

The normal user request needs only:

```txt
Task:
category: react
taskType: fix-bug
difficulty: medium
focus: optional soft direction
avoid: optional repetition blocker
```

Short form is also valid:

```txt
Task: react / fix-bug / medium
```

`focus` and `avoid` are optional inputs. They influence generation but are not task frontmatter fields.

## Categories

- `react`: UI behavior, component state, rendering logic, events, forms, derived UI state, and interactions.
- `typescript`: TypeScript itself: function signatures, generics, utility types, discriminated unions, narrowing, and type-safe API shapes.
- `data-transformation`: reshaping realistic data into another useful structure, especially for frontend display, summaries, validation, or normalization.
- `algorithms`: logic, data-structure, traversal, search, matching, or optimization problems where the main challenge is the algorithmic approach.
- `async`: promises, concurrency, cancellation, retries, sequencing, stale responses, loading/error handling, and race conditions.
- `api-integration`: frontend-realistic API handling, request/response shapes, error mapping, pagination, optimistic updates, caching boundaries, and adapter utilities.
- `testing`: test design, missing cases, behavior verification, mocking, and edge-case coverage.
- `performance`: reducing unnecessary work, repeated computation, rendering cost, complexity trade-offs, and memoization.

Do not use `debugging` or `refactor` as categories. Represent those through `taskType`.

## Task Types

- `build-from-requirements`: implement behavior from a clear task brief.
- `fix-bug`: start from broken behavior and fix it while preserving intended behavior.
- `refactor-existing-code`: behavior already works, but the code should become clearer, safer, more maintainable, or easier to extend without changing output.
- `complete-partial-implementation`: fill in intentionally missing parts of a partial scaffold.
- `write-tests`: write or improve tests for existing behavior.
- `model-types`: design type-safe shapes, usually TypeScript-focused.
- `handle-edge-cases`: implement behavior where edge cases are the main challenge.
- `optimize-performance`: improve performance without changing behavior.
- `review-and-improve`: inspect an existing implementation and make targeted improvements.

## Problem Shape Examples

Useful `problemShape` values should describe the mental pattern, not the surface topic:

- `state-synchronization`
- `derived-view-state`
- `controlled-input-state`
- `form-validation`
- `effect-dependency-bug`
- `stale-async-response`
- `optimistic-update`
- `api-error-mapping`
- `pagination-boundary`
- `normalization-and-lookup`
- `tree-traversal`
- `interval-overlap`
- `priority-selection`
- `type-narrowing`
- `discriminated-union-modeling`
- `missing-test-cases`
- `render-cost-reduction`

## Interview Focus Examples

- `state updates and visible UI behavior`
- `type-safe modeling of API variants`
- `race-condition handling in async flows`
- `data normalization for frontend display`
- `edge-case driven implementation`
- `maintainable refactor without behavior changes`
- `test coverage for observable behavior`
- `performance improvement without changing output`

## Review Focus Examples

Use short, reviewable labels:

- `correctness`
- `ui-behavior`
- `edge-cases`
- `type-safety`
- `accessibility`
- `async-safety`
- `error-handling`
- `readability`
- `maintainability`
- `test-coverage`
- `performance`

## Repetition Guard Rules

- Do not repeat the same `problemShape` too soon unless explicitly requested.
- Avoid too many tasks with the same `category + taskType` combination.
- Avoid repeated simple grouping, counting, deduplication, filtering, or mapping tasks.
- Prefer underused categories, taskTypes, and problemShapes.
- Use optional `focus` and `avoid` when provided by the user.
