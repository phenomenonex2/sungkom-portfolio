import type { Metadata } from "next";
import Chrome from "../components/Chrome";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sungkom Wongussapaiboon — Frontend Engineer",
  description: "Portfolio of Sungkom Wongussapaiboon, Senior Frontend Engineer in Bangkok. React, Next.js, TypeScript, Webflow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&family=Noto+Sans+Thai:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Chrome />
        {children}
        <Footer />
      </body>
    </html>
  );
}
