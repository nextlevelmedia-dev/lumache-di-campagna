"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const HEADER_HEIGHT = 96;

const steps = [
  {
    number: "01",
    eyebrow: "Allevamento",
    accent: "Ciclo naturale",
    title: ", nel rispetto dei tempi della lumaca",
    text: "Le lumache crescono seguendo il loro ritmo naturale, senza forzature né allevamento intensivo. Dedichiamo attenzione a ogni fase della crescita, per ottenere una materia prima di qualità.",
    image: "/images/zoomgallery7.webp",
  },
  {
    number: "02",
    eyebrow: "Raccolta e selezione",
    accent: "Selezionate con cura",
    title: ", direttamente dal nostro allevamento",
    text: "Al termine del ciclo di crescita, le lumache vengono raccolte e selezionate con attenzione. È da qui che nasce la materia prima destinata alle nostre diverse proposte.",
    image: "/images/zoomgallery3.webp",
  },
  {
    number: "03",
    eyebrow: "I nostri prodotti",
    accent: "Dall'allevamento",
    title: ", alle nostre proposte",
    text: "Le lumache del nostro allevamento sono il punto di partenza delle nostre proposte: dalle lumache sfuse alle specialità in vasetto, fino ai cosmetici alla bava di lumaca.",
    image: "/images/hero/prodotti-autentici.webp",
  },
];

function DesktopStep({
  step,
}: {
  step: (typeof steps)[number];
}) {
  return (
    <article className="timeline-step relative w-[min(76vw,1080px)] shrink-0">
      <div className="step-number absolute left-1/2 top-1 z-30 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[var(--background)] bg-[var(--green)] font-serif text-lg text-white shadow-lg shadow-green-950/15">
        {step.number}
      </div>

      <div className="grid grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] items-center gap-12 pt-[86px] xl:gap-16">
        <div className="step-image relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--soft-gray)] shadow-lg shadow-black/5">
          <Image
            src={step.image}
            alt={step.eyebrow}
            fill
            priority={step.number === "01"}
            sizes="45vw"
            className="object-cover"
          />
        </div>

        <div className="step-text min-w-0 pr-4">
          <p className="eyebrow">{step.eyebrow}</p>

          <h3 className="heading-display mt-4 text-[clamp(1.9rem,2.25vw,2.45rem)] leading-[1.12] text-[var(--green)]">
            <span className="italic text-[var(--red)]">
              {step.accent}
            </span>
            {step.title}
          </h3>

          <p className="body-large mt-5 max-w-[60ch] text-[clamp(14px,1.05vw,17px)] leading-[1.7]">
            {step.text}
          </p>
        </div>
      </div>
    </article>
  );
}

function MobileStep({
  step,
  isLast,
}: {
  step: (typeof steps)[number];
  isLast: boolean;
}) {
  return (
    <article className="mobile-timeline-step relative grid w-full min-w-0 grid-cols-[44px_minmax(0,1fr)] gap-3 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6">
      <div className="relative flex min-w-0 justify-center">
        {!isLast && (
          <span className="mobile-timeline-line absolute bottom-[-32px] top-11 w-px origin-top bg-[var(--border)]" />
        )}

        <div className="mobile-timeline-number relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-[var(--background)] bg-[var(--green)] font-serif text-sm text-white shadow-md shadow-green-950/10 sm:h-12 sm:w-12 sm:text-base">
          {step.number}
        </div>
      </div>

      <div
        className={`mobile-timeline-content min-w-0 ${
          isLast ? "" : "pb-10 sm:pb-12"
        }`}
      >
        <div className="relative aspect-[16/9] w-full min-w-0 overflow-hidden rounded-[1.4rem] border border-[var(--border)] bg-[var(--soft-gray)] shadow-lg shadow-black/5 sm:rounded-[1.75rem]">
          <Image
            src={step.image}
            alt={step.eyebrow}
            fill
            priority={step.number === "01"}
            sizes="(max-width: 1023px) calc(100vw - 88px)"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 pt-5">
          <p className="eyebrow">{step.eyebrow}</p>

          <h3 className="heading-display mt-3 break-words text-[1.55rem] leading-[1.12] text-[var(--green)] sm:text-[2rem]">
            <span className="italic text-[var(--red)]">
              {step.accent}
            </span>
            {step.title}
          </h3>

          <p className="body-large mt-3 max-w-[60ch] break-words text-[13px] leading-[1.6] sm:text-[15px]">
            {step.text}
          </p>
        </div>
      </div>
    </article>
  );
}

