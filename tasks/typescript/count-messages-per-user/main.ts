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
  const newObj: Record<string, UserMessageSummary> = {};

  for (const element of messages) {
    if (newObj[element.userId] === undefined) {
      newObj[element.userId] = {
        userId: element.userId,
        userName: element.userName,
        messageCount: 1,
      };
    } else {
      newObj[element.userId].messageCount += 1;
    }
  }
  const newArray = Object.values(newObj);
  return newArray;
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
  {
    id: "m-105",
    userId: "u-3",
    userName: "Grace",
    text: "Hey team",
  },
  {
    id: "m-106",
    userId: "u-1",
    userName: "Ada",
    text: "Checking in again",
  },
  {
    id: "m-107",
    userId: "u-4",
    userName: "Margaret",
    text: "Morning",
  },
  {
    id: "m-108",
    userId: "u-3",
    userName: "Grace Hopper",
    text: "Any updates?",
  },
  {
    id: "m-109",
    userId: "u-2",
    userName: "Linus Torvalds",
    text: "Pushed my changes",
  },
  {
    id: "m-110",
    userId: "u-1",
    userName: "Ada Lovelace",
    text: "I'll review them",
  },
];

console.log(countMessagesPerUser(sampleMessages));
