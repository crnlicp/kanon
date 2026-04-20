import { a as useAppStore, E as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, B as BookOpen, o as ue, ab as setAbout, q as getAbout } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { M as MediaUpload } from "./MediaUpload-B2zmTZup.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import "./film-DoEpsxOc.js";
function getAdminT(lang) {
  const labels = {
    sv: {
      title: "Redigera Om oss",
      contentSv: "Innehåll (Svenska)",
      contentFa: "Innehåll (Persiska)",
      image: "Bild (valfritt)",
      save: "Spara",
      saving: "Sparar...",
      success: "Sparat!",
      error: "Något gick fel",
      loading: "Laddar...",
      contentSvPlaceholder: "Skriv om organisationens historia, uppdrag och värderingar...",
      contentFaPlaceholder: "تاریخچه، ماموریت و ارزش‌های سازمان را بنویسید..."
    },
    fa: {
      title: "ویرایش درباره ما",
      contentSv: "محتوا (سوئدی)",
      contentFa: "محتوا (فارسی)",
      image: "تصویر (اختیاری)",
      save: "ذخیره",
      saving: "در حال ذخیره...",
      success: "ذخیره شد!",
      error: "خطایی رخ داد",
      loading: "در حال بارگذاری...",
      contentSvPlaceholder: "Skriv om organisationens historia, uppdrag och värderingar...",
      contentFaPlaceholder: "تاریخچه، ماموریت و ارزش‌های سازمان را بنویسید..."
    }
  };
  return labels[lang];
}
function AdminAbout() {
  const { adminAuth, adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const t = getAdminT(adminLang);
  const isRtl = adminLang === "fa";
  const [contentSv, setContentSv] = reactExports.useState("");
  const [contentFa, setContentFa] = reactExports.useState("");
  const [imageBlob, setImageBlob] = reactExports.useState(null);
  const [currentImageUrl, setCurrentImageUrl] = reactExports.useState(
    void 0
  );
  const [isImageUploading, setIsImageUploading] = reactExports.useState(false);
  const initialized = reactExports.useRef(false);
  const { data: about, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
    staleTime: 0,
    refetchOnMount: "always"
  });
  reactExports.useEffect(() => {
    if (about && !initialized.current) {
      initialized.current = true;
      setContentSv(about.contentSv);
      setContentFa(about.contentFa);
      setCurrentImageUrl(about.imagePath ?? void 0);
    }
  }, [about]);
  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = adminAuth.token ?? "";
      const imagePath = (imageBlob == null ? void 0 : imageBlob.getDirectURL()) ?? currentImageUrl ?? void 0;
      await setAbout(token, {
        id: (about == null ? void 0 : about.id) ?? 1,
        contentFa,
        contentSv,
        imagePath: (imagePath == null ? void 0 : imagePath.trim()) || void 0
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      ue.success(t.success);
    },
    onError: () => ue.error(t.error)
  });
  const isSaveDisabled = saveMutation.isPending || isImageUploading;
  const inputClass = "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 bg-transparent";
  const labelClass = "text-sm font-body font-medium text-foreground block mb-1";
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground font-body animate-pulse py-8 text-center", children: t.loading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "max-w-3xl mx-auto",
      dir: isRtl ? "rtl" : "ltr",
      "data-ocid": "admin_about.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  saveMutation.mutate();
                },
                className: "flex flex-col gap-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground border-b border-white/10 pb-3", children: t.contentSv }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "about-content-sv", className: labelClass, children: t.contentSv }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "about-content-sv",
                          value: contentSv,
                          onChange: (e) => setContentSv(e.target.value),
                          placeholder: t.contentSvPlaceholder,
                          rows: 8,
                          dir: "ltr",
                          className: `${inputClass} resize-y`,
                          "data-ocid": "admin_about.content_sv_textarea"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-body", children: "HTML tags are supported (e.g. <p>, <h2>, <ul>)" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground border-b border-white/10 pb-3", children: t.contentFa }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "about-content-fa", className: labelClass, children: t.contentFa }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "about-content-fa",
                          value: contentFa,
                          onChange: (e) => setContentFa(e.target.value),
                          placeholder: t.contentFaPlaceholder,
                          rows: 8,
                          dir: "rtl",
                          className: `${inputClass} resize-y`,
                          "data-ocid": "admin_about.content_fa_textarea"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-body", children: "HTML tags are supported (e.g. <p>, <h2>, <ul>)" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground border-b border-white/10 pb-3", children: t.image }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MediaUpload,
                      {
                        accept: "image",
                        label: isRtl ? "تصویر (اختیاری)" : "Image (optional)",
                        currentUrl: currentImageUrl,
                        onUpload: (blob) => {
                          setImageBlob(blob);
                          setCurrentImageUrl(blob.getDirectURL());
                        },
                        onUploadingChange: (v) => setIsImageUploading(v)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "submit",
                      disabled: isSaveDisabled,
                      className: "w-full py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-smooth disabled:opacity-60",
                      whileHover: { scale: isSaveDisabled ? 1 : 1.01 },
                      whileTap: { scale: isSaveDisabled ? 1 : 0.98 },
                      "data-ocid": "admin_about.save_button",
                      children: isImageUploading ? isRtl ? "در حال آپلود..." : "Uploading..." : saveMutation.isPending ? t.saving : t.save
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
export {
  AdminAbout as default
};
