Title

Dismissible Notification List

Category

react

Type

bug fix

Difficulty

easy

Focus areas

- React state updates
- list rendering
- event handling
- immutable updates
- simple component behavior

Task

You are given a small notification panel that is already rendered in the UI.

Each notification has a title, a short message, and a dismiss button.

The current implementation has a bug:

- clicking dismiss does not reliably remove the correct notification
- the component behavior becomes incorrect after multiple dismiss actions
- the fix should stay small and easy to explain

Your task is to fix the existing implementation so that dismissing a notification always removes the correct item from the list.

Do not redesign the UI.
Do not replace the whole component.
Keep the solution simple, practical, and interview-sized.

Requirements

- render a list of notifications
- each notification should have a dismiss action
- clicking dismiss should remove only the selected notification
- the remaining notifications should stay in the correct order
- keep the update immutable
- avoid unnecessary state duplication
- keep the code readable and easy to extend
- use TypeScript without any

Optional edge cases

- there may be no notifications
- the first or last notification may be dismissed
- multiple dismiss actions may happen one after another
- notifications may later include new fields without changing the dismiss logic

What Codex should scaffold

- create only the minimal files needed
- do not solve the main task
- add TODO comments where the main logic belongs
- include a very small pre-rendered notification UI
- include a buggy implementation where dismissing can remove the wrong item
- keep styling minimal and unimportant

Why this is good interview practice

- it tests a very common UI interaction
- it checks whether you can reason about lists and state updates cleanly
- it stays small enough to explain clearly during pair programming

What the interviewer is likely testing

- whether you can identify why list updates behave incorrectly
- whether you understand immutable state updates
- whether you can make a focused bug fix without overengineering
- whether you keep simple UI logic readable

Possible follow-up questions

- Why is using an array index sometimes risky here?
- Would you store the full notification objects or only ids?
- How would you animate dismiss without changing the core logic?
- How would you test this interaction?
