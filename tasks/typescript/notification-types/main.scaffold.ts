// TODO: Replace this permissive placeholder with the model from task.md.
export type Notification = {
  channel: string;
  message?: string;
  to?: string;
  subject?: string;
  phoneNumber?: string;
  deviceToken?: string;
  title?: string;
};

export function describeNotification(notification: Notification): string {
  // TODO: Implement the descriptions required by task.md.
  void notification;
  return "TODO";
}

const examples: Notification[] = [
  {
    channel: "email",
    to: "maya@example.com",
    subject: "Welcome",
    message: "Thanks for signing up!",
  },
  {
    channel: "sms",
    phoneNumber: "+48123456789",
    message: "Your code is 1234",
  },
  {
    channel: "push",
    deviceToken: "device-42",
    title: "New message",
    message: "You have a new message from Leo.",
  },
];

for (const notification of examples) {
  console.log(describeNotification(notification));
}
