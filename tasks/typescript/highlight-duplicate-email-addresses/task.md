---
title: Highlight Duplicate Email Addresses
slug: highlight-duplicate-email-addresses
category: typescript
type: data transformation
difficulty: easy
penalty: 2
hasPreview: false
---

# Highlight Duplicate Email Addresses

## Focus areas

- array transformation
- string normalization
- using maps or sets
- preserving useful output structure

## Task

You are given a list of user records collected from a signup form. Some users entered the same email address with different casing or extra spaces.

Write a function that returns all duplicated email addresses together with the IDs of users that share them.

Treat email addresses as case-insensitive and ignore leading or trailing spaces.

## Requirements

- Implement a function that accepts an array of users.
- Each user has:
  - `id: string`
  - `email: string`
- Normalize emails before comparing them.
- Return only emails that appear more than once.
- For each duplicated email, return:
  - the normalized email
  - an array of matching user IDs
- Preserve the order of first duplicate appearance based on the input.
- Do not mutate the input array.

## Optional edge cases

- Empty input array.
- Users with emails that differ only by uppercase vs lowercase.
- Users with emails containing accidental spaces around the value.
- Multiple duplicates of the same normalized email.
