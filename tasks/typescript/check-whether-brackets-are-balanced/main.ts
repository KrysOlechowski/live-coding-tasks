export function areBracketsBalanced(input: string): boolean {
  const filteredBrackets = [...input].filter((char) => {
    return getIsBracketChar(char);
  });

  if (filteredBrackets.length === 0) {
    return true;
  }
  if (filteredBrackets.length % 2 !== 0) {
    return false;
  }

  let isCorrect = false;

  const stack: string[] = [];

  for (const br of filteredBrackets) {
    if (br === "{" || br === "(" || br === "[") {
      stack.push(br);
      continue;
    }
    if (br === "}") {
      const latestElement = stack.pop();
      if (latestElement !== "{") {
        break;
      }
    }
    if (br === ")") {
      const latestElement = stack.pop();
      if (latestElement !== "(") {
        break;
      }
    }
    if (br === "]") {
      const latestElement = stack.pop();
      if (latestElement !== "[") {
        break;
      }
    }
    if (stack.length === 0) {
      isCorrect = true;
    }
  }

  return isCorrect;
}

export const sampleInput = "function test() { return [1, 2, (3 + 4)]; }";

console.log(areBracketsBalanced(sampleInput));

const testCases = [
  {
    label: "empty string",
    input: "",
    expected: true,
  },
  {
    label: "no brackets at all",
    input: "hello world",
    expected: true,
  },
  {
    label: "simple balanced brackets",
    input: "()[]{}",
    expected: true,
  },
  {
    label: "nested balanced brackets",
    input: "{[()]}",
    expected: true,
  },
  {
    label: "ignore non-bracket characters",
    input: "if (a[0] === '{') { return true; }",
    expected: true,
  },
  {
    label: "closing bracket before opening bracket",
    input: ")([]",
    expected: false,
  },
  {
    label: "mismatched bracket types",
    input: "([)]",
    expected: false,
  },
  {
    label: "extra opening bracket",
    input: "(()",
    expected: false,
  },
  {
    label: "extra closing bracket",
    input: "([]]}",
    expected: false,
  },
  {
    label: "balanced prefix, then invalid suffix",
    input: "())(",
    expected: false,
  },
  {
    label: "becomes balanced in the middle, invalid later",
    input: "(()))(",
    expected: false,
  },
];

for (const testCase of testCases) {
  console.log({
    label: testCase.label,
    input: testCase.input,
    expected: testCase.expected,
    received: areBracketsBalanced(testCase.input),
  });
}

function getIsBracketChar(char: string): boolean {
  switch (char) {
    case "{":
      return true;
    case "(":
      return true;
    case "[":
      return true;
    case "}":
      return true;
    case ")":
      return true;
    case "]":
      return true;
    default:
      return false;
  }
}
