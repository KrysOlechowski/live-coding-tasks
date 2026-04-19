---
title: Parse Boolean Query Flags
slug: parse-boolean-query-flags
category: typescript
type: data transformation
difficulty: easy
penalty: 0
hasPreview: false
---

## Focus areas

- string parsing
- explicit boolean rules
- output shaping

## Task

You are given a URL query string. Implement a function that extracts boolean feature flags from it.

Only keys that start with `flag_` should be included in the output. Each included value should be converted to a boolean using the parsing rules below.

## Expected input / output

- Input:
  - a single query string, for example:
  - `"?flag_beta=true&flag_debug=0&page=2&flag_newUI=yes"`
- Output:
  - an object in this shape:
  - `Record<string, boolean>`
  - example output for the input above:
  - `{ beta: true, debug: false, newUI: true }`

Remove the `flag_` prefix from output keys. Preserve the order of first appearance of valid flag keys when iterating through the query entries. Treat keys case-sensitively.

## Requirements

- Include only query parameters whose key starts with `flag_`
- Remove the `flag_` prefix in the output key
- Parse values using these rules:
  - `"true"` -> `true`
  - `"1"` -> `true`
  - `"yes"` -> `true`
  - `"false"` -> `false`
  - `"0"` -> `false`
  - `"no"` -> `false`
- Treat all other values as invalid and ignore those entries
- If the same valid flag key appears multiple times, keep the last valid value
- Ignore entries where the key becomes empty after removing `flag_`
- If the input string is empty or contains no valid flags, return an empty object
- Keep the function pure

## Optional edge cases

- query string does not start with `?`
- repeated flag keys with mixed valid and invalid values
- unrelated query parameters appear between flag entries
- a flag key exists with an empty value

## Out of scope

- decoding URL-encoded characters
- nested query structures
- arrays in query params
- case-insensitive matching of keys or values
