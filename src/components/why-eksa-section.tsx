'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import sectionRealPhoto from '../../public/generated/section-real-photo.jpg';
import type { Messages } from '@/i18n/messages';

gsap.registerPlugin(ScrollTrigger);
// position:fixed ile anında sabitleme — scrub ile transform-based pin yerine
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ScrollTrigger as any).config({ pinType: 'fixed' });

export function WhyEksaSection({ messages }: { messages: Messages }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      // ── Ortak arka plan
      const bgImage    = root.querySelector('[data-why-bg-image]');
      const bgShade    = root.querySelector('[data-why-bg-shade]');
      const bgGlow     = root.querySelector('[data-why-bg-glow]');

      // ── Faz 1: Intro overlay
      const introWrap    = root.querySelector('[data-why-intro-wrap]');
      const introEyebrow = root.querySelector('[data-why-intro-eyebrow]');
      const introTitle   = root.querySelector('[data-why-intro-title]');
      const introBody    = root.querySelector('[data-why-intro-body]');

      // ── Faz 2: Split panel (Yaşam Vizyonu içeriğiyle)
      const phaseWrap    = root.querySelector('[data-why-phase-wrap]');
      const leftPanel    = root.querySelector('[data-why-left-panel]');
      const rightPanel   = root.querySelector('[data-why-right-panel]');
      const rightVisual  = root.querySelector('[data-why-right-visual]');
      const rightOverlay = root.querySelector('[data-why-right-overlay]');

      // ── Faz 3: Yaşam Vizyonu (aynı split panel, içerik değişir)
      const visionLeftInner = root.querySelector('[data-vision-left-inner]');
      const visionEyebrow   = root.querySelector('[data-vision-eyebrow]');
      const visionKicker    = root.querySelector('[data-vision-kicker]');
      const visionTitle     = root.querySelector('[data-vision-title]');
      const visionBody      = root.querySelector('[data-vision-body]');
      const visionCards     = Array.from(root.querySelectorAll('[data-vision-card]'));

      // ── Başlangıç durumları
      gsap.set(bgImage, { scale: 1.18, yPercent: 8, filter: 'blur(18px) brightness(0.72) saturate(0.9)' });
      gsap.set(bgShade, { autoAlpha: 0.82 });
      gsap.set(bgGlow,  { autoAlpha: 0.08, scale: 0.82 });

      gsap.set(introWrap,    { autoAlpha: 1 });
      gsap.set(introEyebrow, { autoAlpha: 0, y: 22, letterSpacing: '0.42em' });
      gsap.set(introTitle,   { autoAlpha: 0, y: 34, filter: 'blur(10px)' });
      gsap.set(introBody,    { autoAlpha: 0, y: 28, filter: 'blur(6px)' });

      gsap.set(phaseWrap,    { autoAlpha: 1 });
      gsap.set(leftPanel,    { xPercent: -104 });
      gsap.set(rightPanel,   { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 });
      gsap.set(rightVisual,  { yPercent: 14, scale: 1.08 });
      gsap.set(rightOverlay, { autoAlpha: 0.18 });

      gsap.set(visionLeftInner, { autoAlpha: 0, x: -30 });
      gsap.set(visionEyebrow,   { autoAlpha: 0, x: -18, letterSpacing: '0.42em' });
      gsap.set(visionKicker,    { autoAlpha: 0, x: -22, filter: 'blur(6px)' });
      gsap.set(visionTitle,     { autoAlpha: 0, y: 40, filter: 'blur(12px)' });
      gsap.set(visionBody,      { autoAlpha: 0, x: -22, filter: 'blur(6px)' });
      gsap.set(visionCards,     { autoAlpha: 0, y: 28, filter: 'blur(8px)' });

      // ── Snap ilerleme değerleri (timeline kurulduktan sonra hesaplanır)
      let phaseSnapStartProgress  = 0;
      let phaseSnapCommitProgress = 0;
      let visionSnapDoneProgress   = 0;

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: 'bottom bottom',
          pin: false,
          scrub: 1,
          snap: {
            snapTo: (value: number) => {
              if (value < phaseSnapStartProgress) return value;
              if (value < phaseSnapCommitProgress) return phaseSnapStartProgress;
              if (value < visionSnapDoneProgress) return visionSnapDoneProgress;
              return value;
            },
            duration: { min: 0.45, max: 0.8 },
            ease: 'power2.out',
            delay: 0.06,
          },
        },
      });

      // Snap etiketleri
      timeline.addLabel('phaseSnapStart', 3.6);
      timeline.addLabel('visionSnapDone', 7.0);

      // ── Arka plan açılışı
      timeline.to(bgImage, { scale: 1, yPercent: 0, filter: 'blur(0px) brightness(1) saturate(1)', ease: 'none', duration: 0.28 }, 0);
      timeline.to(bgShade, { autoAlpha: 0.52, ease: 'none', duration: 0.24 }, 0.02);
      timeline.to(bgGlow,  { autoAlpha: 0.24, scale: 1, ease: 'none', duration: 0.22 }, 0.06);

      // ── Faz 1: Intro giriş
      timeline.to(introEyebrow, { autoAlpha: 0.72, y: 0, letterSpacing: '0.3em', ease: 'none', duration: 0.12 }, 0.18);
      timeline.to(introTitle,   { autoAlpha: 1, y: 0, filter: 'blur(0px)', ease: 'none', duration: 0.2  }, 0.26);
      timeline.to(introBody,    { autoAlpha: 0.9, y: 0, filter: 'blur(0px)', ease: 'none', duration: 0.18 }, 0.34);

      // ── Faz 1: Intro çıkış
      timeline.to(introEyebrow, { autoAlpha: 0, y: -18, letterSpacing: '0.38em', filter: 'blur(4px)', ease: 'none', duration: 0.22 }, 1.12);
      timeline.to(introTitle,   { autoAlpha: 0, y: -40, filter: 'blur(12px)', ease: 'none', duration: 0.3  }, 1.2);
      timeline.to(introBody,    { autoAlpha: 0, y: -24, filter: 'blur(8px)',  ease: 'none', duration: 0.22 }, 3.0);
      timeline.to(introWrap,    { autoAlpha: 0, ease: 'none', duration: 0.18 }, 3.24);

      // ── Faz 2: Split panel giriş (Yaşam Vizyonu içeriğiyle)
      timeline.to(leftPanel,    { xPercent: 0, ease: 'none', duration: 2.8  }, 3.6);
      timeline.to(rightPanel,   { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 2.96 }, 3.86);
      timeline.to(rightVisual,  { yPercent: 0, scale: 1, ease: 'none', duration: 2.72 }, 4.02);
      timeline.to(rightOverlay, { autoAlpha: 0.34, ease: 'none', duration: 0.82 }, 4.72);

      // ── Yaşam Vizyonu içeriği panel kayarken belirir
      timeline.to(visionLeftInner, { autoAlpha: 1, x: 0, ease: 'none', duration: 0.22 }, 4.34);
      timeline.to(visionEyebrow,   { autoAlpha: 0.72, x: 0, letterSpacing: '0.3em', ease: 'none', duration: 0.16 }, 5.6);
      timeline.to(visionKicker,    { autoAlpha: 0.88, x: 0, filter: 'blur(0px)', ease: 'none', duration: 0.2  }, 5.76);
      timeline.to(visionTitle,     { autoAlpha: 1, y: 0, filter: 'blur(0px)', ease: 'none', duration: 0.26  }, 5.92);
      timeline.to(visionBody,      { autoAlpha: 0.86, x: 0, filter: 'blur(0px)', ease: 'none', duration: 0.22 }, 6.24);

      // ── Kartlar sağ panelde belirir
      timeline.to(visionCards, {
        autoAlpha: 1, y: 0, filter: 'blur(0px)',
        stagger: 0.1, ease: 'none', duration: 0.2,
      }, 6.5);

      // timeline'ı visionSnapDone etiketine ulaştıracak padding
      timeline.to({}, { duration: 0.01 }, 7.0);

      // ── Snap ilerleme değerlerini hesapla
      const totalDuration        = timeline.duration();
      const phaseSnapStartTime   = timeline.labels.phaseSnapStart ?? 3.6;
      const visionSnapDoneTime   = timeline.labels.visionSnapDone ?? 7.0;

      phaseSnapStartProgress   = phaseSnapStartTime / totalDuration;
      phaseSnapCommitProgress  = (phaseSnapStartTime + (visionSnapDoneTime - phaseSnapStartTime) * 0.72) / totalDuration;
      visionSnapDoneProgress   = visionSnapDoneTime  / totalDuration;

    }, root);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="why-eksa"
      style={{ height: 'calc(5800px + 100vh)', zIndex: 10, position: 'relative' }}
    >
      {/* Vision content snap zone anchor — nav "Vizyon" linki buraya hedeflenecek.
          5700px, visionSnapDone snap zone'una (~%97) girer → snap tamamlar */}
      <div id="vision" style={{ position: 'absolute', top: '5700px', height: 0 }} className="scroll-mt-[7rem]" />
    <section
      ref={rootRef}
      className="sticky top-0 h-screen overflow-hidden bg-[#113a34] text-[#efe2cc]"
      style={{ zIndex: 10 }}
    >
      {/* ── Ortak arka plan */}
      <div data-why-bg-image className="absolute inset-0">
        <Image src={sectionRealPhoto} alt="" fill sizes="100vw" className="object-cover object-[52%_46%]" />
      </div>
      <div data-why-bg-shade className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,23,20,0.68),rgba(8,23,20,0.28)_38%,rgba(8,23,20,0.38)_100%)]" />
      <div data-why-bg-glow  className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(122,160,147,0.18),rgba(17,58,52,0)_26%),radial-gradient(circle_at_18%_84%,rgba(177,140,82,0.18),rgba(17,58,52,0)_28%)]" />

      {/* ── Faz 1: Intro overlay */}
      <div data-why-intro-wrap className="absolute inset-0 z-10 flex items-center justify-center px-[2.4rem] md:px-[6rem] lg:px-[8rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,18,16,0.74),rgba(6,18,16,0.52)_30%,rgba(6,18,16,0.18)_56%,rgba(6,18,16,0)_76%)]" />
        <div className="relative max-w-[92rem] text-center">
          <p data-why-intro-eyebrow className="mb-[1.6rem] text-[1rem] uppercase tracking-[0.3em] text-[#d8ccb8]/72">
            {messages.section1.eyebrow}
          </p>
          <div data-why-intro-title>
            <p className="text-[5.4rem] leading-[0.88] tracking-[-0.07em] text-[#f7efe2] drop-shadow-[0_0.8rem_2.8rem_rgba(0,0,0,0.48)] md:text-[7.2rem] lg:text-[9rem]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              {messages.section1.titleLine1}
            </p>
            <p className="mt-[0.6rem] text-[5.4rem] leading-[0.88] tracking-[-0.07em] text-[#f7efe2] drop-shadow-[0_0.8rem_2.8rem_rgba(0,0,0,0.48)] md:text-[7.2rem] lg:text-[9rem]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              {messages.section1.titleLine2}
            </p>
          </div>
          <p data-why-intro-body className="mx-auto mt-[2.4rem] max-w-[72rem] text-[1.55rem] leading-[1.68] text-[#f1e7d6]/92 drop-shadow-[0_0.6rem_2rem_rgba(0,0,0,0.42)] md:text-[1.85rem]">
            {messages.section1.body}
          </p>
        </div>
      </div>

      {/* ── Faz 2 + 3: Split panel layout */}
      <div data-why-phase-wrap className="relative z-20 grid min-h-screen w-full grid-cols-1 md:grid-cols-[56%_44%]">

        {/* Sol panel — her iki faz içeriği üst üste */}
        <div data-why-left-panel className="relative overflow-hidden bg-[rgba(8,23,20,0.86)]">

          {/* Yaşam Vizyonu içeriği */}
          <div data-vision-left-inner className="absolute inset-0 flex items-center px-[2.4rem] py-[7rem] md:px-[6rem] md:py-[9rem] lg:px-[8rem] lg:py-[11rem]">
            <div className="max-w-[64rem]">
              <p data-vision-eyebrow className="mb-[1.2rem] text-[1rem] uppercase tracking-[0.3em] text-[#d8ccb8]/68">
                {messages.section2.eyebrow}
              </p>
              <p data-vision-kicker className="mb-[1.8rem] text-[2.4rem] leading-none text-[#d8ccb8]/88 md:text-[3rem] lg:text-[3.8rem]">
                {messages.section2.kicker}
              </p>
              <p
                data-vision-title
                className="max-w-[74rem] text-[5.8rem] leading-[0.84] tracking-[-0.07em] text-[#f3e7d2] md:text-[8rem] lg:text-[11rem]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {messages.section2.title}
              </p>
              <p data-vision-body className="mt-[2.2rem] max-w-[52rem] text-[1.55rem] leading-[1.65] text-[#d8ccb8]/82 md:text-[1.9rem]">
                {messages.section2.body}
              </p>
            </div>
          </div>
        </div>

        {/* Sağ panel — görsel + faz 3 kartları */}
        <div data-why-right-panel className="relative overflow-hidden">
          <div data-why-right-visual className="absolute inset-0">
            <Image src={sectionRealPhoto} alt="" fill sizes="44vw" className="object-cover object-[78%_50%]" />
          </div>
          <div data-why-right-overlay className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,18,0.08),rgba(7,20,18,0.24)),radial-gradient(circle_at_22%_18%,rgba(255,240,212,0.12),rgba(255,240,212,0)_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,18,0.04),rgba(7,20,18,0.18)_58%,rgba(7,20,18,0.3)_100%)]" />

          {/* Faz 3: Kartlar */}
          <div className="absolute inset-0 z-10 flex items-end px-[2.4rem] py-[7rem] md:px-[4rem] md:py-[6rem] lg:px-[5rem]">
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
    </div>
  );
}