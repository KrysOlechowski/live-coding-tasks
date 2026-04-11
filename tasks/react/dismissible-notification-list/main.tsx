"use client";

import { useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
};

const initialNotifications: Notification[] = [
  {
    id: "n-1",
    title: "Profile updated",
    message: "Your public profile is now visible.",
  },
  {
    id: "n-2",
    title: "Team invite",
    message: "You were invited to Product Squad.",
  },
  {
    id: "n-3",
    title: "Weekly summary",
    message: "Your report is ready to view.",
  },
];

export default function App() {
  const [notifications] = useState(initialNotifications);
  const [dismissedIndexes, setDismissedIndexes] = useState<number[]>([]);

  const visibleNotifications = notifications.filter((_, index) => {
    return !dismissedIndexes.includes(index);
  });

  function handleDismiss(visibleIndex: number) {
    // TODO: Fix this bug.
    // Dismissing by visible index breaks after multiple actions,
    // because indexes no longer represent stable item identity.
    setDismissedIndexes((previous) => [...previous, visibleIndex]);
  }

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>

      {visibleNotifications.length === 0 ? (
        <p className="text-sm">No notifications.</p>
      ) : (
        <ul className="space-y-3">
          {visibleNotifications.map((notification, index) => (
            <li key={index} className="border rounded p-3">
              <h2 className="font-medium">{notification.title}</h2>
              <p className="text-sm mb-2">{notification.message}</p>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => handleDismiss(index)}
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      )}

      {/*
        TODO: Keep a single source of truth for the list state.
        TODO: Ensure dismiss uses a stable identifier and immutable updates.
      */}
    </main>
  );
}
