"use client";

import { useEffect, useState } from "react";

type Channel = {
  id: string;
  name: string;
  color: string;
};

type ChannelEvent = {
  id: number;
  channelId: string;
  message: string;
  receivedAt: string;
};

const CHANNELS: Channel[] = [
  { id: "operations", name: "Operations", color: "bg-blue-500" },
  { id: "support", name: "Support", color: "bg-emerald-500" },
  { id: "sales", name: "Sales", color: "bg-violet-500" },
];

const CHANNEL_MESSAGES: Record<string, string[]> = {
  operations: ["Deployment completed", "Queue depth returned to normal"],
  support: ["New priority ticket", "Customer replied to ticket"],
  sales: ["New trial started", "Opportunity moved to proposal"],
};

let nextEventId = 1;

function subscribeToChannel(
  channelId: string,
  onEvent: (event: ChannelEvent) => void,
): () => void {
  let messageIndex = 0;

  console.info(`[mock-events] subscribed: ${channelId}`);

  const intervalId = window.setInterval(() => {
    const messages = CHANNEL_MESSAGES[channelId];
    const message = messages[messageIndex % messages.length];
    messageIndex += 1;

    onEvent({
      id: nextEventId,
      channelId,
      message,
      receivedAt: new Date().toLocaleTimeString(),
    });
    nextEventId += 1;
  }, 800);

  return () => {
    window.clearInterval(intervalId);
    console.info(`[mock-events] unsubscribed: ${channelId}`);
  };
}

export default function ChannelActivity() {
  const [selectedChannelId, setSelectedChannelId] = useState(CHANNELS[0].id);
  const [events, setEvents] = useState<ChannelEvent[]>([]);

  useEffect(() => {
    setEvents([]);

    subscribeToChannel(selectedChannelId, (event) => {
      setEvents((currentEvents) => [event, ...currentEvents].slice(0, 5));
    });
  }, [selectedChannelId]);

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-12 text-zinc-950">
      <section className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-cyan-700">Operations center</p>
        <h1 className="mt-1 text-2xl font-semibold">Live channel activity</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Wait for an event, then switch channels. Subscription events are logged in the
          browser console.
        </p>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="Activity channels">
          {CHANNELS.map((channel) => (
            <button
              key={channel.id}
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedChannelId === channel.id
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
              onClick={() => setSelectedChannelId(channel.id)}
            >
              {channel.name}
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-72 rounded-2xl border border-zinc-200 bg-zinc-50 p-5" aria-live="polite">
          <h2 className="text-sm font-semibold text-zinc-700">Newest events</h2>

          {events.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">Waiting for channel activity…</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {events.map((event) => {
                const sourceChannel = CHANNELS.find(
                  (channel) => channel.id === event.channelId,
                );

                return (
                  <li key={event.id} className="rounded-xl border border-zinc-200 bg-white p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${sourceChannel?.color ?? "bg-zinc-400"}`}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium text-zinc-500">
                        {sourceChannel?.name ?? event.channelId} · {event.receivedAt}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium">{event.message}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

