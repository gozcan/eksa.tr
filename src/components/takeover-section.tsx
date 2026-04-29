"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TakeoverMode = "takeover" | "pinned" | "persistent";
type TakeoverOverlay = "bottom" | "left" | "right" | "clipBottom";
type ProgressPayload = {
  enter: number;
  pin: number;
  overall: number;
  isCommitted: boolean;
};

type TakeoverSectionProps = {
  children: ReactNode;
  zIndex: number;
  mode?: TakeoverMode;
  overlay?: TakeoverOverlay;
  enterLength?: number;
  pinLength?: number;
  snapThreshold?: number;
  className?: string;
  overlayFromPrevious?: boolean;
  buildPinnedTimeline?: (tl: gsap.core.Timeline, section: HTMLElement) => void;
  onProgress?: (progress: ProgressPayload) => void;
};

function getOverlayVars(overlay: TakeoverOverlay) {
  const variants = {
    bottom: {
      from: { y: '100vh', opacity: 1 },
      to: { y: 0, opacity: 1 },
    },
    left: {
      from: { xPercent: -100, opacity: 1 },
      to: { xPercent: 0, opacity: 1 },
    },
    right: {
      from: { xPercent: 100, opacity: 1 },
      to: { xPercent: 0, opacity: 1 },
    },
    clipBottom: {
      from: { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
      to: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
    },
  } satisfies Record<TakeoverOverlay, { from: gsap.TweenVars; to: gsap.TweenVars }>;

  return variants[overlay] ?? variants.bottom;
}

export function TakeoverSection({
  children,
  zIndex,
  mode = "takeover",
  overlay = "bottom",
  enterLength = 1,
  pinLength = 0,
  snapThreshold = 0.5,
  className = "",
  overlayFromPrevious = false,
  buildPinnedTimeline,
  onProgress,
}: TakeoverSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) {
      return;
    }

    const context = gsap.context(() => {
      // On mobile (<1024px), degrade mode="pinned" to mode="takeover" (simple slide-in, no pin).
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const effectiveMode = (mode === "pinned" && !isDesktop) ? "takeover" : mode;
      const effectivePinLength = effectiveMode === "pinned" ? pinLength : 0;

      const { from, to } = getOverlayVars(overlay);
      const totalUnits = Math.max(enterLength + effectivePinLength, 0.01);
      const enterRatio = enterLength / totalUnits;
      const totalScrollLength = window.innerHeight * totalUnits;

      gsap.set(inner, from);

      const enterTl = gsap.timeline({ paused: true });
      enterTl.to(inner, { ...to, ease: "none", duration: 1 });

      let pinTl: gsap.core.Timeline | null = null;
      if (effectiveMode === "pinned" && buildPinnedTimeline) {
        pinTl = gsap.timeline({ paused: true });
        buildPinnedTimeline(pinTl, section);
      }

      let innerTransformCleared = false;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: effectiveMode === "takeover" ? "top bottom" : "top top",
        end: `+=${totalScrollLength}`,
        pin: effectiveMode === "pinned",
        pinSpacing: effectiveMode === "pinned",
        scrub: effectiveMode === "takeover" ? 1 : false,
        anticipatePin: effectiveMode === "pinned" ? 1 : 0,
        snap: effectiveMode !== "persistent" ? {
          snapTo: (rawValue: number) => {
            // Enter phase: snap to fully-out (0) or fully-entered (enterRatio)
            if (rawValue <= enterRatio) {
              return rawValue > enterRatio * 0.72 ? enterRatio : 0;
            }
            // Pin/hold phase: free scroll, no snap
            return rawValue;
          },
          duration: { min: 0.25, max: 0.55 },
          delay: 0.05,
          ease: "power2.inOut",
        } : undefined,
        onUpdate(self) {
          const overall = self.progress;
          const enter = Math.min(overall / Math.max(enterRatio, 0.0001), 1);
          const pin = effectivePinLength > 0 ? Math.max((overall - enterRatio) / Math.max(1 - enterRatio, 0.0001), 0) : 0;

          if (effectiveMode !== "persistent") {
            enterTl.progress(enter);
          }

          // Once entry is complete, clear the GSAP identity transform from the inner
          // div so it doesn't create a CSS containing block that could interfere with
          // any descendants relying on viewport-relative positioning.
          if (effectiveMode === "takeover" || effectiveMode === "pinned") {
            if (enter >= 1 && !innerTransformCleared) {
              innerTransformCleared = true;
              gsap.set(inner, { clearProps: "transform" });
            } else if (enter < 1 && innerTransformCleared) {
              innerTransformCleared = false;
              // transform will be re-applied by enterTl.progress(enter) above
            }
          }

          if (effectiveMode === "pinned" && pinTl) {
            pinTl.progress(Math.min(pin, 1));
          }

          onProgress?.({
            enter,
            pin,
            overall,
            isCommitted: overall >= snapThreshold,
          });
        },
        onEnter(self) {
          if (effectiveMode === "persistent") {
            enterTl.play();
          }

          if (effectiveMode === "takeover" && self.progress >= snapThreshold) {
            gsap.to(inner, { ...to, duration: 0.45, ease: "power2.out", overwrite: "auto" });
          }
        },
        onLeaveBack(self) {
          if (effectiveMode === "takeover" && self.progress > 0 && self.progress < snapThreshold) {
            gsap.to(inner, { ...from, duration: 0.35, ease: "power2.in", overwrite: "auto" });
          }
        },
        onLeave() {
          if (effectiveMode === "persistent") {
            gsap.set(inner, to);
          }
        },
        onEnterBack() {
          if (effectiveMode === "persistent") {
            enterTl.reverse();
          }
        },
      });

      if (effectiveMode === "persistent") {
        gsap.set(section, {
          position: "sticky",
          top: 0,
          zIndex: 0,
        });
      }

      return () => {
        trigger.kill();
        enterTl.kill();
        pinTl?.kill();
      };
    }, section);

    return () => context.revert();
  }, [mode, overlay, enterLength, pinLength, snapThreshold, buildPinnedTimeline, onProgress]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen ${overlayFromPrevious ? "-mt-[100vh]" : ""} ${className}`}
      style={{ zIndex }}
    >
      <div ref={innerRef} className="h-full w-full">
        {children}
      </div>
    </section>
  );
}
