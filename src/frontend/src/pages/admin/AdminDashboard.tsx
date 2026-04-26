import { GlassCard } from "@/components/GlassCard";
import {
  getActivities,
  getFooterLinks,
  getRegistrationSubmissions,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, FileText, LayoutGrid, Link2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const STAT_CARDS = [
  {
    key: "admin.activities",
    icon: Zap,
    path: "/admin/activities",
    color: "text-primary",
  },
  {
    key: "admin.areas",
    icon: LayoutGrid,
    path: "/admin/areas",
    color: "text-secondary",
  },
  {
    key: "admin.footerLinks",
    icon: Link2,
    path: "/admin/footer-links",
    color: "text-accent",
  },
  {
    key: "admin.submissions",
    icon: FileText,
    path: "/admin/submissions",
    color: "text-primary",
  },
];

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { data: activities = [] } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities(),
  });
  const { data: footerLinks = [] } = useQuery({
    queryKey: ["footerLinks"],
    queryFn: getFooterLinks,
  });
  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getRegistrationSubmissions,
    refetchInterval: 10_000,
  });

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("admin.dashboard")}
            </h1>
            <p className="text-muted-foreground text-sm font-body">
              {t("admin.dashboard")}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <GlassCard className="p-5" data-ocid="admin.stats_activities_card">
            <div className="text-3xl font-display font-black text-foreground mb-1">
              {activities.length}
            </div>
            <div className="text-muted-foreground text-sm font-body">
              {t("admin.totalActivities")}
            </div>
          </GlassCard>
          <GlassCard className="p-5" data-ocid="admin.stats_submissions_card">
            <div className="text-3xl font-display font-black text-foreground mb-1">
              {submissions.length}
            </div>
            <div className="text-muted-foreground text-sm font-body">
              {t("admin.totalSubmissions")}
            </div>
          </GlassCard>
          <GlassCard className="p-5" data-ocid="admin.stats_links_card">
            <div className="text-3xl font-display font-black text-foreground mb-1">
              {footerLinks.length}
            </div>
            <div className="text-muted-foreground text-sm font-body">
              {t("admin.footerLinks")}
            </div>
          </GlassCard>
        </div>

        {/* Quick links */}
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          {t("common.quickAccess")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAT_CARDS.map(({ key, icon: Icon, path, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.08 }}
            >
              <Link
                to={path}
                data-ocid={`admin.quicklink_${key.split(".")[1]}`}
              >
                <GlassCard hoverable className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className="font-body font-medium text-foreground text-sm">
                    {t(key)}
                  </span>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
