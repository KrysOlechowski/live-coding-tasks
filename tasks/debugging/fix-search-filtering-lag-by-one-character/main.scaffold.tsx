"use client";
import { ChangeEvent, useEffect, useState } from "react";

const items = ["React", "TypeScript", "Testing Library", "Redux", "ReasonML"];

export default function App() {
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main>
      <h1>Search items</h1>

      <input value={query} onChange={handleChange} placeholder="Search items" />

      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* TODO: fix the filtering lag without rewriting the whole component */}
      {/* TODO: make filtering always use the latest typed value */}
      {/* TODO: keep the input controlled */}
      {/* TODO: keep the solution small and easy to explain */}
    </main>
  );
}
