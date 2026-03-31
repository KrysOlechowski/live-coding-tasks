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
  // console.log(input);

  const getDisplayName = (value: RawUser): string => {
    const isFirstName = (value?.firstName?.trim().length ?? 0) > 0;
    const isLastName = (value.lastName?.trim().length ?? 0) > 0;

    if (!isFirstName && !isLastName) {
      return "Unknown user";
    }
    if (!isFirstName && isLastName) {
      return value.lastName!.trim();
    }

    // Review note: when firstName exists but lastName is missing/empty,
    // this returns `${firstName} undefined`. Handle the "first name only"
    // case explicitly so displayName stays UI-safe.
    return `${value.firstName?.trim()} ${value.lastName?.trim()}`;
  };

  const getStatusLabel = (status: string): StatusLabel => {
    // Review note: the task calls out uppercase input like "ACTIVE".
    // Normalize casing before the switch so differently-cased API values
    // still map to the expected labels.
    switch (status) {
      case "active":
        return "Active";
      case "invited":
        return "Invited";
      case "disabled":
        return "Disabled";
      default:
        return "Unknown";
    }
  };

  const mappedValues = input.map((value) => {
    const displayName = getDisplayName(value);

    const isDisplayEmail = (value?.email?.trim().length ?? 0) > 0;
    const displayEmail = isDisplayEmail ? value.email!.trim() : "No email";

    const isStatusLabel = (value?.status?.trim().length ?? 0) > 0;
    const statusLabel = isStatusLabel
      ? getStatusLabel(value.status!.trim())
      : "Unknown";

    // Review note: this works, but the ternary is redundant because the
    // comparison already produces a boolean.
    const isContactable = statusLabel === "Active" && displayEmail !== "No email";

    return {
      id: value.id,
      displayName,
      displayEmail,
      statusLabel,
      isContactable,
    };
  });

  return mappedValues;
}

console.log(formatUserRows(users));
