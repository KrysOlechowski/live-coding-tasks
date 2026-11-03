# Task selection

Use the bounded output of `npm run task:design-context` instead of reading full indexes or historical review files. The command examines all saved task metadata and review signals locally and validates their contracts.

Choose in this order:

1. User constraints: domain, difficulty, skill, available time, exclusions, or a supplied idea.
2. A topic whose latest assessment is `needs-practice` or `improving`, using a different problem shape or activity.
3. Under-practiced topics and domain/activity combinations.

Unreviewed assignments are not proof of mastery. A `demonstrated` signal means demonstrated in that task, not permanent mastery. Missing evidence is not a weakness.

Before scaffolding, query the selected topic/shape to see prior tasks and their total matching count. If matches are numerous, inspect relevant briefs or choose a meaningfully different shape. Merely changing names or the business story is not sufficient variation. Repetition is appropriate when deliberately requested or useful for a gap.

The catalog is a temporary collection of useful patterns, not a closed syllabus or evidence of interview frequency. New exercises may be generated on request; add a concise canonical topic only if no existing ID fits. Research current interview priorities only when requested, then cite sources and distinguish recommendations from measured frequency.

Prefer one focused exercise with explicit acceptance criteria, roughly 15–30 minutes for easy, 30–50 for medium, and 50–75 for hard. The category describes the domain; taskType describes candidate activity. Keep the actual implementation work for the candidate.
