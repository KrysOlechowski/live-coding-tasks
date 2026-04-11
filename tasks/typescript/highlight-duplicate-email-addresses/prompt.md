Title

Highlight Duplicate Email Addresses

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
- array transformation
- string normalization
- using maps or sets
- preserving useful output structure

Task

You are given a list of user records collected from a signup form. Some users entered the same email address with different casing or extra spaces.

Write a function that returns all duplicated email addresses together with the IDs of users that share them.

Treat email addresses as case-insensitive and ignore leading or trailing spaces.

Requirements
- implement a function that accepts an array of users
- each user has:
- id: string
- email: string
- normalize emails before comparing them
- return only emails that appear more than once
- for each duplicated email, return:
- the normalized email
- an array of matching user IDs
- preserve the order of first duplicate appearance based on the input
- do not mutate the input array

Optional edge cases
- empty input array
- users with emails that differ only by uppercase vs lowercase
- users with emails containing accidental spaces around the value
- multiple duplicates of the same normalized email

What Codex should scaffold
- create only the minimal files needed
- do not solve the main task
- add TODO comments for the main logic
- default expectation: task.md and main.ts
- place the task under tasks/typescript/highlight-duplicate-email-addresses/ using a stable slug
- use task.md frontmatter metadata with at least:
- title
- slug
- category
- type
- difficulty
- penalty (default 0)
- hasPreview (true or false)
- previewEntry only when hasPreview is true
- keep category, type, and difficulty in frontmatter, not duplicated in task body
- set hasPreview: false
- keep review.md as the latest review only (absence of review.md means not started yet)
- create extra files only if clearly needed
