"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Route,
  Sprout,
  Hand,
  ShieldCheck,
  Ban,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const differentiators = [
  {
    icon: Route,
    title: "Filiera diretta",
    text: "Alleviamo, lavoriamo e confezioniamo tutto internamente. Dalla terra alla tavola, senza intermediari.",
  },
  {
    icon: Sprout,
    title: "Allevamento italiano",
    text: "Ciclo di crescita naturale in azienda agricola, nel rispetto dei tempi biologici della lumaca.",
  },
  {
    icon: Hand,
    title: "Lavorazione artigianale",
    text: "Nessuna catena industriale: ogni fase, dalla raccolta al confezionamento, è seguita a mano.",
  },
  {
    icon: ShieldCheck,
    title: "Tracciabilità completa",
    text: "Sappiamo sempre da dove viene ogni singolo prodotto, dall'allevamento fino al tuo tavolo.",
  },
  {
    icon: Ban,
    title: "Zero additivi",
    text: "Nessun conservante o ingrediente aggiunto solo per prolungare la conservazione.",
  },
  {
    icon: Heart,
    title: "Metodo cruelty-free",
    text: "La bava di lumaca viene raccolta con tecniche che rispettano il benessere dell'animale.",
  },
];

export function Differentiators() {
  return (
    <section className="relative overflow-hidden bg-[var(--green)] py-20 lg:py-28">
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_15%_15%,#ffffff_0,transparent_35%),radial-gradient(circle_at_85%_85%,#ffffff_0,transparent_35%)]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/40" />
            <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-white/70">
              Perché sceglierci
            </p>
            <span className="h-px w-12 bg-white/40" />
          </div>

          <h2 className="heading-display text-[2.25rem] leading-[1.2] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            Cosa ci rende{" "}
            <span className="italic text-[var(--red)]">diversi</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {differentiators.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="card-dark p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Icon className="text-white" size={22} />
                </div>

                <h3 className="mt-5 font-sans text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex justify-center lg:mt-16"
        >
          <Button href="#prodotti" variant="secondary" className="gap-2">
            Richiedi informazioni
            <ArrowRight size={17} />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}