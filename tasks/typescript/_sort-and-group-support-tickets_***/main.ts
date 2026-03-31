type RawTicket = {
  id: string;
  title: string;
  priority?: string;
  status?: string;
  assignee?: string;
};

type TicketSection = "Open" | "In Progress" | "Closed" | "Unknown";

type TicketRow = {
  id: string;
  title: string;
  displayAssignee: string;
};

type GroupedTickets = {
  section: TicketSection;
  tickets: TicketRow[];
};

const tickets: RawTicket[] = [
  {
    id: "t1",
    title: " Reset password ",
    priority: "low",
    status: "open",
    assignee: " Ada ",
  },
  {
    id: "t11",
    title: " Reset password t11",
    priority: "high",
    status: "open",
    assignee: " Ada t11",
  },
  {
    id: "t111",
    title: " Reset password t111",
    priority: "medium",
    status: "open",
    assignee: " Ada t111",
  },
  {
    id: "t2",
    title: "Bug in checkout",
    priority: "medium",
    status: "IN_PROGRESS",
    assignee: "",
  },
  {
    id: "t3",
    title: "Update billing details",
    priority: "urgent",
    status: "done",
  },
  {
    id: "t4",
    title: "  Account locked",
  },
];

const getTicketSection = (ticket: RawTicket): TicketSection => {
  const isStatus = (ticket?.status?.trim().length ?? 0) > 0;
  const rawStatus = isStatus
    ? ticket.status
        ?.toLocaleLowerCase()
        .replaceAll("_", " ")
        .replaceAll("-", " ")
    : "Unknown";

  if (rawStatus === "Unknown") {
    return "Unknown";
  }

  switch (rawStatus) {
    case "open":
      return "Open";
    case "in progress":
      return "In Progress";
    case "closed":
      return "Closed";
    case "done":
      return "Closed";
    default:
      return "Unknown";
  }
};

const getPriorityRank = (ticket: RawTicket): number => {
  const isPriorityField = (ticket?.priority?.trim().length ?? 0) > 0;
  if (!isPriorityField) {
    return 0;
  }
  switch (ticket.priority?.trim()) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 0;
  }
};

export function groupSupportTickets(input: RawTicket[]): GroupedTickets[] {
  const groupedByStatus: Record<
    TicketSection,
    (TicketRow & { priorityRank: number })[]
  > = {
    Open: [],
    "In Progress": [],
    Closed: [],
    Unknown: [],
  };
  input.map((ticket) => {
    const ticketSectionName = getTicketSection(ticket);
    const isDisplayAssignee = (ticket?.assignee?.trim().length ?? 0) > 0;
    const displayAssignee = isDisplayAssignee
      ? ticket.assignee!.trim()
      : "Unassigned";

    const ticketTitile = ticket.title.trim();
    const priorityRank = getPriorityRank(ticket);

    groupedByStatus[ticketSectionName].push({
      id: ticket.id,
      title: ticketTitile,
      displayAssignee: displayAssignee,
      priorityRank,
    });
  });

  for (const section of Object.keys(groupedByStatus) as TicketSection[]) {
    groupedByStatus[section].sort((a, b) => {
      if (a.priorityRank !== b.priorityRank) {
        return b.priorityRank - a.priorityRank;
      }

      return a.title.localeCompare(b.title);
    });
  }

  console.log(groupedByStatus);
  // TODO: return a new grouped structure without mutating the original input
  // TODO: normalize raw status values into the required UI sections
  // TODO: normalize priority values into a sortable rank
  // TODO: trim title and assignee values before using them
  // TODO: use "Unassigned" when assignee is missing or empty
  // TODO: group tickets into Open, In Progress, Closed, and Unknown
  // TODO: sort tickets inside each section by priority first, then title

  return [];
}

console.log(groupSupportTickets(tickets));
