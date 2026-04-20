/**
 * PageBackground — renders a full-screen fixed background via React Portal so it
 * escapes any stacking context created by parent elements (e.g., framer-motion
 * opacity animations create stacking contexts that trap fixed children).
 *
 * z-index layering:
 *   -1  PageBackground portal  (just behind default stacking context)
 *    0  body default            (transparent by default = background shows)
 *    1  Layout content wrapper  (all page content sits here)
 *   50  Header                  (always on top)
 *
 * CRITICAL: The video element MUST never unmount once created. We achieve this
 * by rendering a single stable container and using refs to update src/state
 * imperatively instead of keying on the URL (which would cause remount flickers).
 *
 * CRITICAL: body must have background: transparent (set in global CSS) so that
 * the z-index:-1 portal shows through.
 */
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------
// Detect video URLs by extension or content-type hint
// ---------------------------------------------------------------------------

export function isVideoUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.includes(".mp4") ||
    lower.includes(".webm") ||
    lower.includes(".mov") ||
    lower.includes("video/")
  );
}

// ---------------------------------------------------------------------------
// Stable video element — never remounts, updates src imperatively via useEffect
// ---------------------------------------------------------------------------

function StableVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Always ensure attributes are set
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Only change src if it actually differs — prevents reloads on re-renders
    if (video.getAttribute("data-src") !== src) {
      video.setAttribute("data-src", src);
      video.src = src;
      video.load();
    }

    const play = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay blocked — showing first frame is acceptable fallback
        });
      }
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", play);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
      muted
      loop
      playsInline
      autoPlay
      onError={() => {}}
    />
  );
}

// ---------------------------------------------------------------------------
// Stable image element — never remounts, updates src imperatively
// ---------------------------------------------------------------------------

function StableImage({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !src) return;
    if (img.src !== src) {
      img.src = src;
    }
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// PageBackground component
// ---------------------------------------------------------------------------

interface PageBackgroundProps {
  /** URL of background image or video — auto-detected from extension */
  url?: string;
  /** Optional explicit video URL (takes priority over url) */
  videoUrl?: string;
  /** Optional dim overlay opacity (default 0.5) */
  dimOpacity?: number;
}

export function PageBackground({
  url,
  videoUrl,
  dimOpacity = 0.5,
}: PageBackgroundProps) {
  const effectiveVideoUrl =
    videoUrl ?? (url && isVideoUrl(url) ? url : undefined);
  const effectiveImageUrl =
    !effectiveVideoUrl && url && !isVideoUrl(url) ? url : undefined;
  const hasBg = Boolean(effectiveVideoUrl || effectiveImageUrl);

  // Always render the portal container at body level so it is never
  // trapped inside a stacking context from framer-motion / transforms.
  // z-index: -1 puts it behind ALL page content but in front of body bg.
  const el = (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        // z-index -1: behind page content (which uses position:relative z-index:1)
        // but in front of the default stacking context.
        // This works as long as body has no background-color (or transparent).
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Media layer — stable elements that never remount */}
      {effectiveVideoUrl && <StableVideo src={effectiveVideoUrl} />}
      {!effectiveVideoUrl && effectiveImageUrl && (
        <StableImage src={effectiveImageUrl} />
      )}

      {/* Dim overlay — separate from media so it never affects video rendering */}
      {hasBg && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(0,0,0,${dimOpacity})`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );

  return createPortal(el, document.body);
}
