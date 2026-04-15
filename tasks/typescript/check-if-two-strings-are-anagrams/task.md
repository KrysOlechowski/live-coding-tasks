---
title: Check If Two Strings Are Anagrams
slug: check-if-two-strings-are-anagrams
category: typescript
type: data transformation
difficulty: easy
penalty: 0
hasPreview: false
---

## Focus areas

- frequency comparison
- string normalization rules
- early mismatch detection

## Task

You are given two strings. Implement a function that returns whether they are anagrams of each other.

Two strings are anagrams if they contain the same characters with the same counts after applying the comparison rules described below.

## Expected input / output

- Input:
  - `first: string`
  - `second: string`
- Output:
  - `true` if the strings are anagrams
  - `false` otherwise

Compare characters after converting both strings to lowercase. Ignore spaces completely. Preserve input immutability.

## Requirements

- Return `true` only when both normalized strings contain exactly the same characters with the same frequencies
- Convert both strings to lowercase before comparison
- Ignore all space characters
- Do not ignore punctuation or digits
- If the normalized strings have different lengths, return `false`
- Keep the function pure

## Optional edge cases

- both strings are empty
- strings differ only by casing
- strings contain repeated letters
- strings contain punctuation that prevents them from being anagrams

## Out of scope

- locale-aware casing
- ignoring punctuation
- Unicode normalization
- returning mismatch details
