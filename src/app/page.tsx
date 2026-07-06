import Image from "next/image";
import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import AnimatedHero from "@/components/animated-hero";
import RevealOnScroll from "./reveal-on-scroll";
import WorkflowHorizontalScroll from "./workflow-horizontal-scroll";

const navItems = [
  { label: "\u0413\u043b\u0430\u0432\u043d\u0430\u044f", href: "#top" },
  { label: "\u0423\u0441\u043b\u0443\u0433\u0438", href: "#services" },
  { label: "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e", href: "#portfolio" },
  { label: "\u042d\u0442\u0430\u043f\u044b \u0440\u0430\u0431\u043e\u0442\u044b", href: "#workflow" },
  { label: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b", href: "#contacts" },
];

const serviceTools = ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Figma", "Tilda", "GenAI"];

const latestProjects = [
  {
    title: "Spyrofoam - dorogusha",
    image: "/portfolio/campaign-banner-system.png",
    category: "Оформление релиза",
    description: "Обложка и промо-графика с плотной музыкальной атмосферой.",
    scope: "release / cover / promo",
  },
  {
    title: "Music Release Cover",
    image: "/portfolio/music-release-cover.png",
    category: "Креатив",
    description: "Визуальный язык для релиза: от обложки до адаптаций.",
    scope: "cover / social",
  },
  {
    title: "Poster Visual Series",
    image: "/portfolio/poster-visual-series.png",
    category: "Креатив",
    description: "Серия постеров с выразительной типографикой и ритмом.",
    scope: "poster / key visual",
  },
  {
    title: "Roll-Up Identity",
    image: "/portfolio/roll-up-identity.png",
    category: "Маркетинг",
    description: "Коммерческий носитель, подготовленный под печать и бренд.",
    scope: "print / roll-up",
  },
];

const workflow = [
  {
    number: "01",
    title: "Аналитика",
    description: "Постановка задач, сбор требований и фиксация концептуального вектора проекта.",
  },
  {
    number: "02",
    title: "Проектирование",
    description: "Разработка визуальных решений, поиск композиции и формирование стиля.",
  },
  {
    number: "03",
    title: "Реализация",
    description: "Финальная полировка, техническая подготовка и передача исходников.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f1f0ec] text-[#131313]">
      <RevealOnScroll />
      <FlickeringGrid
        className="grid-flick-overlay pointer-events-none fixed inset-0 z-0"
        squareSize={3}
        gridGap={15}
        flickerChance={0.6}
        color="#2d63fc"
        maxOpacity={0.245}
      />
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#f1f0ec]/50 bg-[#f1f0ec]/72 px-5 py-4 backdrop-blur-sm sm:px-8 lg:px-12">
        <div className="relative mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4">
          <a
            href="#top"
            className="text-2xl font-black uppercase leading-none outline-none transition hover:text-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
            aria-label="Арсений, перейти к началу страницы"
          >
            Арсений
          </a>
          <nav aria-label="Основная навигация" className="absolute left-1/2 hidden -translate-x-1/2 rounded-lg bg-[#131313] p-1 shadow-sm md:flex">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                data-active={index === 0 ? "true" : "false"}
                className="toolbar-link rounded-md px-5 py-2 text-xs font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contacts"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#131313] px-3 text-xs font-bold text-[#f1f0ec] outline-none transition hover:bg-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc] sm:px-4"
          >
            <span className="grid h-5 w-5 place-items-center rounded-md bg-[#2d63fc] text-[#f1f0ec]">↗</span>
            Связаться
          </a>
        </div>
      </header>

      <main id="top">
        <AnimatedHero />


        <section id="services" className="section-band services-section px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1360px]">
            <div className="section-heading mb-10 grid gap-6 lg:grid-cols-[0.68fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-extrabold uppercase leading-none text-[#2d63fc]">01 / Услуги</p>
                <h2 className="text-5xl font-black leading-[1.04] tracking-[-0.02em] text-[#131313] sm:text-6xl lg:text-7xl">
                  {"\u0423\u0441\u043b\u0443\u0433\u0438"}
                </h2>
              </div>
              <p className="max-w-[58ch] text-base font-medium leading-[1.55] text-[#131313]/62 lg:justify-self-end">
                Три рабочих модуля: коммерческая графика, визуалы для артистов и строгая инженерная база по стеку.
              </p>
            </div>

            <div className="services-bento">
              <FlickeringGrid
                className="services-white-grid pointer-events-none absolute inset-0 z-0"
                squareSize={2}
                gridGap={18}
                flickerChance={0.18}
                color="#f1f0ec"
                maxOpacity={0.18}
              />
              <div className="grid gap-3 lg:grid-cols-[3fr_2fr]">
                <article className="service-bento-panel service-bento-panel-interactive group min-h-[430px] rounded-lg border border-white/10 bg-[#131313] p-6 text-[#f1f0ec] transition duration-300 hover:border-[#2d63fc] sm:p-8">
                  <div className="service-brand-scene" aria-hidden="true">
                    <div className="service-brand-board">
                      <span className="service-brand-board-bar" />
                      <span className="service-brand-board-line service-brand-board-line-long" />
                      <span className="service-brand-board-line" />
                      <span className="service-brand-board-chip">CMYK</span>
                    </div>
                    <div className="service-brand-rollup">
                      <span />
                      <span />
                    </div>
                    <div className="service-brand-card">brand kit</div>
                  </div>

                  <div className="mt-12 max-w-2xl sm:mt-16 lg:mt-20">
                    <p className="mb-4 text-xs font-black uppercase leading-none text-[#2d63fc]">brand / print</p>
                    <h3 className="text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                      Для бизнеса и брендов
                    </h3>
                    <p className="mt-5 max-w-[62ch] text-base font-medium leading-[1.55] text-[#f1f0ec]/66 sm:text-lg">
                      Проектирование визуальных систем. Коммерческая графика с упором на техническую точность и соблюдение корпоративных стандартов.
                    </p>
                  </div>
                </article>

                <article className="service-bento-panel service-bento-panel-interactive group min-h-[430px] rounded-lg border border-white/10 bg-[#131313] p-6 text-[#f1f0ec] transition duration-300 hover:border-[#2d63fc]/60 sm:p-8">
                  <div className="service-artist-scene" aria-hidden="true">
                    <div className="service-vinyl" />
                    <div className="service-cover-stack service-cover-stack-back" />
                    <div className="service-cover-stack service-cover-stack-mid" />
                    <div className="service-cover-stack service-cover-stack-front">
                      <span>drill</span>
                    </div>
                    <div className="service-artist-tag">release pack</div>
                  </div>

                  <div className="mt-12 max-w-md sm:mt-16 lg:mt-20">
                    <p className="mb-4 text-xs font-black uppercase leading-none text-[#2d63fc]">cover / motion</p>
                    <h3 className="text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                      Для артистов
                    </h3>
                    <p className="mt-5 text-base font-medium leading-[1.55] text-[#f1f0ec]/66 sm:text-lg">
                      Визуальный продакшн для артистов. Формирование стиля в нишах Trap/Drill и разработка контента для релизов.
                    </p>
                  </div>
                </article>

                <article className="service-bento-panel service-stack-panel min-h-[190px] rounded-lg border border-white/10 bg-[#131313] p-6 text-[#f1f0ec] sm:p-8 lg:col-span-2">
                  <div className="grid h-full gap-8 py-1 font-medium lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                    <div>
                      <p className="mb-4 text-xs font-medium uppercase leading-none text-[#2d63fc]">production base</p>
                      <h3 className="max-w-xl text-3xl font-black leading-[1.06] tracking-[-0.02em] sm:text-5xl">
                        Стек и инструменты
                      </h3>
                    </div>
                    <div className="service-tools-grid">
                      {serviceTools.map((tool) => (
                        <span key={tool} className="service-tool-pill">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>


        <section id="portfolio" className="section-band gallery-section px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1360px]">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-black uppercase leading-none text-[#2d63fc]">Портфолио</p>
                <h2 className="max-w-4xl text-4xl font-black leading-[1.06] tracking-[-0.02em] text-[#131313] sm:text-6xl">
                  Галерея <span className="accent-swipe accent-swipe-small">работ</span>
                </h2>
              </div>
              <div className="flex flex-col gap-5 lg:items-end">
                <p className="max-w-[52ch] text-base font-medium leading-[1.55] text-[#131313]/62 lg:text-right">
                  Витрина ключевых проектов: крупный релизный визуал, коммерческие носители и серия постеров в одном плотном ритме.
                </p>
                <div className="hidden h-px w-full bg-[#131313]/12 lg:block" aria-hidden="true" />
                <Link
                  href="/gallery"
                  className="inline-flex h-14 w-fit items-center gap-3 rounded-lg bg-[#131313] px-6 text-sm font-bold text-[#f1f0ec] outline-none transition hover:bg-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
                >
                  <span className="grid h-7 w-7 place-items-center rounded bg-[#2d63fc] text-[#f1f0ec]">{"\u2197"}</span>
                  {"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0440\u0430\u0431\u043e\u0442\u044b"}
                </Link>
              </div>
            </div>

            <div className="gallery-shell rounded-lg border border-[#131313]/10 bg-[#080808] p-3 text-[#f1f0ec] shadow-[0_24px_70px_rgba(39,39,39,0.12)] sm:p-4">
              <div className="gallery-filter-row">
                {["Все", "Маркетинг", "Креатив", "Релизы"].map((item, index) => (
                  <span key={item} className={`gallery-filter-chip ${index === 0 ? "gallery-filter-chip-active" : ""}`}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="gallery-showcase mt-3 grid gap-3 lg:grid-cols-[1.16fr_0.84fr]">
                <article className="gallery-feature-card portfolio-card group overflow-hidden rounded-lg border border-white/10 bg-[#131313] p-4 transition duration-300 hover:border-[#2d63fc]/60">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[#131313] lg:aspect-[16/11]">
                    <Image
                      src={latestProjects[0].image}
                      alt={`${latestProjects[0].title}, ${latestProjects[0].category}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover grayscale transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                    />
                    <div className="gallery-image-shade" aria-hidden="true" />
                    <span className="gallery-project-index">01</span>
                  </div>
                  <div className="grid gap-5 px-1 pt-6 sm:grid-cols-[1fr_0.72fr] sm:items-end">
                    <div>
                      <p className="text-xs font-black uppercase leading-none text-[#2d63fc]">{latestProjects[0].category}</p>
                      <h3 className="mt-4 text-3xl font-black leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                        {latestProjects[0].title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium leading-[1.55] text-[#f1f0ec]/66">
                      {latestProjects[0].description}
                    </p>
                  </div>
                </article>

                <div className="grid gap-3">
                  {latestProjects.slice(1).map((project, index) => (
                    <article
                      key={project.title}
                      className="gallery-side-card portfolio-card group grid gap-4 rounded-lg border border-white/10 bg-[#131313] p-4 transition duration-300 hover:border-[#2d63fc]/60 sm:grid-cols-[180px_1fr]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#080808] sm:aspect-auto">
                        <Image
                          src={project.image}
                          alt={`${project.title}, ${project.category}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 180px"
                          className="object-cover grayscale transition duration-500 group-hover:scale-[1.035] group-hover:grayscale-0"
                        />
                      </div>
                      <div className="flex min-h-[148px] flex-col justify-between">
                        <div>
                          <p className="text-xs font-black uppercase leading-none text-[#2d63fc]">0{index + 2} / {project.category}</p>
                          <h3 className="mt-4 text-2xl font-black leading-[1.1] tracking-[-0.02em]">
                            {project.title}
                          </h3>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="gallery-scope-chip">{project.scope}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <WorkflowHorizontalScroll steps={workflow} />
      </main>


      <footer id="contacts" className="section-band relative isolate mx-5 mb-5 overflow-hidden rounded-lg bg-[#2d63fc] px-5 py-16 text-[#f1f0ec] sm:mx-8 sm:px-8 lg:mx-12 lg:px-12">
        <FlickeringGrid
          className="footer-grid pointer-events-none absolute inset-0 z-0"
          squareSize={2}
          gridGap={14}
          flickerChance={0.055}
          color="#f1f0ec"
          maxOpacity={0.34}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-[1360px] gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase leading-none text-[#f1f0ec]/70">{"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b"}</p>
            <h2 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.02em] sm:text-7xl">
              {"\u0415\u0441\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0430? \u041d\u0430\u043f\u0438\u0448\u0438 \u043c\u043d\u0435"}
            </h2>
            <p className="mt-6 max-w-[58ch] text-sm font-medium leading-[1.55] text-[#f1f0ec]/72">
              {"\u0420\u0430\u0441\u0441\u043a\u0430\u0436\u0438\u0442\u0435 \u043e \u0444\u043e\u0440\u043c\u0430\u0442\u0435, \u0441\u0440\u043e\u043a\u0430\u0445 \u0438 \u0437\u0430\u0434\u0430\u0447\u0435. \u0412 \u043e\u0442\u0432\u0435\u0442 \u043c\u043e\u0436\u043d\u043e \u0441\u0440\u0430\u0437\u0443 \u043e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u043a\u043e\u043d\u0446\u0435\u043f\u0442 \u0438 \u043d\u0443\u0436\u043d\u044b\u0435 \u0438\u0441\u0445\u043e\u0434\u043d\u0438\u043a\u0438"}
            </p>
          </div>

          <div className="contact-grid grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {["Telegram", "Behance", "Email"].map((label) => {
              const href = label === "Telegram" ? "https://t.me/username" : label === "Behance" ? "https://behance.net/username" : "mailto:hello@example.com";
              return (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noreferrer"}
                  className="contact-link flex items-center justify-between rounded-md bg-[#f1f0ec] px-5 py-5 text-xl font-black text-[#131313] outline-none transition duration-300 hover:bg-[#131313] hover:text-[#f1f0ec] focus-visible:ring-2 focus-visible:ring-[#f1f0ec]"
                >
                  {label}
                  <span className="text-sm text-[#2d63fc] transition duration-300 group-hover:text-[#f1f0ec]">{"\u2197"}</span>
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
