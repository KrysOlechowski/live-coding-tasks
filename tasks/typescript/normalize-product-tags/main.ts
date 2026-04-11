export type Product = {
  id: string;
  name: string;
  tags?: string[];
};

export function normalizeProductTags(products: Product[]): Product[] {
  return products.map((product) => {
    // TODO: normalize tags (trim, lowercase, remove empties, dedupe within product)
    return {
      ...product,
      tags: product.tags ?? [],
    };
  });
}
