---
title: Product Filter Sync
category: react
taskType: fix-bug
difficulty: easy
problemShape: derived-view-state
interviewFocus: Keep product filters, displayed results, and the result count consistent
reviewFocus:
  - correctness
  - ui-behavior
  - edge-cases
  - readability
topics:
  - derived-state
hasPreview: true
previewEntry: main.tsx
createdAt: 2026-11-18T17:38:00.872Z
---

# Product Filter Sync

## Context

A small product catalog has a search input, a category selector, a result count, and a reset button. Users report that changing the filters can leave the product list and count inconsistent with their selections.

The preview runs, but its filtering behavior is faulty. For example, start with a fresh preview, select Electronics, and then select Home. Compare the controls, displayed products, and result count after each change.

## Goal

Fix the component in `main.tsx` so the product list and result count always match the current filters.

Estimated time: 15–25 minutes.

## Requirements

- Initially show all six products, with an empty search input and All categories selected.
- Search by a case-insensitive substring of the product name. Ignore leading and trailing whitespace; a blank search matches all names.
- The selected category and search must both match. All categories imposes no category restriction.
- Apply each filter change immediately, without another keystroke, selection, or submit action.
- Show the number of currently displayed products. When none match, show a count of zero and the empty-state message.
- Reset filters clears the search, selects All categories, and restores all products and their count in one click. Repeated resets must work too.
- Preserve the original product order and do not mutate the supplied product data.

## Acceptance Criteria

- A fresh preview displays all six products and a result count of 6.
- Selecting Electronics immediately displays Wireless Mouse and USB-C Hub, with a count of 2. Selecting Home next immediately displays Desk Lamp and Travel Mug, still with a count of 2.
- Searching for `  MOUSE  ` with All categories selected displays only Wireless Mouse, with a count of 1.
- Searching for `mouse` while Home is selected displays no products, a count of 0, and the empty-state message. Switching to Electronics immediately shows Wireless Mouse and a count of 1.
- Clearing the search preserves the category filter and updates both the list and count.
- Reset works from combined filters and from an empty result set. Later filter changes continue to work correctly.

## Constraints

- Keep the exercise local to `main.tsx`; no dependencies, network requests, or application-level changes are needed.
- Preserve the existing controls and product data. Visual redesign is outside the scope of this task.
