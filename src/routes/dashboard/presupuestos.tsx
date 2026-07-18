import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/presupuestos")({
  component: PresupuestosPage,
});

function PresupuestosPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Presupuestos</h2>
      <p className="text-muted-foreground">Proximamente.</p>
    </div>
  );
}
