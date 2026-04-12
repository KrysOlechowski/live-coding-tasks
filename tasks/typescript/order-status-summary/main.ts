export type OrderStatus = "pending" | "paid" | "shipped";

export type Order = {
  id: string;
  customerName: string;
  status: OrderStatus;
};

export type OrderStatusSummary = {
  pending: Order[];
  paid: Order[];
  shipped: Order[];
};
export function groupOrdersByStatus(orders: Order[]): OrderStatusSummary {
  const summary: OrderStatusSummary = {
    pending: [],
    paid: [],
    shipped: [],
  };

  orders.map((order) => {
    if (order.status === "paid") {
      summary.pending.push(order);
    }
    if (order.status === "paid") {
      summary.paid.push(order);
    }
    if (order.status === "pending") {
      summary.shipped.push(order);
    }
  });

  console.log(summary);
  // TODO: iterate through the orders and place each item into the matching status array.
  // TODO: keep this as a pure transformation without mutating the input array or order objects.

  return summary;
}

export const sampleOrders: Order[] = [
  { id: "o-101", customerName: "Ada", status: "pending" },
  { id: "o-102", customerName: "Linus", status: "paid" },
  { id: "o-103", customerName: "Grace", status: "shipped" },
  { id: "o-104", customerName: "Margaret", status: "paid" },
];

console.log(groupOrdersByStatus(sampleOrders));
