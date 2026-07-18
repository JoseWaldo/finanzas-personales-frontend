import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/ingresos")({
  component: IngresosPage,
});

function IngresosPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Ingresos</h2>
      <p className="text-muted-foreground">Proximamente.</p>
    </div>
  );
}
