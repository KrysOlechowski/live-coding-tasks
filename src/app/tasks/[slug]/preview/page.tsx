import Link from "next/link";
import { notFound } from "next/navigation";

import { renderTaskPreview } from "@/lib/task-preview-registry";
import { getTaskBySlug } from "@/lib/tasks";

export default async function TaskPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const task = await getTaskBySlug(slug);

  if (!task || !task.hasPreview) {
    notFound();
  }

  const preview = renderTaskPreview(slug);

  if (!preview) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 py-10 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/tasks/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← Back to task
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {task.title}
          </h1>
        </div>
        <div className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          Preview entry: {task.previewEntry}
        </div>
      </div>

      <section className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950">
        {preview}
      </section>
    </main>
  );
}
