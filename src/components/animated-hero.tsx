"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const niches = ["\u0431\u0438\u0437\u043d\u0435\u0441\u0430", "\u0430\u0440\u0442\u0438\u0441\u0442\u043e\u0432", "\u0431\u0440\u0435\u043d\u0434\u043e\u0432"];

export default function AnimatedHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeNiche, setActiveNiche] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveNiche((current) => (current + 1) % niches.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  const instant = shouldReduceMotion ? { duration: 0 } : undefined;
  const introTransition = instant ?? { duration: 0.45, ease };
  const titleInTransition = instant ?? { duration: 0.55, delay: 0.45, ease };
  const titleSettleTransition = instant ?? { duration: 0.65, delay: 1.1, ease };
  const photoTransition = instant ?? { duration: 0.65, delay: 1.35, ease };
  const supportTransition = instant ?? { duration: 0.45, delay: 1.75, ease };
  const wordTransition = instant ?? { duration: 0.52, ease };

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-[#f1f0ec] px-5 pb-14 pt-28 sm:px-8 lg:min-h-screen lg:px-12 lg:pb-12 lg:pt-24">
      <FlickeringGrid
        className="hero-grid pointer-events-none absolute inset-0 z-0"
        squareSize={3}
        gridGap={15}
        flickerChance={0.48}
        color="#2d63fc"
        maxOpacity={0.24}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          className="relative z-10 max-w-5xl pt-8 sm:pt-16 lg:pt-0"
          initial={shouldReduceMotion ? false : { x: 56 }}
          animate={{ x: 0 }}
          transition={titleSettleTransition}
        >
          <motion.p
            className="mb-8 text-xl font-bold leading-tight text-[#272727]/58 sm:text-2xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={introTransition}
          >
            {"\u0419\u043e, \u044f \u0410\u0440\u0441\u0435\u043d\u0438\u0439"}
          </motion.p>

          <motion.h1
            className="hero-title text-[48px] font-black leading-[0.9] text-[#272727] sm:text-[68px] lg:text-[94px] xl:text-[108px]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={titleInTransition}
          >
            <span className="block whitespace-nowrap">{"\u0414\u0435\u043b\u0430\u044e \u0434\u0438\u0437\u0430\u0439\u043d"}</span>
            <span className="hero-niche-row mt-3 flex items-baseline gap-[0.18em] whitespace-nowrap">
              <span>{"\u0434\u043b\u044f"}</span>
              <span className="hero-niche-mask text-[#2d63fc]" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={niches[activeNiche]}
                    className="hero-niche-word"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(14px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -24, filter: "blur(14px)" }}
                    transition={wordTransition}
                  >
                    {niches[activeNiche]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          <motion.div
            className="mt-10 flex flex-col gap-7"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={supportTransition}
          >
            <p className="max-w-xl text-base font-semibold leading-7 text-[#272727]/68 sm:text-xl sm:leading-8">
              <span className="block">{"\u041e\u0442 UI/UX \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430 \u0434\u043e \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0441\u0442\u0438\u043b\u044f"}</span>
              <span className="block">{"\u0434\u043b\u044f \u0437\u0430\u043f\u0430\u0434\u043d\u044b\u0445 \u0430\u0440\u0442\u0438\u0441\u0442\u043e\u0432"}</span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#portfolio"
                className="inline-flex h-14 items-center justify-center rounded-lg bg-[#272727] px-6 text-sm font-extrabold text-[#f1f0ec] outline-none transition hover:bg-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
              >
                {"\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e"}
              </a>
              <a
                href="#contacts"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border border-[#272727]/14 bg-[#f1f0ec]/76 px-6 text-sm font-extrabold text-[#272727] outline-none backdrop-blur transition hover:border-[#2d63fc]/40 hover:text-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
              >
                <span className="grid h-7 w-7 place-items-center rounded bg-[#2d63fc] text-[#f1f0ec]">{"\u2197"}</span>
                {"\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442"}
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-photo-wrap relative flex min-h-[440px] items-end justify-center sm:min-h-[620px] lg:min-h-[calc(100vh-8rem)] lg:justify-end"
          aria-label="\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044f \u0410\u0440\u0441\u0435\u043d\u0438\u044f"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={photoTransition}
        >
          <div className="absolute bottom-12 right-4 h-64 w-64 rounded-full bg-[#2d63fc]/10 blur-3xl sm:h-96 sm:w-96 lg:bottom-24 lg:right-16" aria-hidden="true" />
          <Image
            src="/photo/i.png"
            alt="\u0410\u0440\u0441\u0435\u043d\u0438\u0439, \u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440"
            width={1120}
            height={1120}
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="hero-photo relative z-10 h-auto w-full max-w-[700px] object-contain sm:max-w-[900px] lg:max-w-[1040px] xl:max-w-[1120px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
