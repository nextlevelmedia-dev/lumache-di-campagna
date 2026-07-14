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
    eyebrow: "Lumache vive",
    title: (
      <>
        <span className="italic text-[var(--red)]">
          Pronte per la tua cucina
        </span>
        , dal vivo alla pentola
      </>
    ),
    text: "Lumache vive selezionate a mano, spurgate secondo il metodo tradizionale e pronte per essere cucinate come preferisci — alla bourguignonne, in umido, alla griglia. Nessuna lavorazione industriale, solo la materia prima come dovrebbe essere.",
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
          Specialità già lavorate
        </span>
        , pronte da gustare
      </>
    ),
    text: "Per chi vuole il gusto autentico senza il tempo della preparazione: lumache già pulite, cotte e condite secondo ricette della tradizione contadina, pronte da scaldare e servire in tavola in pochi minuti.",
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
    text: "Bava di lumaca raccolta con metodo cruelty-free e trasformata in creme e trattamenti naturali per il viso e il corpo. Un unico ingrediente attivo, senza passaggi industriali che ne riducano le proprietà.",
    images: [
      "/images/crema-1.png",
      "/images/crema-2.png",
      "/images/crema-3.png",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMAZIONI                                                         */
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

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const textItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const buttonItem = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  HOOK: RIPETE SOLO SCORRENDO VERSO IL BASSO                         */
/* ------------------------------------------------------------------ */

type ScrollDownAnimation<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  controls: ReturnType<typeof useAnimationControls>;
};

function useRepeatOnScrollDown<
  T extends HTMLElement,
>(): ScrollDownAnimation<T> {
  const ref = useRef<T>(null);
  const controls = useAnimationControls();

  const previousScrollY = useRef(0);
  const readyToAnimate = useRef(true);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    previousScrollY.current = window.scrollY;

    const initialRect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

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

      const currentElement = ref.current;

      if (!currentElement) {
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollingDown =
        currentScrollY > previousScrollY.current;

      previousScrollY.current = currentScrollY;

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
      { passive: true },
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
  const { ref, controls } =
    useRepeatOnScrollDown<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      variants={textContainer}
      initial="hidden"
      animate={controls}
    >
      <motion.p
        variants={textItem}
        className="eyebrow"
      >
        {block.eyebrow}
      </motion.p>

      <motion.div variants={textItem}>
        <SplitTitle
          as="h3"
          className="heading-display mt-4 text-[2.1rem] leading-[1.35] text-[var(--green)] sm:text-[2.1rem] lg:text-[2.8rem]"
        >
          {block.title}
        </SplitTitle>
      </motion.div>

      <motion.p
        variants={textItem}
        className="body-large mt-5"
      >
        {block.text}
      </motion.p>

      <motion.div
        variants={buttonItem}
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
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SEZIONE                                                            */
/* ------------------------------------------------------------------ */

export function BenefitsShowcase() {
  return (
    <section className="relative bg-[var(--background)] py-20 lg:py-28">
      <Container className="relative flex flex-col gap-20 lg:gap-28">
        {blocks.map((block, index) => {
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

              <BenefitText block={block} />
            </div>
          );
        })}
      </Container>
    </section>
  );
}