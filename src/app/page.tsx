import { FlickeringGrid } from "@/components/ui/flickering-grid";
import AnimatedHero from "@/components/animated-hero";
import RevealOnScroll from "./reveal-on-scroll";
import WorkflowHorizontalScroll from "./workflow-horizontal-scroll";
import PortfolioGallery from "@/components/portfolio-gallery";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AboutSection from "@/components/about-section";
import EngCells from "@/components/eng-cells";

const serviceTools = ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Figma", "Tilda", "GenAI"];

/* Файлы работ лежат в public/portfolio/<папка-проекта>/ (латиницей, без пробелов).
   TODO: у проектов-заглушек ниже заменить image/media на их реальные файлы */
const latestProjects = [
  {
    title: "Spyrofoam - dorogusha",
    image: "/portfolio/spyrofoam-dorogusha/Thumb-dorogusha.png",
    category: "Оформление релиза",
    description: "Обложка и промо-графика с плотной музыкальной атмосферой",
    scope: "release / cover / promo",
    media: [
      "/portfolio/spyrofoam-dorogusha/Thumb-dorogusha.png",
      "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
      "/portfolio/spyrofoam-dorogusha/comp1.mp4",
      "/portfolio/spyrofoam-dorogusha/composition.mp4",
    ],
  },
  {
    title: "Music Release Cover",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Креатив",
    description: "Визуальный язык для релиза: от обложки до адаптаций",
    scope: "cover / social",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
  {
    title: "Poster Visual Series",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Креатив",
    description: "Серия постеров с выразительной типографикой и ритмом",
    scope: "poster / key visual",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
  {
    title: "Roll-Up Identity",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Маркетинг",
    description: "Коммерческий носитель, подготовленный под печать и бренд",
    scope: "print / roll-up",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
];

const aboutFacts = [
  { value: "5", label: "лет в графическом дизайне" },
  { value: "422", label: "закрытых проектов и релизов" },
  { value: "90%", label: "клиентов возвращаются" },
];

/* TODO: заменить на реальных артистов, сферу и число подписчиков */
const collaborations = [
  { name: "YBN Nahmir", field: "Артист", followers: "+5.4M", unit: "слушателей" },
  { name: "EdisonPts", field: "Блогер", followers: "17.2M", unit: "подписчиков" },
  { name: "BingX", field: "Криптобиржа", followers: "+10M", unit: "пользователей" },
];

const workflow = [
  {
    number: "1",
    title: "Аналитика",
    description: "Постановка задач, сбор требований и фиксация концептуального вектора проекта",
  },
  {
    number: "2",
    title: "Разработка",
    description: "Разработка визуальных решений, поиск композиции и формирование стиля",
  },
  {
    number: "3",
    title: "Реализация",
    description: "Финальная полировка, техническая подготовка и передача исходников",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#f1f8ff] text-[#0b0b0b]">
      <RevealOnScroll />
      <FlickeringGrid
        className="grid-flick-overlay pointer-events-none fixed inset-0 z-0"
        squareSize={3}
        gridGap={15}
        flickerChance={0.6}
        color="#2d63fc"
        maxOpacity={0.245}
      />
      <SiteHeader />

      <main id="top">
        <AnimatedHero />

        <div className="dark-studio-frame mx-5 mb-5 sm:mx-8 lg:mx-12">
          <FlickeringGrid
            className="dark-studio-grid pointer-events-none absolute inset-0 z-0"
            squareSize={2}
            gridGap={18}
            flickerChance={0.11}
            color="#f1f8ff"
            maxOpacity={0.2}
          />

          <AboutSection
            title="Обо мне"
            paragraphs={[
              "Начинал с коммерческой графики для бизнеса — и до сих пор считаю подготовку файлов под печать своей суперсилой: аккуратные макеты, правильные профили, ноль сюрпризов на производстве",
              "Параллельно ушёл в музыку. Сегодня половина моей работы — обложки релизов и промо-графика для Trap/Drill-артистов, включая исполнителей с аудиторией в миллионы слушателей. Эти два мира отлично дополняют друг друга: от бизнеса — дисциплина и сроки, от музыки — смелость в визуале",
            ]}
            facts={aboutFacts}
            collaborations={collaborations}
          />

          <section id="services" className="section-band services-section px-5 py-24 sm:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-[1360px]">
              <div className="section-heading mb-10 grid gap-6 lg:grid-cols-[0.68fr_1fr] lg:items-end">
                <div>
                  <h2 className="text-5xl font-black leading-[1.04] tracking-[-0.02em] text-[#0b0b0b] sm:text-6xl lg:text-7xl">
                    {"Услуги"}
                  </h2>
                </div>
                <p className="max-w-[58ch] text-base font-medium leading-[1.55] text-[#0b0b0b]/62 lg:justify-self-end" />
              </div>

              <div className="services-bento">
                <div className="grid gap-3 lg:grid-cols-[3fr_2fr]">
                  <article className="service-bento-panel service-bento-panel-interactive group min-h-[100px] p-6 text-[#f1f8ff] sm:p-8">
                    <EngCells seed={1} />
                    <div className="service-copy-block max-w-2xl">
                      <span className="panel-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
                          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
                          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
                          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
                        </svg>
                      </span>
                      <h3>Для бизнеса и брендов</h3>
                      <p>
                        Проектирование визуальных систем. Коммерческая графика с упором на техническую точность и соблюдение корпоративных стандартов
                      </p>
                    </div>
                  </article>

                  <article className="service-bento-panel service-bento-panel-interactive group min-h-[100px] p-6 text-[#f1f8ff] sm:p-8">
                    <EngCells seed={2} />
                    <div className="service-copy-block max-w-md">
                      <span className="panel-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                          <path d="M12 3l2.1 5.4L20 10.5l-5.9 2.1L12 18l-2.1-5.4L4 10.5l5.9-2.1L12 3z" />
                          <path d="M18.5 15.5l0.9 2.1 2.1 0.9-2.1 0.9-0.9 2.1-0.9-2.1-2.1-0.9 2.1-0.9 0.9-2.1z" />
                        </svg>
                      </span>
                      <h3>Для артистов</h3>
                      <p>
                        Визуальный продакшн для артистов. Формирование стиля в нишах Trap/Drill и разработка контента для релизов
                      </p>
                    </div>
                  </article>

                  <article className="service-bento-panel service-stack-panel min-h-[100px] p-6 text-[#f1f8ff] sm:p-8 lg:col-span-2">
                    <EngCells seed={3} />
                    <div className="grid h-max gap-8 py-1 font-medium lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                      <div>
                        <span className="panel-icon panel-icon-inline" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M4 7h8" />
                            <path d="M20 7h-2" />
                            <circle cx="15" cy="7" r="2.2" />
                            <path d="M4 17h2" />
                            <path d="M12 17h8" />
                            <circle cx="9" cy="17" r="2.2" />
                          </svg>
                        </span>
                        <h3 className="max-w-xl">Стек и инструменты</h3>
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

          <PortfolioGallery projects={latestProjects} />

          <WorkflowHorizontalScroll steps={workflow} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
