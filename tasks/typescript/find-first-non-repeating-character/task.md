---
title: Find First Non-Repeating Character
slug: find-first-non-repeating-character
category: typescript
type: data transformation
difficulty: easy
penalty: 0
hasPreview: false
---

## Focus areas

- frequency lookup
- string traversal
- ordered selection

## Task

You are given a string. Implement a function that returns the first character that appears exactly once in the string.

The goal is to identify the first non-repeating character while preserving the original character order.

## Expected input / output

- Input:
  - a single string
- Output:
  - the first non-repeating character as a string
  - return `null` if no such character exists

Evaluate characters in their original order. Treat uppercase and lowercase letters as different characters. Do not trim, normalize, or reorder the input string.

## Requirements

- Return the first character whose total occurrence count in the input string is exactly `1`
- If all characters repeat, return `null`
- If the input string is empty, return `null`
- Spaces and punctuation should be treated like normal characters
- Keep the function pure

## Optional edge cases

- the first character is already unique
- the only unique character appears at the end
- the string contains spaces or punctuation
- the string contains repeated casing variants such as `a` and `A`

## Out of scope

- Unicode grapheme cluster handling
- locale-aware character comparison
- trimming whitespace
- returning the character index instead of the character
