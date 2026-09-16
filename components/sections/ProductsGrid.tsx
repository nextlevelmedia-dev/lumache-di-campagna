"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

type NutritionRow = {
  label: string;
  value: string;
};

type Product = {
  name: string;
  image: string;
  description: string;
  ingredients: string;
  format: string;
  storage: string;
  usage: string;
  nutrition?: NutritionRow[];
};

const looseSnail: Product = {
  name: "Lumache sfuse al kg",
  image: "/images/products/13.png",
  description:
    "Lumache selezionate e preparate con cura, vendute sfuse e pesate al momento. Ideali per chi desidera cucinarle secondo la propria ricetta tradizionale.",
  ingredients:
    "Lumache fresche selezionate. Informazioni definitive sul prodotto da confermare.",
  format: "Vendita al kg",
  storage:
    "Conservare secondo le indicazioni fornite al momento dell'acquisto. Prodotto fresco.",
  usage:
    "Da preparare e cucinare prima del consumo secondo la ricetta desiderata.",
};

const jarProducts: Product[] = [
  {
    name: "Lumache al naturale",
    image: "/images/products/lumachealnaturale.webp",
    description:
      "La versione più essenziale, pensata per chi vuole ritrovare il gusto autentico della lumaca. Una preparazione semplice e versatile, ideale come base per numerose ricette.",
    ingredients:
      "Lumache specie Helix Aspersa Maxima, acqua, sale. Potrebbe contenere gusci.",
    format: "300 g peso netto · 150 g peso sgocciolato",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "282 kJ / 67 kcal" },
      { label: "Grassi", value: "1,7 g" },
      { label: "di cui acidi saturi", value: "1,7 g" },
      { label: "Carboidrati", value: "0 g" },
      { label: "di cui zuccheri", value: "0 g" },
      { label: "Fibre", value: "0 g" },
      { label: "Proteine", value: "12,9 g" },
      { label: "Sale", value: "1 g" },
    ],
  },
  {
    name: "Lumache trifolate",
    image: "/images/products/lumachetrifolate.webp",
    description:
      "Una ricetta ricca e profumata, dove le lumache incontrano olio extravergine di oliva, aglio, scalogno e prezzemolo. Un gusto deciso ma equilibrato, pronto da portare in tavola in pochi minuti.",
    ingredients:
      "Lumache specie Helix Aspersa Maxima (52%), olio extravergine di oliva (40%), aglio, scalogno, prezzemolo, sale, pepe. Potrebbe contenere gusci.",
    format: "300 g peso netto",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "625 kJ / 155 kcal" },
      { label: "Grassi", value: "11,5 g" },
      { label: "di cui acidi saturi", value: "1,4 g" },
      { label: "Carboidrati", value: "0,4 g" },
      { label: "di cui zuccheri", value: "0,3 g" },
      { label: "Fibre", value: "0,5 g" },
      { label: "Proteine", value: "11,1 g" },
      { label: "Sale", value: "1,0 g" },
    ],
  },
  {
    name: "Ragù di lumache",
    image: "/images/products/ragudilumache.webp",
    description:
      "Un ragù dal carattere rustico e avvolgente, preparato con pomodoro, lumache, olio extravergine di oliva e vino rosso. Pensato per dare un sapore originale e intenso ai piatti della tradizione.",
    ingredients:
      "Polpa di pomodoro (pomodori pelati, succo di 52% pomodoro, correttore di acidità, acido citrico), lumache specie Aspersa Maxima (25%), olio extravergine di oliva (10%), vino rosso (contiene solfiti), carote, cipolle, sedano, sale, aglio, aromi naturali. Potrebbe contenere gusci.",
    format: "300 g peso netto",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "488 kJ / 118 kcal" },
      { label: "Grassi", value: "9,7 g" },
      { label: "di cui acidi saturi", value: "1,9 g" },
      { label: "Carboidrati", value: "2,2 g" },
      { label: "di cui zuccheri", value: "1,9 g" },
      { label: "Fibre", value: "0,2 g" },
      { label: "Proteine", value: "4,5 g" },
      { label: "Sale", value: "1,2 g" },
    ],
  },
  {
    name: "Lumache alle erbette",
    image: "/images/products/lumachealleerbette.webp",
    description:
      "Una preparazione saporita in cui le lumache si uniscono alla delicatezza della bieta dolce, arricchita da porro, speck e burro. Una ricetta dal gusto pieno e avvolgente.",
    ingredients:
      "Bieta dolce (46%), lumache specie Aspersa Maxima (30%), olio extra vergine di oliva, burro, porro, speck (3%), sale, pepe. Potrebbe contenere gusci.",
    format: "300 g peso netto",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "694 kJ / 166 kcal" },
      { label: "Grassi", value: "12,6 g" },
      { label: "di cui acidi saturi", value: "6,3 g" },
      { label: "Carboidrati", value: "3,9 g" },
      { label: "di cui zuccheri", value: "3,8 g" },
      { label: "Fibre", value: "0,7 g" },
      { label: "Proteine", value: "9,3 g" },
      { label: "Sale", value: "1,8 g" },
    ],
  },
  {
    name: "Lumache alle verdure",
    image: "/images/products/lumachealleverdure.webp",
    description:
      "Una ricetta colorata e genuina che abbina le lumache a carote, porri, cipolla e sedano. Il vino bianco e gli aromi completano una preparazione dal gusto morbido e armonioso.",
    ingredients:
      "Lumache specie Aspersa Maxima (30%), carote (10%), porri (10%), cipolla (10%), sedano, olio di oliva, lardo trito, vino bianco, concentrato di pomodoro, sale, aglio, aromi naturali. Potrebbe contenere gusci.",
    format: "300 g peso netto",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "685 kJ / 165 kcal" },
      { label: "Grassi", value: "15,7 g" },
      { label: "di cui acidi saturi", value: "8,6 g" },
      { label: "Carboidrati", value: "3,2 g" },
      { label: "di cui zuccheri", value: "3,0 g" },
      { label: "Fibre", value: "1,7 g" },
      { label: "Proteine", value: "4,8 g" },
      { label: "Sale", value: "1,3 g" },
    ],
  },
  {
    name: "Lumache ai funghi",
    image: "/images/products/lumacheaifunghi.webp",
    description:
      "Una ricetta dal gusto intenso e boschivo, in cui le lumache incontrano i funghi e una delicata base di pomodoro, porro, scalogno e aglio.",
    ingredients:
      "Funghi (pholiota mutabilis) (49%), polpa di lumache (30%), olio di oliva (10%), pomodoro in pezzi (pomodoro), porro, scalogno, aglio, sale. Potrebbe contenere gusci.",
    format: "300 g peso netto",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "522 kJ / 125 kcal" },
      { label: "Grassi", value: "10,6 g" },
      { label: "di cui acidi saturi", value: "0,5 g" },
      { label: "Carboidrati", value: "1,5 g" },
      { label: "di cui zuccheri", value: "0,6 g" },
      { label: "Fibre", value: "1,6 g" },
      { label: "Proteine", value: "5,0 g" },
      { label: "Sale", value: "1,1 g" },
    ],
  },
  {
    name: "Lumache agli spinaci",
    image: "/images/products/lumacheaglispinaci.webp",
    description:
      "Una preparazione morbida e saporita che unisce le lumache agli spinaci, con burro, porro e Grana Padano. Una ricetta equilibrata dal carattere delicato.",
    ingredients:
      "Spinaci (47%), lumache specie Aspersa Maxima (30%), burro, olio di oliva, porro, grana padano, sale, pepe. Potrebbe contenere gusci.",
    format: "300 g peso netto",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "694 kJ / 166 kcal" },
      { label: "Grassi", value: "12,6 g" },
      { label: "di cui acidi saturi", value: "6,3 g" },
      { label: "Carboidrati", value: "3,9 g" },
      { label: "di cui zuccheri", value: "3,8 g" },
      { label: "Fibre", value: "0,7 g" },
      { label: "Proteine", value: "9,3 g" },
      { label: "Sale", value: "1,3 g" },
    ],
  },
  {
    name: "Lumache alla arrabbiata",
    image: "/images/products/lumacheallaarrabbiata.webp",
    description:
      "Una ricetta vivace e decisa, con pomodoro e peperoncino ad accompagnare il gusto delle lumache. Pensata per chi ama i sapori più intensi e leggermente piccanti.",
    ingredients:
      "Polpa di pomodoro (30%), lumache specie Aspersa Maxima (30%), olio di oliva (10%), cipolla (2%), sedano (2%), carote (2%), vino bianco, sale, aglio, aromi naturali, peperoncino. Potrebbe contenere gusci.",
    format: "300 g peso netto",
    storage:
      "Conservare in luogo fresco a temperatura ambiente a vasetto chiuso. Dopo l'apertura conservare in frigorifero a 0/4° per 2-3 giorni.",
    usage:
      "Da consumarsi previa cottura. Cuocere per 4 minuti. Ideale come condimento di pasta, risotti, polenta o crostini.",
    nutrition: [
      { label: "Energia", value: "477 kJ / 114 kcal" },
      { label: "Grassi", value: "8,6 g" },
      { label: "di cui acidi saturi", value: "0,6 g" },
      { label: "Carboidrati", value: "3,9 g" },
      { label: "di cui zuccheri", value: "2,7 g" },
      { label: "Fibre", value: "0,8 g" },
      { label: "Proteine", value: "4,8 g" },
      { label: "Sale", value: "1,1 g" },
    ],
  },
];

