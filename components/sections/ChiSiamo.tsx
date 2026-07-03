"use client";

import Image from "next/image";
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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.35 },
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
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ChiSiamo() {
  return (
    <section
      id="storia"
      className="relative overflow-hidden bg-[var(--green)] py-20 lg:py-28"
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_15%_15%,#ffffff_0,transparent_35%),radial-gradient(circle_at_85%_85%,#ffffff_0,transparent_35%)]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/40" />
            <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-white/70">
              La nostra storia
            </p>
            <span className="h-px w-12 bg-white/40" />
          </div>

          <SplitTitle
            as="h2"
            className="heading-display text-[2.25rem] leading-[1.2] text-white sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Chi siamo
          </SplitTitle>
        </motion.div>

        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
          >
            <motion.h3
              variants={textItem}
              className="heading-display text-[1.75rem] leading-[1.25] text-white sm:text-[2.1rem] lg:text-[2.4rem]"
            >
              Una famiglia, un'azienda agricola,{" "}
              <span className="italic text-[var(--red)]">una passione</span>
            </motion.h3>

            <motion.p
              variants={textItem}
              className="mt-6 text-[17px] leading-relaxed text-white/70"
            >
              Azienda Agricola Doninelli nasce dalla passione per la terra e
              per un metodo di lavoro che oggi è sempre più raro: fare tutto
              internamente, senza intermediari, senza fretta. Alleviamo
              lumache seguendo i loro tempi naturali e le trasformiamo con le
              nostre mani, dalla raccolta al vasetto che arriva sulla tua
              tavola.
            </motion.p>

            <motion.p
              variants={textItem}
              className="mt-4 text-[17px] leading-relaxed text-white/70"
            >
              Non siamo un'azienda industriale. Siamo una famiglia che ha
              scelto di fare le cose come si facevano una volta, con la
              qualità e la trasparenza che meritano chi lavora la terra e chi
              porta i nostri prodotti in tavola.
            </motion.p>

            <motion.div variants={buttonItem} className="mt-8">
              <Button
                href={whatsappLink(
                  "Ciao, vorrei sapere di più sulla storia di Lumache di Campagna."
                )}
                variant="secondary"
                className="gap-2"
              >
                <MessageCircle size={18} />
                Richiedi informazioni
              </Button>
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
              src="/images/lumache-sfuse-3.png"
              alt="La famiglia dietro Lumache di Campagna"
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