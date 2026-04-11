# Build editable order items panel with derived totals

- Category: react
- Type: UI state
- Difficulty: medium

## Focus areas

- shared state across multiple components
- derived values vs stored state
- form-like updates in React
- business logic in UI

## Task

Build a small order items panel in React + TypeScript.

The UI should render a list of order items. Each item contains:

- `id`
- `name`
- `unitPrice`
- `quantity`

The user should be able to:

- increase quantity
- decrease quantity
- remove an item
- see the updated order summary

The panel should also display:

- total number of items
- total price
- empty state when all items are removed

Keep the implementation interview-sized and easy to explain. Prefer deriving summary values during render instead of storing duplicated totals in state.

## Requirements

- use React and TypeScript
- create a working UI, not just helper functions
- allow quantity updates per item
- prevent quantity from going below `1`
- allow removing an item
- show `totalItems` and `totalPrice`
- show an empty state when there are no items
- keep the solution interview-sized and maintainable
- prefer deriving summary values instead of storing duplicated totals in state

## Optional edge cases

- item names may contain leading or trailing spaces
- price formatting should be stable and UI-friendly
- removing the last item should show the empty state immediately
- quantity updates should always reflect in totals correctly
- a future version may add discount logic
