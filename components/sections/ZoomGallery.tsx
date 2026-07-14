"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";

/* ------------------------------------------------------------------ */
/*  CONFIGURAZIONE                                                     */
/* ------------------------------------------------------------------ */

const MAX_ZOOM_WIDTH = 1200;

const MOBILE_HORIZONTAL_PADDING = 40;
// px-5 = 20px per lato

const DESKTOP_HORIZONTAL_PADDING = 64;
// md:px-8 = 32px per lato

/* ------------------------------------------------------------------ */
/*  IMMAGINI                                                           */
/* ------------------------------------------------------------------ */

const images = [
  { src: "/images/ciclo-naturale.png", alt: "Lumache di Campagna 1" },
  { src: "/images/images (25).jpeg", alt: "Lumache di Campagna 2" },
  { src: "/images/Lumaland.jpg", alt: "Lumache di Campagna 3" },
  { src: "/images/lumache-sfuse-3.png", alt: "Lumache di Campagna 4" },
  { src: "/images/lumaca.jpg", alt: "Lumache di Campagna 5" },
  { src: "/images/lumacs.png", alt: "Lumache di Campagna 6" },
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 7" },
];

/* ------------------------------------------------------------------ */
/*  POSIZIONI                                                          */
/*                                                                     */
/*  Senza prefisso = mobile                                            */
/*  lg: = desktop                                                      */
/* ------------------------------------------------------------------ */

const positions = [
  // 0 — centrale
  "",

  // 1 — alto centrale
  [
    // Mobile
    "[&>div]:!-top-[26vh]",
    "[&>div]:!left-[10vw]",
    "[&>div]:!h-[25vh]",
    "[&>div]:!w-[45vw]",

    // Desktop
    "lg:[&>div]:!-top-[30vh]",
    "lg:[&>div]:!left-[6vw]",
    "lg:[&>div]:!h-[24vh]",
    "lg:[&>div]:!w-[30vw]",
  ].join(" "),

  // 2 — alto sinistra
  [
    // Mobile
    "[&>div]:!-top-[10vh]",
    "[&>div]:!-left-[30vw]",
    "[&>div]:!h-[30vh]",
    "[&>div]:!w-[30vw]",

    // Desktop
    "lg:[&>div]:!-top-[12vh]",
    "lg:[&>div]:!-left-[30vw]",
    "lg:[&>div]:!h-[28vh]",
    "lg:[&>div]:!w-[24vw]",
  ].join(" "),

  // 3 — alto destra
  [
    // Mobile
    "[&>div]:!top-[-2vh]",
    "[&>div]:!left-[30vw]",
    "[&>div]:!h-[20vh]",
    "[&>div]:!w-[30vw]",

    // Desktop
    "lg:[&>div]:!-top-[2vh]",
    "lg:[&>div]:!left-[30vw]",
    "lg:[&>div]:!h-[22vh]",
    "lg:[&>div]:!w-[24vw]",
  ].join(" "),

  // 4 — basso centrale
  [
    // Mobile
    "[&>div]:!top-[26vh]",
    "[&>div]:!left-[1.5vw]",
    "[&>div]:!h-[25vh]",
    "[&>div]:!w-[30vw]",

    // Desktop
    "lg:[&>div]:!top-[30vh]",
    "lg:[&>div]:!left-[2vw]",
    "lg:[&>div]:!h-[23vh]",
    "lg:[&>div]:!w-[25vw]",
  ].join(" "),

  // 5 — basso sinistra
  [
    // Mobile
    "[&>div]:!top-[18.5vh]",
    "[&>div]:!-left-[30vw]",
    "[&>div]:!h-[25vh]",
    "[&>div]:!w-[28vw]",

    // Desktop
    "lg:[&>div]:!top-[22vh]",
    "lg:[&>div]:!-left-[28vw]",
    "lg:[&>div]:!h-[23vh]",
    "lg:[&>div]:!w-[24vw]",
  ].join(" "),

  // 6 — basso destra
  [
    // Mobile
    "[&>div]:!top-[17vh]",
    "[&>div]:!left-[30vw]",
    "[&>div]:!h-[15vh]",
    "[&>div]:!w-[22vw]",

    // Desktop
    "lg:[&>div]:!top-[25vh]",
    "lg:[&>div]:!left-[28vw]",
    "lg:[&>div]:!h-[18vh]",
    "lg:[&>div]:!w-[21vw]",
  ].join(" "),
];

/* ------------------------------------------------------------------ */
/*  SINGOLA IMMAGINE                                                   */
/* ------------------------------------------------------------------ */

type GalleryImageProps = {
  src: string;
  alt: string;
  index: number;
  scale: MotionValue<number>;
};

