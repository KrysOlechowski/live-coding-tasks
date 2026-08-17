function assertNever(value: never): never {
  throw new Error(`Unhandled status: ${JSON.stringify(value)}`);
}

export type ProcessState =
  | { status: "idle" }
  | { status: "running"; progress: number }
  | { status: "completed"; importedRecords: number }
  | { status: "failed"; errorMessage: string }
  | { status: "cancelled"; reason: string; lastProgress: number };
// TODO: Replace the loose process model with explicit state variants.

export function describeProcess(state: ProcessState): string {
  switch (state.status) {
    case "idle":
      return "Import has not started";
    case "running":
      return `Import is ${state.progress}% complete`;
    case "completed":
      return `Imported ${state.importedRecords} records`;
    case "failed":
      return `Import failed: ${state.errorMessage}`;
    case "cancelled":
      return `Import cancelled. Reason: ${state.reason}. Last progress: ${state.lastProgress}`;
    default:
      return assertNever(state);
  }
}

export function getProcessProgress(state: ProcessState): number {
  if (state.status === "completed") {
    return 100;
  }

  if (state.status === "running") {
    return state.progress;
  }
  if (state.status === "cancelled") {
    return state.lastProgress;
  }
  return 0;
}

export function getImportedRecordCount(state: ProcessState): number {
  if (state.status === "completed") {
    return state.importedRecords;
  }
  return 0;
}

const sampleStates: ProcessState[] = [
  { status: "idle" },
  { status: "running", progress: 45 },
  { status: "completed", importedRecords: 120 },
  { status: "failed", errorMessage: "Invalid source file" },
];

for (const state of sampleStates) {
  console.log(describeProcess(state));
}
