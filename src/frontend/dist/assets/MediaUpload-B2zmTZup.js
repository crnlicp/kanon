import { n as createLucideIcon, c as useTranslation, r as reactExports, ac as ExternalBlob, j as jsxRuntimeExports, X, f as cn, A as AnimatePresence, m as motion } from "./index-BsZ-DJdz.js";
import { F as Film } from "./film-DoEpsxOc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image$1 = createLucideIcon("image", __iconNode$2);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const IMAGE_EXTS = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
const VIDEO_EXTS = ["mp4", "webm", "mov"];
const IMAGE_COMPRESSION_THRESHOLD = 200 * 1024;
const VIDEO_WARNING_THRESHOLD = 10 * 1024 * 1024;
function getAcceptString(accept) {
  if (accept === "image") return IMAGE_EXTS.map((e) => `image/${e}`).join(",");
  if (accept === "video") return VIDEO_EXTS.map((e) => `video/${e}`).join(",");
  return [
    ...IMAGE_EXTS.map((e) => `image/${e}`),
    ...VIDEO_EXTS.map((e) => `video/${e}`)
  ].join(",");
}
function isVideoUrl(url) {
  const lower = url.toLowerCase();
  return VIDEO_EXTS.some((ext) => lower.includes(`.${ext}`));
}
function isVideoFile(file) {
  return file.type.startsWith("video/");
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
async function compressImage(file, maxSizeKB = 190) {
  const originalSize = file.size;
  const maxBytes = maxSizeKB * 1024;
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      const MAX_DIM = 1920;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      let quality = 0.8;
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas compression failed"));
              return;
            }
            if (blob.size <= maxBytes || quality <= 0.3) {
              const compressed = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now()
              });
              resolve({ compressed, originalSize, compressedSize: blob.size });
            } else {
              quality -= 0.1;
              tryCompress();
            }
          },
          "image/jpeg",
          quality
        );
      };
      tryCompress();
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    img.src = objectUrl;
  });
}
function CompressionPreviewModal({
  type,
  originalSize,
  compressedSize,
  onConfirm,
  onCancel
}) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "media_upload.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: onCancel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative glass rounded-2xl border border-white/15 p-6 w-full max-w-sm shadow-elevated",
            initial: { opacity: 0, scale: 0.92, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.92, y: 20 },
            transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  className: "absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close",
                  "data-ocid": "media_upload.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0", children: type === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-5 h-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-amber-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground", children: t("admin.compressionPreview") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-xl border border-white/10 p-4 flex flex-col gap-3 mb-5", children: type === "image" && compressedSize !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-muted-foreground", children: t("admin.originalSize") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium text-foreground tabular-nums", children: formatBytes(originalSize) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-green-400 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-white/10" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-muted-foreground", children: t("admin.compressedSize") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-semibold text-green-400 tabular-nums", children: formatBytes(compressedSize) })
                ] }),
                originalSize > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs font-body text-muted-foreground", children: [
                  Math.round((1 - compressedSize / originalSize) * 100),
                  "%",
                  " ",
                  "savings"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-muted-foreground", children: "File size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium text-amber-400 tabular-nums", children: formatBytes(originalSize) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-body text-muted-foreground leading-relaxed", children: [
                  "Video file is large (",
                  formatBytes(originalSize),
                  "). Browser video compression is not supported. Upload the original file?"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    onClick: onCancel,
                    className: "flex-1 py-2 rounded-xl glass border border-white/10 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth",
                    whileHover: { scale: 1.01 },
                    whileTap: { scale: 0.97 },
                    "data-ocid": "media_upload.cancel_button",
                    children: t("admin.cancelUpload")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    onClick: onConfirm,
                    className: "flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-body font-semibold hover:opacity-90 transition-smooth",
                    whileHover: { scale: 1.01 },
                    whileTap: { scale: 0.97 },
                    "data-ocid": "media_upload.confirm_button",
                    children: t("admin.confirmUpload")
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
function MediaUpload({
  accept,
  onUpload,
  onUploadingChange,
  currentUrl,
  label,
  className
}) {
  const { t } = useTranslation();
  const inputRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [compressionModal, setCompressionModal] = reactExports.useState(null);
  const notifyUploading = reactExports.useCallback(
    (isUploading2) => {
      onUploadingChange == null ? void 0 : onUploadingChange(isUploading2);
    },
    [onUploadingChange]
  );
  const executeUpload = reactExports.useCallback(
    async (file) => {
      setError(null);
      notifyUploading(true);
      try {
        setProgress(0);
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setProgress(Math.round(pct));
        });
        onUpload(blob);
        setProgress(100);
        setTimeout(() => {
          setProgress(null);
          notifyUploading(false);
        }, 1200);
      } catch (err) {
        setError(t("admin.upload.error"));
        setProgress(null);
        notifyUploading(false);
        console.error("MediaUpload error:", err);
      }
    },
    [onUpload, notifyUploading, t]
  );
  const processFile = reactExports.useCallback(
    async (file) => {
      setError(null);
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      const isVid = isVideoFile(file);
      if (!isVid && file.size > IMAGE_COMPRESSION_THRESHOLD) {
        try {
          const { compressed, originalSize, compressedSize } = await compressImage(file, 190);
          setCompressionModal({
            type: "image",
            originalSize,
            compressedSize,
            fileToUpload: compressed
          });
        } catch {
          setCompressionModal({
            type: "image",
            originalSize: file.size,
            compressedSize: file.size,
            fileToUpload: file
          });
        }
        return;
      }
      if (isVid && file.size > VIDEO_WARNING_THRESHOLD) {
        setCompressionModal({
          type: "video",
          originalSize: file.size,
          fileToUpload: file
        });
        return;
      }
      await executeUpload(file);
    },
    [executeUpload]
  );
  const handleCompressionConfirm = async () => {
    if (!compressionModal) return;
    const { fileToUpload } = compressionModal;
    setCompressionModal(null);
    await executeUpload(fileToUpload);
  };
  const handleCompressionCancel = () => {
    setCompressionModal(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) processFile(file);
  };
  const handleDrop = reactExports.useCallback(
    (e) => {
      var _a;
      e.preventDefault();
      setDragging(false);
      const file = (_a = e.dataTransfer.files) == null ? void 0 : _a[0];
      if (file) processFile(file);
    },
    [processFile]
  );
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const clearPreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setProgress(null);
    setCompressionModal(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  const displayUrl = previewUrl ?? currentUrl;
  const isVideo = selectedFile ? isVideoFile(selectedFile) : displayUrl ? isVideoUrl(displayUrl) : false;
  const isUploading = progress !== null && progress < 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-3", className), children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium text-foreground", children: label }),
      displayUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden border border-white/10 bg-black/20", children: [
        isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            src: displayUrl,
            className: "w-full object-cover",
            style: { maxHeight: "160px" },
            muted: true,
            playsInline: true,
            controls: true
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: displayUrl,
            alt: label ?? "Media preview",
            className: "w-full object-cover",
            style: { maxHeight: "160px" }
          }
        ),
        previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearPreview,
            className: "absolute top-2 right-2 glass w-7 h-7 rounded-full flex items-center justify-center border border-white/20 text-white/80 hover:text-white transition-smooth",
            "aria-label": "Remove preview",
            "data-ocid": "media_upload.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        ),
        isVideo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 glass px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 text-white text-xs font-body pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3" }),
          "Video"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "aria-label": t("admin.upload.dragDrop"),
          disabled: isUploading,
          className: cn(
            "relative w-full rounded-xl border-2 border-dashed transition-smooth cursor-pointer",
            "backdrop-blur-sm bg-white/[0.03]",
            "flex flex-col items-center justify-center gap-2 py-6 px-4",
            isUploading ? "border-primary/40 cursor-not-allowed opacity-80" : dragging ? "border-primary/60 bg-primary/5 scale-[1.01]" : "border-white/15 hover:border-primary/40 hover:bg-white/[0.05]"
          ),
          onDrop: handleDrop,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onClick: () => {
            var _a;
            return !isUploading && ((_a = inputRef.current) == null ? void 0 : _a.click());
          },
          "data-ocid": "media_upload.dropzone",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                type: "file",
                accept: getAcceptString(accept),
                className: "sr-only",
                onChange: handleFileChange,
                "data-ocid": "media_upload.upload_button"
              }
            ),
            progress !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full glass border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-primary animate-pulse" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body text-muted-foreground", children: [
                t("admin.upload.uploading"),
                " ",
                progress,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary rounded-full transition-all duration-300",
                  style: { width: `${progress}%` }
                }
              ) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center", children: accept === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-5 h-5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground font-medium", children: t("admin.upload.dragDrop") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground mt-0.5", children: t("admin.upload.browse") })
              ] }),
              selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass px-3 py-1 rounded-full border border-white/10 text-xs font-body text-muted-foreground", children: [
                selectedFile.name,
                " · ",
                formatBytes(selectedFile.size)
              ] })
            ] })
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs font-body text-destructive",
          "data-ocid": "media_upload.error_state",
          children: error
        }
      ),
      progress === 100 && !error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs font-body text-green-400",
          "data-ocid": "media_upload.success_state",
          children: t("admin.upload.success")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: compressionModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompressionPreviewModal,
      {
        type: compressionModal.type,
        originalSize: compressionModal.originalSize,
        compressedSize: compressionModal.compressedSize,
        onConfirm: handleCompressionConfirm,
        onCancel: handleCompressionCancel
      }
    ) })
  ] });
}
export {
  Image$1 as I,
  MediaUpload as M,
  TriangleAlert as T
};
