export type User = {
  id: string;
  email: string;
};

export type DuplicateEmailGroup = {
  email: string;
  userIds: string[];
};

export function highlightDuplicateEmailAddresses(
  users: User[],
): DuplicateEmailGroup[] {
  // TODO: Normalize each email (trim + lowercase) before comparisons.
  // TODO: Group user IDs by normalized email.
  // TODO: Return only entries that appear more than once.
  // TODO: Preserve order of first duplicate appearance.
  return [];
}
