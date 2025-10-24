import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Auto E-Book Forge",
  description: "Generate polished digital products across categories in seconds."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${calistoga.variable}`}>
      <body>{children}</body>
    </html>
  );
}
