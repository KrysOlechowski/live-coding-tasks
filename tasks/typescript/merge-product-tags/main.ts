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

export function mergeProductTags(products: Product[]): ProductWithMergedTags[] {
  const mergedProductTags = products.map((product) => {
    const tagsList = (product?.tags ?? []).filter((tag) => tag.trim());

    const extraTagsList = (product?.extraTags ?? []).filter((tag) =>
      tag.trim(),
    );

    const combinedTagsList = [...tagsList, ...extraTagsList];

    const uniqueTagsList =
      combinedTagsList.length > 0 ? getUniqueTagsList(combinedTagsList) : [];

    return {
      id: product.id,
      name: product.name,
      tags: uniqueTagsList,
    };
  });
  return mergedProductTags;
}

function getUniqueTagsList(tagsList: string[]) {
  const uniqueTagsArray = [];

  for (let i = 0; i < tagsList.length; i++) {
    for (let j = i + 1; j < tagsList.length; j++) {
      if (
        tagsList[i].toLowerCase().trim() === tagsList[j].toLowerCase().trim()
      ) {
        tagsList[j] = "";
      }
    }
    if (tagsList[i].length > 0) {
      uniqueTagsArray.push(tagsList[i].trim());
    }
  }
  return uniqueTagsArray;
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
  {
    id: "p-104",
    name: "LOLEK",
    tags: [" lol ", "LOL", "LOLEK", "lolek"],
    extraTags: [" LLOL ", "  LoL", "LOOL"],
  },
  {
    id: "p-105",
    name: "LOLEK",
    tags: null,
    extraTags: null,
  },
];

console.log(mergeProductTags(sampleProducts));
