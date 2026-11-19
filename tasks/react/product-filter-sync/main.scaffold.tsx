"use client";

import { useState } from "react";

const categories = ["All", "Electronics", "Home", "Books"] as const;
type CategoryFilter = (typeof categories)[number];

type Product = {
  readonly id: string;
  readonly name: string;
  readonly category: Exclude<CategoryFilter, "All">;
};

const products: readonly Product[] = [
  { id: "p1", name: "Wireless Mouse", category: "Electronics" },
  { id: "p2", name: "Desk Lamp", category: "Home" },
  { id: "p3", name: "TypeScript Handbook", category: "Books" },
  { id: "p4", name: "USB-C Hub", category: "Electronics" },
  { id: "p5", name: "Travel Mug", category: "Home" },
  { id: "p6", name: "React Patterns", category: "Books" },
];

export default function ProductFilterSync() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [visibleProducts, setVisibleProducts] =
    useState<readonly Product[]>(products);
  const [resultCount, setResultCount] = useState(products.length);

  function updateFilters(nextQuery: string, nextCategory: CategoryFilter) {
    setQuery(nextQuery);
    setCategory(nextCategory);

    const searchTerm = query.trim().toLowerCase();
    const matchingProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) &&
        (category === "All" || product.category === category),
    );

    setVisibleProducts(matchingProducts);
    setResultCount(visibleProducts.length);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 text-zinc-900 dark:text-zinc-100">
      <div>
        <h2 className="text-xl font-semibold">Product catalog</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Search products by name and category.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex min-w-48 flex-1 flex-col gap-2 text-sm font-medium">
          Search products
          <input
            type="search"
            value={query}
            onChange={(event) => updateFilters(event.target.value, category)}
            placeholder="Search by name"
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium">
          Category
          <select
            value={category}
            onChange={(event) =>
              updateFilters(query, event.target.value as CategoryFilter)
            }
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All categories" : option}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() => updateFilters("", "All")}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Reset filters
        </button>
      </div>

      <p role="status" className="text-sm font-medium">
        Results: {resultCount}
      </p>

      {visibleProducts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          No products match your filters.
        </p>
      ) : (
        <ul aria-label="Products" className="space-y-2">
          {visibleProducts.map((product) => (
            <li
              key={product.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
            >
              <span className="font-medium">{product.name}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {product.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
