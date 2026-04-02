import { useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

const initialItems: OrderItem[] = [
  {
    id: "line-1",
    name: " Notebook ",
    unitPrice: 12.5,
    quantity: 2,
  },
  {
    id: "line-2",
    name: "Mechanical Pencil",
    unitPrice: 4.25,
    quantity: 1,
  },
  {
    id: "line-3",
    name: "Desk Lamp",
    unitPrice: 29.99,
    quantity: 1,
  },
];

type OrderItemRowProps = {
  item: OrderItem;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
};

function OrderItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: OrderItemRowProps) {
  return (
    <li>
      <div>
        <strong>{item.name}</strong>
        <div>Unit price: ${item.unitPrice.toFixed(2)}</div>
      </div>

      <div>
        <button type="button" onClick={() => onDecrease(item.id)}>
          -
        </button>
        <span>Quantity: {item.quantity}</span>
        <button type="button" onClick={() => onIncrease(item.id)}>
          +
        </button>
      </div>

      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
}

type OrderSummaryProps = {
  totalItems: number;
  totalPrice: number;
};

function OrderSummary({ totalItems, totalPrice }: OrderSummaryProps) {
  return (
    <section>
      <h2>Order summary</h2>
      <p>Total items: {totalItems}</p>
      <p>Total price: ${totalPrice.toFixed(2)}</p>
    </section>
  );
}

export default function App() {
  const [items, setItems] = useState(initialItems);

  const totalItems = 0;
  const totalPrice = 0;

  function handleIncrease(itemId: string) {
    // TODO: update the matching item's quantity in state.
    // Keep one source of truth for the order items.
    setItems((currentItems) => currentItems);
    console.log("Increase quantity for", itemId);
  }

  function handleDecrease(itemId: string) {
    // TODO: decrease quantity, but never let it go below 1.
    // Decide whether this logic belongs inline here or in a helper.
    setItems((currentItems) => currentItems);
    console.log("Decrease quantity for", itemId);
  }

  function handleRemove(itemId: string) {
    // TODO: remove the matching item from state.
    // Removing the last item should show the empty state immediately.
    setItems((currentItems) => currentItems);
    console.log("Remove item", itemId);
  }

  return (
    <main>
      <h1>Order items</h1>

      {items.length === 0 ? (
        <section>
          {/* TODO: keep this empty state simple and clear. */}
          <p>Your order is empty.</p>
        </section>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <OrderItemRow
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
          </ul>

          {/* TODO: derive totalItems and totalPrice from items instead of storing duplicated totals in state. */}
          {/* TODO: consider trimming item names before display if you want safer UI output. */}
          <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
        </>
      )}

      {/*
        TODO: optional follow-up ideas for discussion:
        - Should this stay in one component or be split further?
        - Would a custom hook help once discounts or promo codes are added?
      */}
    </main>
  );
}
