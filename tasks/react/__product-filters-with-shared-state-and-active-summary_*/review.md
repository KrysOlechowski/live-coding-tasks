1. Medium: The active filters summary does not meet the requirement to clearly describe which filter is active. In `main.tsx` around lines 42 and 163, the summary renders raw values like `lamp` and `Lighting` instead of labeled entries such as `Search: lamp` and `Category: Lighting`. That makes the summary ambiguous and misses the brief’s example format. There is also a typo in `"In stock olny"`.

Open questions / assumptions:
- I assumed the active filters summary is expected to follow the requirement example closely, not just list raw values.

Change summary:
- Filtering, controlled inputs, derived filtered results, results count, and clear-filters behavior are all implemented correctly.
- The solution keeps filtered data derived instead of duplicating it in state, which is the right state-management choice for this task.

Residual risk:
- No tests were added, so the current behavior is only validated by inspection.
