export type Product = {
  id: string;
  name: string;
  tags: string[] | null;
  extraTags?: string[] | null;
};

export type ProductWithMergedTags = {
  id: string;
  name: string;
  tags: string[];
};

export function mergeProductTags(
  products: Product[],
): ProductWithMergedTags[] {
  // TODO: combine tags and extraTags while treating missing arrays as empty.
  // TODO: trim tags, ignore empty values, and deduplicate case-insensitively.
  // TODO: keep the first encountered trimmed version of each tag in output order.
  // TODO: preserve input immutability and return one output item per product.
  return [];
}

export const sampleProducts: Product[] = [
  {
    id: "p-101",
    name: "Keyboard",
    tags: [" office ", "Input", "input"],
    extraTags: ["  accessories", "Office  "],
  },
  {
    id: "p-102",
    name: "Mouse",
    tags: null,
    extraTags: ["  ", "wireless", "Wireless"],
  },
  {
    id: "p-103",
    name: "Monitor",
    tags: [" display "],
    extraTags: null,
  },
];

console.log(mergeProductTags(sampleProducts));
