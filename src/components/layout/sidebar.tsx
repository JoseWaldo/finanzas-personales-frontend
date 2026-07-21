import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, Wallet, TrendingDown, Repeat, Tags, LogOut, ChevronLeft, ChevronRight, X, UserRound } from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo";
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
    to: "/dashboard/suscripciones",
    icon: Repeat,
    label: "Suscripciones",
  },
  {
    to: "/dashboard/categorias",
    icon: Tags,
    label: "Categorias",
  },
  {
    to: "/dashboard/perfil",
    icon: UserRound,
    label: "Perfil",
  },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, mobileOpen, onToggle, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const router = useRouter();
  const expanded = mobileOpen || !collapsed;

  async function handleLogout() {
    await logout();
    router.navigate({ to: "/auth/login" });
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/30 bg-sidebar transition-all duration-300",
          "-translate-x-full",
          mobileOpen && "translate-x-0",
          "md:translate-x-0",
          mobileOpen && "w-60",
          !mobileOpen && collapsed && "md:w-16",
          !mobileOpen && !collapsed && "md:w-60",
        )}
      >
        <div className="relative flex h-16 items-center justify-between px-3">
          <AppLogo
            showText={expanded}
            className={cn("overflow-hidden transition-opacity", !expanded && "justify-center")}
          />

          {mobileOpen && (
            <button
              onClick={onMobileClose}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={onToggle}
          className={cn(
            "absolute right-0 top-1/2 z-10 hidden md:flex -translate-y-1/2 translate-x-1/2 h-6 w-6 items-center justify-center rounded border border-border/40 bg-background text-muted-foreground shadow-sm hover:text-foreground transition-all cursor-pointer",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map(({ to, icon: Icon, label, exact }) => {
            const isActive = exact
              ? location.pathname === to
              : location.pathname.startsWith(to);

            return (
              <Link
                key={to}
                to={to}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !expanded && "justify-center px-2",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {expanded && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 px-3 pb-4">
          <div className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            !expanded && "justify-center px-2",
          )}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium">
              {user?.name ? user.name.charAt(0).toUpperCase() : <UserRound className="h-4 w-4" />}
            </div>
            {expanded && (
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {user?.name ?? "Usuario"}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer",
              !expanded && "justify-center px-2",
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {expanded && <span>Salir</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
