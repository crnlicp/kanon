import { GlassCard } from "@/components/GlassCard";
import { HeroSlider } from "@/components/HeroSlider";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageBackground } from "@/components/PageBackground";
import { getActivities, getAreas, getHeroSlides } from "@/lib/api";
import type { Area, Lang, TopicType } from "@/lib/types";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function toAreaSlug(area: Area): string {
  return area.titleSv
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function slugToTopicType(slug: string): TopicType {
  const map: Record<string, TopicType> = {
    cultural: "cultural",
    educational: "educational",
    sport: "sport",
  };
  return map[slug] ?? "cultural";
}

export default function TopicHomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang, topic } = useParams<{ lang: string; topic: string }>();
  const { currentLang, setAreas } = useAppStore();
  const activeLang = (lang ?? currentLang) as Lang;
  const activeSlug = topic ?? "cultural";

  const { data: areas = [] } = useQuery<Area[]>({
    queryKey: ["areas"],
    queryFn: async () => {
      const result = await getAreas();
      setAreas(result);
      return result;
    },
    staleTime: 30_000,
    refetchOnMount: "always",
  });

  const matchedArea = areas.find((a) => toAreaSlug(a) === activeSlug) ?? null;
  const activeTopic: TopicType = slugToTopicType(activeSlug);

  const { data: slides = [], isLoading: slidesLoading } = useQuery({
    queryKey: ["heroSlides", activeTopic],
    queryFn: () => getHeroSlides(activeTopic),
    staleTime: 30_000,
    refetchOnMount: "always",
  });

  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["activities", activeTopic],
    queryFn: () => getActivities(activeTopic),
    staleTime: 30_000,
    refetchOnMount: "always",
  });

  const areaTitle = matchedArea
    ? activeLang === "fa"
      ? matchedArea.titleFa
      : matchedArea.titleSv
    : t(`topics.${activeTopic}`);

  // Area background: video takes priority over image.
  // This URL is passed to PageBackground which renders it as a full-screen
  // fixed layer at body level (portal, z-index:-1) behind all page content.
  const areaBackgroundUrl =
    (matchedArea?.areaBackgroundVideo && matchedArea.areaBackgroundVideo !== ""
      ? matchedArea.areaBackgroundVideo
      : null) ??
    (matchedArea?.areaBackground && matchedArea.areaBackground !== ""
      ? matchedArea.areaBackground
      : undefined);

  return (
    <Layout>
      {/*
        Area background: rendered via portal to body at z-index:-1.
        This means it is FULL SCREEN behind the Layout (z-index:1) and the
        Header (z-index:50). The PageBackground handles video/image detection
        and stable mounting to prevent disappearing.
      */}
      <PageBackground url={areaBackgroundUrl} dimOpacity={0.6} />

      {/* Area title banner — always shown, glassmorphic so it reads well over any bg */}
      <div className="relative w-full pt-8 pb-4 px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground drop-shadow-lg">
            {areaTitle}
          </h1>
          {matchedArea &&
            (activeLang === "fa"
              ? matchedArea.subtitleFa
              : matchedArea.subtitleSv) && (
              <p className="text-muted-foreground font-body text-sm mt-1 drop-shadow">
                {activeLang === "fa"
                  ? matchedArea.subtitleFa
                  : matchedArea.subtitleSv}
              </p>
            )}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Hero Slider */}
        {slidesLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSlider slides={slides} lang={activeLang} className="mb-10" />
          </motion.div>
        )}

        {/* Activities grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {areaTitle}
          </h2>

          {activitiesLoading ? (
            <LoadingSpinner />
          ) : activities.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground font-body"
              data-ocid="topic.empty_state"
            >
              {t("common.noResults")}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <GlassCard
                    hoverable
                    onClick={() =>
                      navigate(`/${activeLang}/${activeSlug}/${activity.slug}`)
                    }
                    className="overflow-hidden"
                    data-ocid={`topic.activity.${i + 1}`}
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={activity.imageUrl}
                        alt={activity.title[activeLang]}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/assets/images/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-bold text-foreground mb-2 line-clamp-2">
                        {activity.title[activeLang]}
                      </h3>
                      <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">
                        {activity.shortDescription[activeLang]}
                      </p>
                      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground font-body">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span className="truncate">
                            {activity.location[activeLang]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
