type RawUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string;
};

type StatusLabel = "Active" | "Invited" | "Disabled" | "Unknown";

type UserRow = {
  id: string;
  displayName: string;
  displayEmail: string;
  statusLabel: StatusLabel;
  isContactable: boolean;
};

const users: RawUser[] = [
  {
    id: "u1",
    firstName: " Ada ",
    lastName: " Lovelace ",
    email: " ada@example.com ",
    status: "active",
  },
  {
    id: "u2",
    firstName: "  ",
    lastName: "",
    email: "",
    status: "INVITED",
  },
  {
    id: "u3",
    lastName: "Turing",
    status: "disabled",
  },
  {
    id: "u4",
  },
];

export function formatUserRows(input: RawUser[]): UserRow[] {
  // TODO: return a new array without mutating the original input
  // TODO: build displayName from firstName and lastName
  // TODO: fall back to "Unknown user" when both name fields are empty or missing
  // TODO: trim email and fall back to "No email" when missing or empty
  // TODO: map raw status values to the required statusLabel values
  // TODO: handle missing and differently-cased status values safely
  // TODO: set isContactable to true only for active users with a real email

  return [];
}

console.log(formatUserRows(users));
