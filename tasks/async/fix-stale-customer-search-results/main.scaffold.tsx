"use client";

import { useState, type ChangeEvent } from "react";

type Customer = {
  id: number;
  name: string;
  company: string;
};

const CUSTOMERS: Customer[] = [
  { id: 1, name: "Alice Anderson", company: "Northstar Labs" },
  { id: 2, name: "Alicia Gomez", company: "Orbit Systems" },
  { id: 3, name: "Alina Nowak", company: "Pixel Works" },
  { id: 4, name: "Bob Carter", company: "Northstar Labs" },
  { id: 5, name: "Charlie Davis", company: "Signal Studio" },
];

async function searchCustomers(query: string): Promise<Customer[]> {
  const normalizedQuery = query.trim().toLowerCase();
  const delay = normalizedQuery === "error" || normalizedQuery.length <= 2 ? 900 : 250;

  await new Promise((resolve) => setTimeout(resolve, delay));

  if (normalizedQuery === "error") {
    throw new Error("The customer service is temporarily unavailable.");
  }

  return CUSTOMERS.filter((customer) =>
    `${customer.name} ${customer.company}`.toLowerCase().includes(normalizedQuery),
  );
}

export default function CustomerSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    const normalizedQuery = nextQuery.trim();

    setQuery(nextQuery);

    if (!normalizedQuery) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    void searchCustomers(normalizedQuery)
      .then((customers) => {
        setResults(customers);
        setError(null);
      })
      .catch((reason: unknown) => {
        setResults([]);
        setError(reason instanceof Error ? reason.message : "Search failed.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-12 text-zinc-950">
      <section className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-amber-700">Customer directory</p>
        <h1 className="mt-1 text-2xl font-semibold">Find a customer</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Try typing <code className="rounded bg-zinc-100 px-1">al</code> and then{" "}
          <code className="rounded bg-zinc-100 px-1">ali</code> quickly. Use{" "}
          <code className="rounded bg-zinc-100 px-1">error</code> to simulate a failure.
        </p>

        <label className="mt-6 block text-sm font-medium" htmlFor="customer-query">
          Search by customer or company
        </label>
        <input
          id="customer-query"
          className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          value={query}
          onChange={handleQueryChange}
          placeholder="Start typing..."
        />

        <div className="mt-6" aria-live="polite">
          {isLoading ? <p className="text-sm text-zinc-500">Searching…</p> : null}
          {error ? (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
          ) : null}
          {!isLoading && !error && query.trim() && results.length === 0 ? (
            <p className="text-sm text-zinc-500">No customers found.</p>
          ) : null}
          {!error && results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((customer) => (
                <li key={customer.id} className="rounded-xl border border-zinc-200 p-3">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-zinc-500">{customer.company}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </main>
  );
}
