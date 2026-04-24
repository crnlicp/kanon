import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  LayoutGrid,
  Link2,
  LogOut,
  Mail,
  Menu,
  Settings,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AdminLogin } from "./AdminLogin";

const NAV_ITEMS = [
  {
    key: "admin.dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    key: "admin.activities",
    path: "/admin/activities",
    icon: Zap,
    exact: false,
  },
  {
    key: "admin.footerLinks",
    path: "/admin/footer-links",
    icon: Link2,
    exact: false,
  },
  {
    key: "admin.submissions",
    path: "/admin/submissions",
    icon: Users,
    exact: false,
  },
  {
    key: "admin.areas",
    path: "/admin/areas",
    icon: LayoutGrid,
    exact: false,
  },
  {
    key: "admin.about",
    path: "/admin/about",
    icon: BookOpen,
    exact: false,
  },
  {
    key: "admin.contactSubmissions",
    path: "/admin/contact-submissions",
    icon: Mail,
    exact: false,
  },
  {
    key: "admin.settings",
    path: "/admin/settings",
    icon: Settings,
    exact: false,
  },
];

// ── Animated waving SVG flags ──────────────────────────────────────────────

function SwedishFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="14" fill="#006AA7" rx="1" />
      {/* Horizontal bar */}
      <rect x="0" y="5.5" width="20" height="3" fill="#FECC02" />
      {/* Vertical bar */}
      <rect x="6" y="0" width="3" height="14" fill="#FECC02" />

      {/* Wave animation overlay */}
      <defs>
        <linearGradient id="sv-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-1 0"
            to="1 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <rect width="20" height="14" fill="url(#sv-wave)" rx="1" />
    </svg>
  );
}

function PersianFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Green stripe */}
      <rect width="20" height="4.67" fill="#239F40" rx="1" />
      {/* White stripe */}
      <rect y="4.67" width="20" height="4.66" fill="#FFFFFF" />
      {/* Red stripe */}
      <rect y="9.33" width="20" height="4.67" fill="#DA0000" rx="1" />

      {/* Wave animation overlay */}
      <defs>
        <linearGradient id="fa-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-1 0"
            to="1 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <rect width="20" height="14" fill="url(#fa-wave)" rx="1" />
    </svg>
  );
}

// ── Lang Toggle ───────────────────────────────────────────────────────────

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { adminLang, setAdminLang } = useAppStore();
  const { i18n } = useTranslation();

  const switchTo = (lang: "fa" | "sv") => {
    setAdminLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <motion.div
      className={cn(
        "flex items-center glass border border-white/10 rounded-full p-0.5 gap-0.5",
        compact ? "text-xs" : "text-xs",
      )}
      data-ocid="admin.lang_toggle"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Persian */}
      <motion.button
        type="button"
        onClick={() => switchTo("fa")}
        data-ocid="admin.lang_fa_button"
        aria-label="t("admin.switchToPersian")"
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body font-medium transition-smooth",
          adminLang === "fa"
            ? "bg-primary/30 text-foreground border border-primary/30 shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PersianFlag className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0" />
        <span>FA</span>
      </motion.button>

      {/* Swedish */}
      <motion.button
        type="button"
        onClick={() => switchTo("sv")}
        data-ocid="admin.lang_sv_button"
        aria-label="t("admin.switchToSwedish")"
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body font-medium transition-smooth",
          adminLang === "sv"
            ? "bg-primary/30 text-foreground border border-primary/30 shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SwedishFlag className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0" />
        <span>SV</span>
      </motion.button>
    </motion.div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────

function Sidebar({
  mobile,
  onClose,
}: { mobile?: boolean; onClose?: () => void }) {
  const { t } = useTranslation();
  const { clearAdminAuth } = useAppStore();
  const location = useLocation();

  const isActive = (path: string, exact: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className={cn("flex flex-col h-full", mobile ? "p-4" : "p-3")}>
      {/* Logo */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-sm font-bold text-foreground">
            Admin
          </span>
        </div>
        {mobile && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="t("admin.closeMenu")"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ key, path, icon: Icon, exact }) => {
          const active = isActive(path, exact);
          return (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              data-ocid={`admin.nav_${key.split(".")[1]}_link`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-smooth",
                active
                  ? "bg-primary/20 text-foreground border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  active ? "text-primary" : "",
                )}
              />
              {t(key)}
              {active && (
                <motion.div
                  className="ms-auto w-1.5 h-1.5 rounded-full bg-primary"
                  layoutId="admin-nav-indicator"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={clearAdminAuth}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth mt-2"
        data-ocid="admin.logout_button"
      >
        <LogOut className="w-4 h-4" />
        {t("admin.logout")}
      </button>
    </div>
  );
}

// ── AdminLayout ───────────────────────────────────────────────────────────

export function AdminLayout() {
  const { adminAuth, adminLang } = useAppStore();
  const { t, i18n } = useTranslation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sync i18n to admin language independently of public site
  useEffect(() => {
    i18n.changeLanguage(adminLang);
  }, [adminLang, i18n]);

  const adminDir = adminLang === "fa" ? "rtl" : "ltr";

  if (!adminAuth.isLoggedIn) {
    return <AdminLogin />;
  }

  return (
    <div
      className={`min-h-screen bg-background flex${adminLang === "fa" ? " font-persian" : ""}`}
      dir={adminDir}
      lang={adminLang === "fa" ? "fa-IR" : "sv-SE"}
    >
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 glass-dark border-e border-white/10 min-h-screen">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              className={cn(
                "fixed top-0 bottom-0 w-64 glass-dark border-e border-white/10 z-50 lg:hidden",
                adminDir === "rtl" ? "right-0" : "left-0",
              )}
              initial={{ x: adminDir === "rtl" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: adminDir === "rtl" ? "100%" : "-100%" }}
              transition={{
                type: "tween",
                duration: 0.25,
                ease: [0.32, 0.72, 0, 1],
              }}
              data-ocid="admin.mobile_sidebar"
            >
              <Sidebar mobile onClose={() => setMobileSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="glass-dark border-b border-white/10 px-4 md:px-6 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            type="button"
            className="lg:hidden glass w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="t("admin.openSidebar")"
            data-ocid="admin.mobile_menu_button"
          >
            <Menu className="w-4 h-4" />
          </button>
          <h1 className="font-display text-base font-semibold text-foreground">
            {t("admin.title")}
          </h1>
          <div className="ms-auto flex items-center gap-2">
            <LangToggle />
            <div className="glass px-3 py-1 rounded-full border border-white/10 text-xs font-body text-muted-foreground">
              Admin
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
