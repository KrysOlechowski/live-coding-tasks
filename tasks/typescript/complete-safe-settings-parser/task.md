---
title: "Complete Safe Settings Parser"
category: "typescript"
taskType: "complete-partial-implementation"
difficulty: "medium"
primarySkill: "Safely parsing unknown external data"
secondarySkill: "Using type guards and fallback values"
problemShape: "unsafe-external-data-parsing"
interviewFocus: "Complete a parser that converts unreliable API/JSON input into a safe application config"
reviewFocus:
  - "correctness"
  - "type-safety"
  - "edge-cases"
  - "readability"
tags:
  - "typescript"
  - "unknown"
  - "type-guards"
  - "runtime-validation"
  - "fallbacks"
---

# Complete Safe Settings Parser

## Context

You are working on a frontend application that receives user settings from an external API.

The API response cannot be fully trusted. Some fields may be missing, have the wrong type, contain unsupported values, or include extra data the application does not need.

The starter code contains the target application types, default settings, and a partially implemented parser. Your task is to complete the parser so the rest of the app can safely use the returned settings without defensive checks everywhere.

## Goal

Complete the settings parser so it accepts `unknown` input and returns a safe, fully usable `UserSettings` object with sensible fallback values.

## Requirements

- The parser must accept `unknown` input.
- The parser must always return a valid `UserSettings` object.
- Missing fields must fall back to defaults.
- Fields with invalid types must fall back to defaults.
- Unsupported enum-like values must fall back to defaults.
- Extra fields from the API must be ignored.
- Nested settings must be handled safely.
- The parser must not throw for malformed input.
- The parser must preserve valid values from the API response.
- The parser must keep invalid values out of the returned object.
- The implementation should use TypeScript in a way that avoids unsafe assumptions about `unknown`.
- The final parser should be easy to explain during a code review.

## Constraints

- Do not use external validation libraries.
- Do not use `any` as the main escape hatch.
- Do not change the public `UserSettings` type unless the starter type is internally inconsistent.
- Do not change default settings unless the starter data is internally inconsistent.
- Do not require API input to be perfectly shaped before parsing.
- Keep the solution appropriate for a focused live-coding task.

## Non-goals

- Building a full validation framework.
- Reporting every validation error to the UI.
- Adding schema libraries.
- Adding API fetching logic.
- Adding React components.
- Adding persistence or local storage.

## Acceptance Criteria

- Valid API input is preserved in the returned settings.
- Missing top-level fields use default values.
- Missing nested fields use default values.
- Wrong primitive types do not leak into the returned object.
- Unsupported string values do not leak into enum-like fields.
- `null`, arrays, primitives, and malformed objects are handled safely.
- Extra API fields are ignored.
- The parser never throws for invalid input.
- The returned object always matches the `UserSettings` type.
- The code remains readable and does not rely on broad unsafe casting.
