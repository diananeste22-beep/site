"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import EngCells from "@/components/eng-cells";

type Fact = { value: string; label: string };
type Collab = { name: string; field: string; followers: string; unit?: string };

type AboutSectionProps = {
  title: string;
  paragraphs: string[];
  facts: Fact[];
  collaborations?: Collab[];
};

/* "120+" → { num: 120, suffix: "+" }, "2" → { num: 2, suffix: "" } */
function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export default function AboutSection({ title, paragraphs, facts, collaborations = [] }: AboutSectionProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  /* desktop  → цифры привязаны к прокрутке «залипающей» секции
     mobile   → плавный count-up по таймеру при появлении в зоне видимости */
  /* по умолчанию false: не даём десктоп-логике (привязке к скроллу)
     сработать на мобайле до определения ширины */
  const [isDesktop, setIsDesktop] = useState(false);
  const [runMobile, setRunMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setIsDesktop(desktop);

    /* на десктопе счётчик ведёт прокрутка — наблюдатель не нужен */
    if (desktop) return;

    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRunMobile(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" ref={wrapRef} className="section-band about-band about-pin-wrap px-5 sm:px-8 lg:px-12">
      <div className="about-pin-inner">
        <div className="mx-auto w-full max-w-[1360px]">
          <h2 className="about-title text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[#f1f8ff] sm:text-6xl lg:text-7xl">
            {title}
          </h2>

          <div className="about-grid">
            <div className="about-cards">
              {facts.map((fact, index) => (
                <Stat
                  key={fact.label}
                  fact={fact}
                  index={index}
                  progress={scrollYProgress}
                  isDesktop={isDesktop}
                  runMobile={runMobile}
                  reduced={reduced}
                />
              ))}
            </div>

            <div className="about-copy">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {collaborations.length > 0 ? (
            <div className="about-collab">
              <p className="about-collab-label">Работал с</p>
              <div className="about-collab-grid">
                {collaborations.map((person, index) => (
                  <div key={person.name} className="about-collab-card">
                    <EngCells seed={index + 31} count={3} />
                    <h3>{person.name}</h3>
                    <p className="about-collab-field">{person.field}</p>
                    <p className="about-collab-followers">
                      <b>{person.followers}</b> {person.unit ?? "подписчиков"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Stat({
  fact,
  index,
  progress,
  isDesktop,
  runMobile,
  reduced,
}: {
  fact: Fact;
  index: number;
  progress: MotionValue<number>;
  isDesktop: boolean;
  runMobile: boolean;
  reduced: boolean;
}) {
  const { num, suffix } = parseValue(fact.value);
  const [display, setDisplay] = useState(0);

  /* Десктоп: значение цифры привязано к прогрессу прокрутки (лёгкий стаггер) */
  const startP = 0.06 + index * 0.01;
  const endP = Math.min(startP + 0.52, 0.94);
  const value = useTransform(progress, [startP, endP], [0, num], { clamp: true });

  useMotionValueEvent(value, "change", (latest) => {
    if (isDesktop && !reduced) setDisplay(Math.round(latest));
  });

  /* Мобайл: плавный count-up по таймеру, один раз при появлении */
  useEffect(() => {
    if (isDesktop || reduced || !runMobile) return;

    let raf = 0;
    const duration = 1200 + index * 220;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDesktop, reduced, runMobile, num, index]);

  return (
    <div className="about-fact">
      <EngCells seed={index + 21} count={3} />
      <dt>
        {reduced ? num : display}
        {suffix}
      </dt>
      <dd>{fact.label}</dd>
    </div>
  );
}
