"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SplitTitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  scrollTrigger?: boolean;
  duration?: number;
  stagger?: number;
  delay?: number;
};

export function SplitTitle({
  children,
  as: Tag = "h2",
  className = "",
  scrollTrigger = true,
  duration = 0.9,
  stagger = 0.06,
  delay = 0,
}: SplitTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let split: { revert: () => void; words?: Element[] } | null = null;
    let ctx: { revert: () => void } | null = null;

    const el = ref.current;
    if (!el) return;

    if (scrollTrigger) {
      Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
        import("gsap/ScrollTrigger"),
      ]).then(([{ gsap }, { SplitText }, { ScrollTrigger }]) => {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        ctx = gsap.context(() => {
          const instance = new SplitText(el, { type: "words" });
          split = instance;

          gsap.set(instance.words, { opacity: 0, y: "0.6em" });

          gsap.to(instance.words, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        }, el);
      });
    } else {
      Promise.all([import("gsap"), import("gsap/SplitText")]).then(
        ([{ gsap }, { SplitText }]) => {
          gsap.registerPlugin(SplitText);

          ctx = gsap.context(() => {
            const instance = new SplitText(el, { type: "words" });
            split = instance;

            gsap.set(instance.words, { opacity: 0, y: "0.6em" });

            gsap.to(instance.words, {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              delay,
              ease: "power3.out",
            });
          }, el);
        }
      );
    }

    return () => {
      ctx?.revert();
      split?.revert();
    };
  }, [scrollTrigger, duration, stagger, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}