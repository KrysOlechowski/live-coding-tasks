type BasePayment = {
  id: string;
  currency: string;
  createdAt: string;
  amount: number;
};

type PaymentDraft = BasePayment & {
  status: "draft";
};

type PaymentPending = BasePayment & {
  status: "pending";
  submittedAt: string;
};

type PaymentPaid = BasePayment & {
  status: "paid";
  paidAt: string;
  receiptUrl?: string;
};

type PaymentFailed = BasePayment & {
  status: "failed";
  failedAt: string;
  failedReason: string;
};

type PaymentRefunded = BasePayment & {
  status: "refunded";
  paidAt: string;
  refundId: string;
  refundedAt: string;
  refundReason?: string;
  receiptUrl?: string;
};

type Payment =
  | PaymentDraft
  | PaymentPending
  | PaymentPaid
  | PaymentFailed
  | PaymentRefunded;

const payments: Payment[] = [
  {
    id: "pay_draft",
    amount: 4900,
    currency: "USD",
    createdAt: "2026-06-01T09:00:00Z",
    status: "draft",
  },
  {
    id: "pay_pending",
    amount: 12900,
    currency: "USD",
    createdAt: "2026-06-02T10:00:00Z",
    status: "pending",
    submittedAt: "2026-06-02T10:05:00Z",
  },
  {
    id: "pay_paid_with_failure",
    amount: 7900,
    currency: "EUR",
    createdAt: "2026-06-03T11:00:00Z",
    status: "paid",
    paidAt: "2026-06-03T11:02:00Z",
    receiptUrl: "https://example.com/receipts/pay_paid_with_failure",
  },
  {
    id: "pay_refunded_without_metadata",
    amount: 15900,
    currency: "GBP",
    createdAt: "2026-06-04T12:00:00Z",
    status: "refunded",
    paidAt: "2026-06-04T12:03:00Z",
    refundId: "ref_123",
    refundedAt: "2026-06-04T12:10:00Z",
  },
];

// TODO: Replace the loose Payment model with a discriminated union that makes
// invalid payment states fail at compile time.

function getPaymentStatusLabel(payment: Payment): string {
  return payment.status.charAt(0).toUpperCase() + payment.status.slice(1);
}

function assertNever(value: never): never {
  throw new Error(`Unhandled payment status: ${JSON.stringify(value)}`);
}

function getPaymentTimelineLabel(payment: Payment): string {
  switch (payment.status) {
    case "draft":
      return `Created at ${payment.createdAt}`;
    case "pending":
      return `Submitted at ${payment.submittedAt}`;
    case "paid":
      return `Paid at ${payment.paidAt}`;
    case "failed":
      return `Failed at ${payment.failedAt}: ${payment.failedReason}`;
    case "refunded":
      return `Refunded at ${payment.refundedAt}`;
    default:
      return assertNever(payment);
  }
}

function canRefund(payment: Payment): boolean {
  return payment.status === "paid";
}

function getReceiptLink(payment: Payment): string | undefined {
  switch (payment.status) {
    case "paid":
    case "refunded":
      return payment.receiptUrl;
    case "failed":
    case "pending":
    case "draft":
      return undefined;
    default:
      return assertNever(payment);
  }
}

// TODO: Update the helpers to rely on status narrowing and use exhaustive
// handling where appropriate.

for (const payment of payments) {
  console.log({
    id: payment.id,
    status: getPaymentStatusLabel(payment),
    timeline: getPaymentTimelineLabel(payment),
    canRefund: canRefund(payment),
    receipt: getReceiptLink(payment),
  });
}
