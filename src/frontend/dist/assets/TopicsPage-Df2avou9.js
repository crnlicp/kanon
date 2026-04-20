import { c as useTranslation, u as useNavigate, d as useParams, a as useAppStore, j as jsxRuntimeExports, m as motion, U as Users, B as BookOpen, e as getAreas, g as getSiteSettings } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { L as Layout } from "./Layout-CeS7TdHj.js";
import { P as PageBackground } from "./PageBackground-CwPbtbp1.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { M as Mic, C as Camera, H as Heart, S as Star, T as Theater, a as Music, D as Dumbbell } from "./theater-xoNXftHt.js";
import { F as Film } from "./film-DoEpsxOc.js";
import { G as Globe, P as Palette } from "./palette-CtPHXvDl.js";
import "./map-pin-Drb8riKi.js";
import "./phone-Dg17pFKq.js";
const ICON_MAP = {
  Palette,
  BookOpen,
  Dumbbell,
  Music,
  Theater,
  Users,
  Star,
  Heart,
  Globe,
  Camera,
  Film,
  Mic
};
const CARD_GRADIENTS = [
  "from-primary/20 to-secondary/10",
  "from-secondary/20 to-primary/10",
  "from-accent/20 to-primary/10",
  "from-primary/15 to-accent/15",
  "from-secondary/15 to-accent/15",
  "from-accent/15 to-secondary/15"
];
function toAreaSlug(area) {
  return area.titleSv.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl border border-white/10 backdrop-blur-lg p-8 flex flex-col items-center text-center gap-5 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 w-full items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-32 rounded bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-48 rounded bg-white/8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-40 rounded bg-white/6" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-24 rounded-full bg-white/10" })
  ] });
}
function TopicsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const { currentLang, setAreas } = useAppStore();
  const activeLang = lang ?? currentLang;
  const { data: areas = [], isLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      const result = await getAreas();
      setAreas(result);
      return result;
    },
    // Use reasonable stale time to prevent flicker on background re-renders
    staleTime: 3e4,
    refetchOnMount: "always"
  });
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
    staleTime: 3e4,
    refetchOnMount: "always"
  });
  const bgVideo = settings == null ? void 0 : settings.topicsBgVideo;
  const bgImage = settings == null ? void 0 : settings.topicsBgImage;
  const bgUrl = bgVideo || bgImage;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageBackground, { url: bgUrl }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-black text-foreground mb-3", children: t("topics.title") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-lg", children: t("topics.subtitle") })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : areas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center py-20",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          "data-ocid": "topics.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🌐" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground mb-2", children: activeLang === "fa" ? "هنوز بخشی اضافه نشده" : "Inga områden ännu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: activeLang === "fa" ? "به زودی بخش‌های جدید اضافه می‌شوند" : "Nya områden läggs till snart" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: areas.map((area, i) => {
        const Icon = ICON_MAP[area.icon] ?? Star;
        const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
        const slug = toAreaSlug(area);
        const title = activeLang === "fa" ? area.titleFa : area.titleSv;
        const subtitle = activeLang === "fa" ? area.subtitleFa : area.subtitleSv;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 + i * 0.12, duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                hoverable: true,
                onClick: () => navigate(`/${activeLang}/${slug}`),
                className: "p-0 flex flex-col items-center text-center overflow-hidden",
                "data-ocid": `topics.area.${i + 1}`,
                children: [
                  area.cardBackground ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-32 relative overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: area.cardBackground,
                        alt: title,
                        className: "w-full h-full object-cover",
                        onError: (e) => {
                          e.currentTarget.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" })
                  ] }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 flex flex-col items-center gap-5 w-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} border border-white/10 flex items-center justify-center`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-primary" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: title }),
                      subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body leading-relaxed", children: subtitle }) : null
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass px-4 py-1.5 rounded-full text-xs font-body font-medium text-primary border border-primary/30", children: [
                      t("common.seeAll"),
                      " →"
                    ] })
                  ] })
                ]
              }
            )
          },
          area.id
        );
      }) })
    ] })
  ] });
}
export {
  TopicsPage as default
};
