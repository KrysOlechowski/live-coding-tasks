export function areAnagrams(first: string, second: string): boolean {
  const trimmedFirst = first.toLowerCase().trim().replaceAll(" ", "");
  const trimmedSecond = second.toLowerCase().trim().replaceAll(" ", "");

  if (trimmedFirst.length !== trimmedSecond.length) {
    return false;
  }

  const firstInputObj: Record<string, number> = {};

  for (const first of trimmedFirst) {
    if (firstInputObj[first] === undefined) {
      firstInputObj[first] = 1;
    } else {
      firstInputObj[first] += 1;
    }
  }

  let isAnagram = true;

  for (const second of trimmedSecond) {
    if (firstInputObj[second] === undefined) {
      isAnagram = false;
      break;
    } else {
      firstInputObj[second] = firstInputObj[second] - 1;
    }
  }
  const rawNumbers = Object.values(firstInputObj);
  rawNumbers.filter((number) => {
    if (number !== 0) {
      isAnagram = false;
    }
  });

  return isAnagram;
}

export const sampleFirst = "Dormitory";
export const sampleSecond = "Dirty room";

console.log(areAnagrams(sampleFirst, sampleSecond));
