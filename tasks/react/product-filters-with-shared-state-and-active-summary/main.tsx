"use client";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  inStock: boolean;
};

const products: Product[] = [
  { id: "p-1", name: " Desk Lamp ", category: "Lighting", inStock: true },
  { id: "p-2", name: "Floor Lamp", category: "Lighting", inStock: false },
  { id: "p-3", name: "Office Chair", category: "Furniture", inStock: true },
  { id: "p-4", name: "Standing Desk", category: "Furniture", inStock: false },
  { id: "p-5", name: "Notebook Set", category: "Stationery", inStock: true },
  { id: "p-6", name: "Pen Holder", category: "Stationery", inStock: true },
];

function ProductRow({ product }: { product: Product }) {
  return (
    <li className="border p-4">
      <strong>{product.name}</strong>
      <div>Category: {product.category}</div>
      <div>{product.inStock ? "In stock" : "Out of stock"}</div>
    </li>
  );
}

const getCategoriesFromProductsList = (products: Product[]): string[] => {
  let categoriesArray: string[] = [];
  products.map((product) => {
    if (categoriesArray.includes(product.category)) {
      return;
    }
    categoriesArray.push(product.category);
  });

  return categoriesArray;
};

const getActiveFilters = (
  search: string,
  selectedCategory: string,
  inStockOnly: boolean,
) => {
  let arrayOfActiveFilters = [];
  if (search.length > 0) arrayOfActiveFilters.push(search);
  if (selectedCategory !== "all") arrayOfActiveFilters.push(selectedCategory);
  if (inStockOnly) arrayOfActiveFilters.push("In stock olny");

  return arrayOfActiveFilters;
};

const getFilteredProductsList = (
  products: Product[],
  search: string,
  selectedCategory: string,
  inStockOnly: boolean,
) => {
  let newProducts: Product[] = [...products];
  if (inStockOnly) {
    const inStockOnlyProducts = newProducts.filter((product) => {
      return product.inStock === true;
    });
    newProducts = inStockOnlyProducts;
  }
  if (selectedCategory !== "all") {
    const selectedCategoryProducts = newProducts.filter((product) => {
      return product.category === selectedCategory;
    });
    newProducts = selectedCategoryProducts;
  }

  if (search.trim().length > 0) {
    const searchedProducts = newProducts.filter((product) => {
      return product.name.toLowerCase().includes(search.trim().toLowerCase());
    });
    newProducts = searchedProducts;
  }
  return newProducts;
};

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = getCategoriesFromProductsList(products);

  const activeFilters: string[] = getActiveFilters(
    search,
    selectedCategory,
    inStockOnly,
  );

  const filteredProducts = getFilteredProductsList(
    products,
    search,
    selectedCategory,
    inStockOnly,
  );

  function handleClearFilters() {
    setSearch("");
    setSelectedCategory("all");
    setInStockOnly(false);
  }

  return (
    <main className="border p-4">
      <h1>Product filters</h1>

      <section>
        <label>
          Search
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
          />
        </label>

        <label>
          Category
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
          />
          In stock only
        </label>

        <button
          className="border p-2"
          type="button"
          onClick={handleClearFilters}
        >
          Clear filters
        </button>
      </section>

      <section className="border p-2">
        <h2>Active filters</h2>
        {activeFilters.length === 0 ? (
          <p>No active filters.</p>
        ) : (
          <ul>
            {activeFilters.map((filter) => (
              <li key={filter}>{filter}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Products</h2>
        <p>Showing {filteredProducts?.length} results</p>

        {filteredProducts?.length === 0 ? (
          <p>No products match the current filters.</p>
        ) : (
          <ul>
            {filteredProducts?.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </ul>
        )}
      </section>

      {/*
        TODO: derive `categories` from the product list instead of storing them separately.
        TODO: implement the filtering logic in a readable way as requirements grow.
        TODO: derive `activeFilters` from the current control values instead of duplicating them in state.
        TODO: consider trimming product names and making search case-insensitive.

        Optional follow-up discussion:
        - Would you keep filters in one object or separate state fields?
        - How would you add sorting without making this component messy?
        - Would a custom hook help once filtering grows?
      */}
    </main>
  );
}
