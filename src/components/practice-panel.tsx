import Link from "next/link";
import type { PracticeTopic, TaskSummary } from "@/lib/tasks";

const labels = { "needs-practice": "Needs practice", improving: "Improving", demonstrated: "Demonstrated in latest task" };
const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Europe/Warsaw" });

function TopicCard({ topic, tasks }: { topic: PracticeTopic; tasks: TaskSummary[] }) {
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-zinc-950 dark:text-white">{topic.label}</h3>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">{labels[topic.outcome!]}</span>
      </div>
      <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{topic.evidence}</p>
      <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        {topic.difficultyCount > 0 ? `Difficulty found in ${topic.difficultyCount} task${topic.difficultyCount === 1 ? "" : "s"}. ` : ""}
        Latest assessment: {dateFormat.format(new Date(topic.reviewedAt!))}.
      </p>
      <details className="text-sm">
        <summary className="cursor-pointer font-medium text-zinc-700 dark:text-zinc-200">Related tasks ({topic.relatedTasks.length})</summary>
        <ul className="mt-3 grid gap-2">
          {topic.relatedTasks.map((slug) => (
            <li key={slug}><Link href={`/tasks/${slug}`} className="text-amber-800 underline underline-offset-4 dark:text-amber-300">{tasks.find((task) => task.slug === slug)?.title ?? slug}{slug === topic.latestTask ? " · latest assessment" : ""}</Link></li>
          ))}
        </ul>
      </details>
    </li>
  );
}

export function PracticePanel({ topics, tasks }: { topics: PracticeTopic[]; tasks: TaskSummary[] }) {
  const assessed = topics.filter((topic) => topic.outcome !== null);
  if (!assessed.length) return null;
  const rank = { "needs-practice": 0, improving: 1, demonstrated: 2 };
  const ordered = [...assessed].sort((a, b) => rank[a.outcome!] - rank[b.outcome!] || b.difficultyCount - a.difficultyCount || Date.parse(b.reviewedAt!) - Date.parse(a.reviewedAt!) || a.id.localeCompare(b.id));
  return (
    <section aria-labelledby="practice-heading" className="grid gap-5 rounded-4xl border border-zinc-200 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/70">
      <div>
        <h2 id="practice-heading" className="text-xl font-semibold text-zinc-950 dark:text-white">Practice focus</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Your latest assessment for each topic. Open the related reviews for context.</p>
      </div>
      <ul className="grid gap-4 lg:grid-cols-3">{ordered.slice(0, 3).map((topic) => <TopicCard key={topic.id} topic={topic} tasks={tasks} />)}</ul>
      {ordered.length > 3 ? (
        <details>
          <summary className="cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-200">Show {ordered.length - 3} more {ordered.length - 3 === 1 ? "topic" : "topics"}</summary>
          <ul className="mt-4 grid gap-4 lg:grid-cols-3">{ordered.slice(3).map((topic) => <TopicCard key={topic.id} topic={topic} tasks={tasks} />)}</ul>
        </details>
      ) : null}
    </section>
  );
}
