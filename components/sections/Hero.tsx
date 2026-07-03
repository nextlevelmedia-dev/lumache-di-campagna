"use client";

import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Leaf, Heart, MapPin, Rabbit, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";

const trustItems = [
  { icon: Leaf, title: "100% Naturale", text: "Senza OGM e additivi" },
  { icon: Heart, title: "Ricco di benefici", text: "Per te" },
  { icon: MapPin, title: "Prodotto italiano", text: "A km 0" },
  { icon: Rabbit, title: "Rispetto per gli animali", text: "E l'ambiente" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)]">
      <div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(circle_at_20%_20%,#ffffff_0,transparent_32%),radial-gradient(circle_at_80%_10%,#eeebe3_0,transparent_34%)]" />

      <Container className="relative pt-6 pb-16 sm:pt-8 lg:py-20">
        {/* Riga superiore: foto sopra su mobile, testo+foto affiancati da lg in su */}
        <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--green)]" />
              <p className="eyebrow">Eccellenza italiana</p>
            </div>

            <h1 className="heading-display max-w-2xl text-[2.7rem] leading-[1.2] text-[var(--green)] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.2rem] xl:text-[4.2rem]">
  <span className="italic text-[var(--red)]">Vivi meglio</span> ogni giorno con i{" "}
  <span className="italic text-[var(--red)]">benefici naturali</span> della lumaca.
</h1>

            <div className="mt-9 flex flex-col gap-4">
              {[
                "Più benessere nella tua quotidianità",
                "Più gusto e qualità sulla tua tavola",
                "Più cura e bellezza per la tua pelle",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--green)]">
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

                  <span className="font-sans text-[17px] font-medium text-[var(--foreground)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute -left-8 top-12 z-20 hidden rounded-full border border-[var(--border)] bg-white/85 px-6 py-5 shadow-2xl backdrop-blur-xl md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green)] text-white">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
                    Qualità
                  </p>
                  <p className="font-serif text-2xl text-[var(--green)]">
                    Artigianale
                  </p>
                </div>
              </div>
            </div>

            <div className="relative ml-auto aspect-[3/2] w-full max-w-[650px] overflow-hidden rounded-[2.5rem] rounded-bl-[5rem] border border-white/70 bg-[var(--soft-gray)] shadow-2xl shadow-black/10 lg:aspect-[4/3] lg:rounded-[4rem] lg:rounded-bl-[10rem]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, rgba(23,63,43,.18), rgba(165,31,36,.05)), url('/images/hero/hero-snail.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/25 bg-white/15 p-4 text-white backdrop-blur-xl lg:bottom-8 lg:left-8 lg:right-8 lg:rounded-[2rem] lg:p-6">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] lg:text-xs lg:tracking-[0.28em]">
                  Dalla terra alla tavola
                </p>
                <p className="mt-2 font-serif text-lg leading-snug lg:mt-3 lg:text-4xl lg:leading-none">
                  Prodotti autentici, naturali e italiani.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Riga sotto: badge brand (senza box) + 4 trust box, 5 colonne totali */}
<div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-5">
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="col-span-2 flex flex-col items-center justify-center gap-3 text-center lg:col-span-1 lg:items-start lg:text-left"
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--green)] text-white shadow-lg shadow-green-950/15">
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

  {trustItems.map((item, index) => {
    const Icon = item.icon;

    return (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
        className="card-primary p-5"
      >
        <Icon className="mb-4 text-[var(--green)]" size={24} />
        <p className="font-sans text-sm font-bold uppercase tracking-[0.12em]">
          {item.title}
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">{item.text}</p>
      </motion.div>
    );
  })}
</div>
      </Container>
    </section>
  );
}