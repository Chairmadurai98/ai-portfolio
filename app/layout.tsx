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

const siteUrl = "https://portfolio.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Engineer × Frontend Engineer | Intelligent Interfaces for the Web",
    description:
      "I build intelligent interfaces for the web. 7 months AI engineering + 3 years frontend experience.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AI × Frontend Portfolio",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "AI Engineer × Frontend Engineer",
      jobTitle: "AI Engineer & Frontend Engineer",
      description:
        "Specializing in production LLM applications, low-latency streaming UX, RAG systems, and enterprise design systems.",
      url: siteUrl,
      sameAs: [
        "https://github.com",
        "https://linkedin.com",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Frontend Engineering",
        "Next.js",
        "React",
        "TypeScript",
        "Large Language Models",
        "RAG",
        "Streaming UX",
      ],
    },
    {
      "@type": "WebSite",
      name: "AI × Frontend Engineering Portfolio",
      url: siteUrl,
      description: "Intelligent interfaces for the web built with Next.js, React, and TypeScript.",
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#08090a] text-[#ededed] font-sans selection:bg-[#00f5a0]/20 selection:text-[#00f5a0]">
        {children}
      </body>
    </html>
  );
}
