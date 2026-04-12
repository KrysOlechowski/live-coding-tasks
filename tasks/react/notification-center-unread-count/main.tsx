"use client";

import { useState } from "react";

type Notification = {
  id: string;
  title: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  { id: "n-1", title: "New comment on your post", read: false },
  { id: "n-2", title: "Your password was changed", read: true },
  { id: "n-3", title: "Weekly summary is ready", read: false },
];

export default function App() {
  const [notifications, setNotifications] = useState(initialNotifications);

  // TODO: derive the unread count from `notifications`.
  const unreadCount = notifications.filter((notification) => {
    return notification?.read === false;
  }).length;

  const handleMarkAsRead = (notificationId: string) => {
    // TODO: update only the clicked notification to `read: true`.
    // TODO: do not mutate the existing array or notification objects.
    const filteredElements = notifications.map((element) => {
      if (element.id === notificationId) {
        return {
          ...element,
          read: true,
        };
      } else {
        return element;
      }
    });
    setNotifications(filteredElements);
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 640 }}>
      <h1>Notifications</h1>
      <p>Unread: {unreadCount}</p>

      {/* TODO: render the notifications list in the original order. */}
      <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            style={{
              border: "1px solid #d4d4d8",
              borderRadius: 8,
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <span>{notification.title}</span>

            {notification.read ? (
              <span>Read</span>
            ) : (
              <button onClick={() => handleMarkAsRead(notification.id)}>
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
