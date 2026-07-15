"use client";

import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

type RevealVariant =
  | "text"
  | "cta"
  | "up";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
} & Omit<
  ComponentPropsWithoutRef<T>,
  | "as"
  | "children"
  | "className"
>;

const variantStyles = {
  text: {
    hidden: {
      opacity: 0,
      y: 26,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },

 cta: {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
},

  up: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
} as const;

export function Reveal<
  T extends ElementType = "div",
>({
  as,
  children,
  variant = "up",
  delay = 0,
  duration = 0.75,
  once = true,
  amount = 0.25,
  className = "",
  ...props
}: RevealProps<T>) {
  const reduceMotion = useReducedMotion();

  const Component =
    motion.create(as ?? "div");

  const selectedVariant =
    variantStyles[variant];

  return (
    <Component
      initial={
        reduceMotion
          ? false
          : selectedVariant.hidden
      }
      whileInView={
        reduceMotion
          ? undefined
          : selectedVariant.visible
      }
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}