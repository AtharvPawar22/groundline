import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "GROUNDLINE | Deep Financial Research",
  description:
    "A restrained, publication-grade financial research platform examining NVIDIA, Netflix, and JPMorgan Chase with full accounting rigor, primary SEC citations, and contextual financial literacy.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-paper text-ink selection:bg-accent-light selection:text-accent font-sans">
        <Header />
        <main className="flex-1 max-w-content w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
