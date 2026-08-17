export type ProcessStatus = "idle" | "running" | "completed" | "failed";

export type ProcessState = {
  status: ProcessStatus;
  progress?: number;
  importedRecords?: number;
  errorMessage?: string;
};

// TODO: Replace the loose process model with explicit state variants.

export function describeProcess(state: ProcessState): string {
  switch (state.status) {
    case "idle":
      return "Import has not started";
    case "running":
      return `Import is ${state.progress ?? 0}% complete`;
    case "completed":
      return `Imported ${state.importedRecords ?? 0} records`;
    case "failed":
      return `Import failed: ${state.errorMessage ?? "Unknown error"}`;
  }
}

export function getProcessProgress(state: ProcessState): number {
  if (state.status === "completed") {
    return 100;
  }

  return state.progress ?? 0;
}

export function getImportedRecordCount(state: ProcessState): number {
  return state.importedRecords ?? 0;
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
