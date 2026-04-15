export function findFirstNonRepeatingCharacter(input: string): string | null {
  if ((input?.length ?? 0) === 0) {
    return null;
  }

  const separateCharactersArray = [...input];
  let uniqueCharatcer = null;

  for (let i = 0; i < input.length; i++) {
    const filtered = separateCharactersArray.filter((char) => {
      return char === input[i];
    });

    if (filtered.length === 1) {
      uniqueCharatcer = input[i];
      break;
    }
    if (filtered.length === 0 || filtered.length > 1) {
      uniqueCharatcer = null;
    }
  }

  return uniqueCharatcer;
}

export const sampleInput = "sTreets, trees!";

const testCases = [
  {
    label: "empty string",
    input: "",
    expected: null,
  },
  {
    label: "first character is unique",
    input: "abcab",
    expected: "c",
  },
  {
    label: "unique character at the end",
    input: "aabbccd",
    expected: "d",
  },
  {
    label: "all characters repeat",
    input: "aabbcc",
    expected: null,
  },
  {
    label: "spaces and punctuation count as characters",
    input: "aabb !",
    expected: " ",
  },
  {
    label: "uppercase and lowercase are different",
    input: "aAbBABc",
    expected: "a",
  },
];

for (const testCase of testCases) {
  console.log({
    label: testCase.label,
    input: testCase.input,
    expected: testCase.expected,
    received: findFirstNonRepeatingCharacter(testCase.input),
  });
}

console.log(findFirstNonRepeatingCharacter(sampleInput));
