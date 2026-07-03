"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";

const jarProducts = [
  {
    name: "Lumache al naturale",
    price: "9,90 €",
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lumache al pomodoro",
    price: "10,90 €",
    image:
      "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lumache alle erbe aromatiche",
    price: "11,50 €",
    image:
      "https://images.unsplash.com/photo-1715018890921-30c621ced2a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lumache in salsa piccante",
    price: "11,90 €",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lumache al vino bianco",
    price: "12,50 €",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lumache tradizionali contadine",
    price: "9,50 €",
    image:
      "https://images.unsplash.com/photo-1567161291513-d8d58620c5ca?auto=format&fit=crop&w=600&q=80",
  },
];

const creamProducts = [
  {
    name: "Crema viso rigenerante",
    price: "24,90 €",
    image:
      "https://images.unsplash.com/photo-1737100917895-eee7006cdbbb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Crema mani nutriente",
    price: "14,90 €",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Siero anti-età",
    price: "29,90 €",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Balsamo labbra",
    price: "8,90 €",
    image:
      "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Crema corpo idratante",
    price: "19,90 €",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Gel doposole lenitivo",
    price: "16,90 €",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80",
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
      <div className="p-4 text-left">
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

function ProductSplit({
  eyebrow,
  title,
  text,
  checklist,
  products,
  reversed,
}: {
  eyebrow: string;
  title: string;
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
        className="lg:sticky lg:top-32"
      >
        <p className="eyebrow">{eyebrow}</p>

        <h3 className="heading-display mt-4 text-[2rem] leading-[1.2] text-[var(--green)] sm:text-[2.4rem] lg:text-[2.6rem]">
          {title}
        </h3>

        <p className="body-large mt-5">{text}</p>

        <div className="mt-6 flex flex-col gap-3">
          {checklist.map((item) => (
            <CheckItem key={item} text={item} />
          ))}
        </div>

        <Button
          href={whatsappLink(
            "Ciao, vorrei ricevere informazioni sui prodotti di Lumache di Campagna."
          )}
          className="mt-8 gap-2 shadow-xl shadow-green-950/10"
        >
          <MessageCircle size={18} />
          Richiedi informazioni
        </Button>
      </motion.div>

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
    </div>
  );
}

export function ProductsGrid() {
  return (
    <section
      id="prodotti"
      className="relative bg-[var(--background)] py-20 lg:py-28"
    >
      <Container className="relative flex flex-col gap-24 lg:gap-32">
        <ProductSplit
          eyebrow="Lumache in vasetto"
          title="Pronte da gustare, direttamente dal vasetto"
          text="Lumache già lavorate e conservate secondo la tradizione, pronte da scaldare e servire. Ogni vasetto racchiude una ricetta diversa, dalla preparazione al naturale alle versioni più saporite."
          checklist={[
            "Ricette diverse per ogni gusto",
            "Pronte in pochi minuti",
            "Nessun conservante aggiunto",
          ]}
          products={jarProducts}
          reversed={false}
        />

        <ProductSplit
          eyebrow="Cosmetici alla bava"
          title="La cura della pelle, un vasetto alla volta"
          text="Creme e trattamenti naturali alla bava di lumaca, formulati per il viso, il corpo e le mani. Un'unica materia prima attiva, senza passaggi industriali che ne riducano le proprietà."
          checklist={[
            "Bava raccolta con metodo cruelty-free",
            "Formulazioni naturali al 100%",
            "Adatte a tutti i tipi di pelle",
          ]}
          products={creamProducts}
          reversed={true}
        />
      </Container>
    </section>
  );
}