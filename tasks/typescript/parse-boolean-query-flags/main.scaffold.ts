export function parseBooleanQueryFlags(query: string): Record<string, boolean> {
  // TODO: read query entries from the input string with or without a leading '?'.
  // TODO: include only keys that start with 'flag_' and are non-empty after removing the prefix.
  // TODO: parse only the allowed boolean-like values and ignore invalid entries.
  // TODO: keep the last valid value for repeated flag keys without mutating the input.
  return {};
}

export const sampleQuery =
  "?flag_beta=true&flag_debug=0&page=2&flag_newUI=yes";

console.log(parseBooleanQueryFlags(sampleQuery));
