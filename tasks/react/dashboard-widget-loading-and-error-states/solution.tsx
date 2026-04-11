import { useEffect, useState } from "react";

type WidgetStatus = "loading" | "success" | "error";

type WidgetState = {
  status: WidgetStatus;
  data?: string[];
  errorMessage?: string;
};

type WidgetConfig = {
  id: string;
  title: string;
  initialState: WidgetState;
  nextState?: WidgetState;
  delayMs?: number;
};

const widgetConfigs: WidgetConfig[] = [
  {
    id: "sales",
    title: "Sales",
    initialState: { status: "loading" },
    nextState: {
      status: "success",
      data: ["$12,450 revenue", "18 new orders"],
    },
    delayMs: 1200,
  },
  {
    id: "visitors",
    title: "Visitors",
    initialState: { status: "error" },
  },
  {
    id: "alerts",
    title: "Alerts",
    initialState: { status: "success", data: [] },
  },
];

type WidgetCardProps = {
  title: string;
  initialState: WidgetState;
  nextState?: WidgetState;
  delayMs?: number;
};

function WidgetCard({
  title,
  initialState,
  nextState,
  delayMs = 1000,
}: WidgetCardProps) {
  const [widgetState, setWidgetState] = useState(initialState);

  useEffect(() => {
    if (widgetState.status !== "loading" || !nextState) {
      return;
    }

    // Simulate each widget resolving on its own without a shared page status.
    const timerId = window.setTimeout(() => {
      setWidgetState(nextState);
    }, delayMs);

    return () => window.clearTimeout(timerId);
  }, [delayMs, nextState, widgetState.status]);

  const { status, data = [], errorMessage } = widgetState;

  return (
    <section style={cardStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <span style={badgeStyle(status)}>{status}</span>
      </header>
      {status === "loading" ? (
        <p>Loading widget data...</p>
      ) : status === "error" ? (
        <p>{errorMessage ?? "Something went wrong while loading this widget."}</p>
      ) : data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function App() {
  return (
    <main style={pageStyle}>
      <h1>Dashboard</h1>
      <div style={gridStyle}>
        {widgetConfigs.map((widget) => (
          <WidgetCard
            key={widget.id}
            title={widget.title}
            initialState={widget.initialState}
            nextState={widget.nextState}
            delayMs={widget.delayMs}
          />
        ))}
      </div>
    </main>
  );
}

const pageStyle = {
  fontFamily: "sans-serif",
  padding: "24px",
};

const gridStyle = {
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};

const cardStyle = {
  border: "1px solid #d0d7de",
  borderRadius: "12px",
  padding: "16px",
  backgroundColor: "#fff",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
  gap: "12px",
};

const titleStyle = {
  fontSize: "18px",
  margin: 0,
};

function badgeStyle(status: WidgetStatus) {
  const colors: Record<WidgetStatus, { background: string; color: string }> = {
    loading: { background: "#fff4cc", color: "#7a5d00" },
    success: { background: "#dff7e3", color: "#166534" },
    error: { background: "#fde2e1", color: "#b42318" },
  };

  return {
    backgroundColor: colors[status].background,
    color: colors[status].color,
    borderRadius: "999px",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "capitalize" as const,
  };
}
