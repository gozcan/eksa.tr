/* EKSA — scroll system: smooth scroll (Lenis) + scroll-driven anims (GSAP/ScrollTrigger).
   Fails gracefully if libs are blocked. */

(function () {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // -------- Lenis smooth scroll --------
  let lenis = null;
  function initLenis() {
    if (typeof Lenis === "undefined") return null;
    lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      lerp: 0.08,
    });
    // Expose for the anchor handler (and easier debugging in DevTools).
    window.__lenis = lenis;
    // Drive lenis.raf from EXACTLY ONE source. The original code registered
    // it on both native requestAnimationFrame AND gsap.ticker — each callback
    // passed a different `time` value, so Lenis's internal dt = time - prevTime
    // calculation flipped sign / blew up every frame, leaving targetScroll
    // updated but `scroll` stuck. That's why nav anchor clicks looked dead
    // intermittently: targetScroll changed but the animation never advanced.
    // We prefer gsap.ticker when ScrollTrigger is present so ScrollTrigger
    // updates stay in sync; otherwise fall back to plain RAF.
    if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
    return lenis;
  }

  // Hero entrance is handled via pure CSS animation (more reliable than GSAP
  // inside Lenis's gsap.ticker integration which can swallow .from tweens).

  // -------- Generic fade-up via IntersectionObserver --------
  function setupFadeUp() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    $$(".fu:not(.hero .fu)").forEach((el) => io.observe(el));
  }

  // -------- Split into word spans for scroll-progress reveal --------
  // Preserves inline elements (like <em>) by walking text nodes only.
  function splitWords() {
    $$("[data-split]").forEach((el) => {
      if (el.dataset.splitDone) return;
      walkAndWrap(el);
      el.dataset.splitDone = "1";
    });
  }
  function walkAndWrap(node) {
    // Collect text-node children first; mutating during iteration is unsafe.
    const kids = Array.from(node.childNodes);
    kids.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent;
        if (!text || !text.trim()) return;
        const parts = text.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (part === "") return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const s = document.createElement("span");
            s.className = "reveal-word";
            s.textContent = part;
            frag.appendChild(s);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walkAndWrap(child);
      }
    });
  }

  // -------- GSAP-powered scroll behaviours --------
  function initScroll() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax + soft scale-down as the stack slides up over it
    gsap.to(".hero .bg", {
      yPercent: 10,
      scale: 1.02,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.fromTo(".hero .content",
      { yPercent: 0, opacity: 1 },
      {
        yPercent: -16,
        opacity: 0.0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    gsap.to(".hero", {
      filter: "brightness(0.8)",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Stack & section corners stay rounded — the slide-up is driven purely by
    // CSS sticky stacking now, so no need to flatten them on pin.

    // Section headers — gentle slide-up reveal as each band enters
    gsap.utils.toArray(".manifesto .label-col, .projects .hd, .stats .heading, .location .head, .contact .lead-row").forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Manifesto word-by-word lit-up reveal
    $$(".manifesto [data-split]").forEach((el) => {
      const words = $$(".reveal-word", el);
      gsap.to(words, {
        opacity: 1,
        stagger: { each: 0.04, from: "start" },
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    });

    // Pinned image scaler — grows from small framed to full-bleed as you scroll
    const scaler = $(".scaler");
    if (scaler) {
      const frame = $(".scaler .frame");
      const img = $(".scaler .frame img");
      gsap.fromTo(
        frame,
        { width: "30%", height: "40%" },
        {
          width: "100%",
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: scaler,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
      gsap.to(img, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scaler,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    // Horizontal sticky scroll for projects — sticky-based, no ScrollTrigger pin
    const horiz = $(".projects .horizontal");
    const sticky = $(".projects .hsticky");
    const track = $(".projects .htrack");
    if (horiz && track) {
      const setup = () => {
        const trackW = track.scrollWidth;
        const viewW = window.innerWidth;
        const distance = Math.max(0, trackW - viewW + 80);
        // outer height = viewport + distance so as you scroll, sticky progresses
        horiz.style.height = (window.innerHeight + distance) + "px";

        // Kill any existing tween on the track
        if (track._st) track._st.kill();
        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: horiz,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        track._st = tween.scrollTrigger;
      };
      setup();
      window.addEventListener("load", () => { setup(); ScrollTrigger.refresh(); });
      window.addEventListener("resize", () => { setup(); ScrollTrigger.refresh(); });
    }

    // Stats: number count up
    $$(".stat-num").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString("tr-TR");
            },
          });
        },
      });
    });

    // (Per-card horizontal parallax removed — was tied to the old pinned trigger
    //  and added complexity without much visual payoff in the new sticky setup.)

    // Nav state on scroll past hero
    ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom 80%",
      onEnter: () => $(".nav").classList.add("scrolled"),
      onLeaveBack: () => $(".nav").classList.remove("scrolled"),
    });
  }

  // -------- Custom cursor --------
  function initCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const c = document.createElement("div");
    c.className = "cursor";
    document.body.appendChild(c);
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    document.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    function loop() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      c.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
    document.addEventListener("mouseover", (e) => {
      const el = e.target;
      if (el.closest("a, button, input, textarea, label, .project-card")) c.classList.add("over-link");
      else c.classList.remove("over-link");
    });
  }

  // -------- Anchor links --------
  // Pass a NUMERIC offset to Lenis (Lenis 1.0.42's element/selector variants
  // are flaky and don't update targetScroll reliably). With the single-source
  // RAF fix in initLenis, Lenis now actually advances the animation, so we
  // don't need a manual RAF fallback — that fallback used to race against
  // Lenis and produce the "sometimes works, sometimes doesn't" behaviour.
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(top, { duration: 1.4, lock: false, force: true });
        } else {
          smoothScrollTo(top, 900);
        }
        history.pushState(null, "", id);
      });
    });
  }
  function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const dist = targetY - startY;
    if (Math.abs(dist) < 2) return;
    const startTime = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
      window.scrollTo(0, startY + dist * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // -------- Scroll progress bar --------
  function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    function update() {
      const max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.width = (p * 100).toFixed(2) + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // -------- Mobile navigation --------
  function initMobileNav() {
    const nav = $(".nav");
    const toggle = $(".menu-toggle", nav || document);
    if (!nav || !toggle) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    $$(".links a", nav).forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(e.target)) setOpen(false);
    });
  }

  // -------- Boot --------
  function boot() {
    splitWords();
    initLenis();
    setupFadeUp();
    initCursor();
    initMobileNav();
    initAnchors();
    initScroll();
    initScrollProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
