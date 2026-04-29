"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "./animated-text";
import { useAOS } from "@/lib/animations";

import type { Messages } from "@/i18n/messages";

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }

export function ContactSection({ messages }: { messages: Messages }) {
  const rootRef = useRef<HTMLElement | null>(null);
  
  useAOS();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const emit = (theme: 'light' | 'dark') =>
      window.dispatchEvent(new CustomEvent('eksa-nav-theme', { detail: { theme } }));
    const observer = new IntersectionObserver(
      ([entry]) => { emit(entry.isIntersecting ? 'light' : 'dark'); },
      { threshold: 0.3 },
    );
    observer.observe(root);
    return () => { observer.disconnect(); emit('dark'); };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const handoff = root.querySelector("[data-contact-handoff]");
      const bg = root.querySelector("[data-contact-bg]");
      const shell = root.querySelector("[data-contact-shell]");
      const leftPanel = root.querySelector("[data-contact-left]");
      const rightPanel = root.querySelector("[data-contact-right]");
      const eyebrow = root.querySelector("[data-contact-eyebrow]");
      const body = root.querySelector("[data-contact-body]");
      const cards = Array.from(root.querySelectorAll("[data-contact-card]"));

      gsap.set(handoff, { autoAlpha: 0.88, yPercent: 0 });
      gsap.set(bg, { autoAlpha: 0.82 });
      gsap.set(shell, { autoAlpha: 0.72, scale: 0.985 });
      gsap.set(leftPanel, { autoAlpha: 0, y: 40, filter: "blur(10px)" });
      gsap.set(rightPanel, { autoAlpha: 0, y: 56, filter: "blur(12px)" });
      gsap.set(eyebrow, { autoAlpha: 0, y: 16, letterSpacing: "0.34em" });
      gsap.set(body, { autoAlpha: 0, y: 22, filter: "blur(8px)" });
      gsap.set(cards, { autoAlpha: 0, y: 26, filter: "blur(8px)" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          end: "top 18%",
          scrub: 1.15,
        },
      });

      timeline.to(handoff, { autoAlpha: 0, yPercent: -26, ease: "none", duration: 0.54 }, 0);
      timeline.to(bg, { autoAlpha: 1, ease: "none", duration: 0.62 }, 0.02);
      timeline.to(shell, { autoAlpha: 1, scale: 1, ease: "none", duration: 0.74 }, 0.08);
      timeline.to(leftPanel, { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "none", duration: 0.7 }, 0.28);
      timeline.to(rightPanel, { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "none", duration: 0.8 }, 0.46);
      timeline.to(eyebrow, { autoAlpha: 0.72, y: 0, letterSpacing: "0.24em", ease: "none", duration: 0.22 }, 0.44);
      timeline.to(body, { autoAlpha: 0.84, y: 0, filter: "blur(0px)", ease: "none", duration: 0.3 }, 0.78);
      timeline.to(cards, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        ease: "none",
        duration: 0.28,
      }, 0.94);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#f1ebe2] px-[2.4rem] py-[4rem] text-[#111111] md:px-[6rem] md:py-[6rem] lg:px-[8rem] scroll-mt-[7rem]"
    >
      <div
        data-contact-handoff
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[22rem] bg-[linear-gradient(180deg,rgba(46,67,94,0.18),rgba(46,67,94,0.08)_54%,rgba(46,67,94,0)_100%)]"
      />
      <div
        data-contact-bg
        className="absolute inset-0 bg-[radial-gradient(circle_at_24%_26%,rgba(46,67,94,0.12),rgba(46,67,94,0)_28%),radial-gradient(circle_at_82%_76%,rgba(240,139,171,0.12),rgba(240,139,171,0)_22%)]"
      />
      <div
        data-contact-shell
        className="relative mx-auto grid w-full max-w-[144rem] gap-[2rem] overflow-hidden rounded-[3.2rem] border border-black/8 bg-[rgba(255,255,255,0.52)] shadow-[0_3rem_8rem_rgba(55,65,88,0.08)] backdrop-blur-[16px] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]"
      >
        <div
          data-contact-left
          className="relative flex min-h-[72rem] flex-col overflow-hidden bg-[#374158] px-[2.2rem] py-[2.4rem] text-[#f4efe7] md:px-[3rem] md:py-[3rem] lg:px-[4rem] lg:py-[4rem]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(244,239,231,0.1),rgba(244,239,231,0)_34%)]" />
          <div className="absolute right-[-8rem] top-[18%] h-[64%] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(244,239,231,0.22),rgba(244,239,231,0)_68%)] blur-[34px]" />
          <div className="relative z-10 flex min-h-full flex-1 flex-col justify-between">
            <div className="max-w-[46rem] pt-[3rem] md:pt-[4rem]">
              <p data-contact-eyebrow className="mb-[1.4rem] text-[1rem] uppercase tracking-[0.24em] text-[#f4efe7]/44">
                {messages.section6.panelEyebrow}
              </p>
              <AnimatedText
                text={messages.section6.panelTitle}
                className="max-w-[54rem] text-[4.4rem] leading-[1.02] tracking-[-0.045em] text-[#fbf3e6] md:text-[5.8rem] lg:text-[7.2rem]"
                staggerAmount={0.05}
              />
              <p data-contact-body className="mt-[1.6rem] max-w-[48rem] text-[1.48rem] leading-[1.62] text-[#f1e7d6]/72 md:text-[1.8rem]">
                {messages.section6.panelBody}
              </p>
            </div>
          </div>
        </div>

        <div
          data-contact-right
          className="relative flex min-h-[72rem] items-center px-[2rem] py-[2rem] md:px-[3rem] md:py-[3rem] lg:px-[4rem] lg:py-[4rem]"
        >
          <div className="grid w-full gap-[1.4rem]">
            {messages.section6.items.map((item, index) => (
              <article
                key={item.label}
                data-contact-card
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
                className="rounded-[2.4rem] border border-black/8 bg-[rgba(255,255,255,0.66)] p-[2rem] shadow-[0_1rem_3rem_rgba(17,17,17,0.05)] backdrop-blur-[12px]"
                style={{
                  marginLeft: `${index * 2.4}rem`,
                  marginRight: `${Math.max(0, (2 - index) * 1.2)}rem`,
                }}
              >
                <p className="text-[1rem] uppercase tracking-[0.24em] text-black/42">
                  {item.label}
                </p>
                <p
                  className="mt-[1.2rem] text-[2.8rem] leading-[0.98] tracking-[-0.04em] text-[#101010] md:text-[3.2rem]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {item.value}
                </p>
                <p className="mt-[1rem] max-w-[42rem] text-[1.28rem] leading-[1.56] text-black/62">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
