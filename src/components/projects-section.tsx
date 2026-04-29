"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AnimatedCard } from "./animated-card";
import { AnimatedText } from "./animated-text";

import heroExterior from "../../public/reference/hero-exterior.jpg";
import heroLiving from "../../public/reference/hero-living.jpg";
import heroLobby from "../../public/reference/hero-lobby.jpg";
import sectionRealPhoto from "../../public/generated/section-real-photo.jpg";
import type { Messages } from "@/i18n/messages";

function getStackState(slot: number) {
  if (slot <= -3) {
    return { xPercent: -46, yPercent: -12, rotate: -18, scale: 0.86, autoAlpha: 0.74, zIndex: 10 };
  }

  if (slot === -2) {
    return { xPercent: -31, yPercent: -8, rotate: -12, scale: 0.91, autoAlpha: 0.82, zIndex: 14 };
  }

  if (slot === -1) {
    return { xPercent: -17, yPercent: -3, rotate: -6, scale: 0.96, autoAlpha: 0.9, zIndex: 20 };
  }

  if (slot === 0) {
    return { xPercent: 10, yPercent: 8, rotate: 7, scale: 1.06, autoAlpha: 1, zIndex: 30 };
  }

  if (slot === 1) {
    return { xPercent: 21, yPercent: 16, rotate: 11, scale: 1.01, autoAlpha: 0.78, zIndex: 24 };
  }

  return { xPercent: 32, yPercent: 24, rotate: 15, scale: 0.97, autoAlpha: 0.56, zIndex: 18 };
}

