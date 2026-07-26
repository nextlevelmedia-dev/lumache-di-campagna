"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

const steps = [
  {
    number: "01",
    eyebrow: "Allevamento",
    title: (
      <>
        <span className="italic text-[var(--red)]">
          Ciclo naturale
        </span>
        , nel rispetto dei tempi della lumaca
      </>
    ),
    text: "Le lumache crescono in azienda agricola seguendo il loro ritmo biologico, senza forzature. Nessun allevamento intensivo, solo il tempo necessario perché la materia prima sia quella giusta.",
    image: "/images/ciclo-naturale.png",
  },
  {
    number: "02",
    eyebrow: "Raccolta e lavorazione",
    title: (
      <>
        <span className="italic text-[var(--red)]">
          Selezionate a mano
        </span>
        , lavorate in azienda
      </>
    ),
    text: "Ogni lumaca viene raccolta e selezionata a mano. La lavorazione — pulitura, cottura, confezionamento — avviene tutta internamente, senza passare da terzi.",
    image: "/images/selezione-lumache.png",
  },
  {
    number: "03",
    eyebrow: "Dalla terra alla tavola",
    title: (
      <>
        <span className="italic text-[var(--red)]">
          Nessun intermediario
        </span>
        , dal campo al vasetto
      </>
    ),
    text: "Il prodotto finito esce dalla nostra azienda pronto per arrivare da te — stessa filiera, stessa tracciabilità, dall'allevamento al tuo tavolo.",
    image: "/images/sulla-tavola.png",
  },
];

type TimelineStepProps = {
  step: (typeof steps)[number];
};

