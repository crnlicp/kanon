import { n as createLucideIcon, c as useTranslation, a as useAppStore, E as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, z as Link2, A as AnimatePresence, o as ue, Y as deleteFooterLink, _ as addFooterLink, $ as updateFooterLink, X, v as getFooterLinks } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import { u as useForm } from "./index.esm-B6NVg_DB.js";
import { P as Plus } from "./plus-CIx_DEb8.js";
import { T as Trash2 } from "./trash-2-BXCUySkP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
function LinkModal({ link, onClose, onSave, nextOrder }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const adminLang = useAppStore((s) => s.adminLang);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: link ? {
      labelSv: link.label.sv,
      labelFa: link.label.fa,
      url: link.url,
      category: link.category.sv,
      order: link.order
    } : {
      labelSv: "",
      labelFa: "",
      url: "",
      category: "main",
      order: nextOrder
    }
  });
  reactExports.useEffect(() => {
    if (link) {
      reset({
        labelSv: link.label.sv,
        labelFa: link.label.fa,
        url: link.url,
        category: link.category.sv,
        order: link.order
      });
    }
  }, [link, reset]);
  const addMutation = useMutation({
    mutationFn: addFooterLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footerLinks"] });
      ue.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => ue.error(t("common.error"))
  });
  const updateMutation = useMutation({
    mutationFn: updateFooterLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footerLinks"] });
      ue.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => ue.error(t("common.error"))
  });
  const isSaving = addMutation.isPending || updateMutation.isPending;
  const onSubmit = (data) => {
    if (link) {
      updateMutation.mutate({
        id: link.id,
        labelSv: data.labelSv,
        labelFa: data.labelFa,
        url: data.url,
        category: data.category,
        order: Number(data.order)
      });
    } else {
      addMutation.mutate({
        labelSv: data.labelSv,
        labelFa: data.labelFa,
        url: data.url,
        category: data.category,
        order: Number(data.order)
      });
    }
  };
  const inputClass = "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50";
  const labelClass = "text-sm font-body font-medium text-foreground block mb-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "footer_links.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-md glass rounded-2xl border border-white/10 p-6",
            initial: { opacity: 0, scale: 0.95, y: 16 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 16 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground", children: [
                  link ? t("common.edit") : t("common.add"),
                  " Link"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "text-muted-foreground hover:text-foreground transition-smooth",
                    "data-ocid": "footer_links.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "fl-label-sv", className: labelClass, children: "Label (SV)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "fl-label-sv",
                        ...register("labelSv", { required: "Required" }),
                        placeholder: "Om oss",
                        className: inputClass,
                        "data-ocid": "footer_links.label_sv_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "fl-label-fa", className: labelClass, children: "Label (FA)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "fl-label-fa",
                        ...register("labelFa", { required: "Required" }),
                        dir: "rtl",
                        placeholder: "درباره ما",
                        className: inputClass,
                        "data-ocid": "footer_links.label_fa_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "fl-url", className: labelClass, children: "URL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "fl-url",
                      ...register("url", { required: "Required" }),
                      placeholder: "/about or https://...",
                      className: inputClass,
                      "data-ocid": "footer_links.url_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "fl-category", className: labelClass, children: adminLang === "fa" ? "دسته‌بندی" : "Category" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        id: "fl-category",
                        ...register("category"),
                        className: inputClass,
                        "data-ocid": "footer_links.category_select",
                        children: ["main", "social", "legal", "contact"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "fl-order", className: labelClass, children: "Order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "fl-order",
                        type: "number",
                        ...register("order", { required: true, min: 1 }),
                        className: inputClass,
                        "data-ocid": "footer_links.order_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "submit",
                      disabled: isSaving,
                      className: "flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                      whileHover: { scale: isSaving ? 1 : 1.01 },
                      whileTap: { scale: isSaving ? 1 : 0.98 },
                      "data-ocid": "footer_links.save_button",
                      children: isSaving ? t("common.loading") : t("common.save")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth",
                      "data-ocid": "footer_links.cancel_button",
                      children: t("common.cancel")
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function AdminFooterLinks() {
  const { t } = useTranslation();
  const adminLang = useAppStore((s) => s.adminLang);
  const queryClient = useQueryClient();
  const [editTarget, setEditTarget] = reactExports.useState(
    void 0
  );
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: links = [], isLoading } = useQuery({
    queryKey: ["footerLinks"],
    queryFn: getFooterLinks,
    staleTime: 0,
    refetchOnMount: "always"
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFooterLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footerLinks"] });
      setDeleteTarget(null);
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const nextOrder = links.length > 0 ? Math.max(...links.map((l) => l.order)) + 1 : 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("admin.footerLinks") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                className: "flex items-center gap-2 glass px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth",
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.97 },
                onClick: () => setEditTarget(null),
                "data-ocid": "footer_links.add_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  t("common.add")
                ]
              }
            )
          ] }),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass rounded-xl border border-white/10 h-16 animate-pulse",
              "data-ocid": `footer_links.loading_state.${i}`
            },
            i
          )) }),
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            links.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: i * 0.06 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    className: "p-4 flex items-center gap-4",
                    "data-ocid": `footer_links.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-4 h-4 text-muted-foreground/40 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-body font-semibold text-foreground text-sm truncate", children: adminLang === "fa" ? link.label.fa : link.label.sv }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-xs font-body flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass px-1.5 py-0.5 rounded text-[10px] border border-white/10", children: link.category.sv }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: link.url })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "glass py-1.5 px-3 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground border border-white/10 transition-smooth",
                            onClick: () => setEditTarget(link),
                            "data-ocid": `footer_links.edit_button.${i + 1}`,
                            children: t("common.edit")
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "text-muted-foreground hover:text-destructive transition-smooth",
                            onClick: () => setDeleteTarget(link),
                            "aria-label": "Delete link",
                            "data-ocid": `footer_links.delete_button.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    ]
                  }
                )
              },
              link.id
            )),
            links.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-12 text-muted-foreground font-body",
                "data-ocid": "footer_links.empty_state",
                children: t("common.noResults")
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: editTarget !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LinkModal,
      {
        link: editTarget,
        nextOrder,
        onClose: () => setEditTarget(void 0),
        onSave: () => setEditTarget(void 0)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        "data-ocid": "footer_links.delete_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              onClick: () => setDeleteTarget(null)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative z-10 glass rounded-2xl border border-white/10 p-6 max-w-sm w-full",
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-bold text-foreground mb-2", children: [
                  t("common.delete"),
                  " Link?"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body mb-5", children: [
                  '"',
                  adminLang === "fa" ? deleteTarget.label.fa : deleteTarget.label.sv,
                  '" ',
                  t("common.deleteConfirm") ?? "will be permanently removed."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      disabled: deleteMutation.isPending,
                      onClick: () => deleteMutation.mutate(deleteTarget.id),
                      className: "flex-1 py-2 rounded-xl bg-destructive text-destructive-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                      "data-ocid": "footer_links.confirm_button",
                      children: deleteMutation.isPending ? t("common.loading") : t("common.delete")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeleteTarget(null),
                      className: "px-4 py-2 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth",
                      "data-ocid": "footer_links.cancel_button",
                      children: t("common.cancel")
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  AdminFooterLinks as default
};
