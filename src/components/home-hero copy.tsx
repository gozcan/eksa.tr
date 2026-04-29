"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import backImage from "../../public/reference/find/back.jpg";
import cloudImage from "../../public/reference/find/cloud.png";
import houseImage from "../../public/reference/find/house.png";
import smokeImage from "../../public/reference/find/smoke.png";
import { locales, type Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }

const brandWordmark = "EKSA";

type ViewportState = {
  width: number;
  height: number;
  isDesktop: boolean;
};

const DEFAULT_VIEWPORT: ViewportState = {
  width: 1440,
  height: 900,
  isDesktop: true,
};

type HomeHeroProps = {
  locale: Locale;
  messages: Messages;
};

function getViewportState() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isDesktop: window.innerWidth >= 768,
  };
}

function getBrandMetrics(isDesktop: boolean) {
  if (isDesktop) {
    return {
      boxWidth: 990,
      boxHeight: 423,
      fontSize: 230,
      strokeWidth: 2,
      baseline: 292,
    };
  }

  return {
    boxWidth: 240,
    boxHeight: 102,
    fontSize: 55,
    strokeWidth: 3,
    baseline: 70,
  };
}

function getSceneMetrics(viewport: ViewportState) {
  const rem = 10;

  if (viewport.isDesktop) {
    return {
      houseTop: viewport.height * 0.6,
      houseHeight: 170.8 * rem,
      cloudLeftX: -33.72 * rem,
      cloudLeftY: viewport.height * 0.25,
      cloudLeftWidth: 112.4 * rem,
      cloudLeftHeight: 47.7 * rem,
      cloudRightX: viewport.width - 93.6 * rem + 33.72 * rem,
      cloudRightY: viewport.height * 0.2,
      cloudRightWidth: 93.6 * rem,
      cloudRightHeight: 39.7 * rem,
      smokeHeight: 62 * rem,
    };
  }

  return {
    houseTop: viewport.height * 0.6,
    houseHeight: 33.4 * rem,
    cloudLeftX: -57.2 * rem,
    cloudLeftY: 33.7 * rem,
    cloudLeftWidth: 70.2 * rem,
    cloudLeftHeight: 29.8 * rem,
    cloudRightX: viewport.width - 55.7 * rem + 41.2 * rem,
    cloudRightY: 37.12 * rem,
    cloudRightWidth: 55.7 * rem,
    cloudRightHeight: 23.6 * rem,
    smokeHeight: 45 * rem,
  };
}

function HeaderBrand({ className }: { className?: string }) {
  return (
    <span
      className={[
        "block whitespace-nowrap [font-family:var(--font-astron)] font-normal leading-none tracking-[0.04em]",
        className ?? "",
      ].join(" ")}
    >
      {brandWordmark}
    </span>
  );
}

function NavArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-[13px]">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.566 9.431a.8.8 0 0 1 .005 1.131l-1.78 1.797c-.669.674-1.218 1.229-1.708 1.622-.51.41-1.034.712-1.665.792a3.3 3.3 0 0 1-.83 0c-.63-.08-1.154-.382-1.665-.792-.49-.393-1.04-.948-1.707-1.622l-1.781-1.797A.8.8 0 0 1 7.57 9.436L9.32 11.2c.71.716 1.195 1.205 1.606 1.535.398.32.648.424.866.452q.211.027.424 0c.219-.028.468-.133.866-.452.41-.33.897-.819 1.607-1.535l1.747-1.763a.8.8 0 0 1 1.131-.005"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Header({ locale, messages }: HomeHeroProps) {
  const navItems = [
    { href: `/${locale}/projects`, label: messages.nav.projects },
    { href: `/${locale}/services`, label: messages.nav.services },
    { href: `/${locale}#why-eksa`, label: messages.nav.vision },
    { href: `/${locale}/about`, label: messages.nav.about },
    { href: `/${locale}/contact`, label: messages.nav.contact }
  ];

  const alternateLocale = locales.find((value) => value !== locale) ?? locale;

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-[58px] w-full max-w-[1920px] items-center justify-between px-5 md:px-[38px] lg:px-[75px]">
        <Link href={`/${locale}`} className="text-black">
          <HeaderBrand className="text-[3.4rem] text-black md:text-[4rem]" />
        </Link>

        <nav className="hidden items-center gap-[29px] text-[15px] font-medium leading-[18.75px] text-[#151717] lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex items-center gap-[4px]">
              <span>{item.label}</span>
              <NavArrow />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={`/${alternateLocale}`}
            className="rounded-full border border-white/45 px-4 py-2 text-[13px] font-medium leading-none text-[#151717] backdrop-blur-sm"
          >
            {alternateLocale.toUpperCase()}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="inline-flex h-[43px] items-center rounded-full bg-[#151717] px-[22px] text-[15px] font-medium leading-[18.75px] text-white"
          >
            {messages.nav.cta}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="flex size-11 items-center justify-center rounded-full bg-white/35 text-black backdrop-blur-sm lg:hidden"
        >
          <span className="flex w-[18px] flex-col gap-[4px]">
            <span className="h-[1.5px] w-full bg-current" />
            <span className="h-[1.5px] w-full bg-current" />
          </span>
        </button>
      </div>
    </header>
  );
}

