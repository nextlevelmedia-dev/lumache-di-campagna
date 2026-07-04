"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 },
  },
};

const buttonItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.35 },
  },
};

export function ProblemSolution() {
  return (
    <section className="relative border-b border-[var(--border)] bg-[#faf9f5] py-20 lg:py-28">
      <Container className="relative">
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={textItem}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 bg-[var(--green)]" />
            <p className="eyebrow">Il problema</p>
            <span className="h-px w-12 bg-[var(--green)]" />
          </motion.div>

          <motion.div variants={textItem}>
            <SplitTitle
              as="h2"
              className="heading-display text-[2.25rem] leading-[1.2] text-[var(--green)] sm:text-[2.75rem] lg:text-[3.25rem]"
            >
              Stanco di prodotti generici,{" "}
              <span className="italic text-[var(--red)]">senza origine</span> e
              pieni di ingredienti che non conosci?
            </SplitTitle>
          </motion.div>

          <motion.p variants={textItem} className="body-large mx-auto mt-7 max-w-2xl">
            La maggior parte delle lumache in commercio arriva da filiere lunghe
            e poco trasparenti: allevamenti intensivi, lavorazioni industriali,
            ingredienti aggiunti solo per prolungare la conservazione. Noi
            alleviamo, lavoriamo e confezioniamo tutto direttamente in azienda —
            dalla terra alla tavola, senza intermediari e senza compromessi.
          </motion.p>

          <motion.div variants={buttonItem} className="mt-10 flex justify-center">
            <Button
              href={whatsappLink(
                "Ciao, vorrei ricevere informazioni sui prodotti di Lumache di Campagna."
              )}
              className="gap-2 shadow-xl shadow-green-950/10"
            >
              <MessageCircle size={18} />
              Richiedi informazioni
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}