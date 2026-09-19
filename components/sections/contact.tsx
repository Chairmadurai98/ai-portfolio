"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import confetti from "canvas-confetti";

// Dynamic lazy load of Contact 3D Core
const ContactCore3D = dynamic(
  () => import("@/components/3d/contact-core-3d"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[180px] max-w-xs mx-auto mb-4 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border border-[#00f5a0]/40 border-t-[#00f5a0] animate-spin" />
      </div>
    ),
  }
);


const PROJECT_TYPES = [
  "AI Engineering",
  "Frontend / Design System",
  "Full-Stack AI App",
  "Architecture Advisory",
] as const;

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [projectType, setProjectType] = React.useState<string>("AI Engineering");
  const emailAddress = "engineer@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#00f5a0", "#0df2c8", "#ffffff", "#38bdf8"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <Badge variant="accent" className="mb-3">
            Start a Conversation
          </Badge>

          {/* 3D Monolith Core Completing the Story */}
          <ContactCore3D />

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            Let&apos;s build something <span className="text-gradient">intelligent</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-xl leading-relaxed">
            Have an interesting product, AI idea, or engineering challenge? Let&apos;s talk.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Button
              asChild
              variant="default"
              size="lg"
              className="text-xs sm:text-sm font-semibold h-11 px-6"
            >
              <a href={`mailto:${emailAddress}`}>
                <Mail className="mr-2 h-4 w-4" /> Email Me
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-xs sm:text-sm h-11 px-5 border-white/[0.12] hover:border-white/[0.3]"
            >
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-xs sm:text-sm h-11 px-5 border-white/[0.12] hover:border-white/[0.3]"
            >
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>

            {/* Copy Email Button */}
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCopyEmail}
              className="text-xs sm:text-sm h-11 px-4 border-white/[0.08]"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="mr-1.5 h-4 w-4 text-[#00f5a0]" />
                  <span className="text-[#00f5a0]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-4 w-4" />
                  <span>Copy Email</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Interactive Direct Message Form Card */}
        <Card className="bg-[#0c0e11]/90 border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00f5a0]/40 to-transparent" />

          {formSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-[#00f5a0]/10 border border-[#00f5a0]/30 flex items-center justify-center text-[#00f5a0]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Message Received!
              </h3>
              <p className="text-sm text-[#8e94a0] max-w-md leading-relaxed">
                Thank you for reaching out. I typically respond within 24 hours to discuss how we can build together.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFormSubmitted(false)}
                className="mt-4 text-xs"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-2 pb-2 border-b border-white/[0.06]">
                <MessageSquare className="h-4 w-4 text-[#00f5a0]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  Send Direct Dispatch
                </span>
              </div>

              {/* Project Type Selector with Radiogroup a11y */}
              <div>
                <label id="project-type-label" className="block text-xs font-mono text-[#8e94a0] uppercase tracking-wider mb-2">
                  What are you building?
                </label>
                <div
                  role="radiogroup"
                  aria-labelledby="project-type-label"
                  className="flex flex-wrap gap-2"
                >
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setProjectType(type)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0] ${
                          isSelected
                            ? "bg-[#00f5a0]/15 border-[#00f5a0]/50 text-[#00f5a0]"
                            : "bg-white/[0.02] border-white/[0.08] text-[#8e94a0] hover:text-white hover:border-white/[0.2]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-[#8e94a0] uppercase tracking-wider mb-1.5"
                  >
                    Your Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="bg-[#101317] border-white/[0.1] text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-[#8e94a0] uppercase tracking-wider mb-1.5"
                  >
                    Your Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="bg-[#101317] border-white/[0.1] text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-details"
                  className="block text-xs font-mono text-[#8e94a0] uppercase tracking-wider mb-1.5"
                >
                  Project Details or Challenge
                </label>
                <Textarea
                  id="contact-details"
                  name="details"
                  required
                  rows={4}
                  placeholder="Tell me about your product vision, engineering constraints, or AI requirements..."
                  className="bg-[#101317] border-white/[0.1] text-xs sm:text-sm"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-[#525866]">
                  Encrypted client-side dispatch • No spam ever
                </span>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full sm:w-auto px-7 font-semibold text-xs h-11"
                >
                  <Send className="mr-2 h-3.5 w-3.5" />
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
