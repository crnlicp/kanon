import { c as useTranslation, d as useParams, a as useAppStore, j as jsxRuntimeExports, m as motion, q as getAbout } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { L as Layout } from "./Layout-CeS7TdHj.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import "./map-pin-Drb8riKi.js";
import "./phone-Dg17pFKq.js";
function AboutPage() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const { currentLang } = useAppStore();
  const activeLang = lang ?? currentLang;
  const isRtl = activeLang === "fa";
  const {
    data: about,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
    // Always refetch fresh data — about content may change in admin
    staleTime: 0,
    refetchOnMount: "always"
  });
  const content = isRtl ? (about == null ? void 0 : about.contentFa) || (about == null ? void 0 : about.contentSv) || "" : (about == null ? void 0 : about.contentSv) || (about == null ? void 0 : about.contentFa) || "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20",
      dir: isRtl ? "rtl" : "ltr",
      "data-ocid": "about.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-12",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: "🏛️" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight", children: t("about.title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg max-w-xl mx-auto", children: t("about.subtitle") })
            ]
          }
        ),
        (about == null ? void 0 : about.imagePath) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-elevated",
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.15, duration: 0.5 },
            "data-ocid": "about.hero_image",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: about.imagePath,
                alt: t("about.title"),
                className: "w-full h-64 md:h-96 object-cover",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.5 },
            children: [
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8", "data-ocid": "about.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 animate-pulse", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-4 bg-white/5 rounded ${i === 5 ? "w-2/3" : "w-full"}`
                },
                i
              )) }) }),
              isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlassCard,
                {
                  className: "p-8 border-destructive/20 text-center",
                  "data-ocid": "about.error_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-body", children: t("common.error") })
                }
              ),
              !isLoading && !isError && content ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8 md:p-10", "data-ocid": "about.content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-body text-foreground/90 leading-relaxed text-base md:text-lg [&>p]:mb-4 [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:ps-6 [&>li]:mb-2",
                  dangerouslySetInnerHTML: { __html: content }
                }
              ) }) : null,
              !isLoading && !isError && !content && /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlassCard,
                {
                  className: "p-8 text-center",
                  "data-ocid": "about.empty_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: t("about.noContent") })
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}
export {
  AboutPage as default
};
