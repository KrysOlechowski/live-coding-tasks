Title

Build editable order items panel with derived totals

Category

react

Type

UI state

Difficulty

medium

Focus areas
• shared state across multiple components
• derived values vs stored state
• form-like updates in React
• business logic in UI

Task

Create a Pair programming review exercise for a React + TypeScript interview.

This is a practical implementation task.
The goal is to build a small order items panel with editable quantities and derived totals.

The UI should render a list of order items.
Each item contains:
• id
• name
• unitPrice
• quantity

The user should be able to:
• increase quantity
• decrease quantity
• remove an item
• see the updated order summary

The panel should also display:
• total number of items
• total price
• empty state when all items are removed

This task should encourage discussion around:
• what belongs in state
• what should be derived during render
• how to keep the component maintainable as the UI grows

Requirements
• use React and TypeScript
• create a working UI, not just helper functions
• allow quantity updates per item
• prevent quantity from going below 1
• allow removing an item
• show totalItems and totalPrice
• show an empty state when there are no items
• keep the solution interview-sized and easy to explain
• prefer deriving summary values instead of storing duplicated totals in state

Optional edge cases
• item names may contain leading or trailing spaces
• price formatting should be stable and UI-friendly
• removing the last item should show the empty state immediately
• quantity updates should always reflect in totals correctly
• a future version may add discount logic

What Codex should scaffold
• create only the minimal files needed
• do not solve the main task
• add TODO comments for the main logic
• default expectation: task.md and main.tsx
• use the task category to place the task under tasks/react/
• use difficulty-based folder prefixes: \_\_ = medium
• for this Pair programming review task, main.tsx should contain a realistic starter scaffold with sample data and minimal UI structure
• the scaffold should leave the core interaction logic unfinished
• task.md should explain the implementation goals, not code review goals
• create extra files only if clearly needed

Why this is good interview practice

This is a good Pair programming review task because it practices:
• practical React state updates
• reasoning about derived values
• keeping UI logic maintainable
• discussing trade-offs while implementing a real feature

What the interviewer may test with it

The interviewer may test whether the candidate:
• chooses the right source of truth for item data
• avoids storing duplicated totals in state
• writes predictable update handlers
• keeps components understandable while adding business rules
• can extend the task cleanly during pair programming

What kinds of follow-up questions may appear

Possible follow-ups:
• Would you keep everything in one component or split it?
• Would you extract a custom hook here?
• What should be derived instead of stored?
• How would you add promo codes or discounts later?
• How would you test the quantity update logic?
