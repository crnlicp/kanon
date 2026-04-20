import { ExternalBlob } from "@/backend";
import { GlassCard } from "@/components/GlassCard";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { setBackground } from "@/lib/api";
import { getBackgrounds } from "@/lib/api";
import type { TopicType } from "@/lib/types";
import { useAppStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import i18n from "i18next";
import { Film, ImageIcon, Layers, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BgScope = "landing" | TopicType;

interface ScopeConfig {
  scope: BgScope;
  labelKey: string;
  icon: string;
}

const SCOPES: ScopeConfig[] = [
  {
    scope: "landing",
    labelKey: "admin.backgrounds_section.landing",
    icon: "🏠",
  },
  {
    scope: "cultural",
    labelKey: "admin.backgrounds_section.cultural",
    icon: "🎨",
  },
  {
    scope: "educational",
    labelKey: "admin.backgrounds_section.educational",
    icon: "📚",
  },
  { scope: "sport", labelKey: "admin.backgrounds_section.sport", icon: "⚽" },
];

const VIDEO_EXTS = [".mp4", ".webm", ".mov"];

function isVideoUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return VIDEO_EXTS.some((ext) => lower.includes(ext));
}

// ---------------------------------------------------------------------------
// BackgroundCard
// ---------------------------------------------------------------------------

interface BackgroundCardProps {
  scope: BgScope;
  labelKey: string;
  icon: string;
  currentUrl: string | null;
  index: number;
  onUploaded: (
    scope: BgScope,
    blob: ExternalBlob,
    mediaType: "image" | "video",
  ) => void;
  onDelete: (scope: BgScope) => void;
  isUploading: boolean;
}

function BackgroundCard({
  scope,
  labelKey,
  icon,
  currentUrl,
  index,
  onUploaded,
  onDelete,
  isUploading,
}: BackgroundCardProps) {
  const { t } = useTranslation();
  const [uploadMode, setUploadMode] = useState<"image" | "video" | null>(null);

  const hasMedia = !!currentUrl;
  const isVideo = hasMedia && isVideoUrl(currentUrl!);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      data-ocid={`backgrounds.item.${index + 1}`}
    >
      <GlassCard className="overflow-hidden flex flex-col" hoverable>
        {/* Preview area */}
        <div className="relative aspect-video bg-black/30 overflow-hidden">
          {hasMedia ? (
            <>
              {isVideo ? (
                <video
                  src={currentUrl!}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={currentUrl!}
                  alt={t(labelKey)}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Media type badge */}
              <div className="absolute top-3 left-3">
                {isVideo ? (
                  <div className="glass flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 text-white text-xs font-body font-medium">
                    <Film className="w-3 h-3" />
                    Video
                  </div>
                ) : (
                  <div className="glass flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 text-white text-xs font-body font-medium">
                    <ImageIcon className="w-3 h-3" />
                    Image
                  </div>
                )}
              </div>

              {/* Delete button */}
              <button
                type="button"
                className="absolute top-3 right-3 glass w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-destructive hover:border-destructive/40 transition-smooth"
                onClick={() => onDelete(scope)}
                aria-label={t("admin.backgrounds_section.delete")}
                data-ocid={`backgrounds.delete_button.${index + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Scope label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                <span className="text-lg">{icon}</span>
                <span className="text-white font-display font-semibold text-sm">
                  {t(labelKey)}
                </span>
              </div>
            </>
          ) : (
            /* Empty state */
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3 p-4"
              data-ocid={`backgrounds.empty_state.${index + 1}`}
            >
              <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-2xl">
                {icon}
              </div>
              <div className="text-center">
                <p className="text-sm font-display font-semibold text-foreground">
                  {t(labelKey)}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  {t("admin.backgrounds_section.noMedia")}
                </p>
              </div>
            </div>
          )}

          {/* Uploading overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-xs font-body">
                  {t("admin.upload.uploading")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Upload buttons */}
        <div className="p-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-1.5 glass px-3 py-2 rounded-lg border border-primary/25 text-primary text-xs font-body font-medium hover:bg-primary/10 transition-smooth"
              onClick={() =>
                setUploadMode(uploadMode === "image" ? null : "image")
              }
              data-ocid={`backgrounds.upload_image_button.${index + 1}`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              {t("admin.backgrounds_section.uploadImage")}
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-1.5 glass px-3 py-2 rounded-lg border border-accent/25 text-accent text-xs font-body font-medium hover:bg-accent/10 transition-smooth"
              onClick={() =>
                setUploadMode(uploadMode === "video" ? null : "video")
              }
              data-ocid={`backgrounds.upload_video_button.${index + 1}`}
            >
              <Film className="w-3.5 h-3.5" />
              {t("admin.backgrounds_section.uploadVideo")}
            </motion.button>
          </div>

          {/* Inline upload panel */}
          <AnimatePresence>
            {uploadMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-1">
                  <MediaUpload
                    accept={uploadMode}
                    onUpload={(blob) => {
                      onUploaded(scope, blob, uploadMode);
                      setUploadMode(null);
                    }}
                    label={
                      uploadMode === "image"
                        ? t("admin.backgrounds_section.uploadImage")
                        : t("admin.backgrounds_section.uploadVideo")
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminBackgrounds() {
  const { t } = useTranslation();
  const adminLang = useAppStore((s) => s.adminLang);
  const queryClient = useQueryClient();

  // Sync i18n language to adminLang (admin-only, doesn't touch public site)
  useEffect(() => {
    i18n.changeLanguage(adminLang);
    return () => {
      // Restore public site lang on unmount — read from store at unmount time
    };
  }, [adminLang]);

  const { data: backgrounds = [], isLoading } = useQuery({
    queryKey: ["backgrounds"],
    queryFn: getBackgrounds,
  });

  const [uploadingScopes, setUploadingScopes] = useState<Set<string>>(
    new Set(),
  );

  // Mutation: upload/set a background
  const setMutation = useMutation({
    mutationFn: async ({
      scope,
      blob,
    }: {
      scope: BgScope;
      blob: ExternalBlob;
    }) => {
      const existing = backgrounds.find((b) => b.context === scope);
      return setBackground({
        id: existing?.id,
        context: scope,
        imageBlob: blob,
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["backgrounds"] });
      setUploadingScopes((prev) => {
        const next = new Set(prev);
        next.delete(variables.scope);
        return next;
      });
      toast.success(t("common.success"));
    },
    onError: (_err, variables) => {
      setUploadingScopes((prev) => {
        const next = new Set(prev);
        next.delete(variables.scope);
        return next;
      });
      toast.error(t("common.error"));
    },
  });

  // Mutation: delete (clear) a background
  const deleteMutation = useMutation({
    mutationFn: async (scope: BgScope) => {
      const existing = backgrounds.find((b) => b.context === scope);
      return setBackground({
        id: existing?.id,
        context: scope,
        imageBlob: ExternalBlob.fromURL(""),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backgrounds"] });
      toast.success(t("common.success"));
    },
    onError: () => {
      toast.error(t("common.error"));
    },
  });

  const handleUploaded = (
    scope: BgScope,
    blob: ExternalBlob,
    _mediaType: "image" | "video",
  ) => {
    setUploadingScopes((prev) => new Set(prev).add(scope));
    setMutation.mutate({ scope, blob });
  };

  const handleDelete = (scope: BgScope) => {
    deleteMutation.mutate(scope);
  };

  // Build a lookup: scope → background URL
  const bgByScope = Object.fromEntries(
    backgrounds.map((bg) => [bg.context, bg.imageUrl]),
  );

  const dir = adminLang === "fa" ? "rtl" : "ltr";

  return (
    <div className="max-w-5xl mx-auto" dir={dir}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("admin.backgrounds_section.title")}
            </h1>
            <p className="text-sm font-body text-muted-foreground mt-0.5">
              {adminLang === "fa"
                ? "تصویر یا ویدیو برای هر بخش سایت"
                : "Image or video background for each section"}
            </p>
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl glass border border-white/10 overflow-hidden animate-pulse"
                data-ocid={`backgrounds.loading_state.${i}`}
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-3 flex gap-2">
                  <div className="flex-1 h-8 rounded-lg bg-white/5" />
                  <div className="flex-1 h-8 rounded-lg bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2×2 grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCOPES.map((cfg, i) => (
              <BackgroundCard
                key={cfg.scope}
                scope={cfg.scope}
                labelKey={cfg.labelKey}
                icon={cfg.icon}
                currentUrl={bgByScope[cfg.scope] || null}
                index={i}
                onUploaded={handleUploaded}
                onDelete={handleDelete}
                isUploading={uploadingScopes.has(cfg.scope)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
