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

const getStatus = (status = "", state = ""): DisplayStatus => {
  // PUse status first, but fall back to state if status is invalid or unknown.
  const isStatus = status.length > 0;
  const isState = state.length > 0;

  if (!isStatus && !isState) {
    return "Unknown";
  }

  if (isStatus) {
    const status_lowercase = status.toLocaleLowerCase();
    switch (status_lowercase) {
      case "pending":
      case "new":
        return "Pending";
      case "paid":
      case "confirmed":
        return "Confirmed";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
      case "canceled":
        return "Cancelled";
    }
  }
  if (!isState) {
    return "Unknown";
  }
  const state_lowercase = state.toLocaleLowerCase();
  switch (state_lowercase) {
    case "pending":
    case "new":
      return "Pending";
    case "paid":
    case "confirmed":
      return "Confirmed";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    case "cancelled":
    case "canceled":
      return "Cancelled";
    default:
      return "Unknown";
  }
};

export function normalizeOrders(input: RawOrder[]): NormalizedOrder[] {
  // TODO: return a new array instead of mutating the original input
  // TODO: read status from both `status` and `state`
  // TODO: normalize unexpected, missing, and differently-cased values safely
  // TODO: map raw backend values to the required displayStatus values
  // TODO: derive isFinal and canBeCancelled from the normalized displayStatus

  const mappedOrders = input.map((order) => {
    const displayStatus = getStatus(order?.status, order?.state);
    const isFinal =
      displayStatus === "Delivered" || displayStatus === "Cancelled";
    const canBeCancelled =
      displayStatus === "Pending" || displayStatus === "Confirmed";
    return {
      id: order.id,
      displayStatus,
      isFinal,
      canBeCancelled,
    };
  });
  return mappedOrders;
}

console.log(normalizeOrders(orders));
