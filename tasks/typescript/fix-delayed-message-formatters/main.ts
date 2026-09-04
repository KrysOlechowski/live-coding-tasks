export type Recipient = {
  id: string;
  name: string;
  preferredName?: string;
};

export type MessageFormatter = () => string;

export function createMessageFormatters(
  recipients: Recipient[],
  prefix: string,
): MessageFormatter[] {
  return recipients.map((recipient) => {
    if (recipient.preferredName) {
      const displayName = recipient.preferredName;
      return () => `${prefix}, ${displayName}!`;
    }

    const displayName = recipient.name;
    return () => `${prefix}, ${displayName}!`;
  });
}

const sampleRecipients: Recipient[] = [
  { id: "recipient-1", name: "Alice" },
  { id: "recipient-2", name: "Robert", preferredName: "Bobby" },
  { id: "recipient-3", name: "Carol" },
  { id: "recipient-4", name: "Dana", preferredName: "Dani" },
];

const sampleFormatters = createMessageFormatters(sampleRecipients, "Hello");

console.log(sampleFormatters.map((formatter) => formatter()));
