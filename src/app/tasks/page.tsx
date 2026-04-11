import Link from "next/link";

import {
  filterTasks,
  getAllTasks,
  getPenaltyLabel,
  getProgressLabel,
  getTaskFilterOptions,
} from "@/lib/tasks";

function getValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const filters = {
    category: getValue(resolvedSearchParams.category),
    difficulty: getValue(resolvedSearchParams.difficulty),
    penalty: getValue(resolvedSearchParams.penalty),
    preview: getValue(resolvedSearchParams.preview),
    progress: getValue(resolvedSearchParams.progress),
  };

  const [tasks, filterOptions] = await Promise.all([
    getAllTasks(),
    getTaskFilterOptions(),
  ]);
  const filteredTasks = filterTasks(tasks, filters);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-12 sm:px-10">
      <section className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700 dark:text-amber-400">
          Task Library
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Every task gets its own page, metadata, and optional preview route.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              The list below is generated from `tasks/*/*/task.md` frontmatter. Filters
              work on metadata only, so routing stays stable even when review penalty changes.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-zinc-200 bg-white/75 p-5 shadow-sm shadow-zinc-950/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
            <div>
              <div className="text-3xl font-semibold text-zinc-950 dark:text-white">
                {tasks.length}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">All tasks</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-zinc-950 dark:text-white">
                {filteredTasks.length}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Matching current filters
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-sm shadow-zinc-950/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
        <form className="grid gap-4 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
          <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Category
            <select
              name="category"
              defaultValue={filters.category ?? ""}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">All categories</option>
              {filterOptions.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Difficulty
            <select
              name="difficulty"
              defaultValue={filters.difficulty ?? ""}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">All difficulties</option>
              {filterOptions.difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Penalty
            <select
              name="penalty"
              defaultValue={filters.penalty ?? ""}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">All penalties</option>
              {filterOptions.penalties.map((penalty) => (
                <option key={penalty} value={penalty}>
                  {penalty === "0" ? "0" : penalty}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Preview
            <select
              name="preview"
              defaultValue={filters.preview ?? ""}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">All tasks</option>
              <option value="with-preview">With preview</option>
              <option value="without-preview">Without preview</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Progress
            <select
              name="progress"
              defaultValue={filters.progress ?? ""}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-zinc-950 outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">All statuses</option>
              {filterOptions.progress.map((progress) => (
                <option key={progress} value={progress}>
                  {progress === "not-started" ? "Not started" : "Reviewed"}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Apply filters
            </button>
            <Link
              href="/tasks"
              className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Reset
            </Link>
          </div>
        </form>
      </section>

      <section className="grid gap-4">
        {filteredTasks.map((task) => (
          <Link
            key={task.slug}
            href={`/tasks/${task.slug}`}
            className="grid gap-4 rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-sm shadow-zinc-950/5 transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-950/10 dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:border-amber-600"
          >
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
                {task.category}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {task.difficulty}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {task.type}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {getPenaltyLabel(task.penalty)}
              </span>
              {task.hasPreview ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200">
                  Preview
                </span>
              ) : null}
              <span className="rounded-full bg-sky-100 px-3 py-1 font-medium text-sky-900 dark:bg-sky-500/20 dark:text-sky-200">
                {getProgressLabel(task.hasReview)}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                {task.title}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Slug: <span className="font-mono">{task.slug}</span>
              </p>
            </div>

            <p className="line-clamp-2 text-zinc-600 dark:text-zinc-300">
              {task.taskBody.split("\n").find((line) => line.trim() && !line.startsWith("#")) ??
                "Open the task to read the full brief."}
            </p>
          </Link>
        ))}

        {filteredTasks.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white/60 p-10 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-300">
            No tasks match the current filter set.
          </div>
        ) : null}
      </section>
    </main>
  );
}
