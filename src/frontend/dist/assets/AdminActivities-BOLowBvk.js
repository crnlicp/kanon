import { c as useTranslation, a as useAppStore, E as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, Z as Zap, w as Link, A as AnimatePresence, o as ue, Q as deleteActivity, T as addActivity, V as updateActivity, X, e as getAreas, W as getAllActivitiesAdmin } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { T as TriangleAlert, M as MediaUpload } from "./MediaUpload-B2zmTZup.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import { u as useForm } from "./index.esm-B6NVg_DB.js";
import { P as Plus } from "./plus-CIx_DEb8.js";
import { C as Calendar } from "./calendar-QfFCSKd9.js";
import { M as MapPin } from "./map-pin-Drb8riKi.js";
import { T as Trash2 } from "./trash-2-BXCUySkP.js";
import "./film-DoEpsxOc.js";
function areaToTopicType(area) {
  const combined = `${area.titleFa} ${area.titleSv}`.toLowerCase();
  if (combined.includes("cultural") || combined.includes("فرهنگ"))
    return "cultural";
  if (combined.includes("educational") || combined.includes("utbildning") || combined.includes("آموزش"))
    return "educational";
  if (combined.includes("sport") || combined.includes("idrott") || combined.includes("ورزش"))
    return "sport";
  const fallbacks = ["cultural", "educational", "sport"];
  return fallbacks[(area.order - 1) % 3];
}
function ActivityModal({
  activity,
  areas,
  onClose,
  onSave
}) {
  var _a, _b, _c;
  const { t } = useTranslation();
  const adminLang = useAppStore((s) => s.adminLang);
  const queryClient = useQueryClient();
  const [imageBlob, setImageBlob] = reactExports.useState(null);
  const [isMediaUploading, setIsMediaUploading] = reactExports.useState(false);
  const defaultAreaId = activity ? String(
    ((_a = areas.find((a) => areaToTopicType(a) === activity.topic)) == null ? void 0 : _a.id) ?? ((_b = areas[0]) == null ? void 0 : _b.id) ?? ""
  ) : String(((_c = areas[0]) == null ? void 0 : _c.id) ?? "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: activity ? {
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
      order: activity.order || 1
    } : {
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
      order: 1
    }
  });
  reactExports.useEffect(() => {
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
        order: activity.order || 1
      });
    }
  }, [activity, reset, defaultAreaId]);
  const addMutation = useMutation({
    mutationFn: addActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      ue.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => ue.error(t("common.error"))
  });
  const updateMutation = useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      ue.success(t("common.success"));
      onSave();
      onClose();
    },
    onError: () => ue.error(t("common.error"))
  });
  const isSaving = addMutation.isPending || updateMutation.isPending;
  const isSaveDisabled = isSaving || isMediaUploading;
  const onSubmit = (data) => {
    data.tags.split(",").map((s) => s.trim()).filter(Boolean);
    const selectedArea = areas.find((a) => String(a.id) === data.areaId);
    const topic = selectedArea ? areaToTopicType(selectedArea) : "cultural";
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
        imageBlob: imageBlob ?? void 0,
        currentImageUrl: activity.imageUrl
      });
    } else {
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
        imageBlob: imageBlob ?? void 0
      });
    }
  };
  const inputClass = "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none focus:border-primary/50";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "activities.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-white/10 p-6",
            initial: { opacity: 0, scale: 0.95, y: 16 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 16 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground", children: [
                  activity ? t("common.edit") : t("common.add"),
                  " Activity"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "text-muted-foreground hover:text-foreground transition-smooth",
                    "data-ocid": "activities.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "af-area",
                      className: "text-sm font-body font-medium text-foreground block mb-1",
                      children: adminLang === "fa" ? "حوزه" : "Area"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "af-area",
                      ...register("areaId", { required: true }),
                      className: inputClass,
                      "data-ocid": "activities.area_select",
                      children: areas.map((area) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(area.id), children: adminLang === "fa" ? area.titleFa : area.titleSv }, area.id))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "af-slug",
                      className: "text-sm font-body font-medium text-foreground block mb-1",
                      children: "Slug"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "af-slug",
                      ...register("slug", { required: "Slug is required" }),
                      placeholder: "activity-slug",
                      className: inputClass,
                      "data-ocid": "activities.slug_input"
                    }
                  ),
                  errors.slug && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1 font-body", children: errors.slug.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-title-sv",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Title (SV)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-title-sv",
                        ...register("titleSv", { required: "Required" }),
                        placeholder: "Swedish title",
                        className: inputClass,
                        "data-ocid": "activities.title_sv_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-title-fa",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Title (FA)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-title-fa",
                        ...register("titleFa", { required: "Required" }),
                        dir: "rtl",
                        placeholder: "عنوان فارسی",
                        className: inputClass,
                        "data-ocid": "activities.title_fa_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-desc-sv",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Description (SV)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "af-desc-sv",
                        ...register("descriptionSv", { required: "Required" }),
                        rows: 3,
                        placeholder: "Swedish description",
                        className: `${inputClass} resize-none`,
                        "data-ocid": "activities.desc_sv_textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-desc-fa",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Description (FA)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "af-desc-fa",
                        ...register("descriptionFa", { required: "Required" }),
                        rows: 3,
                        dir: "rtl",
                        placeholder: "توضیح فارسی",
                        className: `${inputClass} resize-none`,
                        "data-ocid": "activities.desc_fa_textarea"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-sdesc-sv",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Short Description (SV)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-sdesc-sv",
                        ...register("shortDescriptionSv"),
                        placeholder: "Short SV",
                        className: inputClass
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-sdesc-fa",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Short Description (FA)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-sdesc-fa",
                        ...register("shortDescriptionFa"),
                        dir: "rtl",
                        placeholder: "خلاصه فارسی",
                        className: inputClass
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MediaUpload,
                  {
                    accept: "image",
                    label: "Activity Image",
                    currentUrl: activity == null ? void 0 : activity.imageUrl,
                    onUpload: (blob) => setImageBlob(blob),
                    onUploadingChange: (v) => setIsMediaUploading(v)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-date",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Date"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-date",
                        type: "date",
                        ...register("date", { required: "Required" }),
                        className: inputClass,
                        "data-ocid": "activities.date_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-capacity",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Capacity"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-capacity",
                        type: "number",
                        ...register("capacity", { required: "Required", min: 1 }),
                        className: inputClass,
                        "data-ocid": "activities.capacity_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-order",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Order"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-order",
                        type: "number",
                        ...register("order", { required: "Required", min: 1 }),
                        className: inputClass,
                        "data-ocid": "activities.order_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-loc-sv",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Location (SV)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-loc-sv",
                        ...register("locationSv"),
                        placeholder: "Plats",
                        className: inputClass
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "af-loc-fa",
                        className: "text-sm font-body font-medium text-foreground block mb-1",
                        children: "Location (FA)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "af-loc-fa",
                        ...register("locationFa"),
                        dir: "rtl",
                        placeholder: "مکان",
                        className: inputClass
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "af-tags",
                      className: "text-sm font-body font-medium text-foreground block mb-1",
                      children: "Tags (comma-separated)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "af-tags",
                      ...register("tags"),
                      placeholder: "tag1, tag2, tag3",
                      className: inputClass,
                      "data-ocid": "activities.tags_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "af-reg-form",
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "af-reg-form",
                          type: "checkbox",
                          ...register("hasRegistrationForm"),
                          className: "w-4 h-4 rounded border-white/20 bg-transparent accent-primary",
                          "data-ocid": "activities.registration_form_checkbox"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-foreground", children: "Enable registration form" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "submit",
                      disabled: isSaveDisabled,
                      className: "flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                      whileHover: { scale: isSaveDisabled ? 1 : 1.01 },
                      whileTap: { scale: isSaveDisabled ? 1 : 0.98 },
                      "data-ocid": "activities.save_button",
                      children: isMediaUploading ? t("admin.upload.uploading") : isSaving ? t("common.loading") : t("common.save")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth",
                      "data-ocid": "activities.cancel_button",
                      children: t("common.cancel")
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function AdminActivities() {
  const { t } = useTranslation();
  const adminLang = useAppStore((s) => s.adminLang);
  const queryClient = useQueryClient();
  const [filterAreaId, setFilterAreaId] = reactExports.useState("all");
  const [editTarget, setEditTarget] = reactExports.useState(
    void 0
  );
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: areas = [], isLoading: areasLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas
  });
  const filterTopic = filterAreaId === "all" ? void 0 : (() => {
    const area = areas.find((a) => a.id === filterAreaId);
    return area ? areaToTopicType(area) : void 0;
  })();
  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["activities", filterAreaId],
    queryFn: () => getAllActivitiesAdmin(filterTopic),
    enabled: !areasLoading
    // wait for areas to load first
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      setDeleteTarget(null);
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const noAreas = !areasLoading && areas.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("admin.activities") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  className: `flex items-center gap-2 glass px-4 py-2 rounded-xl border text-sm font-body font-medium transition-smooth ${noAreas ? "border-white/10 text-muted-foreground cursor-not-allowed opacity-60" : "border-primary/30 text-primary hover:bg-primary/10"}`,
                  whileHover: { scale: noAreas ? 1 : 1.02 },
                  whileTap: { scale: noAreas ? 1 : 0.97 },
                  onClick: () => !noAreas && setEditTarget(null),
                  disabled: noAreas,
                  "data-ocid": "activities.add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    t("common.add")
                  ]
                }
              ),
              noAreas && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full mt-2 z-10 w-56 glass rounded-xl border border-white/10 p-3 text-xs font-body text-muted-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none", children: adminLang === "fa" ? "ابتدا یک حوزه اضافه کنید" : "Add areas first before adding activities" })
            ] })
          ] }),
          noAreas && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: "mb-6",
              "data-ocid": "activities.no_areas_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex items-start gap-4 border-amber-500/20 bg-amber-500/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body font-semibold text-foreground text-sm mb-1", children: adminLang === "fa" ? "هیچ حوزه‌ای اضافه نشده است" : "No areas added yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-xs mb-3", children: adminLang === "fa" ? "برای افزودن فعالیت، ابتدا باید حداقل یک حوزه ایجاد کنید." : "You need to create at least one area before you can add activities." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/admin/areas",
                      className: "inline-flex items-center gap-1.5 text-xs font-body font-semibold text-primary hover:opacity-80 transition-smooth",
                      "data-ocid": "activities.go_to_areas_link",
                      children: adminLang === "fa" ? "رفتن به صفحه حوزه‌ها ←" : "Go to Areas page →"
                    }
                  )
                ] })
              ] })
            }
          ),
          !noAreas && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-2 mb-6 flex-wrap",
              "data-ocid": "activities.filter_tabs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFilterAreaId("all"),
                    className: `px-4 py-2 rounded-xl text-sm font-body font-medium transition-smooth ${filterAreaId === "all" ? "bg-primary text-primary-foreground" : "glass border border-white/10 text-muted-foreground hover:text-foreground"}`,
                    "data-ocid": "activities.filter_all",
                    children: adminLang === "fa" ? "همه" : "All"
                  }
                ),
                areas.map((area) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFilterAreaId(area.id),
                    className: `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-body font-medium transition-smooth ${filterAreaId === area.id ? "bg-primary text-primary-foreground" : "glass border border-white/10 text-muted-foreground hover:text-foreground"}`,
                    "data-ocid": `activities.filter_area.${area.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: area.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: adminLang === "fa" ? area.titleFa : area.titleSv })
                    ]
                  },
                  area.id
                ))
              ]
            }
          ),
          (areasLoading || activitiesLoading) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl overflow-hidden border border-white/10 animate-pulse",
              "data-ocid": `activities.loading_state.${i}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-white/5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 rounded bg-white/5 w-3/4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded bg-white/5 w-1/2" })
                ] })
              ]
            },
            i
          )) }),
          !areasLoading && !activitiesLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            activities.map((activity, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.06 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    className: "overflow-hidden",
                    "data-ocid": `activities.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: activity.imageUrl,
                          alt: activity.title.sv,
                          className: "w-full h-full object-cover",
                          onError: (e) => {
                            e.currentTarget.src = "/assets/images/placeholder.svg";
                          }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                        areas.length > 0 && (() => {
                          const matchArea = areas.find(
                            (a) => areaToTopicType(a) === activity.topic
                          );
                          return matchArea ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-body font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: matchArea.icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: adminLang === "fa" ? matchArea.titleFa : matchArea.titleSv })
                          ] }) : null;
                        })(),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-body font-semibold text-foreground text-sm mb-2 line-clamp-2", children: activity.title.sv }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 text-xs text-muted-foreground font-body mb-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-primary" }),
                            activity.date
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-primary" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: activity.location.sv || "—" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              className: "flex-1 glass py-1.5 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground border border-white/10 transition-smooth",
                              onClick: () => setEditTarget(activity),
                              "data-ocid": `activities.edit_button.${i + 1}`,
                              children: t("common.edit")
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              className: "glass py-1.5 px-3 rounded-lg text-xs font-body text-muted-foreground hover:text-destructive border border-white/10 transition-smooth",
                              onClick: () => setDeleteTarget(activity),
                              "aria-label": "Delete",
                              "data-ocid": `activities.delete_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                )
              },
              activity.id
            )),
            activities.length === 0 && !noAreas && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "col-span-full text-center py-12 text-muted-foreground font-body",
                "data-ocid": "activities.empty_state",
                children: t("common.noResults")
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: editTarget !== void 0 && areas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActivityModal,
      {
        activity: editTarget,
        areas,
        onClose: () => setEditTarget(void 0),
        onSave: () => setEditTarget(void 0)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        "data-ocid": "activities.delete_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              onClick: () => setDeleteTarget(null)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative z-10 glass rounded-2xl border border-white/10 p-6 max-w-sm w-full",
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-bold text-foreground mb-2", children: [
                  t("common.delete"),
                  " Activity?"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body mb-5", children: [
                  '"',
                  deleteTarget.title.sv,
                  '"',
                  " ",
                  t("common.deleteConfirm") ?? "will be permanently removed."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      disabled: deleteMutation.isPending,
                      onClick: () => deleteMutation.mutate(deleteTarget.id),
                      className: "flex-1 py-2 rounded-xl bg-destructive text-destructive-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                      "data-ocid": "activities.confirm_button",
                      children: deleteMutation.isPending ? t("common.loading") : t("common.delete")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeleteTarget(null),
                      className: "px-4 py-2 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth",
                      "data-ocid": "activities.cancel_button",
                      children: t("common.cancel")
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  AdminActivities as default
};
