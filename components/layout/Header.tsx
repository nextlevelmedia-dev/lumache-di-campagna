"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/whatsapp";

const navItems = [
  { label: "Prodotti", href: "#prodotti" },
  { label: "Allevamento", href: "#allevamento" },
  { label: "Storia", href: "#storia" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#contatti" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#eeebe3]/95 backdrop-blur-xl">
      <Container className="flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo-lumache-di-campagna.webp"
            alt="Lumache di Campagna"
            width={88}
            height={88}
            className="h-14 w-14 object-contain md:h-20 md:w-20"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 font-serif text-lg text-[var(--foreground)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--green)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA solo desktop, completamente nascosto su mobile */}
        <div className="hidden md:block">
          <Button
            href={whatsappLink(
              "Ciao, ho visitato il sito e vorrei maggiori informazioni sui vostri prodotti."
            )}
            className="gap-2"
          >
            <MessageCircle size={18} />
            Richiedi informazioni
          </Button>
        </div>

        {/* Hamburger, solo mobile */}
        <button
  type="button"
  onClick={() => setIsOpen(true)}
  aria-label="Apri il menu"
  className="flex h-11 w-11 items-center justify-center text-[var(--green)] md:hidden"
>
  <Menu size={24} />
</button>
      </Container>

      {/* Drawer mobile a schermo intero */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex h-dvh w-full flex-col bg-[var(--background)] p-8 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Image
  src="/logo/logo-lumache-di-campagna.webp"
  alt="Lumache di Campagna"
  width={56}
  height={56}
  className="h-14 w-14 object-contain"
/>

              <button
  type="button"
  onClick={() => setIsOpen(false)}
  aria-label="Chiudi il menu"
  className="flex h-11 w-11 items-center justify-center text-[var(--foreground)]"
>
  <X size={24} />
</button>
            </div>

            <nav className="mt-12 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block border-b border-[var(--border)] py-4 font-serif text-2xl text-[var(--green)]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-auto"
            >
              <Button
                href={whatsappLink(
                  "Ciao, ho visitato il sito e vorrei maggiori informazioni sui vostri prodotti."
                )}
                className="flex w-full items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Richiedi informazioni
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}