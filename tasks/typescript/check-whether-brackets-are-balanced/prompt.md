Title

Check Whether Brackets Are Balanced

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas

* stack-like thinking
* character filtering
* early invalid detection

Task

You are given a string that may contain different types of brackets. Implement a function that returns whether the brackets in the string are balanced.

A string is considered balanced when every opening bracket has a matching closing bracket of the same type, and brackets are closed in the correct order.

Expected input / output

* input:
    * a single string
* output:
    * true if the bracket sequence is balanced
    * false otherwise
* any ordering / normalization / immutability expectations:
    * evaluate brackets in the original order
    * ignore all non-bracket characters
    * preserve input immutability

Requirements

* Support these bracket types:
    * ()
    * []
    * {}
* Ignore all characters that are not one of the supported brackets.
* Return false if a closing bracket appears before a matching opening bracket.
* Return false if bracket types do not match.
* Return false if any opening brackets remain unmatched at the end.
* Return true only when all brackets are matched in the correct order.
* Keep the function pure.

Optional edge cases

* empty string
* string with no brackets at all
* nested balanced brackets
* interleaved invalid bracket order
* extra opening or closing bracket

Out of scope

* angle brackets such as < >
* quoted string parsing
* escaping rules
* Unicode bracket variants

What Codex should scaffold

* create only the minimal files needed
* do not solve the main task
* add TODO comments for the main logic
* default expectation: task.md and main.ts
* place the task under tasks/<category>/<slug>/ using a stable slug
* use task.md frontmatter metadata with at least:
    * title
    * slug
    * category
    * type
    * difficulty
    * penalty (default 0)
    * hasPreview (true or false)
    * previewEntry only when hasPreview is true
* keep category, type, and difficulty in frontmatter, not duplicated in task body
* if the task needs a UI/runtime preview, set hasPreview: false
* for non-React tasks that include sample input data, prefer a directly runnable main.ts scaffold via a tiny console.log(exampleFunction(sampleInput)) line instead of requiring a separate runner file
* keep review.md as the latest review only (absence of review.md means not started yet)
* create extra files only if clearly needed
