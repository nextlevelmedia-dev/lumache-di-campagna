"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentType,
  type SVGProps,
} from "react";
import {
  Ban,
  Hand,
  Heart,
  Route,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import { SplitTitle } from "@/components/ui/SplitTitle";

/* ------------------------------------------------------------------ */
/*  TIPI                                                               */
/* ------------------------------------------------------------------ */

type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number | string;
  }
>;

type Differentiator = {
  icon: IconComponent;
  title: string;
  text: string;
};

/* ------------------------------------------------------------------ */
/*  DATI                                                               */
/* ------------------------------------------------------------------ */

const differentiators: Differentiator[] = [
  {
    icon: Route,
    title: "Filiera diretta",
    text: "Alleviamo, lavoriamo e confezioniamo tutto internamente. Dalla terra alla tavola, senza intermediari.",
  },
  {
    icon: Sprout,
    title: "Allevamento italiano",
    text: "Ciclo di crescita naturale in azienda agricola, nel rispetto dei tempi biologici della lumaca.",
  },
  {
    icon: Hand,
    title: "Lavorazione artigianale",
    text: "Nessuna catena industriale: ogni fase, dalla raccolta al confezionamento, è seguita a mano.",
  },
  {
    icon: ShieldCheck,
    title: "Tracciabilità completa",
    text: "Sappiamo sempre da dove viene ogni singolo prodotto, dall'allevamento fino al tuo tavolo.",
  },
  {
    icon: Ban,
    title: "Zero additivi",
    text: "Nessun conservante o ingrediente aggiunto solo per prolungare la conservazione.",
  },
  {
    icon: Heart,
    title: "Metodo cruelty-free",
    text: "La bava di lumaca viene raccolta con tecniche che rispettano il benessere dell'animale.",
  },
];

/* ------------------------------------------------------------------ */
/*  CARD                                                               */
/* ------------------------------------------------------------------ */

type ValueCardProps = {
  item: Differentiator;
  index: number;
};

function ValueCard({
  item,
  index,
}: ValueCardProps) {
  const Icon = item.icon;

  return (
    <article
      className={[
        "group relative overflow-hidden",

        // Mobile
        "w-[calc(100vw-40px)]",
        "max-w-[330px]",
        "rounded-[1.35rem]",
        "p-5",

        // Glass verde più coprente
        "border border-white/20",
        "bg-[rgba(44,82,61,0.92)]",
        "text-white",
        "shadow-[0_22px_60px_rgba(7,32,20,0.28)]",
        "backdrop-blur-2xl",
        "backdrop-saturate-150",
        "transition-[background,border-color,box-shadow] duration-500",

        "hover:border-white/30",
        "hover:bg-[rgba(50,91,68,0.96)]",
        "hover:shadow-[0_28px_70px_rgba(7,32,20,0.34)]",

        // Tablet
        "sm:w-[340px]",
        "sm:max-w-none",
        "sm:rounded-[1.6rem]",
        "sm:p-6",

        // Desktop
        "lg:w-[clamp(255px,20vw,310px)]",
        "lg:min-h-[300px]",
        "lg:rounded-[1.8rem]",
        "lg:p-7",
      ].join(" ")}
    >
      {/* Fondo interno: mantiene il look glass senza mostrare il testo dietro */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.025)_48%,rgba(8,40,25,0.14))]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.13),transparent_46%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-inner shadow-white/5 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
            <Icon
              size={21}
              strokeWidth={1.7}
            />
          </div>

          <span className="font-sans text-[10px] font-semibold tracking-[0.24em] text-white/40">
            0{index + 1}
          </span>
        </div>

        <h3 className="heading-display mt-5 text-[1.35rem] leading-[1.08] text-white sm:text-[1.55rem] lg:mt-7 lg:text-[1.65rem]">
          {item.title}
        </h3>

        <p className="mt-2.5 font-sans text-[13px] leading-[1.65] text-white/75 sm:text-[14px] sm:leading-[1.7] lg:mt-4 lg:text-[14px] lg:leading-[1.75]">
          {item.text}
        </p>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  SCENA ANIMATA                                                      */
