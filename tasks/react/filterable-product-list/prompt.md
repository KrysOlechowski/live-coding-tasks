Title

Filterable Product List with Empty State

Category

react

Type

UI state

Difficulty

easy

Focus areas
	•	controlled inputs
	•	derived state
	•	list rendering
	•	empty state UX

Task

Build a small React UI that displays a list of products and lets the user filter them by a search input and an “in stock only” checkbox.

The page should show a list of products with their name, category, and stock status. The visible list must update as the user types in the search field or toggles the checkbox.

This is a client-side UI task. Use the provided in-memory data only.

Expected input / output
	•	input:
	•	a static array of products with:
	•	id: string
	•	name: string
	•	category: string
	•	inStock: boolean
	•	output:
	•	a rendered product list filtered by:
	•	case-insensitive name search
	•	optional inStock === true constraint when the checkbox is enabled
	•	any ordering / normalization / immutability expectations:
	•	preserve the original item order
	•	do not mutate the original products array
	•	trim leading and trailing whitespace from the search value before filtering

Requirements
	•	Render a text input with a visible label for searching by product name.
	•	Render a checkbox with a visible label: In stock only.
	•	Render all products by default before any filters are applied.
	•	The search filter must be case-insensitive.
	•	The search filter must match against the product name only, not the category.
	•	When the checkbox is enabled, out-of-stock products must be excluded.
	•	When both filters are active, both conditions must apply together.
	•	Each rendered product row must show:
	•	product name
	•	category
	•	stock status as either In stock or Out of stock
	•	When no products match the current filters, render a visible empty state message: No products found.
	•	Keep the filtering logic inside the React app rather than hardcoding different output states.

Optional edge cases
	•	Searching with extra spaces around the text should behave the same as searching without those spaces.
	•	An empty search string should behave like no search filter.
	•	Rapid typing should not break the UI or produce inconsistent results.

Out of scope
	•	server fetching
	•	sorting controls
	•	category filtering
	•	pagination
	•	styling beyond basic readability
	•	debouncing
	•	URL state synchronization

What Codex should scaffold
	•	create only the minimal files needed
	•	do not solve the main task
	•	add TODO comments for the main logic
	•	default expectation: task.md and main.tsx
	•	place the task under tasks/react/filterable-product-list/ using a stable slug
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
	•	set hasPreview: true
	•	set previewEntry: main.tsx
	•	include a small hardcoded sample dataset in the scaffold
	•	keep review.md absent unless a review is explicitly created later
