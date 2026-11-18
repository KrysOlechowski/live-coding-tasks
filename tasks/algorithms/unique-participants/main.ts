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

  let uniqueObj: Record<string, Participant> = {};
  for (const unique of participants) {
    const participantId = unique.id;

    if (uniqueObj[participantId] === undefined) {
      uniqueObj[participantId] = { id: participantId, name: unique.name };
    }
  }
  return Object.values(uniqueObj);
}

const registrations: readonly Participant[] = [
  { id: "2", name: "Maya" },
  { id: "1", name: "Leo" },
  { id: "2", name: "Maya Udated" },
  { id: "3", name: "Maya" },
];

console.log(uniqueParticipants(registrations));
