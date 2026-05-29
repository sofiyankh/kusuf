import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { Component, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { NotificationsProvider } from "@/lib/notifications-context";
import { Toaster } from "@/components/ui/sonner";
import MobileNav from "@/components/site/mobile-nav";
import CartSidebar from "@/components/site/cart-sidebar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ThemeProvider } from "@/hooks/use-theme";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error("App error:", error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4" dir="rtl">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-3xl font-bold">حدث خطأ غير متوقع</h1>
            <p className="text-sm text-muted-foreground">{this.state.error.message}</p>
            <button
              onClick={() => {
                this.setState({ error: null });
                location.reload();
              }}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "خسوف Kusuf — تحرّك في صمت" },
      {
        name: "description",
        content:
          "Kusuf علامة تجارية تونسية لملابس الشارع، تجمع بين الجودة الفاخرة والهوية الحضرية.",
      },
      { property: "og:title", content: "Kusuf — تحرّك في صمت" },
      {
        property: "og:description",
        content:
          "Kusuf علامة تجارية تونسية لملابس الشارع، تجمع بين الجودة الفاخرة والهوية الحضرية.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{
              var t=localStorage.getItem('theme');
              var isD=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);
              document.documentElement.classList.toggle('dark',isD);
              
              var p=localStorage.getItem('Kusuf-dynamic-palette');
              if(p && localStorage.getItem('theme-manual')!=='true'){
                var o=JSON.parse(p);
                for(var k in o)document.documentElement.style.setProperty(k,o[k]);
              }
            }catch(e){}`,
          }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden">
        {/* Mobile Detection Zone Indicator (Debug) - High Visibility - Hidden as requested but kept in DOM */}
        <div className="hidden md:hidden fixed top-1/2 left-0 right-0 h-48 -translate-y-1/2 border-y-2 border-dashed border-primary/40 bg-primary/5 pointer-events-none z-[9999] flex flex-col items-center justify-center gap-4">
          <div className="w-full h-px bg-primary/20" />
          <div className="bg-background/80 backdrop-blur-md px-6 py-2 border border-primary/30 rounded-full">
            <span className="text-[14px] font-bold font-display text-primary uppercase tracking-[0.5em] drop-shadow-sm">
              Theme Sampling Zone
            </span>
          </div>
          <div className="w-full h-px bg-primary/20" />
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useScrollReveal();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
            <CartProvider>
              <Outlet />
              <MobileNav />
              <CartSidebar />
              <Toaster richColors position="top-right" />
            </CartProvider>
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
