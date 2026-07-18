import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/gastos")({
  component: GastosPage,
});

function GastosPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Gastos</h2>
      <p className="text-muted-foreground">Proximamente.</p>
    </div>
  );
}
