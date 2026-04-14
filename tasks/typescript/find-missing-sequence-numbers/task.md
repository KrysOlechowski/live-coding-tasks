---
title: Find Missing Sequence Numbers
slug: find-missing-sequence-numbers
category: typescript
type: data transformation
difficulty: easy
penalty: 1
hasPreview: false
---

## Focus areas

- set-like lookup
- range construction
- ordered output

## Task

You are given a list of processed job records. Each record has a sequence number. Implement a function that returns all missing sequence numbers between the smallest and largest sequence number present in the input.

The goal is to detect gaps in a simple processing sequence.

## Expected input / output

- Input:
  - an array of objects
  - each object has:
    - `id: string`
    - `sequence: number`
- Output:
  - an array of numbers representing missing sequence numbers

Preserve input immutability. Return missing numbers in ascending order. Duplicate sequence values in the input should not create duplicate values in the output.

## Requirements

- Return all integers missing between the minimum and maximum sequence values found in the input
- If the input is empty, return an empty array
- If there are no gaps, return an empty array
- Ignore duplicate sequence values when determining missing numbers
- Do not mutate the input array or any input objects
- Keep the function pure
- Assume all sequence values are integers

## Optional edge cases

- input contains only one record
- input contains duplicate sequence values
- input is not sorted
- sequence values can be negative

## Out of scope

- validating non-integer values
- sorting the input records
- grouping by id
- detecting duplicate records
