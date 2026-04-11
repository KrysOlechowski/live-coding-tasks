type WidgetStatus = "loading" | "success" | "error";

type Widget = {
  id: string;
  title: string;
  status: WidgetStatus;
  data?: string[];
  errorMessage?: string;
};

const widgets: Widget[] = [
  {
    id: "sales",
    title: "Sales",
    status: "loading",
    data: [],
  },
  {
    id: "visitors",
    title: "Visitors",
    status: "error",
  },
  {
    id: "alerts",
    title: "Alerts",
    status: "success",
    data: ["3 unread alerts"],
  },
];

type WidgetCardProps = {
  widget: Widget;
};

function WidgetCard({ widget }: WidgetCardProps) {
  return (
    <section>
      <h2>{widget.title}</h2>

      {/* TODO: render loading, error, and success states for this widget */}
      {/* TODO: keep each widget self-contained instead of using one global page status */}
      {/* TODO: show a safe fallback message if an error widget has no errorMessage */}
      {/* TODO: handle the case where success data is empty */}

      <div>Implement widget state UI here.</div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <h1>Dashboard</h1>

      <div>
        {widgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} />
        ))}
      </div>
    </main>
  );
}
