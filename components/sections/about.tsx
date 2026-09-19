"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Eye, Zap, Layers, Cpu, Box, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dynamic lazy load of About 3D Timeline
const AboutTimeline3D = dynamic(
  () => import("@/components/3d/about-timeline-3d"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[220px] rounded-2xl border border-white/[0.08] bg-[#090b0e] flex items-center justify-center mb-12">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-8 w-8 rounded-full border border-[#00f5a0]/40 border-t-[#00f5a0] animate-spin" />
          <span className="text-xs font-mono text-[#8e94a0]">Loading 3D Trajectory...</span>
        </div>
      </div>
    ),
  }
);


interface Pillar {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag: string;
  description: string;
  howFrontendHelpsAI: string;
}

const PILLARS: Pillar[] = [
  {
    id: "ux",
    icon: Eye,
    title: "User Experience",
    tag: "Perception & Flow",
    description:
      "AI models are probabilistic and inherently unpredictable. Great interfaces make them feel deterministic, trustworthy, and immediate.",
    howFrontendHelpsAI:
      "Implementing speculative token rendering, skeleton states, and progressive disclosure for intermediate reasoning.",
  },
  {
    id: "integration",
    icon: Cpu,
    title: "AI Integration",
    tag: "System Glue",
    description:
      "Connecting foundation model APIs and vector databases into real application state machines without brittle glue code.",
    howFrontendHelpsAI:
      "Strict JSON schema enforcement, bidirectional SSE stream parsing, and robust error recovery during model timeouts.",
  },
  {
    id: "product",
    icon: Sparkles,
    title: "Product Thinking",
    tag: "Value First",
    description:
      "Not every problem needs an LLM. Knowing when to use an algorithm, a deterministic UI element, or a generative model.",
    howFrontendHelpsAI:
      "Designing interfaces that augment human decision-making rather than trapping users in infinite conversational loops.",
  },
  {
    id: "performance",
    icon: Zap,
    title: "Performance",
    tag: "Sub-50ms Feel",
    description:
      "High-speed token streams (60+ tok/s) can cause heavy DOM thrashing if not managed with virtualized render cycles.",
    howFrontendHelpsAI:
      "Leveraging Web Workers, offloading token diffing, and using requestAnimationFrame to maintain 60 FPS under load.",
  },
  {
    id: "architecture",
    icon: Layers,
    title: "Clean Architecture",
    tag: "Maintainability",
    description:
      "Building modular, decoupled prompt templates, evaluation harnesses, and tool registries that scale across features.",
    howFrontendHelpsAI:
      "Applying proven frontend design patterns (custom hooks, reactive state machines, atomic components) to AI pipelines.",
  },
  {
    id: "scalability",
    icon: Box,
    title: "Scalable Interfaces",
    tag: "Design Systems",
    description:
      "Ensuring AI components look and behave consistently with existing enterprise design systems and accessibility standards.",
    howFrontendHelpsAI:
      "WCAG 2.1 AAA accessibility, keyboard-first navigation, fluid dark mode tokens, and responsive touch targets.",
  },
];

const PROGRESSION = [
  {
    label: "3 YEARS",
    title: "Frontend Engineering",
    badge: "Foundational Craft",
    desc: "Mastered React, Next.js, TypeScript, browser performance, design systems, and building high-polish user interfaces.",
  },
  {
    label: "7 MONTHS",
    title: "AI Engineering",
    badge: "Emerging Frontier",
    desc: "Immersed in LLM application architecture, RAG pipelines, autonomous agent workflows, prompt optimization, and vector stores.",
  },
  {
    label: "NOW",
    title: "Building AI-Powered Experiences",
    badge: "The Multiplier",
    desc: "Combining frontend precision with intelligent systems to create usable, delightful, production-ready AI products.",
  },
] as const;

export function About() {
  const [activeStep, setActiveStep] = React.useState<number>(2);

  return (
    <section id="about" className="py-24 relative bg-[#08090a]/80 backdrop-blur-[6px] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="accent" className="mb-3">
            Interactive Journey
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            From Interfaces to <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-2xl leading-relaxed">
            I don&apos;t just build AI functionality — I build usable, polished AI products. My 3 years of frontend craft directly elevate the quality, responsiveness, and adoption of every AI system I build.
          </p>
        </div>

        {/* 3D Interactive Timeline Conduit */}
        <AboutTimeline3D activeStep={activeStep} onSelectStep={setActiveStep} />

        {/* Visual Progression: 3 Years → 7 Months → NOW (HTML Semantic Navigation) */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {PROGRESSION.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.label}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0] ${
                    isActive
                      ? "bg-[#0e1116] border-[#00f5a0]/50 shadow-[0_0_30px_rgba(0,245,160,0.1)] -translate-y-1"
                      : "bg-[#0c0e11]/60 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0e1116]/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight ${
                        isActive ? "text-[#00f5a0]" : "text-white"
                      }`}
                    >
                      {step.label}
                    </span>
                    <Badge variant={isActive ? "accent" : "subtle"}>
                      {step.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#8e94a0] leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className="absolute bottom-3 right-4 flex items-center space-x-1.5 text-xs font-mono text-[#00f5a0]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Active Focus</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6-Part Bento Grid: How Frontend Influences AI */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                How Frontend Craft Elevates AI Engineering
              </h3>
              <p className="text-sm text-[#8e94a0] mt-0.5">
                Six core dimensions where interface engineering directly compounds AI system quality.
              </p>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/20 px-3 py-1 rounded-full">
              6 Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.id}
                  glowOnHover
                  className="group relative overflow-hidden bg-[#0c0e11]/80 border-white/[0.08]"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#ededed] group-hover:text-[#00f5a0] group-hover:border-[#00f5a0]/40 group-hover:bg-[#00f5a0]/10 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="subtle" className="font-mono text-[11px]">
                        {pillar.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-base text-white group-hover:text-[#00f5a0] transition-colors">
                      {pillar.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed pt-1">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#00f5a0]">
                        The Frontend Edge
                      </span>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        {pillar.howFrontendHelpsAI}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
