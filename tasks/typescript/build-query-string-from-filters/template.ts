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
  // TODO: build a query string from the provided filters
  // TODO: include only meaningful values
  // TODO: trim string values before using them
  // TODO: skip empty strings and empty arrays
  // TODO: include boolean flags only when they are true
  // TODO: join array values with commas
  // TODO: return an empty string when there are no valid filters
  // TODO: do not mutate the original input

  return "";
}

console.log(filters.map(buildQueryString));
