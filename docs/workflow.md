# Practice workflow

1. Propose an exercise when the user asks for ideas, or choose one as part of a creation request.
2. Create the brief, private evaluation criteria, and a small unsolved starter. Initialize snapshots and finalize.
3. The user codes independently and asks ordinary questions whenever useful. There are no session commands, mandatory questions, checkpoint records, or hint levels.
4. Review the submitted solution, replace `review.md`, and finalize. No readiness state is required.
5. Use explicit topic assessments and existing task metadata to guide the next exercise.

The UI is a reader; it does not invoke AI. `/` hosts task filters and practice focus. `/tasks` redirects to `/` preserving query parameters. `/tasks/<slug>` displays the brief and full-width review; preview remains at `/tasks/<slug>/preview`.

Authored data: task brief, private criteria, starter snapshots/manifest, latest review, and topic catalog. Generated data: practice index and preview manifest. Reset restores verified snapshots and removes the current review. New tasks and reviews are retained; there is no separate interaction/attempt history.
