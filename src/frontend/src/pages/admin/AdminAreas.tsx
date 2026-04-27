import type { ExternalBlob } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { GlassCard } from "@/components/GlassCard";
import { MediaUpload } from "@/components/admin/MediaUpload";
import {
  addHeroSlide,
  createArea,
  deleteArea,
  deleteHeroSlide,
  getAreas,
  getHeroSlides,
  setAreaBackground,
  setAreaBackgroundVideo,
  setAreaCardBackground,
  updateArea,
  updateHeroSlide,
} from "@/lib/api";
import type { Area, AreaInput, HeroSlide, TopicType } from "@/lib/types";
import { useAppStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Dumbbell,
  Edit2,
  Film,
  Globe,
  Heart,
  ImageIcon,
  LayoutGrid,
  Mic,
  Music,
  Palette,
  Plus,
  Save,
  SlidersHorizontal,
  Star,
  Theater,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Icon catalog
// ---------------------------------------------------------------------------

const ICON_OPTIONS: {
  name: string;
  component: React.ComponentType<{ className?: string }>;
}[] = [
  { name: "Palette", component: Palette },
  { name: "BookOpen", component: BookOpen },
  { name: "Dumbbell", component: Dumbbell },
  { name: "Music", component: Music },
  { name: "Theater", component: Theater },
  { name: "Users", component: Users },
  { name: "Star", component: Star },
  { name: "Heart", component: Heart },
  { name: "Globe", component: Globe },
  { name: "Camera", component: Camera },
  { name: "Film", component: Film },
  { name: "Mic", component: Mic },
];

function IconComponent({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const found = ICON_OPTIONS.find((i) => i.name === name);
  if (!found) return <LayoutGrid className={className} />;
  const Comp = found.component;
  return <Comp className={className} />;
}

// ---------------------------------------------------------------------------
// Topic mapping helpers
// ---------------------------------------------------------------------------

export function getTopicForArea(area: Area): TopicType {
  if (area.topic && area.topic.length > 0) return area.topic;
  return "cultural";
}



// ---------------------------------------------------------------------------
// Shared UI helpers
// ---------------------------------------------------------------------------

function SectionDivider({
  label,
  icon: Icon,
  isRtl,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isRtl: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
    >
      <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="font-display font-semibold text-sm text-foreground">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function GlassInput({
  id,
  value,
  onChange,
  placeholder,
  dir,
  hasError,
  "data-ocid": dataOcid,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  hasError?: boolean;
  "data-ocid"?: string;
}) {
  return (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      data-ocid={dataOcid}
      className={`w-full glass rounded-lg border px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none transition-smooth ${
        hasError
          ? "border-destructive/70 ring-1 ring-destructive/40 focus:border-destructive"
          : "border-white/10 focus:border-primary/50"
      }`}
    />
  );
}

// ---------------------------------------------------------------------------
// Wizard step indicator
// ---------------------------------------------------------------------------

const WIZARD_STEPS = () => [
  { id: 1, labelKey: "admin.createWizard.basicInfo", icon: Edit2 },
  { id: 2, labelKey: "admin.createWizard.cardImage", icon: ImageIcon },
  {
    id: 3,
    labelKey: "admin.createWizard.heroSlides",
    icon: SlidersHorizontal,
  },
  { id: 4, labelKey: "admin.createWizard.background", icon: Film },
];

function WizardStepIndicator({
  currentStep,
  isRtl,
  t,
}: {
  currentStep: number;
  isRtl: boolean;
  t: ReturnType<typeof useTranslation>["t"];
}) {
  const steps = WIZARD_STEPS();
  return (
    <div
      className={`flex items-center gap-0 ${isRtl ? "flex-row-reverse" : ""}`}
    >
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isComplete = step.id < currentStep;
        const isLast = idx === steps.length - 1;
        const StepIcon = step.icon;
        return (
          <div
            key={step.id}
            className={`flex items-center ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-smooth ${
                  isComplete
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary/20 border-primary text-primary"
                      : "glass border-white/10 text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-[10px] font-body font-medium whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : isComplete
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {t(step.labelKey)}
              </span>
            </div>
            {!isLast && (
              <div
                className={`w-8 h-px mt-[-14px] ${step.id < currentStep ? "bg-primary" : "bg-white/10"} ${isRtl ? "mx-0" : "mx-0"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// HeroSlideRow
// ---------------------------------------------------------------------------

interface HeroSlideRowProps {
  slide: HeroSlide;
  topic: TopicType;
  isRtl: boolean;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

function HeroSlideRow({
  slide,
  isRtl,
  onDelete,
  isDeleting,
  onUploadingChange,
}: HeroSlideRowProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);
  const [titleFa, setTitleFa] = useState(slide.title.fa);
  const [titleSv, setTitleSv] = useState(slide.title.sv);
  const [subtitleFa, setSubtitleFa] = useState(slide.subtitle.fa);
  const [subtitleSv, setSubtitleSv] = useState(slide.subtitle.sv);
  const [newImage, setNewImage] = useState<ExternalBlob | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateHeroSlide({
        id: slide.id,
        topic: slide.topic,
        titleFa,
        titleSv,
        subtitleFa,
        subtitleSv,
        imageBlob: newImage ?? undefined,
        currentImageUrl: slide.imageUrl,
        order: slide.order,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides", slide.topic] });
      toast.success(t("common.success"));
      setExpanded(false);
    },
    onError: () => toast.error(t("common.error")),
  });

  const displayTitle = isRtl ? titleFa || titleSv : titleSv || titleFa;

  return (
    <div className="glass rounded-xl border border-white/10 overflow-hidden">
      <div
        className={`flex items-center gap-3 px-4 py-3 ${isRtl ? "flex-row-reverse" : ""}`}
      >
        <div className="w-12 h-8 rounded-lg overflow-hidden bg-black/30 flex-shrink-0">
          {slide.imageUrl ? (
            <img
              src={slide.imageUrl}
              alt={displayTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-3 h-3 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-body font-medium text-foreground truncate">
            {displayTitle || (
              <span className="text-muted-foreground italic">
                {t("admin.noSlidesAddedYet")}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="glass flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground transition-smooth"
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onDelete(slide.id)}
            disabled={isDeleting}
            className="glass flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-muted-foreground hover:text-destructive transition-smooth disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-white/10 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
                    {t("admin.areaTitleSv")}
                  </span>
                  <GlassInput
                    value={titleSv}
                    onChange={setTitleSv}
                    placeholder={t("admin.areasTitle") || "Rubrik"}
                  />
                </div>
                <div>
                  <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
                    {t("admin.areaTitleFa")}
                  </span>
                  <GlassInput
                    value={titleFa}
                    onChange={setTitleFa}
                    placeholder={t("admin.areasTitle") || "عنوان"}
                    dir="rtl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
                    {t("admin.areaSubtitleSv")}
                  </span>
                  <GlassInput
                    value={subtitleSv}
                    onChange={setSubtitleSv}
                    placeholder={t("admin.areaSubtitleSv") || "Underrubrik"}
                  />
                </div>
                <div>
                  <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
                    {t("admin.areaSubtitleFa")}
                  </span>
                  <GlassInput
                    value={subtitleFa}
                    onChange={setSubtitleFa}
                    placeholder={t("admin.areaSubtitleFa") || "زیرعنوان"}
                    dir="rtl"
                  />
                </div>
              </div>
              <MediaUpload
                accept="image"
                label={t("admin.slideImage")}
                currentUrl={slide.imageUrl}
                onUpload={(blob) => setNewImage(blob)}
                onUploadingChange={(v) => {
                  setIsUploading(v);
                  onUploadingChange?.(v);
                }}
              />
              <motion.button
                type="button"
                onClick={() => updateMutation.mutate()}
                disabled={updateMutation.isPending || isUploading}
                whileHover={{ scale: updateMutation.isPending ? 1 : 1.01 }}
                whileTap={{ scale: updateMutation.isPending ? 1 : 0.98 }}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm font-body font-semibold transition-smooth hover:bg-primary/30 disabled:opacity-60"
              >
                <Save className="w-3.5 h-3.5" />
                {updateMutation.isPending
                  ? t("common.loading")
                  : t("common.save")}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AddHeroSlideForm
// ---------------------------------------------------------------------------

function AddHeroSlideForm({
  topic,
  isRtl,
  onAdded,
  onCancel,
}: {
  topic: TopicType;
  isRtl: boolean;
  onAdded: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [titleFa, setTitleFa] = useState("");
  const [titleSv, setTitleSv] = useState("");
  const [subtitleFa, setSubtitleFa] = useState("");
  const [subtitleSv, setSubtitleSv] = useState("");
  const [imageBlob, setImageBlob] = useState<ExternalBlob | null>(null);

  const addMutation = useMutation({
    mutationFn: () => {
      if (!imageBlob) {
        toast.error(t("admin.images.imageRequired"));
        return Promise.reject(new Error("Image is required"));
      }

      return addHeroSlide({
        topic,
        titleFa,
        titleSv,
        subtitleFa,
        subtitleSv,
        imageBlob,
        order: Date.now(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides", topic] });
      toast.success(t("common.success"));
      onAdded();
    },
    onError: () => toast.error(t("common.error")),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="glass rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col gap-3"
    >
      <div
        className={`flex items-center justify-between ${isRtl ? "flex-row-reverse" : ""}`}
      >
        <span className="text-sm font-body font-semibold text-primary">
          {t("admin.newSlide")}
        </span>
        <button
          type="button"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
            {t("admin.areaTitleSv")}
          </span>
          <GlassInput
            value={titleSv}
            onChange={setTitleSv}
            placeholder={t("admin.areasTitle") || "Rubrik"}
          />
        </div>
        <div>
          <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
            {t("admin.areaTitleFa")}
          </span>
          <GlassInput
            value={titleFa}
            onChange={setTitleFa}
            placeholder={t("admin.areasTitle") || "عنوان"}
            dir="rtl"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
            {t("admin.areaSubtitleSv")}
          </span>
          <GlassInput
            value={subtitleSv}
            onChange={setSubtitleSv}
            placeholder={t("admin.areaSubtitleSv") || "Underrubrik"}
          />
        </div>
        <div>
          <span className="text-xs font-body font-medium text-muted-foreground block mb-1">
            {t("admin.areaSubtitleFa")}
          </span>
          <GlassInput
            value={subtitleFa}
            onChange={setSubtitleFa}
            placeholder={t("admin.areaSubtitleFa") || "زیرعنوان"}
            dir="rtl"
          />
        </div>
      </div>
      <MediaUpload
        accept="image"
        label={t("admin.slideImageRequired")}
        onUpload={(blob) => setImageBlob(blob)}
      />
      <motion.button
        type="button"
        onClick={() => addMutation.mutate()}
        disabled={addMutation.isPending || !imageBlob}
        whileHover={{ scale: addMutation.isPending ? 1 : 1.01 }}
        whileTap={{ scale: addMutation.isPending ? 1 : 0.98 }}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-body font-semibold transition-smooth hover:opacity-90 disabled:opacity-60"
        data-ocid="areas.add_slide_submit_button"
      >
        <Plus className="w-4 h-4" />
        {addMutation.isPending
          ? t("common.loading")
          : t("admin.addSlide")}
      </motion.button>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// HeroSlidesSection
// ---------------------------------------------------------------------------

function HeroSlidesSection({
  area,
  allAreas,
  isRtl,
}: {
  area: Area;
  allAreas: Area[];
  isRtl: boolean;
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const topic = getTopicForArea(area);

  const { data: slides = [], isLoading } = useQuery({
    queryKey: ["heroSlides", topic],
    queryFn: () => getHeroSlides(topic),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteHeroSlide(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides", topic] });
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  return (
    <div className="flex flex-col gap-3">
      {isLoading && (
        <div className="text-sm font-body text-muted-foreground py-4 text-center">
          {t("common.loading")}
        </div>
      )}
      {!isLoading && slides.length === 0 && !showAddForm && (
        <div
          className="glass rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center py-8 gap-2"
          data-ocid="areas.slides_empty_state"
        >
          <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-sm font-body text-muted-foreground">
            {t("admin.noSlidesAddedYet")}
          </p>
        </div>
      )}
      {!isLoading &&
        slides.map((slide) => (
          <HeroSlideRow
            key={slide.id}
            slide={slide}
            topic={topic}
            isRtl={isRtl}
            onDelete={(id) => deleteMutation.mutate(id)}
            isDeleting={deleteMutation.isPending}
          />
        ))}
      <AnimatePresence>
        {showAddForm && (
          <AddHeroSlideForm
            topic={topic}
            isRtl={isRtl}
            onAdded={() => setShowAddForm(false)}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </AnimatePresence>
      {!showAddForm && (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className={`flex items-center gap-2 glass px-4 py-2.5 rounded-xl border border-dashed border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth w-fit ${isRtl ? "flex-row-reverse" : ""}`}
          data-ocid="areas.add_slide_button"
        >
          <Plus className="w-4 h-4" />
          {t("admin.addSlide")}
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CreateAreaWizard — multi-step wizard for NEW areas
// Step 1 calls backend immediately to CREATE the area.
// Steps 2-4 UPDATE the already-created area with media / hero slides.
// ---------------------------------------------------------------------------

interface WizardProps {
  allAreas: Area[];
  onClose: () => void;
}

function CreateAreaWizard({ allAreas, onClose }: WizardProps) {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";

  const [step, setStep] = useState(1);
  // Once Step 1 succeeds, we store the newly-created area here
  const [savedArea, setSavedArea] = useState<Area | null>(null);

  // Step 1 fields
  const [icon, setIcon] = useState("Palette");
  const [titleSv, setTitleSv] = useState("");
  const [titleFa, setTitleFa] = useState("");
  const [subtitleSv, setSubtitleSv] = useState("");
  const [subtitleFa, setSubtitleFa] = useState("");
  const [topic, setTopic] = useState("cultural");

  // Step 1 validation errors
  const [errors, setErrors] = useState<{
    titleSv?: boolean;
    titleFa?: boolean;
  }>({});

  // Step 4 bg mode + blob
  const [bgMode, setBgMode] = useState<"image" | "video">("image");

  // Loading states
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [isSavingBg, setIsSavingBg] = useState(false);
  // FIX 5: track media uploading in wizard steps 2-4
  const [isMediaUploading, setIsMediaUploading] = useState(false);

  // ── Step 1: Call backend to create area immediately ─────────────────
  const handleCreateArea = async () => {
    const newErrors: { titleSv?: boolean; titleFa?: boolean } = {};
    if (!titleSv.trim()) newErrors.titleSv = true;
    if (!titleFa.trim()) newErrors.titleFa = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t("admin.createWizard.requiredFields"));
      return;
    }
    setErrors({});
    setCreateError("");
    setIsCreating(true);
    try {
      const created = await createArea({
        icon,
        titleSv,
        titleFa,
        subtitleSv,
        subtitleFa,
        topic,
      });
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setSavedArea(created);
      toast.success(
        t("admin.areaCreated"),
      );
      setStep(2);
    } catch {
      setCreateError(
        t("admin.createWizard.failed"),
      );
    } finally {
      setIsCreating(false);
    }
  };

  // ── Step 2: Upload card background ──────────────────────────────────
  const handleCardBgUpload = async (blob: ExternalBlob) => {
    if (!savedArea) return;
    try {
      const updated = await setAreaCardBackground(savedArea.id, blob);
      if (updated) {
        setSavedArea(updated);
        queryClient.invalidateQueries({ queryKey: ["areas"] });
      }
      toast.success(t("admin.cardBgSaved"));
    } catch {
      toast.error(t("common.error"));
    }
  };

  // ── Step 4: Upload area page background then finish ──────────────────
  const handleBgUploadAndFinish = async (blob: ExternalBlob) => {
    if (!savedArea) return;
    setIsSavingBg(true);
    try {
      const fn =
        bgMode === "video" ? setAreaBackgroundVideo : setAreaBackground;
      const updated = await fn(savedArea.id, blob);
      if (updated) {
        setSavedArea(updated);
        queryClient.invalidateQueries({ queryKey: ["areas"] });
      }
      toast.success(t("admin.admin_areas.bgSaved"));
    } catch {
      toast.error(t("common.error"));
    } finally {
      setIsSavingBg(false);
    }
  };

  const totalSteps = 4;
  const canGoPrev = step > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      dir={isRtl ? "rtl" : "ltr"}
      data-ocid="areas.dialog"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className={`relative z-10 w-full max-w-lg h-full flex flex-col glass border-white/10 shadow-elevated overflow-hidden ${isRtl ? "mr-auto border-l" : "ml-auto border-r"}`}
        initial={{ x: isRtl ? "-100%" : "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isRtl ? "-100%" : "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <IconComponent name={icon} className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-foreground">
                {t("admin.createNewArea")}
              </h2>
              <p className="text-xs font-body text-muted-foreground mt-0.5">
                {isRtl
                  ? `مرحله ${step} از ${totalSteps}`
                  : `Step ${step} of ${totalSteps}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth w-8 h-8 flex items-center justify-center rounded-lg glass border border-white/10"
            data-ocid="areas.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 py-4 border-b border-white/10 flex-shrink-0 flex justify-center">
          <WizardStepIndicator currentStep={step} isRtl={isRtl} t={t} />
        </div>

        {/* Scrollable step content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Basic Info — creates the area on submit ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                {/* Info notice */}
                <div className="glass rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs font-body text-primary flex items-start gap-2">
                  <span className="mt-0.5">ℹ️</span>
                  <span>
                    {t("admin.createWizard.step1Hint")}
                  </span>
                </div>

                <SectionDivider
                  label={t("admin.areaIcon")}
                  icon={LayoutGrid}
                  isRtl={isRtl}
                />
                <div className="grid grid-cols-6 gap-2">
                  {ICON_OPTIONS.map(({ name, component: Comp }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setIcon(name)}
                      data-ocid={`areas.icon_option_${name.toLowerCase()}`}
                      className={`flex items-center justify-center w-full aspect-square rounded-xl border transition-smooth ${
                        icon === name
                          ? "bg-primary/20 border-primary/50 text-primary"
                          : "glass border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                      }`}
                    >
                      <Comp className="w-5 h-5" />
                    </button>
                  ))}
                </div>

                <SectionDivider
                  label={t("admin.title")}
                  icon={Edit2}
                  isRtl={isRtl}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="wiz-title-sv"
                      className="text-sm font-body font-medium text-foreground block mb-1.5"
                    >
                      {t("admin.areaTitleSv")}
                      <span className="text-destructive ms-0.5">*</span>
                    </label>
                    <GlassInput
                      id="wiz-title-sv"
                      value={titleSv}
                      onChange={(v) => {
                        setTitleSv(v);
                        if (v.trim())
                          setErrors((e) => ({ ...e, titleSv: false }));
                      }}
                      placeholder={t("topics.iconType.cultural")}
                      hasError={errors.titleSv}
                      data-ocid="areas.title_sv_input"
                    />
                    {errors.titleSv && (
                      <p
                        className="text-destructive text-xs mt-1 font-body"
                        data-ocid="areas.title_sv_field_error"
                      >
                        {t("admin.required")}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="wiz-title-fa"
                      className="text-sm font-body font-medium text-foreground block mb-1.5"
                    >
                      {t("admin.areaTitleFa")}
                      <span className="text-destructive ms-0.5">*</span>
                    </label>
                    <GlassInput
                      id="wiz-title-fa"
                      value={titleFa}
                      onChange={(v) => {
                        setTitleFa(v);
                        if (v.trim())
                          setErrors((e) => ({ ...e, titleFa: false }));
                      }}
                      placeholder={t("topics.iconType.cultural")}
                      dir="rtl"
                      hasError={errors.titleFa}
                      data-ocid="areas.title_fa_input"
                    />
                    {errors.titleFa && (
                      <p
                        className="text-destructive text-xs mt-1 font-body"
                        data-ocid="areas.title_fa_field_error"
                      >
                        {t("admin.required")}
                      </p>
                    )}
                  </div>
                </div>

                <SectionDivider
                  label={t("admin.subtitle")}
                  icon={Edit2}
                  isRtl={isRtl}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="wiz-subtitle-sv"
                      className="text-sm font-body font-medium text-foreground block mb-1.5"
                    >
                      {t("admin.areaSubtitleSv")}
                    </label>
                    <GlassInput
                      id="wiz-subtitle-sv"
                      value={subtitleSv}
                      onChange={setSubtitleSv}
                      placeholder={t("topics.culturalDesc")}
                      data-ocid="areas.subtitle_sv_input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="wiz-subtitle-fa"
                      className="text-sm font-body font-medium text-foreground block mb-1.5"
                    >
                      {t("admin.areaSubtitleFa")}
                    </label>
                    <GlassInput
                      id="wiz-subtitle-fa"
                      value={subtitleFa}
                      onChange={setSubtitleFa}
                      placeholder={t("topics.culturalDesc")}
                      dir="rtl"
                      data-ocid="areas.subtitle_fa_input"
                    />
                  </div>
                </div>

                 {/* Topic selection */}
                 <SectionDivider
                  label={t("admin.topic") || "Topic"}
                  icon={Globe}
                  isRtl={isRtl}
                 />
                 <div className="flex flex-col gap-2">
                  <label className="text-sm font-body text-foreground">
                    {t("admin.topic") || "Topic"}
                  </label>
                  <select
                   value={topic}
                   onChange={(e) => setTopic(e.target.value)}
                   className="glass rounded-lg px-3 py-2 text-sm font-body text-foreground border border-white/10"
                   data-ocid="areas.topic_select"
                   >
                   <option value="cultural">Cultural</option>
                   <option value="educational">Educational</option>
                   <option value="sport">Sport</option>
                  </select>
                 </div>

                {/* Backend error message */}
                {createError && (
                  <motion.div
                    className="glass rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-body text-destructive"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid="areas.create_error_state"
                  >
                    {createError}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── STEP 2: Card Background ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                {/* Success banner from step 1 */}
                <div className="glass rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs font-body text-primary flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    {t("admin.admin_areas.areaCreatedMsg", { name: savedArea?.titleSv ?? savedArea?.titleFa ?? "" })}
                  </span>
                </div>

                <SectionDivider
                  label={t("admin.admin_areas.cardBgLabel")}
                  icon={ImageIcon}
                  isRtl={isRtl}
                />
                <p className="text-sm font-body text-muted-foreground">
                  {t("admin.createWizard.step2Hint")}
                </p>
                <MediaUpload
                  accept="image"
                  label={t("admin.cardBackground")}
                  currentUrl={savedArea?.cardBackground}
                  onUpload={handleCardBgUpload}
                  onUploadingChange={(v) => setIsMediaUploading(v)}
                />
              </motion.div>
            )}

            {/* ── STEP 3: Hero Slides ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                <SectionDivider
                  label={t("admin.heroSliders")}
                  icon={SlidersHorizontal}
                  isRtl={isRtl}
                />
                <p className="text-sm font-body text-muted-foreground">
                  {t("admin.createWizard.step3Hint")}
                </p>
                {savedArea && (
                  <HeroSlidesSection
                    area={savedArea}
                    allAreas={allAreas}
                    isRtl={isRtl}
                  />
                )}
              </motion.div>
            )}

            {/* ── STEP 4: Area Page Background ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                <SectionDivider
                  label={t("admin.admin_areas.areaPageBgLabel")}
                  icon={Film}
                  isRtl={isRtl}
                />
                <p className="text-sm font-body text-muted-foreground">
                  {t("admin.createWizard.step4Hint")}
                </p>

                {/* Media type toggle */}
                <div
                  className="flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit"
                  data-ocid="areas.bg_mode_toggle"
                >
                  <button
                    type="button"
                    onClick={() => setBgMode("image")}
                    data-ocid="areas.bg_mode_image"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${
                      bgMode === "image"
                        ? "bg-primary/30 text-foreground border border-primary/30"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    {t("admin.iconType.image")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBgMode("video")}
                    data-ocid="areas.bg_mode_video"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${
                      bgMode === "video"
                        ? "bg-accent/30 text-foreground border border-accent/30"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    {t("admin.iconType.video")}
                  </button>
                </div>

                <MediaUpload
                  accept={bgMode}
                  label={
                    bgMode === "image"
                      ? t("admin.areaBackground")
                      : t("admin.areaBackgroundVideo")
                  }
                  currentUrl={
                    bgMode === "image"
                      ? savedArea?.areaBackground
                      : savedArea?.areaBackgroundVideo
                  }
                  onUpload={handleBgUploadAndFinish}
                  onUploadingChange={(v) => setIsMediaUploading(v)}
                />
                {isSavingBg && (
                  <p className="text-xs font-body text-primary flex items-center gap-1">
                    <span className="animate-spin">⟳</span>
                    {t("admin.saving")}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation footer */}
        <div className="px-6 py-4 border-t border-white/10 flex-shrink-0">
          <div className={`flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
            {/* Previous / Cancel */}
            {canGoPrev ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth ${isRtl ? "flex-row-reverse" : ""}`}
                data-ocid="areas.prev_step_button"
              >
                {isRtl ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
                {t("admin.back")}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
                data-ocid="areas.cancel_button"
              >
                {t("common.cancel")}
              </button>
            )}

            {/* Step 1: "Create Area" button — calls backend */}
            {step === 1 && (
              <motion.button
                type="button"
                onClick={handleCreateArea}
                disabled={isCreating}
                whileHover={{ scale: isCreating ? 1 : 1.01 }}
                whileTap={{ scale: isCreating ? 1 : 0.98 }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`}
                data-ocid="areas.create_area_button"
              >
                {isCreating ? (
                  t("common.loading")
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    {t("admin.admin_areas.createAreaBtn")}
                  </>
                )}
              </motion.button>
            )}

            {/* Steps 2 & 3: Skip + Next */}
            {(step === 2 || step === 3) && (
              <>
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={isMediaUploading}
                  className={`px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`}
                  data-ocid="areas.skip_step_button"
                >
                  {t("common.skip")}
                </button>
                <motion.button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={isMediaUploading}
                  whileHover={{ scale: isMediaUploading ? 1 : 1.01 }}
                  whileTap={{ scale: isMediaUploading ? 1 : 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`}
                  data-ocid="areas.next_step_button"
                >
                  {isMediaUploading
                    ? t("admin.upload.uploading")
                    : t("admin.admin_areas.next")}
                  {!isMediaUploading &&
                    (isRtl ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </motion.button>
              </>
            )}

            {/* Step 4: Skip or Finish */}
            {step === 4 && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isMediaUploading}
                  className={`px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`}
                  data-ocid="areas.skip_step_button"
                >
                  {t("common.skip")}
                </button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  disabled={isMediaUploading}
                  whileHover={{ scale: isMediaUploading ? 1 : 1.01 }}
                  whileTap={{ scale: isMediaUploading ? 1 : 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
                  data-ocid="areas.finish_button"
                >
                  <Check className="w-4 h-4" />
                  {isMediaUploading
                    ? t("admin.upload.uploading")
                    : t("admin.admin_areas.finish")}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EditAreaPanel — slide-in panel for EDITING existing areas (scrollable)
// ---------------------------------------------------------------------------

interface EditAreaPanelProps {
  area: Area;
  allAreas: Area[];
  onClose: () => void;
}

function EditAreaPanel({ area, allAreas, onClose }: EditAreaPanelProps) {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";

  const [icon, setIcon] = useState(area.icon);
  const [titleSv, setTitleSv] = useState(area.titleSv);
  const [titleFa, setTitleFa] = useState(area.titleFa);
  const [subtitleSv, setSubtitleSv] = useState(area.subtitleSv);
  const [subtitleFa, setSubtitleFa] = useState(area.subtitleFa);
  const [topic, setTopic] = useState(area.topic);
  const [savedArea, setSavedArea] = useState<Area>(area);
  const [bgMode, setBgMode] = useState<"image" | "video">("image");

  const updateMutation = useMutation({
    mutationFn: (input: AreaInput) => updateArea(area.id, { ...input, topic }),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const cardBgMutation = useMutation({
    mutationFn: ({ id, blob }: { id: number; blob: ExternalBlob }) =>
      setAreaCardBackground(id, blob),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const areaBgMutation = useMutation({
    mutationFn: ({ id, blob }: { id: number; blob: ExternalBlob }) =>
      setAreaBackground(id, blob),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const areaBgVideoMutation = useMutation({
    mutationFn: ({ id, blob }: { id: number; blob: ExternalBlob }) =>
      setAreaBackgroundVideo(id, blob),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const handleSave = () => {
    if (!titleSv.trim()) {
      toast.error(
        t("admin.swedishTitleRequired"),
      );
      return;
    }
    updateMutation.mutate({ icon, titleSv, titleFa, subtitleSv, subtitleFa, topic });
  };

  const isSaving = updateMutation.isPending;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      dir={isRtl ? "rtl" : "ltr"}
      data-ocid="areas.dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className={`relative z-10 w-full max-w-2xl h-full flex flex-col glass border-white/10 shadow-elevated overflow-hidden ${isRtl ? "mr-auto border-l" : "ml-auto border-r"}`}
        initial={{ x: isRtl ? "-100%" : "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isRtl ? "-100%" : "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <IconComponent name={icon} className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-foreground">
                {isRtl
                  ? `ویرایش: ${titleFa || titleSv}`
                  : `Edit: ${titleSv || titleFa}`}
              </h2>
              <p className="text-xs font-body text-muted-foreground mt-0.5">
                ID: {area.id}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth w-8 h-8 flex items-center justify-center rounded-lg glass border border-white/10"
            data-ocid="areas.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 p-6">
            {/* Icon */}
            <div className="flex flex-col gap-3">
              <SectionDivider
                label={t("admin.areaIcon")}
                icon={LayoutGrid}
                isRtl={isRtl}
              />
              <div className="grid grid-cols-6 gap-2">
                {ICON_OPTIONS.map(({ name, component: Comp }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setIcon(name)}
                    className={`flex items-center justify-center w-full aspect-square rounded-xl border transition-smooth ${
                      icon === name
                        ? "bg-primary/20 border-primary/50 text-primary"
                        : "glass border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                    }`}
                  >
                    <Comp className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Titles */}
            <div className="flex flex-col gap-3">
              <SectionDivider
                label={t("admin.title")}
                icon={Edit2}
                isRtl={isRtl}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="edit-title-sv"
                    className="text-sm font-body font-medium text-foreground block mb-1.5"
                  >
                    {t("admin.areaTitleSv")}
                  </label>
                  <GlassInput
                    id="edit-title-sv"
                    value={titleSv}
                    onChange={setTitleSv}
                    placeholder={t("topics.iconType.cultural")}
                    data-ocid="areas.title_sv_input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-title-fa"
                    className="text-sm font-body font-medium text-foreground block mb-1.5"
                  >
                    {t("admin.areaTitleFa")}
                  </label>
                  <GlassInput
                    id="edit-title-fa"
                    value={titleFa}
                    onChange={setTitleFa}
                    placeholder={t("topics.iconType.cultural")}
                    dir="rtl"
                    data-ocid="areas.title_fa_input"
                  />
                </div>
              </div>
            </div>

            {/* Subtitles */}
            <div className="flex flex-col gap-3">
              <SectionDivider
                label={t("admin.subtitle")}
                icon={Edit2}
                isRtl={isRtl}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="edit-subtitle-sv"
                    className="text-sm font-body font-medium text-foreground block mb-1.5"
                  >
                    {t("admin.areaSubtitleSv")}
                  </label>
                  <GlassInput
                    id="edit-subtitle-sv"
                    value={subtitleSv}
                    onChange={setSubtitleSv}
                    placeholder={t("topics.culturalDesc")}
                    data-ocid="areas.subtitle_sv_input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-subtitle-fa"
                    className="text-sm font-body font-medium text-foreground block mb-1.5"
                  >
                    {t("admin.areaSubtitleFa")}
                  </label>
                  <GlassInput
                    id="edit-subtitle-fa"
                    value={subtitleFa}
                    onChange={setSubtitleFa}
                    placeholder={t("topics.culturalDesc")}
                    dir="rtl"
                    data-ocid="areas.subtitle_fa_input"
                  />
                </div>
              </div>
            </div>

            {/* Card Background */}
            <div className="flex flex-col gap-3">
              <SectionDivider
                label={t("admin.cardImage")}
                icon={ImageIcon}
                isRtl={isRtl}
              />
              <MediaUpload
                accept="image"
                label={t("admin.cardBackground")}
                currentUrl={savedArea.cardBackground}
                onUpload={(blob) =>
                  cardBgMutation.mutate({ id: savedArea.id, blob })
                }
              />
            </div>

            {/* Area Page Background */}
            <div className="flex flex-col gap-3">
              <SectionDivider
                label={t("admin.admin_areas.areaPageBgLabel")}
                icon={Film}
                isRtl={isRtl}
              />
              <div
                className="flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit"
                data-ocid="areas.bg_mode_toggle"
              >
                <button
                  type="button"
                  onClick={() => setBgMode("image")}
                  data-ocid="areas.bg_mode_image"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${bgMode === "image" ? "bg-primary/30 text-foreground border border-primary/30" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />{" "}
                  {t("admin.iconType.image")}
                </button>
                <button
                  type="button"
                  onClick={() => setBgMode("video")}
                  data-ocid="areas.bg_mode_video"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${bgMode === "video" ? "bg-accent/30 text-foreground border border-accent/30" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Film className="w-3.5 h-3.5" /> {t("admin.iconType.video")}
                </button>
              </div>
              <MediaUpload
                accept={bgMode}
                label={
                  bgMode === "image"
                    ? t("admin.areaBackground")
                    : t("admin.areaBackgroundVideo")
                }
                currentUrl={
                  bgMode === "image"
                    ? savedArea.areaBackground
                    : savedArea.areaBackgroundVideo
                }
                onUpload={(blob) =>
                  bgMode === "image"
                    ? areaBgMutation.mutate({ id: savedArea.id, blob })
                    : areaBgVideoMutation.mutate({ id: savedArea.id, blob })
                }
              />
            </div>

            {/* Hero Slides */}
            <div className="flex flex-col gap-3">
              <SectionDivider
                label={t("admin.heroSliders")}
                icon={SlidersHorizontal}
                isRtl={isRtl}
              />
              <HeroSlidesSection
                area={savedArea}
                allAreas={allAreas}
                isRtl={isRtl}
              />
            </div>

            {/* Save button */}
            <div className="pt-2 pb-2">
              <div className={`flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                <motion.button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  whileHover={{ scale: isSaving ? 1 : 1.01 }}
                  whileTap={{ scale: isSaving ? 1 : 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
                  data-ocid="areas.save_button"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? t("common.loading") : t("common.save")}
                </motion.button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
                  data-ocid="areas.cancel_button"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delete confirm dialog
// ---------------------------------------------------------------------------

function DeleteConfirm({
  area,
  onConfirm,
  onCancel,
  isPending,
}: {
  area: Area;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const isRtl = adminLang === "fa";
  const title = adminLang === "fa" ? area.titleFa : area.titleSv;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="areas.delete_dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onCancel}
      />
      <motion.div
        className="relative z-10 glass rounded-2xl border border-white/10 p-6 max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-destructive/20 border border-destructive/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-foreground mb-1">
              {t("admin.deleteArea")}
            </h3>
            <p className="text-muted-foreground text-sm font-body">
              «{title}»{" "}
              {t("admin.activities.confirmText")}
            </p>
          </div>
        </div>
        <div className={`flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
            data-ocid="areas.confirm_button"
          >
            {isPending ? t("common.loading") : t("common.delete")}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="areas.delete_cancel_button"
          >
            {t("common.cancel")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminAreas() {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";

  // undefined = closed, null = new area wizard, Area = editing
  const [editTarget, setEditTarget] = useState<Area | null | undefined>(
    undefined,
  );
  const [deleteTarget, setDeleteTarget] = useState<Area | null>(null);

  const { data: areas = [], isLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setDeleteTarget(null);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const dir = isRtl ? "rtl" : "ltr";

  return (
    <div className="max-w-5xl mx-auto" dir={dir}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page header */}
        <div
          className={`flex items-center justify-between mb-8 ${isRtl ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {t("admin.areasTitle")}
              </h1>
              <p className="text-sm font-body text-muted-foreground mt-0.5">
                {t("admin.areasPageSubtitle")}
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 glass px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth ${isRtl ? "flex-row-reverse" : ""}`}
            onClick={() => setEditTarget(null)}
            data-ocid="areas.add_button"
          >
            <Plus className="w-4 h-4" />
            {t("admin.addArea")}
          </motion.button>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl glass border border-white/10 overflow-hidden animate-pulse"
                data-ocid={`areas.loading_state.${i}`}
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 w-3/4 rounded bg-white/5" />
                  <div className="h-3 w-1/2 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && areas.length === 0 && (
          <EmptyState
            title={t("admin.admin_areas.noAreasFound")}
            description={t("admin.admin_areas.addFirstArea")}
            icon={LayoutGrid}
            actionLabel={t("admin.addArea")}
            onAction={() => setEditTarget(null)}
            dataOcid="areas.empty_state"
          />
        )}

        {/* Area cards grid */}
        {!isLoading && areas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area, i) => {
              const displayTitle = isRtl ? area.titleFa : area.titleSv;
              const displaySubtitle = isRtl ? area.subtitleFa : area.subtitleSv;

              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  data-ocid={`areas.item.${i + 1}`}
                >
                  <GlassCard className="overflow-hidden" hoverable>
                    <div className="relative aspect-video bg-black/30 overflow-hidden">
                      {area.cardBackground ? (
                        <img
                          src={area.cardBackground}
                          alt={displayTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/assets/images/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <IconComponent
                              name={area.icon}
                              className="w-8 h-8 text-primary/60"
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3">
                        <div className="glass flex items-center justify-center w-8 h-8 rounded-xl border border-white/20">
                          <IconComponent
                            name={area.icon}
                            className="w-4 h-4 text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="font-body font-semibold text-foreground text-sm mb-0.5 truncate">
                        {displayTitle || (
                          <span className="text-muted-foreground italic">
                            t("common.untitled")
                          </span>
                        )}
                      </div>
                      {displaySubtitle && (
                        <div className="text-xs text-muted-foreground font-body mb-3 line-clamp-2">
                          {displaySubtitle}
                        </div>
                      )}
                      <div
                        className={`flex gap-1.5 mb-3 flex-wrap ${isRtl ? "flex-row-reverse" : ""}`}
                      >
                        {area.cardBackground && (
                          <span className="glass border border-white/10 rounded-full px-2 py-0.5 text-[10px] font-body text-muted-foreground flex items-center gap-1">
                            <ImageIcon className="w-2.5 h-2.5" /> Card
                          </span>
                        )}
                        {area.areaBackground && (
                          <span className="glass border border-white/10 rounded-full px-2 py-0.5 text-[10px] font-body text-muted-foreground flex items-center gap-1">
                            <ImageIcon className="w-2.5 h-2.5" /> BG
                          </span>
                        )}
                        {area.areaBackgroundVideo && (
                          <span className="glass border border-accent/20 rounded-full px-2 py-0.5 text-[10px] font-body text-accent flex items-center gap-1">
                            <Film className="w-2.5 h-2.5" /> Video
                          </span>
                        )}
                      </div>
                      <div
                        className={`flex gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                      >
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-1.5 glass py-2 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground border border-white/10 transition-smooth"
                          onClick={() => setEditTarget(area)}
                          data-ocid={`areas.edit_button.${i + 1}`}
                        >
                          <Edit2 className="w-3 h-3" />
                          {t("common.edit")}
                        </button>
                        <button
                          type="button"
                          className="glass py-2 px-3 rounded-lg text-xs font-body text-muted-foreground hover:text-destructive border border-white/10 transition-smooth"
                          onClick={() => setDeleteTarget(area)}
                          data-ocid={`areas.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Create wizard (null = new area) */}
      <AnimatePresence>
        {editTarget === null && (
          <CreateAreaWizard
            allAreas={areas}
            onClose={() => setEditTarget(undefined)}
          />
        )}
      </AnimatePresence>

      {/* Edit panel (Area object = existing area) */}
      <AnimatePresence>
        {editTarget !== null && editTarget !== undefined && (
          <EditAreaPanel
            area={editTarget}
            allAreas={areas}
            onClose={() => setEditTarget(undefined)}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirm
            area={deleteTarget}
            onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
            onCancel={() => setDeleteTarget(null)}
            isPending={deleteMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
