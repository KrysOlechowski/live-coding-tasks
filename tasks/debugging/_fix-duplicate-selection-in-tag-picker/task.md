# Fix duplicate selection in tag picker

- Category: debugging
- Type: bug fix
- Difficulty: easy

## Focus areas

- array state updates
- preventing duplicates
- predictable toggle behavior

## Task

You are given a small React tag picker component.

It renders a list of tags and allows the user to click a tag to select it.

Right now, clicking the same tag multiple times can add duplicates into the selected list.

Fix the component so that:

- clicking an unselected tag adds it
- clicking a selected tag removes it
- the selected list never contains duplicates

Keep the solution small and easy to explain.

## Requirements

- use React and TypeScript
- fix the bug without rewriting the whole component
- preserve predictable toggle behavior
- do not mutate the existing state array
- keep the solution interview-sized and easy to explain

## Optional edge cases

- user clicks very quickly
- selected tags are rendered in insertion order
- the same tag is clicked many times in a row
- a future version adds keyboard selection
