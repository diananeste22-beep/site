type WorkflowStep = {
  number: string;
  title: string;
  description: string;
};

type WorkflowHorizontalScrollProps = {
  steps: WorkflowStep[];
};

const copy = {
  label: "\u041f\u0440\u043e\u0446\u0435\u0441\u0441",
  title: "\u042d\u0442\u0430\u043f\u044b \u0440\u0430\u0431\u043e\u0442\u044b",
  description:
    "\u0422\u0440\u0438 \u043f\u043e\u043d\u044f\u0442\u043d\u044b\u0445 \u044d\u0442\u0430\u043f\u0430: \u043e\u0442 \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0438 \u0438 \u0441\u0442\u0438\u043b\u044f \u0434\u043e \u0444\u0438\u043d\u0430\u043b\u044c\u043d\u043e\u0439 \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0438.",
  cta: "\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442",
};

export default function WorkflowHorizontalScroll({ steps }: WorkflowHorizontalScrollProps) {
  return (
    <section id="workflow" className="section-band px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1360px]">
        <div className="workflow-surface rounded-lg border border-[#272727]/10 bg-[#f1f0ec]/88 p-4 shadow-[0_18px_54px_rgba(39,39,39,0.06)] backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-sm font-extrabold uppercase leading-none text-[#2d63fc]">{copy.label}</p>
              <h2 className="max-w-xl text-5xl font-black leading-[1.04] tracking-[-0.02em] text-[#272727] sm:text-6xl lg:text-7xl">
                {copy.title}
              </h2>
              <p className="mt-6 max-w-[56ch] text-base font-medium leading-[1.55] text-[#272727]/68">
                {copy.description}
              </p>
              <a
                href="#contacts"
                className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-md bg-[#272727] px-4 text-xs font-extrabold text-[#f1f0ec] transition duration-300 hover:bg-[#2d63fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
              >
                <span className="grid h-5 w-5 place-items-center rounded bg-[#2d63fc] text-[#f1f0ec]">{"\u2197"}</span>
                {copy.cta}
              </a>
            </div>

            <div className="workflow-steps grid gap-3">
              {steps.map((step, index) => (
                <article
                  key={step.number}
                  className="workflow-step-card group grid gap-6 rounded-md border border-[#272727]/10 bg-[#f1f0ec]/96 p-6 transition duration-300 hover:border-[#2d63fc]/34 hover:bg-[#f1f0ec] sm:grid-cols-[96px_1fr] sm:p-8"
                >
                  <div className="flex items-center gap-4 sm:block">
                    <span className="workflow-number inline-flex h-12 min-w-12 items-center justify-center rounded-md bg-[#272727] px-4 text-sm font-black leading-none text-[#f1f0ec] transition duration-300 group-hover:bg-[#2d63fc]">
                      {step.number}
                    </span>
                    <span className="h-px flex-1 bg-[#272727]/12 sm:mt-6 sm:block sm:h-16 sm:w-px" aria-hidden="true" />
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-extrabold uppercase leading-none text-[#272727]/38">0{index + 1}</p>
                    <h3 className="max-w-[16ch] text-3xl font-black leading-[1.08] tracking-[-0.02em] text-[#272727] sm:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-[62ch] text-base font-medium leading-[1.55] text-[#272727]/68">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
