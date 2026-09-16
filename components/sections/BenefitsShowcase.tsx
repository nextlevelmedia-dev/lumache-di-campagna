"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
} from "motion/react";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

/* ------------------------------------------------------------------ */
/*  DATI                                                               */
/* ------------------------------------------------------------------ */

type BenefitBlock = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  images: [string, string, string];
};

const blocks: BenefitBlock[] = [
  {
    eyebrow: "Lumache sfuse",
    title: (
      <>
        <span className="italic text-[var(--red)]">
          Dal nostro allevamento
        </span>
        , alla tua cucina
      </>
    ),
    text: "Le nostre lumache vengono allevate con cura e selezionate prima della vendita. Disponibili sfuse e pesate al momento, sono pensate per chi ama partire dalla materia prima e prepararle secondo la propria ricetta, riscoprendo sapori e gesti della cucina tradizionale.",
    images: [
      "/images/lumache-sfuse-1.png",
      "/images/lumache-sfuse-2.png",
      "/images/lumache-sfuse-3.png",
    ],
  },
  {
    eyebrow: "Prodotti gastronomici",
    title: (
      <>
        <span className="italic text-[var(--red)]">
          Ricette pronte da gustare
        </span>
        , per ogni occasione
      </>
    ),
    text: "Dalla semplicità delle lumache al naturale alle ricette più ricche e saporite: i nostri vasetti nascono per valorizzare il gusto delle lumache attraverso abbinamenti diversi. Pratici e versatili, bastano pochi minuti per portarli in tavola e scoprire ogni volta un sapore nuovo.",
    images: [
      "/images/piatto-1.png",
      "/images/piatto-2.png",
      "/images/piatto-3.png",
    ],
  },
  {
    eyebrow: "Cosmetici alla bava",
    title: (
      <>
        <span className="italic text-[var(--red)]">
          La cura della pelle
        </span>
        , dalla natura al vasetto
      </>
    ),
    text: "La bava di lumaca diventa protagonista di una linea cosmetica dedicata alla cura quotidiana della pelle. Creme e trattamenti per viso, mani e corpo pensati per unire il mondo del nostro allevamento a un modo semplice e naturale di prendersi cura di sé.",
    images: [
      "/images/crema-1.png",
      "/images/crema-2.png",
      "/images/crema-3.png",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMAZIONI COLLAGE                                                 */
/* ------------------------------------------------------------------ */

const collageContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const collageItem = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    clipPath: "inset(100% 0% 0% 0%)",
  },

  show: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  HOOK: RIPETE SOLO SCORRENDO VERSO IL BASSO                         */
/* ------------------------------------------------------------------ */

type ScrollDownAnimation<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  controls: ReturnType<
    typeof useAnimationControls
  >;
};

function useRepeatOnScrollDown<
  T extends HTMLElement,
>(): ScrollDownAnimation<T> {
  const ref = useRef<T>(null);

  const controls =
    useAnimationControls();

  const previousScrollY =
    useRef(0);

  const readyToAnimate =
    useRef(true);

  const frameId =
    useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    previousScrollY.current =
      window.scrollY;

    const initialRect =
      element.getBoundingClientRect();

    const viewportHeight =
      window.innerHeight;

    const isInitiallyVisible =
      initialRect.top < viewportHeight &&
      initialRect.bottom > 0;

    const isAlreadyAboveViewport =
      initialRect.bottom <= 0;

    if (
      isInitiallyVisible ||
      isAlreadyAboveViewport
    ) {
      controls.set("show");
      readyToAnimate.current = false;
    } else {
      controls.set("hidden");
      readyToAnimate.current = true;
    }

    const updateAnimation = () => {
      frameId.current = null;

      const currentElement =
        ref.current;

      if (!currentElement) {
        return;
      }

      const currentScrollY =
        window.scrollY;

      const scrollingDown =
        currentScrollY >
        previousScrollY.current;

      previousScrollY.current =
        currentScrollY;

      const rect =
        currentElement.getBoundingClientRect();

      const currentViewportHeight =
        window.innerHeight;

      /*
       * L’animazione parte quando il blocco entra
       * nell’85% inferiore della viewport.
       */
      const hasEnteredViewport =
        rect.top <
          currentViewportHeight * 0.85 &&
        rect.bottom > 0;

      /*
       * Il blocco è completamente sotto lo schermo:
       * l’utente è risalito oltre tutta la sezione.
       */
      const isCompletelyBelowViewport =
        rect.top >= currentViewportHeight;

      if (scrollingDown) {
        if (
          hasEnteredViewport &&
          readyToAnimate.current
        ) {
          void controls.start("show");
          readyToAnimate.current = false;
        }

        return;
      }

      /*
       * Durante la risalita il contenuto rimane visibile.
       */
      if (!isCompletelyBelowViewport) {
        controls.set("show");
      }

      /*
       * Solo quando il blocco è completamente sotto
       * lo schermo viene nascosto e preparato
       * per la discesa successiva.
       */
      if (isCompletelyBelowViewport) {
        controls.set("hidden");
        readyToAnimate.current = true;
      }
    };

    const handleScroll = () => {
      if (frameId.current !== null) {
        return;
      }

      frameId.current =
        window.requestAnimationFrame(
          updateAnimation,
        );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (frameId.current !== null) {
        window.cancelAnimationFrame(
          frameId.current,
        );
      }
    };
  }, [controls]);

  return {
    ref,
    controls,
  };
}

