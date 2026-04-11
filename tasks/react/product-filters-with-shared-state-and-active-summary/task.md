---
title: Build product filters with shared state and active summary
slug: product-filters-with-shared-state-and-active-summary
category: react
type: ui-state
difficulty: medium
penalty: 1
hasPreview: true
previewEntry: main.tsx
---

# Build product filters with shared state and active summary

## Focus areas

- shared state across multiple controls
- derived values vs stored state
- filtering logic in React
- maintainable component structure

## Task

Build a small product list with interactive filters in React + TypeScript.

The UI should render:

- a list of products
- a text search input
- an In stock only checkbox
- a category select
- a summary of currently active filters
- a filtered results count

Each product contains:

- `id`
- `name`
- `category`
- `inStock`

The user should be able to:

- filter by search text
- filter by selected category
- filter by stock availability
- clear all filters at once

Keep the solution interview-sized and easy to explain. Prefer deriving filtered products and active filter summary values during render instead of storing them separately in state.

## Requirements

- use React and TypeScript
- create a working UI, not just helper functions
- keep search input controlled
- category filter should include an `All categories` option
- stock checkbox should only show products with `inStock === true`
- show the number of filtered results
- show a simple active filters summary
- add a Clear filters button that resets all controls
- keep the solution interview-sized and maintainable
- prefer deriving filtered products and summary values instead of storing them separately in state

## Optional edge cases

- search should be case-insensitive
- product names may contain leading or trailing spaces
- clearing filters should immediately restore all products
- selected category may reduce the list to zero results
- future versions may add sorting or price range filters
