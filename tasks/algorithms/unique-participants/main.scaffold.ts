export type Participant = {
  readonly id: string;
  readonly name: string;
};

export function uniqueParticipants(
  participants: readonly Participant[],
): Participant[] {
  // TODO: Implement the behavior described in task.md.
  void participants;
  return [];
}

const registrations: readonly Participant[] = [
  { id: "p2", name: "Maya" },
  { id: "p1", name: "Leo" },
  { id: "p2", name: "Maya Updated" },
  { id: "p3", name: "Maya" },
];

console.log(uniqueParticipants(registrations));
