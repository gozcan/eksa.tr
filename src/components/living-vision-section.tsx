'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from './animated-text';

import sectionRealPhoto from '../../public/generated/section-real-photo.jpg';
import type { Messages } from '@/i18n/messages';

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }

export function LivingVisionSection({ messages }: { messages: Messages }) {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const bgImage = root.querySelector('[data-vision-bg-image]');
      const bgShade = root.querySelector('[data-vision-bg-shade]');
      const bgGlow = root.querySelector('[data-vision-bg-glow]');
      const leftPanel = root.querySelector('[data-vision-left-panel]');
      const leftInner = root.querySelector('[data-vision-left-inner]');
      const eyebrow = root.querySelector('[data-vision-eyebrow]');
      const kicker = root.querySelector('[data-vision-kicker]');
      const body = root.querySelector('[data-vision-body]');
      const rightPanel = root.querySelector('[data-vision-right-panel]');
      const rightVisual = root.querySelector('[data-vision-right-visual]');
      const rightOverlay = root.querySelector('[data-vision-right-overlay]');
      const cards = Array.from(root.querySelectorAll('[data-vision-card]'));

      gsap.set(bgImage, {
        scale: 1.16,
        yPercent: 8,
        filter: 'blur(16px) brightness(0.72) saturate(0.9)',
      });
      gsap.set(bgShade, { autoAlpha: 0.86 });
      gsap.set(bgGlow, { autoAlpha: 0.06, scale: 0.84 });
      gsap.set(leftPanel, { xPercent: -104, autoAlpha: 1 });
      gsap.set(leftInner, { autoAlpha: 0, x: -30 });
      gsap.set(eyebrow, { autoAlpha: 0, x: -18, letterSpacing: '0.42em' });
      gsap.set(kicker, { autoAlpha: 0, x: -22, filter: 'blur(6px)' });
      gsap.set(body, { autoAlpha: 0, x: -22, filter: 'blur(6px)' });
      gsap.set(rightPanel, { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 });
      gsap.set(rightVisual, { yPercent: 14, scale: 1.08 });
      gsap.set(rightOverlay, { autoAlpha: 0.18 });
      gsap.set(cards, { autoAlpha: 0, y: 28, filter: 'blur(8px)' });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=2800',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          snap: {
            snapTo: (value: number) => {
              // Henüz çok az scroll → geri çık
              if (value < 0.1) return 0;
              // Yarının üstüne geçtiysen → tamamen tamamla
              if (value >= 0.55) return 1;
              // Arada kal → animasyonlar serbestçe oynar
              return value;
            },
            duration: { min: 0.3, max: 0.65 },
            ease: 'power2.out',
            delay: 0.06,
          },
        },
      });

      timeline.to(
        bgImage,
        {
          scale: 1,
          yPercent: 0,
          filter: 'blur(0px) brightness(1) saturate(1)',
          ease: 'none',
          duration: 0.34,
        },
        0,
      );
      timeline.to(
        bgShade,
        { autoAlpha: 0.54, ease: 'none', duration: 0.28 },
        0.02,
      );
      timeline.to(
        bgGlow,
        { autoAlpha: 0.22, scale: 1, ease: 'none', duration: 0.24 },
        0.08,
      );
      timeline.to(
        leftPanel,
        { xPercent: 0, ease: 'none', duration: 0.42 },
        0.4,
      );
      timeline.to(
        leftInner,
        { autoAlpha: 1, x: 0, ease: 'none', duration: 0.24 },
        0.5,
      );
      timeline.to(
        eyebrow,
        {
          autoAlpha: 0.72,
          x: 0,
          letterSpacing: '0.3em',
          ease: 'none',
          duration: 0.14,
        },
        0.56,
      );
      timeline.to(
        kicker,
        {
          autoAlpha: 0.88,
          x: 0,
          filter: 'blur(0px)',
          ease: 'none',
          duration: 0.16,
        },
        0.62,
      );
      // Note: Title is animated by AnimatedText component
      timeline.to(
        body,
        {
          autoAlpha: 0.86,
          x: 0,
          filter: 'blur(0px)',
          ease: 'none',
          duration: 0.18,
        },
        0.78,
      );
      timeline.to(
        rightPanel,
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 0.46 },
        0.58,
      );
      timeline.to(
        rightVisual,
        { yPercent: 0, scale: 1, ease: 'none', duration: 0.44 },
        0.6,
      );
      timeline.to(
        rightOverlay,
        { autoAlpha: 0.34, ease: 'none', duration: 0.22 },
        0.66,
      );
      timeline.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          ease: 'none',
          duration: 0.18,
        },
        0.88,
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="living-vision"
      className="relative min-h-screen bg-[#0b241f] text-[#efe2cc] scroll-mt-[7rem]"
      style={{ zIndex: 20 }}
    >
      <div
        data-vision-bg-image
        className="absolute inset-0"
      >
        <Image
          src={sectionRealPhoto}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[60%_46%]"
        />
      </div>
      <div
        data-vision-bg-shade
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,18,0.8),rgba(7,20,18,0.4)_42%,rgba(7,20,18,0.28)_100%)]"
      />
      <div
        data-vision-bg-glow
        className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(216,193,156,0.12),rgba(216,193,156,0)_26%),radial-gradient(circle_at_22%_78%,rgba(103,140,129,0.12),rgba(103,140,129,0)_24%)]"
      />

      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 md:grid-cols-[56%_44%]">
        <div
          data-vision-left-panel
          className="relative overflow-hidden bg-[rgba(7,20,18,0.86)]"
        >
          <div
            data-vision-left-inner
            className="flex h-full items-center px-[2.4rem] py-[7rem] md:px-[6rem] md:py-[9rem] lg:px-[8rem] lg:py-[11rem]"
          >
            <div className="max-w-[64rem]">
              <p
                data-vision-eyebrow
                className="mb-[1.2rem] text-[1rem] uppercase tracking-[0.3em] text-[#d8ccb8]/68"
              >
                {messages.section2.eyebrow}
              </p>
              <p
                data-vision-kicker
                className="mb-[1.8rem] text-[2.4rem] leading-none text-[#d8ccb8]/88 md:text-[3rem] lg:text-[3.8rem]"
              >
                {messages.section2.kicker}
              </p>
              <AnimatedText
                text={messages.section2.title}
                className="max-w-[74rem] text-[5.8rem] leading-[0.84] tracking-[-0.07em] text-[#f3e7d2] md:text-[8rem] lg:text-[11rem]"
                staggerAmount={0.05}
              />
              <p
                data-vision-body
                className="mt-[2.2rem] max-w-[52rem] text-[1.55rem] leading-[1.65] text-[#d8ccb8]/82 md:text-[1.9rem]"
              >
                {messages.section2.body}
              </p>
            </div>
          </div>
        </div>

        <div
          data-vision-right-panel
          className="relative overflow-hidden"
        >
          <div
            data-vision-right-visual
            className="absolute inset-0"
          >
            <Image
              src={sectionRealPhoto}
              alt=""
              fill
              sizes="44vw"
              className="object-cover object-[78%_50%]"
            />
          </div>
          <div
            data-vision-right-overlay
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,18,0.08),rgba(7,20,18,0.24)),radial-gradient(circle_at_22%_18%,rgba(255,240,212,0.12),rgba(255,240,212,0)_28%)]"
          />
          <div className="relative z-10 flex h-full items-end px-[2.4rem] py-[7rem] md:px-[4rem] md:py-[6rem] lg:px-[5rem]">
            <div className="grid w-full gap-[1.2rem] md:grid-cols-2">
              {messages.section2.cards.map((card) => (
                <article
                  key={card.title}
                  data-vision-card
                  className="rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.06)] p-[2rem] backdrop-blur-[12px]"
                >
                  <h3
                    className="text-[2.2rem] leading-[0.96] tracking-[-0.04em] text-[#f3e7d2]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-[1rem] text-[1.26rem] leading-[1.58] text-[#e7dcc8]/76">
                    {card.body}
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
