"use client";

import { useEffect } from "react";

/*
 * Scroll-reveal + подсветка активного пункта навигации.
 * Прокрутка к якорям — нативная: html { scroll-behavior: smooth } + scroll-padding-top,
 * без JS-анимации (двойное сглаживание ломало докрутку).
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const targets = Array.from(document.querySelectorAll<HTMLElement>("section, footer, .reveal-blur"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    targets.forEach((target) => observer.observe(target));

    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".toolbar-link[href^='#']"));
    const navTargets = navLinks
      .map((link) => {
        const id = decodeURIComponent(link.hash.slice(1));
        const element = document.getElementById(id);
        return element ? { id, link, element } : null;
      })
      .filter((item): item is { id: string; link: HTMLAnchorElement; element: HTMLElement } => Boolean(item));

    let rafId = 0;

    const setActiveLink = (activeId?: string) => {
      navTargets.forEach(({ id, link }) => {
        const isActive = id === activeId;
        link.dataset.active = isActive ? "true" : "false";
        link.setAttribute("aria-current", isActive ? "page" : "false");
      });
    };

    const updateActiveLink = () => {
      // document-level координаты: offsetTop здесь непригоден,
      // секции лежат внутри position: relative рамки
      const pivot = 140;
      let activeId = navTargets[0]?.id;

      navTargets.forEach(({ id, element }) => {
        if (element.getBoundingClientRect().top <= pivot) {
          activeId = id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        activeId = navTargets.at(-1)?.id ?? activeId;
      }

      setActiveLink(activeId);
    };

    const requestActiveLinkUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveLink);
    };

    // мгновенная подсветка по клику, дальше скролл-трекер сам подхватит
    const handleNavClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      setActiveLink(decodeURIComponent(link.hash.slice(1)));
    };

    updateActiveLink();
    navLinks.forEach((link) => link.addEventListener("click", handleNavClick));
    window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
    window.addEventListener("resize", requestActiveLinkUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      navLinks.forEach((link) => link.removeEventListener("click", handleNavClick));
      window.removeEventListener("scroll", requestActiveLinkUpdate);
      window.removeEventListener("resize", requestActiveLinkUpdate);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
