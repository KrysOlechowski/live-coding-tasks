Jasne. Tym razem dam Ci kolejny task w trybie HR coding review, ale trochę inny niż poprzedni, żebyś nie mielił w kółko tylko useEffect i kopiowania propsów.

⸻

Title

Review async product list fetch and UI state issues

Category

debugging

Type

debugging

Difficulty

easy

Focus areas
• async flow in React
• loading and error handling
• missing res.ok checks
• cleanup and race-condition-adjacent issues
• maintainability of UI state

Task

Create a HR coding review exercise for a React + TypeScript interview.

This is not a normal implementation task.
The goal is to review a realistic component and identify important problems.

Generate a small React component that fetches and renders a product list and contains a few intentional issues that are realistic for a long-lived frontend codebase.

The code should be plausible and interview-sized, not artificially broken.

The review candidate should be able to discuss:
• async correctness
• loading and error handling
• what happens if the request fails
• whether the component may behave incorrectly on re-render or unmount
• maintainability of the state model

Do not add comments that reveal the answers inside the code.

Requirements
• use React and TypeScript
• generate a realistic component for code review, not for feature implementation
• include a few intentional issues that are meaningful in practice
• prefer issues such as:
• missing res.ok check
• incomplete loading/error state handling
• no cleanup or unsafe async effect behavior
• duplicated or unnecessary state
• unsafe optional field access
• state updates that may become inconsistent
• keep the component small enough for a live review discussion
• avoid purely stylistic issues as the main focus
• do not include comments in the code that directly point to the bugs

Optional edge cases
• the request returns a non-200 response
• the component unmounts before the request finishes
• the API returns missing optional fields
• a second request could overwrite a previous result
• the UI shows stale loading or error information

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
• reading async React code under time pressure
• spotting practical frontend reliability issues
• reasoning about request failure paths
• discussing maintainability of loading and error states

What the interviewer may test with it

The interviewer may test whether the candidate notices:
• missing validation of HTTP responses
• weak error handling
• stale or unsafe async effect behavior
• duplicated state or inconsistent UI state transitions
• assumptions about API data that may break in production

What kinds of follow-up questions may appear

Possible follow-ups:
• What happens if the backend returns 500 with JSON?
• Would you keep separate loading, error, and data state?
• How would you make this safer on unmount?
• Which issue is the most serious in production?
