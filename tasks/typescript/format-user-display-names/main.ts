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
  const getDisplayName = (user: User) => {
    const isFirstName = (user?.firstName?.trim() ?? "").length > 0;
    const isLastName = (user?.lastName?.trim() ?? "").length > 0;
    const isNickName = (user?.nickname?.trim() ?? "").length > 0;

    if (isFirstName && isLastName) {
      return `${user.firstName!.trim()} ${user.lastName!.trim()}`;
    }
    if (isFirstName) {
      return `${user.firstName!.trim()}`;
    }
    if (isLastName) {
      return `${user.lastName!.trim()}`;
    }
    if (isNickName) {
      return `${user.nickname!.trim()}`;
    }

    return "Anonymous";
  };

  return users.map((user) => ({
    id: user.id,
    displayName: getDisplayName(user),
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
