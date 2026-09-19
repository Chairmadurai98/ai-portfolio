"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Compass,
  Search,
  PenTool,
  Cpu,
  Code2,
  SlidersHorizontal,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import type { ProcessStep } from "@/types";

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    tagline: "Deconstruct the core human problem before touching code",
    icon: Compass,
    goal: "Isolate the actual bottleneck. Clarify whether an LLM is truly required or if deterministic code solves it better.",
    frontendFocus: "Map out the user's mental model, emotional pain points, and target task completion times.",
    aiFocus: "Assess if generative AI creates real leverage or just adds latency and cost.",
    deliverable: "Problem statement document, user flow diagram, and feasibility matrix.",
  },
  {
    number: "02",
    title: "Explore",
    tagline: "Experiment with models, chunking strategies, and UI paradigms",
    icon: Search,
    goal: "Discover optimal prompt topologies, test foundation model variants, and evaluate latency vs accuracy trade-offs.",
    frontendFocus: "Review existing UI patterns, establish design tokens, and sketch layout wireframes.",
    aiFocus: "Benchmark candidate models (Claude 3.5, GPT-4o, Gemini 1.5, Groq/Llama) on zero-shot and few-shot tasks.",
    deliverable: "Model evaluation scorecard and initial UX sketches.",
  },
  {
    number: "03",
    title: "Prototype",
    tagline: "Build a rapid, interactive proof-of-concept to test ergonomics",
    icon: PenTool,
    goal: "Get an interactive prototype into hands within days to validate conversational flow and cognitive load.",
    frontendFocus: "Create rapid clickable mockups in Next.js using Tailwind and shadcn/ui primitives.",
    aiFocus: "Wire up lightweight API calls to test prompt sensitivity and output variance.",
    deliverable: "Interactive working demo for stakeholder and user feedback.",
  },
  {
    number: "04",
    title: "Integrate AI",
    tagline: "Bridge probabilistic model outputs with reliable client state",
    icon: Cpu,
    goal: "Build streaming data pipelines, vector indices, and robust schema validation.",
    frontendFocus: "Implement Server-Sent Events (SSE) stream consumers, optimistic token rendering, and error boundaries.",
    aiFocus: "Deploy hybrid RAG pipelines, construct agent tool schemas, and enforce JSON Schema validation.",
    deliverable: "End-to-end streaming data pipeline connecting LLM to UI.",
  },
  {
    number: "05",
    title: "Engineer",
    tagline: "Harden for scale, accessibility, and rock-solid reliability",
    icon: Code2,
    goal: "Transform prototype into production-grade, maintainable, and type-safe architecture.",
    frontendFocus: "Audit Core Web Vitals, implement WCAG 2.1 AAA keyboard navigation, and modularize components.",
    aiFocus: "Implement automatic retry mechanisms with exponential backoff, rate limit handling, and token budget monitors.",
    deliverable: "Tested, type-safe codebase with automated CI test suites.",
  },
  {
    number: "06",
    title: "Refine",
    tagline: "Obsess over micro-interactions, perceptual speed, and feedback",
    icon: SlidersHorizontal,
    goal: "Eliminate any remaining friction, jank, or latency dead-zones.",
    frontendFocus: "Fine-tune hover states, fluid transitions, skeleton loaders, and micro-animations.",
    aiFocus: "Calibrate system prompts, tune chunk overlap, and optimize prompt token length.",
    deliverable: "Silky-smooth 60 FPS user experience with sub-150ms perceived latency.",
  },
  {
    number: "07",
    title: "Ship",
    tagline: "Deploy with comprehensive observability and feedback loops",
    icon: Rocket,
    goal: "Launch to production with telemetry to measure real-world performance and user delight.",
    frontendFocus: "Setup real-user monitoring (RUM), Lighthouse audits, and client error tracking (Sentry).",
    aiFocus: "Track token economics, prompt drift, hallucination frequency, and user feedback signals (thumbs up/down).",
    deliverable: "Production release with live monitoring dashboards and iteration backlog.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="accent" className="mb-3">
            Systematic Methodology
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            How I <span className="text-gradient">Build</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-2xl leading-relaxed">
            A disciplined 7-step engineering framework bridging user empathy, frontend craftsmanship, and rigorous AI systems integration.
          </p>
        </div>

        {/* Expandable Accordion Steps */}
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-3">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <AccordionItem
                key={step.number}
                value={`item-${index}`}
                className="border border-white/[0.08] bg-[#0c0e11]/80 rounded-xl overflow-hidden data-[state=open]:border-[#00f5a0]/40 transition-colors"
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center space-x-4 text-left">
                    <span className="font-mono text-base font-bold text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/25 px-2.5 py-1 rounded-md">
                      {step.number}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-[#8e94a0]" />
                        <span className="text-base font-semibold text-white">
                          {step.title}
                        </span>
                      </div>
                      <span className="text-xs text-[#8e94a0] font-normal block sm:inline-block mt-0.5">
                        {step.tagline}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/[0.06]">
                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-white/[0.7] flex items-center space-x-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                        <span>Core Objective</span>
                      </span>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        {step.goal}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#00f5a0]/[0.03] border border-[#00f5a0]/20 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#00f5a0] flex items-center space-x-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00f5a0]" />
                        <span>Key Deliverable</span>
                      </span>
                      <p className="text-xs text-[#ededed] leading-relaxed font-mono">
                        {step.deliverable}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#38bdf8]/[0.03] border border-[#38bdf8]/20 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8]">
                        Frontend Engineering Focus
                      </span>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        {step.frontendFocus}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[#a855f7]/[0.03] border border-[#a855f7]/20 space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#a855f7]">
                        AI &amp; Systems Architecture Focus
                      </span>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed">
                        {step.aiFocus}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
