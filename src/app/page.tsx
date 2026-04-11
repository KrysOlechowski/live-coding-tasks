import Link from "next/link";

import { getAllTasks } from "@/lib/tasks";

export default async function Home() {
  const tasks = await getAllTasks();
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
              Tasks are now indexed from filesystem metadata, so each exercise has a
              stable slug, a readable detail page, and optional preview route when the
              brief needs UI context.
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

        <div className="grid gap-4 rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-sm shadow-zinc-950/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
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
            Metadata lives in `task.md` frontmatter. Review penalty is now part of the
            task model instead of the folder name.
          </p>
        </div>
      </section>
    </main>
  );
}
