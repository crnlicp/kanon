import type { ExternalBlob } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { GlassCard } from "@/components/GlassCard";
import { MediaUpload } from "@/components/admin/MediaUpload";
import {
  addActivity,
  deleteActivity,
  getAllActivitiesAdmin,
  getAreas,
  updateActivity,
} from "@/lib/api";
import type { Activity, Area, TopicType } from "@/lib/types";
import { useAppStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Derive a TopicType from area title keywords (fallback: first area → cultural). */
function areaToTopicType(area: Area): TopicType {
  const combined = `${area.titleFa} ${area.titleSv}`.toLowerCase();
  if (combined.includes("cultural") || combined.includes("فرهنگ"))
    return "cultural";
  if (
    combined.includes("educational") ||
    combined.includes("utbildning") ||
    combined.includes("آموزش")
  )
    return "educational";
  if (
    combined.includes("sport") ||
    combined.includes("idrott") ||
    combined.includes("ورزش")
  )
    return "sport";
  // Fallback based on order: 1→cultural, 2→educational, 3→sport, repeat
  const fallbacks: TopicType[] = ["cultural", "educational", "sport"];
  return fallbacks[(area.order - 1) % 3];
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActivityFormFields = {
  slug: string;
  areaId: string; // area.id as string — used to derive TopicType
  titleSv: string;
  titleFa: string;
  descriptionSv: string;
  descriptionFa: string;
  shortDescriptionSv: string;
  shortDescriptionFa: string;
  date: string;
  locationSv: string;
  locationFa: string;
  capacity: number;
  hasRegistrationForm: boolean;
  tags: string;
  order: number;
};

interface ActivityModalProps {
  activity?: Activity | null;
  areas: Area[];
  onClose: () => void;
  onSave: () => void;
}

// ---------------------------------------------------------------------------
// Activity Modal
// ---------------------------------------------------------------------------

function ActivityModal({
  activity,
  areas,
  onClose,
  onSave,
}: ActivityModalProps) {
  const { t } = useTranslation();
  const adminLang = useAppStore((s) => s.adminLang);
  const queryClient = useQueryClient();
  const [imageBlob, setImageBlob] = useState<ExternalBlob | null>(null);
  // FIX 5: track media uploading state to disable save button
  const [isMediaUploading, setIsMediaUploading] = useState(false);

  // Find area that matches the activity's current topic
  const defaultAreaId = activity
    ? String(
        areas.find((a) => areaToTopicType(a) === activity.topic)?.id ??
          areas[0]?.id ??
          "",
      )
    : String(areas[0]?.id ?? "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActivityFormFields>({
    defaultValues: activity
      ? {
          slug: activity.slug,
          areaId: defaultAreaId,
          titleSv: activity.title.sv,
          titleFa: activity.title.fa,
          descriptionSv: activity.description.sv,
          descriptionFa: activity.description.fa,
          shortDescriptionSv: activity.shortDescription.sv,
          shortDescriptionFa: activity.shortDescription.fa,
          date: activity.date,
          locationSv: activity.location.sv,
          locationFa: activity.location.fa,
          capacity: activity.capacity || 50,
          hasRegistrationForm: activity.hasRegistrationForm,
          tags: activity.tags.join(", "),
          order: activity.order || 1,
        }
      : {
          slug: "",
          areaId: defaultAreaId,
          titleSv: "",
          titleFa: "",
          descriptionSv: "",
          descriptionFa: "",
          shortDescriptionSv: "",
          shortDescriptionFa: "",
          date: "",
          locationSv: "",
          locationFa: "",
          capacity: 50,
          hasRegistrationForm: true,
          tags: "",
          order: 1,
        },
  });

  useEffect(() => {
    if (activity) {
      reset({
        slug: activity.slug,
        areaId: defaultAreaId,
        titleSv: activity.title.sv,
        titleFa: activity.title.fa,
        descriptionSv: activity.description.sv,
        descriptionFa: activity.description.fa,
        shortDescriptionSv: activity.shortDescription.sv,
        shortDescriptionFa: activity.shortDescription.fa,
        date: activity.date,
        locationSv: activity.location.sv,
        locationFa: activity.location.fa,
        capacity: activity.capacity || 50,
        hasRegistrationForm: activity.hasRegistrationForm,
        tags: activity.tags.join(", "),
        order: activity.order || 1,
      });
    }
  }, [activity, reset, defaultAreaId]);

  const addMutation = useMutation({
    mutationFn: addActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => toast.error(t("common.error")),
  });

  const updateMutation = useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => toast.error(t("common.error")),
  });

  const isSaving = addMutation.isPending || updateMutation.isPending;
  // FIX 5: save disabled during media upload OR mutation
  const isSaveDisabled = isSaving || isMediaUploading;

  const onSubmit = (data: ActivityFormFields) => {
    const tags = data.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Derive topic from selected area
    const selectedArea = areas.find((a) => String(a.id) === data.areaId);
    const topic: TopicType = selectedArea
      ? areaToTopicType(selectedArea)
      : "cultural";

    if (activity) {
      updateMutation.mutate({
        id: activity.id,
        topic,
        titleFa: data.titleFa,
        titleSv: data.titleSv,
        descriptionFa: data.descriptionFa,
        descriptionSv: data.descriptionSv,
        contentFa: data.descriptionFa,
        contentSv: data.descriptionSv,
        slug: data.slug,
        hasRegistrationForm: data.hasRegistrationForm,
        imageBlob: imageBlob ?? undefined,
        currentImageUrl: activity.imageUrl,
      });
    } else {
      // FIX 4: imageBlob is now optional in addActivity — image is not required
      addMutation.mutate({
        topic,
        titleFa: data.titleFa,
        titleSv: data.titleSv,
        descriptionFa: data.descriptionFa,
        descriptionSv: data.descriptionSv,
        contentFa: data.descriptionFa,
        contentSv: data.descriptionSv,
        slug: data.slug,
        hasRegistrationForm: data.hasRegistrationForm,
        imageBlob: imageBlob ?? undefined,
      });
    }
    void tags;
  };

  const inputClass =
    "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="activities.dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-white/10 p-6"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-foreground">
            {activity ? t("common.edit") : t("common.add")} {t("admin.form.activity")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="activities.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Area (dynamic from backend) */}
          <div>
            <label
              htmlFor="af-area"
              className="text-sm font-body font-medium text-foreground block mb-1"
            >
              {t("admin_areas.areaLabel")}
            </label>
            <select
              id="af-area"
              {...register("areaId", { required: true })}
              className={inputClass}
              data-ocid="activities.area_select"
            >
              {areas.map((area) => (
                <option key={area.id} value={String(area.id)}>
                  {adminLang === "fa" ? area.titleFa : area.titleSv}
                </option>
              ))}
            </select>
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="af-slug"
              className="text-sm font-body font-medium text-foreground block mb-1"
            >
              Slug
            </label>
            <input
              id="af-slug"
              {...register("slug", { required: "Slug is required" })}
              placeholder={t("admin.activitySlugPlaceholder")}
              className={inputClass}
              data-ocid="activities.slug_input"
            />
            {errors.slug && (
              <p className="text-destructive text-xs mt-1 font-body">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* Titles */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="af-title-sv"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Title (SV)
              </label>
              <input
                id="af-title-sv"
                {...register("titleSv", { required: t("common.required") })}
                placeholder={t("admin.form.titleSvPlaceholder")}
                className={inputClass}
                data-ocid="activities.title_sv_input"
              />
            </div>
            <div>
              <label
                htmlFor="af-title-fa"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Title (FA)
              </label>
              <input
                id="af-title-fa"
                {...register("titleFa", { required: t("common.required") })}
                dir="rtl"
                placeholder={t("admin.form.titleFaPlaceholder")}
                className={inputClass}
                data-ocid="activities.title_fa_input"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="af-desc-sv"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Description (SV)
              </label>
              <textarea
                id="af-desc-sv"
                {...register("descriptionSv", { required: t("common.required") })}
                rows={3}
                placeholder={t("admin.form.descriptionSvPlaceholder")}
                className={`${inputClass} resize-none`}
                data-ocid="activities.desc_sv_textarea"
              />
            </div>
            <div>
              <label
                htmlFor="af-desc-fa"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Description (FA)
              </label>
              <textarea
                id="af-desc-fa"
                {...register("descriptionFa", { required: t("common.required") })}
                rows={3}
                dir="rtl"
                placeholder={t("admin.form.descriptionFaPlaceholder")}
                className={`${inputClass} resize-none`}
                data-ocid="activities.desc_fa_textarea"
              />
            </div>
          </div>

          {/* Short descriptions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="af-sdesc-sv"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Short Description (SV)
              </label>
              <input
                id="af-sdesc-sv"
                {...register("shortDescriptionSv")}
                placeholder={t("admin.form.shortDescriptionSvPlaceholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="af-sdesc-fa"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Short Description (FA)
              </label>
              <input
                id="af-sdesc-fa"
                {...register("shortDescriptionFa")}
                dir="rtl"
                placeholder={t("admin.form.shortDescriptionFaPlaceholder")}
                className={inputClass}
              />
            </div>
          </div>

          {/* Image Upload */}
          <MediaUpload
            accept="image"
            label={t("admin.form.imageLabel")}
            currentUrl={activity?.imageUrl}
            onUpload={(blob) => setImageBlob(blob)}
            onUploadingChange={(v) => setIsMediaUploading(v)}
          />

          {/* Date, capacity, order */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="af-date"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Date
              </label>
              <input
                id="af-date"
                type="date"
                {...register("date", { required: t("common.required") })}
                className={inputClass}
                data-ocid="activities.date_input"
              />
            </div>
            <div>
              <label
                htmlFor="af-capacity"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Capacity
              </label>
              <input
                id="af-capacity"
                type="number"
                {...register("capacity", { required: t("common.required"), min: 1 })}
                className={inputClass}
                data-ocid="activities.capacity_input"
              />
            </div>
            <div>
              <label
                htmlFor="af-order"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Order
              </label>
              <input
                id="af-order"
                type="number"
                {...register("order", { required: t("common.required"), min: 1 })}
                className={inputClass}
                data-ocid="activities.order_input"
              />
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="af-loc-sv"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Location (SV)
              </label>
              <input
                id="af-loc-sv"
                {...register("locationSv")}
                placeholder={t("admin.form.locationSvPlaceholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="af-loc-fa"
                className="text-sm font-body font-medium text-foreground block mb-1"
              >
                Location (FA)
              </label>
              <input
                id="af-loc-fa"
                {...register("locationFa")}
                dir="rtl"
                placeholder={t("admin.form.locationFaPlaceholder")}
                className={inputClass}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="af-tags"
              className="text-sm font-body font-medium text-foreground block mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              id="af-tags"
              {...register("tags")}
              placeholder={t("admin.form.tagsPlaceholder")}
              className={inputClass}
              data-ocid="activities.tags_input"
            />
          </div>

          {/* hasRegistrationForm */}
          <label
            htmlFor="af-reg-form"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              id="af-reg-form"
              type="checkbox"
              {...register("hasRegistrationForm")}
              className="w-4 h-4 rounded border-white/20 bg-transparent accent-primary"
              data-ocid="activities.registration_form_checkbox"
            />
            <span className="text-sm font-body text-foreground">
              Enable registration form
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              disabled={isSaveDisabled}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
              whileHover={{ scale: isSaveDisabled ? 1 : 1.01 }}
              whileTap={{ scale: isSaveDisabled ? 1 : 0.98 }}
              data-ocid="activities.save_button"
            >
              {isMediaUploading
                ? t("admin.upload.uploading")
                : isSaving
                  ? t("common.loading")
                  : t("common.save")}
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="activities.cancel_button"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminActivities() {
  const { t } = useTranslation();
  const adminLang = useAppStore((s) => s.adminLang);
  const queryClient = useQueryClient();
  const [filterAreaId, setFilterAreaId] = useState<number | "all">("all");
  const [editTarget, setEditTarget] = useState<Activity | null | undefined>(
    undefined,
  );
  const [deleteTarget, setDeleteTarget] = useState<Activity | null>(null);

  // Load areas dynamically
  const { data: areas = [], isLoading: areasLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });

  // Derive filter topic from selected area
  const filterTopic: TopicType | undefined =
    filterAreaId === "all"
      ? undefined
      : (() => {
          const area = areas.find((a) => a.id === filterAreaId);
          return area ? areaToTopicType(area) : undefined;
        })();

  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["activities", filterAreaId],
    queryFn: () => getAllActivitiesAdmin(filterTopic),
    enabled: !areasLoading, // wait for areas to load first
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      setDeleteTarget(null);
      toast.success(t("common.success"));
    },
    onError: () => toast.error(t("common.error")),
  });

  const noAreas = !areasLoading && areas.length === 0;

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("admin.activities")}
            </h1>
          </div>

          <div className="relative group">
            <motion.button
              type="button"
              className={`flex items-center gap-2 glass px-4 py-2 rounded-xl border text-sm font-body font-medium transition-smooth ${
                noAreas
                  ? "border-white/10 text-muted-foreground cursor-not-allowed opacity-60"
                  : "border-primary/30 text-primary hover:bg-primary/10"
              }`}
              whileHover={{ scale: noAreas ? 1 : 1.02 }}
              whileTap={{ scale: noAreas ? 1 : 0.97 }}
              onClick={() => !noAreas && setEditTarget(null)}
              disabled={noAreas}
              data-ocid="activities.add_button"
            >
              <Plus className="w-4 h-4" />
              {t("common.add")}
            </motion.button>
            {noAreas && (
              <div className="absolute right-0 top-full mt-2 z-10 w-56 glass rounded-xl border border-white/10 p-3 text-xs font-body text-muted-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none">
                {adminLang === "fa"
                  ? "ابتدا یک حوزه اضافه کنید"
                  : t("admin.addFirstArea")}
              </div>
            )}
          </div>
        </div>

        {/* No Areas Empty State */}
        {noAreas && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
            data-ocid="activities.no_areas_state"
          >
            <GlassCard className="p-6 flex items-start gap-4 border-amber-500/20 bg-amber-500/5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="font-body font-semibold text-foreground text-sm mb-1">
                  {adminLang === "fa"
                    ? "هیچ حوزه‌ای اضافه نشده است"
                    : t("admin.noAreasAdded")}
                </p>
                <p className="font-body text-muted-foreground text-xs mb-3">
                  {adminLang === "fa"
                    ? "برای افزودن فعالیت، ابتدا باید حداقل یک حوزه ایجاد کنید."
                    : "You need to create at least one area before you can add activities."}
                </p>
                <Link
                  to="/admin/areas"
                  className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-primary hover:opacity-80 transition-smooth"
                  data-ocid="activities.go_to_areas_link"
                >
                  {adminLang === "fa"
                    ? "رفتن به صفحه حوزه‌ها ←"
                    : t("admin.goToAreas")}
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Filters — dynamic from areas */}
        {!noAreas && (
          <div
            className="flex gap-2 mb-6 flex-wrap"
            data-ocid="activities.filter_tabs"
          >
            {/* All filter */}
            <button
              type="button"
              onClick={() => setFilterAreaId("all")}
              className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-smooth ${
                filterAreaId === "all"
                  ? "bg-primary text-primary-foreground"
                  : "glass border border-white/10 text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="activities.filter_all"
            >
              {t("common.all")}
            </button>

            {/* Per-area filters */}
            {areas.map((area) => (
              <button
                type="button"
                key={area.id}
                onClick={() => setFilterAreaId(area.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-body font-medium transition-smooth ${
                  filterAreaId === area.id
                    ? "bg-primary text-primary-foreground"
                    : "glass border border-white/10 text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`activities.filter_area.${area.id}`}
              >
                <span>{area.icon}</span>
                <span>{adminLang === "fa" ? area.titleFa : area.titleSv}</span>
              </button>
            ))}
          </div>
        )}

        {/* Loading skeleton */}
        {(areasLoading || activitiesLoading) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass rounded-2xl overflow-hidden border border-white/10 animate-pulse"
                data-ocid={`activities.loading_state.${i}`}
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 rounded bg-white/5 w-3/4" />
                  <div className="h-3 rounded bg-white/5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activities Grid */}
        {!areasLoading && !activitiesLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <GlassCard
                  className="overflow-hidden"
                  data-ocid={`activities.item.${i + 1}`}
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={activity.imageUrl}
                      alt={activity.title.sv}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/assets/images/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    {/* Area badge */}
                    {areas.length > 0 &&
                      (() => {
                        const matchArea = areas.find(
                          (a) => areaToTopicType(a) === activity.topic,
                        );
                        return matchArea ? (
                          <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 mb-2">
                            <span>{matchArea.icon}</span>
                            <span>
                              {adminLang === "fa"
                                ? matchArea.titleFa
                                : matchArea.titleSv}
                            </span>
                          </span>
                        ) : null;
                      })()}
                    <div className="font-body font-semibold text-foreground text-sm mb-2 line-clamp-2">
                      {activity.title.sv}
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground font-body mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary" />
                        {activity.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span className="truncate">
                          {activity.location.sv || "—"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 glass py-1.5 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground border border-white/10 transition-smooth"
                        onClick={() => setEditTarget(activity)}
                        data-ocid={`activities.edit_button.${i + 1}`}
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        type="button"
                        className="glass py-1.5 px-3 rounded-lg text-xs font-body text-muted-foreground hover:text-destructive border border-white/10 transition-smooth"
                        onClick={() => setDeleteTarget(activity)}
                        aria-label={t("common.delete")}
                        data-ocid={`activities.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {activities.length === 0 && !noAreas && (
              <EmptyState
                title={t("common.noResults")}
                dataOcid="activities.empty_state"
              />
            )}
          </div>
        )}
      </motion.div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {editTarget !== undefined && areas.length > 0 && (
          <ActivityModal
            activity={editTarget}
            areas={areas}
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
            data-ocid="activities.delete_dialog"
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
                {t("common.delete")} {t("admin.form.activity")}?
              </h3>
              <p className="text-muted-foreground text-sm font-body mb-5">
                "{deleteTarget.title.sv}"{" "}
                {t("admin.activities.confirmText")}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(deleteTarget.id)}
                  className="flex-1 py-2 rounded-xl bg-destructive text-destructive-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60"
                  data-ocid="activities.confirm_button"
                >
                  {deleteMutation.isPending
                    ? t("common.loading")
                    : t("common.delete")}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth"
                  data-ocid="activities.cancel_button"
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
