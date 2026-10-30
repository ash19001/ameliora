"use client";

import { useEffect } from "react";

// One observer pass for the page's scroll behaviour:
// section reveals, the current nav item, the nav's scrolled state and the mobile booking bar.
export function ScrollEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }

    const pending = new Set(targets);
    const show = (el: Element) => {
      el.setAttribute("data-in", "");
      pending.delete(el as HTMLElement);
      revealer.unobserve(el);
    };
    const revealer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Also reveal anything already scrolled past, e.g. after a jump to a deep link.
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) show(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    targets.forEach((el) => revealer.observe(el));
    cleanups.push(() => revealer.disconnect());
    // A jump can carry an element from below the viewport to above it without it ever
    // intersecting, so sweep for skipped elements as scrolling settles.
    const sweep = () => {
      for (const el of pending) if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    };

    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a[href^='#']"));
    const sections = navLinks
      .map((a) => document.querySelector<HTMLElement>(a.getAttribute("href")!))
      .filter((s): s is HTMLElement => Boolean(s));
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          navLinks.forEach((a) =>
            a.getAttribute("href") === `#${e.target.id}` ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"),
          );
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => spy.observe(s));
    cleanups.push(() => spy.disconnect());

    const nav = document.querySelector<HTMLElement>("[data-nav]");
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        nav?.toggleAttribute("data-scrolled", window.scrollY > 8);
        if (pending.size) sweep();
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // The mobile booking bar shows between the hero's button and the closing section,
    // so there is always exactly one booking button within reach.
    const bar = document.querySelector<HTMLElement>("[data-mobile-cta]");
    const heroCta = document.getElementById("hero-cta");
    const ending = [document.getElementById("book"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (bar && heroCta && ending.length) {
      let heroSeen = true;
      const endSeen = new Set<Element>();
      const watch = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.target === heroCta) heroSeen = e.isIntersecting || e.boundingClientRect.top > 0;
          else if (e.isIntersecting) endSeen.add(e.target);
          else endSeen.delete(e.target);
        }
        const show = !heroSeen && endSeen.size === 0;
        bar.toggleAttribute("data-show", show);
        bar.toggleAttribute("inert", !show);
      });
      watch.observe(heroCta);
      ending.forEach((el) => watch.observe(el));
      cleanups.push(() => watch.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
