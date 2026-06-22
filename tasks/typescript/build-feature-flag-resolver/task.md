---
title: "Build Feature Flag Resolver"
category: "typescript"
taskType: "complete-partial-implementation"
difficulty: "medium"
primarySkill: "Resolving priority-based configuration rules"
secondarySkill: "Modeling decision reasons and edge cases safely"
problemShape: "priority-resolution-rules"
interviewFocus: "business-logic-and-type-safety"
reviewFocus:
  - "correctness"
  - "edge-cases"
  - "type-safety"
  - "readability"
tags:
  - "typescript"
  - "feature-flags"
  - "priority-rules"
  - "business-logic"
  - "edge-cases"
---

# Build Feature Flag Resolver

## Context

You are working on a small feature flag utility for an internal product platform.

Feature flags can be configured at global, environment, customer, and user levels. The current resolver is incomplete and does not handle override priority, missing flags, disabled overrides, or decision reasons.

## Goal

Implement `resolveFeatureFlag(...)` so it returns the final enabled or disabled decision and clearly explains where that decision came from.

This is a TypeScript business-logic task, not a UI task.

## Requirements

- Return `flagKey`, `enabled`, `reason`, and `source`.
- Resolve configuration from lowest to highest priority:
  1. global default
  2. environment override
  3. customer override
  4. user override
- Higher-priority configuration must override lower-priority configuration.
- A disabled override must win over an enabled lower-priority value.
- Ignore missing overrides.
- Return a safe disabled result when the flag does not exist at any level.
- Ignore user overrides when `userId` is missing.
- Ignore customer overrides when `customerId` is missing.
- Ignore environment overrides when `environment` is missing.
- Use these decision reasons:
  - `user_override`
  - `customer_override`
  - `environment_override`
  - `global_default`
  - `missing_flag`
- Identify the winning source with values such as:
  - `user:user_1`
  - `customer:customer_1`
  - `environment:production`
  - `global`
  - `none`
- Do not mutate input configuration objects.
- Avoid `any`.
- Prefer readable TypeScript over clever abstractions.

## Constraints

- Do not add React UI.
- Do not add external libraries.
- Keep the solution local to the task files.
- Do not implement persistence or API calls.

## Non-goals

- Percentage rollouts
- Segment targeting
- Remote config fetching
- Audit logs
- A feature flag dashboard

## Acceptance Criteria

- User overrides win over customer, environment, and global configuration.
- Customer overrides win over environment and global configuration.
- Environment overrides win over global configuration.
- Disabled higher-priority overrides correctly win.
- Missing context fields safely skip their override level.
- Missing flags return a disabled `missing_flag` result.
- `reason` and `source` accurately describe the winning decision.
- Inputs are not mutated.
- The implementation is readable enough to explain during a live-coding interview.
