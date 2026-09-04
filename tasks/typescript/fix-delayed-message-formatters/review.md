# Task Review

## Requirement check

- Meets the task requirements: yes
- Most important missing or incorrect behavior: None. The Core behavior and follow-up implementation are complete; the remaining gap is independent explanation of declaration lifecycle.

## Mastery

Level: 3/5 — Mostly working

Reason: The final implementation is correct and concise, and closure reasoning improved, but TDZ, hoisting, and var initialization required repeated direct explanation.

## Weaknesses

- `session.json:79`, `session.json:92`, and `session.json:105` show that the behavior of a shadowing `let`, a hoisted `var`, and the distinction between binding creation and initialization were not predicted independently. Two level-3 concept explanations at `session.json:174` were needed, so declaration lifecycle is not yet interview-ready.
- `main.ts:14` and `main.ts:19` duplicate the display-name selection and formatter construction across two branches. This is correct and keeps bindings narrow, but one recipient-local selection followed by one returned formatter would be easier to scan and extend.

## Strengths

- `main.ts:13` returns exactly one formatter per recipient through `map`, preserving length and order without mutating the input.
- `main.ts:14` and `main.ts:19` choose the preferred or fallback name correctly and give each formatter its own stable `const` binding.
- `main.ts:16` and `main.ts:20` preserve the delayed function API and capture both the selected display name and prefix.
- The verified implementation handles the required sample, repeated invocation, empty input, and unchanged source data.

## Missed edge cases

- none

## What a stronger candidate would improve

- Predict scope behavior before running the code and explain separately which binding is selected, when it is initialized, and whether a later assignment is visible to a closure.
- Keep the correct binding ownership while removing the duplicated formatter-return branches.

## Main learning takeaway

- Closures retain access to bindings, while hoisting alone does not describe initialization: `var` starts as `undefined`, whereas `let` and `const` remain in the TDZ until their declarations execute.

## Suggested next step

- Predict five short nested-scope examples using `var`, `let`, and `const` without running them, then verify the outputs and explain every mismatch.

## Follow-up questions

- How does `for (var i = ...)` differ from `for (let i = ...)` when each iteration creates a delayed callback?
- What would happen if the original recipient object changed after the formatters were created?
- When might several callbacks intentionally share one mutable binding?

## Final verdict

The implementation fully solves the task and uses correct per-recipient closure state. The remaining interview gap is conceptual precision around shadowing, TDZ, and `var` initialization, which needed repeated guidance despite the correct final code.
