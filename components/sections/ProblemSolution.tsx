"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";

export function ProblemSolution() {
  return (
    <section className="relative border-b border-[var(--border)] bg-[#faf9f5] py-20 lg:py-28">
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--green)]" />
            <p className="eyebrow">Il problema</p>
            <span className="h-px w-12 bg-[var(--green)]" />
          </div>

          <h2 className="heading-display text-[2.25rem] leading-[1.2] text-[var(--green)] sm:text-[2.75rem] lg:text-[3.25rem]">
            Stanco di prodotti generici,{" "}
            <span className="italic text-[var(--red)]">senza origine</span> e
            pieni di ingredienti che non conosci?
          </h2>

          <p className="body-large mx-auto mt-7 max-w-2xl">
            La maggior parte delle lumache in commercio arriva da filiere lunghe
            e poco trasparenti: allevamenti intensivi, lavorazioni industriali,
            ingredienti aggiunti solo per prolungare la conservazione. Noi
            alleviamo, lavoriamo e confezioniamo tutto direttamente in azienda —
            dalla terra alla tavola, senza intermediari e senza compromessi.
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              href={whatsappLink(
                "Ciao, vorrei ricevere informazioni sui prodotti di Lumache di Campagna."
              )}
              className="gap-2 shadow-xl shadow-green-950/10"
            >
              <MessageCircle size={18} />
              Richiedi informazioni
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}