// ---------------------------------------------------------------------------
// Exported setup function — called by TakeoverSection via buildPinnedTimeline
// ---------------------------------------------------------------------------
export function setupProjectsPinnedTimeline(tl: gsap.core.Timeline, root: Element) {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!isDesktop) return;

  const stage = root.querySelector("[data-project-stage]");
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-project-card]"));
  const eyebrow = root.querySelector("[data-project-eyebrow]");
  const body = root.querySelector("[data-project-body]");
  const glow = root.querySelector("[data-project-glow]");
  const handoff = root.querySelector("[data-project-handoff]");
  const residue = root.querySelector("[data-project-residue]");

  if (!stage || cards.length === 0) return;

  // Initial states
  gsap.set(handoff, { autoAlpha: 0.94, yPercent: 0, scaleY: 1.08, transformOrigin: "50% 0%" });
  gsap.set(residue, { autoAlpha: 0, scale: 0.94 });
  gsap.set(eyebrow, { autoAlpha: 0, y: 20, letterSpacing: "0.36em" });
  gsap.set(body, { autoAlpha: 0, y: 30, filter: "blur(8px)" });
  gsap.set(glow, { autoAlpha: 0.24, scale: 0.88 });

  cards.forEach((card, index) => {
    const image = card.querySelector("[data-project-image]");
    const number = card.querySelector("[data-project-number]");
    const label = card.querySelector("[data-project-label]");
    const text = card.querySelector("[data-project-text]");
    const state = getStackState(index);

    gsap.set(card, {
      xPercent: state.xPercent + 10,
      yPercent: state.yPercent + 10,
      rotate: state.rotate + 4,
      scale: state.scale * 0.94,
      autoAlpha: 0,
      zIndex: state.zIndex,
      transformPerspective: 1800,
      transformOrigin: "50% 100%",
    });
    gsap.set(image, {
      scale: 1.14 + Math.min(index, 2) * 0.025,
      xPercent: state.xPercent * 0.22 + 4,
      yPercent: 10 + index * 2.2,
      filter: "brightness(0.82) saturate(0.88)",
    });
    gsap.set(number, { autoAlpha: 0, x: 18 });
    gsap.set(label, { autoAlpha: 0, x: 20 });
    gsap.set(text, { autoAlpha: 0, y: 24, filter: "blur(7px)" });
  });

  // Animation timeline (no scrollTrigger config — TakeoverSection handles pinning)
  tl.to(handoff, { autoAlpha: 0, yPercent: -22, scaleY: 0.92, duration: 0.72, ease: "none" }, 0);
  tl.to(eyebrow, { autoAlpha: 0.72, y: 0, letterSpacing: "0.3em", duration: 0.4, ease: "none" }, 0);
  tl.to(body, { autoAlpha: 0.8, y: 0, filter: "blur(0px)", duration: 0.5, ease: "none" }, 0.16);
  tl.to(glow, { autoAlpha: 0.38, scale: 1, duration: 0.8, ease: "none" }, 0);

  cards.forEach((card, index) => {
    const image = card.querySelector("[data-project-image]");
    const number = card.querySelector("[data-project-number]");
    const label = card.querySelector("[data-project-label]");
    const text = card.querySelector("[data-project-text]");
    const state = getStackState(index);
    const isFront = index === 0;
    const base = 0.78 + index * 0.08;

    tl.to(card, { ...state, ease: "none", duration: 0.84 }, base);
    tl.to(image, {
      scale: isFront ? 1 : 1.08 + Math.min(index, 2) * 0.01,
      xPercent: state.xPercent * 0.14,
      yPercent: isFront ? 0 : 4 + index * 1.2,
      filter: isFront ? "brightness(1) saturate(1)" : "brightness(0.9) saturate(0.92)",
      ease: "none",
      duration: 0.84,
    }, base);
    tl.to(number, { autoAlpha: isFront ? 1 : 0.46, x: isFront ? 0 : 16, ease: "none", duration: 0.52 }, base + 0.12);
    tl.to(label, { autoAlpha: isFront ? 1 : 0.42, x: isFront ? 0 : 18, ease: "none", duration: 0.52 }, base + 0.12);
    tl.to(text, {
      autoAlpha: isFront ? 1 : 0.5,
      y: isFront ? 0 : 20,
      filter: isFront ? "blur(0px)" : "blur(5px)",
      ease: "none",
      duration: 0.6,
    }, base + 0.18);
  });

  for (let activeIndex = 1; activeIndex < cards.length; activeIndex += 1) {
    const base = 2.02 + (activeIndex - 1) * 1.34;

    cards.forEach((card, cardIndex) => {
      const image = card.querySelector("[data-project-image]");
      const number = card.querySelector("[data-project-number]");
      const label = card.querySelector("[data-project-label]");
      const text = card.querySelector("[data-project-text]");
      const state = getStackState(cardIndex - activeIndex);
      const isActive = cardIndex === activeIndex;

      tl.to(card, { ...state, ease: "none", duration: 0.96 }, base);
      tl.to(image, {
        scale: isActive ? 1 : 1.05,
        xPercent: state.xPercent * 0.14,
        yPercent: isActive ? 0 : 4 + Math.max(cardIndex - activeIndex + 1, 0) * 1.8,
        filter: isActive ? "brightness(1) saturate(1)" : "brightness(0.9) saturate(0.92)",
        ease: "none",
        duration: 0.96,
      }, base);
      tl.to(number, { autoAlpha: isActive ? 1 : 0.46, x: isActive ? 0 : 16, ease: "none", duration: 0.64 }, base + 0.12);
      tl.to(label, { autoAlpha: isActive ? 1 : 0.42, x: isActive ? 0 : 18, ease: "none", duration: 0.64 }, base + 0.12);
      tl.to(text, {
        autoAlpha: isActive ? 1 : 0.5,
        y: isActive ? 0 : 20,
        filter: isActive ? "blur(0px)" : "blur(5px)",
        ease: "none",
        duration: 0.74,
      }, base + 0.18);
    });
  }

  tl.to(residue, { autoAlpha: 0.18, scale: 1, duration: 0.82, ease: "none" }, tl.duration() - 0.96);
}

