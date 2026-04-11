create anothe task:
Title

Build product filters with shared state and active summary

Category

react

Type

UI state

Difficulty

medium

Focus areas
• shared state across multiple controls
• derived values vs stored state
• filtering logic in React
• maintainable component structure

Task

Create a Pair programming review exercise for a React + TypeScript interview.

This is a practical implementation task.
The goal is to build a small product list with interactive filters and a clear active filters summary.

The UI should render:
• a list of products
• a text search input
• an In stock only checkbox
• a category select
• a summary of currently active filters
• a filtered results count

Each product contains:
• id
• name
• category
• inStock

The user should be able to:
• filter by search text
• filter by selected category
• filter by stock availability
• clear all filters at once

The component should discuss and encourage good decisions around:
• what belongs in state
• what should be derived during render
• how to keep the filtering logic readable as requirements grow

Requirements
• use React and TypeScript
• create a working UI, not just helper functions
• keep search input controlled
• category filter should include an All categories option
• stock checkbox should only show products with inStock === true
• show the number of filtered results
• show a simple active filters summary, for example:
• Search: lamp
• Category: Lighting
• In stock only
• add a Clear filters button that resets all controls
• keep the solution interview-sized and easy to explain
• prefer deriving filtered products and summary values instead of storing them separately in state

Optional edge cases
• search should be case-insensitive
• product names may contain leading or trailing spaces
• clearing filters should immediately restore all products
• selected category may reduce the list to zero results
• future versions may add sorting or price range filters

What Codex should scaffold
• create only the minimal files needed
• do not solve the main task
• add TODO comments for the main logic
• default expectation: task.md and main.tsx
• use the task category to place the task under tasks/react/
• use difficulty-based folder prefixes: \_\_ = medium
• for this Pair programming review task, main.tsx should contain a realistic starter scaffold with sample data and minimal UI structure
• the scaffold should leave the core filtering and reset logic unfinished
• task.md should explain the implementation goals, not code review goals
• create extra files only if clearly needed

Why this is good interview practice

This is a good Pair programming review task because it practices:
• managing several related pieces of UI state
• deriving filtered results cleanly
• discussing state shape and maintainability
• extending a realistic feature without overengineering

What the interviewer may test with it

The interviewer may test whether the candidate:
• chooses the right source of truth for filters
• avoids storing duplicated filtered data in state
• writes readable filtering logic
• handles reset behavior cleanly
• keeps the component easy to extend later

What kinds of follow-up questions may appear

Possible follow-ups:
• Would you keep filters in one object or separate state fields?
• Would you derive active filter labels during render?
• How would you add sorting without making the component messy?
• Would you extract a custom hook once filtering grows?
• How would you test the clear-filters behavior?
