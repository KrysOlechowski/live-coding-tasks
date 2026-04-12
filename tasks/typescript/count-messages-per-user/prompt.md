Title

Count Messages Per User

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	counting occurrences
	•	object accumulation
	•	immutable output shaping

Task

You are given a flat list of chat messages. Implement a function that returns a summary of how many messages each user sent.

The goal is to transform raw event-like data into a compact per-user summary.

Expected input / output
	•	input:
	•	an array of message objects
	•	each message has:
	•	id: string
	•	userId: string
	•	userName: string
	•	text: string
	•	output:
	•	an array of objects in this shape:
	•	userId: string
	•	userName: string
	•	messageCount: number
	•	any ordering / normalization / immutability expectations:
	•	preserve input immutability
	•	preserve the order of first appearance of each user in the input
	•	each user should appear only once in the output

Requirements
	•	Return one output item per unique userId.
	•	Count how many messages belong to each user.
	•	If the same userId appears multiple times with different userName values, keep the userName from the first occurrence.
	•	Do not mutate the input array or any input objects.
	•	Keep the function pure.

Optional edge cases
	•	empty input returns an empty array
	•	one user sends all messages
	•	users appear in interleaved order

Out of scope
	•	sorting alphabetically
	•	trimming or normalizing names
	•	grouping by message text
	•	filtering empty messages

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
