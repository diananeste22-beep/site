type WorkflowStep = {
  number: string;
  title: string;
  description: string;
};

type WorkflowHorizontalScrollProps = {
  steps: WorkflowStep[];
};

const copy = {
  label: "Процесс",
  title: "Этапы работы",
  description:
    "Три шага без лишней шумихи: фиксируем задачу, собираем визуальный язык и доводим макет до передачи.",
  cta: "Обсудить проект",
};

const workflowMeta = ["тз", "размеры", "safe zone", "стиль", "экспорт", "исходники"];

export default function WorkflowHorizontalScroll({ steps }: WorkflowHorizontalScrollProps) {
  return (
    <section id="workflow" className="section-band workflow-section px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1360px]">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.74fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-extrabold uppercase leading-none text-[#2d63fc]">02 / {copy.label}</p>
            <h2 className="max-w-xl text-5xl font-black leading-[1.04] tracking-[-0.02em] text-[#272727] sm:text-6xl lg:text-7xl">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-[60ch] text-base font-medium leading-[1.55] text-[#272727]/62 lg:justify-self-end">
            {copy.description}
          </p>
        </div>

        <div className="workflow-bento rounded-lg border border-[#272727]/10 bg-[#080808] p-3 text-[#f1f0ec] shadow-[0_24px_70px_rgba(39,39,39,0.12)] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="workflow-bento-panel workflow-bento-panel-interactive group min-h-[440px] rounded-lg border border-white/10 bg-[#0b0b0b] p-6 transition duration-300 hover:border-[#2d63fc]/60 sm:p-8">
              <div className="workflow-brief-scene" aria-hidden="true">
                <div className="workflow-note-card workflow-note-card-main">
                  <span>01</span>
                  <strong>brief</strong>
                </div>
                <div className="workflow-note-card workflow-note-card-small">safe zone</div>
                <div className="workflow-note-card workflow-note-card-line" />
              </div>

              <div className="mt-12 max-w-2xl sm:mt-16">
                <p className="mb-4 text-xs font-black uppercase leading-none text-[#2d63fc]">{steps[0]?.number} / Старт</p>
                <h3 className="text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                  {steps[0]?.title}
                </h3>
                <p className="mt-5 max-w-[62ch] text-base font-medium leading-[1.55] text-[#f1f0ec]/66 sm:text-lg">
                  {steps[0]?.description}
                </p>
              </div>
            </article>

            <article className="workflow-bento-panel workflow-bento-panel-interactive group min-h-[440px] rounded-lg border border-white/10 bg-[#0b0b0b] p-6 transition duration-300 hover:border-[#2d63fc]/60 sm:p-8">
              <div className="workflow-design-scene" aria-hidden="true">
                <span className="workflow-design-dot" />
                <span className="workflow-design-dot" />
                <span className="workflow-design-dot" />
                <div className="workflow-design-window">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="mt-14 max-w-md sm:mt-20">
                <p className="mb-4 text-xs font-black uppercase leading-none text-[#2d63fc]">{steps[1]?.number} / Стиль</p>
                <h3 className="text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                  {steps[1]?.title}
                </h3>
                <p className="mt-5 text-base font-medium leading-[1.55] text-[#f1f0ec]/66 sm:text-lg">
                  {steps[1]?.description}
                </p>
              </div>
            </article>

            <article className="workflow-bento-panel workflow-final-panel min-h-[350px] rounded-lg border border-white/10 bg-[#0b0b0b] p-6 sm:p-8 lg:col-span-2">
              <div className="grid h-full gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
                <div>
                  <p className="mb-4 text-xs font-black uppercase leading-none text-[#2d63fc]">{steps[2]?.number} / Финал</p>
                  <h3 className="max-w-xl text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                    {steps[2]?.title}
                  </h3>
                  <p className="mt-5 max-w-[58ch] text-base font-medium leading-[1.55] text-[#f1f0ec]/64">
                    {steps[2]?.description}
                  </p>
                  <a
                    href="#contacts"
                    className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-md bg-[#f1f0ec] px-4 text-xs font-extrabold text-[#272727] transition duration-300 hover:bg-[#2d63fc] hover:text-[#f1f0ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded bg-[#2d63fc] text-[#f1f0ec]">{"↗"}</span>
                    {copy.cta}
                  </a>
                </div>

                <div className="workflow-meta-grid">
                  {workflowMeta.map((item) => (
                    <span key={item} className="workflow-meta-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
