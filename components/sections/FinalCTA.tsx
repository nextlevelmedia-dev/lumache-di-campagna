"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

const valueProps = [
  "Filiera diretta, dalla terra alla tavola",
  "Zero additivi, zero intermediari",
  "Rispondiamo su WhatsApp in giornata",
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

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--green)] py-20 lg:py-28">
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_15%_15%,#ffffff_0,transparent_35%),radial-gradient(circle_at_85%_85%,#ffffff_0,transparent_35%)]" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
          >
            <motion.div
              variants={textItem}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-white/40" />
              <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-white/70">
                Pronto a provarci?
              </p>
            </motion.div>

            <motion.div variants={textItem}>
              <SplitTitle
                as="h2"
                scrollTrigger={true}
                className="heading-display text-[2.25rem] leading-[1.2] text-white sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                Il gusto autentico non aspetta
              </SplitTitle>
            </motion.div>

            <motion.p
              variants={textItem}
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/70"
            >
              Ogni giorno che passa è un giorno in più con prodotti generici
              sulla tavola. Scrivici ora: ti aiutiamo a scegliere i prodotti
              giusti per te, senza impegno.
            </motion.p>

            <motion.div
              variants={textItem}
              className="mt-8 flex flex-col gap-3"
            >
              {valueProps.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3.5 w-3.5 text-white"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 12.5l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[15px] text-white/80">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={buttonItem} className="mt-9">
              <Button
                href={whatsappLink(
                  "Ciao, vorrei ricevere informazioni sui prodotti di Lumache di Campagna."
                )}
                variant="secondary"
                className="gap-2"
              >
                <MessageCircle size={18} />
                Richiedi informazioni
              </Button>

              <div className="mt-4 flex items-center gap-2 text-[13px] text-white/50">
                <Clock size={14} />
                <span>Rispondiamo su WhatsApp in poche ore</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            variants={imageReveal}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl shadow-black/20"
          >
            <Image
              src="/images/piatto-1.png"
              alt="Prodotti Lumache di Campagna pronti da gustare"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}