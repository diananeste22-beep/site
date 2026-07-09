// "use client";

// import type { CSSProperties } from "react";
// import Image from "next/image";
// import { FlickeringGrid } from "@/components/ui/flickering-grid";
// import { motion, useReducedMotion } from "framer-motion";

// const ease = [0.22, 1, 0.36, 1] as const;
// const morphWords = ["бизнеса", "артистов", "брендов"];

// export default function AnimatedHero() {
//   const shouldReduceMotion = useReducedMotion();

//   const instant = shouldReduceMotion ? { duration: 0 } : undefined;
//   const introTransition = instant ?? { duration: 0.45, ease };
//   const titleTransition = instant ?? { duration: 0.55, delay: 0.35, ease };
//   const photoTransition = instant ?? { duration: 0.65, delay: 0.95, ease };
//   const supportTransition = instant ?? { duration: 0.45, delay: 1.25, ease };

//   return (
//     <section className="relative isolate min-h-[720px] overflow-hidden bg-[#f1f8ff] px-5 pb-14 pt-28 sm:px-8 lg:min-h-screen lg:px-12 lg:pb-12 lg:pt-24">
//       <FlickeringGrid
//         className="hero-grid pointer-events-none absolute inset-0 z-0"
//         squareSize={3}
//         gridGap={15}
//         flickerChance={0.48}
//         color="#2d63fc"
//         maxOpacity={0.24}
//       />

//       <div className="relative z-10 mx-auto grid w-full max-w-[1360px] gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
//         <div className="relative z-10 max-w-5xl pt-8 sm:pt-16 lg:pt-0">
//           <motion.p
//             className="mb-8 text-xl font-bold leading-tight text-[#0b0b0b]/58 sm:text-2xl"
//             initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={introTransition}
//           >
//             Йоо, я Арсений
//           </motion.p>

//           <motion.h1
//             className="hero-title text-[48px] font-black leading-[0.92] text-[#0b0b0b] sm:text-[68px] lg:text-[94px] xl:text-[108px]"
//             initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={titleTransition}
//           >
//             <span className="block">Делаю дизайн</span>
//             <span className="hero-morph-line block" aria-label="для бизнеса, артистов и брендов">
//               <span className="text-[#0b0b0b]">для </span>
//               <span className="hero-morph-word-wrap text-[#2d63fc]">
//                 {morphWords.map((word, index) => (
//                   <span key={word} className="hero-morph-word" style={{ "--word-index": index } as CSSProperties}>
//                     {word}
//                   </span>
//                 ))}
//               </span>
//             </span>
//           </motion.h1>

//           <motion.div
//             className="mt-10 flex flex-col gap-7"
//             initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={supportTransition}
//           >
//             <p className="max-w-xl text-base font-semibold leading-7 text-[#0b0b0b]/68 sm:text-xl sm:leading-8">
//               <span className="block">От UI/UX для бизнеса до визуального стиля</span>
//               <span className="block">для западных артистов</span>
//             </p>

//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//               <a
//                 href="#portfolio"
//                 className="inline-flex h-14 items-center justify-center rounded-lg bg-[#0b0b0b] px-6 text-sm font-extrabold text-[#f1f8ff] outline-none transition hover:bg-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
//               >
//                 Смотреть портфолио
//               </a>
//               <a
//                 href="#contacts"
//                 className="inline-flex h-14 items-center justify-center gap-3 rounded-lg border border-[#0b0b0b]/14 bg-[#f1f8ff]/76 px-6 text-sm font-extrabold text-[#0b0b0b] outline-none backdrop-blur transition hover:border-[#2d63fc]/40 hover:text-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
//               >
//                 <span className="grid h-7 w-7 place-items-center rounded bg-[#2d63fc] text-[#f1f8ff]">↗</span>
//                 Обсудить проект
//               </a>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           className="hero-photo-wrap relative flex min-h-[440px] items-end justify-center sm:min-h-[620px] lg:min-h-[calc(100vh-8rem)] lg:justify-end"
//           aria-label="Фотография Арсения"
//           initial={shouldReduceMotion ? false : { opacity: 0, x: 40, scale: 0.96 }}
//           animate={{ opacity: 1, x: 0, scale: 1 }}
//           transition={photoTransition}
//         >
//           <div className="absolute bottom-12 right-4 h-64 w-64 rounded-full bg-[#2d63fc]/10 blur-3xl sm:h-96 sm:w-96 lg:bottom-24 lg:right-16" aria-hidden="true" />
//           <Image
//             src="/photo/i.png"
//             alt="Арсений, графический дизайнер"
//             width={1120}
//             height={1120}
//             priority
//             sizes="(max-width: 1024px) 100vw, 56vw"
//             className="hero-photo relative z-10 h-auto w-full max-w-[700px] object-contain sm:max-w-[900px] lg:max-w-[1040px] xl:max-w-[1120px]"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const morphWords = ["бизнеса", "артистов", "блогеров"];
const MORPH_INTERVAL = 3000;

