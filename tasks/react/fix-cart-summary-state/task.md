---
title: "Fix the cart summary"
category: "react"
taskType: "fix-bug"
difficulty: "medium"
hasPreview: true
previewEntry: "main.tsx"
primarySkill: "Keep derived cart summary data consistent with React state"
secondarySkill: "Apply state updates safely when actions depend on the current cart"
problemShape: "Repair duplicated derived state that falls behind its source state"
interviewFocus: "State updates and consistent visible UI behavior"
reviewFocus:
  - "correctness"
  - "ui-behavior"
  - "maintainability"
tags:
  - "react"
  - "derived-ui-state"
  - "react-state-updates"
---

# Fix the cart summary

## Context

An online store has a small shopping-cart interface. Users can add products, change their quantities, and remove products from the cart.

The product rows update after these actions, but the order summary can display an outdated item count or total price. This makes the cart show conflicting information about the same order.

## Goal

Fix the cart so that the product rows and order summary always represent the same current cart state.

## Requirements

- Adding a product that is not in the cart creates a cart row with quantity `1`.
- Adding a product that is already in the cart increases its quantity by `1`.
- The quantity controls increase or decrease the selected product by `1`.
- A product quantity cannot be decreased below `1`.
- Removing a product removes the correct cart row.
- The item count is the sum of all product quantities.
- The total price is the sum of each product price multiplied by its quantity.
- The summary is correct immediately after every supported cart action.

## Constraints

- Keep the existing product data and visible interactions.
- Do not add external state-management libraries.
- Preserve the existing TypeScript types or make them more precise.

## Acceptance Criteria

- Product quantities and cart rows update correctly.
- The item count always matches the quantities visible in the cart.
- The total price always matches the current cart contents.
- An empty cart shows an item count and total price of zero.
- The interface remains usable through the task preview.
