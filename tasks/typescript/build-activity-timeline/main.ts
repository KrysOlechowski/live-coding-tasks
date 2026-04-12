export type ActivityType =
  | "comment"
  | "like"
  | "login"
  | "logout"
  | "purchase";

export type Activity = {
  id: string;
  userId: string;
  userName: string;
  type: ActivityType;
  createdAt: string;
};

export type TimelineUserSummary = {
  userId: string;
  userName: string;
  activityCount: number;
  latestActivityAt: string;
};

export type TimelineDaySummary = {
  date: string;
  totalActivities: number;
  users: TimelineUserSummary[];
};

export function buildActivityTimeline(
  activities: Activity[],
): TimelineDaySummary[] {
  // TODO: group activities by UTC day derived from createdAt.
  // TODO: aggregate each day's total activity count and per-user summaries.
  // TODO: keep the latest createdAt and matching userName for each user within a day.
  // TODO: sort days and users according to the task rules without mutating the input.
  return [];
}

export const sampleActivities: Activity[] = [
  {
    id: "a-101",
    userId: "u-1",
    userName: "Ada",
    type: "login",
    createdAt: "2026-04-10T08:15:00.000Z",
  },
  {
    id: "a-102",
    userId: "u-2",
    userName: "Linus",
    type: "comment",
    createdAt: "2026-04-10T09:30:00.000Z",
  },
  {
    id: "a-103",
    userId: "u-1",
    userName: "Ada Lovelace",
    type: "purchase",
    createdAt: "2026-04-10T12:45:00.000Z",
  },
  {
    id: "a-104",
    userId: "u-3",
    userName: "Grace",
    type: "logout",
    createdAt: "2026-04-09T20:05:00.000Z",
  },
];

console.log(buildActivityTimeline(sampleActivities));
