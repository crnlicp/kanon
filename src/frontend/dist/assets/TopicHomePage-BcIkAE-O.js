import { r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, f as cn, c as useTranslation, u as useNavigate, d as useParams, a as useAppStore, L as LoadingSpinner, e as getAreas, h as getHeroSlides, k as getActivities } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { C as ChevronLeft, a as ChevronRight } from "./chevron-right-0vVWxrIY.js";
import { L as Layout } from "./Layout-CeS7TdHj.js";
import { P as PageBackground } from "./PageBackground-CwPbtbp1.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { C as Calendar } from "./calendar-QfFCSKd9.js";
import { M as MapPin } from "./map-pin-Drb8riKi.js";
import "./phone-Dg17pFKq.js";
function HeroSlider({ slides, lang, className }) {
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [direction, setDirection] = reactExports.useState(1);
  const goTo = reactExports.useCallback((index, dir) => {
    setDirection(dir);
    setCurrentIndex(index);
  }, []);
  const next = reactExports.useCallback(() => {
    goTo((currentIndex + 1) % slides.length, 1);
  }, [currentIndex, slides.length, goTo]);
  const prev = reactExports.useCallback(() => {
    goTo((currentIndex - 1 + slides.length) % slides.length, -1);
  }, [currentIndex, slides.length, goTo]);
  reactExports.useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 5e3);
    return () => clearInterval(timer);
  }, [next, slides.length]);
  if (!slides.length) return null;
  const slide = slides[currentIndex];
  const variants = {
    enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("relative w-full overflow-hidden rounded-2xl", className),
      "data-ocid": "hero.slider",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { custom: direction, mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            custom: direction,
            variants,
            initial: "enter",
            animate: "center",
            exit: "exit",
            transition: {
              type: "tween",
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1]
            },
            className: "relative w-full aspect-[16/7] min-h-[320px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 bg-cover bg-center",
                  style: { backgroundImage: `url(${slide.imageUrl})` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2, duration: 0.5 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-widest mb-2 font-body", children: slide.subtitle[lang] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 max-w-2xl", children: slide.title[lang] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.a,
                      {
                        href: slide.ctaUrl,
                        className: "inline-flex items-center gap-2 glass px-5 py-2.5 rounded-lg text-sm font-body font-medium text-foreground w-fit border border-primary/40 bg-primary/20 hover:bg-primary/30 transition-smooth",
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.97 },
                        "data-ocid": "hero.cta_button",
                        children: slide.ctaLabel[lang]
                      }
                    )
                  ]
                }
              )
            ]
          },
          currentIndex
        ) }),
        slides.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              className: "absolute left-3 top-1/2 -translate-y-1/2 glass w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-foreground z-10",
              onClick: prev,
              whileHover: {
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.15)"
              },
              whileTap: { scale: 0.9 },
              "aria-label": "Previous slide",
              "data-ocid": "hero.prev_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              className: "absolute right-3 top-1/2 -translate-y-1/2 glass w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-foreground z-10",
              onClick: next,
              whileHover: {
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.15)"
              },
              whileTap: { scale: 0.9 },
              "aria-label": "Next slide",
              "data-ocid": "hero.next_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10", children: slides.map((slide2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              className: cn(
                "rounded-full transition-smooth",
                i === currentIndex ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/40 hover:bg-white/60"
              ),
              onClick: () => goTo(i, i > currentIndex ? 1 : -1),
              "aria-label": `Go to slide ${i + 1}`,
              "data-ocid": `hero.dot.${i + 1}`
            },
            slide2.id
          )) })
        ] })
      ]
    }
  );
}
function toAreaSlug(area) {
  return area.titleSv.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
function slugToTopicType(slug) {
  const map = {
    cultural: "cultural",
    educational: "educational",
    sport: "sport"
  };
  return map[slug] ?? "cultural";
}
function TopicHomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang, topic } = useParams();
  const { currentLang, setAreas } = useAppStore();
  const activeLang = lang ?? currentLang;
  const activeSlug = topic ?? "cultural";
  const { data: areas = [] } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      const result = await getAreas();
      setAreas(result);
      return result;
    },
    staleTime: 3e4,
    refetchOnMount: "always"
  });
  const matchedArea = areas.find((a) => toAreaSlug(a) === activeSlug) ?? null;
  const activeTopic = slugToTopicType(activeSlug);
  const { data: slides = [], isLoading: slidesLoading } = useQuery({
    queryKey: ["heroSlides", activeTopic],
    queryFn: () => getHeroSlides(activeTopic),
    staleTime: 3e4,
    refetchOnMount: "always"
  });
  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["activities", activeTopic],
    queryFn: () => getActivities(activeTopic),
    staleTime: 3e4,
    refetchOnMount: "always"
  });
  const areaTitle = matchedArea ? activeLang === "fa" ? matchedArea.titleFa : matchedArea.titleSv : t(`topics.${activeTopic}`);
  const areaBackgroundUrl = ((matchedArea == null ? void 0 : matchedArea.areaBackgroundVideo) && matchedArea.areaBackgroundVideo !== "" ? matchedArea.areaBackgroundVideo : null) ?? ((matchedArea == null ? void 0 : matchedArea.areaBackground) && matchedArea.areaBackground !== "" ? matchedArea.areaBackground : void 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageBackground, { url: areaBackgroundUrl, dimOpacity: 0.6 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full pt-8 pb-4 px-4 md:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-black text-foreground drop-shadow-lg", children: areaTitle }),
          matchedArea && (activeLang === "fa" ? matchedArea.subtitleFa : matchedArea.subtitleSv) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1 drop-shadow", children: activeLang === "fa" ? matchedArea.subtitleFa : matchedArea.subtitleSv })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 py-8", children: [
      slidesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSlider, { slides, lang: activeLang, className: "mb-10" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3, duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-6", children: areaTitle }),
            activitiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : activities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-16 text-muted-foreground font-body",
                "data-ocid": "topic.empty_state",
                children: t("common.noResults")
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: activities.map((activity, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1 + i * 0.08 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    hoverable: true,
                    onClick: () => navigate(`/${activeLang}/${activeSlug}/${activity.slug}`),
                    className: "overflow-hidden",
                    "data-ocid": `topic.activity.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: activity.imageUrl,
                          alt: activity.title[activeLang],
                          className: "w-full h-full object-cover",
                          onError: (e) => {
                            e.currentTarget.src = "/assets/images/placeholder.svg";
                          }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground mb-2 line-clamp-2", children: activity.title[activeLang] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body mb-3 line-clamp-2", children: activity.shortDescription[activeLang] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 text-xs text-muted-foreground font-body", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activity.date })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: activity.location[activeLang] })
                          ] })
                        ] })
                      ] })
                    ]
                  }
                )
              },
              activity.id
            )) })
          ]
        }
      )
    ] })
  ] });
}
export {
  TopicHomePage as default
};
