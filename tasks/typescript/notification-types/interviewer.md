## Expected behavior

- Each channel requires its own fields and the shared message string.
- Directly assigned object literals reject unsupported channels, missing
  required fields, and fields from another variant.
- Descriptions match the specified formats for all three channels without
  modifying input values.

## Important cases

- Email without subject; push without deviceToken; SMS with an email subject.
- An unsupported channel and unguarded access to variant-specific fields.
- Empty strings remain valid and appear unchanged in descriptions.
- Previously declared variables do not require exact-object enforcement.

## Review focus

- Verify the type contract through meaningful positive and negative compiler
  checks, rather than runtime output alone.
- Check safe property access and the absence of assertions, suppression
  comments, and any-based escapes.
- Keep modeling and formatting readable. This is an easy, local exercise with
  three variants and no runtime validation or delivery behavior.
