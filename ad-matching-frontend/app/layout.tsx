import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackendStatus from "./components/BackendStatus";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Ad Matcher — Singlish Semantic Search",
  description:
    "Search marketplace ads using AI-powered semantic matching. Understands Sinhala, Singlish, and English queries with a fine-tuned SBERT model.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Animated floating background orbs */}
        <div className="bg-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        {/* Navigation bar */}
        <nav className="app-navbar">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="navbar-logo-icon"
              >
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <span className="navbar-title">AI Ad Matcher</span>
          </div>
          <BackendStatus />
        </nav>

        {children}
      </body>
    </html>
  );
}
