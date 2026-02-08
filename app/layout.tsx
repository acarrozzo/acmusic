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
  title: "AC Music",
  description:
    "Old songs. New bodies. Hear the tracks the way they were always meant to sound.",
  openGraph: {
    title: "AC Music",
    description:
      "Old songs. New bodies. Hear the tracks the way they were always meant to sound.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AC Music",
    description:
      "Old songs. New bodies. Hear the tracks the way they were always meant to sound.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        {children}
        <PlayerAudio />
      </body>
    </html>
  );
}
