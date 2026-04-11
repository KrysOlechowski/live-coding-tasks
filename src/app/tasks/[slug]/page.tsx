import Link from "next/link";
import { notFound } from "next/navigation";

import { SimpleMarkdown } from "@/components/simple-markdown";
import { getPenaltyLabel, getTaskBySlug } from "@/lib/tasks";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const task = await getTaskBySlug(slug);

  if (!task) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Back to tasks
          </Link>
          <div className="flex flex-wrap gap-2 text-sm">
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
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {task.title}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Slug: <span className="font-mono">{task.slug}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {task.hasPreview ? (
            <Link
              href={`/tasks/${task.slug}/preview`}
              className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Open preview
            </Link>
          ) : null}
          <div className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            Source: {task.mainFileName ?? "No entry file"}
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-[2rem] border border-zinc-200 bg-white/80 p-7 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950/70">
          <SimpleMarkdown content={task.taskBody} />
        </article>

        <aside className="grid gap-4 self-start">
          <section className="rounded-[2rem] border border-zinc-200 bg-white/80 p-5 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950/70">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
              Task meta
            </h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-500 dark:text-zinc-400">Penalty</dt>
                <dd className="font-medium text-zinc-950 dark:text-white">
                  {task.penalty}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-500 dark:text-zinc-400">Preview</dt>
                <dd className="font-medium text-zinc-950 dark:text-white">
                  {task.hasPreview ? task.previewEntry : "No"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-500 dark:text-zinc-400">Review</dt>
                <dd className="font-medium text-zinc-950 dark:text-white">
                  {task.reviewBody ? "Latest review available" : "No review yet"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-500 dark:text-zinc-400">Prompt brief</dt>
                <dd className="font-medium text-zinc-950 dark:text-white">
                  {task.promptBody ? "Available" : "Missing"}
                </dd>
              </div>
            </dl>
          </section>

          {task.reviewBody ? (
            <section className="rounded-[2rem] border border-zinc-200 bg-white/80 p-5 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950/70">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
                Latest review
              </h2>
              <div className="mt-4">
                <SimpleMarkdown content={task.reviewBody} />
              </div>
            </section>
          ) : null}
        </aside>
      </section>

      {task.promptBody ? (
        <details className="rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950/70">
          <summary className="cursor-pointer text-lg font-semibold text-zinc-950 marker:text-zinc-400 dark:text-white">
            Original prompt
          </summary>
          <div className="mt-5">
            <SimpleMarkdown content={task.promptBody} />
          </div>
        </details>
      ) : null}
    </main>
  );
}
