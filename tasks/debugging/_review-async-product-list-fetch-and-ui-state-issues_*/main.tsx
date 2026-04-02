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
      // here we don't have an additional checking for other requests states that will not activate as an error in catch block but they could send us no proper data:
      const data = await response.json();
      // as mention above, we can't be sure we have the correct data:
      setProducts(data.products);
      // setVisibleProducts shouldn't be as a state, it could be calculated/derived? from the 'products' state.
      setVisibleProducts(
        data.products.filter((product: Product) => product.inStock),
      );
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    };

    loadProducts().catch((requestError) => {
      setError(requestError.message);
      setLoading(false);
    });
    //if there will be a component unmount we should use for ex. AbortController on useEffect return to cancel request that can still be pending.
  }, [categoryId]);
  // 'product.name & product.price & product.inStock can be undefined so i
  // will use optional chaining + some DTO mapping to make sure anything won't
  // brake, especially in 'product.price!.toFixed(2)''

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
