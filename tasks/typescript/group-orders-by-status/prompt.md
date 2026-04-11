Title

Group Orders by Status

Category

typescript

Type

data transformation

Difficulty

easy

Focus areas

- array iteration
- object accumulation
- TypeScript records
- pure function design
- readability

Task

You are given a list of orders.
Each order has an id, customer name, and status.

Your task is to implement a utility that groups the orders by status.

The result should make it easy for other parts of the application to read all orders for a given status.

Keep the solution small, practical, and easy to explain.

Requirements

- group orders by their status
- return a new object where each key is a status
- each key should contain an array of matching orders
- preserve the original order of items inside each status group
- do not mutate the input array
- keep the solution as a small pure utility
- use TypeScript without any

Optional edge cases

- the input array may be empty
- all orders may have the same status
- some statuses may have only one order
- a new status may be added later without changing the grouping logic

What Codex should scaffold

- create only the minimal files needed
- do not solve the main task
- add TODO comments where the main logic belongs
- include a small input dataset with several statuses
- include a function signature and expected output example in comments
- keep everything framework-free

Why this is good interview practice

- it tests a common real-world transformation task
- it checks whether you can write clean accumulation logic
- it stays small while still showing how you think about data shape

What the interviewer is likely testing

- whether you can transform arrays into keyed objects
- whether you can keep logic pure and readable
- whether you preserve data without mutating inputs
- whether you choose a sensible output shape

Possible follow-up questions

- Would you use reduce or a for...of loop here, and why?
- How would you type the return value if statuses are known in advance?
- How would you handle invalid status values from an external API?
- How would you sort orders inside each group if needed?
