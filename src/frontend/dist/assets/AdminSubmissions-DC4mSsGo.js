import { n as createLucideIcon, a as useAppStore, E as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, U as Users, A as AnimatePresence, a0 as updateSubmissionStatus, a1 as deleteSubmission, i as instance, M as Mail, D as getRegistrationSubmissions, W as getAllActivitiesAdmin } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import { U as User } from "./user-Cb3tSc_S.js";
import { T as Trash2 } from "./trash-2-BXCUySkP.js";
import { P as Phone } from "./phone-Dg17pFKq.js";
import { C as Calendar } from "./calendar-QfFCSKd9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const STATUS_CFG = {
  Pending: {
    labelSv: "Väntande",
    labelFa: "در انتظار",
    icon: Clock,
    className: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    pillClass: "border-yellow-400/40 bg-yellow-400/15 text-yellow-300 hover:bg-yellow-400/25"
  },
  Approved: {
    labelSv: "Godkänd",
    labelFa: "تأیید شده",
    icon: CircleCheckBig,
    className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    pillClass: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/25"
  },
  Rejected: {
    labelSv: "Avvisad",
    labelFa: "رد شده",
    icon: CircleX,
    className: "text-rose-400 border-rose-400/30 bg-rose-400/10",
    pillClass: "border-rose-400/40 bg-rose-400/15 text-rose-300 hover:bg-rose-400/25"
  }
};
function statusLabel(key, lang) {
  return lang === "fa" ? STATUS_CFG[key].labelFa : STATUS_CFG[key].labelSv;
}
function getAdminT(lang) {
  const resources = instance.getResourceBundle(lang, "translation");
  return (path) => {
    const parts = path.split(".");
    let cur = resources;
    for (const p of parts) cur = cur == null ? void 0 : cur[p];
    return typeof cur === "string" ? cur : path;
  };
}
function StatusBadge({ status, lang }) {
  const cfg = STATUS_CFG[status];
  const Icon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-body border ${cfg.className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
        statusLabel(status, lang)
      ]
    }
  );
}
function FilterPill({
  active,
  onClick,
  children,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: `px-3.5 py-1.5 rounded-full text-sm font-body border transition-all duration-200 ${active ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_12px_rgba(99,102,241,0.2)]" : "glass border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"}`,
      children
    }
  );
}
function SubmissionCard({
  sub,
  index,
  activityMap,
  lang,
  onApprove,
  onReject,
  onDelete,
  t,
  isPending
}) {
  var _a;
  const activity = activityMap.get(sub.activityId);
  const activityName = activity ? lang === "fa" ? activity.title.fa || activity.title.sv : activity.title.sv || activity.title.fa : sub.activityId;
  const visitorName = lang === "fa" ? sub.nameFa ?? sub.nameSv ?? sub.email : sub.nameSv ?? sub.nameFa ?? sub.email;
  const status = sub.status ?? "Pending";
  const formattedDate = sub.submittedAt ? new Date(
    typeof sub.submittedAt === "number" ? sub.submittedAt : Number(sub.submittedAt)
  ).toLocaleDateString(lang === "fa" ? "fa-IR" : "sv-SE") : "-";
  const initial = ((_a = lang === "fa" ? sub.nameFa : sub.nameSv) == null ? void 0 : _a.charAt(0)) ?? sub.email.charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { delay: index * 0.05, duration: 0.3 },
      "data-ocid": `submissions.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display font-bold text-sm", children: initial }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body font-semibold text-foreground truncate", children: visitorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, lang })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-body mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 flex-shrink-0 text-primary/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80 truncate", children: activityName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
                sub.email
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                sub.phone || "-"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                formattedDate
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex gap-2 mt-3 pt-3 border-t border-white/10 ${lang === "fa" ? "flex-row-reverse justify-end" : "flex-row justify-end"}`,
            children: [
              status !== "Approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: onApprove,
                  disabled: isPending,
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.96 },
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-emerald-400/40 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 disabled:opacity-50",
                  "data-ocid": `submissions.approve_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                    t("admin.submissions_section.approve")
                  ]
                }
              ),
              status !== "Rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: onReject,
                  disabled: isPending,
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.96 },
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-rose-400/40 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20 disabled:opacity-50",
                  "data-ocid": `submissions.reject_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                    t("admin.submissions_section.reject")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: onDelete,
                  disabled: isPending,
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.96 },
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-white/10 glass text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 disabled:opacity-50",
                  "data-ocid": `submissions.delete_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
                    t("admin.submissions_section.delete")
                  ]
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function SubmissionRow({
  sub,
  index,
  activityMap,
  lang,
  onApprove,
  onReject,
  onDelete,
  t,
  isPending
}) {
  const activity = activityMap.get(sub.activityId);
  const activityName = activity ? lang === "fa" ? activity.title.fa || activity.title.sv : activity.title.sv || activity.title.fa : sub.activityId;
  const visitorName = lang === "fa" ? sub.nameFa ?? sub.nameSv ?? sub.email : sub.nameSv ?? sub.nameFa ?? sub.email;
  const status = sub.status ?? "Pending";
  const formattedDate = sub.submittedAt ? new Date(
    typeof sub.submittedAt === "number" ? sub.submittedAt : Number(sub.submittedAt)
  ).toLocaleDateString(lang === "fa" ? "fa-IR" : "sv-SE") : "-";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { delay: index * 0.04 },
      className: "border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-150",
      "data-ocid": `submissions.row.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-foreground/80 max-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", title: activityName, children: activityName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-bold", children: visitorName.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[100px]", title: visitorName, children: visitorName })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[140px]", title: sub.email, children: sub.email }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-muted-foreground", children: sub.phone || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-muted-foreground whitespace-nowrap", children: formattedDate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, lang }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          status !== "Approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: onApprove,
              disabled: isPending,
              whileHover: { scale: 1.08 },
              whileTap: { scale: 0.94 },
              title: t("admin.submissions_section.approve"),
              className: "w-7 h-7 rounded-lg flex items-center justify-center border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 transition-all duration-200 disabled:opacity-40",
              "data-ocid": `submissions.approve_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" })
            }
          ),
          status !== "Rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: onReject,
              disabled: isPending,
              whileHover: { scale: 1.08 },
              whileTap: { scale: 0.94 },
              title: t("admin.submissions_section.reject"),
              className: "w-7 h-7 rounded-lg flex items-center justify-center border border-rose-400/30 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20 transition-all duration-200 disabled:opacity-40",
              "data-ocid": `submissions.reject_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: onDelete,
              disabled: isPending,
              whileHover: { scale: 1.08 },
              whileTap: { scale: 0.94 },
              title: t("admin.submissions_section.delete"),
              className: "w-7 h-7 rounded-lg flex items-center justify-center glass border border-white/10 text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 transition-all duration-200 disabled:opacity-40",
              "data-ocid": `submissions.delete_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] }) })
      ]
    }
  );
}
function AdminSubmissions() {
  const adminLang = useAppStore((s) => s.adminLang);
  const t = getAdminT(adminLang);
  const isRtl = adminLang === "fa";
  const queryClient = useQueryClient();
  const [filter, setFilter] = reactExports.useState("all");
  const [mutatingIds, setMutatingIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const {
    data: submissions = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["submissions"],
    queryFn: getRegistrationSubmissions,
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 3e4
  });
  const { data: activities = [] } = useQuery({
    queryKey: ["activities-admin-all"],
    queryFn: () => getAllActivitiesAdmin(),
    staleTime: 6e4
  });
  const activityMap = new Map(
    activities.map((a) => [a.id, a])
  );
  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status
    }) => updateSubmissionStatus(Number(id), status),
    onMutate: ({ id }) => setMutatingIds((prev) => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setMutatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    }
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteSubmission(Number(id)),
    onMutate: ({ id }) => setMutatingIds((prev) => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setMutatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    }
  });
  const filtered = filter === "all" ? submissions : submissions.filter((s) => (s.status ?? "Pending") === filter);
  const FILTERS = [
    { key: "all", label: "Alla", labelFa: "همه" },
    { key: "Pending", label: "Väntande", labelFa: "در انتظار" },
    { key: "Approved", label: "Godkänd", labelFa: "تأیید شده" },
    { key: "Rejected", label: "Avvisad", labelFa: "رد شده" }
  ];
  const filterLabel = (f) => isRtl ? f.labelFa : f.label;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", dir: isRtl ? "rtl" : "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-3 mb-6 ${isRtl ? "flex-row-reverse" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("admin.submissions_section.title") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: isLoading ? "…" : `${submissions.length} ${isRtl ? "ثبت‌نام" : "st"}` })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex flex-wrap gap-2 mb-6 ${isRtl ? "flex-row-reverse" : ""}`,
            "data-ocid": "submissions.filter.tab",
            children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              FilterPill,
              {
                active: filter === f.key,
                onClick: () => setFilter(f.key),
                ocid: `submissions.filter_${f.key}`,
                children: [
                  filterLabel(f),
                  f.key !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 opacity-60 text-xs", children: [
                    "(",
                    submissions.filter((s) => (s.status ?? "Pending") === f.key).length,
                    ")"
                  ] })
                ]
              },
              f.key
            ))
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center justify-center py-16",
            "data-ocid": "submissions.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-body text-sm", children: t("common.loading") })
            ] })
          }
        ),
        isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-12",
            "data-ocid": "submissions.error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-8 max-w-md mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-rose-400 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body font-semibold mb-1", children: t("common.error") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: isRtl ? "بارگذاری ثبت‌نام‌ها ناموفق بود" : "Det gick inte att hämta anmälningar" })
            ] })
          }
        ),
        !isLoading && !isError && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-16",
            "data-ocid": "submissions.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-10 max-w-sm mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body font-semibold mb-1", children: t("admin.submissions_section.empty") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: isRtl ? "هنوز هیچ ثبت‌نامی دریافت نشده است" : "Inga anmälningar har inkommit ännu" })
            ] })
          }
        ),
        !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-left",
              dir: isRtl ? "rtl" : "ltr",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/10 bg-white/[0.03]", children: [
                  t("admin.submissions_section.activityName"),
                  t("admin.submissions_section.visitorName"),
                  t("admin.submissions_section.email"),
                  t("admin.submissions_section.phone"),
                  t("admin.submissions_section.date"),
                  t("admin.submissions_section.status"),
                  t("admin.submissions_section.actions")
                ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "px-4 py-3 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
                    children: col
                  },
                  col
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SubmissionRow,
                  {
                    sub,
                    index: i,
                    activityMap,
                    lang: adminLang,
                    t,
                    isPending: mutatingIds.has(sub.id),
                    onApprove: () => statusMutation.mutate({
                      id: sub.id,
                      status: "Approved"
                    }),
                    onReject: () => statusMutation.mutate({
                      id: sub.id,
                      status: "Rejected"
                    }),
                    onDelete: () => deleteMutation.mutate({ id: sub.id })
                  },
                  sub.id
                )) }) })
              ]
            }
          ) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SubmissionCard,
            {
              sub,
              index: i,
              activityMap,
              lang: adminLang,
              t,
              isPending: mutatingIds.has(sub.id),
              onApprove: () => statusMutation.mutate({ id: sub.id, status: "Approved" }),
              onReject: () => statusMutation.mutate({ id: sub.id, status: "Rejected" }),
              onDelete: () => deleteMutation.mutate({ id: sub.id })
            },
            sub.id
          )) }) })
        ] })
      ]
    }
  ) });
}
export {
  AdminSubmissions as default
};
