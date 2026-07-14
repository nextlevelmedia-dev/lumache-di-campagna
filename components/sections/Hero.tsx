"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Leaf,
  Heart,
  MapPin,
  Rabbit,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

/* ------------------------------------------------------------------ */
/*  SLIDES — per ora stessa foto, testi diversi per vedere il cambio   */
/*  Sostituisci src quando hai le immagini definitive.                 */
/* ------------------------------------------------------------------ */

const slides = [
  {
    src: "/images/hero/hero-snail.jpg",
    alt: "Lumache di Campagna",
    topEyebrow: "Qualità",
    topTitle: "Artigianale",
    bottomEyebrow: "Dalla terra alla tavola",
    bottomTitle: "Prodotti autentici, naturali e italiani.",
  },
  {
    src: "/images/hero/hero-snail.jpg",
    alt: "Allevamento naturale",
    topEyebrow: "Allevamento",
    topTitle: "All'aperto",
    bottomEyebrow: "Rispetto dei tempi",
    bottomTitle: "Crescita lenta e naturale, come vuole la terra.",
  },
  {
    src: "/images/hero/hero-snail.jpg",
    alt: "Cura della bava",
    topEyebrow: "Cosmesi",
    topTitle: "Bava pura",
    bottomEyebrow: "Benessere della pelle",
    bottomTitle: "Estratti puri per la tua cura quotidiana.",
  },
];

const SLIDE_MS = 4000;

const trustItems = [
  { icon: Leaf, title: "100% Naturale", text: "Senza OGM e additivi" },
  { icon: Heart, title: "Ricco di benefici", text: "Per te" },
  { icon: MapPin, title: "Prodotto italiano", text: "A km 0" },
  { icon: Rabbit, title: "Rispetto per gli animali", text: "E l'ambiente" },
];

const checksContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
};

const checkItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const buttonsRow = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 1.2 },
  },
};

const badgeShine = {
  hidden: { opacity: 0, y: 18, scale: 0.92, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: [0.92, 1.06, 1],
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 },
  },
};

const boxesContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const boxFadeRight = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ElegantCheck() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-8 w-8 shrink-0 overflow-visible text-[var(--green)]"
      aria-hidden="true"
    >
      <path
        d="M 5 25 C 9 27, 14 32, 18.5 39 C 22 30, 27 21, 33 14 C 36.5 10, 40.5 6.5, 44 4"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO SLIDER                                                        */
/* ------------------------------------------------------------------ */

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (reduce) return;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
  }, [reduce]);

  useEffect(() => {
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [start]);

  const goTo = (i: number) => {
    setIndex(i);
    start(); // riavvia il timer dopo un click
  };

  const slide = slides[index];

  return (
    <div className="relative order-1 lg:order-2">
      {/* --- BADGE FLOATING (alto sinistra), testo per-slide --- */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 top-12 z-20 hidden rounded-full border border-[var(--border)] bg-white/85 px-6 py-5 shadow-2xl backdrop-blur-xl md:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-white">
            <Sparkles size={20} />
          </div>
          <div className="min-w-[7rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
                  {slide.topEyebrow}
                </p>
                <p className="font-serif text-2xl text-[var(--green)]">
                  {slide.topTitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* --- CORNICE + SLIDER --- */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
        className="relative ml-auto aspect-[3/2] w-full max-w-[650px] overflow-hidden rounded-[2.5rem] rounded-bl-[5rem] border border-white/70 bg-[var(--soft-gray)] shadow-2xl shadow-black/10 lg:aspect-[4/3] lg:rounded-[4rem] lg:rounded-bl-[10rem]"
      >
        {/* immagini: monto una slide alla volta, parallax in entrata/uscita */}
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: reduce ? 0 : "6%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: reduce ? 0 : "-6%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Ken Burns: zoom + pan lento continuo */}
            <motion.div
              initial={{ scale: 1.08, x: "0%" }}
              animate={reduce ? { scale: 1 } : { scale: 1.2, x: "-2.5%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(23,63,43,.18),rgba(165,31,36,.05))]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
          </motion.div>
        </AnimatePresence>

        {/* --- CAPTION FLOATING (basso), testo per-slide --- */}
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8">
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="rounded-2xl border border-white/25 bg-white/15 p-4 text-white backdrop-blur-xl lg:rounded-[2rem] lg:p-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] lg:text-xs lg:tracking-[0.28em]">
                  {slide.bottomEyebrow}
                </p>
                <p className="mt-2 font-serif text-lg leading-snug lg:mt-3 lg:text-4xl lg:leading-none">
                  {slide.bottomTitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- DOTS --- */}
        <div className="absolute right-5 top-5 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Vai alla slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)]">
      <div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(circle_at_20%_20%,#ffffff_0,transparent_32%),radial-gradient(circle_at_80%_10%,#eeebe3_0,transparent_34%)]" />

      <Container className="relative pt-6 pb-16 sm:pt-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* ---- COLONNA SINISTRA (invariata) ---- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="order-2 lg:order-1"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--green)]" />
              <p className="eyebrow">Eccellenza italiana</p>
            </div>

            <SplitTitle
              as="h1"
              scrollTrigger={false}
              delay={0.1}
              className="heading-display max-w-2xl text-[2.7rem] leading-[1.2] text-[var(--green)] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.2rem] xl:text-[4.2rem]"
            >
              <span className="italic text-[var(--red)]">Vivi meglio</span> ogni
              giorno con i{" "}
              <span className="italic text-[var(--red)]">benefici naturali</span>{" "}
              della lumaca.
            </SplitTitle>

            <motion.div
              variants={checksContainer}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-col gap-4"
            >
              {[
                "Più benessere nella tua quotidianità",
                "Più gusto e qualità sulla tua tavola",
                "Più cura e bellezza per la tua pelle",
              ].map((item) => (
                <motion.div key={item} variants={checkItem} className="flex items-center gap-4">
                  <ElegantCheck />
                  <span className="font-sans text-[17px] font-medium text-[var(--foreground)]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={buttonsRow}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                href={whatsappLink(
                  "Ciao, vorrei ricevere informazioni sui prodotti di Lumache di Campagna."
                )}
                className="gap-2 shadow-xl shadow-green-950/10"
              >
                <MessageCircle size={18} />
                Richiedi informazioni
              </Button>

              <Button href="#prodotti" variant="secondary" className="gap-2">
                Scopri i prodotti
                <ArrowRight size={17} />
              </Button>
            </motion.div>
          </motion.div>

          {/* ---- COLONNA DESTRA: SLIDER ---- */}
          <HeroSlider />
        </div>

        {/* ---- BADGE + BOX (invariati) ---- */}
        <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-5">
          <motion.div
            variants={badgeShine}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="col-span-2 flex flex-col items-center justify-center gap-3 text-center lg:col-span-1 lg:items-start lg:text-left"
          >
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[var(--green)] text-white shadow-lg shadow-green-950/15">
              <span className="badge-shine absolute inset-y-0 w-5 rotate-12 bg-white/45 blur-sm" />
              <Sparkles size={22} />
            </div>
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
                Qualità certificata
              </p>
              <p className="font-serif text-xl text-[var(--green)]">
                Azienda Agricola Doninelli
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={boxesContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            className="col-span-2 grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-4 lg:gap-5"
          >
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={boxFadeRight} className="card-primary p-5">
                  <Icon className="mb-4 text-[var(--green)]" size={24} />
                  <p className="font-sans text-sm font-bold uppercase tracking-[0.12em]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}