/* ------------------------------------------------------------------ */

function AnimatedValuesPath() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const panelRef =
    useRef<HTMLDivElement>(null);

  const mobilePathRef =
    useRef<SVGPathElement>(null);

  const desktopPathRef =
    useRef<SVGPathElement>(null);

  const valuesTextRef =
    useRef<HTMLDivElement>(null);

  const valuesShineRef =
    useRef<HTMLParagraphElement>(null);

  const cardsRef =
    useRef<Array<HTMLDivElement | null>>([]);

  /* ---------------------------------------------------------------- */
  /*  ALTEZZA PANNELLO                                                 */
  /* ---------------------------------------------------------------- */

  useLayoutEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    let previousWidth =
      window.innerWidth;

    let resizeFrame = 0;

    const measureLayout = () => {
      const isMobileOrTablet =
        window.innerWidth < 1024;

      const header =
        document.querySelector<HTMLElement>(
          "header",
        );

      const headerHeight =
        header?.getBoundingClientRect().height ??
        0;

      const panelHeight =
        isMobileOrTablet
          ? window.innerHeight
          : window.innerHeight -
            headerHeight;

      panel.style.setProperty(
        "--values-panel-height",
        `${Math.ceil(panelHeight)}px`,
      );

      /*
       * Segnala alla timeline GSAP che il pannello
       * ha cambiato misura.
       */
      window.dispatchEvent(
        new Event(
          "values-panel-layout-change",
        ),
      );
    };

    const handleResize = () => {
      const currentWidth =
        window.innerWidth;

      /*
       * Evita refresh continui causati dalla toolbar
       * del browser mobile.
       */
      if (
        Math.abs(
          currentWidth -
            previousWidth,
        ) < 20
      ) {
        return;
      }

      previousWidth =
        currentWidth;

      window.cancelAnimationFrame(
        resizeFrame,
      );

      resizeFrame =
        window.requestAnimationFrame(
          measureLayout,
        );
    };

    measureLayout();

    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "orientationchange",
      handleResize,
      {
        passive: true,
      },
    );

    return () => {
      window.cancelAnimationFrame(
        resizeFrame,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );

      window.removeEventListener(
        "orientationchange",
        handleResize,
      );
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  GSAP                                                             */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const section =
      sectionRef.current;

    const panel =
      panelRef.current;

    const mobilePath =
      mobilePathRef.current;

    const desktopPath =
      desktopPathRef.current;

    const valuesText =
      valuesTextRef.current;

    const valuesShine =
      valuesShineRef.current;

    const cards =
      cardsRef.current.filter(
        (
          card,
        ): card is HTMLDivElement =>
          card !== null,
      );

    if (
      !section ||
      !panel ||
      !mobilePath ||
      !desktopPath ||
      !valuesText ||
      !valuesShine ||
      cards.length === 0
    ) {
      return;
    }

    let cancelled = false;

    let context: {
      revert: () => void;
    } | null = null;

    let refreshFrameOne = 0;
    let refreshFrameTwo = 0;

    const initialiseAnimation =
      async () => {
        const [
          { gsap },
          { ScrollTrigger },
          { MotionPathPlugin },
        ] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import(
            "gsap/MotionPathPlugin"
          ),
        ]);

        if (cancelled) {
          return;
        }

        gsap.registerPlugin(
          ScrollTrigger,
          MotionPathPlugin,
        );

        ScrollTrigger.config({
          ignoreMobileResize: true,
        });

        const refreshAllTriggers =
          () => {
            window.cancelAnimationFrame(
              refreshFrameOne,
            );

            window.cancelAnimationFrame(
              refreshFrameTwo,
            );

            refreshFrameOne =
              window.requestAnimationFrame(
                () => {
                  refreshFrameTwo =
                    window.requestAnimationFrame(
                      () => {
                        if (cancelled) {
                          return;
                        }

                        /*
                         * Il pin viene ordinato e misurato
                         * prima dei titoli nelle sezioni
                         * successive.
                         */
                        ScrollTrigger.sort();
                        ScrollTrigger.refresh(
                          true,
                        );
                      },
                    );
                },
              );
          };

        const handleLayoutChange =
          () => {
            refreshAllTriggers();
          };

        window.addEventListener(
          "values-panel-layout-change",
          handleLayoutChange,
        );

        context = gsap.context(() => {
          const media =
            gsap.matchMedia();

          const getHeaderHeight =
            () => {
              const header =
                document.querySelector<HTMLElement>(
                  "header",
                );

              return (
                header?.getBoundingClientRect()
                  .height ?? 0
              );
            };

          /* -------------------------------------------------------- */
          /*  MOBILE E TABLET                                         */
          /* -------------------------------------------------------- */

          media.add(
            "(max-width: 1023px)",
            () => {
              gsap.set(cards, {
                zIndex: (
                  index: number,
                ) =>
                  cards.length -
                  index,

                autoAlpha: 0,
                scale: 0.72,
                filter: "blur(8px)",

                transformOrigin:
                  "50% 50%",

                willChange:
                  "transform, opacity, filter",
              });

              gsap.set(valuesText, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              });

              gsap.set(valuesShine, {
                autoAlpha: 0,
                backgroundPosition:
                  "200% center",

                willChange:
                  "opacity, background-position",
              });

              const timeline =
                gsap.timeline({
                  defaults: {
                    ease: "none",
                  },

                  scrollTrigger: {
                    trigger: section,

                    start: () =>
                      `top top+=${getHeaderHeight()}`,

                    end: "+=3400",

                    scrub: 0.85,

                    pin: panel,
                    pinSpacing: true,

                    anticipatePin: 1,

                    invalidateOnRefresh:
                      true,

                    /*
                     * Deve essere misurato prima
                     * degli SplitTitle successivi.
                     */
                    refreshPriority: 100,
                  },
                });

              /*
               * Riflesso lento:
               * accensione graduale, attraversamento
               * morbido e uscita delicata.
               */
              timeline.to(
                valuesShine,
                {
                  autoAlpha: 0.62,
                  duration: 0.22,
                  ease: "sine.out",
                },
                0.01,
              );

              timeline.to(
                valuesShine,
                {
                  backgroundPosition:
                    "-100% center",

                  duration: 0.95,
                  ease: "sine.inOut",
                },
                0.01,
              );

              timeline.to(
                valuesShine,
                {
                  autoAlpha: 0,
                  duration: 0.3,
                  ease: "sine.inOut",
                },
                0.72,
              );

              timeline.to(
                cards,
                {
                  duration: 1,

                  motionPath: {
                    path: mobilePath,
                    align: mobilePath,
                    alignOrigin: [
                      0.5,
                      0.5,
                    ],
                    autoRotate: false,
                    curviness: 1.8,
                  },

                  stagger: {
                    each: 0.32,
                  },
                },
                0,
              );

              timeline.to(
                cards,
                {
                  autoAlpha: 1,
                  scale: 1,
                  filter: "blur(0px)",

                  duration: 0.18,

                  stagger: {
                    each: 0.28,
                  },
                },
                0,
              );

              timeline.to(
                cards,
                {
                  autoAlpha: 0,
                  scale: 0.82,
                  filter: "blur(7px)",

                  duration: 0.13,

                  stagger: {
                    each: 0.28,
                  },
                },
                0.87,
              );

              return () => {
                timeline.kill();
              };
            },
          );

          /* -------------------------------------------------------- */
          /*  DESKTOP                                                 */
          /* -------------------------------------------------------- */

          media.add(
            "(min-width: 1024px)",
            () => {
              gsap.set(cards, {
                zIndex: (
                  index: number,
                ) =>
                  cards.length -
                  index,

                autoAlpha: 0,
                scale: 0.58,
                filter: "blur(14px)",

                transformOrigin:
                  "50% 50%",

                willChange:
                  "transform, opacity, filter",
              });

              gsap.set(valuesText, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              });

              gsap.set(valuesShine, {
                autoAlpha: 0,
                backgroundPosition:
                  "200% center",

                willChange:
                  "opacity, background-position",
              });

              const timeline =
                gsap.timeline({
                  defaults: {
                    ease: "none",
                  },

                  scrollTrigger: {
                    trigger: section,

                    start: () =>
                      `top top+=${getHeaderHeight()}`,

                    end: "+=3600",

                    scrub: 1.1,

                    pin: panel,
                    pinSpacing: true,

                    anticipatePin: 1,

                    invalidateOnRefresh:
                      true,

                    refreshPriority: 100,
                  },
                });

              /*
               * Stesso riflesso lento usato
               * su mobile.
               */
              timeline.to(
                valuesShine,
                {
                  autoAlpha: 0.62,
                  duration: 0.22,
                  ease: "sine.out",
                },
                0.01,
              );

              timeline.to(
                valuesShine,
                {
                  backgroundPosition:
                    "-100% center",

                  duration: 0.95,
                  ease: "sine.inOut",
                },
                0.01,
              );

              timeline.to(
                valuesShine,
                {
                  autoAlpha: 0,
                  duration: 0.3,
                  ease: "sine.inOut",
                },
                0.72,
              );

              timeline.to(
                cards,
                {
                  duration: 1,

                  motionPath: {
                    path: desktopPath,
                    align: desktopPath,
                    alignOrigin: [
                      0.5,
                      0.5,
                    ],
                    autoRotate: false,
                    curviness: 2,
                  },

                  stagger: {
                    each: 0.18,
                  },
                },
                0,
              );

              timeline.to(
                cards,
                {
                  autoAlpha: 1,
                  scale: 1,
                  filter: "blur(0px)",

                  duration: 0.2,

                  stagger: {
                    each: 0.18,
                  },
                },
                0,
              );

              timeline.to(
                cards,
                {
                  autoAlpha: 0,
                  scale: 0.78,
                  filter:
                    "blur(11px)",

                  duration: 0.14,

                  stagger: {
                    each: 0.18,
                  },
                },
                0.86,
              );

              return () => {
                timeline.kill();
              };
            },
          );

          return () => {
            media.revert();
          };
        }, section);

        /*
         * Aspetta la creazione del pin-spacer,
         * poi ricalcola tutti i trigger successivi.
         */
        refreshAllTriggers();

        /*
         * SplitText dipende dalle misure reali dei font.
         */
        void document.fonts.ready.then(
          () => {
            if (!cancelled) {
              refreshAllTriggers();
            }
          },
        );

        return () => {
          window.removeEventListener(
            "values-panel-layout-change",
            handleLayoutChange,
          );
        };
      };

    let removeLayoutListener:
      | (() => void)
      | undefined;

    void initialiseAnimation().then(
      (cleanup) => {
        removeLayoutListener =
          cleanup;
      },
    );

    return () => {
      cancelled = true;

      window.cancelAnimationFrame(
        refreshFrameOne,
      );

      window.cancelAnimationFrame(
        refreshFrameTwo,
      );

      removeLayoutListener?.();
      context?.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative"
    >
      <div
        ref={panelRef}
        style={{
          height:
            "var(--values-panel-height, 100vh)",

          minHeight:
            "var(--values-panel-height, 100vh)",
        }}
        className="relative w-full overflow-hidden bg-[var(--green)]"
      >
        {/* Fondo */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_15%_15%,#ffffff_0,transparent_35%),radial-gradient(circle_at_85%_85%,#ffffff_0,transparent_35%)]" />

        {/* Titolo */}
        <div className="pointer-events-none absolute left-1/2 top-8 z-30 w-full max-w-[760px] -translate-x-1/2 px-5 text-center sm:top-10 sm:px-8 lg:top-10 xl:top-12">
          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5 sm:gap-4">
            <span className="h-px w-8 bg-white/35 sm:w-12" />

            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.27em] text-white/65 sm:text-xs sm:tracking-[0.32em]">
              Perché sceglierci
            </p>

            <span className="h-px w-8 bg-white/35 sm:w-12" />
          </div>

          {/*
           * Il titolo è già dentro la sezione pin.
           * Non crea un secondo ScrollTrigger annidato.
           */}
          <SplitTitle
            as="h2"
            scrollTrigger={false}
            delay={0.08}
            duration={1.35}
            stagger={0.065}
            className="heading-display text-[2.35rem] leading-[1.06] text-white sm:text-[3.1rem] lg:text-[3.8rem] xl:text-[4.6rem]"
          >
            Cosa ci rende{" "}
            <span className="italic">
              diversi
            </span>
          </SplitTitle>
        </div>

        {/* Scritta centrale */}
        <div
          ref={valuesTextRef}
          className="pointer-events-none absolute left-1/2 top-[42%] z-0 w-full -translate-x-1/2 -translate-y-1/2 px-2 text-center sm:top-[54%] lg:top-[57%] lg:px-0"
        >
          {/* Testo base */}
          <p
            aria-hidden="true"
            className="relative font-serif text-[15vw] leading-[1.08] tracking-[-0.055em] text-white/[0.07] sm:text-[13vw] sm:leading-[0.82] lg:text-[10.5vw] lg:text-white/[0.04]"
          >
            <span className="hidden whitespace-nowrap sm:inline">
              I NOSTRI VALORI
            </span>

            <span className="block sm:hidden">
              <span className="whitespace-nowrap">
                I NOSTRI
              </span>

              <span className="mt-[0.18em] block whitespace-nowrap">
                VALORI
              </span>
            </span>
          </p>

          {/* Riflesso */}
          <p
            ref={valuesShineRef}
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 0%, transparent 36%, rgba(255,255,255,0.08) 43%, rgba(255,255,255,0.58) 50%, rgba(255,255,255,0.14) 57%, transparent 64%, transparent 100%)",

              backgroundSize:
                "220% 100%",

              backgroundPosition:
                "200% center",

              WebkitBackgroundClip:
                "text",

              backgroundClip:
                "text",

              color:
                "transparent",

              WebkitTextFillColor:
                "transparent",

              filter:
                "drop-shadow(0 0 18px rgba(255,255,255,0.14))",
            }}
            className="absolute inset-0 font-serif text-[15vw] leading-[1.08] tracking-[-0.055em] sm:text-[13vw] sm:leading-[0.82] lg:text-[10.5vw]"
          >
            <span className="hidden whitespace-nowrap sm:inline">
              I NOSTRI VALORI
            </span>

            <span className="block sm:hidden">
              <span className="whitespace-nowrap">
                I NOSTRI
              </span>

              <span className="mt-[0.18em] block whitespace-nowrap">
                VALORI
              </span>
            </span>
          </p>
        </div>

        {/* Percorso mobile */}
        <svg
          viewBox="0 0 430 900"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full lg:hidden"
          aria-hidden="true"
        >
          <path
            ref={mobilePathRef}
            d="
              M 500 20
              C 305 70, 325 205, 225 290
              C 130 370, 120 500, 220 575
              C 300 640, 265 735, 15 845
            "
            fill="none"
            stroke="transparent"
          />
        </svg>

        {/* Percorso desktop */}
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          aria-hidden="true"
        >
          <path
            ref={desktopPathRef}
            d="
              M 1760 140
              C 1540 210, 1360 350, 1160 470
              C 940 570, 700 605, 430 565
              C 170 520, -20 570, -220 620
            "
            fill="none"
            stroke="transparent"
          />
        </svg>

        {/* Card */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {differentiators.map(
            (item, index) => (
              <div
                key={item.title}
                ref={(node) => {
                  cardsRef.current[index] =
                    node;
                }}
                className="pointer-events-auto absolute left-0 top-0"
              >
                <ValueCard
                  item={item}
                  index={index}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SEZIONE                                                            */
/* ------------------------------------------------------------------ */

export function DifferentiatorsOrbit() {
  return (
    <section className="relative bg-[var(--green)]">
      <AnimatedValuesPath />
    </section>
  );
}