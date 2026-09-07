export type MemberRole = "viewer" | "editor" | "admin";

export type RoleHistoryEntry = {
  role: MemberRole;
  changedAt: string;
};

export type ProjectMember = {
  id: string;
  role: MemberRole;
  profile: {
    displayName: string;
  };
  roleHistory: RoleHistoryEntry[];
};

export function updateMemberRole(
  members: ProjectMember[],
  memberId: string,
  nextRole: MemberRole,
  changedAt: string,
): ProjectMember[] {
  const nextMembers = [...members];
  const member = nextMembers.find((candidate) => candidate.id === memberId);

  if (!member) {
    return members;
  }

  const nextRoleHistory = [
    ...member.roleHistory,
    { role: nextRole, changedAt },
  ];

  return nextMembers;
}

const sampleMembers: ProjectMember[] = [
  {
    id: "member-1",
    role: "editor",
    profile: { displayName: "Alice" },
    roleHistory: [{ role: "viewer", changedAt: "2026-08-01T09:00:00Z" }],
  },
  {
    id: "member-2",
    role: "viewer",
    profile: { displayName: "Bob" },
    roleHistory: [],
  },
];

const updatedMembers = updateMemberRole(
  sampleMembers,
  "member-1",
  "admin",
  "2026-09-04T12:00:00Z",
);

console.log({
  sourceRole: sampleMembers[0].role,
  updatedRole: updatedMembers[0].role,
  sameArray: sampleMembers === updatedMembers,
  sameUpdatedMember: sampleMembers[0] === updatedMembers[0],
  sameUpdatedHistory:
    sampleMembers[0].roleHistory === updatedMembers[0].roleHistory,
  sameProfile: sampleMembers[0].profile === updatedMembers[0].profile,
  sameOtherMember: sampleMembers[1] === updatedMembers[1],
});
