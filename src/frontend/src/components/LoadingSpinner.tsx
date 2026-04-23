import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

export function LoadingSpinner({
  fullScreen = false,
  size = "md",
}: LoadingSpinnerProps) {
  const { t } = useTranslation();
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className={`${sizeMap[size]} rounded-full border-2 border-white/10 border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      {size !== "sm" && (
        <motion.p
          className="text-muted-foreground text-sm font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t("common.loading")}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center glass-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {spinner}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">{spinner}</div>
  );
}
