"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

const looseSnail = {
  name: "Lumache sfuse al kg",
  price: "15,00 € / kg",
  image: "/images/products/13.png",
};

const jarProducts = [
  {
    name: "Lumache al naturale",
    price: "9,90 €",
    image: "/images/products/1.png",
  },
  {
    name: "Lumache al pomodoro",
    price: "10,90 €",
    image: "/images/products/2.png",
  },
  {
    name: "Lumache alle erbe aromatiche",
    price: "11,50 €",
    image: "/images/products/3.png",
  },
  {
    name: "Lumache in salsa piccante",
    price: "11,90 €",
    image: "/images/products/4.png",
  },
  {
    name: "Lumache al vino bianco",
    price: "12,50 €",
    image: "/images/products/5.png",
  },
  {
    name: "Lumache tradizionali contadine",
    price: "9,50 €",
    image: "/images/products/6.png",
  },
];

const creamProducts = [
  {
    name: "Crema viso rigenerante",
    price: "24,90 €",
    image: "/images/products/7.png",
  },
  {
    name: "Crema mani nutriente",
    price: "14,90 €",
    image: "/images/products/8.png",
  },
  {
    name: "Siero anti-età",
    price: "29,90 €",
    image: "/images/products/9.png",
  },
  {
    name: "Balsamo labbra",
    price: "8,90 €",
    image: "/images/products/10.png",
  },
  {
    name: "Crema corpo idratante",
    price: "19,90 €",
    image: "/images/products/11.png",
  },
  {
    name: "Gel doposole lenitivo",
    price: "16,90 €",
    image: "/images/products/12.png",
  },
];

function ProductCard({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
      <div className="relative aspect-square w-full bg-[var(--soft-gray)]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 1024px) 45vw, 22vw"
          className="object-cover"
        />
      </div>
      <div className="border-t border-[var(--border)] bg-[#faf9f5] p-4 text-left">
        <p className="font-sans text-sm font-semibold text-[var(--foreground)]">
          {name}
        </p>
        <p className="mt-1 font-sans text-sm font-bold text-[var(--green)]">
          {price}
        </p>
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
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
      <span className="font-sans text-[15px] font-medium text-[var(--foreground)]">
        {text}
      </span>
    </div>
  );
}

function SingleProductSplit({
  eyebrow,
  title,
  text,
  checklist,
  product,
  reversed,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  checklist: string[];
  product: { name: string; price: string; image: string };
  reversed: boolean;
}) {
  return (
    <div
      className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{eyebrow}</p>

        <SplitTitle
          as="h3"
          className="heading-display mt-4 text-[2rem] leading-[1.2] text-[var(--green)] sm:text-[2.4rem] lg:text-[2.6rem]"
        >
          {title}
        </SplitTitle>

        <p className="body-large mt-5">{text}</p>

        <div className="mt-6 flex flex-col gap-3">
          {checklist.map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </div>

        <div className="mt-8">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-sm"
      >
        <ProductCard
          name={product.name}
          price={product.price}
          image={product.image}
        />
      </motion.div>
    </div>
  );
}

function ProductSplit({
  eyebrow,
  title,
  text,
  checklist,
  products,
  reversed,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  checklist: string[];
  products: { name: string; price: string; image: string }[];
  reversed: boolean;
}) {
  return (
    <div
      className={`grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="lg:sticky lg:top-48"
      >
        <p className="eyebrow">{eyebrow}</p>

        <SplitTitle
          as="h3"
          className="heading-display mt-4 text-[2rem] leading-[1.2] text-[var(--green)] sm:text-[2.4rem] lg:text-[2.6rem]"
        >
          {title}
        </SplitTitle>

        <p className="body-large mt-5">{text}</p>

        <div className="mt-6 flex flex-col gap-3">
          {checklist.map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </div>

        <div className="mt-8 hidden lg:block">
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

      <div>
        <div className="grid grid-cols-2 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.5 }}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:hidden">
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
      </div>
    </div>
  );
}

export function ProductsGrid() {
  return (
    <section id="prodotti" className="relative bg-[#faf9f5] py-20 lg:py-28">
      <Container className="relative flex flex-col gap-24 lg:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--green)]" />
            <p className="eyebrow">I nostri prodotti</p>
            <span className="h-px w-12 bg-[var(--green)]" />
          </div>

          <SplitTitle
            as="h2"
            className="heading-display text-[2.25rem] leading-[1.2] text-[var(--green)] sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Più gusto, più cura,{" "}
            <span className="italic text-[var(--red)]">più naturale</span>
          </SplitTitle>
        </motion.div>

        <SingleProductSplit
          eyebrow="Lumache sfuse"
          title={
            <>
              <span className="italic text-[var(--red)]">Materia prima</span>,
              pesata al momento
            </>
          }
          text="Per chi preferisce partire dalla lumaca viva o cruda e cucinarla secondo la propria ricetta. Vendute sfuse, pesate al momento, sempre fresche."
          checklist={[
            "Peso personalizzato su richiesta",
            "Selezionate a mano",
            "Sempre fresche del giorno",
          ]}
          product={looseSnail}
          reversed={false}
        />

        <ProductSplit
          eyebrow="Lumache in vasetto"
          title={
            <>
              <span className="italic text-[var(--red)]">
                Pronte da gustare
              </span>
              , direttamente dal vasetto
            </>
          }
          text="Lumache già lavorate e conservate secondo la tradizione, pronte da scaldare e servire. Ogni vasetto racchiude una ricetta diversa, dalla preparazione al naturale alle versioni più saporite."
          checklist={[
            "Ricette diverse per ogni gusto",
            "Pronte in pochi minuti",
            "Nessun conservante aggiunto",
          ]}
          products={jarProducts}
          reversed={true}
        />

        <ProductSplit
          eyebrow="Cosmetici alla bava"
          title={
            <>
              <span className="italic text-[var(--red)]">
                La cura della pelle
              </span>
              , un vasetto alla volta
            </>
          }
          text="Creme e trattamenti naturali alla bava di lumaca, formulati per il viso, il corpo e le mani. Un'unica materia prima attiva, senza passaggi industriali che ne riducano le proprietà."
          checklist={[
            "Bava raccolta con metodo cruelty-free",
            "Formulazioni naturali al 100%",
            "Adatte a tutti i tipi di pelle",
          ]}
          products={creamProducts}
          reversed={false}
        />
      </Container>
    </section>
  );
}