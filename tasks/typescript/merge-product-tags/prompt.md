Title

Merge Product Tags

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	array deduplication
	•	normalization
	•	immutable transformation

Task

You are given a list of products. Implement a function that returns a new array where each product contains a cleaned list of tags.

The goal is to prepare tag data for further filtering in the UI or reporting logic.

Expected input / output
	•	input:
	•	an array of product objects
	•	each product has:
	•	id: string
	•	name: string
	•	tags: string[] | null
	•	extraTags?: string[] | null
	•	output:
	•	an array of objects in this shape:
	•	id: string
	•	name: string
	•	tags: string[]
	•	any ordering / normalization / immutability expectations:
	•	preserve the original input order
	•	do not mutate the input array or its objects
	•	trim leading and trailing whitespace from all tags
	•	treat tags case-insensitively for deduplication
	•	preserve the first visible version of each tag in output order

Requirements
	•	Return one output item for each input product.
	•	Build the output tags array by combining tags and extraTags.
	•	Treat null and undefined tag arrays as empty arrays.
	•	Ignore tags that are empty after trimming.
	•	Remove duplicates across both arrays using case-insensitive comparison.
	•	Keep the first encountered trimmed version of a tag.
	•	Keep the function pure.

Optional edge cases
	•	both arrays are missing
	•	the same tag appears many times with different casing
	•	all tags are empty or whitespace-only

Out of scope
	•	sorting tags alphabetically
	•	changing tag casing
	•	validating product names
	•	grouping products

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
