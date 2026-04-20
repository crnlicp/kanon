import type { HeroSlide } from "@/lib/types";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface HeroSliderProps {
  slides: HeroSlide[];
  lang: Lang;
  className?: string;
}

export function HeroSlider({ slides, lang, className }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % slides.length, 1);
  }, [currentIndex, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + slides.length) % slides.length, -1);
  }, [currentIndex, slides.length, goTo]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!slides.length) return null;

  const slide = slides[currentIndex];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-2xl", className)}
      data-ocid="hero.slider"
    >
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            duration: 0.6,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="relative w-full aspect-[16/7] min-h-[320px]"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Content */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-body">
              {slide.subtitle[lang]}
            </p>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 max-w-2xl">
              {slide.title[lang]}
            </h2>
            <motion.a
              href={slide.ctaUrl}
              className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-lg text-sm font-body font-medium text-foreground w-fit border border-primary/40 bg-primary/20 hover:bg-primary/30 transition-smooth"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-ocid="hero.cta_button"
            >
              {slide.ctaLabel[lang]}
            </motion.a>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <motion.button
            className="absolute left-3 top-1/2 -translate-y-1/2 glass w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-foreground z-10"
            onClick={prev}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
            data-ocid="hero.prev_button"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            className="absolute right-3 top-1/2 -translate-y-1/2 glass w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-foreground z-10"
            onClick={next}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
            data-ocid="hero.next_button"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((slide, i) => (
              <motion.button
                key={slide.id}
                className={cn(
                  "rounded-full transition-smooth",
                  i === currentIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60",
                )}
                onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                data-ocid={`hero.dot.${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
