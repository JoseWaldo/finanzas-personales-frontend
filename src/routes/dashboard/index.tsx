import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

const stats = [
  {
    title: "Balance total",
    value: "$0.00",
    description: "Tu patrimonio actual",
    icon: Wallet,
    accentClass: "border-t-chart-1",
    color: "text-chart-1",
    bg: "bg-chart-1/10",
  },
  {
    title: "Ingresos del mes",
    value: "$0.00",
    description: "+12% vs mes anterior",
    icon: ArrowUpRight,
    accentClass: "border-t-chart-2",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    title: "Gastos del mes",
    value: "$0.00",
    description: "-8% vs mes anterior",
    icon: ArrowDownRight,
    accentClass: "border-t-chart-4",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  {
    title: "Presupuesto",
    value: "$0.00",
    description: "Restante este mes",
    icon: DollarSign,
    accentClass: "border-t-chart-3",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
];

function DashboardIndex() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-normal tracking-tight">
          Bienvenido, {user?.name ?? "Usuario"}
        </h2>
        <p className="text-muted-foreground">
          Este es el resumen de tus finanzas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, description, icon: Icon, accentClass, color, bg }) => (
          <Card
            key={title}
            className={cn(
              "group border-t-2 border-t-transparent transition-colors hover:border-primary/20",
              accentClass
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", bg)}>
                <Icon className={cn("h-5 w-5", color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-normal">{value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Movimientos recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <DollarSign className="mb-3 h-10 w-10 opacity-30" />
              <p className="text-sm">No hay movimientos registrados</p>
              <p className="mt-1 text-xs">
                Empieza agregando tu primer ingreso o gasto.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Distribucion de gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-3 opacity-30"
              >
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
              <p className="text-sm">Sin datos para mostrar</p>
              <p className="mt-1 text-xs">
                El grafico aparecera cuando registres gastos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
