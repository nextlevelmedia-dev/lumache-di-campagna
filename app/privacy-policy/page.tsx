import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="min-h-screen bg-[#f7f4ee] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-10 inline-block text-sm underline underline-offset-4"
          >
            ← Torna al sito
          </Link>

          <h1 className="mb-10 font-serif text-4xl md:text-5xl">
            Privacy Policy
          </h1>

          <a
            href="https://www.iubenda.com/privacy-policy/44626116"
            className="iubenda-white iubenda-noiframe iubenda-embed"
            title="Privacy Policy"
          >
            Privacy Policy
          </a>
        </div>
      </main>

      <Script
        src="https://cdn.iubenda.com/iubenda.js"
        strategy="afterInteractive"
      />
    </>
  );
}