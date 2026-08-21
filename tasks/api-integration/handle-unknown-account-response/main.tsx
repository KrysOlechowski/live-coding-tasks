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
  | { kind: "invalid-response"; message: string }
  | { kind: "maintenance"; message: string; retryAfterSeconds: number };

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
  "maintenance-success": {
    status: "maintenance",
    message: "main",
    retryAfterSeconds: 30,
  },
  "maintenance-error": {
    status: "maintenance",
    message: null,
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
  if (
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    payload === null ||
    !("status" in payload)
  ) {
    return {
      kind: "invalid-response",
      message: "Invalid response",
    };
  }

  if (payload.status === "error") {
    if (
      "error" in payload &&
      !Array.isArray(payload.error) &&
      typeof payload.error === "object" &&
      payload.error !== null
    ) {
      const err = payload.error;
      if (
        "code" in err &&
        (err.code === "NOT_FOUND" || err.code === "FORBIDDEN")
      ) {
        if ("message" in err && typeof err.message === "string") {
          return {
            kind: "service-error",
            code: err.code,
            message: err.message,
          };
        }
      }
    }
  }

  if (payload.status === "success") {
    if (
      "account" in payload &&
      !Array.isArray(payload.account) &&
      typeof payload.account === "object" &&
      payload.account !== null
    ) {
      const account = payload.account;
      if ("id" in account && typeof account.id === "string") {
        if ("name" in account && typeof account.name === "string") {
          if (
            "plan" in account &&
            (account.plan === "free" || account.plan === "pro")
          ) {
            if ("seats" in account && typeof account.seats === "number") {
              return {
                kind: "success",
                account: {
                  id: account.id,
                  name: account.name,
                  plan: account.plan,
                  seats: account.seats,
                },
              };
            }
          }
        }
      }
    }
  }

  if (payload.status === "maintenance") {
    if ("message" in payload && typeof payload.message === "string") {
      if (
        "retryAfterSeconds" in payload &&
        typeof payload.retryAfterSeconds === "number"
      ) {
        return {
          kind: "maintenance",
          message: payload.message,
          retryAfterSeconds: payload.retryAfterSeconds,
        };
      }
    }
  }

  return {
    kind: "invalid-response",
    message: "Invalid response",
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
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : null}
        </div>

        <div className="mt-6" aria-live="polite">
          {result && renderAccountResult(result)}
        </div>
      </section>
    </main>
  );
}

const renderAccountResult = (result: AccountLookupResult) => {
  switch (result.kind) {
    case "success":
      return (
        <article className="rounded-2xl border border-slate-200 p-4">
          <p className="text-lg font-semibold">{result.account.name}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <dt className="text-slate-500">Plan</dt>
            <dd className="text-right font-medium">{result.account.plan}</dd>
            <dt className="text-slate-500">Seats</dt>
            <dd className="text-right font-medium">{result.account.seats}</dd>
          </dl>
        </article>
      );
    case "service-error":
      return (
        <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          {result.message} <span className="font-medium">({result.code})</span>
        </p>
      );
    case "maintenance":
      return (
        <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          {result.message}
          {" Maintenance"}
          <span className="font-medium">({result.retryAfterSeconds})</span>
        </p>
      );
    case "invalid-response":
      return (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {result.message}
        </p>
      );
    default:
      assertNever(result);
  }
};

function assertNever(nev: never) {
  throw new Error("error");
}
