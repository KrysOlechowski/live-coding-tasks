type ActivitySource = "crm" | "billing" | "support";

type MetadataValue = string | number | boolean | null;

type CrmEvent = {
  crmEventId?: string | null;
  customerId?: string | null;
  action?: string | null;
  createdAt?: string | null;
  actorName?: string | null;
};

type BillingEvent = {
  transactionId?: string | null;
  accountId?: string | null;
  eventType?: string | null;
  timestamp?: string | null;
  amount?: number | null;
  currency?: string | null;
};

type SupportEvent = {
  ticketEventId?: string | null;
  requesterId?: string | null;
  kind?: string | null;
  happenedAt?: string | null;
  ticketId?: string | null;
};

type NormalizedActivityEvent = {
  id: string;
  source: ActivitySource;
  type: string;
  customerId: string;
  occurredAt: string;
  label: string;
  metadata: Record<string, MetadataValue>;
};

const crmEvents: CrmEvent[] = [
  {
    crmEventId: "crm_1",
    customerId: "cus_123",
    action: "profile_updated",
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    crmEventId: "crm_1",
    customerId: "cus_123",
    action: "profile_updated",
    createdAt: "2026-06-01T10:00:00Z",
    actorName: "Marta",
  },
  {
    crmEventId: "crm_2",
    customerId: "cus_123",
    action: "note_added",
    createdAt: "2026-06-04T09:00:00Z",
    actorName: "Olek",
  },
  {
    crmEventId: "   ",
    customerId: "cus_123",
    action: "owner_changed",
    createdAt: "2026-06-05T11:00:00Z",
    actorName: "Marta",
  },
];

const billingEvents: BillingEvent[] = [
  {
    transactionId: "txn_1",
    accountId: "cus_123",
    eventType: "invoice_paid",
    timestamp: "2026-06-02T12:30:00Z",
    amount: 19900,
    currency: "PLN",
  },
  {
    transactionId: "txn_2",
    accountId: "cus_123",
    eventType: "refund_created",
    timestamp: "2026-06-04T09:00:00Z",
    amount: 4900,
    currency: "PLN",
  },
  {
    transactionId: "txn_invalid_date",
    accountId: "cus_123",
    eventType: "invoice_failed",
    timestamp: "not-a-date",
    amount: 7900,
    currency: "PLN",
  },
];

const supportEvents: SupportEvent[] = [
  {
    ticketEventId: "ticket_1",
    requesterId: "cus_123",
    kind: "ticket_opened",
    happenedAt: "2026-06-03T08:15:00Z",
    ticketId: "T-100",
  },
  {
    ticketEventId: "ticket_2",
    requesterId: "cus_123",
    kind: "ticket_escalated",
    happenedAt: "2026-06-05T14:45:00Z",
    ticketId: "T-101",
  },
  {
    ticketEventId: "ticket_3",
    requesterId: null,
    kind: "ticket_closed",
    happenedAt: "2026-06-06T16:20:00Z",
    ticketId: "T-102",
  },
];

function normalizeCrmEvent(
  event: CrmEvent,
): NormalizedActivityEvent | null {
  // TODO: Validate and normalize a CRM event.
  return null;
}

function normalizeBillingEvent(
  event: BillingEvent,
): NormalizedActivityEvent | null {
  // TODO: Validate and normalize a billing event.
  return null;
}

function normalizeSupportEvent(
  event: SupportEvent,
): NormalizedActivityEvent | null {
  // TODO: Validate and normalize a support event.
  return null;
}

function mergeCustomerActivityEvents(
  crm: readonly CrmEvent[],
  billing: readonly BillingEvent[],
  support: readonly SupportEvent[],
): NormalizedActivityEvent[] {
  // TODO: Normalize, merge, deduplicate, and stably sort all valid events.
  return [];
}

console.log(
  "Merged customer activity:",
  mergeCustomerActivityEvents(crmEvents, billingEvents, supportEvents),
);

console.log(
  "Unknown support event:",
  mergeCustomerActivityEvents([], [], [supportEvents[1]]),
);
