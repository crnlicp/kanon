import { n as createLucideIcon, c as useTranslation, j as jsxRuntimeExports, m as motion, C as ChartColumn, Z as Zap, y as LayoutGrid, z as Link2, w as Link, k as getActivities, v as getFooterLinks, D as getRegistrationSubmissions } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode);
const STAT_CARDS = [
  {
    key: "admin.activities",
    icon: Zap,
    path: "/admin/activities",
    color: "text-primary"
  },
  {
    key: "admin.areas",
    icon: LayoutGrid,
    path: "/admin/areas",
    color: "text-secondary"
  },
  {
    key: "admin.footerLinks",
    icon: Link2,
    path: "/admin/footer-links",
    color: "text-accent"
  },
  {
    key: "admin.submissions",
    icon: FileText,
    path: "/admin/submissions",
    color: "text-primary"
  }
];
function AdminDashboard() {
  const { t } = useTranslation();
  const { data: activities = [] } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities()
  });
  const { data: footerLinks = [] } = useQuery({
    queryKey: ["footerLinks"],
    queryFn: getFooterLinks
  });
  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getRegistrationSubmissions,
    refetchInterval: 1e4
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("admin.dashboard") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: t("admin.dashboard") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", "data-ocid": "admin.stats_activities_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-black text-foreground mb-1", children: activities.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm font-body", children: t("admin.totalActivities") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", "data-ocid": "admin.stats_submissions_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-black text-foreground mb-1", children: submissions.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm font-body", children: t("admin.totalSubmissions") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", "data-ocid": "admin.stats_links_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-black text-foreground mb-1", children: footerLinks.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm font-body", children: t("admin.footerLinks") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "Quick Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: STAT_CARDS.map(({ key, icon: Icon, path, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.05 + i * 0.08 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: path,
                "data-ocid": `admin.quicklink_${key.split(".")[1]}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { hoverable: true, className: "p-5 flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${color}` }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body font-medium text-foreground text-sm", children: t(key) })
                ] })
              }
            )
          },
          key
        )) })
      ]
    }
  ) });
}
export {
  AdminDashboard as default
};
