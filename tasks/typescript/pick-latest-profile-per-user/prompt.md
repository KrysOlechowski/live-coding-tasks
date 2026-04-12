Title

Pick Latest Profile Per User

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	grouping by identifier
	•	selecting latest record
	•	immutable transformation

Task

You are given a flat list of user profile snapshots. Implement a function that returns one final profile per user based on the most recent update.

The goal is to reduce repeated historical records into a clean current-state summary.

Expected input / output
	•	input:
	•	an array of profile objects
	•	each profile has:
	•	id: string
	•	userId: string
	•	email: string
	•	role: "user" | "admin" | "moderator"
	•	updatedAt: string // ISO timestamp
	•	output:
	•	an array of objects in this shape:
	•	userId: string
	•	email: string
	•	role: "user" | "admin" | "moderator"
	•	updatedAt: string
	•	any ordering / normalization / immutability expectations:
	•	preserve input immutability
	•	keep only one output item per userId
	•	preserve the order of first appearance of each userId in the input

Requirements
	•	Return one output item per unique userId.
	•	For each user, keep the record with the latest updatedAt.
	•	If two records for the same userId have the same updatedAt, keep the one that appears later in the input.
	•	Copy email, role, and updatedAt from the chosen record.
	•	Do not mutate the input array or any input objects.
	•	Keep the function pure.
	•	Assume all timestamps are valid ISO strings.

Optional edge cases
	•	empty input returns an empty array
	•	one user has only one record
	•	records for the same user appear non-consecutively
	•	multiple users have updates interleaved in the input

Out of scope
	•	validating email format
	•	sorting by timestamp
	•	deduplicating by email
	•	filtering by role

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
