"use client";

import { useEffect } from "react";

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
    const anchorLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    const navTargets = navLinks
      .map((link) => {
        const id = link.hash.slice(1);
        const element = document.getElementById(id);
        return element ? { id, link, element } : null;
      })
      .filter((item): item is { id: string; link: HTMLAnchorElement; element: HTMLElement } => Boolean(item));

    const scrollDuration = 680;
    let rafId = 0;
    let scrollAnimationId = 0;

    const updateActiveLink = () => {
      const pivot = window.scrollY + 130;
      let activeId = navTargets[0]?.id;

      navTargets.forEach(({ id, element }) => {
        if (element.offsetTop <= pivot) {
          activeId = id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        activeId = navTargets.at(-1)?.id ?? activeId;
      }

      navTargets.forEach(({ id, link }) => {
        const isActive = id === activeId;
        link.dataset.active = isActive ? "true" : "false";
        link.setAttribute("aria-current", isActive ? "page" : "false");
      });
    };

    const requestActiveLinkUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveLink);
    };

    updateActiveLink();

    const easeInOutCubic = (progress: number) =>
      progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const handleAnchorClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const id = link.hash.slice(1);
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      event.preventDefault();

      const startY = window.scrollY;
      const targetY = target.getBoundingClientRect().top + window.scrollY - 82;
      const distance = targetY - startY;
      const duration = scrollDuration;
      const startTime = performance.now();

      navTargets.forEach(({ id: navId, link: navLink }) => {
        const isActive = navId === id;
        navLink.dataset.active = isActive ? "true" : "false";
        navLink.setAttribute("aria-current", isActive ? "page" : "false");
      });

      window.cancelAnimationFrame(scrollAnimationId);

      const step = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));

        if (progress < 1) {
          scrollAnimationId = window.requestAnimationFrame(step);
        } else {
          history.pushState(null, "", link.hash);
          requestActiveLinkUpdate();
        }
      };

      scrollAnimationId = window.requestAnimationFrame(step);
    };

    anchorLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));
    window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
    window.addEventListener("resize", requestActiveLinkUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(scrollAnimationId);
      anchorLinks.forEach((link) => link.removeEventListener("click", handleAnchorClick));
      window.removeEventListener("scroll", requestActiveLinkUpdate);
      window.removeEventListener("resize", requestActiveLinkUpdate);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

