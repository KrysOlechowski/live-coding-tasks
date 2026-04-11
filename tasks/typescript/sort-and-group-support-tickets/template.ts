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
    priority: "high",
    status: "open",
    assignee: " Ada ",
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

export function groupSupportTickets(input: RawTicket[]): GroupedTickets[] {
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