function GalleryImage({
  src,
  alt,
  index,
  scale,
}: GalleryImageProps) {
  return (
    <motion.div
      style={{
        scale,
        translateZ: 0,
        willChange: "transform",
      }}
      className={[
        "absolute inset-0",
        "flex items-center justify-center",
        "transform-gpu",
        "[transform-style:preserve-3d]",
        positions[index] ?? "",
      ].join(" ")}
    >
      <div
        className={[
          "relative",
          "h-[25vh] w-[25vw]",
          "overflow-hidden",
          "rounded-[1.4rem]",
          "border border-white/60",
          "shadow-none",
          "[backface-visibility:hidden]",
          "[transform:translateZ(0)]",
          "[contain:paint]",
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={index === 0}
          quality={index === 0 ? 85 : 72}
          sizes={
            index === 0
              ? "25vw"
              : "(max-width: 1023px) 45vw, 30vw"
          }
          className="object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(23,63,43,.12),rgba(165,31,36,.03))]" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SEZIONE                                                            */
/* ------------------------------------------------------------------ */

export function ZoomGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [centerEndScale, setCenterEndScale] = useState(3.2);

  useLayoutEffect(() => {
    const calculateCenterScale = () => {
      const viewportWidth = window.innerWidth;

      const horizontalPadding =
        viewportWidth < 768
          ? MOBILE_HORIZONTAL_PADDING
          : DESKTOP_HORIZONTAL_PADDING;

      const availableWidth =
        viewportWidth - horizontalPadding;

      const targetWidth = Math.min(
        MAX_ZOOM_WIDTH,
        availableWidth,
      );

      const initialWidth = viewportWidth * 0.25;

      const nextScale =
        targetWidth / initialWidth;

      setCenterEndScale(
        Math.max(1, nextScale),
      );
    };

    calculateCenterScale();

    window.addEventListener(
      "resize",
      calculateCenterScale,
    );

    return () => {
      window.removeEventListener(
        "resize",
        calculateCenterScale,
      );
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
   * Più veloce della versione precedente,
   * ma con sufficiente inerzia da restare morbido.
   */
  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 90,
      damping: 26,
      mass: 0.42,
      restDelta: 0.0001,
      restSpeed: 0.001,
    },
  );

  const centerScale = useTransform(
    smoothProgress,
    [0, 1],
    [1, centerEndScale],
  );

  const scale5 = useTransform(
    smoothProgress,
    [0, 1],
    [1, 5],
  );

  const scale6 = useTransform(
    smoothProgress,
    [0, 1],
    [1, 6],
  );

  const scale65 = useTransform(
    smoothProgress,
    [0, 1],
    [1, 6.5],
  );

  const scales = [
    centerScale,
    scale5,
    scale6,
    scale5,
    scale6,
    scale65,
    scale65,
  ];

  return (
    <section className="bg-[var(--background)]">
      {/* Intro compatta */}
      <Container className="flex min-h-[220px] flex-col items-center justify-center pb-8 pt-16 text-center sm:min-h-[280px] sm:pb-10 sm:pt-20 lg:min-h-[360px] lg:pb-14 lg:pt-24">
        <div className="mb-2 flex items-center gap-3 sm:mb-3 sm:gap-4">
          <span className="h-px w-8 bg-[var(--green)] sm:w-10" />

          <p className="eyebrow">
            Dalla nostra terra
          </p>

          <span className="h-px w-8 bg-[var(--green)] sm:w-10" />
        </div>

        <SplitTitle
  as="h2"
  repeat
  duration={1.3}
  stagger={0.065}
  className="heading-display max-w-2xl text-[1.85rem] leading-[1.12] text-[var(--green)] sm:text-[2.7rem] lg:text-[3.4rem]"
>
  Ogni scatto racconta la nostra{" "}
  <span className="italic text-[var(--red)]">
    cura artigianale
  </span>
  .
</SplitTitle>
      </Container>

      {/* Zoom più rapido, senza cambiare l'effetto */}
      <div
        ref={containerRef}
        className="relative -mt-14 h-[290vh] sm:-mt-12 sm:h-[285vh] lg:-mt-8 lg:h-[290vh]"
      >
        <div className="sticky top-0 h-dvh overflow-hidden">
          {images.map(({ src, alt }, index) => (
            <GalleryImage
              key={`${src}-${index}`}
              src={src}
              alt={alt}
              index={index}
              scale={scales[index]}
            />
          ))}
        </div>
      </div>

      {/* Spazio finale */}
      <div
        className="h-[4vh] sm:h-[5vh] lg:h-[6vh]"
        aria-hidden="true"
      />
    </section>
  );
}