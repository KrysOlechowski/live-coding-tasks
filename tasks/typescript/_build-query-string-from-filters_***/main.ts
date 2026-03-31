type SearchFilters = {
  search?: string;
  tags?: string[];
  page?: number;
  archived?: boolean;
};

const filters: SearchFilters[] = [
  {
    search: "  react  ",
    tags: [" frontend ", "typescript", ""],
    page: 2,
    archived: true,
  },
  {
    search: "   ",
    tags: [],
    page: 0,
    archived: false,
  },
  {},
];

export function buildQueryString(input: SearchFilters): string {
  const params: string[] = [];

  // Trim search and include it only if something meaningful remains.
  const search = input.search?.trim();
  if (search) {
    params.push(`search=${encodeURIComponent(search)}`);
  }

  // Trim each tag, remove empty ones, then join the remaining values with commas.
  const tags = input.tags
    ?.map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  if (tags && tags.length > 0) {
    params.push(`tags=${encodeURIComponent(tags.join(","))}`);
  }

  // Check the type instead of truthiness so page=0 is still included.
  if (typeof input.page === "number") {
    params.push(`page=${input.page}`);
  }

  // Include boolean flags only when they are true.
  if (input.archived === true) {
    params.push("archived=true");
  }

  // If nothing valid was added, return an empty string instead of a noisy "?".
  if (params.length === 0) {
    return "";
  }

  return `?${params.join("&")}`;
}

// console.log(filters.map(buildQueryString));
filters.map(buildQueryString);
