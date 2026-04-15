Title

Check If Two Strings Are Anagrams

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas
	•	frequency comparison
	•	string normalization rules
	•	early mismatch detection

Task

You are given two strings. Implement a function that returns whether they are anagrams of each other.

Two strings are anagrams if they contain the same characters with the same counts after applying the comparison rules described below.

Expected input / output
	•	input:
	•	first: string
	•	second: string
	•	output:
	•	true if the strings are anagrams
	•	false otherwise
	•	any ordering / normalization / immutability expectations:
	•	compare characters after converting both strings to lowercase
	•	ignore spaces completely
	•	preserve input immutability

Requirements
	•	Return true only when both normalized strings contain exactly the same characters with the same frequencies.
	•	Convert both strings to lowercase before comparison.
	•	Ignore all space characters.
	•	Do not ignore punctuation or digits.
	•	If the normalized strings have different lengths, return false.
	•	Keep the function pure.

Optional edge cases
	•	both strings are empty
	•	strings differ only by casing
	•	strings contain repeated letters
	•	strings contain punctuation that prevents them from being anagrams

Out of scope
	•	locale-aware casing
	•	ignoring punctuation
	•	Unicode normalization
	•	returning mismatch details

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
