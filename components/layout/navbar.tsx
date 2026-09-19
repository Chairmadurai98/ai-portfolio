"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Playground", href: "#playground" },
  { name: "How I Build", href: "#process" },
  { name: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090a]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Monogram */}
        <Link
          href="#hero"
          className="group flex items-center space-x-2.5 text-white font-mono text-sm tracking-wider uppercase focus-visible:outline-none"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.12] text-xs font-bold text-[#00f5a0] transition-colors group-hover:border-[#00f5a0]/50 group-hover:bg-[#00f5a0]/10">
            AI
          </span>
          <span className="font-semibold tracking-tight text-sm text-[#ededed] group-hover:text-white transition-colors">
            PORTFOLIO <span className="text-[#00f5a0]">/</span> FE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 rounded-full border border-white/[0.08] bg-[#0e1013]/70 px-4 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-[#8e94a0] hover:text-white hover:bg-white/[0.05] rounded-full transition-all duration-150"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action & Social Buttons */}
        <div className="hidden md:flex items-center space-x-2.5">
          <div className="flex items-center space-x-2 mr-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5a0]" />
            </span>
            <span className="text-[11px] font-mono text-[#a1a1aa] tracking-tight">Available</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#8e94a0] hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#8e94a0] hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <Button
            asChild
            size="sm"
            variant="default"
            className="text-xs h-8 ml-2 font-medium"
          >
            <Link href="#contact">
              Let&apos;s Talk <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center space-x-2 md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-white/[0.12] bg-[#0e1013]"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-4 w-4 text-[#ededed]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between">
              <div>
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#00f5a0]/10 border border-[#00f5a0]/30 text-xs font-bold text-[#00f5a0]">
                      AI
                    </span>
                    <span className="font-mono text-sm tracking-tight text-white">AI × FRONTEND</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col space-y-3">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 text-base font-medium text-[#8e94a0] hover:text-[#00f5a0] hover:bg-white/[0.04] rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5a0]" />
                  </span>
                  <span className="text-xs text-[#a1a1aa]">Open to interesting opportunities</span>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-xs text-[#8e94a0] hover:text-white rounded-md bg-white/[0.04] border border-white/[0.08] flex-1 justify-center"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-xs text-[#8e94a0] hover:text-white rounded-md bg-white/[0.04] border border-white/[0.08] flex-1 justify-center"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <Button
                  asChild
                  className="w-full text-xs"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="#contact">Get in Touch</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
