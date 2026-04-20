import { useAppStore } from "@/store";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  fullscreen?: boolean;
}

export function Layout({ children, fullscreen = false }: LayoutProps) {
  const { currentDir } = useAppStore();

  return (
    // position:relative + z-index:1 ensures this wrapper sits ABOVE the
    // PageBackground portal (which uses position:fixed z-index:-1 at body level)
    <div
      dir={currentDir}
      className="min-h-screen flex flex-col text-foreground relative"
      style={{ zIndex: 1 }}
    >
      <Header />
      <motion.main
        className={fullscreen ? "flex-1" : "flex-1 pt-20 md:pt-24"}
        // NOTE: do NOT animate opacity on this element — it creates a stacking
        // context that can interfere with fixed children in portals.
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.main>
      {!fullscreen && <Footer />}
    </div>
  );
}
