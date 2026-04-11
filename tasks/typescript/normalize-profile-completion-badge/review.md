# Review

## Findings

No major findings. The solution matches the task requirements:

- trims and checks `name` safely
- handles missing or empty `email`
- accepts only `admin`, `editor`, and `viewer`
- normalizes differently-cased roles like `"EDITOR"`
- derives `completionLabel` from `isComplete`
- returns a new array without mutating the input

## Residual risks

- There are no tests in the file, so the current confidence comes from reading the implementation rather than automated verification.
