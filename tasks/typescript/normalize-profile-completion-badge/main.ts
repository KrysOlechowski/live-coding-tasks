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

const getRoleField = (role: string) => {
  // Review note: this helper is correct, but the name is a bit vague.
  // Something like `isValidRole` would communicate the return value more clearly.
  switch (role) {
    case "admin":
      return true;
    case "editor":
      return true;
    case "viewer":
      return true;
    default:
      return false;
  }
};

export function normalizeProfileCompletion(
  input: RawProfile[],
): ProfileBadge[] {
  const normalizedFields = input.map((field) => {
    // Review note: optional chaining on `field` is not needed here because
    // `map()` always gives you a defined `RawProfile`.
    const isNameField = (field?.name?.trim().length ?? 0) > 0;
    const isEmailField = (field?.email?.trim().length ?? 0) > 0;

    // Review note: this extra boolean can be simplified. You could normalize
    // the role once and validate that normalized value directly.
    const isRoleField = (field?.role?.trim().length ?? 0) > 0;
    const isProperRoleField = isRoleField
      ? getRoleField(field.role!.trim().toLowerCase())
      : false;

    // Review note: because `name` is trimmed more than once in this function,
    // storing the trimmed value in a small variable would avoid repetition and
    // make the flow a bit easier to read.
    const displayName = isNameField ? field.name!.trim() : "Unnamed user";

    const isComplete =
      isNameField && isEmailField && isRoleField && isProperRoleField;

    const completionLabel: CompletionLabel = isComplete
      ? "Complete"
      : "Incomplete";

    return {
      id: field.id,
      displayName,
      // Review note: `isComplete` can be written directly here as `isComplete`
      // without repeating the property name.
      isComplete: isComplete,
      completionLabel,
    };
  });

  // Review note: these TODO comments are stale now that the function is implemented.
  // Removing them would make the finished solution look cleaner.
  // TODO: return a new array without mutating the original input
  // TODO: trim name and email values before using them
  // TODO: fall back to "Unnamed user" when name is missing or empty
  // TODO: treat only admin, editor, and viewer as valid roles
  // TODO: handle unexpected or differently-cased role values safely
  // TODO: set isComplete only when name, email, and role are all valid
  // TODO: derive completionLabel from isComplete

  return normalizedFields;
}

console.log(normalizeProfileCompletion(profiles));
