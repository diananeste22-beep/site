import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Campaign Banner System",
    category: "Маркетинг",
    description: "Серия наружных и digital-баннеров для единой промо-кампании",
    image: "/portfolio/campaign-banner-system.png",
  },
  {
    title: "Music Release Cover",
    category: "Креатив",
    description: "Обложка релиза с контрастной типографикой и sci-fi-фактурой",
    image: "/portfolio/music-release-cover.png",
  },
  {
    title: "Roll-Up Identity",
    category: "Маркетинг",
    description: "Стендовая графика, безопасные зоны и подготовка к печати",
    image: "/portfolio/roll-up-identity.png",
  },
  {
    title: "Poster Visual Series",
    category: "Креатив",
    description: "Плакатная серия с крупным ритмом, шумом и плотным цветом",
    image: "/portfolio/poster-visual-series.png",
  },
  {
    title: "Corporate Print Pack",
    category: "Маркетинг",
    description: "Набор печатных материалов для презентаций и мероприятий",
    image: "/portfolio/corporate-print-pack.png",
  },
  {
    title: "Lyric Video Frame Set",
    category: "Креатив",
    description: "Ключевые кадры для лирик-видео с выразительной типографикой",
    image: "/portfolio/lyric-video-frame-set.png",
  },
];

export const metadata = {
  title: "Галерея работ - Арсений",
  description: "Галерея проектов графического дизайнера Арсения: маркетинг, полиграфия, обложки, постеры и визуальные системы.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#f1f0ec] text-[#272727]">
      <header className="sticky top-0 z-50 bg-[#f1f0ec]/92 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="text-2xl font-black uppercase leading-none transition hover:text-[#2d63fc]">
            Арсений
          </Link>
          <Link href="/#contacts" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#272727] px-4 text-xs font-bold text-[#f1f0ec] transition hover:bg-[#2d63fc]">
            <span className="grid h-5 w-5 place-items-center rounded bg-[#2d63fc]">↗</span>
            Связаться
          </Link>
        </div>
      </header>

      <main className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="mb-12">
            <Link href="/" className="text-sm font-bold text-[#272727]/55 transition hover:text-[#2d63fc]">
              ← На главную
            </Link>
            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.92] sm:text-7xl lg:text-8xl">
              Галерея <span className="accent-swipe">моих работ</span>
            </h1>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <article key={project.title} className={`group overflow-hidden rounded-lg bg-[#f1f0ec] shadow-sm ring-1 ring-[#272727]/5 ${index === 0 ? "md:col-span-2 xl:col-span-2" : ""}`}>
                <div className={`relative overflow-hidden bg-[#f1f0ec] ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={project.image}
                    alt={`${project.title}: ${project.description}`}
                    fill
                    sizes={index === 0 ? "(max-width: 1280px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-black uppercase text-[#2d63fc]">{project.category}</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight">{project.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#272727]/62">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

