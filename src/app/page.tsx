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

const services = [
  {
    title: "Для бизнеса и брендов",
    marker: "01",
    description:
      "Проектирование визуальных систем. Коммерческая графика с упором на техническую точность и бескомпромиссное соблюдение корпоративных стандартов.",
  },
  {
    title: "Для артистов",
    marker: "02",
    description:
      "Визуальный продакшн для артистов. Формирование уникального стиля в нишах Trap/Drill и разработка контента для релизов любого уровня.",
  },
  {
    title: "Стек",
    marker: "03",
    description: "Adobe Photoshop / Illustrator / After Effects / Figma / Tilda / GenAI",
  },
];

const latestProjects = [
  {
    title: "Spyrofoam - dorogusha",
    image: "/portfolio/campaign-banner-system.png",
    category: "Оформление релиза",
  },
  {
    title: "Music Release Cover",
    image: "/portfolio/music-release-cover.png",
    category: "Креатив",
  },
  {
    title: "Poster Visual Series",
    image: "/portfolio/poster-visual-series.png",
    category: "Креатив",
  },
  {
    title: "Roll-Up Identity",
    image: "/portfolio/roll-up-identity.png",
    category: "Маркетинг",
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#f1f0ec] text-[#272727]">
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
          <nav aria-label="Основная навигация" className="absolute left-1/2 hidden -translate-x-1/2 rounded-lg bg-[#272727] p-1 shadow-sm md:flex">
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
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#272727] px-3 text-xs font-bold text-[#f1f0ec] outline-none transition hover:bg-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc] sm:px-4"
          >
            <span className="grid h-5 w-5 place-items-center rounded-md bg-[#2d63fc] text-[#f1f0ec]">↗</span>
            Связаться
          </a>
        </div>
      </header>

      <main id="top">
        <AnimatedHero />


        <section id="services" className="section-band px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1360px]">
            <div className="section-heading mb-10 grid gap-6 lg:grid-cols-[0.7fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-extrabold uppercase leading-none text-[#2d63fc]">01 / 03</p>
                <h2 className="text-5xl font-black leading-[1.04] tracking-[-0.02em] text-[#272727] sm:text-6xl lg:text-7xl">
                  {"\u0423\u0441\u043b\u0443\u0433\u0438"}
                </h2>
              </div>
              <div className="hidden h-px bg-[#272727]/12 lg:block" aria-hidden="true" />
            </div>

            <div className="services-surface rounded-lg border border-[#272727]/10 bg-[#f1f0ec]/88 p-3 shadow-[0_18px_54px_rgba(39,39,39,0.06)] backdrop-blur sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[1.05fr_1.05fr_0.9fr]">
                {services.map((service, index) => (
                  <article
                    key={service.title}
                    className={`service-tile group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-md border border-[#272727]/10 bg-[#f1f0ec]/96 p-6 transition duration-300 hover:border-[#2d63fc]/34 hover:bg-[#f1f0ec] sm:p-8 ${index === 2 ? "lg:min-h-[360px]" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <span className="service-number inline-flex h-12 min-w-12 items-center justify-center rounded-md bg-[#272727] px-4 text-sm font-black leading-none text-[#f1f0ec] transition duration-300 group-hover:bg-[#2d63fc]">
                        {service.marker}
                      </span>
                      <span className="h-px flex-1 bg-[#272727]/12" aria-hidden="true" />
                    </div>

                    <div className="mt-16">
                      <h3 className="max-w-[14ch] text-3xl font-black leading-[1.08] tracking-[-0.02em] text-[#272727] sm:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mt-5 max-w-[58ch] text-base font-medium leading-[1.55] text-[#272727]/68">
                        {service.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section id="portfolio" className="section-band px-5 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1360px]">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-black uppercase leading-none text-[#2d63fc]">{"\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e"}</p>
                <h2 className="max-w-4xl text-4xl font-black leading-[1.06] tracking-[-0.02em] text-[#272727] sm:text-6xl">
                  {"\u0413\u0430\u043b\u0435\u0440\u0435\u044f"} <span className="accent-swipe accent-swipe-small">{"\u043c\u043e\u0438\u0445 \u0440\u0430\u0431\u043e\u0442"}</span>
                </h2>
              </div>
              <div className="flex flex-col gap-5 lg:items-end">
                <div className="hidden h-px w-full bg-[#272727]/12 lg:block" aria-hidden="true" />
                <Link
                  href="/gallery"
                  className="inline-flex h-14 w-fit items-center gap-3 rounded-lg bg-[#272727] px-6 text-sm font-bold text-[#f1f0ec] outline-none transition hover:bg-[#2d63fc] focus-visible:ring-2 focus-visible:ring-[#2d63fc]"
                >
                  <span className="grid h-7 w-7 place-items-center rounded bg-[#2d63fc] text-[#f1f0ec]">{"\u2197"}</span>
                  {"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0440\u0430\u0431\u043e\u0442\u044b"}
                </Link>
              </div>
            </div>

            <div className="portfolio-surface rounded-lg border border-[#272727]/10 bg-[#f1f0ec]/88 p-3 shadow-[0_18px_54px_rgba(39,39,39,0.06)] backdrop-blur sm:p-4">
              <div className="portfolio-grid grid gap-3 lg:grid-cols-4">
                {latestProjects.map((project, index) => (
                  <article
                    key={project.title}
                    className={`portfolio-card group overflow-hidden rounded-md border border-[#272727]/10 bg-[#f1f0ec]/96 p-4 transition duration-300 hover:border-[#2d63fc]/34 ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                  >
                    <div className={`relative overflow-hidden rounded-sm bg-[#f1f0ec] ${index === 0 ? "aspect-[16/11]" : "aspect-[16/10]"}`}>
                      <Image
                        src={project.image}
                        alt={`${project.title}, ${project.category}`}
                        fill
                        sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"}
                        className="object-cover grayscale transition duration-500 group-hover:scale-[1.025] group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex min-h-[112px] flex-col justify-between pt-5">
                      <p className="text-xs font-black uppercase leading-none text-[#2d63fc]">{project.category}</p>
                      <h3 className="mt-4 text-2xl font-black leading-[1.12] tracking-[-0.02em] text-[#272727]">
                        {project.title}
                      </h3>
                    </div>
                  </article>
                ))}
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
                  className="contact-link flex items-center justify-between rounded-md bg-[#f1f0ec] px-5 py-5 text-xl font-black text-[#272727] outline-none transition duration-300 hover:bg-[#272727] hover:text-[#f1f0ec] focus-visible:ring-2 focus-visible:ring-[#f1f0ec]"
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
