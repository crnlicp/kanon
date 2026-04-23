import { getAreas, getSiteSettings } from "@/lib/api";
import i18n from "@/lib/i18n";
import type { Area, Lang } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function areaToSlug(area: Area): string {
  const title = area.titleSv.toLowerCase().trim();
  const known: Record<string, string> = {
    kulturellt: "cultural",
    kultur: "cultural",
    cultural: "cultural",
    utbildning: "educational",
    educational: "educational",
    sport: "sport",
    idrott: "sport",
  };
  if (known[title]) return known[title];
  return title.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function Header() {
  const { currentLang, setLang } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const { data: areas } = useQuery<Area[]>({
    queryKey: ["areas"],
    queryFn: getAreas,
    staleTime: 5 * 60 * 1000,
  });

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
    staleTime: 10 * 60 * 1000,
  });

  // No "CulturHub" fallback — use empty string when settings not loaded
  const siteTitle =
    currentLang === "fa"
      ? (settings?.title?.fa ?? "")
      : (settings?.title?.sv ?? "");

  const handleLangSwitch = (lang: Lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    setMobileOpen(false);

    const pathParts = window.location.pathname.split("/").filter(Boolean);
    if (
      pathParts.length > 0 &&
      (pathParts[0] === "sv" || pathParts[0] === "fa")
    ) {
      pathParts[0] = lang;
      navigate(`/${pathParts.join("/")}`, { replace: true });
    }
  };

  const handleNavClick = (href: string) => {
    navigate(href);
    setMobileOpen(false);
  };

  type NavItem = { label: string; href: string; key: string };

  const areaNavItems: NavItem[] = (areas ?? []).map((area) => ({
    label: currentLang === "fa" ? area.titleFa : area.titleSv,
    href: `/${currentLang}/${areaToSlug(area)}`,
    key: `area-${area.id}`,
  }));

  const staticNavItems: NavItem[] = [
    {
      label: currentLang === "fa" ? "درباره ما" : "Om oss",
      href: `/${currentLang}/about`,
      key: "about",
    },
    {
      label: currentLang === "fa" ? "تماس" : "Kontakt",
      href: `/${currentLang}/contact`,
      key: "contact",
    },
  ];

  const navItems: NavItem[] = [...areaNavItems, ...staticNavItems];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <motion.div
        className="max-w-7xl mx-auto glass rounded-2xl border border-white/10 px-4 md:px-6 py-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Site title */}
          <Link
            to="/"
            className="flex items-center gap-2 min-w-0 flex-shrink"
            data-ocid="header.logo_link"
          >
            <motion.span
              className="font-display text-sm sm:text-base md:text-xl font-black text-foreground tracking-tight truncate max-w-[120px] sm:max-w-[180px] md:max-w-xs"
              whileHover={{ opacity: 0.8 }}
            >
              {siteTitle}
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="header.desktop_nav"
          >
            {navItems.map(({ label, href, key }) => (
              <motion.button
                key={key}
                onClick={() => handleNavClick(href)}
                className="px-3 py-1.5 text-sm font-body text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/10 transition-smooth"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                data-ocid={`header.nav_${key}`}
              >
                {label}
              </motion.button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div
              className="flex items-center glass rounded-full p-1 gap-1 border border-white/10"
              data-ocid="header.lang_switcher"
            >
              {(["sv", "fa"] as Lang[]).map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLangSwitch(lang)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-body font-semibold uppercase transition-smooth",
                    currentLang === lang
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  whileTap={{ scale: 0.95 }}
                  data-ocid={`header.lang_${lang}`}
                >
                  {lang === "fa" ? "فارسی" : "Svenska"}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <motion.button
              className="md:hidden glass w-9 h-9 rounded-lg flex items-center justify-center border border-white/10"
              onClick={() => setMobileOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              data-ocid="header.mobile_menu_button"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="md:hidden mt-3 border-t border-white/10 pt-3 flex flex-col gap-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              data-ocid="header.mobile_nav"
            >
              {navItems.map(({ label, href, key }, i) => (
                <motion.button
                  key={key}
                  onClick={() => handleNavClick(href)}
                  className="px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/10 transition-smooth text-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-ocid={`header.mobile_nav_${key}`}
                >
                  {label}
                </motion.button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
