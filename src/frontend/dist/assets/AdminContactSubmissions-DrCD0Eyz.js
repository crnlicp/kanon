import { n as createLucideIcon, a as useAppStore, E as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, U as Users, A as AnimatePresence, o as ue, ad as deleteContactSubmission, M as Mail, ae as getContactSubmissions } from "./index-BsZ-DJdz.js";
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
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode);
function getLabels(lang) {
  if (lang === "fa") {
    return {
      title: "پیام‌های تماس",
      name: "نام",
      email: "ایمیل",
      phone: "تلفن",
      message: "پیام",
      date: "تاریخ",
      actions: "عملیات",
      empty: "هیچ پیامی یافت نشد",
      emptyDesc: "هنوز هیچ پیام تماسی ارسال نشده است",
      deleteConfirm: "حذف شد",
      error: "خطایی رخ داد",
      loading: "در حال بارگذاری...",
      count: (n) => `${n} پیام`
    };
  }
  return {
    title: "Kontaktförfrågningar",
    name: "Namn",
    email: "E-post",
    phone: "Telefon",
    message: "Meddelande",
    date: "Datum",
    actions: "Åtgärder",
    empty: "Inga meddelanden hittades",
    emptyDesc: "Inga kontaktmeddelanden har inkommit ännu",
    deleteConfirm: "Borttaget",
    error: "Något gick fel",
    loading: "Laddar...",
    count: (n) => `${n} st`
  };
}
function SubmissionCard({
  sub,
  index,
  lang,
  onDelete,
  isDeleting
}) {
  const isRtl = lang === "fa";
  const formattedDate = sub.timestamp ? new Date(sub.timestamp).toLocaleDateString(isRtl ? "fa-IR" : "sv-SE") : "-";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { delay: index * 0.05, duration: 0.3 },
      "data-ocid": `contact_submissions.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display font-bold text-sm", children: sub.name.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body font-semibold text-foreground truncate", children: sub.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground font-body mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
                sub.email
              ] }),
              sub.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                sub.phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                formattedDate
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 text-xs text-foreground/70 font-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3 flex-shrink-0 mt-0.5 text-primary/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 leading-relaxed", children: sub.message })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-3 pt-3 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            onClick: onDelete,
            disabled: isDeleting,
            whileHover: { scale: 1.04 },
            whileTap: { scale: 0.96 },
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body border transition-all duration-200 border-white/10 glass text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 disabled:opacity-50",
            "data-ocid": `contact_submissions.delete_button.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
              isRtl ? "حذف" : "Ta bort"
            ]
          }
        ) })
      ] })
    }
  );
}
function SubmissionRow({
  sub,
  index,
  lang,
  onDelete,
  isDeleting
}) {
  const isRtl = lang === "fa";
  const formattedDate = sub.timestamp ? new Date(sub.timestamp).toLocaleDateString(isRtl ? "fa-IR" : "sv-SE") : "-";
  const messagePreview = sub.message.length > 80 ? `${sub.message.slice(0, 80)}…` : sub.message;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { delay: index * 0.04 },
      className: "border-b border-white/5 hover:bg-white/[0.03] transition-colors duration-150",
      "data-ocid": `contact_submissions.row.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full glass border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-bold", children: sub.name.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", title: sub.name, children: sub.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[140px]", title: sub.email, children: sub.email }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-muted-foreground", children: sub.phone || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-muted-foreground max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block", title: sub.message, children: messagePreview }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-body text-muted-foreground whitespace-nowrap", children: formattedDate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: onDelete,
            disabled: isDeleting,
            whileHover: { scale: 1.08 },
            whileTap: { scale: 0.94 },
            title: isRtl ? "حذف" : "Ta bort",
            className: "w-7 h-7 rounded-lg flex items-center justify-center glass border border-white/10 text-muted-foreground hover:text-rose-300 hover:border-rose-400/30 transition-all duration-200 disabled:opacity-40",
            "data-ocid": `contact_submissions.delete_button.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
          }
        ) })
      ]
    }
  );
}
function AdminContactSubmissions() {
  const { adminAuth, adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";
  const labels = getLabels(adminLang);
  const [deletingIds, setDeletingIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const {
    data: submissions = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: getContactSubmissions,
    // Always refetch fresh data when navigating to this page
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 3e4
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteContactSubmission(adminAuth.token ?? "", id),
    onMutate: ({ id }) => setDeletingIds((prev) => new Set(prev).add(id)),
    onSettled: (_, __, { id }) => {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
    onSuccess: () => ue.success(labels.deleteConfirm),
    onError: () => ue.error(labels.error)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "max-w-6xl mx-auto",
      dir: isRtl ? "rtl" : "ltr",
      "data-ocid": "contact_submissions.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: labels.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: isLoading ? "…" : labels.count(submissions.length) })
              ] })
            ] }),
            isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center py-16",
                "data-ocid": "contact_submissions.loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-body text-sm", children: labels.loading })
                ] })
              }
            ),
            isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-12",
                "data-ocid": "contact_submissions.error_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8 max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-body font-semibold mb-1", children: labels.error }) })
              }
            ),
            !isLoading && !isError && submissions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-16",
                "data-ocid": "contact_submissions.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-10 max-w-sm mx-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body font-semibold mb-1", children: labels.empty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: labels.emptyDesc })
                ] })
              }
            ),
            !isLoading && !isError && submissions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "table",
                {
                  className: "w-full text-left",
                  dir: isRtl ? "rtl" : "ltr",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/10 bg-white/[0.03]", children: [
                      labels.name,
                      labels.email,
                      labels.phone,
                      labels.message,
                      labels.date,
                      labels.actions
                    ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "th",
                      {
                        className: "px-4 py-3 text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap",
                        children: col
                      },
                      col
                    )) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: submissions.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SubmissionRow,
                      {
                        sub,
                        index: i,
                        lang: adminLang,
                        isDeleting: deletingIds.has(sub.id),
                        onDelete: () => deleteMutation.mutate({ id: sub.id })
                      },
                      sub.id
                    )) }) })
                  ]
                }
              ) }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: submissions.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SubmissionCard,
                {
                  sub,
                  index: i,
                  lang: adminLang,
                  isDeleting: deletingIds.has(sub.id),
                  onDelete: () => deleteMutation.mutate({ id: sub.id })
                },
                sub.id
              )) }) })
            ] })
          ]
        }
      )
    }
  );
}
export {
  AdminContactSubmissions as default
};
