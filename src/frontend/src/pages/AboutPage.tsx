import { GlassCard } from "@/components/GlassCard";
import { Layout } from "@/components/Layout";
import { getAbout } from "@/lib/api";
import type { AboutContent, Lang } from "@/lib/types";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function AboutPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { currentLang } = useAppStore();
  const activeLang = (lang ?? currentLang) as Lang;
  const isRtl = activeLang === "fa";

  const {
    data: about,
    isLoading,
    isError,
  } = useQuery<AboutContent>({
    queryKey: ["about"],
    queryFn: getAbout,
    // Always refetch fresh data — about content may change in admin
    staleTime: 0,
    refetchOnMount: "always",
  });

  // Select content based on language, with fallback to the other language
  const content = isRtl
    ? about?.contentFa || about?.contentSv || ""
    : about?.contentSv || about?.contentFa || "";

  return (
    <Layout>
      <div
        className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20"
        dir={isRtl ? "rtl" : "ltr"}
        data-ocid="about.page"
      >
        {/* Page header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
            <span className="text-3xl" aria-hidden="true">
              🏛️
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            {t("about.title")}
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* About image */}
        {about?.imagePath && (
          <motion.div
            className="mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-elevated"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            data-ocid="about.hero_image"
          >
            <img
              src={about.imagePath}
              alt={t("about.title")}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>
        )}

        {/* Content area */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {isLoading && (
            <GlassCard className="p-8" data-ocid="about.loading_state">
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-4 bg-white/5 rounded ${i === 5 ? "w-2/3" : "w-full"}`}
                  />
                ))}
              </div>
            </GlassCard>
          )}

          {isError && !isLoading && (
            <GlassCard
              className="p-8 border-destructive/20 text-center"
              data-ocid="about.error_state"
            >
              <p className="text-destructive font-body">{t("common.error")}</p>
            </GlassCard>
          )}

          {!isLoading && !isError && content ? (
            <GlassCard className="p-8 md:p-10" data-ocid="about.content">
              <div
                className="font-body text-foreground/90 leading-relaxed text-base md:text-lg [&>p]:mb-4 [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:ps-6 [&>li]:mb-2"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: rich text from trusted backend
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </GlassCard>
          ) : null}

          {!isLoading && !isError && !content && (
            <GlassCard
              className="p-8 text-center"
              data-ocid="about.empty_state"
            >
              <p className="text-muted-foreground font-body">
                {t("about.noContent")}
              </p>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
