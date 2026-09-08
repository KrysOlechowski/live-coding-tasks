export type Product = {
  id: string;
  name: string;
  priceCents: number;
};

export type ProductDiff = {
  added: Product[];
  removed: Product[];
  changed: { before: Product; after: Product }[];
};

export function compareProducts(
  previous: readonly Product[],
  current: readonly Product[],
): ProductDiff {
  // TODO: Implement the comparison described in task.md.
  return { added: [], removed: [], changed: [] };
}

const previous: Product[] = [
  { id: "p-1", name: "Keyboard", priceCents: 12900 },
  { id: "p-2", name: "Mouse", priceCents: 4900 },
  { id: "p-3", name: "Monitor", priceCents: 89900 },
];

const current: Product[] = [
  { id: "p-3", name: "Monitor", priceCents: 89900 },
  { id: "p-4", name: "USB hub", priceCents: 7900 },
  { id: "p-1", name: "Keyboard", priceCents: 11900 },
];

console.log(compareProducts(previous, current));
