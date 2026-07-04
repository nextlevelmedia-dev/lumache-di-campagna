"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";

const images = [
  { src: "/images/lumache-sfuse-1.png", label: "01 / Allevamento" },
  { src: "/images/lumache-sfuse-2.png", label: "02 / Raccolta" },
  { src: "/images/lumache-sfuse-3.png", label: "03 / Lavorazione" },
  { src: "/images/piatto-1.png", label: "04 / Prodotto" },
];

export function DepthGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let scrollTriggerInstance: { kill: () => void } | null = null;

    const container = containerRef.current;
    const list = listRef.current;
    const tiles = tilesRef.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    if (!container || !list || tiles.length < 2) return;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/CustomEase"),
    ]).then(([{ gsap }, { ScrollTrigger }, { CustomEase }]) => {
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("depth", "M0,0 C0.6,0 0,1 1,1");

      const tileCount = tiles.length;
      const xMultiplier = window.innerWidth < 768 ? 0.46: 0.65;
      const backScale = 0.5;
      const backOpacity = 1;
      const backDarkness = 1;
      const sideRotateY = 5;
      const perspective = 75;

      const moveDuration = 1.5;
      const startDelay = 0.5;
      const pauseDuration = 0.125;

      const state = { progress: 0 };

      let isActive = false;
      let isHovering = false;
      let hasStarted = false;
      let stepTimeline: ReturnType<typeof gsap.timeline> | undefined;
      let delayedCall: ReturnType<typeof gsap.delayedCall> | undefined;
      let startDelayedCall: ReturnType<typeof gsap.delayedCall> | undefined;
      let activeTileIndex = -1;

      gsap.set(list, { perspective: `${perspective}em` });
      gsap.set(tiles, {
        transformStyle: "preserve-3d",
        transformPerspective: perspective * 16,
      });

      function getRelativeIndex(index: number) {
        let relative = index - state.progress;
        relative =
          (((relative + tileCount / 2) % tileCount) + tileCount) %
            tileCount -
          tileCount / 2;
        return gsap.utils.clamp(-2, 2, relative);
      }

      function getActiveIndex() {
        return (
          ((Math.round(state.progress) % tileCount) + tileCount) % tileCount
        );
      }

      function updateTileStatus() {
        const currentActiveIndex = getActiveIndex();
        if (currentActiveIndex === activeTileIndex) return;
        activeTileIndex = currentActiveIndex;
      }

      function renderDepth() {
        const tileWidth = tiles[0].offsetWidth;
        const radiusX = tileWidth * xMultiplier;

        updateTileStatus();

        tiles.forEach((tile, index) => {
          const relative = getRelativeIndex(index);
          const angle = (relative / 2) * Math.PI;

          const orbitX = Math.sin(angle) * radiusX;
          const orbitDepth = (Math.cos(angle) + 1) / 2;

          const x = relative <= -2 || relative >= 2 ? 0 : orbitX;
          const scale = gsap.utils.interpolate(backScale, 1, orbitDepth);
          const opacity = gsap.utils.interpolate(backOpacity, 1, orbitDepth);
          const brightness = gsap.utils.interpolate(
            backDarkness,
            1,
            orbitDepth
          );
          const rotateY = Math.sin(angle) * -sideRotateY;
          const zIndex = Math.round(
            gsap.utils.interpolate(1, 1000, orbitDepth)
          );

          gsap.set(tile, {
            x,
            scale,
            opacity,
            rotateY,
            filter: `brightness(${brightness})`,
            zIndex,
          });
        });
      }

      function goToNextTile() {
        if (!isActive || isHovering) return;

        stepTimeline = gsap.timeline({
          paused: true,
          onComplete: () => {
            if (isActive && !isHovering) {
              delayedCall = gsap.delayedCall(pauseDuration, goToNextTile);
            }
          },
        });

        stepTimeline.to(state, {
          progress: state.progress + 1,
          duration: moveDuration,
          ease: "depth",
          onUpdate: renderDepth,
        });

        stepTimeline.play();
      }

      function pauseDepth() {
        isActive = false;
        stepTimeline?.pause();
        delayedCall?.kill();
        startDelayedCall?.kill();
      }

      function playDepth() {
        isActive = true;
        if (isHovering) return;

        if (!hasStarted) {
          hasStarted = true;
          startDelayedCall = gsap.delayedCall(startDelay, goToNextTile);
          return;
        }

        if (stepTimeline && stepTimeline.progress() < 1) {
          stepTimeline.play();
        } else {
          goToNextTile();
        }
      }

      function handleHoverStart() {
        isHovering = true;
        delayedCall?.pause();
        startDelayedCall?.pause();
      }

      function handleHoverEnd() {
        isHovering = false;
        if (!isActive) return;

        if (!hasStarted) {
          playDepth();
          return;
        }

        if (stepTimeline && stepTimeline.progress() < 1) {
          stepTimeline.play();
        } else {
          goToNextTile();
        }
      }

      const onPointerOver = (event: PointerEvent) => {
        if (!(event.target as HTMLElement).closest("[data-tile]")) return;
        handleHoverStart();
      };
      const onPointerLeave = () => handleHoverEnd();

      list.addEventListener("pointerover", onPointerOver);
      list.addEventListener("pointerleave", onPointerLeave);

      renderDepth();

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self: { isActive: boolean }) =>
          self.isActive ? playDepth() : pauseDepth(),
      });

      return () => {
        list.removeEventListener("pointerover", onPointerOver);
        list.removeEventListener("pointerleave", onPointerLeave);
      };
    });

    return () => {
      scrollTriggerInstance?.kill();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-10 lg:py-28">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--green)]" />
            <p className="eyebrow">Momenti dalla fattoria</p>
            <span className="h-px w-12 bg-[var(--green)]" />
          </div>

          <SplitTitle
            as="h2"
            className="heading-display text-[2.25rem] leading-[1.2] text-[var(--green)] sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Uno sguardo dietro le quinte
          </SplitTitle>
        </div>
      </Container>

      {/* Carosello full-width, fuori dal Container */}
      <div
        ref={containerRef}
        className="mt-8 flex h-[40vh] w-full items-center justify-center overflow-clip sm:h-[55vh] lg:mt-16 lg:h-[70vh]"
      >
        <div className="relative flex items-center justify-center">
          <div ref={listRef} className="grid place-items-center">
            {images.map((img, index) => (
              <div
                key={img.src}
                data-tile
                ref={(el) => {
                  tilesRef.current[index] = el;
                }}
                className="col-start-1 row-start-1 flex w-max items-center justify-center will-change-[transform,opacity,filter]"
              >
                <div className="relative aspect-square w-[clamp(13em,25vw,32em)] overflow-hidden rounded-[1.5em] shadow-2xl shadow-black/20 transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.35,1.5,0.6,1)] hover:scale-95">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="32em"
                    className="rounded-[inherit] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 flex w-full items-center gap-2 p-6 text-white">
                    <div className="h-2 w-2 rounded-full bg-current" />
                    <p className="text-[1.125em] font-medium tracking-tight">
                      {img.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}