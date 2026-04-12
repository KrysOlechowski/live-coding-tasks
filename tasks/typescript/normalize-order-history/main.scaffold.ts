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

export function normalizeOrderHistory(
  events: OrderEvent[],
): NormalizedOrderHistoryItem[] {
  // TODO: group events by orderId without mutating the input.
  // TODO: determine the latest event per order using createdAt, then the status priority rule for ties.
  // TODO: compute totalPaid by adding paid amounts and subtracting refunded amounts.
  // TODO: sort the final output by lastEventAt descending, then orderId ascending.
  return [];
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
