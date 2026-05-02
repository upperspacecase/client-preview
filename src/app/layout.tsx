import type { Metadata } from "next";
import { Archivo, Caveat_Brush, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marker",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Client Preview — Stop Looming your clients",
  description:
    "Drop a 5KB widget on the live site and let your clients toggle the options themselves.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