function BrandOutlineSvg() {
  const metrics = getBrandMetrics(true);

  return (
    <svg viewBox={`0 0 ${metrics.boxWidth} ${metrics.boxHeight}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
      <text
        x="0"
        y={metrics.baseline}
        fill="transparent"
        stroke="#fff"
        strokeWidth={metrics.strokeWidth}
        vectorEffect="non-scaling-stroke"
        textLength={metrics.boxWidth}
        lengthAdjust="spacingAndGlyphs"
        style={{
          fontFamily: "var(--font-astron)",
          fontSize: `${metrics.fontSize}px`,
        }}
      >
        {brandWordmark}
      </text>
    </svg>
  );
}

function BrandCutoutMask({
  maskId,
  viewport,
  cutoutCloudLeftRef,
  cutoutCloudRightRef,
  cutoutHouseRef,
  cutoutSmokeRef,
}: {
  maskId: string;
  viewport: ViewportState;
  cutoutCloudLeftRef: React.RefObject<SVGImageElement | null>;
  cutoutCloudRightRef: React.RefObject<SVGImageElement | null>;
  cutoutHouseRef: React.RefObject<SVGImageElement | null>;
  cutoutSmokeRef: React.RefObject<SVGImageElement | null>;
}) {
  const brand = getBrandMetrics(viewport.isDesktop);
  const scene = getSceneMetrics(viewport);
  const offsetX = (viewport.width - brand.boxWidth) / 2;
  const offsetY = (viewport.height - brand.boxHeight) / 2;

  return (
    <svg
      viewBox={`0 0 ${viewport.width} ${viewport.height}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={viewport.width} height={viewport.height}>
          <rect x="0" y="0" width={viewport.width} height={viewport.height} fill="black" />
          <g transform={`translate(${offsetX} ${offsetY})`}>
            <text
              x="0"
              y={brand.baseline}
              fill="white"
              textLength={brand.boxWidth}
              lengthAdjust="spacingAndGlyphs"
              style={{
                fontFamily: "var(--font-astron)",
                fontSize: `${brand.fontSize}px`,
              }}
            >
              {brandWordmark}
            </text>
          </g>
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <image href={backImage.src} x="0" y="0" width={viewport.width} height={viewport.height} preserveAspectRatio="xMidYMid slice" />
        <image
          ref={cutoutCloudLeftRef}
          href={cloudImage.src}
          x={scene.cloudLeftX}
          y={scene.cloudLeftY}
          width={scene.cloudLeftWidth}
          height={scene.cloudLeftHeight}
          preserveAspectRatio="none"
        />
        <image
          ref={cutoutCloudRightRef}
          href={cloudImage.src}
          x={scene.cloudRightX}
          y={scene.cloudRightY}
          width={scene.cloudRightWidth}
          height={scene.cloudRightHeight}
          preserveAspectRatio="none"
        />
        <image ref={cutoutHouseRef} href={houseImage.src} x="0" y={scene.houseTop} width={viewport.width} height={scene.houseHeight} preserveAspectRatio="xMidYMid meet" />
        <image
          ref={cutoutSmokeRef}
          href={smokeImage.src}
          x="0"
          y={viewport.height - scene.smokeHeight}
          width={viewport.width}
          height={scene.smokeHeight}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  );
}

export function HomeHero({ locale, messages }: HomeHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const houseRef = useRef<HTMLDivElement | null>(null);
  const cloudLeftRef = useRef<HTMLDivElement | null>(null);
  const cloudRightRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const cutoutRef = useRef<HTMLDivElement | null>(null);
  const cutoutCloudLeftRef = useRef<SVGImageElement | null>(null);
  const cutoutCloudRightRef = useRef<SVGImageElement | null>(null);
  const cutoutHouseRef = useRef<SVGImageElement | null>(null);
  const cutoutSmokeRef = useRef<SVGImageElement | null>(null);
  const smokeTopRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const maskId = useId().replace(/:/g, "");
  const [viewport, setViewport] = useState<ViewportState>(DEFAULT_VIEWPORT);

  useEffect(() => {
    const syncViewport = () => {
      setViewport(getViewportState());
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const house = houseRef.current;
      const cloudLeft = cloudLeftRef.current;
      const cloudRight = cloudRightRef.current;
      const outline = outlineRef.current;
      const cutout = cutoutRef.current;
      const cutoutCloudLeft = cutoutCloudLeftRef.current;
      const cutoutCloudRight = cutoutCloudRightRef.current;
      const cutoutHouse = cutoutHouseRef.current;
      const cutoutSmoke = cutoutSmokeRef.current;
      const smokeTop = smokeTopRef.current;
      const content = contentRef.current;
      const back = backRef.current;
      const title = titleRef.current;
      const text = textRef.current;

      if (
        !house ||
        !cloudLeft ||
        !cloudRight ||
        !outline ||
        !cutout ||
        !cutoutCloudLeft ||
        !cutoutCloudRight ||
        !cutoutHouse ||
        !cutoutSmoke ||
        !smokeTop ||
        !content ||
        !back ||
        !title ||
        !text
      ) {
        return;
      }

      gsap.set(root, { autoAlpha: 1 });
      gsap.set(outline, { opacity: 0 });
      gsap.set(cutout, { opacity: 0 });
      gsap.set(smokeTop, { yPercent: 70 });
      gsap.set(cutoutSmoke, { yPercent: 70 });

      const scrollTimeline = gsap.timeline();
      scrollTimeline.to([house, cutoutHouse], { yPercent: -40, scale: 1.3, transformOrigin: "50% 100%", duration: 1 }, 0);
      scrollTimeline.to([smokeTop, cutoutSmoke], { yPercent: 0, duration: 1 }, 0);
      scrollTimeline.to([cloudLeft, cutoutCloudLeft], { xPercent: -15, duration: 1 }, 0);
      scrollTimeline.to([cloudRight, cutoutCloudRight], { xPercent: 15, duration: 1 }, 0);
      scrollTimeline.to(content, { yPercent: 20, scale: 0.9, duration: 1 }, 0);
      scrollTimeline.to(content, { opacity: 0, duration: 0.2 }, 0);
      scrollTimeline.to(outline, { opacity: 1, duration: 0.08 }, 0.12);
      scrollTimeline.to(cutout, { opacity: 1, duration: 0.08 }, 0.22);
      scrollTimeline.to(house, { opacity: 0, duration: 0.08 }, 0.22);
      scrollTimeline.add(() => undefined, 1);

      ScrollTrigger.create({
        trigger: root,
        animation: scrollTimeline,
        start: "top top",
        end: "bottom top",
        scrub: 0.1,
      });

      const entryTimeline = gsap.timeline({ paused: true });
      entryTimeline.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0);
      entryTimeline.from(title, { opacity: 0, yPercent: 10, duration: 1.2, ease: "expo.out" }, 0);
      entryTimeline.from(text, { opacity: 0, yPercent: 20, duration: 1.1, ease: "expo.out" }, 0.4);
      entryTimeline.from(back, { scale: 1.1, duration: 5, ease: "expo.out" }, 0);
      entryTimeline.from(cloudLeft, { yPercent: 50, duration: 3, ease: "expo.out" }, 0);
      entryTimeline.from(cloudRight, { yPercent: 100, duration: 4, ease: "expo.out" }, 0.1);
      entryTimeline.from(house.querySelector("img"), { opacity: 0, duration: 0.6 }, 0.2);
      entryTimeline.from(house.querySelector("img"), { yPercent: 10, duration: 3, ease: "expo.out" }, 0.2);

      const timer = window.setTimeout(() => {
        requestAnimationFrame(() => entryTimeline.play());
      }, 200);

      return () => {
        window.clearTimeout(timer);
      };
    }, root);

    return () => context.revert();
  }, [viewport]);

  const brand = getBrandMetrics(viewport.isDesktop);

  return (
    <main className="bg-[#bfdcf5] text-black">
      <section
        ref={rootRef}
        className="relative h-[350vh] overflow-visible md:h-[500vh]"
        style={{ marginBottom: "-100vh", visibility: "hidden" }}
      >
        <div className="sticky top-0 h-screen">
          <Header locale={locale} messages={messages} />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div ref={backRef} className="absolute inset-0">
              <Image src={backImage} alt="" fill priority className="object-cover object-center" />
            </div>

            <div ref={houseRef} className="absolute left-0 right-0 top-[60vh] z-[1] h-[33.4rem] origin-bottom md:h-[170.8rem]">
              <Image
                src={houseImage}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 400px, (max-width: 1640px) 700px, 75vw"
                className="object-contain"
              />
            </div>

            <div ref={cutoutRef} className="absolute inset-0 z-[2] opacity-0">
              <BrandCutoutMask
                maskId={maskId}
                viewport={viewport}
                cutoutCloudLeftRef={cutoutCloudLeftRef}
                cutoutCloudRightRef={cutoutCloudRightRef}
                cutoutHouseRef={cutoutHouseRef}
                cutoutSmokeRef={cutoutSmokeRef}
              />
            </div>

            <div className="absolute inset-0 z-[3]">
              <div
                ref={cloudLeftRef}
                className="absolute left-[-57.2rem] top-[33.7rem] h-[29.8rem] w-[70.2rem] md:left-[-33.72rem] md:top-[25%] md:h-[47.7rem] md:w-[112.4rem]"
              >
                <Image src={cloudImage} alt="" fill sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
              </div>
              <div
                ref={cloudRightRef}
                className="absolute right-[-41.2rem] top-[37.12rem] h-[23.6rem] w-[55.7rem] md:right-[-33.72rem] md:top-[20%] md:h-[39.7rem] md:w-[93.6rem]"
              >
                <Image src={cloudImage} alt="" fill sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
              </div>
            </div>

            <div
              ref={outlineRef}
              className="absolute left-1/2 top-1/2 z-[4] opacity-0"
              style={{
                width: `${brand.boxWidth / 10}rem`,
                height: `${brand.boxHeight / 10}rem`,
                transform: `translate(-50%, -${brand.boxHeight / 20}rem)`,
              }}
            >
              <BrandOutlineSvg />
            </div>

            <div ref={smokeTopRef} className="absolute bottom-0 left-0 right-0 z-[5] h-[45rem] translate-y-[70%] md:h-[62rem]">
              <Image src={smokeImage} alt="" fill priority sizes="100vw" className="object-cover object-top" />
            </div>
          </div>

          <div ref={contentRef} className="relative grid h-full items-center pb-[15rem] md:pb-[22.8rem]">
            <div className="mx-auto w-full max-w-[1440px] px-5 text-center md:px-[38px] lg:px-[75px]">
              <div ref={titleRef}>
                <h1 className="text-[5.4rem] font-bold leading-[1] tracking-[-0.02em] md:text-[14rem]">
                  {messages.hero.titleLine1}
                  <br />
                  {messages.hero.titleLine2}
                </h1>
              </div>

              <div
                ref={textRef}
                className="mx-auto mt-[1.5rem] max-w-[104rem] text-[1.6rem] font-medium leading-[1.5] md:mt-[2rem] md:text-[3.2rem] md:leading-[1.3] md:tracking-[-0.01em]"
              >
                <p>
                  {messages.hero.descriptionLead}{" "}
                  <span className="text-[rgba(21,23,23,.5)]">{messages.hero.descriptionMuted}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[100vh]">
          <div className="absolute bottom-0 left-0 right-0 h-[45rem] md:h-[62rem]">
            <Image src={smokeImage} alt="" fill priority sizes="100vw" className="object-cover object-top" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-[3] h-[10rem] bg-[linear-gradient(180deg,rgba(255,255,255,0),#fff)] md:h-[30.9rem]" />
        </div>
      </section>
    </main>
  );
}