const creamProducts: Product[] = [
  {
    name: "Crema viso rigenerante",
    image: "/images/products/7.png",
    description:
      "Trattamento quotidiano studiato per nutrire e idratare la pelle del viso, valorizzando le proprietà cosmetiche della bava di lumaca.",
    ingredients:
      "INCI da inserire utilizzando esclusivamente la formulazione riportata sulla confezione originale.",
    format: "Vaso da 50 ml",
    storage:
      "Conservare lontano da fonti dirette di calore e luce. Richiudere accuratamente dopo l'uso.",
    usage:
      "Applicare mattina e sera sulla pelle pulita di viso e collo, massaggiando fino a completo assorbimento.",
  },
  {
    name: "Crema mani nutriente",
    image: "/images/products/8.png",
    description:
      "Crema mani dalla texture confortevole, pensata per nutrire la pelle e contrastare la sensazione di secchezza.",
    ingredients:
      "INCI completo da sostituire con quello presente sull'etichetta reale del prodotto.",
    format: "Tubo da 75 ml",
    storage:
      "Conservare in luogo fresco e asciutto, lontano da fonti di calore.",
    usage:
      "Applicare sulle mani ogni volta che se ne sente la necessità e massaggiare fino ad assorbimento.",
  },
  {
    name: "Siero anti-età",
    image: "/images/products/9.png",
    description:
      "Siero viso concentrato dalla texture leggera, studiato per completare la routine quotidiana di trattamento della pelle.",
    ingredients:
      "INCI da riportare integralmente dalla confezione ufficiale del cosmetico.",
    format: "Flacone da 30 ml",
    storage:
      "Conservare lontano dalla luce diretta e da temperature elevate.",
    usage:
      "Applicare alcune gocce su viso e collo detersi prima della crema abituale.",
  },
  {
    name: "Balsamo labbra",
    image: "/images/products/10.png",
    description:
      "Trattamento pratico per mantenere le labbra morbide e protette durante la giornata.",
    ingredients:
      "INCI da sostituire con la formulazione esatta riportata sulla confezione.",
    format: "Stick da 5 ml",
    storage:
      "Conservare in luogo fresco e asciutto, evitando l'esposizione prolungata al calore.",
    usage:
      "Applicare sulle labbra più volte durante la giornata secondo necessità.",
  },
  {
    name: "Crema corpo idratante",
    image: "/images/products/11.png",
    description:
      "Crema corpo pensata per lasciare la pelle morbida, nutrita e piacevolmente idratata dopo l'applicazione.",
    ingredients:
      "INCI completo da inserire sulla base dell'etichetta reale del prodotto.",
    format: "Vaso da 200 ml",
    storage:
      "Conservare lontano da fonti di calore e luce diretta.",
    usage:
      "Applicare quotidianamente sulla pelle pulita e massaggiare con movimenti circolari.",
  },
  {
    name: "Gel doposole lenitivo",
    image: "/images/products/12.png",
    description:
      "Gel fresco e leggero pensato per donare una piacevole sensazione di comfort alla pelle dopo l'esposizione solare.",
    ingredients:
      "INCI da sostituire integralmente con quello riportato sulla confezione originale.",
    format: "Flacone da 150 ml",
    storage:
      "Conservare in luogo fresco e asciutto. Evitare l'esposizione diretta al sole.",
    usage:
      "Applicare sulla pelle dopo l'esposizione solare e massaggiare delicatamente fino ad assorbimento.",
  },
];

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="group w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--soft-gray)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 45vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="border-t border-[var(--border)] bg-[#faf9f5] p-4">
        <p className="font-sans text-sm font-semibold text-[var(--foreground)]">
          {product.name}
        </p>

        <div className="mt-3 flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[var(--green)]">
          <span>Scopri di più</span>

          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </button>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const contentScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px] sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Informazioni su ${product.name}`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-[var(--border)] bg-[#faf9f5] shadow-2xl lg:overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[#faf9f5]/95 text-[var(--foreground)] shadow-sm transition-colors hover:bg-white sm:right-6 sm:top-6"
            >
              <X size={20} />
            </button>

            <div className="grid lg:h-[90vh] lg:grid-cols-[0.9fr_1.1fr]">
              {/* Immagine */}
              <div
                className="relative min-h-[320px] bg-white sm:min-h-[420px] lg:sticky lg:top-0 lg:h-[90vh] lg:min-h-0"
                onWheel={(event) => {
                  if (window.innerWidth >= 1024 && contentScrollRef.current) {
                    event.preventDefault();
                    contentScrollRef.current.scrollTop += event.deltaY;
                  }
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain p-8 sm:p-12"
                />
              </div>

              {/* Contenuto */}
              <div
                ref={contentScrollRef}
                className="p-6 sm:p-10 lg:h-[90vh] lg:overflow-y-auto lg:p-12"
              >
                <p className="eyebrow">Dettagli prodotto</p>

                <h3 className="heading-display mt-4 pr-10 text-[2rem] leading-[1.15] text-[var(--green)] sm:text-[2.5rem]">
                  {product.name}
                </h3>

                <p className="body-large mt-6">{product.description}</p>

                <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  <div className="py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green)]">
                      Formato
                    </p>

                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-[var(--muted)]">
                      {product.format}
                    </p>
                  </div>

                  <div className="py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green)]">
                      Ingredienti
                    </p>

                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-[var(--muted)]">
                      {product.ingredients}
                    </p>
                  </div>

                  {product.nutrition && product.nutrition.length > 0 && (
                    <div className="py-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green)]">
                        Valori nutrizionali
                      </p>

                      <p className="mt-2 font-sans text-xs text-[var(--muted)]">
                        Per 100 g di prodotto sgocciolato
                      </p>

                      <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
                        <table className="w-full border-collapse font-sans text-sm">
                          <tbody>
                            {product.nutrition.map((row) => (
                              <tr
                                key={row.label}
                                className="border-b border-[var(--border)] last:border-b-0"
                              >
                                <th
                                  scope="row"
                                  className="px-4 py-2.5 text-left font-medium text-[var(--foreground)]"
                                >
                                  {row.label}
                                </th>
                                <td className="px-4 py-2.5 text-right font-semibold text-[var(--green)]">
                                  {row.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green)]">
                      Modalità d'uso
                    </p>

                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-[var(--muted)]">
                      {product.usage}
                    </p>
                  </div>

                  <div className="py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--green)]">
                      Conservazione
                    </p>

                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-[var(--muted)]">
                      {product.storage}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    href={whatsappLink(
                      `Ciao, vorrei ricevere maggiori informazioni su ${product.name}.`
                    )}
                    className="gap-2 shadow-xl shadow-green-950/10"
                  >
                    <MessageCircle size={18} />
                    Richiedi informazioni
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ElegantCheck() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-5 w-5 shrink-0 overflow-visible text-[var(--green)] sm:h-7 sm:w-7"
      aria-hidden="true"
    >
      <path
        d="
          M 5 25
          C 9 27, 14 32, 18.5 39
          C 22 30, 27 21, 33 14
          C 36.5 10, 40.5 6.5, 44 4
        "
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-4">
      <ElegantCheck />

      <span className="font-sans text-[15px] font-medium text-[var(--foreground)]">
        {text}
      </span>
    </div>
  );
}

function SingleProductSplit({
  id,
  eyebrow,
  title,
  text,
  checklist,
  product,
  reversed,
  onOpenProduct,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  checklist: string[];
  product: Product;
  reversed: boolean;
  onOpenProduct: (product: Product) => void;
}) {
  return (
    <div
      id={id}
      className={`scroll-mt-32 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
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
        <ProductCard product={product} onOpen={onOpenProduct} />
      </motion.div>
    </div>
  );
}

