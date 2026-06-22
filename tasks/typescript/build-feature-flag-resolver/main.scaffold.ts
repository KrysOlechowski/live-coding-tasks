type FeatureFlagKey = string;

type FeatureFlagMap = Readonly<Record<FeatureFlagKey, boolean>>;

type FeatureFlagConfig = {
  globalDefaults: FeatureFlagMap;
  environmentOverrides: Readonly<Record<string, FeatureFlagMap>>;
  customerOverrides: Readonly<Record<string, FeatureFlagMap>>;
  userOverrides: Readonly<Record<string, FeatureFlagMap>>;
};

type UserContext = {
  userId?: string;
  customerId?: string;
  environment?: string;
};

type FeatureFlagDecisionReason =
  | "user_override"
  | "customer_override"
  | "environment_override"
  | "global_default"
  | "missing_flag";

type FeatureFlagDecision = {
  flagKey: FeatureFlagKey;
  enabled: boolean;
  reason: FeatureFlagDecisionReason;
  source: string;
};

const featureFlagConfig: FeatureFlagConfig = {
  globalDefaults: {
    new_dashboard: true,
    smart_search: false,
    beta_billing: true,
  },
  environmentOverrides: {
    production: {
      smart_search: true,
      beta_billing: false,
    },
    staging: {
      new_dashboard: false,
    },
  },
  customerOverrides: {
    customer_1: {
      new_dashboard: false,
      beta_billing: true,
    },
  },
  userOverrides: {
    user_1: {
      new_dashboard: true,
      smart_search: false,
    },
  },
};

const fullContext: UserContext = {
  userId: "user_1",
  customerId: "customer_1",
  environment: "production",
};

const contextWithoutUser: UserContext = {
  customerId: "customer_1",
  environment: "production",
};

const contextWithoutCustomer: UserContext = {
  userId: "user_1",
  environment: "production",
};

const contextWithoutEnvironment: UserContext = {
  userId: "user_1",
  customerId: "customer_1",
};

function resolveFeatureFlag(
  flagKey: FeatureFlagKey,
  config: FeatureFlagConfig,
  context: UserContext,
): FeatureFlagDecision {
  // TODO: Resolve the flag using user, customer, environment, and global
  // configuration priority. Preserve explicit false values and report the
  // winning reason and source.
  return {
    flagKey,
    enabled: false,
    reason: "missing_flag",
    source: "none",
  };
}

console.log(
  "User override:",
  resolveFeatureFlag("smart_search", featureFlagConfig, fullContext),
);

console.log(
  "Customer override without user id:",
  resolveFeatureFlag("new_dashboard", featureFlagConfig, contextWithoutUser),
);

console.log(
  "Environment override without customer id:",
  resolveFeatureFlag(
    "beta_billing",
    featureFlagConfig,
    contextWithoutCustomer,
  ),
);

console.log(
  "Global fallback without environment:",
  resolveFeatureFlag(
    "beta_billing",
    featureFlagConfig,
    contextWithoutEnvironment,
  ),
);

console.log(
  "Missing flag:",
  resolveFeatureFlag("unknown_flag", featureFlagConfig, fullContext),
);
