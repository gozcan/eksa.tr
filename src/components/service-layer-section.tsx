'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";

import { AnimatedText } from "./animated-text";

import heroExterior from "../../public/reference/hero-exterior.jpg";
import type { Messages } from "@/i18n/messages";

export function ServiceLayerSection({ messages }: { messages: Messages }) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const emitTheme = (theme: 'light' | 'dark') => {
      window.dispatchEvent(new CustomEvent('eksa-nav-theme', { detail: { theme } }));
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) emitTheme('dark'); },
      { threshold: 0.45 },
    );
    observer.observe(root);

    return () => { observer.disconnect(); };
  }, []);

  return (
    <section
      ref={rootRef}
      data-section="services"
      className="relative min-h-screen overflow-hidden bg-transparent text-[#efe2cc] scroll-mt-[7rem]"
    >
      <div data-service-stage className="relative flex min-h-screen items-center overflow-hidden bg-[#113a34]">
        <div
          data-service-handoff
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[24rem] bg-[linear-gradient(180deg,rgba(7,20,18,0.26),rgba(7,20,18,0.1)_52%,rgba(7,20,18,0)_100%)]"
        />
        <div
          data-service-residue
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_78%_58%,rgba(255,244,220,0.18),rgba(255,244,220,0)_28%),linear-gradient(180deg,rgba(17,58,52,0),rgba(244,239,231,0.12))]"
        />
        <div data-service-bg-image className="absolute inset-0">
          <Image src={heroExterior} alt="" fill sizes="100vw" className="object-cover object-center" />
        </div>
        <div
          data-service-veil
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,15,0.28),rgba(4,18,15,0.18)_38%,rgba(4,18,15,0.34)_100%),radial-gradient(circle_at_18%_24%,rgba(194,157,98,0.12),rgba(194,157,98,0)_28%),radial-gradient(circle_at_76%_78%,rgba(106,146,134,0.12),rgba(106,146,134,0)_26%)]"
        />
        <div
          data-service-glow
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_44%,rgba(244,224,184,0.14),rgba(244,224,184,0)_28%),radial-gradient(circle_at_74%_24%,rgba(106,146,134,0.12),rgba(106,146,134,0)_24%)]"
        />
        <div
          data-service-beam
          className="absolute left-[-18%] top-0 h-full w-[44%] bg-[linear-gradient(90deg,rgba(255,243,220,0),rgba(255,243,220,0.22),rgba(255,243,220,0))] mix-blend-screen"
        />
        <div data-service-content className="relative z-10 w-full px-[2.4rem] py-[7rem] md:px-[6rem] md:py-[9rem] lg:px-[8rem] lg:py-[11rem]">
          <div data-service-content-inner className="mx-auto grid max-w-[144rem] gap-[3.2rem] md:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] md:items-end">
            <div data-service-copy className="relative">
              <div className="absolute inset-[-4rem_-3rem_-3rem_-3rem] -z-10 rounded-[4rem] bg-[radial-gradient(circle_at_28%_36%,rgba(6,23,20,0.86),rgba(6,23,20,0.72)_42%,rgba(6,23,20,0.34)_68%,rgba(6,23,20,0)_100%)] blur-[18px]" />
              <p data-service-eyebrow className="mb-[1.4rem] text-[1rem] uppercase tracking-[0.3em] text-[#f2e8d8]/86 md:text-[1.08rem]">
                {messages.section3.eyebrow}
              </p>
              <p data-service-kicker className="mb-[1.8rem] text-[2.4rem] leading-[1] text-[#f3e7d2]/94 md:text-[3.2rem] lg:text-[4rem]">
                {messages.section3.kicker}
              </p>
              <AnimatedText
                text={messages.section3.title}
                className="max-w-[84rem] text-[5rem] leading-[0.94] tracking-[-0.035em] text-[#fbf3e6] md:text-[7rem] lg:text-[9rem]"
                staggerAmount={0.05}
              />
              <p data-service-body className="mt-[2rem] max-w-[66rem] text-[1.45rem] leading-[1.58] text-[#efe4d1]/92 md:text-[1.8rem] lg:text-[2rem]">
                {messages.section3.body}
              </p>
            </div>

            <div data-service-cards-column className="grid gap-[1.2rem] lg:grid-cols-1 xl:grid-cols-3">
              {messages.section3.items.map((item) => (
                <article
                  key={item.title}
                  data-service-card
                  className="rounded-[2.2rem] border border-white/10 bg-[rgba(7,27,23,0.42)] p-[2rem] backdrop-blur-[14px]"
                >
                  <h3
                    className="text-[2.2rem] leading-[0.96] tracking-[-0.04em] text-[#f3e7d2] md:text-[2.6rem]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-[1rem] text-[1.25rem] leading-[1.56] text-[#e7dcc8]/78 md:text-[1.38rem]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}