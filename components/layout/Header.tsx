import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
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
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[#eeebe3]/95 backdrop-blur-xl">
      <Container className="flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo-lumache-di-campagna.webp"
            alt="Lumache di Campagna"
            width={88}
            height={88}
            className="h-20 w-20 object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 text-xs font-bold uppercase tracking-[0.22em] text-[var(--foreground)] md:flex">
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

        <Button
          href={whatsappLink(
            "Ciao, ho visitato il sito e vorrei maggiori informazioni sui vostri prodotti."
          )}
          className="hidden gap-2 md:inline-flex"
        >
          <MessageCircle size={18} />
          Richiedi informazioni
        </Button>
      </Container>
    </header>
  );
}