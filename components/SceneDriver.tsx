"use client";

import { useEffect } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Drives the "How an engagement runs" pinned scene from the native scroll. Nothing captures the wheel:
// the section is its stage's height plus --hold screens tall, the stage is sticky, and the scroll position
// inside that hold becomes progress p (0–1). p fills the line beside the steps (--play, in CSS) and marks
// each step reached as the line passes it. Reduced motion and no-script visitors get every step at once.
export function SceneDriver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scene = document.querySelector<HTMLElement>('.scene[data-scene="steps"]');
    const stage = scene?.querySelector<HTMLElement>(".scene-stage");
    if (!scene || !stage) return;

    const steps = Array.from(scene.querySelectorAll<HTMLElement>("[data-step]"));
    let stageH = 0;
    let stick = 0;

    // A stage taller than the screen sticks by its bottom edge so all of it stays in view.
    const measure = () => {
      const navH = document.querySelector<HTMLElement>("[data-nav]")?.offsetHeight ?? 0;
      stageH = stage.offsetHeight;
      stick = Math.min(navH, window.innerHeight - stageH);
      scene.style.setProperty("--stage-h", `${stageH}px`);
      scene.style.setProperty("--stick", `${stick}px`);
    };

    const update = () => {
      const rect = scene.getBoundingClientRect();
      const run = rect.height - stageH;
      const p = run > 0 ? clamp((stick - rect.top) / run) : 1;
      // A short rest at each end: the first step as the stage settles, all four before it leaves.
      const play = clamp((p - 0.04) / 0.84);
      scene.style.setProperty("--play", play.toFixed(4));
      const reached = Math.min(steps.length, Math.floor(play * steps.length) + 1);
      steps.forEach((el, i) => el.toggleAttribute("data-on", i < reached));
      scene.toggleAttribute("data-end", play >= 1);
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    scene.setAttribute("data-driven", "");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(stage);
    document.fonts?.ready.then(onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return null;
}
