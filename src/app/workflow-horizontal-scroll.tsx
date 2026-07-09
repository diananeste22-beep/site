"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import EngCells from "@/components/eng-cells";

type WorkflowStep = {
  number: string;
  title: string;
  description: string;
};

type WorkflowStackProps = {
  steps: WorkflowStep[];
};

const stepIcons = [
  /* аналитика — прицел */
  <svg key="i0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="7.2" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 2.4v2.8M12 18.8v2.8M2.4 12h2.8M18.8 12h2.8" />
  </svg>,
  /* проектирование — перо */
  <svg key="i1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M4 20l1.4-4.6L16 4.8a2.1 2.1 0 013 3L8.4 18.4 4 20z" />
    <path d="M13.6 7.2l3.2 3.2" />
  </svg>,
  /* реализация — готовность */
  <svg key="i2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.4" />
    <path d="M8.4 12.3l2.5 2.5 4.7-5.2" />
  </svg>,
];

type StackCardProps = {
  step: WorkflowStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
};

function StackCard({ step, index, total, progress, reduced }: StackCardProps) {
  /* Каждая карточка полностью перекрывает предыдущую: без «колоды» и уменьшения —
     2-я целиком уходит под 3-ю, после чего страница идёт дальше обычным потоком */
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1]);
  const brightness = useTransform(progress, [start, 1], [1, 1]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <div className="step-sticky" style={{ zIndex: index + 1 } as CSSProperties}>
      <motion.article className="step-card" style={reduced ? undefined : { scale, filter }}>
        <EngCells seed={index + 11} />
        <div className="step-card-topline">
          <span className="panel-icon step-icon" aria-hidden="true">
            {stepIcons[index]}
          </span>
        </div>
        <div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
        <div className="step-card-footer">
        </div>
      </motion.article>
    </div>
  );
}

export default function WorkflowHorizontalScroll({ steps }: WorkflowStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  /* На мобильном адаптиве стек отключён: карточки просто идут сверху вниз */
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 150px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="workflow" className="section-band workflow-section steps-section px-5 py-24 sm:px-8 lg:px-12">
      <div className="steps-container mx-auto w-full max-w-[1360px]">
        <div className="steps-left">
          <h2 className="steps-title">Этапы работы</h2>
          <p className="steps-kicker"></p>
          <p className="steps-description">
          </p>
        </div>

        <div className="steps-right" ref={stackRef} aria-label="Этапы работы">
          {steps.map((step, index) => (
            <StackCard
              key={step.number}
              step={step}
              index={index}
              total={steps.length}
              progress={scrollYProgress}
              reduced={reduced || isCompact}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
