export type JobRecord = {
  id: string;
  sequence: number;
};

export function findMissingSequenceNumbers(records: JobRecord[]): number[] {
  if (records.length === 0) {
    return [];
  }
  const arrayOfSortedNumbers: number[] = records
    .map((record) => {
      return record.sequence;
    })
    .sort();

  const newSetArray = new Set(arrayOfSortedNumbers);
  const arrayOfDedupNumbers = Array.from(newSetArray);

  if (arrayOfDedupNumbers.length === 1) {
    return [];
  }

  const missingNumbersArray = [];

  for (let i = 0; i < arrayOfDedupNumbers.length - 1; i++) {
    for (let j = i + 1; j === i + 1; j++) {
      const firstNumber = arrayOfDedupNumbers[i];
      const nextNumber = arrayOfDedupNumbers[j];
      const diffBetweenNumbers = nextNumber - firstNumber;

      const missingNumbers = getMissingNumbers(nextNumber, diffBetweenNumbers);
      if (missingNumbers.length > 0) {
        missingNumbersArray.push(missingNumbers);
      }
    }
  }

  return missingNumbersArray.flat();
}

function getMissingNumbers(next: number, diff: number) {
  let arr = [];
  for (let i = 1; i < diff; i++) {
    arr.push(next - i);
  }
  return arr.sort();
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
