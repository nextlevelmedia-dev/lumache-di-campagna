import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo/logo-lumache-di-campagna.webp"
              alt="Lumache di Campagna"
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
            />

            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[var(--muted)]">
              Azienda Agricola Doninelli, allevamento, lavorazione e confezionamento in filiera diretta, dalla terra alla tavola.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--foreground)]">
              Naviga
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              <li className="text-[15px] text-[var(--muted)]">Prodotti</li>
              <li className="text-[15px] text-[var(--muted)]">Allevamento</li>
              <li className="text-[15px] text-[var(--muted)]">Storia</li>
              <li className="text-[15px] text-[var(--muted)]">FAQ</li>
              <li className="text-[15px] text-[var(--muted)]">Contatti</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--foreground)]">
              Prodotti
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              <li className="text-[15px] text-[var(--muted)]">Lumache sfuse</li>
              <li className="text-[15px] text-[var(--muted)]">Lumache in vasetto</li>
              <li className="text-[15px] text-[var(--muted)]">Cosmetici alla bava</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--foreground)]">
              Contatti
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--green)]" />
                <span className="text-[15px] text-[var(--muted)]">
                  info@lumachedicampagna.it
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--green)]" />
                <span className="text-[15px] text-[var(--muted)]">
                  Azienda Agricola Doninelli, Italia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[var(--border)] pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[13px] text-[var(--muted)]">
            Azienda Agricola Doninelli, Lumache di Campagna. Tutti i diritti riservati.
          </p>

          <p className="text-[13px] text-[var(--muted)]">
            Sito realizzato da Next Level Media
          </p>
        </div>
      </Container>
    </footer>
  );
}