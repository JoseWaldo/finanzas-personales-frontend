import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { Sidebar } from "@/components/layout/sidebar";

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-60"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
