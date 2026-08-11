import type { Metadata } from "next";
import { Poppins, Manrope, JetBrains_Mono } from "next/font/google";
import { FlareField } from "@/components/layout/FlareField";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-var",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Curiosity Cloud Console",
  description:
    "Practical console for managing GPU compute, containers, databases, and deployments across Curiosity Cloud infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-paper text-slate font-sans antialiased text-[14px]">
        <FlareField />
        {children}
      </body>
    </html>
  );
}
