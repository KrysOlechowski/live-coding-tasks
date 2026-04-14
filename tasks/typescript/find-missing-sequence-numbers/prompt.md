Title

Find Missing Sequence Numbers

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	set-like lookup
	•	range construction
	•	ordered output

Task

You are given a list of processed job records. Each record has a sequence number. Implement a function that returns all missing sequence numbers between the smallest and largest sequence number present in the input.

The goal is to detect gaps in a simple processing sequence.

Expected input / output
	•	input:
	•	an array of objects
	•	each object has:
	•	id: string
	•	sequence: number
	•	output:
	•	an array of numbers representing missing sequence numbers
	•	any ordering / normalization / immutability expectations:
	•	preserve input immutability
	•	return missing numbers in ascending order
	•	duplicate sequence values in the input should not create duplicate values in the output

Requirements
	•	Return all integers missing between the minimum and maximum sequence values found in the input.
	•	If the input is empty, return an empty array.
	•	If there are no gaps, return an empty array.
	•	Ignore duplicate sequence values when determining missing numbers.
	•	Do not mutate the input array or any input objects.
	•	Keep the function pure.
	•	Assume all sequence values are integers.

Optional edge cases
	•	input contains only one record
	•	input contains duplicate sequence values
	•	input is not sorted
	•	sequence values can be negative

Out of scope
	•	validating non-integer values
	•	sorting the input records
	•	grouping by id
	•	detecting duplicate records

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
