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
        const id = decodeURIComponent(link.hash.slice(1));
        const element = document.getElementById(id);
        return element ? { id, link, element } : null;
      })
      .filter((item): item is { id: string; link: HTMLAnchorElement; element: HTMLElement } => Boolean(item));

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerOffset = 82;
    let rafId = 0;
    let scrollAnimationId = 0;
    let isProgrammaticScroll = false;

    const setActiveLink = (activeId?: string) => {
      navTargets.forEach(({ id, link }) => {
        const isActive = id === activeId;
        link.dataset.active = isActive ? "true" : "false";
        link.setAttribute("aria-current", isActive ? "page" : "false");
      });
    };

    const updateActiveLink = () => {
      if (isProgrammaticScroll) {
        return;
      }

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

      setActiveLink(activeId);
    };

    const requestActiveLinkUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveLink);
    };

    const easeOutQuart = (progress: number) => 1 - Math.pow(1 - progress, 4);

    const scrollToTarget = (link: HTMLAnchorElement, target: HTMLElement, id: string) => {
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const startY = window.scrollY;
      const targetY = Math.max(0, Math.min(maxY, target.getBoundingClientRect().top + window.scrollY - headerOffset));
      const distance = targetY - startY;

      window.cancelAnimationFrame(scrollAnimationId);
      setActiveLink(id);

      if (prefersReducedMotion || Math.abs(distance) < 4) {
        window.scrollTo(0, targetY);
        history.replaceState(null, "", link.hash);
        isProgrammaticScroll = false;
        requestActiveLinkUpdate();
        return;
      }

      const duration = Math.min(820, Math.max(420, Math.abs(distance) * 0.42));
      const startTime = performance.now();
      isProgrammaticScroll = true;

      const step = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeOutQuart(progress));

        if (progress < 1) {
          scrollAnimationId = window.requestAnimationFrame(step);
          return;
        }

        window.scrollTo(0, targetY);
        history.replaceState(null, "", link.hash);
        isProgrammaticScroll = false;
        requestActiveLinkUpdate();
      };

      scrollAnimationId = window.requestAnimationFrame(step);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const id = decodeURIComponent(link.hash.slice(1));
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      event.preventDefault();
      scrollToTarget(link, target, id);
    };

    updateActiveLink();
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