function ProductSplit({
  id,
  eyebrow,
  title,
  text,
  checklist,
  products,
  reversed,
  onOpenProduct,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  checklist: string[];
  products: Product[];
  reversed: boolean;
  onOpenProduct: (product: Product) => void;
}) {
  return (
    <div
      id={id}
      className={`scroll-mt-32 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
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
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: (i % 2) * 0.08,
                duration: 0.5,
              }}
            >
              <ProductCard
                product={product}
                onOpen={onOpenProduct}
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section
        id="prodotti"
        className="relative scroll-mt-32 bg-[#faf9f5] py-20 lg:py-28"
      >
        <Container className="relative flex flex-col gap-24 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
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
              <span className="italic text-[var(--red)]">
                più naturale
              </span>
            </SplitTitle>
          </motion.div>

          <SingleProductSplit
            id="lumache-sfuse"
            eyebrow="Lumache sfuse"
            title={
              <>
                <span className="italic text-[var(--red)]">
                  Materia prima
                </span>
                , pesata al momento
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
            onOpenProduct={setSelectedProduct}
          />

          <ProductSplit
            id="lumache-vasetto"
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
            onOpenProduct={setSelectedProduct}
          />

          <ProductSplit
            id="cosmetici-bava"
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
            onOpenProduct={setSelectedProduct}
          />
        </Container>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}