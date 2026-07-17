import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: async () => {
    const res = await fetch("http://localhost:3000/api/v1/auth/session", {
      credentials: "include",
    });
    if (!res.ok) {
      throw redirect({ to: "/auth/login" });
    }
  },
});

function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <nav className="ml-auto flex items-center gap-4">
            <a
              href="/api/v1/auth/sign-out"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cerrar sesion
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
