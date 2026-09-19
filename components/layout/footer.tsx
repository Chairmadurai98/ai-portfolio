"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

// Isolated lightweight clock component to prevent re-rendering the entire footer
function LiveClock() {
  const [timeStr, setTimeStr] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      setTimeStr(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <>
      <span>•</span>
      <span>{timeStr}</span>
    </>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#050607] border-t border-white/[0.08] text-xs text-[#8e94a0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand & Stack */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <span className="font-mono font-semibold text-white tracking-wider">
              AI × FRONTEND
            </span>
            <span className="hidden sm:inline-block text-white/[0.2]">•</span>
            <span>Built with Next.js + shadcn/ui + TypeScript + Tailwind</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-colors border border-white/[0.06] cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Status, Time & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#525866]">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5a0]" />
            </span>
            <span>All systems nominal</span>
            <LiveClock />
          </div>

          <div>
            © {new Date().getFullYear()} AI Engineer × Frontend Engineer. Crafted with precision.
          </div>
        </div>
      </div>
    </footer>
  );
}
