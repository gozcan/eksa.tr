"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import heroLobby from "../../public/reference/hero-lobby.jpg";
import type { Messages } from "@/i18n/messages";

// ---------------------------------------------------------------------------
// Exported setup function — called by TakeoverSection via buildPinnedTimeline
// ---------------------------------------------------------------------------
export function setupAboutPinnedTimeline(tl: gsap.core.Timeline, root: Element) {
  const handoff = root.querySelector("[data-about-handoff]");
  const imagePanel = root.querySelector("[data-about-image-panel]");
  const image = root.querySelector("[data-about-image]");
  const imageBottomCard = root.querySelector("[data-about-image-bottom-card]");
  const content = root.querySelector("[data-about-content]");
  const eyebrow = root.querySelector("[data-about-eyebrow]");
  const title = root.querySelector("[data-about-title]");
  const body = root.querySelector("[data-about-body]");
  const values = Array.from(root.querySelectorAll("[data-about-value]"));
  const residue = root.querySelector("[data-about-residue]");

  // Initial states
  gsap.set(handoff, { autoAlpha: 0.92, yPercent: 0 });
  gsap.set(residue, { autoAlpha: 0, scale: 0.92 });
  gsap.set(imagePanel, {
    autoAlpha: 0,
    y: 120,
    scaleY: 1,
    transformOrigin: "50% 100%",
    clipPath: "inset(100% 0% 0% 0%)",
    filter: "blur(10px)",
  });
  gsap.set(image, { scale: 1.14, yPercent: 8, filter: "brightness(0.78) saturate(0.88)" });
  gsap.set(imageBottomCard, { autoAlpha: 0, y: 36, filter: "blur(10px)" });
  gsap.set(content, {
    autoAlpha: 0,
    y: -120,
    scaleY: 1,
    transformOrigin: "50% 0%",
    clipPath: "inset(0% 0% 100% 0%)",
  });
  gsap.set(eyebrow, { autoAlpha: 0, y: 18, letterSpacing: "0.36em" });
  gsap.set(title, { autoAlpha: 0, y: 44, filter: "blur(10px)" });
  gsap.set(body, { autoAlpha: 0, y: 28, filter: "blur(8px)" });
  gsap.set(values, { autoAlpha: 0, y: 34, filter: "blur(8px)" });

  // Animation timeline (no scrollTrigger config — TakeoverSection handles pinning)
  tl.to(handoff, { autoAlpha: 0, yPercent: -24, ease: "none", duration: 0.88 }, 0.18);
  tl.to(imagePanel, {
    autoAlpha: 1,
    y: 0,
    scaleY: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    filter: "blur(0px)",
    ease: "none",
    duration: 1.1,
  }, 1.2);
  tl.to(image, {
    scale: 1,
    yPercent: 0,
    filter: "brightness(1) saturate(1)",
    ease: "none",
    duration: 1.24,
  }, 1.34);
  tl.to(imageBottomCard, { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "none", duration: 0.68 }, 1.76);
  tl.to(content, {
    autoAlpha: 1,
    y: 0,
    scaleY: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "none",
    duration: 1.04,
  }, 1.42);
  tl.to(eyebrow, { autoAlpha: 0.72, y: 0, letterSpacing: "0.3em", ease: "none", duration: 0.38 }, 1.98);
  tl.to(title, { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "none", duration: 0.62 }, 2.16);
  tl.to(body, { autoAlpha: 0.86, y: 0, filter: "blur(0px)", ease: "none", duration: 0.54 }, 2.42);
  tl.to(values, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    stagger: 0.08,
    ease: "none",
    duration: 0.42,
  }, 2.68);
  tl.to(residue, { autoAlpha: 0.16, scale: 1, ease: "none", duration: 0.54 }, 2.92);
}

