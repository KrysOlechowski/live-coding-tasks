---
title: Notification Center Unread Count
slug: notification-center-unread-count
category: react
type: UI state
difficulty: easy
penalty: 0
hasPreview: true
previewEntry: main.tsx
---

## Focus areas

- derived state
- list rendering
- event handling

## Task

Build a small notification center in React.

Render a list of notifications and show an unread counter above it. Each notification has a title and a read flag. The user can mark individual notifications as read.

The goal is to keep the UI simple and correct.

## Expected input / output

- Input: an initial array of notifications
- Each notification has:
  - `id: string`
  - `title: string`
  - `read: boolean`
- Output:
  - a visible unread count
  - a rendered list of notifications
  - a button on each unread item to mark it as read

Preserve the original order of notifications. Do not mutate the original notification objects or array.

## Requirements

- Render a heading: `Notifications`
- Render a text summary above the list in this format: `Unread: X`
- Render each notification title in a list
- If a notification is unread:
  - show a button labeled `Mark as read`
- If a notification is already read:
  - show a label: `Read`
- When the user clicks `Mark as read`:
  - only that notification becomes read
  - the unread counter updates immediately
  - the item now shows `Read` instead of the button
- If all notifications are read:
  - still render the list
  - show `Unread: 0`
- Keep the implementation self-contained and interview-sized

## Optional edge cases

- an empty notifications list
- all notifications already read on first render

## Out of scope

- persistence
- filtering
- sorting
- styling beyond minimal readability
