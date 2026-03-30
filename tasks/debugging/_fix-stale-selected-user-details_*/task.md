# Fix stale selected user details

- Category: debugging
- Type: bug fix
- Difficulty: easy

## Focus areas

- derived state vs props
- keeping selected UI in sync
- debugging a subtle React bug

## Task

You are given a small React app with:

- a list of users on the left
- a details panel on the right

When the page loads, the first user is selected by default.

There is also a button that replaces the user list with updated data from a mock source.

Right now, after refreshing the list, the details panel may still show stale data from the previously selected user object.

Fix the bug so that the details panel always shows the current data for the selected user.

## Requirements

- keep the selected user behavior
- after the list updates, the details panel must show fresh data
- do not solve the problem by forcing a full page reload
- keep the solution small and interview-sized
- use React and TypeScript

## Optional edge cases

- the selected user still exists, but their name changed
- the selected user was removed from the refreshed list
- the refreshed list is empty
- user IDs stay stable, but object references change
