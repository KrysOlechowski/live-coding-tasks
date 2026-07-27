type Category = {
  id: string;
  label: string;
  parentId: string | null;
  isActive: boolean;
};

type BreadcrumbItem = {
  id: string;
  label: string;
};

const categories: Category[] = [
  {
    id: "electronics",
    label: "Electronics",
    parentId: null,
    isActive: true,
  },
  {
    id: "computers",
    label: "Computers",
    parentId: "electronics",
    isActive: true,
  },
  {
    id: "laptops",
    label: "Laptops",
    parentId: "computers",
    isActive: true,
  },
  {
    id: "accessories",
    label: "Accessories",
    parentId: "electronics",
    isActive: false,
  },
  {
    id: "chargers",
    label: "Chargers",
    parentId: "accessories",
    isActive: true,
  },
  {
    id: "clearance",
    label: "Clearance",
    parentId: "missing-parent",
    isActive: true,
  },
  {
    id: "loop-a",
    label: "Loop A",
    parentId: "loop-b",
    isActive: true,
  },
  {
    id: "loop-b",
    label: "Loop B",
    parentId: "loop-a",
    isActive: true,
  },
  {
    id: "seasonal",
    label: "Seasonal",
    parentId: null,
    isActive: true,
  },
  {
    id: "seasonal",
    label: "Seasonal Duplicate",
    parentId: "electronics",
    isActive: true,
  },
];

function buildBreadcrumbPath(
  allCategories: readonly Category[],
  selectedCategoryId: string,
): BreadcrumbItem[] {
  // TODO: Build a predictable lookup from the flat category list.
  // TODO: Walk from the selected category up through its parents.
  // TODO: Handle inactive categories, missing parents, duplicate ids, and cycles.
  return [];
}

console.log(
  "Normal chain:",
  buildBreadcrumbPath(categories, "laptops"),
);

console.log(
  "Missing parent:",
  buildBreadcrumbPath(categories, "clearance"),
);

console.log(
  "Inactive ancestor:",
  buildBreadcrumbPath(categories, "chargers"),
);

console.log(
  "Cycle:",
  buildBreadcrumbPath(categories, "loop-a"),
);
