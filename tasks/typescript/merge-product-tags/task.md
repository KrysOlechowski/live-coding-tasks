---
title: Merge Product Tags
slug: merge-product-tags
category: typescript
type: data transformation
difficulty: easy
penalty: 0
hasPreview: false
---

## Focus areas

- array deduplication
- normalization
- immutable transformation

## Task

You are given a list of products. Implement a function that returns a new array where each product contains a cleaned list of tags.

The goal is to prepare tag data for further filtering in the UI or reporting logic.

## Expected input / output

- Input:
  - an array of product objects
  - each product has:
    - `id: string`
    - `name: string`
    - `tags: string[] | null`
    - `extraTags?: string[] | null`
- Output:
  - an array of objects in this shape:
    - `id: string`
    - `name: string`
    - `tags: string[]`

Preserve the original input order. Do not mutate the input array or its objects. Trim leading and trailing whitespace from all tags, treat tags case-insensitively for deduplication, and preserve the first visible version of each tag in output order.

## Requirements

- Return one output item for each input product
- Build the output `tags` array by combining `tags` and `extraTags`
- Treat `null` and `undefined` tag arrays as empty arrays
- Ignore tags that are empty after trimming
- Remove duplicates across both arrays using case-insensitive comparison
- Keep the first encountered trimmed version of a tag
- Keep the function pure

## Optional edge cases

- both arrays are missing
- the same tag appears many times with different casing
- all tags are empty or whitespace-only

## Out of scope

- sorting tags alphabetically
- changing tag casing
- validating product names
- grouping products
