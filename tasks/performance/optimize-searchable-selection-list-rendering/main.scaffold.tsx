"use client";

import { useState } from "react";

type CustomerStatus = "Active" | "Trial" | "Paused";

type Customer = {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
};

const FIRST_NAMES = [
  "Ava",
  "Benjamin",
  "Camila",
  "Daniel",
  "Elena",
  "Felix",
  "Grace",
  "Hugo",
  "Iris",
  "Jonah",
  "Kira",
  "Liam",
];

const LAST_NAMES = [
  "Anderson",
  "Bennett",
  "Chen",
  "Diaz",
  "Edwards",
  "Fischer",
  "Garcia",
  "Hughes",
  "Ivanov",
  "Johnson",
  "Kowalski",
  "Lopez",
];

const STATUSES: CustomerStatus[] = ["Active", "Trial", "Paused"];

const CUSTOMERS: Customer[] = Array.from({ length: 480 }, (_, index) => {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName =
    LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length];
  const number = index + 1;

  return {
    id: `customer-${number}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}.${number}@example.com`.toLowerCase(),
    status: STATUSES[index % STATUSES.length],
  };
});

function CustomerRow({
  customer,
  isSelected,
  onToggle,
}: {
  customer: Customer;
  isSelected: boolean;
  onToggle: (customerId: string) => void;
}) {
  return (
    <li className="flex items-center gap-4 border-b border-slate-200 px-4 py-3 last:border-b-0">
      <input
        aria-label={`Select ${customer.name}`}
        checked={isSelected}
        onChange={() => onToggle(customer.id)}
        type="checkbox"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">{customer.name}</p>
        <p className="truncate text-sm text-slate-600">{customer.email}</p>
      </div>

      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
        {customer.status}
      </span>
    </li>
  );
}

export default function SearchableSelectionList() {
  const [query, setQuery] = useState("");
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleCustomers = CUSTOMERS.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(normalizedQuery) ||
      customer.email.toLowerCase().includes(normalizedQuery);
    const matchesSelection =
      !showSelectedOnly || selectedCustomerIds.includes(customer.id);

    return matchesSearch && matchesSelection;
  }).sort((left, right) => {
    const statusComparison = left.status.localeCompare(right.status);

    return statusComparison || left.name.localeCompare(right.name);
  });

  const selectedCount = CUSTOMERS.filter((customer) =>
    selectedCustomerIds.includes(customer.id),
  ).length;

  function handleToggle(customerId: string) {
    if (selectedCustomerIds.includes(customerId)) {
      setSelectedCustomerIds(
        selectedCustomerIds.filter((id) => id !== customerId),
      );
      return;
    }

    setSelectedCustomerIds([...selectedCustomerIds, customerId]);
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Select customers
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Choose customer records to include in the export.
          </p>
        </div>

        <p className="rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white">
          Selected: {selectedCount}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label>
          <span className="text-sm font-medium text-slate-800">
            Search customers
          </span>
          <input
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or email"
            type="search"
            value={query}
          />
        </label>

        <label className="flex items-center gap-2 rounded border border-slate-300 px-3 py-2">
          <input
            checked={showSelectedOnly}
            onChange={(event) => setShowSelectedOnly(event.target.checked)}
            type="checkbox"
          />
          <span className="text-sm font-medium text-slate-800">
            Show selected only
          </span>
        </label>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        Showing {visibleCustomers.length} of {CUSTOMERS.length} customers
      </p>

      <ul className="mt-3 max-h-128 overflow-y-auto rounded border border-slate-300 bg-white">
        {visibleCustomers.map((customer) => (
          <CustomerRow
            customer={customer}
            isSelected={selectedCustomerIds.includes(customer.id)}
            key={customer.id}
            onToggle={(customerId) => handleToggle(customerId)}
          />
        ))}
      </ul>
    </main>
  );
}
