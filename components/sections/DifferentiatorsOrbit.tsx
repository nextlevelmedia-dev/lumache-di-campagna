"use client";

import {
  useEffect,
  useRef,
  type ComponentType,
  type SVGProps,
} from "react";
import Image from "next/image";
import {
  ArrowRight,
  Ban,
  Hand,
  Heart,
  Route,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
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

        // Aspetto
        "border border-white/20",
        "bg-white/[0.10]",
        "text-white",
        "backdrop-blur-xl",
        "transition-[background,border-color] duration-500",
        "hover:border-white/30",
        "hover:bg-white/[0.19]",

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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,.12),transparent_45%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white sm:h-12 sm:w-12 lg:h-14 lg:w-14">
            <Icon
              size={21}
              strokeWidth={1.7}
            />
          </div>

          <span className="font-sans text-[10px] font-semibold tracking-[0.24em] text-white/35">
            0{index + 1}
          </span>
        </div>

        <h3 className="heading-display mt-5 text-[1.35rem] leading-[1.08] text-white sm:text-[1.55rem] lg:mt-7 lg:text-[1.65rem]">
          {item.title}
        </h3>

        <p className="mt-2.5 font-sans text-[13px] leading-[1.65] text-white/70 sm:text-[14px] sm:leading-[1.7] lg:mt-4 lg:text-[14px] lg:leading-[1.75]">
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const mobilePathRef =
    useRef<SVGPathElement>(null);

  const desktopPathRef =
    useRef<SVGPathElement>(null);

  const cardsRef =
    useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const mobilePath = mobilePathRef.current;
    const desktopPath = desktopPathRef.current;

    const cards = cardsRef.current.filter(
      (card): card is HTMLDivElement =>
        card !== null,
    );

    if (
      !section ||
      !panel ||
      !mobilePath ||
      !desktopPath ||
      cards.length === 0
    ) {
      return;
    }

    let cancelled = false;

    let context: {
      revert: () => void;
    } | null = null;

    const initialiseAnimation = async () => {
      const [
        { gsap },
        { ScrollTrigger },
        { MotionPathPlugin },
      ] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/MotionPathPlugin"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(
        ScrollTrigger,
        MotionPathPlugin,
      );

      context = gsap.context(() => {
        const media = gsap.matchMedia();

        /* ---------------------------------------------------------- */
        /*  MOBILE E TABLET                                           */
        /* ---------------------------------------------------------- */

        media.add(
          "(max-width: 1023px)",
          () => {
            gsap.set(cards, {
              zIndex: (index: number) =>
                cards.length - index,

              autoAlpha: 0,
              scale: 0.72,
              filter: "blur(8px)",

              transformOrigin: "50% 50%",

              willChange:
                "transform, opacity, filter",
            });

            const timeline = gsap.timeline({
              defaults: {
                ease: "none",
              },

              scrollTrigger: {
                trigger: section,
                start: "top top",

                /*
                 * Più spazio di scroll per tenere
                 * le card maggiormente distanziate.
                 */
                end: "+=3400",

                scrub: 0.85,

                pin: panel,
                pinSpacing: true,

                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            timeline.to(
              cards,
              {
                duration: 1,

                motionPath: {
                  path: mobilePath,
                  align: mobilePath,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                  curviness: 1.8,
                },

                stagger: {
                  each: 0.24,
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
                  each: 0.24,
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
                  each: 0.24,
                },
              },
              0.87,
            );

            return () => {
              timeline.kill();
            };
          },
        );

        /* ---------------------------------------------------------- */
        /*  DESKTOP                                                   */
        /* ---------------------------------------------------------- */

        media.add(
          "(min-width: 1024px)",
          () => {
            gsap.set(cards, {
              zIndex: (index: number) =>
                cards.length - index,

              autoAlpha: 0,
              scale: 0.58,
              filter: "blur(14px)",

              transformOrigin: "50% 50%",

              willChange:
                "transform, opacity, filter",
            });

            const timeline = gsap.timeline({
              defaults: {
                ease: "none",
              },

              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=3600",

                scrub: 1.1,

                pin: panel,
                pinSpacing: true,

                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            timeline.to(
              cards,
              {
                duration: 1,

                motionPath: {
                  path: desktopPath,
                  align: desktopPath,
                  alignOrigin: [0.5, 0.5],
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
                filter: "blur(11px)",

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

      ScrollTrigger.refresh();
    };

    void initialiseAnimation();

    return () => {
      cancelled = true;
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
        className={[
          "relative w-full overflow-hidden",
          "bg-[var(--green)]",

          /*
           * Full screen stabile su mobile.
           * Non cambia con le barre di Safari.
           */
          "h-[100svh]",
          "min-h-[100svh]",

          /*
           * Desktop.
           */
          "lg:h-screen",
          "lg:min-h-screen",
        ].join(" ")}
      >
        {/* Fondo */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_15%_15%,#ffffff_0,transparent_35%),radial-gradient(circle_at_85%_85%,#ffffff_0,transparent_35%)]" />

        {/* Titolo in alto */}
        <div className="pointer-events-none absolute left-1/2 top-28 z-30 w-full max-w-[760px] -translate-x-1/2 px-5 text-center sm:top-28 sm:px-8 lg:top-24 xl:top-28">
          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5 sm:gap-4">
            <span className="h-px w-8 bg-white/35 sm:w-12" />

            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.27em] text-white/65 sm:text-xs sm:tracking-[0.32em]">
              Perché sceglierci
            </p>

            <span className="h-px w-8 bg-white/35 sm:w-12" />
          </div>

          <SplitTitle
            as="h2"
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

        {/* Decorazione centrale */}
        <div className="pointer-events-none absolute left-1/2 top-[54%] z-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:top-[57%]">
          <p
  aria-hidden="true"
  className="whitespace-nowrap font-serif text-[23vw] leading-[0.72] tracking-[-0.075em] text-white/[0.04] sm:text-[21vw] lg:text-[18vw]"
>
  VALORI
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
              M 1760 90
              C 1540 160, 1360 300, 1160 420
              C 940 545, 700 590, 430 545
              C 170 510, -20 595, -220 690
            "
            fill="none"
            stroke="transparent"
          />
        </svg>

        {/* Card animate */}
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

        {/* CTA */}
        <div className="absolute bottom-12 left-1/2 z-40 -translate-x-1/2 sm:bottom-8 lg:bottom-10">
          <Button
            href="#prodotti"
            variant="secondary"
            className="gap-2 whitespace-nowrap"
          >
            Richiedi informazioni
            <ArrowRight size={17} />
          </Button>
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