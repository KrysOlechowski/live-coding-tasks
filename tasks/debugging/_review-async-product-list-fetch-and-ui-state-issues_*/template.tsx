"use client";
import { useEffect, useState } from "react";

type Product = {
id: string;
name?: string;
price?: number;
inStock: boolean;
};

type Props = {
categoryId: string;
};

export default function App() {
return <ProductList categoryId="featured" />;
}

function ProductList({ categoryId }: Props) {
const [products, setProducts] = useState<Product[]>([]);
const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [lastUpdated, setLastUpdated] = useState("");

useEffect(() => {
const loadProducts = async () => {
setLoading(true);

      const response = await fetch(`/api/products?category=${categoryId}`);
      const data = await response.json();

      setProducts(data.products);
      setVisibleProducts(data.products.filter((product: Product) => product.inStock));
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    };

    loadProducts().catch((requestError) => {
      setError(requestError.message);
      setLoading(false);
    });

}, [categoryId]);

return (
<main>
<h1>Products</h1>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <p>Last updated: {lastUpdated}</p>

      <ul>
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <div>${product.price!.toFixed(2)}</div>
            <div>{product.inStock ? "In stock" : "Out of stock"}</div>
          </li>
        ))}
      </ul>
    </main>

);
}
