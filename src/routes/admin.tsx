import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  LogOut,
  Tag,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import NotificationsBell from "@/components/site/notifications-bell";
import ThemeToggle from "@/components/site/theme-toggle";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Kusuf" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage || loading) return;
    if (!user || !isAdmin) navigate({ to: "/admin/login" });
  }, [user, isAdmin, loading, isLoginPage, navigate]);

  if (isLoginPage) return <Outlet />;
  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">جاري التحقق...</p>
      </div>
    );
  }

  const links = [
    { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, exact: true },
    { to: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
    { to: "/admin/products", label: "المنتجات", icon: Package },
    { to: "/admin/offers", label: "العروض", icon: Tag },
    { to: "/admin/users", label: "العملاء", icon: Users },
    { to: "/admin/messages", label: "الرسائل", icon: MessageSquare },
  ];

  return (
    <div
      className="h-screen bg-background flex flex-col overflow-hidden"
      dir="rtl"
    >
      {/* Top Navbar */}
      <header className="h-16 border-b border-border bg-surface/30 backdrop-blur-xl flex items-center justify-between px-6 z-40 shrink-0">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-serif font-bold tracking-tighter uppercase text-primary">
              KUSUF
            </span>
            <span className="hidden sm:block text-[9px] text-muted-foreground font-bold tracking-[0.4em] uppercase opacity-60">
              Admin Portal
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NotificationsBell />
          <div className="w-px h-6 bg-border mx-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-primary flex items-center justify-center text-[10px] font-bold text-background uppercase">
              {user?.email?.[0] || 'A'}
            </div>
            <span className="hidden sm:block text-[10px] font-bold tracking-widest uppercase opacity-60 truncate max-w-[120px]">
              {user?.email?.split('@')[0]}
            </span>
            <button
              onClick={async () => {
                await logout();
                navigate({ to: "/admin/login" });
              }}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              title="خروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Fixed sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-l border-border bg-surface/20 backdrop-blur-md shrink-0">
          <nav className="flex-1 p-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.exact }}
                className="group relative flex items-center gap-3 px-4 py-3 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-all duration-300"
                activeProps={{
                  className:
                    "group relative flex items-center gap-3 px-4 py-3 text-[10px] font-bold tracking-widest uppercase text-primary bg-primary/5 border-l-2 border-primary shadow-none",
                }}
              >
                <l.icon className="w-4 h-4 stroke-[1.5]" /> {l.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border/50">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2 text-[9px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-3 h-3" /> الموقع
            </Link>
          </div>
        </aside>

        {/* Main content area - NO SCROLL */}
        <main className="flex-1 h-full overflow-hidden relative p-6 lg:p-8 bg-surface/5">
          <div className="h-full max-w-[1600px] mx-auto overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
