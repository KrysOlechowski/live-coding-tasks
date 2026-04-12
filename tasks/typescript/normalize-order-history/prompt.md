Title

Normalize Order History

Category

typescript

Type

data transformation

Difficulty

medium

Focus areas
	•	grouping related records
	•	conflict resolution rules
	•	immutable transformation
	•	sorting derived output

Task

You are given a flat list of order events. Implement a function that converts these events into a normalized order history summary.

Each order may appear in multiple records over time. Your task is to group records by order, determine the latest status, calculate the total paid amount, and return a clean summary sorted by most recent activity.

Expected input / output
	•	input:
	•	an array of event objects
	•	each event has:
	•	id: string
	•	orderId: string
	•	customerId: string
	•	customerName: string
	•	type: "created" | "paid" | "shipped" | "cancelled" | "refunded"
	•	amount?: number  // present only for paid and refunded
	•	createdAt: string // ISO timestamp
	•	output:
	•	an array of objects in this shape:
	•	orderId: string
	•	customerId: string
	•	customerName: string
	•	latestStatus: "created" | "paid" | "shipped" | "cancelled" | "refunded"
	•	totalPaid: number
	•	lastEventAt: string
	•	any ordering / normalization / immutability expectations:
	•	preserve input immutability
	•	group all events by orderId
	•	sort output by lastEventAt descending
	•	when timestamps are equal, sort by orderId ascending

Requirements
	•	Return one output item per unique orderId.
	•	Determine lastEventAt as the latest createdAt value within the order group.
	•	Determine latestStatus from the event with the latest createdAt.
	•	Calculate totalPaid as:
	•	sum all paid amounts
	•	subtract all refunded amounts
	•	ignore amounts from other event types
	•	Assume missing amount on paid or refunded should be treated as 0.
	•	If multiple events for the same order share the exact same latest createdAt, choose latestStatus using this priority:
	•	cancelled
	•	refunded
	•	shipped
	•	paid
	•	created
	•	If multiple records for the same order contain different customerName values, use the customerName from the latest event for that order. If there is still a tie on timestamp, use the same priority rule as for latestStatus.
	•	Keep the function pure.
	•	Do not mutate the input array or any input objects.

Optional edge cases
	•	empty input returns an empty array
	•	the same order has multiple paid events
	•	an order is paid and later partially refunded
	•	events arrive in random order
	•	multiple events for one order have identical timestamps

Out of scope
	•	validating business correctness of status transitions
	•	currency formatting
	•	grouping by customer
	•	detecting duplicate event IDs

What Codex should scaffold
	•	create only the minimal files needed
	•	do not solve the main task
	•	add TODO comments for the main logic
	•	default expectation: task.md and main.ts
	•	place the task under tasks/<category>/<slug>/ using a stable slug
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
	•	for non-React tasks that include sample input data, prefer a directly runnable main.ts scaffold via a tiny console.log(exampleFunction(sampleInput)) line instead of requiring a separate runner file
	•	keep review.md as the latest review only (absence of review.md means not started yet)
	•	create extra files only if clearly needed
