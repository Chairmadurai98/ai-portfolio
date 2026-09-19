import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Engineer × Frontend Engineer | Intelligent Interfaces for the Web",
  description:
    "AI Engineer with 7 months of experience building AI-powered applications, backed by 3 years of frontend engineering experience. Specializing in low-latency streaming UX, RAG systems, and autonomous agent workflows.",
  keywords: [
    "AI Engineer",
    "Frontend Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "LLM Applications",
    "RAG",
    "AI Agents",
    "Streaming UX",
    "UI/UX Design",
  ],
  authors: [{ name: "AI Engineer × Frontend Engineer" }],
  creator: "AI Engineer × Frontend Engineer",
  openGraph: {
    title: "AI Engineer × Frontend Engineer | Intelligent Interfaces for the Web",
    description:
      "I build intelligent interfaces for the web. 7 months AI engineering + 3 years frontend experience.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineer × Frontend Engineer",
    description:
      "I build intelligent interfaces for the web. 7 months AI engineering + 3 years frontend experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#08090a] text-[#ededed] font-sans selection:bg-[#00f5a0]/20 selection:text-[#00f5a0]">
        {children}
      </body>
    </html>
  );
}
