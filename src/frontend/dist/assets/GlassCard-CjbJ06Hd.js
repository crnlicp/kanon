import { f as cn, j as jsxRuntimeExports, m as motion } from "./index-BsZ-DJdz.js";
function GlassCard({
  children,
  className,
  hoverable = false,
  onClick,
  "data-ocid": ocid
}) {
  const baseClasses = cn(
    "glass rounded-xl border border-white/10 backdrop-blur-lg",
    hoverable && "cursor-pointer",
    className
  );
  if (hoverable) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: baseClasses,
        onClick,
        "data-ocid": ocid,
        whileHover: {
          y: -4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(99,102,241,0.15)"
        },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
        children
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: baseClasses,
      "data-ocid": ocid,
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      children
    }
  );
}
export {
  GlassCard as G
};
