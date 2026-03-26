import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PlayerAudio from "@/components/PlayerAudio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AC Music — Anthony Carrozzo",
  description:
    "Thirty years of songwriting, finally heard. AC Music is a personal archive of songs — four artistic personas, AI-assisted production, and original demos kept for comparison. Not for the industry. For the family.",
  openGraph: {
    title: "AC Music — Anthony Carrozzo",
    description:
      "Thirty years of songwriting, finally heard. AC Music is a personal archive of songs — four artistic personas, AI-assisted production, and original demos kept for comparison. Not for the industry. For the family.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AC Music — Anthony Carrozzo",
    description:
      "Thirty years of songwriting, finally heard. AC Music is a personal archive of songs — four artistic personas, AI-assisted production, and original demos kept for comparison. Not for the industry. For the family.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-900 text-white antialiased h-full overflow-hidden`}
      >
        {children}
        <PlayerAudio />
      </body>
    </html>
  );
}
