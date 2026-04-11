# 🧪 Live Coding Interview Lab

A lightweight repo for practicing **live-coding interview tasks** with help from:

- 💬 **ChatGPT** for generating task briefs
- 🤖 **Codex** for scaffolding and review
- 👨‍💻 **manual coding practice** in a real editor

---

## ✨ Goal

This repo is built for:

- ⚛️ frontend interview practice
- 🧠 problem solving
- 🔍 debugging
- ♻️ refactoring
- 📦 data transformation
- 🧮 algorithms and data structures when useful

The focus is on **realistic interview-sized tasks**, not collecting perfect solutions.

---

## 🧭 Workflow

### 1. 💬 Generate a task brief

Use ChatGPT to create a realistic task based on current interview prep.

Files:

- `gpt/gpt_new_task_template.md`
- `gpt/gpt_chat_starter.md`
- `gpt/gpt_topics.md`

### 2. 🤖 Let Codex scaffold the task

Codex creates a **minimal starter** for the task.

Files:

- `codex/codex_task_scaffold.md`
- `AGENTS.md`

### 3. 👨‍💻 Solve the task manually

Write the solution yourself inside the task folder.

### 4. 🔍 Review the solution

Codex reviews the solution and saves feedback in `review.md`.

Files:

- `codex/codex_review_workflow.md`

---

## ▶️ Running a single task file

For TypeScript tasks, you can run a single `main.ts` file directly with `tsx` in watch mode:

```bash
npx tsx --watch tasks/<category>/<task>/main.ts
```

This is useful for quick live-coding practice because it reruns the file after every save and shows `console.log` output without wiring the task into the Next.js app.

## 🔄 Sync generated metadata

After creating/updating tasks or GPT workflow files, refresh generated metadata:

```bash
npm run sync:metadata
```

---

## 🗂️ Structure

```txt
.
├── AGENTS.md
├── README.md
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

---

## 🏷️ Task folder naming

Task folders use a stable slug.

Difficulty, task type, and penalty level live in `task.md` frontmatter instead of being encoded in the folder name.

### Example

- `tasks/react/search-filter-users/`
- `tasks/dsa/group-and-sort-transactions/`
- `tasks/debugging/fix-broken-widget/`

---

## 🧩 Task Types

This repo may include:

- ⚛️ React / UI tasks
- 🔄 async flow tasks
- 🐞 debugging tasks
- 🧼 refactoring tasks
- 📊 data transformation tasks
- 🧠 algorithms / data structures
- 🧱 architecture-oriented coding exercises

It is **frontend-focused**, but not limited to React-only tasks.

---

## 📌 Rules

### For ChatGPT

- generate task briefs
- avoid repeated topics
- keep tasks realistic
- do not reveal solutions unless asked

### For Codex

- scaffold only the minimal needed files
- do not solve the task during setup
- review like a practical interviewer
- save feedback in `review.md`
- create task folders under the correct category
- keep task folder names stable and update task metadata instead of renaming folders after review

### For the candidate

- solve tasks manually
- start simple
- think about edge cases
- improve after the first working version

---

## 🎯 Final idea

This repo is a **practice lab**, not a showcase project.

It exists to support a repeatable workflow:

**task brief → scaffold → solve → review → learn**
