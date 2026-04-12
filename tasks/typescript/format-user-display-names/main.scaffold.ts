export type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  nickname?: string | null;
};

export type DisplayUser = {
  id: string;
  displayName: string;
};

export function formatUserDisplayNames(users: User[]): DisplayUser[] {
  // TODO: normalize each used name part by trimming it and collapsing repeated internal spaces.
  // TODO: build the display name from firstName/lastName, then nickname, then "Anonymous".
  // TODO: preserve the original order and keep this transformation immutable.
  return users.map((user) => ({
    id: user.id,
    displayName: "TODO",
  }));
}

export const sampleUsers: User[] = [
  {
    id: "u-101",
    firstName: "  Ada ",
    lastName: "  Lovelace ",
    nickname: "  Enchantress of Numbers  ",
  },
  {
    id: "u-102",
    firstName: "  ",
    lastName: null,
    nickname: "  Linus  ",
  },
  {
    id: "u-103",
    firstName: null,
    lastName: null,
    nickname: "   ",
  },
];

console.log(formatUserDisplayNames(sampleUsers));