/* ------------------------------------------------------------------ */
/*  COLLAGE                                                            */
/* ------------------------------------------------------------------ */

type ImageCollageProps = {
  images: [string, string, string];
  alt: string;
};

function ImageCollage({
  images,
  alt,
}: ImageCollageProps) {
  const { ref, controls } =
    useRepeatOnScrollDown<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      variants={collageContainer}
      initial="hidden"
      animate={controls}
      className="grid h-[280px] grid-cols-2 grid-rows-2 gap-4 sm:h-[320px]"
    >
      <motion.div
        variants={collageItem}
        className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--soft-gray)] shadow-lg shadow-black/5"
      >
        <Image
          src={images[0]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        variants={collageItem}
        className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--soft-gray)] shadow-lg shadow-black/5"
      >
        <Image
          src={images[1]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 25vw, 12vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        variants={collageItem}
        className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--soft-gray)] shadow-lg shadow-black/5"
      >
        <Image
          src={images[2]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 25vw, 12vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTO                                                              */
/* ------------------------------------------------------------------ */

type BenefitTextProps = {
  block: BenefitBlock;
};

function BenefitText({
  block,
}: BenefitTextProps) {
  return (
    <div>
      {/* Eyebrow */}
      <Reveal
        variant="up"
        delay={0}
        duration={0.65}
      >
        <p className="eyebrow">
          {block.eyebrow}
        </p>
      </Reveal>

      {/* Titolo */}
      <SplitTitle
        as="h3"
        duration={1.1}
        stagger={0.055}
        className="heading-display mt-4 text-[2.1rem] leading-[1.35] text-[var(--green)] sm:text-[2.1rem] lg:text-[2.8rem]"
      >
        {block.title}
      </SplitTitle>

      {/* Paragrafo */}
      <Reveal
        as="p"
        variant="text"
        delay={0.45}
        duration={0.8}
        className="body-large mt-5"
      >
        {block.text}
      </Reveal>

      {/* CTA */}
      <Reveal
        variant="cta"
        delay={0.82}
        duration={0.7}
        className="mt-8"
      >
        <Button
          href={whatsappLink(
            "Ciao, vorrei ricevere informazioni sui prodotti di Lumache di Campagna.",
          )}
          className="gap-2 shadow-xl shadow-green-950/10"
        >
          <MessageCircle size={18} />
          Richiedi informazioni
        </Button>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SEZIONE                                                            */
/* ------------------------------------------------------------------ */

export function BenefitsShowcase() {
  return (
    <section className="relative bg-[var(--background)] py-20 lg:py-28">
      <Container className="relative flex flex-col gap-20 lg:gap-28">
        {blocks.map(
          (block, index) => {
            const isReversed =
              index % 2 === 1;

            return (
              <div
                key={block.eyebrow}
                className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
                  isReversed
                    ? "lg:[&>*:first-child]:order-2"
                    : ""
                }`}
              >
                <ImageCollage
                  images={block.images}
                  alt={block.eyebrow}
                />

                <BenefitText
                  block={block}
                />
              </div>
            );
          },
        )}
      </Container>
    </section>
  );
}