export function areBracketsBalanced(input: string): boolean {
  // TODO: iterate through the string in original order.
  // TODO: ignore all non-bracket characters.
  // TODO: track opening brackets so closing brackets can be validated in order.
  // TODO: return false early on mismatches and false at the end if openings remain.
  return false;
}

export const sampleInput = "function test() { return [1, 2, (3 + 4)]; }";

console.log(areBracketsBalanced(sampleInput));
