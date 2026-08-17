import Link from "next/link";

import { getLearningSummary } from "@/lib/learning";
import { getAllTasks } from "@/lib/tasks";

export default async function Home() {
  const [tasks, learningSummary] = await Promise.all([
    getAllTasks(),
    getLearningSummary(),
  ]);
  const previewCount = tasks.filter((task) => task.hasPreview).length;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 px-6 py-12 sm:px-10">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,420px)] lg:items-end">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700 dark:text-amber-400">
            Live Coding Interview Lab
          </p>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
              Browse interview tasks as real routes instead of loose folders.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
              Tasks are now indexed from filesystem metadata, so each exercise
              has a stable slug, a readable detail page, and optional preview
              route when the brief needs UI context.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tasks"
              className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Open task library
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-4xl border border-zinc-200 bg-white/80 p-6 shadow-sm shadow-zinc-950/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
              <div className="text-3xl font-semibold text-zinc-950 dark:text-white">
                {tasks.length}
              </div>
              <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Indexed tasks
              </div>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
              <div className="text-3xl font-semibold text-zinc-950 dark:text-white">
                {previewCount}
              </div>
              <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Preview routes
              </div>
            </div>
          </div>
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Metadata lives in `task.md` frontmatter. Reviewed tasks also expose
            their Mastery rating from `review.md`.
          </p>
        </div>
      </section>

      <section className="grid gap-5 rounded-4xl border border-zinc-200 bg-white/80 p-6 shadow-sm shadow-zinc-950/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
              Learning priorities
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Topics to revisit
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Generated from completed reviews, checkpoint evidence, and coaching
            context stored with each task.
          </p>
        </div>

        {learningSummary.topicsToRevisit.length > 0 ? (
          <ul className="grid gap-4 lg:grid-cols-2">
            {learningSummary.topicsToRevisit.map((topic) => (
              <li
                key={topic.topicId}
                className="grid gap-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-zinc-950 dark:text-white">
                    {topic.label}
                  </h3>
                  <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-900 dark:bg-violet-500/20 dark:text-violet-200">
                    {topic.priority} priority
                  </span>
                  <span className="rounded-full bg-zinc-200 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {topic.category}
                  </span>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {topic.evidenceCount} review signal
                  {topic.evidenceCount === 1 ? "" : "s"} · {topic.coachHints}{" "}
                  coach event{topic.coachHints === 1 ? "" : "s"}
                  {topic.lastMastery ? ` · last Mastery ${topic.lastMastery}/5` : ""}
                </p>

                <div className="flex flex-wrap gap-2">
                  {topic.relatedTasks.map((slug) => (
                    <Link
                      key={slug}
                      href={`/tasks/${slug}`}
                      className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-violet-400 hover:text-violet-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-violet-500 dark:hover:text-violet-300"
                    >
                      {slug}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm leading-6 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            No repetition topics yet. They will appear here after the first full
            task review.
          </div>
        )}
      </section>
    </main>
  );
}
