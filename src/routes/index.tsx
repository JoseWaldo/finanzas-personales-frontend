import { createFileRoute, redirect } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    const res = await fetch("http://localhost:3000/api/v1/auth/session", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.user) {
        throw redirect({ to: "/dashboard" });
      }
    }
  },
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Finanzas Personales</h1>
        <p className="text-lg text-muted-foreground">
          Gestiona tus ingresos, gastos y presupuestos de forma sencilla.
        </p>
      </div>
      <div className="flex gap-4">
        <a href="/auth/login">
          <Button size="lg">Iniciar Sesion</Button>
        </a>
        <a href="/auth/register">
          <Button variant="outline" size="lg">
            Registrarse
          </Button>
        </a>
      </div>
    </div>
  );
}
