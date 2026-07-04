"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SplitTitle } from "@/components/ui/SplitTitle";

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contatti() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [privacyChecked, setPrivacyChecked] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!privacyChecked) return;

    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = {
      nomeCognome: formData.get("nomeCognome"),
      azienda: formData.get("azienda"),
      email: formData.get("email"),
      messaggio: formData.get("messaggio"),
    };

    try {
      // TODO: sostituire con l'endpoint reale (es. Formspree, Web3Forms, o /api/contact)
      // const res = await fetch("https://formspree.io/f/TUO_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error("Invio fallito");

      console.log("Dati form (endpoint da collegare):", payload);
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatus("success");
      e.currentTarget.reset();
      setPrivacyChecked(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contatti" className="relative bg-[var(--background)] py-20 lg:py-28">
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--green)]" />
            <p className="eyebrow">Contatti</p>
            <span className="h-px w-12 bg-[var(--green)]" />
          </div>

          <SplitTitle
            as="h2"
            className="heading-display text-[2.25rem] leading-[1.2] text-[var(--green)] sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Parliamone
          </SplitTitle>

          <p className="body-large mx-auto mt-5 max-w-xl">
            Hai richieste particolari o vuoi parlarci di qualcosa? Lasciaci un
            messaggio, ti rispondiamo il prima possibile.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
          className="mx-auto mt-14 flex max-w-2xl flex-col gap-5 lg:mt-16"
        >
          <motion.div variants={textItem}>
            <label
              htmlFor="nomeCognome"
              className="mb-2 block font-sans text-sm font-semibold text-[var(--foreground)]"
            >
              Nome e Cognome
            </label>
            <input
              id="nomeCognome"
              name="nomeCognome"
              type="text"
              required
              placeholder="Mario Rossi"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition focus:border-[var(--green)]"
            />
          </motion.div>

          <motion.div variants={textItem}>
            <label
              htmlFor="azienda"
              className="mb-2 block font-sans text-sm font-semibold text-[var(--foreground)]"
            >
              Azienda{" "}
              <span className="font-normal text-[var(--muted)]">
                (facoltativo)
              </span>
            </label>
            <input
              id="azienda"
              name="azienda"
              type="text"
              placeholder="Nome dell'azienda"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition focus:border-[var(--green)]"
            />
          </motion.div>

          <motion.div variants={textItem}>
            <label
              htmlFor="email"
              className="mb-2 block font-sans text-sm font-semibold text-[var(--foreground)]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="mario.rossi@email.com"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition focus:border-[var(--green)]"
            />
          </motion.div>

          <motion.div variants={textItem}>
            <label
              htmlFor="messaggio"
              className="mb-2 block font-sans text-sm font-semibold text-[var(--foreground)]"
            >
              Messaggio
            </label>
            <textarea
              id="messaggio"
              name="messaggio"
              required
              rows={5}
              placeholder="Scrivi qui la tua richiesta..."
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition focus:border-[var(--green)]"
            />
          </motion.div>

          <motion.label
            variants={textItem}
            htmlFor="privacy"
            className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[var(--muted)]"
          >
            <input
              id="privacy"
              type="checkbox"
              checked={privacyChecked}
              onChange={(e) => setPrivacyChecked(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--green)]"
            />
            <span>
              Acconsento al trattamento dei miei dati personali secondo
              quanto previsto dall&apos;informativa sulla privacy, ai fini
              della gestione della mia richiesta.
            </span>
          </motion.label>

          <motion.div variants={textItem} className="mt-2">
            <button
              type="submit"
              disabled={status === "submitting" || !privacyChecked}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--green)] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition duration-300 hover:bg-[var(--green-soft)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Invio in corso...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={18} />
                  Messaggio inviato
                </>
              ) : (
                <>
                  <Send size={18} />
                  Invia
                </>
              )}
            </button>

            {status === "success" && (
              <p className="mt-3 text-sm text-[var(--green)]">
                Grazie per averci scritto, ti risponderemo il prima
                possibile.
              </p>
            )}

            {status === "error" && (
              <p className="mt-3 text-sm text-[var(--red)]">
                Si è verificato un errore, riprova o scrivici su WhatsApp.
              </p>
            )}
          </motion.div>
        </motion.form>
      </Container>
    </section>
  );
}