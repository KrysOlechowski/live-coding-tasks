Title

Format User Display Names

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	string normalization
	•	conditional formatting
	•	immutable transformation

Task

You are given a list of users. Implement a function that returns a new array of display names ready for UI rendering.

Each display name should be built from the user’s first name and last name when available. The output should be trimmed, normalized, and safe to render in a simple user list.

Expected input / output
	•	input:
	•	an array of user objects
	•	each user has:
	•	id: string
	•	firstName: string | null
	•	lastName: string | null
	•	nickname?: string | null
	•	output:
	•	an array of objects in this shape:
	•	id: string
	•	displayName: string
	•	any ordering / normalization / immutability expectations:
	•	preserve the original input order
	•	do not mutate the input array or its objects
	•	trim leading and trailing whitespace from all used name parts
	•	collapse repeated internal spaces into a single space

Requirements
	•	Return one output item for each input user.
	•	Build displayName using these rules:
	•	if both firstName and lastName are non-empty after trimming, use "firstName lastName"
	•	if only one of them is non-empty after trimming, use that single value
	•	otherwise, if nickname is non-empty after trimming, use nickname
	•	otherwise, use "Anonymous"
	•	Treat null, undefined, empty strings, and whitespace-only strings as missing values.
	•	Normalize spacing inside each used value before building the final displayName.
	•	Keep the function pure.

Optional edge cases
	•	input contains already normalized values
	•	nickname exists but should not be used when a valid first name or last name is available

Out of scope
	•	sorting
	•	locale-aware casing
	•	deduplication
	•	validation errors for malformed input

What Codex should scaffold
	•	create only the minimal files needed
	•	do not solve the main task
	•	add TODO comments for the main logic
	•	default expectation: task.md and main.tsx or main.ts
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
	•	if no UI preview is needed, set hasPreview: false
	•	for non-React tasks that include sample input data, prefer a directly runnable main.ts scaffold via a tiny console.log(exampleFunction(sampleInput)) line instead of requiring a separate runner file
	•	keep review.md as the latest review only (absence of review.md means not started yet)
	•	create extra files only if clearly needed
