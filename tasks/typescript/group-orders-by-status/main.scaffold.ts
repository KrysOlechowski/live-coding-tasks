export type OrderStatus = "pending" | "paid" | "shipped";

export type Order = {
  id: string;
  customerName: string;
  status: OrderStatus;
};

export const sampleOrders: Order[] = [
  { id: "o-101", customerName: "Alice", status: "pending" },
  { id: "o-102", customerName: "Bob", status: "paid" },
  { id: "o-103", customerName: "Carla", status: "pending" },
  { id: "o-104", customerName: "Daniel", status: "shipped" },
  { id: "o-105", customerName: "Ewa", status: "paid" },
];

/*
Function signature:
  groupOrdersByStatus(orders: Order[]): Record<OrderStatus, Order[]>

Expected output shape example:
  {
    pending: [/* orders with status "pending" *\/],
    paid: [/* orders with status "paid" *\/],
    shipped: [/* orders with status "shipped" *\/]
  }
*/
export function groupOrdersByStatus(
  orders: Order[]
): Record<OrderStatus, Order[]> {
  // TODO: return a new object grouped by order status
  // TODO: preserve item order within each status group
  // TODO: keep this function pure and avoid mutating the input array

  return {
    pending: [],
    paid: [],
    shipped: [],
  };
}

console.log(groupOrdersByStatus(sampleOrders));
