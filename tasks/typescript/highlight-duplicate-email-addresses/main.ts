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
  const groupedByEmail = new Map<string, string[]>();

  // Sort for deterministic output.
  users.sort((a, b) => a.email.localeCompare(b.email));

  for (const user of users) {
    const normalizedEmail = user.email.trim().toLowerCase();
    const existingIds = groupedByEmail.get(normalizedEmail);

    if (existingIds) {
      existingIds.push(user.id);
      continue;
    }

    groupedByEmail.set(normalizedEmail, [user.id]);
  }

  return Array.from(groupedByEmail.entries())
    .filter(([, userIds]) => userIds.length > 1)
    .sort(([emailA], [emailB]) => emailA.localeCompare(emailB))
    .map(([email, userIds]) => ({
      email,
      userIds,
    }));
}
