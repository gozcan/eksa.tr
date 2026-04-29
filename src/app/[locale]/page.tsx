'use client';

import { useParams } from 'next/navigation';

import { AboutSection, setupAboutPinnedTimeline } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { HomeHero } from '@/components/home-hero';
import { ProjectsSection, setupProjectsPinnedTimeline } from '@/components/projects-section';
import { ServiceLayerSection } from '@/components/service-layer-section';
import { TakeoverSection } from '@/components/takeover-section';
import { WhyEksaSection } from '@/components/why-eksa-section';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';

export default function LocalizedHomePage() {
  const params = useParams<{ locale: string }>();
  const localeParam = params?.locale ?? defaultLocale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const messages = getMessages(locale);

  return (
    <main className="bg-[#f4efe7] text-black">
      {/* Hero — kendi içinde sticky + 350vh scroll alanı */}
      <div id="home" className="scroll-mt-[7rem]">
        <HomeHero locale={locale as Locale} messages={messages} />
      </div>

      {/* WhyEksa — pinned section (handles its own pin via ScrollTrigger) */}
      <WhyEksaSection messages={messages} />

      {/* Nav anchors — overlayFromPrevious olan section'lar DOM'da 100vh yukarı kayıyor,
          bu yüzden her birinin NATURAL pozisyonuna 0-yükseklikli anchor koyuyoruz.
          Hash nav buraya scrollar → TakeoverSection enter ~%87 tamamlanmış → snap tamamlar. */}
      <div id="services" className="h-0 scroll-mt-[7rem]" />

      {/* ServiceLayer — WhyEksa+LivingVision'in ustune takeover */}
      <TakeoverSection
        zIndex={30}
        mode="pinned"
        overlay="bottom"
        enterLength={1}
        pinLength={2.6}
        snapThreshold={0.58}
        overlayFromPrevious
        className="overflow-hidden"
        buildPinnedTimeline={(tl, section) => {
          const serviceHandoff = section.querySelector('[data-service-handoff]');
          const serviceResidue = section.querySelector('[data-service-residue]');
          const serviceBgImage = section.querySelector('[data-service-bg-image]');
          const serviceVeil = section.querySelector('[data-service-veil]');
          const serviceGlow = section.querySelector('[data-service-glow]');
          const serviceBeam = section.querySelector('[data-service-beam]');
          const serviceContent = section.querySelector('[data-service-content]');
          const serviceContentInner = section.querySelector('[data-service-content-inner]');
          const serviceCopy = section.querySelector('[data-service-copy]');
          const serviceEyebrow = section.querySelector('[data-service-eyebrow]');
          const serviceKicker = section.querySelector('[data-service-kicker]');
          const serviceTitle = section.querySelector('[data-service-title]');
          const serviceBody = section.querySelector('[data-service-body]');
          const serviceCardsColumn = section.querySelector('[data-service-cards-column]');
          const serviceCards = Array.from(section.querySelectorAll('[data-service-card]'));

          if (
            serviceBgImage &&
            serviceVeil &&
            serviceGlow &&
            serviceBeam &&
            serviceHandoff &&
            serviceResidue &&
            serviceContent &&
            serviceContentInner &&
            serviceCopy &&
            serviceEyebrow &&
            serviceKicker &&
            serviceTitle &&
            serviceBody &&
            serviceCardsColumn &&
            serviceCards.length > 0
          ) {
            tl.set(serviceBgImage, { scale: 1.1, yPercent: 5 });
            tl.set(serviceVeil, { autoAlpha: 0.8 });
            tl.set(serviceGlow, { autoAlpha: 0 });
            tl.set(serviceBeam, { autoAlpha: 0, scaleX: 0 });
            tl.set(serviceHandoff, { autoAlpha: 0 });
            tl.set(serviceResidue, { autoAlpha: 0 });
            tl.set(serviceContent, { autoAlpha: 0, y: 40 });
            tl.set(serviceContentInner, { autoAlpha: 0 });
            tl.set(serviceCopy, { autoAlpha: 0, x: -30 });
            tl.set(serviceEyebrow, { autoAlpha: 0, y: 20 });
            tl.set(serviceKicker, { autoAlpha: 0, y: 30, filter: 'blur(8px)' });
            tl.set(serviceTitle, { autoAlpha: 0, y: 40, filter: 'blur(12px)' });
            tl.set(serviceBody, { autoAlpha: 0, y: 25, filter: 'blur(6px)' });
            tl.set(serviceCardsColumn, { autoAlpha: 0, x: 30 });
            tl.set(serviceCards, { autoAlpha: 0, y: 20, filter: 'blur(6px)' });

            tl.to(serviceBgImage, { scale: 1, yPercent: 0, ease: 'none', duration: 0.3 }, 0);
            tl.to(serviceVeil, { autoAlpha: 0.4, ease: 'none', duration: 0.25 }, 0.05);
            tl.to(serviceGlow, { autoAlpha: 0.15, ease: 'none', duration: 0.2 }, 0.1);
            tl.to(serviceBeam, { autoAlpha: 0.3, scaleX: 1, ease: 'none', duration: 0.4 }, 0.15);
            tl.to(serviceHandoff, { autoAlpha: 0.6, ease: 'none', duration: 0.2 }, 0.2);
            tl.to(serviceResidue, { autoAlpha: 0.4, ease: 'none', duration: 0.25 }, 0.25);

            tl.to(serviceContent, { autoAlpha: 1, y: 0, ease: 'none', duration: 0.3 }, 0.3);
            tl.to(serviceContentInner, { autoAlpha: 1, ease: 'none', duration: 0.2 }, 0.35);
            tl.to(serviceCopy, { autoAlpha: 1, x: 0, ease: 'none', duration: 0.25 }, 0.4);
            tl.to(serviceEyebrow, { autoAlpha: 0.8, y: 0, ease: 'none', duration: 0.15 }, 0.45);
            tl.to(serviceKicker, { autoAlpha: 0.9, y: 0, filter: 'blur(0px)', ease: 'none', duration: 0.2 }, 0.5);
            tl.to(serviceTitle, { autoAlpha: 1, y: 0, filter: 'blur(0px)', ease: 'none', duration: 0.25 }, 0.55);
            tl.to(serviceBody, { autoAlpha: 0.9, y: 0, filter: 'blur(0px)', ease: 'none', duration: 0.2 }, 0.65);

            tl.to(serviceCardsColumn, { autoAlpha: 1, x: 0, ease: 'none', duration: 0.3 }, 0.8);
            tl.to(serviceCards, { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, ease: 'none', duration: 0.2 }, 0.9);
          }
        }}
      >
        <ServiceLayerSection messages={messages} />
      </TakeoverSection>

      <div id="projects" className="h-0 scroll-mt-[7rem]" />

      <TakeoverSection
        zIndex={40}
        mode="pinned"
        overlay="bottom"
        enterLength={1}
        pinLength={3.8}
        snapThreshold={0.55}
        overlayFromPrevious
        className="overflow-hidden"
        buildPinnedTimeline={(tl, section) => setupProjectsPinnedTimeline(tl, section)}
      >
        <ProjectsSection messages={messages} />
      </TakeoverSection>

      <div id="about" className="h-0 scroll-mt-[7rem]" />

      <TakeoverSection
        zIndex={50}
        mode="pinned"
        overlay="bottom"
        enterLength={1}
        pinLength={2.6}
        snapThreshold={0.52}
        overlayFromPrevious
        className="overflow-hidden"
        buildPinnedTimeline={(tl, section) => setupAboutPinnedTimeline(tl, section)}
      >
        <AboutSection messages={messages} />
      </TakeoverSection>

      <TakeoverSection
        zIndex={60}
        mode="takeover"
        overlay="bottom"
        enterLength={1.0}
        snapThreshold={0.5}
      >
        <ContactSection messages={messages} />
      </TakeoverSection>
    </main>
  );
}