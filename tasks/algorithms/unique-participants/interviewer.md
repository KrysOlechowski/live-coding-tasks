## Expected behavior

Return a new array with the first participant for each exact string ID, preserving first-occurrence order and leaving the input untouched.

## Important cases

- Empty input and input with no duplicates.
- Adjacent and separated duplicates, including conflicting names.
- Different IDs sharing a name; IDs differing only in case.
- All records sharing one ID.
- Input array and objects remain unchanged.

## Review focus

Check correctness, clear naming, and handling of boundaries. Ask the candidate to explain time and space complexity during review. Keep the exercise limited to this single transformation.
