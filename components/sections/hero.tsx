"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Terminal, Cpu, Database, Layout, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PipelineNode } from "@/types";


const PIPELINE_NODES: PipelineNode[] = [
  { id: "user", name: "User", sub: "Input & Intent", icon: Terminal, metric: "0ms" },
  { id: "interface", name: "Interface", sub: "Speculative UX", icon: Layout, metric: "8ms" },
  { id: "ai", name: "AI Engine", sub: "LLM / Agent", icon: Cpu, metric: "140ms" },
  { id: "data", name: "Data", sub: "Vector & RAG", icon: Database, metric: "32ms" },
  { id: "result", name: "Result", sub: "Streaming Output", icon: CheckCircle2, metric: "60 FPS" },
];

export function Hero() {
  const [activeNode, setActiveNode] = React.useState<string>("ai");
  const activeNodeData = PIPELINE_NODES.find((n) => n.id === activeNode) ?? PIPELINE_NODES[2];

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] pt-28 pb-20 flex flex-col justify-center items-center overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-[#0f1216]/80 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5a0]" />
          </span>
          <span className="text-xs font-mono text-[#a1a1aa] tracking-tight">
            Open to interesting opportunities
          </span>
        </div>

        {/* Dual Roles Badge */}
        <div className="flex items-center justify-center space-x-3 mb-5">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/30 px-3 py-1 rounded-md">
            AI Engineer
          </span>
          <span className="text-white/[0.2] font-mono">×</span>
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#ededed] bg-white/[0.04] border border-white/[0.1] px-3 py-1 rounded-md">
            Frontend Engineer
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-5">
          I build <span className="text-gradient">intelligent interfaces</span> for the web.
        </h1>

        {/* Supporting Narrative */}
        <p className="text-base sm:text-lg lg:text-xl text-white/95 font-medium max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          AI Engineer with 7 months of experience building AI-powered applications, backed by 3 years of frontend engineering experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6 z-20">
          <Button
            asChild
            size="lg"
            variant="default"
            className="w-full sm:w-auto group text-sm font-semibold h-12 px-7"
          >
            <Link href="#work">
              Explore My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-sm font-medium h-12 px-7 border-white/[0.15] hover:border-[#00f5a0]/40"
          >
            <Link href="#contact">
              Let&apos;s Connect
            </Link>
          </Button>
        </div>

        {/* 3D Interactive AI Core Focal Viewport */}
        <div className="w-full max-w-2xl h-[340px] sm:h-[400px] my-4 relative flex items-center justify-center pointer-events-none">
          {/* Subtle Outer Holographic Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-[#00f5a0]/15 animate-spin [animation-duration:40s]" />
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-0 bg-radial from-[#00f5a0]/[0.06] via-transparent to-transparent" />
          </div>

          {/* Ethereal Floating Status Badge */}
          <div className="absolute bottom-2 z-10 px-3 py-1 rounded-full border border-white/[0.08] bg-[#0c0e11]/60 backdrop-blur-md flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00f5a0] animate-ping" />
            <span className="text-[10px] font-mono text-[#a1a1aa] tracking-wider uppercase">
              Living 3D Environment • Scroll to Journey
            </span>
          </div>
        </div>

        {/* System Pipeline Architecture Telemetry Bar */}
        <div className="w-full max-w-3xl mt-4">
          <div className="relative p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c0e11]/85 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] text-left">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00f5a0]/80" />
                <span className="text-xs font-mono font-medium text-white tracking-wider uppercase">
                  System Pipeline Architecture
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8e94a0]">
                Interactive Flow • Click nodes to inspect
              </span>
            </div>

            {/* Nodes Container */}
            <div
              role="tablist"
              aria-label="System Pipeline Architecture Stages"
              className="grid grid-cols-5 gap-2 sm:gap-3"
            >
              {PIPELINE_NODES.map((node, index) => {
                const Icon = node.icon;
                const isActive = activeNode === node.id;
                return (
                  <button
                    key={node.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${node.name} pipeline stage: ${node.sub}`}
                    onClick={() => setActiveNode(node.id)}
                    className={`relative flex flex-col items-center p-2.5 sm:p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0] ${
                      isActive
                        ? "bg-[#00f5a0]/[0.08] border-[#00f5a0]/60 shadow-[0_0_20px_rgba(0,245,160,0.15)]"
                        : "bg-[#111418]/60 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#15191f]"
                    }`}
                  >
                    {/* Flow arrow between nodes on desktop */}
                    {index < PIPELINE_NODES.length - 1 && (
                      <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/[0.2] z-20 pointer-events-none" aria-hidden="true">
                        →
                      </div>
                    )}

                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                        isActive
                          ? "bg-[#00f5a0] text-[#08090a]"
                          : "bg-white/[0.06] text-[#a1a1aa]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-xs font-semibold text-white truncate max-w-full">
                      {node.name}
                    </span>
                    <span className="text-[10px] text-[#8e94a0] truncate hidden sm:block">
                      {node.sub}
                    </span>
                    <span
                      className={`text-[9px] font-mono mt-1 px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-[#00f5a0]/20 text-[#00f5a0]"
                          : "bg-white/[0.04] text-[#71717a]"
                      }`}
                    >
                      {node.metric}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Node Detail Bar */}
            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-left">
              <div className="flex items-center space-x-2">
                <span className="text-[#8e94a0]">Current Focus:</span>
                <span className="font-mono text-[#00f5a0]">
                  {activeNodeData.name}
                </span>
                <span className="text-white/[0.2]">•</span>
                <span className="text-[#8e94a0]">
                  {activeNodeData.sub}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#00f5a0]/80 bg-[#00f5a0]/10 px-2 py-0.5 rounded">
                Telemetry: {activeNodeData.metric}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
