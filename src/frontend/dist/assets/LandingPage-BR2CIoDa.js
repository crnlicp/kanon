import { u as useNavigate, a as useAppStore, j as jsxRuntimeExports, m as motion, i as instance, g as getSiteSettings, b as getBackgrounds } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { P as PageBackground } from "./PageBackground-CwPbtbp1.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
const WAVE_VALUES = `
M0 0Q28 0.2 56 0.6Q84 1.2 112 1.9Q140 2.5 160 2.9Q176 2.8 188 2.4Q196 1.4 200 0L200 200Q196 201.4 188 202.4Q176 202.8 160 202.9Q140 202.5 112 201.9Q84 201.2 56 200.6Q28 200.2 0 200Z;
M0 0Q28 -0.2 56 0Q84 0.5 112 1.2Q140 2 160 2.9Q176 3.5 188 3.8Q196 3.6 200 2.9L200 202.9Q196 203.6 188 203.8Q176 203.5 160 202.9Q140 202 112 201.2Q84 200.5 56 200Q28 199.8 0 200Z;
M0 0Q28 -0.4 56 -0.6Q84 -0.5 112 0Q140 0.8 160 1.8Q176 2.8 188 3.8Q196 4.5 200 4.8L200 204.8Q196 204.5 188 203.8Q176 202.8 160 201.8Q140 200.8 112 200Q84 199.5 56 199.4Q28 199.6 0 200Z;
M0 0Q28 -0.5 56 -1Q84 -1.2 112 -0.8Q140 -0.1 160 1Q176 2.1 188 3.4Q196 4.6 200 5.2L200 205.2Q196 204.6 188 203.4Q176 202.1 160 201Q140 199.9 112 199.2Q84 198.8 56 199Q28 199.5 0 200Z;
M0 0Q28 -0.4 56 -1Q84 -1.5 112 -1.6Q140 -1.1 160 0Q176 1.4 188 2.9Q196 4.2 200 5.2L200 205.2Q196 204.2 188 202.9Q176 201.4 160 200Q140 198.9 112 198.4Q84 198 56 199Q28 199.6 0 200Z;
M0 0Q28 -0.2 56 -0.6Q84 -1.2 112 -1.6Q140 -2 160 -2Q176 -1.8 188 -1.4Q196 -0.5 200 0.5L200 200.5Q196 199.5 188 198.6Q176 198.2 160 198Q140 198 112 198.4Q84 198.8 56 199.4Q28 199.8 0 200Z;
M0 0Q28 0.2 56 0Q84 -0.5 112 -1.2Q140 -2 160 -2.6Q176 -2.8 188 -2.6Q196 -2.1 200 -1.4L200 198.6Q196 197.9 188 197.4Q176 197.2 160 197.4Q140 198 112 198.8Q84 199.5 56 200Q28 200.2 0 200Z;
M0 0Q28 0.4 56 0.6Q84 0.5 112 0Q140 -0.8 160 -1.6Q176 -2.6 188 -3.2Q196 -4 200 -4.5L200 195.5Q196 196 188 196.8Q176 197.4 160 198.4Q140 199.2 112 200Q84 200.5 56 200.6Q28 200.4 0 200Z;
M0 0Q28 0.5 56 1Q84 1.2 112 1.2Q140 0.8 160 0Q176 -0.9 188 -1.6Q196 -2.3 200 -3.2L200 196.8Q196 197.7 188 198.4Q176 199.1 160 200Q140 200.8 112 201.2Q84 201.2 56 201Q28 200.5 0 200Z;
M0 0Q28 0.4 56 1Q84 1.5 112 1.8Q140 2 160 1.8Q176 1.1 188 0Q196 -1.4 200 -2.4L200 197.6Q196 198.6 188 200Q176 201.1 160 201.8Q140 202 112 201.8Q84 201.5 56 201Q28 200.4 0 200Z;
M0 0Q28 0.2 56 0.6Q84 1.2 112 1.9Q140 2.5 160 2.9Q176 2.8 188 2.4Q196 1.4 200 0L200 200Q196 201.4 188 202.4Q176 202.8 160 202.9Q140 202.5 112 201.9Q84 201.2 56 200.6Q28 200.2 0 200Z
`;
const WAVE_INITIAL_D = "M0 0Q28 0.2 56 0.6Q84 1.2 112 1.9Q140 2.5 160 2.9Q176 2.8 188 2.4Q196 1.4 200 0L200 200Q196 201.4 188 202.4Q176 202.8 160 202.9Q140 202.5 112 201.9Q84 201.2 56 200.6Q28 200.2 0 200Z";
const SwedenFlag = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 200 200",
    className: "w-36 h-36 drop-shadow-lg rounded-sm",
    role: "img",
    "aria-label": "Swedish flag",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Swedish flag" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "sv-wave-clip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: WAVE_INITIAL_D, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "animate",
        {
          attributeName: "d",
          dur: "2s",
          repeatCount: "indefinite",
          begin: "0s",
          calcMode: "linear",
          values: WAVE_VALUES
        }
      ) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("g", { clipPath: "url(#sv-wave-clip)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "scale(5.556)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fill: "#006AA7",
            d: "M15.5 31H32c2.209 0 4-1.791 4-4.5v-6H15.5V31z"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#006AA7", d: "M32 5H15.5v10.5H36V9a4 4 0 0 0-4-4z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#006AA7", d: "M10.5 5H4a4 4 0 0 0-4 3.997V15.5h10.5V5z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fill: "#006AA7",
            d: "M0 20.5v6.004C.002 29.211 1.792 31 4 31h6.5V20.5H0z"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            fill: "#FECC00",
            d: "M15.5 5h-5v10.5H0v5h10.5V31h5V20.5H36v-5H15.5z"
          }
        )
      ] }) })
    ]
  }
);
const IranFlag = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 200 200",
    className: "w-36 h-36 drop-shadow-lg rounded-sm",
    role: "img",
    "aria-label": "Iranian flag",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Iranian flag" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "ir-wave-clip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: WAVE_INITIAL_D, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "animate",
        {
          attributeName: "d",
          dur: "2s",
          repeatCount: "indefinite",
          begin: "0s",
          calcMode: "linear",
          values: WAVE_VALUES
        }
      ) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("g", { clipPath: "url(#ir-wave-clip)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "scale(5.556)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#DA0001", d: "M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0v4z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EEE", d: "M0 13h36v10H0z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#239F40", d: "M36 13V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v4h36z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#E96667", d: "M0 23h36v1H0z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "#BE1931", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.465 14.969c.957.49 3.038 2.953.798 5.731c1.391-.308 3.162-4.408-.798-5.731zm-2.937 0c-3.959 1.323-2.189 5.423-.798 5.731c-2.24-2.778-.159-5.241.798-5.731zm1.453-.143c.04.197 1.101.436.974-.573c-.168.408-.654.396-.968.207c-.432.241-.835.182-.988-.227c-.148.754.587.975.982.593z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.538 17.904c-.015-1.248-.677-2.352-1.329-2.799c.43.527 1.752 3.436-.785 5.351l.047-5.097l-.475-.418l-.475.398l.08 5.146l-.018-.015c-2.563-1.914-1.233-4.837-.802-5.365c-.652.447-1.315 1.551-1.329 2.799c-.013 1.071.477 2.243 1.834 3.205a6.375 6.375 0 0 1-1.678.201c.464.253 1.34.192 2.007.131l.001.068l.398.437l.4-.455v-.052c.672.062 1.567.129 2.039-.128a6.302 6.302 0 0 1-1.732-.213c1.344-.961 1.83-2.127 1.817-3.194z" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#7BC58C", d: "M0 12h36v1H0z" })
      ] }) })
    ]
  }
);
const LANGUAGES = [
  { code: "sv", nativeLabel: "Svenska", dir: "ltr", FlagComponent: SwedenFlag },
  { code: "fa", nativeLabel: "فارسی", dir: "rtl", FlagComponent: IranFlag }
];
function LandingPage() {
  var _a, _b;
  const navigate = useNavigate();
  const { setLang, currentLang } = useAppStore();
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
    // Use reasonable stale time so that refetches don't cause URL flickering
    staleTime: 3e4
  });
  const { data: backgrounds } = useQuery({
    queryKey: ["backgrounds"],
    queryFn: getBackgrounds,
    staleTime: 3e4
  });
  const subtitle = currentLang === "fa" ? settings == null ? void 0 : settings.landingSubtitleFa : settings == null ? void 0 : settings.landingSubtitleSv;
  const title = currentLang === "fa" ? ((_a = settings == null ? void 0 : settings.title) == null ? void 0 : _a.fa) ?? "" : ((_b = settings == null ? void 0 : settings.title) == null ? void 0 : _b.sv) ?? "";
  const logoUrl = settings == null ? void 0 : settings.logoUrl;
  const landingBg = backgrounds == null ? void 0 : backgrounds.find((b) => b.context === "landing");
  const landingBgUrl = (landingBg == null ? void 0 : landingBg.imageUrl) || void 0;
  const hasBg = Boolean(landingBgUrl);
  const handleLangSelect = (lang) => {
    setLang(lang);
    instance.changeLanguage(lang);
    navigate(`/${lang}/topics`);
  };
  return (
    // position:relative z-index:1 ensures this page sits above PageBackground (z-index:-1)
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen flex flex-col items-center justify-center relative p-6",
        style: { zIndex: 1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PageBackground, { url: landingBgUrl }),
          !hasBg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/6 rounded-full blur-3xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto",
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "mb-4",
                    initial: { scale: 0, rotate: -10 },
                    animate: { scale: 1, rotate: 0 },
                    transition: { delay: 0.2, type: "spring", stiffness: 200 },
                    children: logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: logoUrl,
                        alt: title,
                        className: "w-20 h-20 object-contain rounded-2xl shadow-elevated",
                        onError: (e) => {
                          e.currentTarget.style.display = "none";
                        }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🏛️" })
                  }
                ),
                title && /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-6xl font-black text-foreground mb-3 leading-none tracking-tight", children: title }),
                subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    className: "text-muted-foreground font-body text-lg mb-10",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.35 },
                    children: subtitle
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md",
                    dir: "ltr",
                    children: LANGUAGES.map((lang, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.3 + i * 0.1 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          GlassCard,
                          {
                            hoverable: true,
                            onClick: () => handleLangSelect(lang.code),
                            className: "p-6 text-center flex flex-col items-center gap-4 cursor-pointer",
                            "data-ocid": `landing.lang_${lang.code}_card`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(lang.FlagComponent, {}),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "font-display text-xl font-bold text-foreground",
                                  dir: lang.dir,
                                  children: lang.nativeLabel
                                }
                              )
                            ]
                          }
                        )
                      },
                      lang.code
                    ))
                  }
                )
              ]
            }
          )
        ]
      }
    )
  );
}
export {
  LandingPage as default
};
