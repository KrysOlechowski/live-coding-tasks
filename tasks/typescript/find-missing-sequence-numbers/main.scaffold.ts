export type JobRecord = {
  id: string;
  sequence: number;
};

export function findMissingSequenceNumbers(records: JobRecord[]): number[] {
  // TODO: handle the empty input case.
  // TODO: collect seen sequence values without mutating the input.
  // TODO: find the minimum and maximum sequence values from the input.
  // TODO: build the missing sequence numbers in ascending order.
  return [];
}

export const sampleRecords: JobRecord[] = [
  {
    id: "job-101",
    sequence: 3,
  },
  {
    id: "job-102",
    sequence: 7,
  },
  {
    id: "job-103",
    sequence: 4,
  },
  {
    id: "job-104",
    sequence: 7,
  },
  {
    id: "job-105",
    sequence: 1,
  },
  {
    id: "job-106",
    sequence: -1,
  },
];

console.log(findMissingSequenceNumbers(sampleRecords));
