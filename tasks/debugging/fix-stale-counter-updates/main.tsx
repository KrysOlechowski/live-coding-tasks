"use client";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const handleIncrementTwice = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const handleDecrementTwice = () => {
    setCount((prev) => prev - 1);
    setCount((prev) => prev - 1);
  };

  return (
    <main>
      <h1>Counter</h1>
      <p>Value: {count}</p>

      <div style={controlsStyle}>
        <button onClick={handleIncrementTwice}>Increment twice</button>
        <button onClick={handleDecrementTwice}>Decrement twice</button>
      </div>

      {/* TODO: fix the stale state update bug without rewriting the component */}
      {/* TODO: make each button update the counter by 2 */}
      {/* TODO: keep the handler logic safe when React batches updates */}
      {/* TODO: keep the solution easy to explain in an interview */}
    </main>
  );
}

const controlsStyle = {
  display: "flex",
  gap: "12px",
};
