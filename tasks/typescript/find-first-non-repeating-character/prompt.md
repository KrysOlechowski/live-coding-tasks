Title

Find First Non-Repeating Character

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	frequency lookup
	•	string traversal
	•	ordered selection

Task

You are given a string. Implement a function that returns the first character that appears exactly once in the string.

The goal is to identify the first non-repeating character while preserving the original character order.

Expected input / output
	•	input:
	•	a single string
	•	output:
	•	the first non-repeating character as a string
	•	return null if no such character exists
	•	any ordering / normalization / immutability expectations:
	•	evaluate characters in their original order
	•	treat uppercase and lowercase letters as different characters
	•	do not trim, normalize, or reorder the input string

Requirements
	•	Return the first character whose total occurrence count in the input string is exactly 1.
	•	If all characters repeat, return null.
	•	If the input string is empty, return null.
	•	Spaces and punctuation should be treated like normal characters.
	•	Keep the function pure.

Optional edge cases
	•	the first character is already unique
	•	the only unique character appears at the end
	•	the string contains spaces or punctuation
	•	the string contains repeated casing variants such as a and A

Out of scope
	•	Unicode grapheme cluster handling
	•	locale-aware character comparison
	•	trimming whitespace
	•	returning the character index instead of the character

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
