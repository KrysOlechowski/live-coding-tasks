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
  const groupedByUserId: Record<string, LatestUserProfile> = {};
  const orderedProfiles: LatestUserProfile[] = [];

  for (const profile of profiles) {
    const existingProfile = groupedByUserId[profile.userId];

    if (existingProfile === undefined) {
      const nextProfile: LatestUserProfile = {
        userId: profile.userId,
        email: profile.email,
        role: profile.role,
        updatedAt: profile.updatedAt,
      };

      // Store the first profile under its userId so later records can compare against it.
      groupedByUserId[profile.userId] = nextProfile;
      // Push only on first appearance to preserve output order by first seen userId.
      orderedProfiles.push(nextProfile);
      continue;
    }

    // ISO timestamps can be compared as strings; >= keeps the later input item on ties.
    if (profile.updatedAt >= existingProfile.updatedAt) {
      existingProfile.email = profile.email;
      existingProfile.role = profile.role;
      existingProfile.updatedAt = profile.updatedAt;
    }
  }

  return orderedProfiles;
}

export const sampleProfiles: ProfileSnapshot[] = [
  {
    id: "p-101",
    userId: "u-1",
    email: "ada@example.com",
    role: "user",
    updatedAt: "2025-01-10T08:00:00.000Z",
  },
  {
    id: "p-102",
    userId: "u-2",
    email: "linus@example.com",
    role: "moderator",
    updatedAt: "2026-02-10T09:00:00.000Z",
  },
  {
    id: "p-103",
    userId: "u-1",
    email: "ada@newmail.com",
    role: "admin",
    updatedAt: "2026-01-11T10:30:00.000Z",
  },
  {
    id: "p-104",
    userId: "u-3",
    email: "grace@example.com",
    role: "user",
    updatedAt: "2023-04-09T14:15:00.000Z",
  },
  {
    id: "p-105",
    userId: "u-2",
    email: "linus@work.com",
    role: "admin",
    updatedAt: "2022-04-10T09:00:00.000Z",
  },
  {
    id: "p-106",
    userId: "u-4",
    email: "margaret@example.com",
    role: "user",
    updatedAt: "2024-04-08T11:20:00.000Z",
  },
  {
    id: "p-107",
    userId: "u-3",
    email: "grace@navy.mil",
    role: "moderator",
    updatedAt: "2026-03-12T07:45:00.000Z",
  },
  {
    id: "p-108",
    userId: "u-1",
    email: "ada@company.com",
    role: "admin",
    updatedAt: "2022-04-11T10:30:00.000Z",
  },
  {
    id: "p-109",
    userId: "u-5",
    email: "lin@example.com",
    role: "user",
    updatedAt: "2023-04-07T18:05:00.000Z",
  },
  {
    id: "p-110",
    userId: "u-4",
    email: "margaret@lab.com",
    role: "admin",
    updatedAt: "2026-04-13T09:10:00.000Z",
  },
  {
    id: "p-111",
    userId: "u-5",
    email: "lin@work.com",
    role: "moderator",
    updatedAt: "2026-02-07T18:05:00.000Z",
  },
];

console.log(pickLatestProfilePerUser(sampleProfiles));