const wordVariants = {
  enter: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.028 } },
};

const letterVariants = {
  initial: { y: "0.6em", opacity: 0, scale: 0.94, filter: "blur(70px)" },
  enter: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease },
  },
  exit: {
    y: "-0.5em",
    opacity: 0,
    scale: 0.97,
    filter: "blur(12px)",
    transition: { duration: 0.4, ease: [0.55, 0, 0.55, 0.2] as const },
  },
};

function MorphingWord({ words, className = "" }: { words: string[]; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const sizerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), MORPH_INTERVAL);
    return () => clearInterval(id);
  }, [shouldReduceMotion, words.length]);

  useEffect(() => {
    const measure = () => {
      const el = sizerRefs.current[index];
      if (el) setWidth(el.offsetWidth);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  const word = words[index];

  return (
    <motion.span
      aria-hidden="true"
      className={`relative inline-block whitespace-nowrap align-top ${className}`}
      animate={width !== null ? { width } : undefined}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 220, damping: 30, mass: 0.9 }
      }
    >
      {/* невидимые копии слов — по ним измеряется ширина */}
      <span className="pointer-events-none invisible absolute left-0 top-0" aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              sizerRefs.current[i] = el;
            }}
            className="absolute left-0 top-0"
          >
            {w}
          </span>
        ))}
      </span>

      <AnimatePresence mode="popLayout" initial={false}>
        {shouldReduceMotion ? (
          <span key={word} className="inline-block">
            {word}
          </span>
        ) : (
          <motion.span
            key={word}
            className="inline-block"
            variants={wordVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {word.split("").map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className="inline-block will-change-transform"
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

export default function AnimatedHero() {
  const shouldReduceMotion = useReducedMotion();

  const instant = shouldReduceMotion ? { duration: 0 } : undefined;
  const introTransition = instant ?? { duration: 0.45, ease };
  const titleTransition = instant ?? { duration: 0.55, delay: 0.35, ease };
  const photoTransition = instant ?? { duration: 0.65, delay: 0.95, ease };
  const supportTransition = instant ?? { duration: 0.45, delay: 1.25, ease };

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-[#f1f8ff] px-5 pb-14 pt-28 sm:px-8 lg:min-h-screen lg:px-12 lg:pb-12 lg:pt-24">
      <FlickeringGrid
        className="hero-grid pointer-events-none absolute inset-0 z-0"
        squareSize={3}
        gridGap={15}
        flickerChance={0.48}
        color="#2d63fc"
        maxOpacity={0.24}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative z-10 max-w-5xl pt-8 sm:pt-16 lg:pt-0">
          <motion.p
            className="mb-8 text-xl font-bold leading-tight text-[#0b0b0b]/58 sm:text-2xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={introTransition}
          >
            Йоо, я Арсений
          </motion.p>

          <motion.h1
            className="hero-title text-[48px] font-black leading-[0.96] text-[#0b0b0b] sm:text-[68px] lg:text-[94px] xl:text-[108px]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={titleTransition}
          >
            {/* строка 1 */}
            <span className="block whitespace-nowrap">Делаю дизайн</span>
            {/* строка 2: «для» + прокрутка слов */}
            <span className="block whitespace-nowrap" aria-label="для бизнеса, артистов и блоегров">
              <span className="text-[#0b0b0b]" aria-hidden="true">
                для{" "}
              </span>
              <MorphingWord words={morphWords} className="text-[#2d63fc]" />
            </span>
          </motion.h1>

          <motion.div
            className="mt-10 flex flex-col gap-7"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={supportTransition}
          >
            <p className="max-w-xl text-base font-semibold leading-7 text-[#0b0b0b]/68 sm:text-xl sm:leading-8">
              <span className="block">От UI/UX для бизнеса до визуального стиля</span>
              <span className="block">для западных артистов</span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#portfolio" className="btn-ghost">
                {"Смотреть портфолио"}
                <span className="btn-arrow" aria-hidden="true">{"↗"}</span>
              </a>
              <a href="#contacts" className="btn-ghost">
                {"Обсудить проект"}
                <span className="btn-arrow" aria-hidden="true">{"↗"}</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-photo-wrap relative flex min-h-[440px] items-end justify-center sm:min-h-[620px] lg:min-h-[calc(100vh-8rem)] lg:justify-end"
          aria-label="Фотография Арсения"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={photoTransition}
        >
          <div className="absolute bottom-12 right-4 h-64 w-64 rounded-full bg-[#2d63fc]/10 blur-3xl sm:h-96 sm:w-96 lg:bottom-24 lg:right-16" aria-hidden="true" />
          <Image
            src="/photo/i.png"
            alt="Арсений, графический дизайнер"
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