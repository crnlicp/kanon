import { GlassCard } from "@/components/GlassCard";
import { Layout } from "@/components/Layout";
import { PageBackground } from "@/components/PageBackground";
import { getAreas, getSiteSettings } from "@/lib/api";
import type { Area, Lang, SiteSettings } from "@/lib/types";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Camera,
  Dumbbell,
  Film,
  Globe,
  Heart,
  type LucideIcon,
  Mic,
  Music,
  Palette,
  Star,
  Theater,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const ICON_MAP: Record<string, LucideIcon> = {
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
  Mic,
};

const CARD_GRADIENTS = [
  "from-primary/20 to-secondary/10",
  "from-secondary/20 to-primary/10",
  "from-accent/20 to-primary/10",
  "from-primary/15 to-accent/15",
  "from-secondary/15 to-accent/15",
  "from-accent/15 to-secondary/15",
];

function toAreaSlug(area: Area): string {
  return area.titleSv
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function SkeletonCard() {
  return (
    <div className="glass rounded-xl border border-white/10 backdrop-blur-lg p-8 flex flex-col items-center text-center gap-5 animate-pulse">
      <div className="w-16 h-16 rounded-2xl bg-white/10" />
      <div className="flex flex-col gap-2 w-full items-center">
        <div className="h-6 w-32 rounded bg-white/10" />
        <div className="h-4 w-48 rounded bg-white/8" />
        <div className="h-4 w-40 rounded bg-white/6" />
      </div>
      <div className="h-7 w-24 rounded-full bg-white/10" />
    </div>
  );
}

export default function TopicsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { currentLang, setAreas } = useAppStore();
  const activeLang = (lang ?? currentLang) as Lang;

  const { data: areas = [], isLoading } = useQuery<Area[]>({
    queryKey: ["areas"],
    queryFn: async () => {
      const result = await getAreas();
      setAreas(result);
      return result;
    },
    // Use reasonable stale time to prevent flicker on background re-renders
    staleTime: 30_000,
    refetchOnMount: "always",
  });

  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ["settings"],
    queryFn: getSiteSettings,
    staleTime: 30_000,
    refetchOnMount: "always",
  });

  // Topics page background: video takes priority over image
  const bgVideo = settings?.topicsBgVideo;
  const bgImage = settings?.topicsBgImage;
  const bgUrl = bgVideo || bgImage;

  return (
    <Layout>
      {/*
        Background rendered via portal to body (z-index:-1).
        Rendered unconditionally so it never remounts — src updates imperatively
        inside PageBackground when bgUrl changes from undefined → actual value.
      */}
      <PageBackground url={bgUrl} />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
            {t("topics.title")}
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            {t("topics.subtitle")}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : areas.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="topics.empty_state"
          >
            <div className="text-5xl mb-4">🌐</div>
            <p className="font-display text-xl font-bold text-foreground mb-2">
              {activeLang === "fa"
                ? "هنوز بخشی اضافه نشده"
                : "Inga områden ännu"}
            </p>
            <p className="text-muted-foreground font-body">
              {activeLang === "fa"
                ? "به زودی بخش‌های جدید اضافه می‌شوند"
                : "Nya områden läggs till snart"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areas.map((area, i) => {
              const Icon = ICON_MAP[area.icon] ?? Star;
              const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
              const slug = toAreaSlug(area);
              const title = activeLang === "fa" ? area.titleFa : area.titleSv;
              const subtitle =
                activeLang === "fa" ? area.subtitleFa : area.subtitleSv;

              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                >
                  <GlassCard
                    hoverable
                    onClick={() => navigate(`/${activeLang}/${slug}`)}
                    className="p-0 flex flex-col items-center text-center overflow-hidden"
                    data-ocid={`topics.area.${i + 1}`}
                  >
                    {area.cardBackground ? (
                      <div className="w-full h-32 relative overflow-hidden">
                        <img
                          src={area.cardBackground}
                          alt={title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/assets/images/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
                      </div>
                    ) : null}

                    <div className="p-8 flex flex-col items-center gap-5 w-full">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} border border-white/10 flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      <div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                          {title}
                        </h2>
                        {subtitle ? (
                          <p className="text-muted-foreground text-sm font-body leading-relaxed">
                            {subtitle}
                          </p>
                        ) : null}
                      </div>

                      <div className="glass px-4 py-1.5 rounded-full text-xs font-body font-medium text-primary border border-primary/30">
                        {t("common.seeAll")} →
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
