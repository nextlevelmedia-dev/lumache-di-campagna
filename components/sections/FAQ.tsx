"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

const faqs = [
  {
    question: "Come vengono allevate le lumache?",
    answer:
      "Le lumache crescono in azienda agricola seguendo il loro ciclo naturale, senza forzature né allevamento intensivo. Rispettiamo i tempi biologici dell'animale dalla nascita fino alla raccolta.",
  },
  {
    question: "I prodotti contengono conservanti o additivi?",
    answer:
      "No. Lavoriamo tutto internamente e non aggiungiamo conservanti se non quelli strettamente necessari per la sicurezza alimentare secondo normativa. Nessun ingrediente aggiunto solo per prolungare la conservazione.",
  },
  {
    question: "Come posso ordinare i prodotti?",
    answer:
      "Puoi scriverci direttamente su WhatsApp tramite il pulsante \"Richiedi informazioni\" presente in tutto il sito: ti aiutiamo a scegliere i prodotti giusti e organizziamo la consegna o il ritiro.",
  },
  {
    question: "I cosmetici alla bava di lumaca sono testati su animali?",
    answer:
      "No, la bava viene raccolta con metodo cruelty-free, senza alcun danno per l'animale, che torna al proprio habitat naturale dopo la raccolta.",
  },
  {
    question: "Le lumache vive si possono acquistare tutto l'anno?",
    answer:
      "La disponibilità segue la stagionalità naturale dell'allevamento. Scrivici per sapere cosa abbiamo disponibile al momento e concordare quantità e ritiro.",
  },
  {
    question: "Fate spedizioni o solo vendita diretta in azienda?",
    answer:
      "Offriamo entrambe le opzioni a seconda del prodotto e della zona. Contattaci per verificare la disponibilità della spedizione nella tua zona.",
  },
];

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const buttonItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.3 },
  },
};

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div variants={itemVariant} className="border-b border-[var(--border)]">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-sans text-base font-semibold text-[var(--foreground)] sm:text-lg">
          {question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--soft-gray)] text-[var(--green)] transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <Plus size={16} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 text-[15px] leading-relaxed text-[var(--muted)]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[#faf9f5] py-20 lg:py-28">
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
            <p className="eyebrow">Domande frequenti</p>
            <span className="h-px w-12 bg-[var(--green)]" />
          </div>

          <SplitTitle
            as="h2"
            className="heading-display text-[2.25rem] leading-[1.2] text-[var(--green)] sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Tutto quello che vuoi sapere
          </SplitTitle>
        </motion.div>

        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          className="mx-auto mt-14 max-w-2xl lg:mt-16"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>

        <motion.div
          variants={buttonItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          className="mt-12 flex justify-center lg:mt-16"
        >
          <Button
            href={whatsappLink(
              "Ciao, ho una domanda sui prodotti di Lumache di Campagna."
            )}
            className="gap-2 shadow-xl shadow-green-950/10"
          >
            <MessageCircle size={18} />
            Scrivici su WhatsApp
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}