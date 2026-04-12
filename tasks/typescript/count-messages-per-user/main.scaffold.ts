export type Message = {
  id: string;
  userId: string;
  userName: string;
  text: string;
};

export type UserMessageSummary = {
  userId: string;
  userName: string;
  messageCount: number;
};

export function countMessagesPerUser(
  messages: Message[],
): UserMessageSummary[] {
  // TODO: aggregate messages by userId without mutating the input.
  // TODO: keep the first userName seen for each userId.
  // TODO: preserve the order of first appearance in the final output.
  return [];
}

export const sampleMessages: Message[] = [
  {
    id: "m-101",
    userId: "u-1",
    userName: "Ada",
    text: "Hello",
  },
  {
    id: "m-102",
    userId: "u-2",
    userName: "Linus",
    text: "Hi",
  },
  {
    id: "m-103",
    userId: "u-1",
    userName: "Ada Lovelace",
    text: "How are you?",
  },
  {
    id: "m-104",
    userId: "u-2",
    userName: "Linus",
    text: "All good",
  },
];

console.log(countMessagesPerUser(sampleMessages));
