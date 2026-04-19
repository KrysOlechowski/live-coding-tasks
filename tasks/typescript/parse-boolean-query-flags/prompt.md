Title

Parse Boolean Query Flags

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	string parsing
	•	explicit boolean rules
	•	output shaping

Task

You are given a URL query string. Implement a function that extracts boolean feature flags from it.

Only keys that start with flag_ should be included in the output. Each included value should be converted to a boolean using the parsing rules below.

Expected input / output
	•	input:
	•	a single query string, for example:
	•	"?flag_beta=true&flag_debug=0&page=2&flag_newUI=yes"
	•	output:
	•	an object in this shape:
	•	Record<string, boolean>
	•	example output for the input above:
	•	{ beta: true, debug: false, newUI: true }
	•	any ordering / normalization / immutability expectations:
	•	remove the flag_ prefix from output keys
	•	preserve the order of first appearance of valid flag keys when iterating through the query entries
	•	treat keys case-sensitively

Requirements
	•	Include only query parameters whose key starts with flag_.
	•	Remove the flag_ prefix in the output key.
	•	Parse values using these rules:
	•	"true" -> true
	•	"1" -> true
	•	"yes" -> true
	•	"false" -> false
	•	"0" -> false
	•	"no" -> false
	•	Treat all other values as invalid and ignore those entries.
	•	If the same valid flag key appears multiple times, keep the last valid value.
	•	Ignore entries where the key becomes empty after removing flag_.
	•	If the input string is empty or contains no valid flags, return an empty object.
	•	Keep the function pure.

Optional edge cases
	•	query string does not start with ?
	•	repeated flag keys with mixed valid and invalid values
	•	unrelated query parameters appear between flag entries
	•	a flag key exists with an empty value

Out of scope
	•	decoding URL-encoded characters
	•	nested query structures
	•	arrays in query params
	•	case-insensitive matching of keys or values

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
---
add also task_pl.md with the translation of task.md
