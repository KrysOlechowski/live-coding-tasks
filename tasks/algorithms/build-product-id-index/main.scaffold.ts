export type Product = {
  id: string;
  name: string;
  priceCents: number;
};

export function buildProductIndex(
  products: readonly Product[],
): Map<string, Product> {
  // TODO: Zbuduj indeks zgodnie z task.md.
  return new Map<string, Product>();
}

export function getProductById(
  index: Map<string, Product>,
  id: string,
): Product | undefined {
  // TODO: Odczytaj produkt z przekazanego indeksu.
  return undefined;
}

const products: Product[] = [
  { id: "p-1", name: "Keyboard", priceCents: 12900 },
  { id: "p-2", name: "Mouse", priceCents: 4900 },
  { id: "p-3", name: "Monitor", priceCents: 89900 },
];

const productIndex = buildProductIndex(products);
console.log("Indeks:", productIndex);
console.log("Produkt p-2:", getProductById(productIndex, "p-2"));
console.log("Brak produktu:", getProductById(productIndex, "missing"));
