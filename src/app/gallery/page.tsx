import { FlickeringGrid } from "@/components/ui/flickering-grid";
import RevealOnScroll from "../reveal-on-scroll";
import PortfolioGallery, { type PortfolioProject } from "@/components/portfolio-gallery";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

/* Файлы работ лежат в public/portfolio/<папка-проекта>/ (латиницей, без пробелов,
   пути всегда с расширением). TODO: у заглушек ниже заменить image/media на реальные файлы */
const projects: PortfolioProject[] = [
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
    title: "Campaign Banner System",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Маркетинг",
    description: "Серия наружных и digital-баннеров для единой промо-кампании",
    scope: "banners / digital / outdoor",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
  {
    title: "Music Release Cover",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Креатив",
    description: "Обложка релиза с контрастной типографикой и sci-fi-фактурой",
    scope: "cover / social",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
  {
    title: "Roll-Up Identity",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Маркетинг",
    description: "Стендовая графика, безопасные зоны и подготовка к печати",
    scope: "print / roll-up",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
  {
    title: "Poster Visual Series",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Креатив",
    description: "Плакатная серия с крупным ритмом, шумом и плотным цветом",
    scope: "poster / key visual",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
  {
    title: "Lyric Video Frame Set",
    image: "/portfolio/spyrofoam-dorogusha/campaign-banner-system.png",
    category: "Креатив",
    description: "Ключевые кадры для лирик-видео с выразительной типографикой",
    scope: "video / frames",
    media: ["/portfolio/spyrofoam-dorogusha/campaign-banner-system.png"],
  },
];

export const metadata = {
  title: "Галерея работ — Арсений",
  description:
    "Галерея проектов графического дизайнера Арсения: маркетинг, полиграфия, обложки, постеры и визуальные системы.",
};

export default function GalleryPage() {
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
      <SiteHeader onSubpage />

      <main className="pt-24 sm:pt-28">
        <div className="dark-studio-frame mx-5 mb-5 sm:mx-8 lg:mx-12">
          <FlickeringGrid
            className="dark-studio-grid pointer-events-none absolute inset-0 z-0"
            squareSize={2}
            gridGap={18}
            flickerChance={0.11}
            color="#f1f8ff"
            maxOpacity={0.2}
          />

          <PortfolioGallery
            projects={projects}
            heading="Галерея работ"
            note="Все проекты студии: нажмите на работу, чтобы открыть полный визуал, описание и состав"
            showAllLink={false}
          />
        </div>
      </main>

      <SiteFooter onSubpage />
    </div>
  );
}
