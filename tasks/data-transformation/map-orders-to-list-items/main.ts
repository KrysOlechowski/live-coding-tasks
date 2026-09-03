export type Order = {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  totalCents: number;
  isPaid: boolean;
  items: { quantity: number }[];
};

export type OrderListItem = {
  id: string;
  customerName: string;
  totalLabel: string;
  status: "Paid" | "Pending";
  itemCount: number;
};

export const sampleOrders: Order[] = [
  {
    id: "order-101",
    customer: {
      firstName: "Marta",
      lastName: "Nowak",
    },
    totalCents: 12_999,
    isPaid: true,
    items: [{ quantity: 2 }, { quantity: 3 }],
  },
  {
    id: "order-102",
    customer: {
      firstName: "Jan",
      lastName: "Kowalski",
    },
    totalCents: 4_500,
    isPaid: false,
    items: [],
  },
];

export function formatMoney(cents: number): string {
  return `${(cents / 100).toFixed(2)} PLN`;
}

export function toOrderListItems(orders: Order[]): OrderListItem[] {
  return orders.map((order): OrderListItem => {
    const itemCount = order.items.reduce((sum, ord) => sum + ord.quantity, 0);
    return {
      id: order.id,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      totalLabel: formatMoney(order.totalCents),
      status: order.isPaid ? "Paid" : "Pending",
      itemCount,
    };
  });
}

console.log(toOrderListItems(sampleOrders));
