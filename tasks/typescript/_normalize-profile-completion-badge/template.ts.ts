type RawProfile = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
};

type CompletionLabel = "Complete" | "Incomplete";

type ProfileBadge = {
  id: string;
  displayName: string;
  completionLabel: CompletionLabel;
  isComplete: boolean;
};

const profiles: RawProfile[] = [
  {
    id: "p1",
    name: " Ada Lovelace ",
    email: " ada@example.com ",
    role: "admin",
  },
  {
    id: "p2",
    name: "  ",
    email: "grace@example.com",
    role: "EDITOR",
  },
  {
    id: "p3",
    email: "",
    role: "viewer",
  },
  {
    id: "p4",
    name: "Alan Turing",
    role: "guest",
  },
];

export function normalizeProfileCompletion(
  input: RawProfile[]
): ProfileBadge[] {
  // TODO: return a new array without mutating the original input
  // TODO: trim name and email values before using them
  // TODO: fall back to "Unnamed user" when name is missing or empty
  // TODO: treat only admin, editor, and viewer as valid roles
  // TODO: handle unexpected or differently-cased role values safely
  // TODO: set isComplete only when name, email, and role are all valid
  // TODO: derive completionLabel from isComplete

  return [];
}

console.log(normalizeProfileCompletion(profiles));
