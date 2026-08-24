import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.9fr_1fr_1.2fr] lg:gap-12 xl:gap-16">
          {/* Azienda */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-10 xl:pr-16">
            <Image
              src="/logo/logo-lumache-di-campagna.webp"
              alt="Lumache di Campagna"
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
            />

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--muted)]">
              Azienda Agricola Doninelli.
            </p>

            <div className="mt-5 space-y-1 text-[13px] leading-relaxed text-[var(--muted)]">
              <p>Doninelli Stefano</p>
              <p>P. IVA 01829410198</p>
              <p>C.F. DNNSFN95P28D150N</p>
              <p>Codice univoco 5W4A8J1</p>
            </div>
          </div>

          {/* Menu */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--foreground)]">
              Menu
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              <li>
                <Link
                  href="#prodotti"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Prodotti
                </Link>
              </li>

              <li>
                <Link
                  href="#allevamento"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Allevamento
                </Link>
              </li>

              <li>
                <Link
                  href="#storia"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Storia
                </Link>
              </li>

              <li>
                <Link
                  href="#faq"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="#contatti"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Prodotti */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--foreground)]">
              Prodotti
            </p>

            <ul className="mt-10 flex flex-col gap-3">
              <li>
                <Link
                  href="#lumache-sfuse"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Lumache sfuse
                </Link>
              </li>

              <li>
                <Link
                  href="#lumache-vasetto"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Lumache in vasetto
                </Link>
              </li>

              <li>
                <Link
                  href="#cosmetici-bava"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Cosmetici alla bava
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--foreground)]">
              Contatti
            </p>

            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--green)]"
                />

                <a
                  href="mailto:info@lumachedicampagna.it"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  info@lumachedicampagna.it
                </a>
              </li>

              

              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--green)]"
                />

                <a
                  href="tel:+393348078032"
                  className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  334 8078032
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--green)]"
                />

                <span className="text-[15px] leading-relaxed text-[var(--muted)]">
                  Località Massera 1,
                  <br />
                  26033 Pescarolo ed Uniti (CR)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-14 border-t border-[var(--border)] pt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <p className="text-[13px] text-[var(--muted)]">
                Azienda Agricola Doninelli, Lumache di Campagna. Tutti i
                diritti riservati.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
                <Link
                  href="/privacy-policy"
                  className="text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/cookie-policy"
                  className="text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--green)]"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            <p className="text-[13px] text-[var(--muted)]">
              Sito realizzato da{" "}
              <a
                href="https://convernext.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--green)]"
              >
                Convernext
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}