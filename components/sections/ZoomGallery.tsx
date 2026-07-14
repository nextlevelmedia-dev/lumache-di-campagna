"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { Container } from "@/components/ui/Container";

/* ------------------------------------------------------------------ */
/*  DATA — sostituisci gli src con le foto definitive                  */
/*  index 0 = immagine centrale che riempie lo schermo                 */
/* ------------------------------------------------------------------ */

const images = [
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 1" },
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 2" },
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 3" },
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 4" },
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 5" },
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 6" },
  { src: "/images/hero/hero-snail.jpg", alt: "Lumache di Campagna 7" },
];

// posizione + dimensione dei riquadri attorno al centrale (index 0 = centro)
const positions = [
  "",
  "[&>div]:!-top-[26vh] [&>div]:!left-[10vw] [&>div]:!h-[25vh] [&>div]:!w-[45vw]",
  "[&>div]:!-top-[10vh] [&>div]:!-left-[30vw] [&>div]:!h-[30vh] [&>div]:!w-[30vw]",
  "[&>div]:!top-[-2vh] [&>div]:!left-[30vw] [&>div]:!h-[20vh] [&>div]:!w-[30vw]",
  "[&>div]:!top-[26vh] [&>div]:!left-[1.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]",
  "[&>div]:!top-[18.5vh] [&>div]:!-left-[30vw] [&>div]:!h-[25vh] [&>div]:!w-[28vw]",
  "[&>div]:!top-[17vh] [&>div]:!left-[30vw] [&>div]:!h-[15vh] [&>div]:!w-[22vw]",
];

/* ------------------------------------------------------------------ */
/*  SECTION                                                            */
/* ------------------------------------------------------------------ */

export function ZoomGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <section className="bg-[var(--background)]">
      {/* --- intro (modifica testo/heading) --- */}
      <Container className="flex h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-[var(--green)]" />
          <p className="eyebrow">Dalla nostra terra</p>
          <span className="h-px w-10 bg-[var(--green)]" />
        </div>
        <h2 className="heading-display max-w-2xl text-[2.2rem] leading-[1.15] text-[var(--green)] sm:text-[3rem] lg:text-[3.6rem]">
          Ogni scatto racconta la nostra{" "}
          <span className="italic text-[var(--red)]">cura artigianale</span>.
        </h2>
      </Container>

      {/* --- zoom parallax --- */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-visible">
          {images.map(({ src, alt }, i) => {
            const scale = scales[i % scales.length];

            return (
              <motion.div
                key={i}
                style={{ scale }}
                className={`absolute top-0 flex h-full w-full items-center justify-center will-change-transform ${positions[i] ?? ""}`}
              >
                <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-[1.4rem] border border-white/60 shadow-2xl shadow-black/20">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(23,63,43,.14),rgba(165,31,36,.04))]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* spazio di respiro prima della sezione successiva */}
      <div className="h-[30vh]" aria-hidden="true" />
    </section>
  );
}