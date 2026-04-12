Title

Notification Center Unread Count

Category

react

Type

UI state

Difficulty

easy

Focus areas
	•	derived state
	•	list rendering
	•	event handling

Task

Build a small notification center in React.

Render a list of notifications and show an unread counter above it. Each notification has a title and a read flag. The user can mark individual notifications as read.

The goal is to keep the UI simple and correct.

Expected input / output
	•	input:
	•	an initial array of notifications with id, title, and read
	•	output:
	•	a visible unread count
	•	a rendered list of notifications
	•	a button on each unread item to mark it as read
	•	any ordering / normalization / immutability expectations:
	•	preserve the original order of notifications
	•	do not mutate the original notification objects or array

Requirements
	•	Render a heading: Notifications
	•	Render a text summary above the list in this format:
	•	Unread: X
	•	Render each notification title in a list
	•	If a notification is unread:
	•	show a button labeled Mark as read
	•	If a notification is already read:
	•	show a label: Read
	•	When the user clicks Mark as read:
	•	only that notification becomes read
	•	the unread counter updates immediately
	•	the item now shows Read instead of the button
	•	If all notifications are read:
	•	still render the list
	•	show Unread: 0
	•	Keep the implementation self-contained and interview-sized

Optional edge cases
	•	an empty notifications list
	•	all notifications already read on first render

Out of scope
	•	persistence
	•	filtering
	•	sorting
	•	styling beyond minimal readability

What Codex should scaffold
	•	create only the minimal files needed
	•	do not solve the main task
	•	add TODO comments for the main logic
	•	default expectation: task.md and main.tsx
	•	place the task under tasks/react/notification-center-unread-count/ using a stable slug
	•	use task.md frontmatter metadata with at least:
	•	title
	•	slug
	•	category
	•	type
	•	difficulty
	•	penalty (default 0)
	•	hasPreview (true or false)
	•	previewEntry only when hasPreview is true
	•	keep category, type, and difficulty in frontmatter, not duplicated in task body
	•	set hasPreview: true
	•	set previewEntry: main.tsx
	•	include a small hardcoded initial dataset
	•	keep review.md absent until review starts
