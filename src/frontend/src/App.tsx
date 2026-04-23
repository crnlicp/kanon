import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Toaster } from "sonner";
import i18n from "@/lib/i18n";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAppStore } from "@/store";

// Lazy-loaded pages
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const TopicsPage = lazy(() => import("@/pages/TopicsPage"));
const TopicHomePage = lazy(() => import("@/pages/TopicHomePage"));
const ActivityDetailPage = lazy(() => import("@/pages/ActivityDetailPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminActivities = lazy(() => import("@/pages/admin/AdminActivities"));
const AdminFooterLinks = lazy(() => import("@/pages/admin/AdminFooterLinks"));
const AdminSubmissions = lazy(() => import("@/pages/admin/AdminSubmissions"));
const AdminAreas = lazy(() => import("@/pages/admin/AdminAreas"));
const AdminAbout = lazy(() => import("@/pages/admin/AdminAbout"));
const AdminContactSubmissions = lazy(
  () => import("@/pages/admin/AdminContactSubmissions"),
);
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

/** Syncs the :lang URL param → i18n locale + store direction */
function LangSync() {
  const { lang } = useParams<{ lang?: string }>();
  const { setLang } = useAppStore();

  useEffect(() => {
    if (!lang) return;
    const locale = lang === "fa" ? "fa" : "sv";
    const dir: "rtl" | "ltr" = locale === "fa" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = locale === "fa" ? "fa-IR" : "sv-SE";
    if (locale === "fa") {
      document.documentElement.classList.add("font-persian");
    } else {
      document.documentElement.classList.remove("font-persian");
    }
    i18n.changeLanguage(locale);
    setLang(locale);
  }, [lang]);

  return null;
}

export default function App() {
  const currentLang = useAppStore((s) => s.currentLang);
  const currentDir = useAppStore((s) => s.currentDir);

  useEffect(() => {
    document.documentElement.dir = currentDir;
    if (currentLang === "fa") {
      document.documentElement.classList.add("font-persian");
    } else {
      document.documentElement.classList.remove("font-persian");
    }
  }, [currentLang, currentDir]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/:lang/topics"
              element={
                <>
                  <LangSync />
                  <TopicsPage />
                </>
              }
            />
            <Route
              path="/:lang/about"
              element={
                <>
                  <LangSync />
                  <AboutPage />
                </>
              }
            />
            <Route
              path="/:lang/contact"
              element={
                <>
                  <LangSync />
                  <ContactPage />
                </>
              }
            />
            <Route
              path="/:lang/:topic"
              element={
                <>
                  <LangSync />
                  <TopicHomePage />
                </>
              }
            />
            <Route
              path="/:lang/:topic/:slug"
              element={
                <>
                  <LangSync />
                  <ActivityDetailPage />
                </>
              }
            />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="activities" element={<AdminActivities />} />
              <Route path="footer-links" element={<AdminFooterLinks />} />
              <Route path="submissions" element={<AdminSubmissions />} />
              <Route path="areas" element={<AdminAreas />} />
              <Route path="about" element={<AdminAbout />} />
              <Route
                path="contact-submissions"
                element={<AdminContactSubmissions />}
              />
            </Route>

            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: "glass border border-white/10 text-foreground font-body",
              title: "font-body font-medium",
              description: "font-body text-muted-foreground",
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
