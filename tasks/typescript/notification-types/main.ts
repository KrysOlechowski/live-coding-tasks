export type Notification =
  | EmailNotification
  | SMSNotification
  | PushNotification;

export type EmailNotification = {
  channel: "email";
  message: string;
  to: string;
  subject: string;
};

export type SMSNotification = {
  channel: "sms";
  message: string;
  phoneNumber: string;
};
export type PushNotification = {
  channel: "push";
  message: string;
  deviceToken: string;
  title: string;
};

export function describeNotification(notification: Notification): string {
  switch (notification.channel) {
    case "email":
      return `Email to ${notification.to}: ${notification.subject}`;
    case "sms":
      return `SMS to ${notification.phoneNumber}: ${notification.message}`;
    default:
      return `Push to ${notification.deviceToken}: ${notification.title}`;
  }
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
