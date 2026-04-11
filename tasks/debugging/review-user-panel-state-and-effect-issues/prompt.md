Title

Review user panel state and effect issues

Category

debugging

Type

debugging

Difficulty

easy

Focus areas
• copied props into local state
• derived state stored separately
• inconsistent sources of truth
• incorrect useEffect usage
• maintainability in React components

Task

Create a HR coding review exercise for a React + TypeScript interview.

This is not a normal implementation task.
The goal is to review a realistic component and identify important problems.

Generate a small React component that renders user-related UI and contains a few intentional issues that are realistic for a long-lived frontend codebase.

The code should be plausible and interview-sized, not artificially broken.

The review candidate should be able to discuss:
• correctness
• stale or inconsistent state
• maintainability
• effect logic
• what may break when props change

Do not add comments that reveal the answers inside the code.

Requirements
• use React and TypeScript
• generate a realistic component for code review, not for feature implementation
• include a few intentional issues that are meaningful in practice
• prefer issues such as:
• copying props into local state
• storing derived state separately
• missing or incorrect useEffect dependencies
• inconsistent sources of truth
• optional field handling that may lead to bugs
• keep the component small enough for a live review discussion
• avoid purely stylistic issues as the main focus
• do not include comments in the code that directly point to the bugs

Optional edge cases
• users prop changes after initial render
• selectedUserId no longer matches any user
• a user has no name
• filtered or derived values become stale after prop changes

What Codex should scaffold
• create only the minimal files needed
• default expectation: task.md and main.tsx
• use the task category to place the task under tasks/debugging/
• use difficulty-based folder prefixes: \_ = easy
• for this HR coding review task, main.tsx should contain the intentionally problematic code snippet to review
• task.md should explain that the candidate’s job is to review the code, identify issues, prioritize them, and suggest improvements
• do not solve the review inside the files
• do not add comments in the code that reveal the issues
• create extra files only if clearly needed

Why this is good interview practice

This is a good HR coding review task because it practices:
• reading code under time pressure
• spotting practical React mistakes
• prioritizing important issues over minor details
• explaining consequences, not only naming the problem

What the interviewer may test with it

The interviewer may test whether the candidate notices:
• duplicated or derived state in local state
• stale state after prop changes
• incorrect assumptions in effects
• multiple sources of truth in one component
• how these issues may affect a real business app

What kinds of follow-up questions may appear

Possible follow-ups:
• Which issue is the most serious and why?
• What would you derive during render instead of storing in state?
• How would this behave after a re-fetch from the parent?
• Would you remove local state entirely or keep part of it?

⸻
