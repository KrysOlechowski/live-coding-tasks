"use client";

import { useEffect, useState } from "react";

type OrderStatus = "Paid" | "Pending" | "Cancelled";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  totalCents: number;
  status: OrderStatus;
  createdAt: string;
};

type OrderApiMode = "success" | "empty" | "error";

const SAMPLE_ORDERS: Order[] = [
  {
    id: "order-1007",
    orderNumber: "#1007",
    customerName: "Maya Chen",
    totalCents: 12840,
    status: "Paid",
    createdAt: "2026-04-18T09:24:00.000Z",
  },
  {
    id: "order-1008",
    orderNumber: "#1008",
    customerName: "Jon Bell",
    totalCents: 7649,
    status: "Pending",
    createdAt: "2026-04-18T10:12:00.000Z",
  },
  {
    id: "order-1009",
    orderNumber: "#1009",
    customerName: "Priya Shah",
    totalCents: 21400,
    status: "Cancelled",
    createdAt: "2026-04-18T11:05:00.000Z",
  },
];

function fetchRecentOrders(mode: OrderApiMode): Promise<Order[]> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (mode === "error") {
        reject(new Error("Orders could not be loaded. Try again."));
        return;
      }

      resolve(mode === "empty" ? [] : SAMPLE_ORDERS);
    }, 700);
  });
}

function formatCurrency(totalCents: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(totalCents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

type OrderRequestState =
  | { status: "loading" }
  | { status: "success"; orders: Order[] }
  | { status: "error"; message: string };

export default function OrderRequestStateScreen() {
  const [requestState, setRequestState] = useState<OrderRequestState>({
    status: "loading",
  });
  const [apiMode, setApiMode] = useState<OrderApiMode>("success");

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Initial load only; later requests are triggered by Load/Retry.
  }, []);

  async function loadOrders() {
    setRequestState({ status: "loading" });

    try {
      const nextOrders = await fetchRecentOrders(apiMode);
      setRequestState({
        status: "success",
        orders: nextOrders,
      });
    } catch (error) {
      setRequestState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Orders could not be loaded.",
      });
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Recent orders
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Review the latest customer orders from the API.
          </p>
        </div>

        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-800">API response</span>
          <select
            className="rounded border border-slate-300 bg-white px-3 py-2 text-slate-800"
            onChange={(event) => setApiMode(event.target.value as OrderApiMode)}
            value={apiMode}
          >
            <option value="success">Orders</option>
            <option value="empty">Empty</option>
            <option value="error">Error</option>
          </select>
        </label>
        <button onClick={loadOrders}>Load</button>
      </div>

      <section className="mt-6 min-h-72" aria-live="polite">
        <RenderOrderContent requestState={requestState} onRetry={loadOrders} />
      </section>
    </main>
  );
}

type RenderOrderContentProps = {
  requestState: OrderRequestState;
  onRetry: () => void;
};

const RenderOrderContent = ({
  requestState,
  onRetry,
}: RenderOrderContentProps) => {
  if (requestState.status === "loading") {
    return (
      <p className="rounded border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        Loading orders...
      </p>
    );
  }

  if (requestState.status === "error") {
    return (
      <div className="mt-4 rounded border border-red-300 bg-red-50 p-4">
        <p className="font-medium text-red-800">Could not load orders</p>
        <p className="mt-1 text-sm text-red-700">{requestState.message}</p>
        <button className="text-blue-700" onClick={onRetry}>
          Retry
        </button>
      </div>
    );
  }

  if (requestState.orders.length === 0) {
    return <p>No orders</p>;
  }

  return (
    <ul className="text-red-800 mt-4 divide-y divide-slate-200 rounded border border-slate-300 bg-white">
      {requestState.orders.map((order) => (
        <li
          className="grid gap-2 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
          key={order.id}
        >
          <div>
            <p className="font-medium text-slate-950">
              {order.orderNumber} - {order.customerName}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:justify-end">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              {order.status}
            </span>
            <span className="text-sm font-semibold text-slate-950">
              {formatCurrency(order.totalCents)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
