"use client";

import { useState, type FormEvent } from "react";

type AccountPlan = "free" | "pro";
type ServiceErrorCode = "NOT_FOUND" | "FORBIDDEN";

type Account = {
  id: string;
  name: string;
  plan: AccountPlan;
  seats: number;
};

type AccountLookupResult =
  | { kind: "success"; account: Account }
  | { kind: "service-error"; code: ServiceErrorCode; message: string }
  | { kind: "invalid-response"; message: string };

const MOCK_RESPONSES: Record<string, unknown> = {
  "acct-pro": {
    status: "success",
    account: {
      id: "acct-pro",
      name: "Northstar Labs",
      plan: "pro",
      seats: 24,
    },
  },
  "acct-free": {
    status: "success",
    account: {
      id: "acct-free",
      name: "Pixel Works",
      plan: "free",
      seats: 3,
    },
  },
  missing: {
    status: "error",
    error: {
      code: "NOT_FOUND",
      message: "No account exists for this identifier.",
    },
  },
  forbidden: {
    status: "error",
    error: {
      code: "FORBIDDEN",
      message: "You do not have access to this account.",
    },
  },
  broken: {
    status: "success",
    account: {
      id: 42,
      name: null,
      plan: "enterprise",
      seats: "many",
    },
  },
};

async function fetchAccount(accountId: string): Promise<unknown> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  return MOCK_RESPONSES[accountId] ?? MOCK_RESPONSES.missing;
}

function decodeAccountResponse(payload: unknown): AccountLookupResult {
  void payload;

  // TODO: Validate and adapt the unknown API payload.
  return {
    kind: "invalid-response",
    message: "Response validation has not been implemented.",
  };
}

export default function AccountLookup() {
  const [accountId, setAccountId] = useState("acct-pro");
  const [result, setResult] = useState<AccountLookupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    const payload = await fetchAccount(accountId.trim());

    setResult(decodeAccountResponse(payload));
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-950">
      <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-blue-700">Account dashboard</p>
        <h1 className="mt-1 text-2xl font-semibold">Load account details</h1>
        <p className="mt-2 text-sm text-slate-600">
          Try <code className="rounded bg-slate-100 px-1">acct-pro</code>,{" "}
          <code className="rounded bg-slate-100 px-1">acct-free</code>,{" "}
          <code className="rounded bg-slate-100 px-1">missing</code>,{" "}
          <code className="rounded bg-slate-100 px-1">forbidden</code>, or{" "}
          <code className="rounded bg-slate-100 px-1">broken</code>.
        </p>

        <form className="mt-6 flex gap-3" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="account-id">
            Account identifier
          </label>
          <input
            id="account-id"
            className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={accountId}
            onChange={(event) => setAccountId(event.target.value)}
            placeholder="Account identifier"
          />
          <button
            className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            type="submit"
          >
            Load
          </button>
        </form>

        <div className="mt-6" aria-live="polite">
          {isLoading ? <p className="text-sm text-slate-500">Loading…</p> : null}

          {!isLoading && result?.kind === "success" ? (
            <article className="rounded-2xl border border-slate-200 p-4">
              <p className="text-lg font-semibold">{result.account.name}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <dt className="text-slate-500">Plan</dt>
                <dd className="text-right font-medium">{result.account.plan}</dd>
                <dt className="text-slate-500">Seats</dt>
                <dd className="text-right font-medium">{result.account.seats}</dd>
              </dl>
            </article>
          ) : null}

          {!isLoading && result?.kind === "service-error" ? (
            <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              {result.message} <span className="font-medium">({result.code})</span>
            </p>
          ) : null}

          {!isLoading && result?.kind === "invalid-response" ? (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {result.message}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
