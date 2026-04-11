---
title: Build query string from filters
slug: build-query-string-from-filters
category: typescript
type: data-transformation
difficulty: easy
penalty: 3
hasPreview: false
---

# Build query string from filters

## Focus areas

- optional fields handling
- transforming UI filters into API params
- avoiding invalid or noisy query strings

## Task

You are given a filter object from a frontend search form.

Write a TypeScript function that converts it into a query string for an API request.

## Behavior rules

- include only meaningful values
- skip empty strings
- skip empty arrays
- trim string values
- include boolean flags only when they are `true`
- join array values with commas
- return an empty string if there are no valid filters
- do not mutate the input

## Example output

- `"?search=react&tags=frontend,typescript&archived=true"`
- `""` when nothing valid is present

## Requirements

- use TypeScript
- create a function that takes a filter object and returns a query string
- handle optional fields safely
- skip invalid or empty values
- do not mutate the original input
- keep the solution interview-sized and easy to explain

## Optional edge cases

- `search` contains only spaces
- `tags` contains empty strings
- `page` is `0`
- `archived` is `false`
- array values need trimming before joining
