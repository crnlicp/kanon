import { n as createLucideIcon, c as useTranslation, u as useNavigate, d as useParams, a as useAppStore, j as jsxRuntimeExports, L as LoadingSpinner, m as motion, f as cn, U as Users, o as ue, s as submitRegistration, p as getActivityBySlug } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { L as Layout } from "./Layout-CeS7TdHj.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import { u as useForm } from "./index.esm-B6NVg_DB.js";
import { C as Calendar } from "./calendar-QfFCSKd9.js";
import { M as MapPin } from "./map-pin-Drb8riKi.js";
import "./phone-Dg17pFKq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function ActivityDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang, topic, slug } = useParams();
  const { currentLang } = useAppStore();
  const activeLang = lang ?? currentLang;
  const activeTopic = topic ?? "cultural";
  const { data: activity, isLoading } = useQuery({
    queryKey: ["activity", slug],
    queryFn: () => getActivityBySlug(slug ?? ""),
    enabled: !!slug
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const mutation = useMutation({
    mutationFn: (data) => submitRegistration({
      activityId: (activity == null ? void 0 : activity.id) ?? "",
      activityTitle: (activity == null ? void 0 : activity.title) ?? {},
      ...data
    }),
    onSuccess: () => {
      ue.success(t("form.registrationSuccess"));
      reset();
    },
    onError: () => {
      ue.error(t("form.registrationError"));
    }
  });
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  if (!activity)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: t("common.noResults") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate(-1),
          className: "mt-4 text-primary hover:underline font-body text-sm",
          "data-ocid": "activity.back_button",
          children: t("common.back")
        }
      )
    ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 md:px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        onClick: () => navigate(`/${activeLang}/${activeTopic}`),
        className: "flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-6 transition-smooth",
        whileHover: { x: activeLang === "fa" ? 4 : -4 },
        "data-ocid": "activity.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArrowLeft,
            {
              className: cn("w-4 h-4", activeLang === "fa" && "rotate-180")
            }
          ),
          t("common.back")
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "aspect-video rounded-2xl overflow-hidden mb-8 glass",
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: activity.imageUrl,
            alt: activity.title[activeLang],
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.currentTarget.src = "/assets/images/placeholder.svg";
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "lg:col-span-2",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2, duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-black text-foreground mb-4", children: activity.title[activeLang] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-body text-muted-foreground border border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary" }),
                activity.date
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-body text-muted-foreground border border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary" }),
                activity.location[activeLang]
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-body text-muted-foreground border border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-primary" }),
                activity.capacity
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body leading-relaxed text-base", children: activity.description[activeLang] })
          ]
        }
      ),
      activity.hasRegistrationForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.3, duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6", "data-ocid": "activity.registration_form", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-4", children: t("common.register") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit((data) => mutation.mutate(data)),
                className: "flex flex-col gap-4",
                children: [
                  [
                    {
                      name: "fullName",
                      label: "form.fullName",
                      placeholder: "form.fullNamePlaceholder",
                      required: true
                    },
                    {
                      name: "email",
                      label: "form.email",
                      placeholder: "form.emailPlaceholder",
                      required: true,
                      type: "email"
                    },
                    {
                      name: "phone",
                      label: "form.phone",
                      placeholder: "form.phonePlaceholder",
                      required: false
                    }
                  ].map(({ name, label, placeholder, required, type }) => {
                    var _a;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: `field-${name}`,
                          className: "text-sm font-body font-medium text-foreground block mb-1",
                          children: t(label)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: `field-${name}`,
                          type: type ?? "text",
                          placeholder: t(placeholder),
                          ...register(name, {
                            required: required ? t("form.requiredField") : false,
                            ...type === "email" && {
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t("form.invalidEmail")
                              }
                            }
                          }),
                          className: "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-smooth bg-transparent",
                          "data-ocid": `activity.${name}_input`
                        }
                      ),
                      errors[name] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-destructive text-xs font-body mt-1",
                          "data-ocid": `activity.${name}_field_error`,
                          children: (_a = errors[name]) == null ? void 0 : _a.message
                        }
                      )
                    ] }, name);
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "field-message",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: t("form.message")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "field-message",
                        placeholder: t("form.messagePlaceholder"),
                        rows: 3,
                        ...register("message"),
                        className: "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-smooth bg-transparent resize-none",
                        "data-ocid": "activity.message_textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "submit",
                      disabled: mutation.isPending,
                      className: "w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
                      whileHover: { scale: 1.01 },
                      whileTap: { scale: 0.98 },
                      "data-ocid": "activity.submit_button",
                      children: mutation.isPending ? t("common.loading") : t("form.submitRegistration")
                    }
                  )
                ]
              }
            )
          ] })
        }
      )
    ] })
  ] }) });
}
export {
  ActivityDetailPage as default
};
