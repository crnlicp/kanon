import { n as createLucideIcon, c as useTranslation, a as useAppStore, E as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, y as LayoutGrid, A as AnimatePresence, o as ue, a2 as deleteArea, B as BookOpen, U as Users, X, a3 as updateArea, a4 as setAreaCardBackground, a5 as setAreaBackground, a6 as setAreaBackgroundVideo, a7 as deleteHeroSlide, a8 as createArea, a9 as updateHeroSlide, aa as addHeroSlide, h as getHeroSlides, e as getAreas } from "./index-BsZ-DJdz.js";
import { G as GlassCard } from "./GlassCard-CjbJ06Hd.js";
import { I as Image, M as MediaUpload } from "./MediaUpload-B2zmTZup.js";
import { u as useQuery } from "./useQuery-Dmg57nVM.js";
import { u as useMutation } from "./useMutation-BHe1D8LV.js";
import { P as Plus } from "./plus-CIx_DEb8.js";
import { F as Film } from "./film-DoEpsxOc.js";
import { T as Trash2 } from "./trash-2-BXCUySkP.js";
import { P as Palette, G as Globe } from "./palette-CtPHXvDl.js";
import { D as Dumbbell, a as Music, T as Theater, S as Star, H as Heart, C as Camera, M as Mic } from "./theater-xoNXftHt.js";
import { a as ChevronRight, C as ChevronLeft } from "./chevron-right-0vVWxrIY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const ICON_OPTIONS = [
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
  { name: "Mic", component: Mic }
];
function IconComponent({
  name,
  className
}) {
  const found = ICON_OPTIONS.find((i) => i.name === name);
  if (!found) return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className });
  const Comp = found.component;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className });
}
const TOPIC_KEYWORDS = [
  {
    fa: ["فرهنگ", "فرهنگی", "هنر", "موسیقی"],
    sv: ["kultur", "kulturell", "konst"],
    topic: "cultural"
  },
  {
    fa: ["آموزش", "آموزشی", "علم", "تحصیل"],
    sv: ["utbildn", "pedagogisk", "lärande"],
    topic: "educational"
  },
  {
    fa: ["ورزش", "ورزشی", "بدنی"],
    sv: ["sport", "idrott", "träning"],
    topic: "sport"
  }
];
const TOPIC_ORDER = ["cultural", "educational", "sport"];
function deriveTopicFromArea(area, allAreas) {
  const combined = `${area.titleFa} ${area.subtitleFa} ${area.titleSv} ${area.subtitleSv}`.toLowerCase();
  for (const { fa, sv, topic } of TOPIC_KEYWORDS) {
    if (fa.some((k) => combined.includes(k)) || sv.some((k) => combined.includes(k))) {
      return topic;
    }
  }
  const sorted = [...allAreas].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((a) => a.id === area.id);
  return TOPIC_ORDER[(idx >= 0 ? idx : 0) % 3];
}
function SectionDivider({
  label,
  icon: Icon,
  isRtl
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/10" })
      ]
    }
  );
}
function GlassInput({
  id,
  value,
  onChange,
  placeholder,
  dir,
  hasError,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      id,
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      dir,
      "data-ocid": dataOcid,
      className: `w-full glass rounded-lg border px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground bg-transparent focus:outline-none transition-smooth ${hasError ? "border-destructive/70 ring-1 ring-destructive/40 focus:border-destructive" : "border-white/10 focus:border-primary/50"}`
    }
  );
}
const WIZARD_STEPS = () => [
  { id: 1, labelSv: "Basic Info", labelFa: "اطلاعات پایه", icon: Pen },
  { id: 2, labelSv: "Card Image", labelFa: "تصویر کارت", icon: Image },
  {
    id: 3,
    labelSv: "Hero Slides",
    labelFa: "اسلایدها",
    icon: SlidersHorizontal
  },
  { id: 4, labelSv: "Background", labelFa: "پس‌زمینه", icon: Film }
];
function WizardStepIndicator({
  currentStep,
  isRtl
}) {
  const steps = WIZARD_STEPS();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex items-center gap-0 ${isRtl ? "flex-row-reverse" : ""}`,
      children: steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isComplete = step.id < currentStep;
        const isLast = idx === steps.length - 1;
        const StepIcon = step.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center ${isRtl ? "flex-row-reverse" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-9 h-9 rounded-xl flex items-center justify-center border transition-smooth ${isComplete ? "bg-primary border-primary text-primary-foreground" : isActive ? "bg-primary/20 border-primary text-primary" : "glass border-white/10 text-muted-foreground"}`,
                    children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StepIcon, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[10px] font-body font-medium whitespace-nowrap ${isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"}`,
                    children: isRtl ? step.labelFa : step.labelSv
                  }
                )
              ] }),
              !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-px mt-[-14px] ${step.id < currentStep ? "bg-primary" : "bg-white/10"} ${isRtl ? "mx-0" : "mx-0"}`
                }
              )
            ]
          },
          step.id
        );
      })
    }
  );
}
function HeroSlideRow({
  slide,
  isRtl,
  onDelete,
  isDeleting,
  onUploadingChange
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = reactExports.useState(false);
  const [titleFa, setTitleFa] = reactExports.useState(slide.title.fa);
  const [titleSv, setTitleSv] = reactExports.useState(slide.title.sv);
  const [subtitleFa, setSubtitleFa] = reactExports.useState(slide.subtitle.fa);
  const [subtitleSv, setSubtitleSv] = reactExports.useState(slide.subtitle.sv);
  const [newImage, setNewImage] = reactExports.useState(null);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const updateMutation = useMutation({
    mutationFn: () => updateHeroSlide({
      id: slide.id,
      topic: slide.topic,
      titleFa,
      titleSv,
      subtitleFa,
      subtitleSv,
      imageBlob: newImage ?? void 0,
      currentImageUrl: slide.imageUrl,
      order: slide.order
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides", slide.topic] });
      ue.success(t("common.success"));
      setExpanded(false);
    },
    onError: () => ue.error(t("common.error"))
  });
  const displayTitle = isRtl ? titleFa || titleSv : titleSv || titleFa;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl border border-white/10 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-3 px-4 py-3 ${isRtl ? "flex-row-reverse" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-8 rounded-lg overflow-hidden bg-black/30 flex-shrink-0", children: slide.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: slide.imageUrl,
              alt: displayTitle,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.currentTarget.src = "/assets/images/placeholder.svg";
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3 text-muted-foreground" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body font-medium text-foreground truncate", children: displayTitle || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: isRtl ? "بدون عنوان" : "Untitled" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setExpanded((v) => !v),
                className: "glass flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onDelete(slide.id),
                disabled: isDeleting,
                className: "glass flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-muted-foreground hover:text-destructive transition-smooth disabled:opacity-50",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.25 },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-1 border-t border-white/10 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "عنوان (سوئدی)" : "Title (Swedish)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlassInput,
                {
                  value: titleSv,
                  onChange: setTitleSv,
                  placeholder: "Rubrik"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "عنوان (فارسی)" : "Title (Persian)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlassInput,
                {
                  value: titleFa,
                  onChange: setTitleFa,
                  placeholder: "عنوان",
                  dir: "rtl"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "زیرعنوان (سوئدی)" : "Subtitle (Swedish)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlassInput,
                {
                  value: subtitleSv,
                  onChange: setSubtitleSv,
                  placeholder: "Underrubrik"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "زیرعنوان (فارسی)" : "Subtitle (Persian)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlassInput,
                {
                  value: subtitleFa,
                  onChange: setSubtitleFa,
                  placeholder: "زیرعنوان",
                  dir: "rtl"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MediaUpload,
            {
              accept: "image",
              label: isRtl ? "تصویر اسلاید" : "Slide Image",
              currentUrl: slide.imageUrl,
              onUpload: (blob) => setNewImage(blob),
              onUploadingChange: (v) => {
                setIsUploading(v);
                onUploadingChange == null ? void 0 : onUploadingChange(v);
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: () => updateMutation.mutate(),
              disabled: updateMutation.isPending || isUploading,
              whileHover: { scale: updateMutation.isPending ? 1 : 1.01 },
              whileTap: { scale: updateMutation.isPending ? 1 : 0.98 },
              className: "flex items-center justify-center gap-2 py-2 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm font-body font-semibold transition-smooth hover:bg-primary/30 disabled:opacity-60",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                updateMutation.isPending ? t("common.loading") : t("common.save")
              ]
            }
          )
        ] })
      }
    ) })
  ] });
}
function AddHeroSlideForm({
  topic,
  isRtl,
  onAdded,
  onCancel
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [titleFa, setTitleFa] = reactExports.useState("");
  const [titleSv, setTitleSv] = reactExports.useState("");
  const [subtitleFa, setSubtitleFa] = reactExports.useState("");
  const [subtitleSv, setSubtitleSv] = reactExports.useState("");
  const [imageBlob, setImageBlob] = reactExports.useState(null);
  const addMutation = useMutation({
    mutationFn: () => {
      if (!imageBlob) throw new Error("Image required");
      return addHeroSlide({
        topic,
        titleFa,
        titleSv,
        subtitleFa,
        subtitleSv,
        imageBlob,
        order: Date.now()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides", topic] });
      ue.success(t("common.success"));
      onAdded();
    },
    onError: () => ue.error(t("common.error"))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      className: "glass rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between ${isRtl ? "flex-row-reverse" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-semibold text-primary", children: isRtl ? "افزودن اسلاید جدید" : "Add New Slide" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  className: "text-muted-foreground hover:text-foreground transition-smooth",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "عنوان (سوئدی)" : "Title (Swedish)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassInput,
              {
                value: titleSv,
                onChange: setTitleSv,
                placeholder: "Rubrik"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "عنوان (فارسی)" : "Title (Persian)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassInput,
              {
                value: titleFa,
                onChange: setTitleFa,
                placeholder: "عنوان",
                dir: "rtl"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "زیرعنوان (سوئدی)" : "Subtitle (Swedish)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassInput,
              {
                value: subtitleSv,
                onChange: setSubtitleSv,
                placeholder: "Underrubrik"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium text-muted-foreground block mb-1", children: isRtl ? "زیرعنوان (فارسی)" : "Subtitle (Persian)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlassInput,
              {
                value: subtitleFa,
                onChange: setSubtitleFa,
                placeholder: "زیرعنوان",
                dir: "rtl"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MediaUpload,
          {
            accept: "image",
            label: isRtl ? "تصویر اسلاید *" : "Slide Image *",
            onUpload: (blob) => setImageBlob(blob)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            onClick: () => addMutation.mutate(),
            disabled: addMutation.isPending || !imageBlob,
            whileHover: { scale: addMutation.isPending ? 1 : 1.01 },
            whileTap: { scale: addMutation.isPending ? 1 : 0.98 },
            className: "flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-body font-semibold transition-smooth hover:opacity-90 disabled:opacity-60",
            "data-ocid": "areas.add_slide_submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              addMutation.isPending ? t("common.loading") : isRtl ? "افزودن اسلاید" : "Add Slide"
            ]
          }
        )
      ]
    }
  );
}
function HeroSlidesSection({
  area,
  allAreas,
  isRtl
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const topic = deriveTopicFromArea(area, allAreas);
  const { data: slides = [], isLoading } = useQuery({
    queryKey: ["heroSlides", topic],
    queryFn: () => getHeroSlides(topic)
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteHeroSlide(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroSlides", topic] });
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-body text-muted-foreground py-4 text-center", children: t("common.loading") }),
    !isLoading && slides.length === 0 && !showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center py-8 gap-2",
        "data-ocid": "areas.slides_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: isRtl ? "اسلایدی اضافه نشده" : "No slides added yet" })
        ]
      }
    ),
    !isLoading && slides.map((slide) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      HeroSlideRow,
      {
        slide,
        topic,
        isRtl,
        onDelete: (id) => deleteMutation.mutate(id),
        isDeleting: deleteMutation.isPending
      },
      slide.id
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddHeroSlideForm,
      {
        topic,
        isRtl,
        onAdded: () => setShowAddForm(false),
        onCancel: () => setShowAddForm(false)
      }
    ) }),
    !showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setShowAddForm(true),
        className: `flex items-center gap-2 glass px-4 py-2.5 rounded-xl border border-dashed border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth w-fit ${isRtl ? "flex-row-reverse" : ""}`,
        "data-ocid": "areas.add_slide_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          isRtl ? "افزودن اسلاید" : "Add Slide"
        ]
      }
    )
  ] });
}
function CreateAreaWizard({ allAreas, onClose }) {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";
  const [step, setStep] = reactExports.useState(1);
  const [savedArea, setSavedArea] = reactExports.useState(null);
  const [icon, setIcon] = reactExports.useState("Palette");
  const [titleSv, setTitleSv] = reactExports.useState("");
  const [titleFa, setTitleFa] = reactExports.useState("");
  const [subtitleSv, setSubtitleSv] = reactExports.useState("");
  const [subtitleFa, setSubtitleFa] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [bgMode, setBgMode] = reactExports.useState("image");
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const [createError, setCreateError] = reactExports.useState("");
  const [isSavingBg, setIsSavingBg] = reactExports.useState(false);
  const [isMediaUploading, setIsMediaUploading] = reactExports.useState(false);
  const handleCreateArea = async () => {
    const newErrors = {};
    if (!titleSv.trim()) newErrors.titleSv = true;
    if (!titleFa.trim()) newErrors.titleFa = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      ue.error(
        isRtl ? "لطفاً فیلدهای اجباری را پر کنید" : "Please fill in all required fields"
      );
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
        subtitleFa
      });
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setSavedArea(created);
      ue.success(
        isRtl ? "حوزه با موفقیت ایجاد شد!" : "Area created successfully!"
      );
      setStep(2);
    } catch {
      setCreateError(
        isRtl ? "خطا در ایجاد حوزه. لطفاً دوباره تلاش کنید." : "Failed to create area. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  };
  const handleCardBgUpload = async (blob) => {
    if (!savedArea) return;
    try {
      const updated = await setAreaCardBackground(savedArea.id, blob);
      if (updated) {
        setSavedArea(updated);
        queryClient.invalidateQueries({ queryKey: ["areas"] });
      }
      ue.success(isRtl ? "تصویر کارت ذخیره شد" : "Card background saved");
    } catch {
      ue.error(t("common.error"));
    }
  };
  const handleBgUploadAndFinish = async (blob) => {
    if (!savedArea) return;
    setIsSavingBg(true);
    try {
      const fn = bgMode === "video" ? setAreaBackgroundVideo : setAreaBackground;
      const updated = await fn(savedArea.id, blob);
      if (updated) {
        setSavedArea(updated);
        queryClient.invalidateQueries({ queryKey: ["areas"] });
      }
      ue.success(isRtl ? "پس‌زمینه ذخیره شد" : "Background saved");
    } catch {
      ue.error(t("common.error"));
    } finally {
      setIsSavingBg(false);
    }
  };
  const totalSteps = 4;
  const canGoPrev = step > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex",
      dir: isRtl ? "rtl" : "ltr",
      "data-ocid": "areas.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: `relative z-10 w-full max-w-lg h-full flex flex-col glass border-white/10 shadow-elevated overflow-hidden ${isRtl ? "mr-auto border-l" : "ml-auto border-r"}`,
            initial: { x: isRtl ? "-100%" : "100%", opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: isRtl ? "-100%" : "100%", opacity: 0 },
            transition: { type: "spring", damping: 30, stiffness: 300 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 ${isRtl ? "flex-row-reverse" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { name: icon, className: "w-4.5 h-4.5 text-primary" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground", children: isRtl ? "ایجاد حوزه جدید" : "Create New Area" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground mt-0.5", children: isRtl ? `مرحله ${step} از ${totalSteps}` : `Step ${step} of ${totalSteps}` })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: onClose,
                        className: "text-muted-foreground hover:text-foreground transition-smooth w-8 h-8 flex items-center justify-center rounded-lg glass border border-white/10",
                        "data-ocid": "areas.close_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-white/10 flex-shrink-0 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WizardStepIndicator, { currentStep: step, isRtl }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: isRtl ? -20 : 20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: isRtl ? 20 : -20 },
                    transition: { duration: 0.22 },
                    className: "flex flex-col gap-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs font-body text-primary flex items-start gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5", children: "ℹ️" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isRtl ? "این مرحله حوزه را ایجاد می‌کند. مراحل بعدی برای افزودن تصاویر و اسلایدها هستند." : "This step creates the area. The next steps let you add images and slides." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SectionDivider,
                        {
                          label: isRtl ? "آیکون حوزه" : "Area Icon",
                          icon: LayoutGrid,
                          isRtl
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-2", children: ICON_OPTIONS.map(({ name, component: Comp }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setIcon(name),
                          "data-ocid": `areas.icon_option_${name.toLowerCase()}`,
                          className: `flex items-center justify-center w-full aspect-square rounded-xl border transition-smooth ${icon === name ? "bg-primary/20 border-primary/50 text-primary" : "glass border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: "w-5 h-5" })
                        },
                        name
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SectionDivider,
                        {
                          label: isRtl ? "عنوان" : "Title",
                          icon: Pen,
                          isRtl
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: "wiz-title-sv",
                              className: "text-sm font-body font-medium text-foreground block mb-1.5",
                              children: [
                                t("admin.areaTitleSv"),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ms-0.5", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlassInput,
                            {
                              id: "wiz-title-sv",
                              value: titleSv,
                              onChange: (v) => {
                                setTitleSv(v);
                                if (v.trim())
                                  setErrors((e) => ({ ...e, titleSv: false }));
                              },
                              placeholder: "Kulturellt",
                              hasError: errors.titleSv,
                              "data-ocid": "areas.title_sv_input"
                            }
                          ),
                          errors.titleSv && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-destructive text-xs mt-1 font-body",
                              "data-ocid": "areas.title_sv_field_error",
                              children: isRtl ? "الزامی است" : "Required"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              htmlFor: "wiz-title-fa",
                              className: "text-sm font-body font-medium text-foreground block mb-1.5",
                              children: [
                                t("admin.areaTitleFa"),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ms-0.5", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlassInput,
                            {
                              id: "wiz-title-fa",
                              value: titleFa,
                              onChange: (v) => {
                                setTitleFa(v);
                                if (v.trim())
                                  setErrors((e) => ({ ...e, titleFa: false }));
                              },
                              placeholder: "فرهنگی",
                              dir: "rtl",
                              hasError: errors.titleFa,
                              "data-ocid": "areas.title_fa_input"
                            }
                          ),
                          errors.titleFa && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-destructive text-xs mt-1 font-body",
                              "data-ocid": "areas.title_fa_field_error",
                              children: isRtl ? "الزامی است" : "Required"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SectionDivider,
                        {
                          label: isRtl ? "زیرعنوان" : "Subtitle",
                          icon: Pen,
                          isRtl
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "wiz-subtitle-sv",
                              className: "text-sm font-body font-medium text-foreground block mb-1.5",
                              children: t("admin.areaSubtitleSv")
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlassInput,
                            {
                              id: "wiz-subtitle-sv",
                              value: subtitleSv,
                              onChange: setSubtitleSv,
                              placeholder: "Konst & evenemang",
                              "data-ocid": "areas.subtitle_sv_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "wiz-subtitle-fa",
                              className: "text-sm font-body font-medium text-foreground block mb-1.5",
                              children: t("admin.areaSubtitleFa")
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            GlassInput,
                            {
                              id: "wiz-subtitle-fa",
                              value: subtitleFa,
                              onChange: setSubtitleFa,
                              placeholder: "هنر و رویدادها",
                              dir: "rtl",
                              "data-ocid": "areas.subtitle_fa_input"
                            }
                          )
                        ] })
                      ] }),
                      createError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "glass rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-body text-destructive",
                          initial: { opacity: 0, y: -6 },
                          animate: { opacity: 1, y: 0 },
                          "data-ocid": "areas.create_error_state",
                          children: createError
                        }
                      )
                    ]
                  },
                  "step1"
                ),
                step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: isRtl ? -20 : 20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: isRtl ? 20 : -20 },
                    transition: { duration: 0.22 },
                    className: "flex flex-col gap-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs font-body text-primary flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isRtl ? `حوزه «${savedArea ? isRtl ? savedArea.titleFa : savedArea.titleSv : ""}» ایجاد شد. اکنون می‌توانید تصویر کارت اضافه کنید.` : `Area "${(savedArea == null ? void 0 : savedArea.titleSv) ?? ""}" created! Now add a card background image (optional).` })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SectionDivider,
                        {
                          label: isRtl ? "تصویر پس‌زمینه کارت" : "Card Background Image",
                          icon: Image,
                          isRtl
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: isRtl ? "تصویری که در کارت حوزه در صفحه اصلی نمایش داده می‌شود. می‌توانید این مرحله را رد کنید." : "The image shown on the area card on the topics page. You can skip this and add it later." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MediaUpload,
                        {
                          accept: "image",
                          label: t("admin.cardBackground"),
                          currentUrl: savedArea == null ? void 0 : savedArea.cardBackground,
                          onUpload: handleCardBgUpload,
                          onUploadingChange: (v) => setIsMediaUploading(v)
                        }
                      )
                    ]
                  },
                  "step2"
                ),
                step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: isRtl ? -20 : 20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: isRtl ? 20 : -20 },
                    transition: { duration: 0.22 },
                    className: "flex flex-col gap-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SectionDivider,
                        {
                          label: isRtl ? "اسلایدهای اصلی" : "Hero Sliders",
                          icon: SlidersHorizontal,
                          isRtl
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: isRtl ? "اسلایدهای بنری صفحه اختصاصی این حوزه را اضافه کنید. می‌توانید این مرحله را رد کنید." : "Add hero banner slides for this area's dedicated page. You can skip this step." }),
                      savedArea && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        HeroSlidesSection,
                        {
                          area: savedArea,
                          allAreas,
                          isRtl
                        }
                      )
                    ]
                  },
                  "step3"
                ),
                step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: isRtl ? -20 : 20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: isRtl ? 20 : -20 },
                    transition: { duration: 0.22 },
                    className: "flex flex-col gap-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SectionDivider,
                        {
                          label: isRtl ? "پس‌زمینه صفحه حوزه" : "Area Page Background",
                          icon: Film,
                          isRtl
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: isRtl ? "پس‌زمینه صفحه اختصاصی این حوزه. می‌توانید تصویر یا ویدیو انتخاب کنید." : "Background for this area's dedicated page. Choose image or video. You can skip and add later." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit",
                          "data-ocid": "areas.bg_mode_toggle",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: () => setBgMode("image"),
                                "data-ocid": "areas.bg_mode_image",
                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${bgMode === "image" ? "bg-primary/30 text-foreground border border-primary/30" : "text-muted-foreground hover:text-foreground"}`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                                  isRtl ? "تصویر" : "Image"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: () => setBgMode("video"),
                                "data-ocid": "areas.bg_mode_video",
                                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${bgMode === "video" ? "bg-accent/30 text-foreground border border-accent/30" : "text-muted-foreground hover:text-foreground"}`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5" }),
                                  isRtl ? "ویدیو" : "Video"
                                ]
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MediaUpload,
                        {
                          accept: bgMode,
                          label: bgMode === "image" ? t("admin.areaBackground") : t("admin.areaBackgroundVideo"),
                          currentUrl: bgMode === "image" ? savedArea == null ? void 0 : savedArea.areaBackground : savedArea == null ? void 0 : savedArea.areaBackgroundVideo,
                          onUpload: handleBgUploadAndFinish,
                          onUploadingChange: (v) => setIsMediaUploading(v)
                        }
                      ),
                      isSavingBg && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-body text-primary flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin", children: "⟳" }),
                        isRtl ? "در حال ذخیره..." : "Saving..."
                      ] })
                    ]
                  },
                  "step4"
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-t border-white/10 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`, children: [
                canGoPrev ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep((s) => s - 1),
                    className: `flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth ${isRtl ? "flex-row-reverse" : ""}`,
                    "data-ocid": "areas.prev_step_button",
                    children: [
                      isRtl ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                      isRtl ? "قبلی" : "Back"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth",
                    "data-ocid": "areas.cancel_button",
                    children: t("common.cancel")
                  }
                ),
                step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    onClick: handleCreateArea,
                    disabled: isCreating,
                    whileHover: { scale: isCreating ? 1 : 1.01 },
                    whileTap: { scale: isCreating ? 1 : 0.98 },
                    className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`,
                    "data-ocid": "areas.create_area_button",
                    children: isCreating ? t("common.loading") : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      isRtl ? "ایجاد حوزه" : "Create Area"
                    ] })
                  }
                ),
                (step === 2 || step === 3) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setStep((s) => s + 1),
                      disabled: isMediaUploading,
                      className: `px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`,
                      "data-ocid": "areas.skip_step_button",
                      children: isRtl ? "رد کردن" : "Skip"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      onClick: () => setStep((s) => s + 1),
                      disabled: isMediaUploading,
                      whileHover: { scale: isMediaUploading ? 1 : 1.01 },
                      whileTap: { scale: isMediaUploading ? 1 : 0.98 },
                      className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`,
                      "data-ocid": "areas.next_step_button",
                      children: [
                        isMediaUploading ? t("admin.upload.uploading") : isRtl ? "بعدی" : "Next",
                        !isMediaUploading && (isRtl ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }))
                      ]
                    }
                  )
                ] }),
                step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      disabled: isMediaUploading,
                      className: `px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5 disabled:opacity-60 ${isRtl ? "flex-row-reverse" : ""}`,
                      "data-ocid": "areas.skip_step_button",
                      children: isRtl ? "رد کردن" : "Skip"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      onClick: onClose,
                      disabled: isMediaUploading,
                      whileHover: { scale: isMediaUploading ? 1 : 1.01 },
                      whileTap: { scale: isMediaUploading ? 1 : 0.98 },
                      className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                      "data-ocid": "areas.finish_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                        isMediaUploading ? t("admin.upload.uploading") : isRtl ? "اتمام" : "Finish"
                      ]
                    }
                  )
                ] })
              ] }) })
            ]
          }
        )
      ]
    }
  );
}
function EditAreaPanel({ area, allAreas, onClose }) {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";
  const [icon, setIcon] = reactExports.useState(area.icon);
  const [titleSv, setTitleSv] = reactExports.useState(area.titleSv);
  const [titleFa, setTitleFa] = reactExports.useState(area.titleFa);
  const [subtitleSv, setSubtitleSv] = reactExports.useState(area.subtitleSv);
  const [subtitleFa, setSubtitleFa] = reactExports.useState(area.subtitleFa);
  const [savedArea, setSavedArea] = reactExports.useState(area);
  const [bgMode, setBgMode] = reactExports.useState("image");
  const updateMutation = useMutation({
    mutationFn: (input) => updateArea(area.id, input),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const cardBgMutation = useMutation({
    mutationFn: ({ id, blob }) => setAreaCardBackground(id, blob),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const areaBgMutation = useMutation({
    mutationFn: ({ id, blob }) => setAreaBackground(id, blob),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const areaBgVideoMutation = useMutation({
    mutationFn: ({ id, blob }) => setAreaBackgroundVideo(id, blob),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      if (updated) setSavedArea(updated);
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const handleSave = () => {
    if (!titleSv.trim()) {
      ue.error(
        isRtl ? "عنوان سوئدی الزامی است" : "Swedish title is required"
      );
      return;
    }
    updateMutation.mutate({ icon, titleSv, titleFa, subtitleSv, subtitleFa });
  };
  const isSaving = updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex",
      dir: isRtl ? "rtl" : "ltr",
      "data-ocid": "areas.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: `relative z-10 w-full max-w-2xl h-full flex flex-col glass border-white/10 shadow-elevated overflow-hidden ${isRtl ? "mr-auto border-l" : "ml-auto border-r"}`,
            initial: { x: isRtl ? "-100%" : "100%", opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: isRtl ? "-100%" : "100%", opacity: 0 },
            transition: { type: "spring", damping: 30, stiffness: 300 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0 ${isRtl ? "flex-row-reverse" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { name: icon, className: "w-4.5 h-4.5 text-primary" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground", children: isRtl ? `ویرایش: ${titleFa || titleSv}` : `Edit: ${titleSv || titleFa}` }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-body text-muted-foreground mt-0.5", children: [
                              "ID: ",
                              area.id
                            ] })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: onClose,
                        className: "text-muted-foreground hover:text-foreground transition-smooth w-8 h-8 flex items-center justify-center rounded-lg glass border border-white/10",
                        "data-ocid": "areas.close_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionDivider,
                    {
                      label: isRtl ? "آیکون حوزه" : "Area Icon",
                      icon: LayoutGrid,
                      isRtl
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-2", children: ICON_OPTIONS.map(({ name, component: Comp }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setIcon(name),
                      className: `flex items-center justify-center w-full aspect-square rounded-xl border transition-smooth ${icon === name ? "bg-primary/20 border-primary/50 text-primary" : "glass border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: "w-5 h-5" })
                    },
                    name
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionDivider,
                    {
                      label: isRtl ? "عنوان" : "Title",
                      icon: Pen,
                      isRtl
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "edit-title-sv",
                          className: "text-sm font-body font-medium text-foreground block mb-1.5",
                          children: t("admin.areaTitleSv")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        GlassInput,
                        {
                          id: "edit-title-sv",
                          value: titleSv,
                          onChange: setTitleSv,
                          placeholder: "Kulturellt",
                          "data-ocid": "areas.title_sv_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "edit-title-fa",
                          className: "text-sm font-body font-medium text-foreground block mb-1.5",
                          children: t("admin.areaTitleFa")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        GlassInput,
                        {
                          id: "edit-title-fa",
                          value: titleFa,
                          onChange: setTitleFa,
                          placeholder: "فرهنگی",
                          dir: "rtl",
                          "data-ocid": "areas.title_fa_input"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionDivider,
                    {
                      label: isRtl ? "زیرعنوان" : "Subtitle",
                      icon: Pen,
                      isRtl
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "edit-subtitle-sv",
                          className: "text-sm font-body font-medium text-foreground block mb-1.5",
                          children: t("admin.areaSubtitleSv")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        GlassInput,
                        {
                          id: "edit-subtitle-sv",
                          value: subtitleSv,
                          onChange: setSubtitleSv,
                          placeholder: "Konst & evenemang",
                          "data-ocid": "areas.subtitle_sv_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "edit-subtitle-fa",
                          className: "text-sm font-body font-medium text-foreground block mb-1.5",
                          children: t("admin.areaSubtitleFa")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        GlassInput,
                        {
                          id: "edit-subtitle-fa",
                          value: subtitleFa,
                          onChange: setSubtitleFa,
                          placeholder: "هنر و رویدادها",
                          dir: "rtl",
                          "data-ocid": "areas.subtitle_fa_input"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionDivider,
                    {
                      label: isRtl ? "تصویر کارت" : "Card Background Image",
                      icon: Image,
                      isRtl
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MediaUpload,
                    {
                      accept: "image",
                      label: t("admin.cardBackground"),
                      currentUrl: savedArea.cardBackground,
                      onUpload: (blob) => cardBgMutation.mutate({ id: savedArea.id, blob })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionDivider,
                    {
                      label: isRtl ? "پس‌زمینه صفحه" : "Area Page Background",
                      icon: Film,
                      isRtl
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex glass border border-white/10 rounded-xl p-1 gap-1 w-fit",
                      "data-ocid": "areas.bg_mode_toggle",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setBgMode("image"),
                            "data-ocid": "areas.bg_mode_image",
                            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${bgMode === "image" ? "bg-primary/30 text-foreground border border-primary/30" : "text-muted-foreground hover:text-foreground"}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                              " ",
                              isRtl ? "تصویر" : "Image"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setBgMode("video"),
                            "data-ocid": "areas.bg_mode_video",
                            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-smooth ${bgMode === "video" ? "bg-accent/30 text-foreground border border-accent/30" : "text-muted-foreground hover:text-foreground"}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5" }),
                              " ",
                              isRtl ? "ویدیو" : "Video"
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MediaUpload,
                    {
                      accept: bgMode,
                      label: bgMode === "image" ? t("admin.areaBackground") : t("admin.areaBackgroundVideo"),
                      currentUrl: bgMode === "image" ? savedArea.areaBackground : savedArea.areaBackgroundVideo,
                      onUpload: (blob) => bgMode === "image" ? areaBgMutation.mutate({ id: savedArea.id, blob }) : areaBgVideoMutation.mutate({ id: savedArea.id, blob })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionDivider,
                    {
                      label: isRtl ? "اسلایدهای اصلی" : "Hero Sliders",
                      icon: SlidersHorizontal,
                      isRtl
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    HeroSlidesSection,
                    {
                      area: savedArea,
                      allAreas,
                      isRtl
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      onClick: handleSave,
                      disabled: isSaving,
                      whileHover: { scale: isSaving ? 1 : 1.01 },
                      whileTap: { scale: isSaving ? 1 : 0.98 },
                      className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                      "data-ocid": "areas.save_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                        isSaving ? t("common.loading") : t("common.save")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "px-5 py-3 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth",
                      "data-ocid": "areas.cancel_button",
                      children: t("common.cancel")
                    }
                  )
                ] }) })
              ] }) })
            ]
          }
        )
      ]
    }
  );
}
function DeleteConfirm({
  area,
  onConfirm,
  onCancel,
  isPending
}) {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const isRtl = adminLang === "fa";
  const title = adminLang === "fa" ? area.titleFa : area.titleSv;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "areas.delete_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            onClick: onCancel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 glass rounded-2xl border border-white/10 p-6 max-w-sm w-full",
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
            dir: isRtl ? "rtl" : "ltr",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-destructive/20 border border-destructive/30 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5 text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground mb-1", children: isRtl ? "حذف حوزه؟" : "Delete Area?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body", children: [
                    "«",
                    title,
                    "»",
                    " ",
                    isRtl ? "برای همیشه حذف خواهد شد." : "will be permanently removed."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    disabled: isPending,
                    onClick: onConfirm,
                    className: "flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-body font-semibold text-sm transition-smooth hover:opacity-90 disabled:opacity-60",
                    "data-ocid": "areas.confirm_button",
                    children: isPending ? t("common.loading") : t("common.delete")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onCancel,
                    className: "px-5 py-2.5 rounded-xl glass border border-white/10 text-sm font-body text-muted-foreground hover:text-foreground transition-smooth",
                    "data-ocid": "areas.delete_cancel_button",
                    children: t("common.cancel")
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function AdminAreas() {
  const { t } = useTranslation();
  const { adminLang } = useAppStore();
  const queryClient = useQueryClient();
  const isRtl = adminLang === "fa";
  const [editTarget, setEditTarget] = reactExports.useState(
    void 0
  );
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: areas = [], isLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
      setDeleteTarget(null);
      ue.success(t("common.success"));
    },
    onError: () => ue.error(t("common.error"))
  });
  const dir = isRtl ? "rtl" : "ltr";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center justify-between mb-8 ${isRtl ? "flex-row-reverse" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-5 h-5 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("admin.areasTitle") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground mt-0.5", children: isRtl ? "مدیریت حوزه‌های فرهنگی، آموزشی و ورزشی" : "Manage cultural, educational and sport areas" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.97 },
                    className: `flex items-center gap-2 glass px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth ${isRtl ? "flex-row-reverse" : ""}`,
                    onClick: () => setEditTarget(null),
                    "data-ocid": "areas.add_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      t("admin.addArea")
                    ]
                  }
                )
              ]
            }
          ),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl glass border border-white/10 overflow-hidden animate-pulse",
              "data-ocid": `areas.loading_state.${i}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-white/5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-3/4 rounded bg-white/5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 rounded bg-white/5" })
                ] })
              ]
            },
            i
          )) }),
          !isLoading && areas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-20 gap-4",
              "data-ocid": "areas.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-8 h-8 text-primary/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: isRtl ? "هیچ حوزه‌ای یافت نشد" : "No areas found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground", children: isRtl ? "اولین حوزه خود را اضافه کنید" : "Add your first area to get started" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.97 },
                    className: `flex items-center gap-2 glass px-5 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth ${isRtl ? "flex-row-reverse" : ""}`,
                    onClick: () => setEditTarget(null),
                    "data-ocid": "areas.empty_add_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      t("admin.addArea")
                    ]
                  }
                )
              ]
            }
          ),
          !isLoading && areas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: areas.map((area, i) => {
            const displayTitle = isRtl ? area.titleFa : area.titleSv;
            const displaySubtitle = isRtl ? area.subtitleFa : area.subtitleSv;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.06 },
                "data-ocid": `areas.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", hoverable: true, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-black/30 overflow-hidden", children: [
                    area.cardBackground ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: area.cardBackground,
                        alt: displayTitle,
                        className: "w-full h-full object-cover",
                        onError: (e) => {
                          e.currentTarget.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      IconComponent,
                      {
                        name: area.icon,
                        className: "w-8 h-8 text-primary/60"
                      }
                    ) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass flex items-center justify-center w-8 h-8 rounded-xl border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      IconComponent,
                      {
                        name: area.icon,
                        className: "w-4 h-4 text-white"
                      }
                    ) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-body font-semibold text-foreground text-sm mb-0.5 truncate", children: displayTitle || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Untitled" }) }),
                    displaySubtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body mb-3 line-clamp-2", children: displaySubtitle }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `flex gap-1.5 mb-3 flex-wrap ${isRtl ? "flex-row-reverse" : ""}`,
                        children: [
                          area.cardBackground && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass border border-white/10 rounded-full px-2 py-0.5 text-[10px] font-body text-muted-foreground flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-2.5 h-2.5" }),
                            " Card"
                          ] }),
                          area.areaBackground && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass border border-white/10 rounded-full px-2 py-0.5 text-[10px] font-body text-muted-foreground flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-2.5 h-2.5" }),
                            " BG"
                          ] }),
                          area.areaBackgroundVideo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass border border-accent/20 rounded-full px-2 py-0.5 text-[10px] font-body text-accent flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-2.5 h-2.5" }),
                            " Video"
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `flex gap-2 ${isRtl ? "flex-row-reverse" : ""}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "flex-1 flex items-center justify-center gap-1.5 glass py-2 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground border border-white/10 transition-smooth",
                              onClick: () => setEditTarget(area),
                              "data-ocid": `areas.edit_button.${i + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3" }),
                                t("common.edit")
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              className: "glass py-2 px-3 rounded-lg text-xs font-body text-muted-foreground hover:text-destructive border border-white/10 transition-smooth",
                              onClick: () => setDeleteTarget(area),
                              "data-ocid": `areas.delete_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ] })
              },
              area.id
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: editTarget === null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateAreaWizard,
      {
        allAreas: areas,
        onClose: () => setEditTarget(void 0)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: editTarget !== null && editTarget !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditAreaPanel,
      {
        area: editTarget,
        allAreas: areas,
        onClose: () => setEditTarget(void 0)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        area: deleteTarget,
        onConfirm: () => deleteMutation.mutate(deleteTarget.id),
        onCancel: () => setDeleteTarget(null),
        isPending: deleteMutation.isPending
      }
    ) })
  ] });
}
export {
  AdminAreas as default,
  deriveTopicFromArea
};
