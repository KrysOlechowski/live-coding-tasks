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
  let removed = [];
  let changed: ProductDiff["changed"] = [];
  let added: Product[] = [];

  for (const prev of previous) {
    //najpierw sprawdzamy czy produkt istnieje w nowej liście:
    const isProductInCurrent = current.find((curr) => prev.id === curr.id);

    //jeśli produktu nie ma w nowej liście, to znaczy że został usunięty:
    if (!isProductInCurrent) {
      removed.push(prev);
    }

    //sprawdzamy czy produkt został zmieniony:
    if (isProductInCurrent) {
      if (
        prev.name !== isProductInCurrent.name ||
        prev.priceCents !== isProductInCurrent.priceCents
      ) {
        changed.unshift({ before: prev, after: isProductInCurrent });
      }
    }
  }

  for (const curr of current) {
    const isSameProduct = previous.find((prev) => prev.id === curr.id);
    if (!isSameProduct) {
      //to znaczy że produkt nie występował w poprzedniej liście.
      added.push(curr);
    }
  }

  return { added, removed, changed };
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
