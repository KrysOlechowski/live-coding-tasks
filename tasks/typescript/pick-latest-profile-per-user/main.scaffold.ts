export type UserRole = "user" | "admin" | "moderator";

export type ProfileSnapshot = {
  id: string;
  userId: string;
  email: string;
  role: UserRole;
  updatedAt: string;
};

export type LatestUserProfile = {
  userId: string;
  email: string;
  role: UserRole;
  updatedAt: string;
};

export function pickLatestProfilePerUser(
  profiles: ProfileSnapshot[],
): LatestUserProfile[] {
  // TODO: track one chosen record per userId without mutating the input.
  // TODO: replace the stored record when a later updatedAt appears.
  // TODO: when updatedAt values are equal for the same userId, keep the later input record.
  // TODO: preserve the order of first appearance of each userId in the final output.
  return [];
}

export const sampleProfiles: ProfileSnapshot[] = [
  {
    id: "p-101",
    userId: "u-1",
    email: "ada@example.com",
    role: "user",
    updatedAt: "2026-04-10T08:00:00.000Z",
  },
  {
    id: "p-102",
    userId: "u-2",
    email: "linus@example.com",
    role: "moderator",
    updatedAt: "2026-04-10T09:00:00.000Z",
  },
  {
    id: "p-103",
    userId: "u-1",
    email: "ada@newmail.com",
    role: "admin",
    updatedAt: "2026-04-11T10:30:00.000Z",
  },
  {
    id: "p-104",
    userId: "u-3",
    email: "grace@example.com",
    role: "user",
    updatedAt: "2026-04-09T14:15:00.000Z",
  },
  {
    id: "p-105",
    userId: "u-2",
    email: "linus@work.com",
    role: "admin",
    updatedAt: "2026-04-10T09:00:00.000Z",
  },
];

console.log(pickLatestProfilePerUser(sampleProfiles));
