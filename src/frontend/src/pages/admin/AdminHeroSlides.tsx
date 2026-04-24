import type { ExternalBlob } from "@/backend";
import { GlassCard } from "@/components/GlassCard";
import { MediaUpload } from "@/components/admin/MediaUpload";
import {
  addHeroSlide,
  deleteHeroSlide,
  getAllHeroSlides,
  updateHeroSlide,
} from "@/lib/api";
import type { HeroSlide, TopicType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Presentation, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const TOPICS: TopicType[] = ["cultural", "educational", "sport"];

type SlideFormFields = {
  topic: TopicType;
  titleSv: string;
  titleFa: string;
  subtitleSv: string;
  subtitleFa: string;
  ctaLabelSv: string;
  ctaLabelFa: string;
  ctaUrl: string;
  order: number;
};

interface SlideModalProps {
  slide?: HeroSlide | null;
  activeTopic: TopicType;
  onClose: () => void;
  onSave: () => void;
}

function SlideModal({ slide, activeTopic, onClose, onSave }: SlideModalProps) {
  const { t } = useTranslation();
  const [imageBlob, setImageBlob] = useState<ExternalBlob | null>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<SlideFormFields>({
    defaultValues: slide
      ? {
          topic: slide.topic,
          titleSv: slide.title.sv,
          titleFa: slide.title.fa,
          subtitleSv: slide.subtitle.sv,
          subtitleFa: slide.subtitle.fa,
          ctaLabelSv: slide.ctaLabel.sv,
          ctaLabelFa: slide.ctaLabel.fa,
          ctaUrl: slide.ctaUrl,
          order: slide.order,
        }
      : {
          topic: activeTopic,
          titleSv: "",
          titleFa: "",
          subtitleSv: "",
          subtitleFa: "",
          ctaLabelSv: "Läs mer",
          ctaLabelFa: "بیشتر بدانید",
          ctaUrl: "#",
          order: 1,
        },
  });

  useEffect(() => {
    if (slide) {
      reset({
        topic: slide.topic,
        titleSv: slide.title.sv,
        titleFa: slide.title.fa,
        subtitleSv: slide.subtitle.sv,
        subtitleFa: slide.subtitle.fa,
        ctaLabelSv: slide.ctaLabel.sv,
        ctaLabelFa: slide.ctaLabel.fa,
        ctaUrl: slide.ctaUrl,
        order: slide.order,
      });
    }
  }, [slide, reset]);

  const addMutation = useMutation({
    mutationFn: addHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
      toast.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => toast.error(t("common.error")),
  });

  const updateMutation = useMutation({
    mutationFn: updateHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
      toast.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => toast.error(t("common.error")),
  });

  const isSaving = addMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: SlideFormFields) => {
    if (slide) {
      updateMutation.mutate({
        id: slide.id,
        topic: data.topic,
        titleFa: data.titleFa,
        titleSv: data.titleSv,
        subtitleFa: data.subtitleFa,
        subtitleSv: data.subtitleSv,
        imageBlob: imageBlob ?? undefined,
        currentImageUrl: slide.imageUrl,
        order: Number(data.order),
      });
    } else {
      if (!imageBlob) {
        toast.error("Please upload an image");
        return;
      }
      addMutation.mutate({
        topic: data.topic,
        titleFa: data.titleFa,
        titleSv: data.titleSv,
        subtitleFa: data.subtitleFa,
        subtitleSv: data.subtitleSv,
        imageBlob,
        order: Number(data.order),
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="hero_slides.dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-white/10 p-6"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-foreground">
            {slide ? t("common.edit") : t("common.add")} Slide
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="hero_slides.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Topic */}
          <div>
            <label
              htmlFor="sf-topic"
              className="text-sm font-body font-medium text-foreground block mb-1"
            >
              Topic
            </label>
            <select
              id="sf-topic"
              {...register("topic", { required: true })}
              className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground bg-transparent focus:outline-none focus:border-primary/50"
              data-ocid="hero_slides.topic_select"
            >
              {TOPICS.map((tp) => (
                <option key={tp} value={tp}>
                  {tp.charAt(0).toUpperCase() + tp.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Titles */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="sf-title-sv"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Title (SV)
              </label>
              <input
                id="sf-title-sv"
                {...register("titleSv", { required: "Required" })}
                placeholder={t("admin.titleSv") or "Swedish title"}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50"
                data-ocid="hero_slides.title_sv_input"
              />
            </div>
            <div>
              <label
                htmlFor="sf-title-fa"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Title (FA)
              </label>
              <input
                id="sf-title-fa"
                {...register("titleFa", { required: "Required" })}
                dir="rtl"
                placeholder={t("admin.titleFa") or "عنوان فارسی"}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50"
                data-ocid="hero_slides.title_fa_input"
              />
            </div>
          </div>

          {/* Subtitles */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="sf-subtitle-sv"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Subtitle (SV)
              </label>
              <input
                id="sf-subtitle-sv"
                {...register("subtitleSv")}
                placeholder={t("admin.subtitleSv") or "Swedish subtitle"}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label
                htmlFor="sf-subtitle-fa"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Subtitle (FA)
              </label>
              <input
                id="sf-subtitle-fa"
                {...register("subtitleFa")}
                dir="rtl"
                placeholder={t("admin.subtitleFa") or "زیرعنوان فارسی"}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* CTA labels */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="sf-cta-sv"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                CTA Label (SV)
              </label>
              <input
                id="sf-cta-sv"
                {...register("ctaLabelSv")}
                placeholder={t("common.learnMore") or "Läs mer"}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label
                htmlFor="sf-cta-fa"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                CTA Label (FA)
              </label>
              <input
                id="sf-cta-fa"
                {...register("ctaLabelFa")}
                dir="rtl"
                placeholder={t("common.learnMore") or "بیشتر بخوانید"}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* CTA URL + Order */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="sf-cta-url"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                CTA URL
              </label>
              <input
                id="sf-cta-url"
                {...register("ctaUrl")}
                placeholder={t("admin.ctaUrlPlaceholder") or "#"}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label
                htmlFor="sf-order"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Order
              </label>
              <input
                id="sf-order"
                type="number"
                {...register("order", { required: "Required", min: 1 })}
                className="w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground bg-transparent focus:outline-none focus:border-primary/50"
                data-ocid="hero_slides.order_input"
              />
            </div>
          </div>

          {/* Image Upload */}
          <MediaUpload
            accept="image"
            label="Slide Image"
            currentUrl={slide?.imageUrl}
            onUpload={(blob) => setImageBlob(blob)}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
              whileHover={{ scale: isSaving ? 1 : 1.01 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              data-ocid="hero_slides.save_button"
            >
              {isSaving ? t("common.loading") : t("common.save")}
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="hero_slides.cancel_button"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminHeroSlides() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTopic, setActiveTopic] = useState<TopicType>("cultural");
  const [editTarget, setEditTarget] = useState<HeroSlide | null | undefined>(
    undefined,
  );
  const [deleteTarget, setDeleteTarget] = useState<HeroSlide | null>(null);

  const { data: slides = [] } = useQuery({
    queryKey: ["heroSlides"],
    queryFn: getAllHeroSlides,
  });

  const displayed = slides.filter((s) => s.topic === activeTopic);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteHeroSlide(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
      setDeleteTarget(null);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Presentation className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("admin.heroSlides")}
            </h1>
          </div>
          <motion.button
            type="button"
            className="flex items-center gap-2 glass px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setEditTarget(null)}
            data-ocid="hero_slides.add_button"
          >
            <Plus className="w-4 h-4" />
            {t("common.add")}
          </motion.button>
        </div>

        {/* Topic tabs */}
        <div className="flex gap-2 mb-6" data-ocid="hero_slides.topic_tabs">
          {TOPICS.map((topic) => (
            <button
              type="button"
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-smooth ${activeTopic === topic ? "bg-primary text-primary-foreground" : "glass border border-white/10 text-muted-foreground hover:text-foreground"}`}
              data-ocid={`hero_slides.tab_${topic}`}
            >
              {t(`topics.${topic}`)}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {displayed.map((slide, i) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard
                className="p-5 flex items-center gap-4"
                data-ocid={`hero_slides.item.${i + 1}`}
              >
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title.sv}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-semibold text-foreground text-sm truncate">
                    {slide.title.sv}
                  </div>
                  <div className="text-muted-foreground text-xs font-body truncate">
                    {slide.subtitle.sv}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    Order: {slide.order}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    className="glass py-1.5 px-3 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground border border-white/10 transition-smooth"
                    onClick={() => setEditTarget(slide)}
                    data-ocid={`hero_slides.edit_button.${i + 1}`}
                  >
                    {t("common.edit")}
                  </button>
                  <motion.button
                    type="button"
                    className="text-muted-foreground hover:text-destructive transition-smooth"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteTarget(slide)}
                    aria-label="Delete slide"
                    data-ocid={`hero_slides.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          {displayed.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground font-body"
              data-ocid="hero_slides.empty_state"
            >
              {t("common.noResults")}
            </div>
          )}
        </div>
      </motion.div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {editTarget !== undefined && (
          <SlideModal
            slide={editTarget}
            activeTopic={activeTopic}
            onClose={() => setEditTarget(undefined)}
            onSave={() => setEditTarget(undefined)}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            data-ocid="hero_slides.dialog"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              className="relative z-10 glass rounded-2xl border border-white/10 p-6 max-w-sm w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {t("common.delete")} Slide?
              </h3>
              <p className="text-muted-foreground text-sm font-body mb-5">
                "{deleteTarget.title.sv}"{" "}
                {t("common.deleteConfirm") ?? "will be permanently removed."}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(deleteTarget.id)}
                  className="flex-1 py-2 rounded-xl bg-destructive text-destructive-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
                  data-ocid="hero_slides.confirm_button"
                >
                  {deleteMutation.isPending
                    ? t("common.loading")
                    : t("common.delete")}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
                  data-ocid="hero_slides.cancel_button"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
