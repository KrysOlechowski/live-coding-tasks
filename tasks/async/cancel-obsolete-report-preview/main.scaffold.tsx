"use client";

import { useEffect, useState } from "react";

type Report = {
  id: string;
  name: string;
  summary: string;
  updatedAt: string;
};

const REPORTS: Report[] = [
  {
    id: "quarterly",
    name: "Quarterly revenue",
    summary: "Revenue increased by 12% compared with the previous quarter.",
    updatedAt: "Today, 08:30",
  },
  {
    id: "weekly",
    name: "Weekly activity",
    summary: "Active accounts completed 1,284 tracked actions this week.",
    updatedAt: "Today, 09:15",
  },
  {
    id: "unavailable",
    name: "Archived forecast",
    summary: "",
    updatedAt: "Unavailable",
  },
];

function fetchReport(reportId: string, signal?: AbortSignal): Promise<Report> {
  const delay = reportId === "quarterly" ? 1_500 : 450;

  console.info(`[mock-api] started: ${reportId}`);

  return new Promise((resolve, reject) => {
    function removeAbortListener() {
      signal?.removeEventListener("abort", handleAbort);
    }

    function handleAbort() {
      window.clearTimeout(timeoutId);
      removeAbortListener();
      console.info(`[mock-api] cancelled: ${reportId}`);
      reject(new DOMException("The request was aborted.", "AbortError"));
    }

    const timeoutId = window.setTimeout(() => {
      removeAbortListener();

      if (reportId === "unavailable") {
        console.info(`[mock-api] failed: ${reportId}`);
        reject(new Error("This archived report is not available."));
        return;
      }

      const report = REPORTS.find((item) => item.id === reportId);

      if (!report) {
        console.info(`[mock-api] failed: ${reportId}`);
        reject(new Error("Report not found."));
        return;
      }

      console.info(`[mock-api] completed: ${reportId}`);
      resolve(report);
    }, delay);

    if (signal?.aborted) {
      handleAbort();
      return;
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}

export default function ReportPreview() {
  const [selectedReportId, setSelectedReportId] = useState(REPORTS[0].id);
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    void fetchReport(selectedReportId)
      .then((nextReport) => {
        setReport(nextReport);
        setIsLoading(false);
      })
      .catch((reason: unknown) => {
        setReport(null);
        setError(reason instanceof Error ? reason.message : "Could not load the report.");
        setIsLoading(false);
      });
  }, [selectedReportId]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-950">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-indigo-700">Analytics workspace</p>
        <h1 className="mt-1 text-2xl font-semibold">Report preview</h1>
        <p className="mt-2 text-sm text-slate-600">
          Select the slow quarterly report, then quickly switch to another report. Request
          events are logged in the browser console.
        </p>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="Available reports">
          {REPORTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedReportId === item.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              onClick={() => setSelectedReportId(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-44 rounded-2xl border border-slate-200 bg-slate-50 p-5" aria-live="polite">
          {isLoading ? <p className="text-sm text-slate-500">Loading preview…</p> : null}

          {!isLoading && error ? (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
          ) : null}

          {!isLoading && !error && report ? (
            <article>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Updated {report.updatedAt}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{report.name}</h2>
              <p className="mt-3 leading-7 text-slate-700">{report.summary}</p>
            </article>
          ) : null}
        </div>
      </section>
    </main>
  );
}

