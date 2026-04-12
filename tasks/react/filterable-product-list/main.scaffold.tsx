"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  inStock: boolean;
};

const products: Product[] = [
  { id: "p-1", name: "Running Shoes", category: "Footwear", inStock: true },
  { id: "p-2", name: "Trail Backpack", category: "Accessories", inStock: false },
  { id: "p-3", name: "Water Bottle", category: "Accessories", inStock: true },
  { id: "p-4", name: "Windbreaker", category: "Apparel", inStock: true },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  // TODO: derive the visible products from `products`, `search`, and `inStockOnly`.
  // TODO: keep the search filter case-insensitive and trim whitespace before filtering.
  const visibleProducts = products;

  return (
    <main style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 720 }}>
      <h1>Filterable Product List</h1>

      <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Search products</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product name"
          />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
          />
          <span>In stock only</span>
        </label>
      </div>

      {/* TODO: render the filtered list and show an empty state when nothing matches. */}
      <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            style={{ border: "1px solid #d4d4d8", borderRadius: 8, padding: 12 }}
          >
            <strong>{product.name}</strong>
            <div>Category: {product.category}</div>
            <div>{product.inStock ? "In stock" : "Out of stock"}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