export function ProjectsSection({ messages }: { messages: Messages }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const projectImages = [heroExterior, heroLiving, heroLobby, sectionRealPhoto];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const emit = (theme: 'light' | 'dark') =>
      window.dispatchEvent(new CustomEvent('eksa-nav-theme', { detail: { theme } }));
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) emit('light'); },
      { threshold: 0.3 },
    );
    observer.observe(root);
    return () => { observer.disconnect(); };
  }, []);

  return (
    <section
      ref={rootRef}
      data-section="projects"
      className="relative bg-[#f4efe7] px-[2.4rem] py-[7rem] text-[#111111] md:px-[4rem] md:py-[9rem] lg:px-0 lg:py-0 scroll-mt-[7rem]"
    >
      <div
        data-project-handoff
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[26rem] bg-[linear-gradient(180deg,rgba(17,58,52,0.34),rgba(17,58,52,0.14)_52%,rgba(17,58,52,0)_100%)]"
      />
      <div
        data-project-residue
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_78%_54%,rgba(255,255,255,0.18),rgba(255,255,255,0)_28%),linear-gradient(180deg,rgba(244,239,231,0),rgba(46,67,94,0.12))]"
      />
      <div className="flex min-h-screen w-full items-center">
        <div className="w-full">
          <div className="grid gap-[1.6rem] lg:hidden">
            <div className="max-w-[34rem]">
              <p className="mb-[1.4rem] text-[1rem] uppercase tracking-[0.3em] text-black/56">
                {messages.section4.eyebrow}
              </p>
              <AnimatedText
                text={messages.section4.title}
                className="text-[5.2rem] leading-[0.88] tracking-[-0.06em] text-[#101010] md:text-[7rem] lg:text-[8.2rem]"
                staggerAmount={0.05}
              />
              <p className="mt-[1.8rem] max-w-[30rem] text-[1.45rem] leading-[1.58] text-black/66 md:text-[1.7rem]">
                {messages.section4.body}
              </p>
            </div>

            {messages.section4.items.map((item, index) => (
              <AnimatedCard key={item.title}>
                <article className="overflow-hidden rounded-[3.2rem] border border-black/12 bg-[#f8f5ef] shadow-[0_2.4rem_7rem_rgba(0,0,0,0.08)]">
                <div className="flex items-start justify-between border-b border-black/10 px-[2.4rem] py-[2rem] md:px-[3rem]">
                  <span className="text-[7.2rem] leading-none tracking-[-0.08em] text-[#f08bab] md:text-[9rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-[0.8rem] text-[1.1rem] font-medium uppercase tracking-[0.24em] text-black/42">
                    {messages.section4.cardLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div className="relative min-h-[30rem] overflow-hidden">
                    <Image
                      src={projectImages[index] ?? heroExterior}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-end p-[2.4rem] md:p-[3rem] lg:p-[3.4rem]">
                    <h3
                      className="text-[3.6rem] leading-[0.9] tracking-[-0.05em] text-[#101010] md:text-[4.4rem]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-[1.2rem] max-w-[28rem] text-[1.45rem] leading-[1.56] text-black/64 md:text-[1.62rem]">
                      {item.body}
                    </p>
                  </div>
                </div>
                </article>
              </AnimatedCard>
            ))}
          </div>

          <div
            data-project-stage
            className="relative hidden min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,#ede6dc_0%,#f5efe6_36%,#e8dfd2_100%)] lg:block"
          >
            <div
              data-project-glow
              className="absolute inset-0 bg-[radial-gradient(circle_at_64%_56%,rgba(255,255,255,0.72),rgba(255,255,255,0)_30%),radial-gradient(circle_at_18%_22%,rgba(240,139,171,0.1),rgba(240,139,171,0)_24%)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_26%,rgba(0,0,0,0.06)_100%)]" />

            <div className="absolute left-[6.2rem] top-[18.4rem] z-40 max-w-[56rem]">
              <p data-project-eyebrow className="mb-[1.4rem] text-[1rem] uppercase tracking-[0.3em] text-black/56">
                {messages.section4.eyebrow}
              </p>
              <AnimatedText
                text={messages.section4.title}
                className="text-[7.4rem] leading-[0.88] tracking-[-0.06em] text-[#101010]"
                staggerAmount={0.05}
              />
              <p data-project-body className="mt-[2.1rem] max-w-[48rem] text-[1.92rem] leading-[1.58] text-black/66">
                {messages.section4.body}
              </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              {messages.section4.items.map((item, index) => (
                <article
                  key={item.title}
                  data-project-card
                  className="absolute ml-[14vw] h-[68rem] w-[46rem] overflow-hidden rounded-[3rem] border border-black/12 bg-[#f8f5ef] shadow-[0_3.2rem_9rem_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-start justify-between border-b border-black/10 px-[2.4rem] py-[2rem]">
                    <span data-project-number className="text-[7.6rem] leading-none tracking-[-0.08em] text-[#f08bab]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span data-project-label className="pt-[0.8rem] text-[1.1rem] font-medium uppercase tracking-[0.24em] text-black/42">
                      {messages.section4.cardLabel}
                    </span>
                  </div>

                  <div className="grid h-[calc(100%-13.2rem)] grid-rows-[38rem_minmax(0,1fr)]">
                    <div data-project-image className="relative overflow-hidden">
                      <Image
                        src={projectImages[index] ?? heroExterior}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 26rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div data-project-text className="flex flex-col justify-end bg-[linear-gradient(180deg,#f8f5ef_0%,#f1ebe2_100%)] p-[3.2rem]">
                      <h3
                        className="text-[4.4rem] leading-[0.9] tracking-[-0.05em] text-[#101010]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-[1.2rem] max-w-[30rem] text-[1.56rem] leading-[1.56] text-black/64">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
