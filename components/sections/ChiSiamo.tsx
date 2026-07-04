"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { whatsappLink } from "@/lib/whatsapp";

const storyImages = [
  "/images/team.png",
  "/images/team-1.png",
  "/images/team-3.png",
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

const collageContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const collageItem = {
  hidden: { opacity: 0, scale: 1.08, clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function StoryCollage({ images }: { images: string[] }) {
  return (
    <motion.div
      variants={collageContainer}
      initial="hidden"
      whileInView="show"
      className="grid h-[420px] grid-cols-2 grid-rows-2 gap-4 sm:h-[480px] lg:h-full"
    >
      <motion.div
        variants={collageItem}
        className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-xl shadow-black/20"
      >
        <Image
          src={images[0]}
          alt="La nostra storia"
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        variants={collageItem}
        className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-xl shadow-black/20"
      >
        <Image
          src={images[1]}
          alt="La nostra storia"
          fill
          sizes="(max-width: 1024px) 25vw, 12vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        variants={collageItem}
        className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-xl shadow-black/20"
      >
        <Image
          src={images[2]}
          alt="La nostra storia"
          fill
          sizes="(max-width: 1024px) 25vw, 12vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

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
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/40" />
            <p className="font-sans text-xs font-bold uppercase tracking-[0.32em] text-white/70">
              Chi siamo
            </p>
            <span className="h-px w-12 bg-white/40" />
          </div>

          <SplitTitle
            as="h2"
            className="heading-display text-[2.25rem] leading-[1.2] text-white sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            La nostra storia
          </SplitTitle>
        </motion.div>

        <div className="mt-16 grid items-stretch gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
          >
            <motion.h3
              variants={textItem}
              className="heading-display text-[2.25rem] leading-[1.2] text-white sm:text-[2.6rem] lg:text-[3rem]"
            >
              Una famiglia, un&apos;azienda agricola, una passione
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
              Non siamo un&apos;azienda industriale. Siamo una famiglia che ha
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

          <StoryCollage images={storyImages} />
        </div>
      </Container>
    </section>
  );
}