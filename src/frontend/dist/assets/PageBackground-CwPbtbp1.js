import { l as reactDomExports, j as jsxRuntimeExports, r as reactExports } from "./index-BsZ-DJdz.js";
function isVideoUrl(url) {
  const lower = url.toLowerCase();
  return lower.includes(".mp4") || lower.includes(".webm") || lower.includes(".mov") || lower.includes("video/");
}
function StableVideo({ src }) {
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    if (video.getAttribute("data-src") !== src) {
      video.setAttribute("data-src", src);
      video.src = src;
      video.load();
    }
    const play = () => {
      const promise = video.play();
      if (promise !== void 0) {
        promise.catch(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "video",
    {
      ref: videoRef,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      },
      muted: true,
      loop: true,
      playsInline: true,
      autoPlay: true,
      onError: () => {
      }
    }
  );
}
function StableImage({ src }) {
  const imgRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const img = imgRef.current;
    if (!img || !src) return;
    if (img.src !== src) {
      img.src = src;
    }
  }, [src]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      ref: imgRef,
      src,
      alt: "",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    }
  );
}
function PageBackground({
  url,
  videoUrl,
  dimOpacity = 0.5
}) {
  const effectiveVideoUrl = videoUrl ?? (url && isVideoUrl(url) ? url : void 0);
  const effectiveImageUrl = !effectiveVideoUrl && url && !isVideoUrl(url) ? url : void 0;
  const hasBg = Boolean(effectiveVideoUrl || effectiveImageUrl);
  const el = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": "true",
      style: {
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
        pointerEvents: "none"
      },
      children: [
        effectiveVideoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(StableVideo, { src: effectiveVideoUrl }),
        !effectiveVideoUrl && effectiveImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(StableImage, { src: effectiveImageUrl }),
        hasBg && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              background: `rgba(0,0,0,${dimOpacity})`,
              pointerEvents: "none"
            }
          }
        )
      ]
    }
  );
  return reactDomExports.createPortal(el, document.body);
}
export {
  PageBackground as P
};
