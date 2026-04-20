import { n as createLucideIcon, c as useTranslation, E as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, S as Settings, F as Shield, G as Lock, H as EyeOff, I as Eye, o as ue, J as setSiteSettings, K as setBackground, N as setTopicsBackground, O as getAdminPasswordHash, P as updateAdminPassword, g as getSiteSettings, b as getBackgrounds } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { M as MediaUpload, I as Image } from "./MediaUpload-B2zmTZup.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import { U as User } from "./user-Cb3tSc_S.js";
import { G as Globe, P as Palette } from "./palette-CtPHXvDl.js";
import { P as Phone } from "./phone-Dg17pFKq.js";
import { F as Film } from "./film-DoEpsxOc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
];
const PanelsTopLeft = createLucideIcon("panels-top-left", __iconNode);
const TABS = [
  {
    id: "identity",
    labelSv: "Site Identity",
    labelFa: "هویت سایت",
    icon: User
  },
  { id: "landing", labelSv: "Landing Page", labelFa: "صفحه اصلی", icon: Globe },
  {
    id: "topics",
    labelSv: "Topics Page",
    labelFa: "صفحه موضوعات",
    icon: PanelsTopLeft
  },
  {
    id: "colors",
    labelSv: "Brand Colors",
    labelFa: "رنگ‌های برند",
    icon: Palette
  },
  {
    id: "contact",
    labelSv: "Contact Info",
    labelFa: "اطلاعات تماس",
    icon: Phone
  },
  { id: "password", labelSv: "Password", labelFa: "رمز عبور", icon: Shield }
];
function AdminSettings() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = reactExports.useState("identity");
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSiteSettings
  });
  const { data: backgrounds } = useQuery({
    queryKey: ["backgrounds"],
    queryFn: getBackgrounds
  });
  const [titleSv, setTitleSv] = reactExports.useState("");
  const [titleFa, setTitleFa] = reactExports.useState("");
  const [landingSubtitleSv, setLandingSubtitleSv] = reactExports.useState("");
  const [landingSubtitleFa, setLandingSubtitleFa] = reactExports.useState("");
  const [primaryColor, setPrimaryColor] = reactExports.useState("#3B82F6");
  const [accentColor, setAccentColor] = reactExports.useState("#D97706");
  const [secondaryColor, setSecondaryColor] = reactExports.useState("#6366F1");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [addressSv, setAddressSv] = reactExports.useState("");
  const [addressFa, setAddressFa] = reactExports.useState("");
  const [logoBlob, setLogoBlob] = reactExports.useState(null);
  const [landingBgBlob, setLandingBgBlob] = reactExports.useState(null);
  const [landingBgVideoBlob, setLandingBgVideoBlob] = reactExports.useState(null);
  const [topicsBgImageBlob, setTopicsBgImageBlob] = reactExports.useState(null);
  const [topicsBgVideoBlob, setTopicsBgVideoBlob] = reactExports.useState(null);
  const [isLogoUploading, setIsLogoUploading] = reactExports.useState(false);
  const [isLandingBgUploading, setIsLandingBgUploading] = reactExports.useState(false);
  const [isTopicsBgUploading, setIsTopicsBgUploading] = reactExports.useState(false);
  const isAnyMediaUploading = isLogoUploading || isLandingBgUploading || isTopicsBgUploading;
  const [landingBgMode, setLandingBgMode] = reactExports.useState(
    "image"
  );
  const [topicsBgMode, setTopicsBgMode] = reactExports.useState("image");
  const initialized = reactExports.useRef(false);
  const [currentPw, setCurrentPw] = reactExports.useState("");
  const [newPw, setNewPw] = reactExports.useState("");
  const [confirmPw, setConfirmPw] = reactExports.useState("");
  const [showCurrent, setShowCurrent] = reactExports.useState(false);
  const [showNew, setShowNew] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [pwError, setPwError] = reactExports.useState("");
  const [pwLoading, setPwLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (settings && !initialized.current) {
      initialized.current = true;
      setTitleSv(settings.title.sv);
      setTitleFa(settings.title.fa);
      setLandingSubtitleSv(settings.landingSubtitleSv ?? "");
      setLandingSubtitleFa(settings.landingSubtitleFa ?? "");
      setPrimaryColor(settings.primaryColor || "#3B82F6");
      setAccentColor(settings.accentColor || "#D97706");
      setSecondaryColor("#6366F1");
      setEmail(settings.contactInfo.email);
      setPhone(settings.contactInfo.phone);
      setAddressSv(settings.contactInfo.address.sv);
      setAddressFa(settings.contactInfo.address.fa);
    }
  }, [settings]);
  const currentLandingBg = backgrounds == null ? void 0 : backgrounds.find((b) => b.context === "landing");
  const saveMutation = useMutation({
    mutationFn: async () => {
      await setSiteSettings({
        titleFa,
        titleSv,
        primaryColor,
        accentColor,
        secondaryColor,
        logoBlob: logoBlob ?? void 0,
        currentLogoUrl: settings == null ? void 0 : settings.logoUrl,
        landingSubtitleFa,
        landingSubtitleSv,
        contactEmail: email,
        contactPhone: phone,
        contactAddressFa: addressFa,
        contactAddressSv: addressSv
      });
      if (landingBgMode === "image" && landingBgBlob) {
        await setBackground({
          id: currentLandingBg == null ? void 0 : currentLandingBg.id,
          context: "landing",
          imageBlob: landingBgBlob
        });
      } else if (landingBgMode === "video" && landingBgVideoBlob) {
        await setBackground({
          id: currentLandingBg == null ? void 0 : currentLandingBg.id,
          context: "landing",
          imageBlob: landingBgVideoBlob
        });
      }
      if (topicsBgMode === "image" && topicsBgImageBlob) {
        await setTopicsBackground({
          imageBlob: topicsBgImageBlob,
          currentSettings: settings
        });
      } else if (topicsBgMode === "video" && topicsBgVideoBlob) {
        await setTopicsBackground({
          videoBlob: topicsBgVideoBlob,
          currentSettings: settings
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["backgrounds"] });
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwError("");
    if (!currentPw || !newPw || !confirmPw) {
      setPwError(t("form.requiredField"));
      return;
    }
    if (newPw !== confirmPw) {
      setPwError(t("admin.passwordMismatch"));
      return;
    }
    if (newPw.length < 8) {
      setPwError("Password must be at least 8 characters");
      return;
    }
    setPwLoading(true);
    try {
      const storedHash = await getAdminPasswordHash();
      if (currentPw !== storedHash) {
        setPwError(t("admin.loginError"));
        setPwLoading(false);
        return;
      }
      const success = await updateAdminPassword(newPw);
      if (success) {
        ue.success(t("admin.passwordChanged"));
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        ue.error(t("common.error"));
      }
    } catch {
      ue.error(t("common.error"));
    } finally {
      setPwLoading(false);
    }
  };
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground font-body animate-pulse py-8 text-center", children: t("common.loading") });
  const inputClass = "w-full glass rounded-lg border border-white/10 px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 bg-transparent";
  const labelClass = "text-sm font-body font-medium text-foreground block mb-1";
  const isPasswordTab = activeTab === "password";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("admin.settings") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 glass border border-white/10 rounded-2xl p-1 mb-6 overflow-x-auto",
            "data-ocid": "settings.tabs",
            children: TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(tab.id),
                  "data-ocid": `settings.tab_${tab.id}`,
                  className: `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-body font-medium transition-smooth whitespace-nowrap flex-shrink-0 ${isActive ? "bg-primary/25 text-foreground border border-primary/30 shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: tab.labelSv })
                  ]
                },
                tab.id
              );
            })
          }
        ),
        !isPasswordTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            className: "flex flex-col gap-0",
            onSubmit: (e) => {
              e.preventDefault();
              saveMutation.mutate();
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.2 },
                  children: [
                    activeTab === "identity" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground border-b border-white/10 pb-3", children: "Site Identity" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MediaUpload,
                        {
                          accept: "image",
                          label: "Logo",
                          currentUrl: settings == null ? void 0 : settings.logoUrl,
                          onUpload: (blob) => setLogoBlob(blob),
                          onUploadingChange: (v) => setIsLogoUploading(v)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "settings-title-sv", className: labelClass, children: "Title (SV)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "settings-title-sv",
                              value: titleSv,
                              onChange: (e) => setTitleSv(e.target.value),
                              placeholder: "",
                              className: inputClass,
                              "data-ocid": "settings.title_sv_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "settings-title-fa", className: labelClass, children: "Title (FA)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "settings-title-fa",
                              value: titleFa,
                              onChange: (e) => setTitleFa(e.target.value),
                              dir: "rtl",
                              placeholder: "",
                              className: inputClass,
                              "data-ocid": "settings.title_fa_input"
                            }
                          )
                        ] })
                      ] })
                    ] }),
                    activeTab === "landing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-white/10 pb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Landing Page" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "settings-subtitle-sv",
                              className: labelClass,
                              children: "Subtitle (SV)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "settings-subtitle-sv",
                              value: landingSubtitleSv,
                              onChange: (e) => setLandingSubtitleSv(e.target.value),
                              placeholder: "En bro mellan två kulturer",
                              className: inputClass,
                              "data-ocid": "settings.landing_subtitle_sv_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "settings-subtitle-fa",
                              className: labelClass,
                              children: "Subtitle (FA)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "settings-subtitle-fa",
                              value: landingSubtitleFa,
                              onChange: (e) => setLandingSubtitleFa(e.target.value),
                              dir: "rtl",
                              placeholder: "پلی میان دو فرهنگ",
                              className: inputClass,
                              "data-ocid": "settings.landing_subtitle_fa_input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `${labelClass} mb-2`, children: "Landing Page Background" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit mb-3",
                            "data-ocid": "settings.landing_bg_mode_toggle",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    setLandingBgMode("image");
                                    setLandingBgVideoBlob(null);
                                  },
                                  "data-ocid": "settings.landing_bg_mode_image",
                                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${landingBgMode === "image" ? "bg-primary/30 text-foreground border border-primary/30" : "text-muted-foreground hover:text-foreground"}`,
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                                    "Image"
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    setLandingBgMode("video");
                                    setLandingBgBlob(null);
                                  },
                                  "data-ocid": "settings.landing_bg_mode_video",
                                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${landingBgMode === "video" ? "bg-accent/30 text-foreground border border-accent/30" : "text-muted-foreground hover:text-foreground"}`,
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5" }),
                                    "Video"
                                  ]
                                }
                              )
                            ]
                          }
                        ),
                        landingBgMode === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MediaUpload,
                          {
                            accept: "image",
                            label: "",
                            currentUrl: currentLandingBg == null ? void 0 : currentLandingBg.imageUrl,
                            onUpload: (blob) => setLandingBgBlob(blob),
                            onUploadingChange: (v) => setIsLandingBgUploading(v)
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MediaUpload,
                          {
                            accept: "video",
                            label: "",
                            currentUrl: void 0,
                            onUpload: (blob) => setLandingBgVideoBlob(blob),
                            onUploadingChange: (v) => setIsLandingBgUploading(v)
                          }
                        )
                      ] })
                    ] }),
                    activeTab === "topics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-white/10 pb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { className: "w-4 h-4 text-primary" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: "Topics Page Background" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground -mt-2", children: "Set a background image or video for the topics selector page." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit",
                          "data-ocid": "settings.topics_bg_mode_toggle",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: () => {
                                  setTopicsBgMode("image");
                                  setTopicsBgVideoBlob(null);
                                },
                                "data-ocid": "settings.topics_bg_mode_image",
                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${topicsBgMode === "image" ? "bg-primary/30 text-foreground border border-primary/30" : "text-muted-foreground hover:text-foreground"}`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                                  "Image"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: () => {
                                  setTopicsBgMode("video");
                                  setTopicsBgImageBlob(null);
                                },
                                "data-ocid": "settings.topics_bg_mode_video",
                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${topicsBgMode === "video" ? "bg-accent/30 text-foreground border border-accent/30" : "text-muted-foreground hover:text-foreground"}`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5" }),
                                  "Video"
                                ]
                              }
                            )
                          ]
                        }
                      ),
                      topicsBgMode === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `${labelClass} mb-2`, children: "Background Image" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MediaUpload,
                          {
                            accept: "image",
                            label: "",
                            currentUrl: settings == null ? void 0 : settings.topicsBgImage,
                            onUpload: (blob) => setTopicsBgImageBlob(blob),
                            onUploadingChange: (v) => setIsTopicsBgUploading(v)
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `${labelClass} mb-2`, children: "Background Video" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MediaUpload,
                          {
                            accept: "video",
                            label: "",
                            currentUrl: settings == null ? void 0 : settings.topicsBgVideo,
                            onUpload: (blob) => setTopicsBgVideoBlob(blob),
                            onUploadingChange: (v) => setIsTopicsBgUploading(v)
                          }
                        )
                      ] })
                    ] }),
                    activeTab === "colors" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground border-b border-white/10 pb-3", children: "Brand Colors" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                        {
                          label: "Primary Color",
                          id: "color-primary",
                          value: primaryColor,
                          onChange: setPrimaryColor,
                          ocid: "settings.primary_color_input"
                        },
                        {
                          label: "Accent Color",
                          id: "color-accent",
                          value: accentColor,
                          onChange: setAccentColor,
                          ocid: "settings.accent_color_input"
                        },
                        {
                          label: "Secondary Color",
                          id: "color-secondary",
                          value: secondaryColor,
                          onChange: setSecondaryColor,
                          ocid: "settings.secondary_color_input"
                        }
                      ].map(({ label, id, value, onChange, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, className: labelClass, children: label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-8 h-8 rounded-lg border border-white/20 flex-shrink-0 cursor-pointer relative overflow-hidden",
                              style: { backgroundColor: value },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "input",
                                {
                                  id,
                                  type: "color",
                                  value,
                                  onChange: (e) => onChange(e.target.value),
                                  className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full",
                                  "data-ocid": ocid
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "text",
                              value,
                              onChange: (e) => onChange(e.target.value),
                              className: "flex-1 glass rounded-lg border border-white/10 px-2 py-1.5 text-xs font-mono text-foreground bg-transparent focus:outline-none focus:border-primary/50"
                            }
                          )
                        ] })
                      ] }, label)) })
                    ] }),
                    activeTab === "contact" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground border-b border-white/10 pb-3", children: "Contact Information" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "settings-email", className: labelClass, children: "Email" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "settings-email",
                            type: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "info@example.se",
                            className: inputClass,
                            "data-ocid": "settings.email_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "settings-phone", className: labelClass, children: "Phone" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "settings-phone",
                            value: phone,
                            onChange: (e) => setPhone(e.target.value),
                            placeholder: "+46 8 000 000",
                            className: inputClass,
                            "data-ocid": "settings.phone_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "settings-address-sv",
                              className: labelClass,
                              children: "Address (SV)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "settings-address-sv",
                              value: addressSv,
                              onChange: (e) => setAddressSv(e.target.value),
                              placeholder: "Exempelgatan 1, Stockholm",
                              className: inputClass,
                              "data-ocid": "settings.address_sv_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "settings-address-fa",
                              className: labelClass,
                              children: "Address (FA)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "settings-address-fa",
                              value: addressFa,
                              onChange: (e) => setAddressFa(e.target.value),
                              dir: "rtl",
                              placeholder: "خیابان نمونه ۱، استکهلم",
                              className: inputClass,
                              "data-ocid": "settings.address_fa_input"
                            }
                          )
                        ] })
                      ] })
                    ] })
                  ]
                },
                activeTab
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "submit",
                  disabled: saveMutation.isPending || isAnyMediaUploading,
                  className: "w-full mt-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-smooth disabled:opacity-60",
                  whileHover: {
                    scale: saveMutation.isPending || isAnyMediaUploading ? 1 : 1.01
                  },
                  whileTap: {
                    scale: saveMutation.isPending || isAnyMediaUploading ? 1 : 0.98
                  },
                  "data-ocid": "settings.save_button",
                  children: isAnyMediaUploading ? t("admin.upload.uploading") : saveMutation.isPending ? t("common.loading") : t("common.save")
                }
              )
            ]
          }
        ),
        isPasswordTab && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handlePasswordChange, noValidate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-white/10 pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground", children: t("admin.changePassword") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "pw-current", className: labelClass, children: t("admin.currentPassword") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "pw-current",
                      type: showCurrent ? "text" : "password",
                      value: currentPw,
                      onChange: (e) => {
                        setCurrentPw(e.target.value);
                        setPwError("");
                      },
                      autoComplete: "current-password",
                      placeholder: "••••••••",
                      className: `${inputClass} ps-9 pe-10`,
                      "data-ocid": "settings.current_password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowCurrent((v) => !v),
                      className: "absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                      "aria-label": "Toggle current password visibility",
                      children: showCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "pw-new", className: labelClass, children: t("admin.newPassword") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "pw-new",
                      type: showNew ? "text" : "password",
                      value: newPw,
                      onChange: (e) => {
                        setNewPw(e.target.value);
                        setPwError("");
                      },
                      autoComplete: "new-password",
                      placeholder: "••••••••",
                      className: `${inputClass} ps-9 pe-10`,
                      "data-ocid": "settings.new_password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowNew((v) => !v),
                      className: "absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                      "aria-label": "Toggle new password visibility",
                      children: showNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "pw-confirm", className: labelClass, children: t("admin.confirmPassword") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "pw-confirm",
                      type: showConfirm ? "text" : "password",
                      value: confirmPw,
                      onChange: (e) => {
                        setConfirmPw(e.target.value);
                        setPwError("");
                      },
                      autoComplete: "new-password",
                      placeholder: "••••••••",
                      className: `${inputClass} ps-9 pe-10`,
                      "data-ocid": "settings.confirm_password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowConfirm((v) => !v),
                      className: "absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                      "aria-label": "Toggle confirm password visibility",
                      children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              pwError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  className: "text-destructive text-xs font-body -mt-2",
                  initial: { opacity: 0, y: -4 },
                  animate: { opacity: 1, y: 0 },
                  "data-ocid": "settings.password_field_error",
                  children: pwError
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "submit",
                  disabled: pwLoading,
                  className: "w-full py-2.5 rounded-xl bg-primary/20 border border-primary/30 text-foreground font-body font-semibold text-sm hover:bg-primary/30 transition-smooth disabled:opacity-60",
                  whileHover: { scale: pwLoading ? 1 : 1.01 },
                  whileTap: { scale: pwLoading ? 1 : 0.98 },
                  "data-ocid": "settings.change_password_button",
                  children: pwLoading ? t("common.loading") : t("admin.changePassword")
                }
              )
            ] }) })
          },
          "password-tab"
        )
      ]
    }
  ) });
}
export {
  AdminSettings as default
};
