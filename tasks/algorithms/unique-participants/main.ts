export type Participant = {
  readonly id: string;
  readonly name: string;
};

export function uniqueParticipants(
  participants: readonly Participant[],
): Participant[] {
  if (participants.length === 0) {
    return [];
  }

  let uniqueMap = new Map<string, Participant>();
  for (const part of participants) {
    if (!uniqueMap.has(part.id)) {
      uniqueMap.set(part.id, part);
    }
  }
  return [...uniqueMap.values()];
}

const registrations: readonly Participant[] = [
  { id: "2", name: "Maya" },
  { id: "1", name: "Leo" },
  { id: "2", name: "Maya Udated" },
  { id: "3", name: "Maya" },
];

console.log(uniqueParticipants(registrations));
