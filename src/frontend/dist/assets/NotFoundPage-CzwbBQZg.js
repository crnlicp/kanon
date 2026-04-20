import { u as useNavigate, a as useAppStore, j as jsxRuntimeExports, m as motion } from "./index-BsZ-DJdz.js";
function NotFoundPage() {
  const navigate = useNavigate();
  const { currentLang } = useAppStore();
  const isRtl = currentLang === "fa";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center px-4 relative overflow-hidden",
      dir: isRtl ? "rtl" : "ltr",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 glass rounded-3xl border border-white/10 p-10 sm:p-14 max-w-md w-full text-center shadow-elevated",
            initial: { opacity: 0, scale: 0.92, y: 24 },
            animate: { opacity: 1, scale: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "font-display font-black text-[7rem] sm:text-[9rem] leading-none mb-2 select-none",
                  style: {
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  },
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.15, duration: 0.5 },
                  children: "404"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.28, duration: 0.4 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: isRtl ? "صفحه پیدا نشد" : "Sidan hittades inte" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground mb-8", children: isRtl ? "آدرسی که دنبال آن هستید وجود ندارد یا جابجا شده است." : "Sidan du letar efter finns inte eller har flyttats." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  onClick: () => navigate("/"),
                  className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 active:scale-95",
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.4, duration: 0.35 },
                  whileHover: { scale: 1.03 },
                  whileTap: { scale: 0.97 },
                  "data-ocid": "not_found.home_button",
                  children: isRtl ? "بازگشت به صفحه اصلی" : "Gå till startsidan"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  NotFoundPage as default
};
