# Live Coding Interview Lab

A lightweight repo for practicing live-coding interview tasks with help from:

- ChatGPT for generating task briefs
- Codex for scaffolding and review
- manual coding practice in a real editor

The focus is realistic, interview-sized frontend practice, with broader coding tasks when useful.

## Workflow

1. ChatGPT generates a task brief from the core request: `category`, `taskType`, and `difficulty`.
2. Optional `focus` and `avoid` inputs guide the topic and reduce repetition.
3. Codex scaffolds the smallest useful task files under `tasks/<category>/<slug>/`.
4. You solve the task manually.
5. Codex reviews the solution, infers a positive Mastery rating from 1/5 to 5/5, and saves the feedback in `review.md`.

The taxonomy reference is [TASK_TAXONOMY.md](TASK_TAXONOMY.md). It defines allowed categories, task types, difficulty values, problem shapes, and repetition guard rules.

## Core Metadata

Task briefs use this model:

- `category`: technical domain, such as `react`, `typescript`, `async`, or `api-integration`.
- `taskType`: candidate activity or interview mode, such as `fix-bug`, `refactor-existing-code`, or `write-tests`.
- `difficulty`: `easy`, `medium`, or `hard`.

ChatGPT infers supporting metadata such as `primarySkill`, `secondarySkill`, `problemShape`, `interviewFocus`, `reviewFocus`, and `tags`.

## ▶️ Running a single task file

For TypeScript tasks, you can run a single `main.ts` file directly with `tsx` in watch mode:

```bash
npx tsx --watch tasks/<category>/<task>/main.ts
```

This is useful for quick live-coding practice because it reruns the file after every save and shows `console.log` output without wiring the task into the Next.js app.

## Finalize Task Metadata

After creating or updating task files, run:

```bash
npm run finalize:tasks
```

This validates task structure and refreshes generated metadata.

---

## Structure

```txt
.
├── AGENTS.md
├── README.md
├── TASK_TAXONOMY.md
├── gpt/
│   ├── gpt_new_task_template.md
│   ├── gpt_chat_starter.md
│   └── gpt_topics.md
├── codex/
│   ├── codex_task_scaffold.md
│   └── codex_review_workflow.md
└── tasks/
    └── <category>/
        └── <slug>/
            ├── task.md
            ├── main.scaffold.ts / main.scaffold.tsx
            ├── main.ts / main.tsx
            └── review.md
```

`main.scaffold.*` is the untouched original scaffold snapshot.
`main.*` is your working solution file.

## Task Folder Naming

Task folders use a stable slug.

Difficulty, task type, skills, problem shape, and review focus live in `task.md` frontmatter instead of being encoded in the folder name.

### Example

- `tasks/react/search-filter-users/`
- `tasks/data-transformation/normalize-orders/`
- `tasks/async/fix-stale-search-results/`

## Rules

### For ChatGPT

- generate task briefs
- avoid repeated topics
- keep tasks realistic
- do not reveal solutions, starter code, pseudocode, or hints unless asked
- follow `gpt/gpt_new_task_template.md`

### For Codex

- scaffold only the minimal needed files
- do not solve the task during setup
- use `category + taskType` to choose scaffold shape
- review like a practical interviewer
- save feedback and the inferred Mastery rating in `review.md`
- update `gpt/gpt_topics.md` during scaffolding and review
- create task folders under the correct category
- keep task folder names stable

### For the candidate

- solve tasks manually
- start simple
- think about edge cases
- improve after the first working version

## Final Idea

This repo is a practice lab, not a showcase project.

It exists to support a repeatable workflow:

**task brief → scaffold → solve → review → learn**
