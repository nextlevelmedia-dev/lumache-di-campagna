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
      words?: HTMLElement[];
      lines?: HTMLElement[];
    } | null = null;

    let context: {
      revert: () => void;
    } | null = null;

    const setupAnimation = async () => {
      const [
        { gsap },
        { SplitText },
        scrollTriggerModule,
      ] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
        scrollTrigger
          ? import("gsap/ScrollTrigger")
          : Promise.resolve(null),
      ]);

      if (cancelled || !ref.current) {
        return;
      }

      if (
        scrollTrigger &&
        scrollTriggerModule
      ) {
        gsap.registerPlugin(
          SplitText,
          scrollTriggerModule.ScrollTrigger,
        );
      } else {
        gsap.registerPlugin(SplitText);
      }

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

        /*
         * Ogni riga diventa una maschera:
         * le parole entrano dal basso senza uscire
         * visivamente dal blocco del titolo.
         */
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
          paused: scrollTrigger,
        });

        if (
          scrollTrigger &&
          scrollTriggerModule
        ) {
          scrollTriggerModule.ScrollTrigger.create({
            trigger: element,
            start: "top 88%",
            end: "bottom 10%",
            once: !repeat,

            onEnter: () => {
              animation.restart(true);
            },

            /*
             * Durante la risalita il titolo resta visibile.
             */
            onEnterBack: () => {
              animation.progress(1).pause();
            },

            /*
             * Se repeat è attivo, viene preparato soltanto
             * quando il titolo torna completamente sotto
             * la viewport.
             */
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

          return;
        }

        animation.play();
      }, element);
    };

    void setupAnimation();

    return () => {
      cancelled = true;
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