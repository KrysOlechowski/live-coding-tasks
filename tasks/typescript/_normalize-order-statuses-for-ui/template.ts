type RawOrder = {
  id: string;
  status?: string;
  state?: string;
};

type DisplayStatus =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Unknown";

type NormalizedOrder = {
  id: string;
  displayStatus: DisplayStatus;
  isFinal: boolean;
  canBeCancelled: boolean;
};

const orders: RawOrder[] = [
  { id: "o1", status: "pending" },
  { id: "o2", state: "PAID" },
  { id: "o3", status: "shipped" },
  { id: "o4", status: "canceled" },
  { id: "o5", state: "" },
  { id: "o6" },
  { id: "o7", status: "confirmed", state: "delivered" },
];

export function normalizeOrders(input: RawOrder[]): NormalizedOrder[] {
  // TODO: return a new array instead of mutating the original input
  // TODO: read status from both `status` and `state`
  // TODO: normalize unexpected, missing, and differently-cased values safely
  // TODO: map raw backend values to the required displayStatus values
  // TODO: derive isFinal and canBeCancelled from the normalized displayStatus
  return [];
}

console.log(normalizeOrders(orders));