export function AboutSection({ messages }: { messages: Messages }) {
  const rootRef = useRef<HTMLElement | null>(null);

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
      data-section="about"
      className="relative flex min-h-screen items-stretch overflow-hidden bg-[#2e435e] text-[#111111] scroll-mt-[7rem]"
    >
      <div
        data-about-handoff
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[26rem] bg-[linear-gradient(180deg,rgba(244,239,231,0.34),rgba(244,239,231,0.12)_52%,rgba(244,239,231,0)_100%)]"
      />
      <div
        data-about-residue
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_72%_46%,rgba(255,255,255,0.14),rgba(255,255,255,0)_28%),linear-gradient(180deg,rgba(241,235,226,0),rgba(241,235,226,0.14))]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.08),rgba(255,255,255,0)_24%),radial-gradient(circle_at_84%_76%,rgba(240,139,171,0.12),rgba(240,139,171,0)_22%)]" />

      <div className="relative grid min-h-screen w-full grid-cols-1 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
        <div data-about-image-panel className="relative min-h-[42rem] overflow-hidden bg-[#24354b] lg:min-h-screen">
          <div data-about-image className="absolute inset-0">
            <Image src={heroLobby} alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,28,0.12),rgba(8,16,28,0.28)_38%,rgba(8,16,28,0.54)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(255,255,255,0.18),rgba(255,255,255,0)_28%),radial-gradient(circle_at_78%_74%,rgba(255,220,190,0.16),rgba(255,220,190,0)_24%)]" />
          <div className="absolute right-[-6rem] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(255,255,255,0)_70%)] blur-[34px]" />

          <div data-about-image-bottom-card className="absolute inset-x-[2rem] bottom-[2rem] rounded-[2.6rem] border border-white/12 bg-[rgba(11,20,31,0.4)] px-[2rem] py-[2rem] text-[#f4efe7] backdrop-blur-[14px] md:inset-x-[3rem] md:bottom-[3rem] md:max-w-[46rem] md:px-[2.6rem] md:py-[2.6rem] lg:left-[4rem] lg:right-auto">
            <p className="text-[0.98rem] uppercase tracking-[0.24em] text-[#f4efe7]/48">
              Ekşioğlu Grup mirası
            </p>
            <p
              className="mt-[1.2rem] text-[3rem] leading-[0.96] tracking-[-0.04em] text-[#fbf3e6] md:text-[3.6rem] lg:text-[4.2rem]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Köklü inşaat deneyimini çağdaş bir proje diline taşıyan yapı.
            </p>
          </div>
        </div>

        <div data-about-content className="relative flex min-h-[44rem] flex-col justify-between px-[2.2rem] py-[2.8rem] md:px-[3rem] md:py-[3.4rem] lg:min-h-screen lg:px-[5.6rem] lg:py-[5rem]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,235,226,0.96),rgba(241,235,226,0.92))]" />
          <div className="absolute inset-y-0 left-0 w-px bg-black/10" />
          <div className="absolute right-[-12rem] top-[16%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(55,65,88,0.14),rgba(55,65,88,0)_68%)] blur-[40px]" />
          <div className="absolute bottom-[-10rem] left-[16%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(240,139,171,0.14),rgba(240,139,171,0)_72%)] blur-[34px]" />

          <div className="relative z-10 flex flex-1 items-center">
            <div className="max-w-[82rem]">
              <p data-about-eyebrow className="mb-[1.4rem] text-[1rem] uppercase tracking-[0.3em] text-black/42">
                {messages.section5.eyebrow}
              </p>
              <h2
                data-about-title
                className="max-w-[88rem] text-[4.8rem] leading-[0.94] tracking-[-0.055em] text-[#101010] md:text-[6.8rem] lg:text-[8.8rem]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {messages.section5.title}
              </h2>
              <p data-about-body className="mt-[2.2rem] max-w-[72rem] text-[1.42rem] leading-[1.62] text-black/66 md:text-[1.78rem] lg:text-[2rem]">
                {messages.section5.body}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-[3rem] grid gap-[1.2rem] md:grid-cols-3 lg:mt-[4rem]">
            {messages.section5.values.map((value, index) => (
              <article
                key={value.label}
                data-about-value
                className="rounded-[2.6rem] border border-black/8 bg-[rgba(255,255,255,0.68)] p-[2rem] shadow-[0_1rem_3rem_rgba(17,17,17,0.04)] backdrop-blur-[12px] lg:p-[2.4rem]"
                style={{
                  marginTop: `${index * 1.2}rem`,
                }}
              >
                <p className="text-[1rem] uppercase tracking-[0.24em] text-black/42">
                  {value.label}
                </p>
                <p
                  className="mt-[1.2rem] text-[2.9rem] leading-[0.96] tracking-[-0.04em] text-[#101010] md:text-[3.3rem]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {value.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
