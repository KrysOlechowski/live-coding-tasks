export type OrderEventType =
  | "created"
  | "paid"
  | "shipped"
  | "cancelled"
  | "refunded";

export type OrderEvent = {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  type: OrderEventType;
  amount?: number;
  createdAt: string;
};

export type NormalizedOrderHistoryItem = {
  orderId: string;
  customerId: string;
  customerName: string;
  latestStatus: OrderEventType;
  totalPaid: number;
  lastEventAt: string;
};

const EVENT_PRIORITY: Record<OrderEventType, number> = {
  cancelled: 5,
  refunded: 4,
  shipped: 3,
  paid: 2,
  created: 1,
};

type OrderGroupSummary = {
  orderId: string;
  customerId: string;
  customerName: string;
  latestStatus: OrderEventType;
  totalPaid: number;
  lastEventAt: string;
};

function isHigherPriorityEvent(current: OrderEvent, candidate: OrderEvent) {
  return EVENT_PRIORITY[candidate.type] > EVENT_PRIORITY[current.type];
}

function isMoreRecentEvent(current: OrderEvent, candidate: OrderEvent) {
  if (candidate.createdAt > current.createdAt) {
    return true;
  }

  if (candidate.createdAt < current.createdAt) {
    return false;
  }

  // When timestamps match exactly, the task says to break the tie by event priority.
  return isHigherPriorityEvent(current, candidate);
}

export function normalizeOrderHistory(
  events: OrderEvent[],
): NormalizedOrderHistoryItem[] {
  const groupedOrders = events.reduce<Record<string, OrderGroupSummary & { latestEvent: OrderEvent }>>(
    (acc, event) => {
      const existingOrder = acc[event.orderId];

      if (!existingOrder) {
        // The first event creates the group and also becomes the current "latest" event.
        acc[event.orderId] = {
          orderId: event.orderId,
          customerId: event.customerId,
          customerName: event.customerName,
          latestStatus: event.type,
          totalPaid:
            event.type === "paid"
              ? event.amount ?? 0
              : event.type === "refunded"
                ? -(event.amount ?? 0)
                : 0,
          lastEventAt: event.createdAt,
          latestEvent: event,
        };

        return acc;
      }

      // We only change status/name/lastEventAt when this event wins the recency comparison.
      if (isMoreRecentEvent(existingOrder.latestEvent, event)) {
        existingOrder.latestEvent = event;
        existingOrder.latestStatus = event.type;
        existingOrder.lastEventAt = event.createdAt;
        existingOrder.customerId = event.customerId;
        existingOrder.customerName = event.customerName;
      }

      // Paid increases the balance, refunded decreases it, all other events are ignored.
      if (event.type === "paid") {
        existingOrder.totalPaid += event.amount ?? 0;
      }

      if (event.type === "refunded") {
        existingOrder.totalPaid -= event.amount ?? 0;
      }

      return acc;
    },
    {},
  );

  return Object.values(groupedOrders)
    .map(({ latestEvent: _latestEvent, ...orderSummary }) => orderSummary)
    .sort((a, b) => {
      // Newer activity should come first in the final list.
      if (a.lastEventAt !== b.lastEventAt) {
        return b.lastEventAt.localeCompare(a.lastEventAt);
      }

      return a.orderId.localeCompare(b.orderId);
    });
}

export const sampleEvents: OrderEvent[] = [
  {
    id: "e-101",
    orderId: "o-200",
    customerId: "c-1",
    customerName: "Ada",
    type: "created",
    createdAt: "2026-04-11T09:00:00.000Z",
  },
  {
    id: "e-102",
    orderId: "o-200",
    customerId: "c-1",
    customerName: "Ada Lovelace",
    type: "paid",
    amount: 120,
    createdAt: "2026-04-11T10:30:00.000Z",
  },
  {
    id: "e-103",
    orderId: "o-201",
    customerId: "c-2",
    customerName: "Linus",
    type: "paid",
    amount: 80,
    createdAt: "2026-04-10T12:00:00.000Z",
  },
  {
    id: "e-104",
    orderId: "o-201",
    customerId: "c-2",
    customerName: "Linus",
    type: "refunded",
    amount: 20,
    createdAt: "2026-04-10T15:00:00.000Z",
  },
  {
    id: "e-105",
    orderId: "o-200",
    customerId: "c-1",
    customerName: "Ada Lovelace",
    type: "shipped",
    createdAt: "2026-04-12T08:45:00.000Z",
  },
];

console.log(normalizeOrderHistory(sampleEvents));
