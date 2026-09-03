export type Order = {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  totalCents: number;
  isPaid: boolean;
};

export type OrderListItem = {
  id: string;
  customerName: string;
  totalLabel: string;
  status: "Paid" | "Pending";
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
  },
  {
    id: "order-102",
    customer: {
      firstName: "Jan",
      lastName: "Kowalski",
    },
    totalCents: 4_500,
    isPaid: false,
  },
];

export function formatMoney(cents: number): string {
  return `${(cents / 100).toFixed(2)} PLN`;
}

export function toOrderListItems(orders: Order[]): OrderListItem[] {
  // TODO: transform every order into an OrderListItem using Array.prototype.map.
  return [];
}

console.log(toOrderListItems(sampleOrders));

