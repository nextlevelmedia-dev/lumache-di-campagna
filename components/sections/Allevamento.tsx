"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

const steps = [
  {
    number: "01",
    eyebrow: "Allevamento",
    title: (
      <>
        <span className="italic text-[var(--red)]">Ciclo naturale</span>, nel
        rispetto dei tempi della lumaca
      </>
    ),
    text: "Le lumache crescono in azienda agricola seguendo il loro ritmo biologico, senza forzature. Nessun allevamento intensivo, solo il tempo necessario perché la materia prima sia quella giusta.",
    image: "/images/ciclo-naturale.png",
  },
  {
    number: "02",
    eyebrow: "Raccolta e lavorazione",
    title: (
      <>
        <span className="italic text-[var(--red)]">Selezionate a mano</span>,
        lavorate in azienda
      </>
    ),
    text: "Ogni lumaca viene raccolta e selezionata a mano. La lavorazione — pulitura, cottura, confezionamento — avviene tutta internamente, senza passare da terzi.",
    image: "/images/selezione-lumache.png",
  },
  {
    number: "03",
    eyebrow: "Dalla terra alla tavola",
    title: (
      <>
        <span className="italic text-[var(--red)]">Nessun intermediario</span>,
        dal campo al vasetto
      </>
    ),
    text: "Il prodotto finito esce dalla nostra azienda pronto per arrivare da te — stessa filiera, stessa tracciabilità, dall'allevamento al tuo tavolo.",
    image: "/images/sulla-tavola.png",
  },
];

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const buttonItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.35 },
  },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.06,
    y: 30,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const dotReveal = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Allevamento() {
  return (
    <section
      id="allevamento"
      className="relative bg-[var(--background)] py-20 lg:py-28"
    >
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--green)]" />
            <p className="eyebrow">Come lavoriamo</p>
            <span className="h-px w-12 bg-[var(--green)]" />
          </div>

          <SplitTitle
            as="h2"
            className="heading-display text-[2.25rem] leading-[1.2] text-[var(--green)] sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Dalla terra alla tavola,{" "}
            <span className="italic text-[var(--red)]">passo dopo passo</span>
          </SplitTitle>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20 lg:mt-28">
          <div className="absolute left-6 top-0 h-full w-px bg-[var(--border)] lg:left-1/2 lg:-translate-x-1/2" />

          <div className="flex flex-col gap-20 lg:gap-28">
            {steps.map((step, index) => {
              const isReversed = index % 2 === 1;

              return (
                <div key={step.number} className="relative">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0 }}
                    variants={dotReveal}
                    className="absolute left-6 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[var(--background)] bg-[var(--green)] font-serif text-lg text-white shadow-lg shadow-green-950/15 lg:left-1/2"
                  >
                    {step.number}
                  </motion.div>

                  <div
                    className={`grid items-center gap-10 pl-16 lg:grid-cols-2 lg:gap-16 lg:pl-0 ${
                      isReversed ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <motion.div
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0 }}
                      variants={imageReveal}
                      className={`relative aspect-[16/8] w-full overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--soft-gray)] shadow-lg shadow-black/5 ${
                        isReversed ? "lg:pl-10" : "lg:pr-10"
                      }`}
                    >
                      <Image
                        src={step.image}
                        alt={step.eyebrow}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </motion.div>

                    <motion.div
                      variants={textContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0 }}
                      className={isReversed ? "lg:pr-10" : "lg:pl-10"}
                    >
                      <motion.p variants={textItem} className="eyebrow">
                        {step.eyebrow}
                      </motion.p>

                      <motion.div variants={textItem}>
                        <SplitTitle
                          as="h3"
                          className="heading-display mt-4 text-[1.75rem] leading-[1.25] text-[var(--green)] sm:text-[2.1rem] lg:text-[2.4rem]"
                        >
                          {step.title}
                        </SplitTitle>
                      </motion.div>

                      <motion.p variants={textItem} className="body-large mt-5">
                        {step.text}
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          variants={buttonItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          className="mt-20 flex justify-center lg:mt-28"
        >
          <Button
            href={whatsappLink(
              "Ciao, vorrei sapere di più sul metodo di allevamento di Lumache di Campagna."
            )}
            className="gap-2 shadow-xl shadow-green-950/10"
          >
            <MessageCircle size={18} />
            Richiedi informazioni
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}