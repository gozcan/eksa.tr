import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const astron = localFont({
  src: "../../public/fonts/astron/Astron-Canva-Regular.woff2",
  variable: "--font-astron",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://eksa.tr"),
  title: {
    default: "EKSA | Geleceğe Değer Yapan Yapılar",
    template: "%s | EKSA",
  },
  description:
    "EKSA develops premium residential, commercial and lifestyle projects in Turkey with a focus on trust, design quality and long-term value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${instrumentSans.variable} ${astron.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
