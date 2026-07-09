"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import VideoPlayer from "@/components/video-player";

export type PortfolioProject = {
  title: string;
  image: string;
  category: string;
  description: string;
  scope: string;
  /* Полный состав визуала для модалки: картинки и .mp4-видео */
  media?: string[];
};

type PortfolioGalleryProps = {
  projects: PortfolioProject[];
  /* Страница /gallery переиспользует секцию со своим заголовком и без ссылки «Показать все» */
  heading?: string;
  note?: string;
  showAllLink?: boolean;
};

const isVideo = (src: string) => src.endsWith(".mp4") || src.endsWith(".webm");

export default function PortfolioGallery({
  projects,
  heading = "Галерея работ",
  note = "Нажмите на работу, чтобы открыть полный визуал, описание и состав проекта",
  showAllLink = true,
}: PortfolioGalleryProps) {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [slide, setSlide] = useState(0);

  const media = activeProject ? activeProject.media ?? [activeProject.image] : [];

  const openProject = (project: PortfolioProject) => {
    setSlide(0);
    setActiveProject(project);
  };

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const mediaCount = (activeProject.media ?? [activeProject.image]).length;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
      if (event.key === "ArrowRight") {
        setSlide((current) => (current + 1) % mediaCount);
      }
      if (event.key === "ArrowLeft") {
        setSlide((current) => (current - 1 + mediaCount) % mediaCount);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  return (
    <>
      <section id="portfolio" className="section-band gallery-section px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1360px]">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-4xl font-black leading-[1.06] tracking-[-0.02em] text-[#0b0b0b] sm:text-6xl">
                {heading}
              </h2>
              <p className="gallery-note">{note}</p>
            </div>
            {showAllLink ? (
              <Link href="/gallery" className="btn-ghost btn-ghost-ice w-fit">
                {"Показать все работы"}
                <span className="btn-arrow" aria-hidden="true">{"↗"}</span>
              </Link>
            ) : (
              <Link href="/" className="btn-ghost btn-ghost-ice w-fit">
                {"← На главную"}
              </Link>
            )}
          </div>

          <div className="work-grid">
            {projects.map((project) => (
              <article key={project.title} className="work-card portfolio-card">
                <Image
                  src={project.image}
                  alt={`${project.title}, ${project.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="work-card-img"
                />
                <span className="work-card-shade" aria-hidden="true" />
                <div className="work-card-copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <button
                  type="button"
                  className="work-card-btn"
                  onClick={() => openProject(project)}
                >
                  {"Посмотреть полностью"}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Портал: секция живёт внутри dark-studio-frame (isolation: isolate),
          из-за его stacking-контекста шапка рисовалась поверх модалки */}
      {activeProject ? createPortal(
        <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <button className="portfolio-modal-backdrop" type="button" aria-label="Закрыть окно" onClick={() => setActiveProject(null)} />
          <div className="portfolio-modal-panel">
            <button
              type="button"
              className="portfolio-modal-close-x"
              aria-label="Закрыть окно"
              onClick={() => setActiveProject(null)}
            >
              ×
            </button>

            <div className="portfolio-modal-grid">
              {/* Сцена: крупное медиа + миниатюры-навигация */}
              <div className="portfolio-modal-stage">
                <div className="modal-slider">
                  {isVideo(media[slide]) ? (
                    <VideoPlayer key={media[slide]} src={media[slide]} />
                  ) : (
                    <div key={media[slide]} className="modal-slide">
                      <Image
                        src={media[slide]}
                        alt={`${activeProject.title}, кадр ${slide + 1}`}
                        fill
                        sizes="(max-width: 900px) 92vw, 640px"
                        className="object-contain"
                      />
                    </div>
                  )}

                  {media.length > 1 ? (
                    <>
                      <button
                        type="button"
                        className="modal-slider-btn modal-slider-prev"
                        aria-label="Предыдущий кадр"
                        onClick={() => setSlide((current) => (current - 1 + media.length) % media.length)}
                      >
                        {"‹"}
                      </button>
                      <button
                        type="button"
                        className="modal-slider-btn modal-slider-next"
                        aria-label="Следующий кадр"
                        onClick={() => setSlide((current) => (current + 1) % media.length)}
                      >
                        {"›"}
                      </button>
                      <span className="modal-slider-count" aria-hidden="true">
                        {slide + 1}/{media.length}
                      </span>
                    </>
                  ) : null}
                </div>

                {media.length > 1 ? (
                  <div className="modal-thumbs" role="tablist" aria-label="Кадры проекта">
                    {media.map((item, i) => (
                      <button
                        key={item}
                        type="button"
                        role="tab"
                        aria-selected={i === slide}
                        aria-label={`Кадр ${i + 1}`}
                        className={`modal-thumb${i === slide ? " is-active" : ""}`}
                        onClick={() => setSlide(i)}
                      >
                        {isVideo(item) ? (
                          <span className="modal-thumb-video" aria-hidden="true">▶</span>
                        ) : (
                          <Image src={item} alt="" fill sizes="120px" className="object-cover" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Панель информации */}
              <aside className="portfolio-modal-side">
                <div className="portfolio-modal-copy">
                  <h3>{activeProject.title}</h3>
                  <p>{activeProject.description}</p>
                  <p className="portfolio-modal-note">
                    Внутри проекта: основной визуал, адаптация под носители, композиционная система, подготовка графики к публикации и передача исходников.
                  </p>
                </div>

                <div className="portfolio-modal-actions">
                  <Link
                    href="/#contacts"
                    className="btn-ghost btn-ghost-ice portfolio-modal-cta"
                    onClick={() => setActiveProject(null)}
                  >
                    Обсудить похожий проект
                    <span className="btn-arrow" aria-hidden="true">{"↗"}</span>
                  </Link>
                  <button type="button" className="portfolio-modal-close" onClick={() => setActiveProject(null)}>
                    Закрыть
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