function TimelineStep({
  step,
}: TimelineStepProps) {
  return (
    <article
      className={[
        "timeline-step relative shrink-0",

        "w-[calc(100vw-32px)]",
        "max-w-[430px]",

        "sm:w-[min(78vw,680px)]",
        "sm:max-w-none",

        "lg:w-[min(78vw,1080px)]",
      ].join(" ")}
    >
      <div
        className={[
          "step-number",
          "absolute left-1/2 top-2 z-30",
          "flex h-11 w-11 -translate-x-1/2",
          "items-center justify-center",
          "rounded-full",
          "border-4 border-[var(--background)]",
          "bg-[var(--green)]",
          "font-serif text-[15px] text-white",
          "shadow-lg shadow-green-950/15",

          "sm:h-12 sm:w-12 sm:text-base",

          "lg:top-1 lg:h-14 lg:w-14",
          "lg:text-lg",
        ].join(" ")}
      >
        {step.number}
      </div>

      <div
        className={[
          "grid grid-cols-1",
          "gap-6 pt-[78px]",

          "sm:gap-7 sm:pt-[84px]",

          "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
          "lg:items-center",
          "lg:gap-12",
          "lg:pt-[86px]",

          "xl:gap-16",
        ].join(" ")}
      >
        <div
          className={[
            "step-image relative",
            "aspect-[16/8.5]",
            "w-full overflow-hidden",
            "rounded-[1.4rem]",
            "border border-[var(--border)]",
            "bg-[var(--soft-gray)]",
            "shadow-lg shadow-black/5",

            "sm:rounded-[1.75rem]",

            "lg:aspect-[16/9.4]",
            "lg:rounded-[2rem]",
          ].join(" ")}
        >
          <Image
            src={step.image}
            alt={step.eyebrow}
            fill
            priority={step.number === "01"}
            sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 78vw, 45vw"
            className="object-cover"
          />
        </div>

        <div className="step-text min-w-0 px-1 pb-2 sm:px-2 lg:px-0 lg:pr-4">
          <p className="eyebrow">
            {step.eyebrow}
          </p>

          <h3
            className={[
              "heading-display mt-3",
              "text-[1.65rem] leading-[1.16]",
              "text-[var(--green)]",

              "sm:text-[2rem]",

              "lg:mt-4",
              "lg:text-[clamp(1.9rem,2.25vw,2.45rem)]",
            ].join(" ")}
          >
            {step.title}
          </h3>

          <p
            className={[
              "body-large mt-4",
              "max-w-[60ch]",
              "text-[14px] leading-[1.65]",

              "sm:text-[15px]",

              "lg:mt-5",
              "lg:text-[clamp(14px,1.05vw,17px)]",
              "lg:leading-[1.7]",
            ].join(" ")}
          >
            {step.text}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Allevamento() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    let cancelled = false;
    let context: gsap.Context | null = null;
    let resizeFrame = 0;
    let previousWidth = window.innerWidth;

    const initialise = async () => {
      const [
        { gsap },
        { ScrollTrigger },
      ] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      const getHeaderHeight = () => {
  const header =
    document.querySelector<HTMLElement>("header");

  return Math.ceil(
    header?.getBoundingClientRect().height ?? 0,
  );
};

      const getPanelHeight = () => {
        const height =
          window.visualViewport?.height ??
          window.innerHeight;

        return Math.round(
          height - getHeaderHeight(),
        );
      };

      const getTravelDistance = () => {
        const finalStep =
          track.lastElementChild as
            | HTMLElement
            | null;

        if (!finalStep) {
          return 0;
        }

        /*
         * Porta l'ultimo step nella stessa
         * posizione iniziale del primo.
         *
         * Non usa il viewportRef:
         * su mobile evitava misure diverse
         * durante la comparsa della toolbar.
         */
        return Math.max(
          0,
          finalStep.offsetLeft -
            track.firstElementChild
              ?.getBoundingClientRect().left! +
            track.getBoundingClientRect().left,
        );
      };

      const updateMeasurements = () => {
        const panelHeight =
          getPanelHeight();

        const travelDistance =
          getTravelDistance();

        section.style.setProperty(
          "--allevamento-header-height",
          `${getHeaderHeight()}px`,
        );

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

        /*
         * Movimento principale:
         * parte esattamente quando entra
         * in funzione lo sticky CSS.
         */
        const horizontalTween =
          gsap.to(track, {
            x: () =>
              -getTravelDistance(),

            ease: "none",
            force3D: true,

            scrollTrigger: {
              id: "allevamento-horizontal",
              trigger: section,

              start: () =>
                `top top+=${getHeaderHeight()}`,

              end: () =>
                `+=${getTravelDistance()}`,

              scrub: 0.35,
              invalidateOnRefresh: true,
              fastScrollEnd: false,
            },
          });

        /*
         * Ingresso leggero GSAP.
         *
         * Ogni step appare quando entra
         * nella parte destra dello schermo.
         * Niente blur: su mobile era il
         * principale responsabile del lag.
         */
        timelineSteps.forEach(
          (step, index) => {
            const image =
              step.querySelector(
                ".step-image",
              );

            const text =
              step.querySelector(
                ".step-text",
              );

            const number =
              step.querySelector(
                ".step-number",
              );

            gsap.fromTo(
              [image, text],
              {
                autoAlpha:
                  index === 0 ? 1 : 0,
                y:
                  index === 0 ? 0 : 18,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",

                scrollTrigger: {
                  trigger: step,
                  containerAnimation:
                    horizontalTween,

                  start: "left 88%",
                  toggleActions:
                    "play none none reverse",
                },
              },
            );

            gsap.fromTo(
              number,
              {
                autoAlpha:
                  index === 0 ? 1 : 0,
                scale:
                  index === 0 ? 1 : 0.75,
              },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.35,
                ease: "back.out(1.5)",

                scrollTrigger: {
                  trigger: step,
                  containerAnimation:
                    horizontalTween,

                  start: "left 88%",
                  toggleActions:
                    "play none none reverse",
                },
              },
            );
          },
        );
      }, section);

      await document.fonts.ready;

      if (!cancelled) {
        updateMeasurements();
        ScrollTrigger.refresh(true);
      }
    };

    void initialise();

    const handleResize = () => {
      const currentWidth =
        window.innerWidth;

      if (
        Math.abs(
          currentWidth -
            previousWidth,
        ) < 16
      ) {
        return;
      }

      previousWidth = currentWidth;

      window.cancelAnimationFrame(
        resizeFrame,
      );

      resizeFrame =
        window.requestAnimationFrame(
          () => {
            ScrollTrigger.refresh(true);
          },
        );
    };

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
      cancelled = true;

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

      context?.revert();
    };
  }, []);

  return (
    <>
      <section
        id="allevamento"
        ref={sectionRef}
        style={{
          height:
            "var(--allevamento-section-height, calc(100vh + 2400px))",
        }}
        className="relative bg-[var(--background)]"
      >
        <div
          style={{
            top: "var(--allevamento-header-height, 0px)",
            height:
              "var(--allevamento-panel-height, 100vh)",
          }}
          className="sticky w-full overflow-hidden bg-[var(--background)]"
        >
          <Container className="relative z-30 pt-8 sm:pt-9 lg:pt-8">
            <div className="mx-auto w-full text-center">
              <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4 sm:gap-4">
                <span className="h-px w-8 bg-[var(--green)] sm:w-12" />

                <p className="eyebrow whitespace-nowrap">
                  Come lavoriamo
                </p>

                <span className="h-px w-8 bg-[var(--green)] sm:w-12" />
              </div>

              <SplitTitle
  as="h2"
  scrollTrigger={false}
  className={[
    "heading-display",
    "mx-auto",
    "leading-[1.05]",
    "text-[var(--green)]",

    // Mobile: può andare su due righe
    "max-w-[340px]",
    "text-[2.25rem]",

    // Tablet
    "sm:max-w-[620px]",
    "sm:text-[2.75rem]",

    // Desktop: sempre una sola riga
    "lg:max-w-none",
    "lg:whitespace-nowrap",
    "lg:text-[3.25rem]",
  ].join(" ")}
>
  Dalla terra alla tavola,{" "}
  <span className="italic text-[var(--red)]">
    passo dopo passo
  </span>
</SplitTitle>
            </div>
          </Container>

          <div
            className={[
              "absolute inset-x-0 bottom-0",

              /*
               * Il titolo mobile ora è più grande,
               * quindi la timeline parte un poco
               * più in basso.
               */
              "top-[142px]",
              "sm:top-[150px]",
              "lg:top-[132px]",
              "xl:top-[140px]",
            ].join(" ")}
          >
            <div
              className={[
                "pointer-events-none",
                "absolute inset-x-0 top-[30px]",
                "z-0 h-px",
                "bg-[var(--border)]",

                "sm:top-[32px]",
                "lg:top-[31px]",
              ].join(" ")}
            />

            <div
              ref={trackRef}
              className={[
                "relative z-10",
                "flex h-full w-max",
                "items-start",

                "gap-10",
                "sm:gap-16",
                "lg:gap-20",
                "xl:gap-24",

                "pl-4 pr-4",
                "sm:pl-[8vw] sm:pr-[8vw]",
                "lg:pl-[11vw] lg:pr-[11vw]",

                "will-change-transform",
              ].join(" ")}
            >
              {steps.map((step) => (
                <TimelineStep
                  key={step.number}
                  step={step}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--background)] pb-20 pt-14 lg:pb-28 lg:pt-20">
        <Container>
          <div className="flex justify-center">
            <Button
              href={whatsappLink(
                "Ciao, vorrei sapere di più sul metodo di allevamento di Lumache di Campagna.",
              )}
              className="gap-2 shadow-xl shadow-green-950/10"
            >
              <MessageCircle size={18} />
              Richiedi informazioni
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}