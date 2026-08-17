"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
};

type CartItem = Product & {
  quantity: number;
};

type CartSummary = {
  itemCount: number;
  totalPrice: number;
};

const products: Product[] = [
  { id: "desk-lamp", name: "Desk lamp", price: 48 },
  { id: "keyboard", name: "Mechanical keyboard", price: 120 },
  { id: "headphones", name: "Wireless headphones", price: 86 },
];

const initialCartItems: CartItem[] = [
  { ...products[0], quantity: 1 },
  { ...products[1], quantity: 1 },
];

function calculateSummary(items: CartItem[]): CartSummary {
  return items.reduce(
    (summary, item) => ({
      itemCount: summary.itemCount + item.quantity,
      totalPrice: summary.totalPrice + item.price * item.quantity,
    }),
    { itemCount: 0, totalPrice: 0 },
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [summary, setSummary] = useState(() =>
    calculateSummary(initialCartItems),
  );

  function updateCart(nextItems: CartItem[]) {
    setCartItems(nextItems);
    setSummary(calculateSummary(cartItems));
  }

  function addProduct(product: Product) {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const nextItems = existingItem
      ? cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...cartItems, { ...product, quantity: 1 }];

    updateCart(nextItems);
  }

  function changeQuantity(productId: string, change: number) {
    const nextItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item,
    );

    updateCart(nextItems);
  }

  function removeProduct(productId: string) {
    updateCart(cartItems.filter((item) => item.id !== productId));
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 text-zinc-950 lg:grid-cols-[1.5fr_0.8fr] dark:text-zinc-50">
      <div className="space-y-8">
        <section>
          <div className="mb-4">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Workspace shop
            </p>
            <h2 className="text-2xl font-semibold">Available products</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col justify-between gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addProduct(product)}
                  className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Add to cart
                </button>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Your cart</h2>

          {cartItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Your cart is empty.
            </div>
          ) : (
            <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-4"
                >
                  <div className="min-w-48">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      disabled={item.quantity === 1}
                      onClick={() => changeQuantity(item.id, -1)}
                      className="h-9 w-9 rounded-lg border border-zinc-300 font-medium disabled:cursor-not-allowed disabled:opacity-35 dark:border-zinc-700"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => changeQuantity(item.id, 1)}
                      className="h-9 w-9 rounded-lg border border-zinc-300 font-medium dark:border-zinc-700"
                    >
                      +
                    </button>
                  </div>

                  <p className="w-24 text-right font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeProduct(item.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <aside className="h-fit rounded-2xl bg-zinc-950 p-6 text-white lg:sticky lg:top-6 dark:bg-zinc-100 dark:text-zinc-950">
        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
          Order summary
        </p>
        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <dt>Items</dt>
            <dd className="font-semibold">{summary.itemCount}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-zinc-700 pt-4 text-lg dark:border-zinc-300">
            <dt>Total</dt>
            <dd className="font-semibold">{formatPrice(summary.totalPrice)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
