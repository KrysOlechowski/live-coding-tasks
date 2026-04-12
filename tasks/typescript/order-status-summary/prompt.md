Title

Order Status Summary

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	array iteration
	•	object accumulation
	•	immutable data transformation

Task

Implement a function that takes a list of orders and returns a summary object grouped by status.

Each order has an id, customerName, and status.

The function should return an object with exactly three keys: pending, paid, and shipped.

Expected input / output
	•	input:
	•	an array of order objects
	•	each order has:
	•	id: string
	•	customerName: string
	•	status: "pending" | "paid" | "shipped"
	•	output:
	•	an object with shape:
	•	pending: Order[]
	•	paid: Order[]
	•	shipped: Order[]
	•	any ordering / normalization / immutability expectations:
	•	preserve the original order of items within each status group
	•	do not mutate the input array
	•	do not mutate the original order objects

Requirements
	•	return an object with all three status keys even if some groups are empty
	•	place each order in exactly one group based on its status
	•	preserve the original order of orders inside each group
	•	keep the implementation type-safe in TypeScript
	•	do not sort the result unless sorting is explicitly required
	•	treat the function as a pure transformation

Optional edge cases
	•	empty input array
	•	all orders belong to the same status
	•	one or two status groups are empty

Out of scope
	•	validation of malformed input
	•	deduplication of orders
	•	UI rendering
	•	async behavior

What Codex should scaffold
	•	create only the minimal files needed
	•	do not solve the main task
	•	add TODO comments for the main logic
	•	default expectation: task.md and main.ts
	•	place the task under tasks/typescript/order-status-summary/ using a stable slug
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
	•	if the task needs a UI/runtime preview, set hasPreview: false
	•	keep review.md as the latest review only (absence of review.md means not started yet)
	•	create extra files only if clearly needed
