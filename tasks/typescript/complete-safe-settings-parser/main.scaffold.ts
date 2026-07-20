type Theme = "light" | "dark" | "system";
type Density = "comfortable" | "compact";
type EmailFrequency = "never" | "daily" | "weekly";

type UserSettings = {
  theme: Theme;
  density: Density;
  locale: string;
  notifications: {
    email: boolean;
    push: boolean;
    frequency: EmailFrequency;
  };
  privacy: {
    profileVisible: boolean;
    personalizedAds: boolean;
  };
};

const defaultSettings: UserSettings = {
  theme: "system",
  density: "comfortable",
  locale: "en-US",
  notifications: {
    email: true,
    push: false,
    frequency: "weekly",
  },
  privacy: {
    profileVisible: true,
    personalizedAds: false,
  },
};

const validApiInput: unknown = {
  theme: "dark",
  density: "compact",
  locale: "pl-PL",
  notifications: {
    email: false,
    push: true,
    frequency: "daily",
  },
  privacy: {
    profileVisible: false,
    personalizedAds: true,
  },
  extraField: "ignored",
};

const mixedApiInput: unknown = {
  theme: "midnight",
  density: "compact",
  locale: 123,
  notifications: {
    email: "yes",
    push: true,
    frequency: "hourly",
  },
  privacy: null,
};

const malformedInputs: unknown[] = [
  null,
  "not an object",
  ["dark"],
  {
    notifications: {
      email: false,
    },
  },
];

function parseUserSettings(input: unknown): UserSettings {
  // TODO: Safely inspect unknown input and preserve valid top-level settings.
  // TODO: Safely parse nested notification and privacy settings.
  // TODO: Fall back to defaults for missing, malformed, or unsupported values.
  return defaultSettings;
}

console.log("Valid API input:", parseUserSettings(validApiInput));
console.log("Mixed API input:", parseUserSettings(mixedApiInput));

for (const input of malformedInputs) {
  console.log("Malformed input:", parseUserSettings(input));
}