function SectionHeading({
  desktop = false,
}: {
  desktop?: boolean;
}) {
  return (
    <div className="mx-auto w-full min-w-0 text-center">
      <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4 sm:gap-4">
        <span className="h-px w-8 shrink-0 bg-[var(--green)] sm:w-12" />
        <p className="eyebrow whitespace-nowrap">Come lavoriamo</p>
        <span className="h-px w-8 shrink-0 bg-[var(--green)] sm:w-12" />
      </div>

      <h2
        className={[
          "heading-display mx-auto leading-[1.05] text-[var(--green)]",
          "max-w-[340px] text-[2.25rem] sm:max-w-[620px] sm:text-[2.75rem]",
          desktop
            ? "lg:max-w-none lg:whitespace-nowrap lg:text-[3.25rem]"
            : "",
        ].join(" ")}
      >
        Dalla terra,{" "}
        <span className="italic text-[var(--red)]">
          alla tavola
        </span>
      </h2>
    </div>
  );
}

export function Allevamento() {
  const desktopSectionRef = useRef<HTMLElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const desktopLineRef = useRef<HTMLDivElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = desktopSectionRef.current;
    const track = desktopTrackRef.current;

    if (!section || !track) return;

    let cancelled = false;
    let context: gsap.Context | null = null;
    let resizeFrame = 0;
    let previousWidth = window.innerWidth;

    const initialise = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const getPanelHeight = () =>
        Math.max(window.innerHeight - HEADER_HEIGHT, 0);

      const getTravelDistance = () => {
        const firstStep =
          track.firstElementChild as HTMLElement | null;
        const finalStep =
          track.lastElementChild as HTMLElement | null;

        if (!firstStep || !finalStep) return 0;

        return Math.max(
          0,
          finalStep.offsetLeft - firstStep.offsetLeft,
        );
      };

      const updateMeasurements = () => {
        const panelHeight = getPanelHeight();
        const travelDistance = getTravelDistance();

        section.style.setProperty(
          "--allevamento-panel-height",
          `${panelHeight}px`,
        );

        section.style.setProperty(
          "--allevamento-section-height",
          `${panelHeight + travelDistance}px`,
        );
      };

      updateMeasurements();

      context = gsap.context(() => {
        const timelineSteps =
          gsap.utils.toArray<HTMLElement>(
            ".timeline-step",
            track,
          );

        if (desktopLineRef.current) {
          gsap.fromTo(
            desktopLineRef.current,
            {
              scaleX: 0,
              transformOrigin: "left center",
            },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: `top top+=${HEADER_HEIGHT + 40}`,
                once: true,
              },
            },
          );
        }

        const horizontalTween = gsap.timeline({
          scrollTrigger: {
            id: "allevamento-horizontal",
            trigger: section,
            start: `top top+=${HEADER_HEIGHT}`,
            end: () => `+=${getTravelDistance()}`,
            scrub: 0.35,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
          },
        });

        horizontalTween.to(track, {
          x: () => -getTravelDistance(),
          ease: "none",
          force3D: true,
          duration: 1,
        });

        timelineSteps.forEach((step, index) => {
          const image = step.querySelector(".step-image");
          const text = step.querySelector(".step-text");
          const number = step.querySelector(".step-number");

          gsap.fromTo(
            [image, text],
            {
              autoAlpha: 0,
              y: 26,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger:
                index === 0
                  ? {
                      trigger: section,
                      start: `top top+=${HEADER_HEIGHT + 20}`,
                      once: true,
                    }
                  : {
                      trigger: step,
                      containerAnimation: horizontalTween,
                      start: "left 88%",
                      toggleActions:
                        "play none none reverse",
                    },
            },
          );

          gsap.fromTo(
            number,
            {
              autoAlpha: 0,
              scale: 0.72,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.5)",
              scrollTrigger:
                index === 0
                  ? {
                      trigger: section,
                      start: `top top+=${HEADER_HEIGHT + 20}`,
                      once: true,
                    }
                  : {
                      trigger: step,
                      containerAnimation: horizontalTween,
                      start: "left 88%",
                      toggleActions:
                        "play none none reverse",
                    },
            },
          );
        });
      }, section);

      await document.fonts.ready;

      if (!cancelled) {
        updateMeasurements();
        ScrollTrigger.refresh(true);
      }

      const handleResize = () => {
        const currentWidth = window.innerWidth;

        if (
          Math.abs(currentWidth - previousWidth) < 16
        ) {
          return;
        }

        previousWidth = currentWidth;
        window.cancelAnimationFrame(resizeFrame);

        resizeFrame = window.requestAnimationFrame(() => {
          updateMeasurements();
          ScrollTrigger.refresh(true);
        });
      };

      window.addEventListener("resize", handleResize, {
        passive: true,
      });

      window.addEventListener(
        "orientationchange",
        handleResize,
        { passive: true },
      );

      const cleanup = () => {
        window.cancelAnimationFrame(resizeFrame);
        window.removeEventListener(
          "resize",
          handleResize,
        );
        window.removeEventListener(
          "orientationchange",
          handleResize,
        );
      };

      if (cancelled) {
        cleanup();
      }

      (
        section as HTMLElement & {
          __allevamentoCleanup?: () => void;
        }
      ).__allevamentoCleanup = cleanup;
    };

    void initialise();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(resizeFrame);

      (
        section as HTMLElement & {
          __allevamentoCleanup?: () => void;
        }
      ).__allevamentoCleanup?.();

      context?.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const section = mobileSectionRef.current;

    if (!section) return;

    let cancelled = false;
    let context: gsap.Context | null = null;

    const initialiseMobile = async () => {
      const [{ gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      context = gsap.context(() => {
        const mobileSteps =
          gsap.utils.toArray<HTMLElement>(
            ".mobile-timeline-step",
            section,
          );

        mobileSteps.forEach((step) => {
          const number = step.querySelector(
            ".mobile-timeline-number",
          );

          const content = step.querySelector(
            ".mobile-timeline-content",
          );

          const line = step.querySelector(
            ".mobile-timeline-line",
          );

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              once: true,
            },
          });

          timeline
            .fromTo(
              number,
              {
                autoAlpha: 0,
                scale: 0.55,
                y: 12,
              },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.55,
                ease: "back.out(1.7)",
              },
            )
            .fromTo(
              content,
              {
                autoAlpha: 0,
                y: 18,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.68,
                ease: "power3.out",
              },
              "-=0.22",
            );

          if (line) {
            timeline.fromTo(
              line,
              {
                scaleY: 0,
                transformOrigin: "top center",
              },
              {
                scaleY: 1,
                duration: 0.78,
                ease: "power2.out",
              },
              "-=0.3",
            );
          }
        });
      }, section);

      await document.fonts.ready;

      if (!cancelled) {
        ScrollTrigger.refresh(true);
      }
    };

    void initialiseMobile();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <>
      {/* MOBILE / TABLET */}
      <section
        id="allevamento-mobile"
        ref={mobileSectionRef}
        className="relative w-full max-w-full bg-[var(--background)] py-16 sm:py-20 lg:hidden"
      >
        <Container>
          <SectionHeading />

          <div className="mt-12 w-full min-w-0 sm:mt-16">
            {steps.map((step, index) => (
              <MobileStep
                key={step.number}
                step={step}
                isLast={
                  index === steps.length - 1
                }
              />
            ))}
          </div>
        </Container>
      </section>

      {/* DESKTOP */}
      <section
        id="allevamento"
        ref={desktopSectionRef}
        style={{
          height:
            "var(--allevamento-section-height, calc(100vh - 96px + 2400px))",
        }}
        className="relative hidden bg-[var(--background)] lg:block"
      >
        <div
          style={{
            top: `${HEADER_HEIGHT}px`,
            height:
              "var(--allevamento-panel-height, calc(100dvh - 96px))",
          }}
          className="sticky w-full overflow-hidden bg-[var(--background)]"
        >
          <Container className="relative z-30 pt-7 xl:pt-8">
            <SectionHeading desktop />
          </Container>

          <div className="absolute inset-x-0 bottom-[92px] top-[118px] xl:top-[126px]">
            <div
              ref={desktopLineRef}
              className="pointer-events-none absolute inset-x-0 top-[31px] z-0 h-px bg-[var(--border)]"
            />

            <div
              ref={desktopTrackRef}
              className="relative z-10 flex h-full w-max items-start gap-20 pl-[11vw] pr-[11vw] will-change-transform xl:gap-24"
            >
              {steps.map((step) => (
                <DesktopStep
                  key={step.number}
                  step={step}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}