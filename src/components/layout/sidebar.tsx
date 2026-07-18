import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, Wallet, TrendingDown, PiggyBank, LogOut, ChevronLeft } from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navItems = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Panel",
    exact: true,
  },
  {
    to: "/dashboard/ingresos",
    icon: Wallet,
    label: "Ingresos",
  },
  {
    to: "/dashboard/gastos",
    icon: TrendingDown,
    label: "Gastos",
  },
  {
    to: "/dashboard/presupuestos",
    icon: PiggyBank,
    label: "Presupuestos",
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.navigate({ to: "/auth/login" });
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex h-16 items-center justify-between px-3">
        <AppLogo
          showText={!collapsed}
          className={cn("overflow-hidden transition-opacity", collapsed && "justify-center")}
        />
        <button
          onClick={onToggle}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "hidden",
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {collapsed && (
        <button
          onClick={onToggle}
          className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-180"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map(({ to, icon: Icon, label, exact }) => {
          const isActive = exact
            ? location.pathname === to
            : location.pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 px-3 pb-4">
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Salir</span>}
        </button>
        <div className={cn("flex", collapsed && "justify-center")}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
