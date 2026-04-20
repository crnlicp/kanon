import { ExternalBlob } from "@/backend";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Film,
  ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface MediaUploadProps {
  accept: "image" | "video" | "image+video";
  onUpload: (blob: ExternalBlob) => void;
  /** Called when upload starts (true) or finishes/fails (false) — disables parent Save button */
  onUploadingChange?: (isUploading: boolean) => void;
  currentUrl?: string;
  label?: string;
  className?: string;
}

const IMAGE_EXTS = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
const VIDEO_EXTS = ["mp4", "webm", "mov"];

/** 200 KB — images above this threshold are compressed before upload */
const IMAGE_COMPRESSION_THRESHOLD = 200 * 1024;
/** 10 MB — videos above this show a warning modal */
const VIDEO_WARNING_THRESHOLD = 10 * 1024 * 1024;

function getAcceptString(accept: MediaUploadProps["accept"]): string {
  if (accept === "image") return IMAGE_EXTS.map((e) => `image/${e}`).join(",");
  if (accept === "video") return VIDEO_EXTS.map((e) => `video/${e}`).join(",");
  return [
    ...IMAGE_EXTS.map((e) => `image/${e}`),
    ...VIDEO_EXTS.map((e) => `video/${e}`),
  ].join(",");
}

function isVideoUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return VIDEO_EXTS.some((ext) => lower.includes(`.${ext}`));
}

function isVideoFile(file: File): boolean {
  return file.type.startsWith("video/");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Image compression via Canvas API ────────────────────────────────────

async function compressImage(
  file: File,
  maxSizeKB = 190,
): Promise<{ compressed: File; originalSize: number; compressedSize: number }> {
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
                lastModified: Date.now(),
              });
              resolve({ compressed, originalSize, compressedSize: blob.size });
            } else {
              quality -= 0.1;
              tryCompress();
            }
          },
          "image/jpeg",
          quality,
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

// ── Compression / Warning Modal ──────────────────────────────────────────

