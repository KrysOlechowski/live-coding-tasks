export function getUniqueAttendeeIds(attendeeIds: readonly string[]): string[] {
  return [...new Set(attendeeIds)];
}

const attendeeIds = ["u-2", "u-1", "u-2", "u-3", "u-1"];

console.log("Unique attendees:", getUniqueAttendeeIds(attendeeIds));
