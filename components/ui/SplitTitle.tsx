"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type SplitTitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  scrollTrigger?: boolean;
  duration?: number;
  stagger?: number;
  delay?: number;
  repeat?: boolean;
};

export function SplitTitle({
  children,
  as: Tag = "h2",
  className = "",
  scrollTrigger = true,
  duration = 1.25,
  stagger = 0.055,
  delay = 0,
  repeat = false,
}: SplitTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let cancelled = false;

    let splitInstance: {
      revert: () => void;
      words?: Element[];
      lines?: Element[];
    } | null = null;

    let context: {
      revert: () => void;
    } | null = null;

    let refreshFrameOne = 0;
    let refreshFrameTwo = 0;

    const setupAnimation = async () => {
      const [{ gsap }, { SplitText }] =
        await Promise.all([
          import("gsap"),
          import("gsap/SplitText"),
        ]);

      if (cancelled || !ref.current) {
        return;
      }

      gsap.registerPlugin(SplitText);

      /*
       * HERO / TITOLI SENZA SCROLLTRIGGER
       *
       * Manteniamo lo stesso reveal:
       * - salita dal basso
       * - blur
       * - rotazione 3D
       * - stagger
       *
       * Ma non carichiamo ScrollTrigger e non facciamo
       * refresh/layout work che per la Hero non serve.
       */
      if (!scrollTrigger) {
        context = gsap.context(() => {
          const split = new SplitText(element, {
            type: "lines,words",
            linesClass: "split-title-line",
            wordsClass: "split-title-word",
          });

          splitInstance = split;

          const words =
            (split.words ?? []) as HTMLElement[];

          const lines =
            (split.lines ?? []) as HTMLElement[];

          gsap.set(lines, {
            overflow: "hidden",
            paddingBottom: "0.08em",
            marginBottom: "-0.08em",
          });

          gsap.set(element, {
            perspective: 1000,
            transformStyle: "preserve-3d",
          });

          gsap.fromTo(
            words,
            {
              opacity: 0,
              yPercent: 115,
              rotateX: -22,
              rotateZ: 1.5,
              scale: 0.96,
              filter: "blur(9px)",
            },
            {
              opacity: 1,
              yPercent: 0,
              rotateX: 0,
              rotateZ: 0,
              scale: 1,
              filter: "blur(0px)",
              duration,
              stagger: {
                each: stagger,
                from: "start",
              },
              delay,
              ease: "power4.out",
              clearProps:
                "willChange,transformOrigin",
            },
          );
        }, element);

        return;
      }

      /*
       * TITOLI DEL RESTO DELLA PAGINA
       */

      const { ScrollTrigger } =
        await import("gsap/ScrollTrigger");

      if (cancelled || !ref.current) {
        return;
      }

      gsap.registerPlugin(
        SplitText,
        ScrollTrigger,
      );

      context = gsap.context(() => {
        const split = new SplitText(element, {
          type: "lines,words",
          linesClass: "split-title-line",
          wordsClass: "split-title-word",
        });

        splitInstance = split;

        const words =
          (split.words ?? []) as HTMLElement[];

        const lines =
          (split.lines ?? []) as HTMLElement[];

        gsap.set(lines, {
          overflow: "hidden",
          paddingBottom: "0.08em",
          marginBottom: "-0.08em",
        });

        gsap.set(element, {
          perspective: 1000,
          transformStyle: "preserve-3d",
        });

        gsap.set(words, {
          opacity: 0,
          yPercent: 115,
          rotateX: -22,
          rotateZ: 1.5,
          scale: 0.96,
          filter: "blur(9px)",
          transformOrigin: "50% 100%",
          willChange:
            "transform, opacity, filter",
        });

        const animation = gsap.to(words, {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,

          stagger: {
            each: stagger,
            from: "start",
          },

          delay,
          ease: "power4.out",

          clearProps:
            "willChange,transformOrigin",

          paused: true,
        });

        ScrollTrigger.create({
          trigger: element,

          start: "top 88%",
          end: "bottom 10%",

          once: !repeat,
          invalidateOnRefresh: true,

          onEnter: () => {
            animation.restart(true);
          },

          onEnterBack: () => {
            animation
              .progress(1)
              .pause();
          },

          onLeaveBack: () => {
            if (!repeat) {
              return;
            }

            animation.pause(0);

            gsap.set(words, {
              opacity: 0,
              yPercent: 115,
              rotateX: -22,
              rotateZ: 1.5,
              scale: 0.96,
              filter: "blur(9px)",
            });
          },
        });

        refreshFrameOne =
          window.requestAnimationFrame(() => {
            refreshFrameTwo =
              window.requestAnimationFrame(
                () => {
                  if (cancelled) {
                    return;
                  }

                  ScrollTrigger.refresh(true);
                },
              );
          });

        void document.fonts.ready.then(() => {
          if (cancelled) {
            return;
          }

          ScrollTrigger.refresh(true);
        });
      }, element);
    };

    void setupAnimation();

    return () => {
      cancelled = true;

      window.cancelAnimationFrame(
        refreshFrameOne,
      );

      window.cancelAnimationFrame(
        refreshFrameTwo,
      );

      context?.revert();
      splitInstance?.revert();
    };
  }, [
    scrollTrigger,
    duration,
    stagger,
    delay,
    repeat,
  ]);

  return (
    <Tag
      ref={ref}
      className={className}
    >
      {children}
    </Tag>
  );
}