# Review async product list fetch and UI state issues

- Category: debugging
- Type: debugging
- Difficulty: easy

## Focus areas

- async flow in React
- loading and error handling
- missing `res.ok` checks
- cleanup and race-condition-adjacent issues
- maintainability of UI state

## Task

This is a React + TypeScript code review exercise.

You are given a small product list component. Your job is not to add features. Your job is to review the code, identify important issues, prioritize them, and suggest improvements.

The component is intended to be realistic for a long-lived frontend codebase. It contains a few meaningful problems related to async behavior, loading and error state handling, and maintainability.

In the review discussion, focus on:

- async correctness
- loading and error handling
- what happens if the request fails
- whether the component may behave incorrectly on re-render or unmount
- maintainability of the state model

## Requirements

- use React and TypeScript
- review the code rather than re-implementing the component from scratch
- identify meaningful issues that matter in practice
- prioritize the most important problems over minor details
- explain likely consequences in failure paths and async scenarios
- suggest improvements that would make the component safer and easier to maintain

## Optional edge cases

- the request returns a non-200 response
- the component unmounts before the request finishes
- the API returns missing optional fields
- a second request could overwrite a previous result
- the UI shows stale loading or error information

## Interviewer notes

This exercise is meant to test whether the candidate can:

- read async React code under time pressure
- spot practical frontend reliability issues
- reason about request failure paths
- discuss maintainability of loading and error states

Possible follow-up questions:

- What happens if the backend returns 500 with JSON?
- Would you keep separate loading, error, and data state?
- How would you make this safer on unmount?
- Which issue is the most serious in production?