interface CompressionPreviewModalProps {
  type: "image" | "video";
  originalSize: number;
  compressedSize?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

function CompressionPreviewModal({
  type,
  originalSize,
  compressedSize,
  onConfirm,
  onCancel,
}: CompressionPreviewModalProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="media_upload.dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      />

      <motion.div
        className="relative glass rounded-2xl border border-white/15 p-6 w-full max-w-sm shadow-elevated"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Close"
          data-ocid="media_upload.close_button"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            {type === "image" ? (
              <ImageIcon className="w-5 h-5 text-primary" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <h3 className="font-display text-base font-semibold text-foreground">
            {t("admin.compressionPreview")}
          </h3>
        </div>

        <div className="glass rounded-xl border border-white/10 p-4 flex flex-col gap-3 mb-5">
          {type === "image" && compressedSize !== undefined ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-muted-foreground">
                  {t("admin.originalSize")}
                </span>
                <span className="text-sm font-body font-medium text-foreground tabular-nums">
                  {formatBytes(originalSize)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-white/10" />
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-muted-foreground">
                  {t("admin.compressedSize")}
                </span>
                <span className="text-sm font-body font-semibold text-green-400 tabular-nums">
                  {formatBytes(compressedSize)}
                </span>
              </div>
              {originalSize > 0 && (
                <div className="text-center text-xs font-body text-muted-foreground">
                  {Math.round((1 - compressedSize / originalSize) * 100)}%{" "}
                  savings
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-muted-foreground">
                  File size
                </span>
                <span className="text-sm font-body font-medium text-amber-400 tabular-nums">
                  {formatBytes(originalSize)}
                </span>
              </div>
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                Video file is large ({formatBytes(originalSize)}). Browser video
                compression is not supported. Upload the original file?
              </p>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <motion.button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl glass border border-white/10 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            data-ocid="media_upload.cancel_button"
          >
            {t("admin.cancelUpload")}
          </motion.button>
          <motion.button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-body font-semibold hover:opacity-90 transition-smooth"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            data-ocid="media_upload.confirm_button"
          >
            {t("admin.confirmUpload")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main MediaUpload Component ───────────────────────────────────────────

export function MediaUpload({
  accept,
  onUpload,
  onUploadingChange,
  currentUrl,
  label,
  className,
}: MediaUploadProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [compressionModal, setCompressionModal] = useState<{
    type: "image" | "video";
    originalSize: number;
    compressedSize?: number;
    fileToUpload: File;
  } | null>(null);

  const notifyUploading = useCallback(
    (isUploading: boolean) => {
      onUploadingChange?.(isUploading);
    },
    [onUploadingChange],
  );

  const executeUpload = useCallback(
    async (file: File) => {
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
    [onUpload, notifyUploading, t],
  );

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      const isVid = isVideoFile(file);

      if (!isVid && file.size > IMAGE_COMPRESSION_THRESHOLD) {
        try {
          const { compressed, originalSize, compressedSize } =
            await compressImage(file, 190);
          setCompressionModal({
            type: "image",
            originalSize,
            compressedSize,
            fileToUpload: compressed,
          });
        } catch {
          setCompressionModal({
            type: "image",
            originalSize: file.size,
            compressedSize: file.size,
            fileToUpload: file,
          });
        }
        return;
      }

      if (isVid && file.size > VIDEO_WARNING_THRESHOLD) {
        setCompressionModal({
          type: "video",
          originalSize: file.size,
          fileToUpload: file,
        });
        return;
      }

      // Small file — auto-upload immediately
      await executeUpload(file);
    },
    [executeUpload],
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
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
  // Determine video: check file type first (newly selected), then URL extension
  const isVideo = selectedFile
    ? isVideoFile(selectedFile)
    : displayUrl
      ? isVideoUrl(displayUrl)
      : false;
  const isUploading = progress !== null && progress < 100;

  return (
    <>
      <div className={cn("flex flex-col gap-3", className)}>
        {label && (
          <span className="text-sm font-body font-medium text-foreground">
            {label}
          </span>
        )}

        {/* Media preview — max 160px height; video shows native controls */}
        {displayUrl && (
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20">
            {isVideo ? (
              <video
                src={displayUrl}
                className="w-full object-cover"
                style={{ maxHeight: "160px" }}
                muted
                playsInline
                controls
              />
            ) : (
              <img
                src={displayUrl}
                alt={label ?? "Media preview"}
                className="w-full object-cover"
                style={{ maxHeight: "160px" }}
              />
            )}
            {previewUrl && (
              <button
                type="button"
                onClick={clearPreview}
                className="absolute top-2 right-2 glass w-7 h-7 rounded-full flex items-center justify-center border border-white/20 text-white/80 hover:text-white transition-smooth"
                aria-label="Remove preview"
                data-ocid="media_upload.close_button"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            {isVideo && (
              <div className="absolute top-2 left-2 glass px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 text-white text-xs font-body pointer-events-none">
                <Film className="w-3 h-3" />
                Video
              </div>
            )}
          </div>
        )}

        {/* Drop zone */}
        <button
          type="button"
          aria-label={t("admin.upload.dragDrop")}
          disabled={isUploading}
          className={cn(
            "relative w-full rounded-xl border-2 border-dashed transition-smooth cursor-pointer",
            "backdrop-blur-sm bg-white/[0.03]",
            "flex flex-col items-center justify-center gap-2 py-6 px-4",
            isUploading
              ? "border-primary/40 cursor-not-allowed opacity-80"
              : dragging
                ? "border-primary/60 bg-primary/5 scale-[1.01]"
                : "border-white/15 hover:border-primary/40 hover:bg-white/[0.05]",
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isUploading && inputRef.current?.click()}
          data-ocid="media_upload.dropzone"
        >
          <input
            ref={inputRef}
            type="file"
            accept={getAcceptString(accept)}
            className="sr-only"
            onChange={handleFileChange}
            data-ocid="media_upload.upload_button"
          />

          {progress !== null ? (
            <>
              <div className="w-10 h-10 rounded-full glass border border-primary/30 flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <p className="text-sm font-body text-muted-foreground">
                {t("admin.upload.uploading")} {progress}%
              </p>
              <div className="w-full max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center">
                {accept === "video" ? (
                  <Film className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-body text-foreground font-medium">
                  {t("admin.upload.dragDrop")}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  {t("admin.upload.browse")}
                </p>
              </div>
              {selectedFile && (
                <div className="glass px-3 py-1 rounded-full border border-white/10 text-xs font-body text-muted-foreground">
                  {selectedFile.name} · {formatBytes(selectedFile.size)}
                </div>
              )}
            </>
          )}
        </button>

        {error && (
          <p
            className="text-xs font-body text-destructive"
            data-ocid="media_upload.error_state"
          >
            {error}
          </p>
        )}

        {progress === 100 && !error && (
          <p
            className="text-xs font-body text-green-400"
            data-ocid="media_upload.success_state"
          >
            {t("admin.upload.success")}
          </p>
        )}
      </div>

      <AnimatePresence>
        {compressionModal && (
          <CompressionPreviewModal
            type={compressionModal.type}
            originalSize={compressionModal.originalSize}
            compressedSize={compressionModal.compressedSize}
            onConfirm={handleCompressionConfirm}
            onCancel={handleCompressionCancel}
          />
        )}
      </AnimatePresence>
    </>
  );
}
