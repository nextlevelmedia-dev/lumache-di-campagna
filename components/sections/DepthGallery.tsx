"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";

const images = [
  { src: "/images/lumache-sfuse-1.png", alt: "Lumache allevate" },
  { src: "/images/lumache-sfuse-2.png", alt: "Lumache nel verde" },
  { src: "/images/lumache-sfuse-3.png", alt: "Lumache raccolte" },
  { src: "/images/lumache-sfuse-3.png", alt: "Piatto con lumache" },
  { src: "/images/lumache-sfuse-3.png", alt: "Preparazione gastronomica" },
  { src: "/images/lumache-sfuse-3.png", alt: "Piatto della tradizione" },
  {
    src: "/images/allevamento-immagine-drone.jpg",
    alt: "Allevamento visto dall’alto",
  },
  { src: "/images/lumaca.jpg", alt: "Lumaca in primo piano" },
];

const MOBILE_HEADER_HEIGHT = 97;

export function DepthGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(330);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(250);
        return;
      }

      if (window.innerWidth < 1024) {
        setRadius(280);
        return;
      }

      setRadius(390);
    };

    updateRadius();

    window.addEventListener("resize", updateRadius);

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const rect = section.getBoundingClientRect();

      const availableViewportHeight =
        window.innerHeight - MOBILE_HEADER_HEIGHT;

      const scrollableDistance =
        section.offsetHeight - availableViewportHeight;

      const progress =
        scrollableDistance > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollableDistance))
          : 0;

      setRotation(progress * 360);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 180);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling) {
        setRotation((currentRotation) => currentRotation + 0.025);
      }

      frameRef.current = requestAnimationFrame(autoRotate);
    };

    frameRef.current = requestAnimationFrame(autoRotate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isScrolling]);

  const anglePerItem = 360 / images.length;

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] bg-[var(--background)] sm:h-[360vh] lg:h-[420vh]"
    >
      <div className="sticky top-[97px] flex h-[calc(100svh-97px)] flex-col overflow-hidden lg:top-[103px] lg:h-[calc(100svh-103px)]">
        <Container className="relative z-20 shrink-0 pt-15 pb-0 sm:pt-10 sm:pb-5 lg:pt-16 lg:pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4 sm:gap-4 lg:mb-6">
              <span className="h-px w-8 bg-[var(--green)] sm:w-10 lg:w-12" />

              <p className="eyebrow">Momenti dalla fattoria</p>

              <span className="h-px w-8 bg-[var(--green)] sm:w-10 lg:w-12" />
            </div>

            <SplitTitle
              as="h2"
              className="heading-display text-[2.45rem] leading-[0.98] text-[var(--green)] sm:text-[3rem] lg:text-[4rem]"
            >
              Uno sguardo dietro le quinte
            </SplitTitle>

            <p className="mt-3 text-sm text-[var(--muted-foreground)] sm:mt-4 sm:text-base">
              Scorri per esplorare
            </p>
          </div>
        </Container>

        <div
          role="region"
          aria-label="Galleria circolare"
           className="relative -mt-28 -mb-24 flex min-h-0 flex-1 items-center justify-center sm:mt-0 sm:mb-0"
          style={{
            perspective: "1800px",
          }}
        >
          <div
            className="relative h-full w-full will-change-transform"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {images.map((image, index) => {
              const itemAngle = index * anglePerItem;

              const relativeAngle =
                (itemAngle + (rotation % 360) + 360) % 360;

              const normalizedAngle = Math.abs(
                relativeAngle > 180
                  ? 360 - relativeAngle
                  : relativeAngle
              );

              const opacity = Math.max(
                0.18,
                1 - normalizedAngle / 150
              );

              const scale =
                0.82 +
                Math.max(0, 1 - normalizedAngle / 180) * 0.18;

              return (
                <article
                  key={image.src}
                  aria-label={image.alt}
                  className="absolute left-1/2 top-1/2 h-[250px] w-[180px] sm:h-[310px] sm:w-[225px] lg:h-[380px] lg:w-[280px]"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotateY(${itemAngle}deg)
                      translateZ(${radius}px)
                      scale(${scale})
                    `,
                    opacity,
                    transition:
                      "opacity 180ms linear, transform 180ms linear",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-black/10 bg-[var(--background)] shadow-2xl shadow-black/20">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 639px) 180px, (max-width: 1023px) 225px, 280px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}