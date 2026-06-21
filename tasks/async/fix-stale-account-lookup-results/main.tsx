"use client";

import { FormEvent, useState } from "react";

type Account = {
  id: string;
  email: string;
  name: string;
  plan: "Free" | "Pro";
};

function fakeLookupAccount(email: string): Promise<Account> {
  const normalizedEmail = email.toLowerCase();
  const delay = normalizedEmail.includes("slow") ? 1800 : 600;

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (
        normalizedEmail.includes("error") ||
        normalizedEmail.includes("fail")
      ) {
        reject(new Error(`No account could be loaded for ${email}.`));
        return;
      }

      resolve({
        id: `acct_${normalizedEmail.replace(/[^a-z0-9]/g, "_")}`,
        email,
        name: email
          .split("@")[0]
          .split(/[._-]/)
          .filter(Boolean)
          .map((part) => part[0].toUpperCase() + part.slice(1))
          .join(" "),
        plan: normalizedEmail.includes("pro") ? "Pro" : "Free",
      });
    }, delay);
  });
}

export default function AccountLookup() {
  const [email, setEmail] = useState("");
  const [searchedEmail, setSearchedEmail] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [validationError, setValidationError] = useState("");
  const [asyncError, setAsyncError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(nextEmail: string) {
    setEmail(nextEmail);
    setValidationError("");

    if (!nextEmail.trim()) {
      setSearchedEmail("");
      setAccount(null);
      setAsyncError("");
      setIsLoading(false);
      return;
    }

    setAccount(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setValidationError("Enter an email address.");
      return;
    }

    setValidationError("");
    setSearchedEmail(normalizedEmail);
    setAccount(null);
    setIsLoading(true);

    try {
      const result = await fakeLookupAccount(normalizedEmail);
      setAccount(result);
      setAsyncError("");
    } catch (error) {
      setAsyncError(
        error instanceof Error ? error.message : "The account lookup failed.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">Account lookup</h1>
      <p className="mt-2 text-sm text-slate-600">
        Try emails containing <code>slow</code>, <code>pro</code>,{" "}
        <code>error</code>, or <code>fail</code> to exercise different states.
      </p>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium">Email address</span>
          <input
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            onChange={(event) => handleEmailChange(event.target.value)}
            placeholder="customer@example.com"
            type="email"
            value={email}
          />
        </label>

        {validationError ? (
          <p className="text-sm text-red-700" role="alert">
            {validationError}
          </p>
        ) : null}

        <button
          className="rounded bg-slate-900 px-4 py-2 text-white"
          type="submit"
        >
          {isLoading ? "Looking up..." : "Look up account"}
        </button>
      </form>

      <section className="mt-8 min-h-28" aria-live="polite">
        {isLoading ? (
          <p className="text-sm text-slate-600">
            Looking up {searchedEmail}...
          </p>
        ) : null}

        {asyncError ? (
          <div className="rounded border border-red-300 bg-red-50 p-4">
            <p className="font-medium text-red-800">Lookup failed</p>
            <p className="mt-1 text-sm text-red-700">{asyncError}</p>
          </div>
        ) : null}

        {account ? (
          <article className="rounded border border-slate-300 p-4">
            <h2 className="font-semibold">{account.name || "Unnamed account"}</h2>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-slate-500">Email</dt>
              <dd>{account.email}</dd>
              <dt className="text-slate-500">Account ID</dt>
              <dd>{account.id}</dd>
              <dt className="text-slate-500">Plan</dt>
              <dd>{account.plan}</dd>
            </dl>
          </article>
        ) : null}
      </section>
    </main>
  );
}
