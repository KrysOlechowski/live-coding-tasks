---
title: Check Whether Brackets Are Balanced
slug: check-whether-brackets-are-balanced
category: typescript
type: data transformation
difficulty: easy
penalty: 1
hasPreview: false
---

## Focus areas

- stack-like thinking
- character filtering
- early invalid detection

## Task

You are given a string that may contain different types of brackets. Implement a function that returns whether the brackets in the string are balanced.

A string is considered balanced when every opening bracket has a matching closing bracket of the same type, and brackets are closed in the correct order.

## Expected input / output

- Input:
  - a single string
- Output:
  - `true` if the bracket sequence is balanced
  - `false` otherwise

Evaluate brackets in the original order. Ignore all non-bracket characters. Preserve input immutability.

## Requirements

- Support these bracket types:
  - `()`
  - `[]`
  - `{}`
- Ignore all characters that are not one of the supported brackets
- Return `false` if a closing bracket appears before a matching opening bracket
- Return `false` if bracket types do not match
- Return `false` if any opening brackets remain unmatched at the end
- Return `true` only when all brackets are matched in the correct order
- Keep the function pure

## Optional edge cases

- empty string
- string with no brackets at all
- nested balanced brackets
- interleaved invalid bracket order
- extra opening or closing bracket

## Out of scope

- angle brackets such as `< >`
- quoted string parsing
- escaping rules
- Unicode bracket variants
