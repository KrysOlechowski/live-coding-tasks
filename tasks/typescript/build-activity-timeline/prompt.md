Title

Build Activity Timeline

Category

typescript

Type

data transformation

Difficulty

medium

Focus areas
	•	grouping and aggregation
	•	sorting by derived values
	•	immutable transformation
	•	clear output modeling

Task

You are given a flat list of user activity records. Implement a function that converts this data into a timeline summary grouped by day.

Each output day should include the day, the total number of activities for that day, and a list of users who were active on that day. For each active user, include how many activities they performed that day and the timestamp of their latest activity for that day.

The goal is to transform noisy event data into a structure that is ready for reporting or UI rendering.

Expected input / output
	•	input:
	•	an array of activity objects
	•	each activity has:
	•	id: string
	•	userId: string
	•	userName: string
	•	type: "comment" | "like" | "login" | "logout" | "purchase"
	•	createdAt: string  // ISO timestamp
	•	output:
	•	an array of objects in this shape:
	•	date: string  // YYYY-MM-DD
	•	totalActivities: number
	•	users: Array<{ userId: string userName: string activityCount: number latestActivityAt: string }>
	•	any ordering / normalization / immutability expectations:
	•	preserve input immutability
	•	group activities by UTC calendar date derived from createdAt
	•	sort output days by date descending
	•	sort users inside each day by:
	1.	activityCount descending
	2.	latestActivityAt descending
	3.	userName ascending

Requirements
	•	Return one output item per date that appears in the input.
	•	Derive the output date from the UTC date portion of createdAt.
	•	totalActivities must be the number of all activities that happened on that date.
	•	Users should appear only once per day.
	•	For each user on a given date:
	•	count all their activities for that date
	•	keep the most recent createdAt value as latestActivityAt
	•	If multiple records for the same userId on the same day contain different userName values, use the userName from the latest activity for that user on that day.
	•	Do not mutate the input array or any input objects.
	•	Keep the function pure.
	•	Assume all timestamps are valid ISO strings.

Optional edge cases
	•	empty input returns an empty array
	•	the same user appears across multiple days
	•	records arrive in random order
	•	two users have the same activityCount and the same latestActivityAt

Out of scope
	•	filtering by activity type
	•	locale-based date formatting
	•	time zone conversion beyond using UTC day grouping
	•	validation of malformed timestamps

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
