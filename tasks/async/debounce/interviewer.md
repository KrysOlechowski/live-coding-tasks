## Expected behavior

The wrapper defers execution until the quiet period has elapsed and invokes the
callback once with the latest complete argument list. It remains reusable after
execution, and separate wrappers operate independently.

## Important cases

- A single call and a burst of calls before execution.
- Later use after a completed invocation.
- Multiple arguments, no arguments, and zero delay.
- Overlapping activity on two independent wrappers.
- Timer assertions allow scheduling delays and check that execution is not early.

## Review focus

Correct observable timing and invocation counts, latest-argument forwarding,
instance independence, and readable code consistent with the supplied signature.
Keep review within the stated scope; no cancellation or leading-edge extension.
