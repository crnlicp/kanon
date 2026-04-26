import type { ExternalBlob } from "@/backend";
import { GlassCard } from "@/components/GlassCard";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { getAbout, setAbout } from "@/lib/api";
import type { AboutContent } from "@/lib/types";
import { useAppStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";


export default function AdminAbout() {
  const { adminAuth, adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const isRtl = adminLang === "fa";

  const [contentSv, setContentSv] = useState("");
  const [contentFa, setContentFa] = useState("");
  // imageBlob holds the newly-uploaded blob; currentImageUrl tracks existing URL for preview
  const [imageBlob, setImageBlob] = useState<ExternalBlob | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(
    undefined,
  );
  const [isImageUploading, setIsImageUploading] = useState(false);
  const initialized = useRef(false);

  const { data: about, isLoading } = useQuery<AboutContent>({
    queryKey: ["about"],
    queryFn: getAbout,
    staleTime: 0,
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (about && !initialized.current) {
      initialized.current = true;
      setContentSv(about.contentSv);
      setContentFa(about.contentFa);
      setCurrentImageUrl(about.imagePath ?? undefined);
    }
  }, [about]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = adminAuth.token ?? "";
      // Resolve imagePath: if a new blob was uploaded, use its URL; otherwise keep existing
      const imagePath =
        imageBlob?.getDirectURL() ?? currentImageUrl ?? undefined;
      await setAbout(token, {
        id: about?.id ?? 1,
        contentFa,
        contentSv,
        imagePath: imagePath?.trim() || undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success(t("admin.aboutPage.save"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const isSaveDisabled = saveMutation.isPending || isImageUploading;

  const inputClass =
    "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 bg-transparent";
  const labelClass = "text-sm font-body font-medium text-foreground block mb-1";

  if (isLoading) {
    return (
      <div className="text-muted-foreground font-body animate-pulse py-8 text-center">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto"
      dir={isRtl ? "rtl" : "ltr"}
      data-ocid="admin_about.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t("admin.aboutPage.title")}
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="flex flex-col gap-5"
        >
          {/* Content SV */}
          <GlassCard className="p-6 flex flex-col gap-4">
            <h2 className="font-display text-base font-semibold text-foreground border-b border-white/10 pb-3">
              {t("admin.aboutPage.contentSv")}
            </h2>
            <div>
              <label htmlFor="about-content-sv" className={labelClass}>
                {t("admin.aboutPage.contentSv")}
              </label>
              <textarea
                id="about-content-sv"
                value={contentSv}
                onChange={(e) => setContentSv(e.target.value)}
                placeholder={t("admin.aboutPage.contentSvPlaceholder")}
                rows={8}
                dir="ltr"
                className={`${inputClass} resize-y`}
                data-ocid="admin_about.content_sv_textarea"
              />
              <p className="text-xs text-muted-foreground mt-1 font-body">
                {t("admin.htmlHint")}
              </p>
            </div>
          </GlassCard>

          {/* Content FA */}
          <GlassCard className="p-6 flex flex-col gap-4">
            <h2 className="font-display text-base font-semibold text-foreground border-b border-white/10 pb-3">
              {t("admin.aboutPage.contentFa")}
            </h2>
            <div>
              <label htmlFor="about-content-fa" className={labelClass}>
                {t("admin.aboutPage.contentFa")}
              </label>
              <textarea
                id="about-content-fa"
                value={contentFa}
                onChange={(e) => setContentFa(e.target.value)}
                placeholder={t("admin.aboutPage.contentFaPlaceholder")}
                rows={8}
                dir="rtl"
                className={`${inputClass} resize-y`}
                data-ocid="admin_about.content_fa_textarea"
              />
              <p className="text-xs text-muted-foreground mt-1 font-body">
                {t("admin.htmlHint")}
              </p>
            </div>
          </GlassCard>

          {/* Image upload */}
          <GlassCard className="p-6 flex flex-col gap-4">
            <h2 className="font-display text-base font-semibold text-foreground border-b border-white/10 pb-3">
              {t("admin.aboutPage.image")}
            </h2>
            <MediaUpload
              accept="image"
              label={t("admin.aboutPage.imageOptional")}
              currentUrl={currentImageUrl}
              onUpload={(blob) => {
                setImageBlob(blob);
                setCurrentImageUrl(blob.getDirectURL());
              }}
              onUploadingChange={(v) => setIsImageUploading(v)}
            />
          </GlassCard>

          {/* Save */}
          <motion.button
            type="submit"
            disabled={isSaveDisabled}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-smooth disabled:opacity-60"
            whileHover={{ scale: isSaveDisabled ? 1 : 1.01 }}
            whileTap={{ scale: isSaveDisabled ? 1 : 0.98 }}
            data-ocid="admin_about.save_button"
          >
            {isImageUploading
              ? t("admin.aboutPage.uploading")
              : saveMutation.isPending
                ? t("admin.aboutPage.saving")
                : t("admin.aboutPage.save")}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
