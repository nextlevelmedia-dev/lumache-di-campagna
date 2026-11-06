"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ldc-privacy-notice-v1";

export function PrivacyBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // storage non disponibile: mostriamo comunque il banner
    }
    if (dismissed) return;

    // Ritardo per non interferire con il caricamento iniziale (LCP)
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignora
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Informativa privacy e cookie"
      className="privacy-banner fixed inset-x-4 bottom-4 z-[100] sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md"
    >
      <div className="rounded-2xl border border-white/10 bg-[var(--green)] p-5 text-white shadow-[0_20px_50px_rgba(23,63,43,0.35)] sm:p-6">
        <p className="mb-2 font-serif text-xl leading-tight">
          Privacy &amp; Cookie
        </p>

        <p className="text-[13.5px] leading-relaxed text-white/80">
          Questo sito utilizza solo cookie tecnici necessari al suo
          funzionamento, senza finalità di profilazione. Per saperne di più
          consulta la nostra{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-white/70"
          >
            Privacy Policy
          </Link>{" "}
          e la{" "}
          <Link
            href="/cookie-policy"
            className="font-semibold text-white underline underline-offset-4 transition-colors hover:text-white/70"
          >
            Cookie Policy
          </Link>
          .
        </p>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-sm font-semibold tracking-wide text-[var(--green)] transition-all duration-300 hover:bg-[var(--background)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
}
