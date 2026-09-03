---
title: "Fix duplicate channel subscriptions"
category: "react"
taskType: "fix-bug"
difficulty: "easy"
hasPreview: true
previewEntry: "main.tsx"
primarySkill: "Match an external subscription lifetime to a React effect"
secondarySkill: "Prevent obsolete event sources from updating current UI state"
problemShape: "effect-subscription-cleanup"
interviewFocus: "Effect ownership, cleanup, dependency changes, and unmount"
reviewFocus:
  - "correctness"
  - "ui-behavior"
  - "maintainability"
tags:
  - "react"
  - "use-effect"
  - "subscriptions"
  - "cleanup"
---

# Fix duplicate channel subscriptions

## Context

An operations dashboard subscribes to live events for the selected channel. The subscription API returns a function that stops that subscription and logs subscribe/unsubscribe events in the browser console.

The dashboard initially appears to work. After changing channels, however, messages from previously selected channels continue to arrive and multiple subscriptions remain active.

## Goal

Fix the component so its live subscription always belongs to the currently selected channel and does not outlive the component.

## Requirements

- Keep exactly one active channel subscription for the mounted component.
- Stop the previous subscription when the selected channel changes.
- Stop the current subscription when the component unmounts.
- Display only events received for the currently selected channel after a switch.
- Preserve the existing channel selection, event limit, and visible layout.

## Constraints

- Do not change the provided `subscribeToChannel` function or channel data.
- Do not add external dependencies.

## Acceptance Criteria

- Switching channels stops events from the previously selected channel.
- The browser console records an unsubscribe for an obsolete subscription.
- Repeated channel changes do not create duplicate live event streams.
- Navigating away from the preview stops the current subscription.
- The event list still shows at most five newest events for the selected channel.

