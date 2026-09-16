import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";

import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lumachedicampagna.it"),

  title: {
    default: "Lumache di Campagna | Allevamento di Lumache a Cremona",
    template: "%s | Lumache di Campagna",
  },

  description:
    "Allevamento di lumache a Pescarolo ed Uniti, in provincia di Cremona. Scopri lumache sfuse, specialità gastronomiche in vasetto e cosmetici alla bava di lumaca.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: "Lumache di Campagna",
    title: "Lumache di Campagna | Allevamento di Lumache a Cremona",
    description:
      "Allevamento di lumache a Pescarolo ed Uniti, in provincia di Cremona. Scopri lumache sfuse, specialità gastronomiche in vasetto e cosmetici alla bava di lumaca.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prodotti Lumache di Campagna",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}