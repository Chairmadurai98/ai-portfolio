"use client";

import * as React from "react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/icons";

interface ProjectCardProps {
  project: Project;
  isLarge?: boolean;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, isLarge = false, onSelect }: ProjectCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const sheenRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;

    if (sheenRef.current) {
      sheenRef.current.style.opacity = "1";
      sheenRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 245, 160, 0.12), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    if (sheenRef.current) {
      sheenRef.current.style.opacity = "0";
    }
  };

  if (isLarge) {
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full transition-transform duration-200 ease-out will-change-transform"
      >
        <Card
          glowOnHover
          className="group relative overflow-hidden bg-[#0c0e11]/90 border-white/[0.1] h-full flex flex-col justify-between shadow-2xl"
        >
          {/* Dynamic Interactive Specular Sheen */}
          <div
            ref={sheenRef}
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 z-30"
          />

          {/* Subtle top accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f5a0] via-[#0df2c8] to-transparent opacity-80" />

          <div>
            {/* Card Top Meta */}
            <div className="p-6 sm:p-8 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="accent" className="font-mono text-xs">
                    {project.category}
                  </Badge>
                  <Badge variant="subtle" className="font-mono text-xs">
                    {project.year}
                  </Badge>
                </div>
                <span className="text-[11px] font-mono text-[#00f5a0] flex items-center space-x-1 bg-[#00f5a0]/10 px-2.5 py-1 rounded-full border border-[#00f5a0]/30">
                  <Sparkles className="h-3 w-3" />
                  <span>Featured Project</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-[#00f5a0] transition-colors mb-2">
                {project.title}
              </h3>

              <p className="text-sm sm:text-base text-[#8e94a0] leading-relaxed mb-6">
                {project.subtitle}
              </p>

              {/* Interactive Architecture Mockup / Visual Window */}
              <div className="relative rounded-xl border border-white/[0.08] bg-[#090b0e] p-5 mb-6 overflow-hidden group-hover:border-[#00f5a0]/30 transition-colors">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-xs font-mono text-[#71717a]">
                  <div className="flex items-center space-x-1.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500/70" />
                    <div className="h-2 w-2 rounded-full bg-amber-500/70" />
                    <div className="h-2 w-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-white/[0.4]">streaming-copilot-engine.ts</span>
                  </div>
                  <span className="text-[#00f5a0]">TTFT: 140ms</span>
                </div>

                {/* Visual simulated stream */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-[#71717a]">{"// Speculative Token Interpolator & SSE Buffer"}</div>
                  <div className="text-[#ededed]">
                    <span className="text-[#00f5a0]">stream</span>.on(<span className="text-amber-300">&apos;token&apos;</span>, (chunk) =&gt; &#123;
                  </div>
                  <div className="pl-4 text-[#a1a1aa]">
                    optimisticDispatch(chunk.delta);
                    <span className="inline-block w-1.5 h-3.5 bg-[#00f5a0] ml-1 animate-pulse" />
                  </div>
                  <div className="text-[#ededed]">&#125;);</div>
                </div>

                {/* Data Flow Tags */}
                <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center gap-1.5">
                  {project.architectureFlow.slice(0, 3).map((step, idx) => (
                    <span key={idx} className="text-[10px] font-mono text-[#8e94a0] bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.04]">
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem & Solution Quick Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400">
                    The Problem
                  </span>
                  <p className="text-xs text-[#8e94a0] mt-1 line-clamp-2">
                    {project.problem}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-[#00f5a0]/20">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00f5a0]">
                    The Solution
                  </span>
                  <p className="text-xs text-[#ededed] mt-1 line-clamp-2">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Result Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.results.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-1.5 text-xs text-[#ededed] bg-[#00f5a0]/[0.05] border border-[#00f5a0]/20 px-3 py-1 rounded-md"
                  >
                    <CheckCircle2 className="h-3 w-3 text-[#00f5a0]" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tech) => (
                  <Badge key={tech} variant="subtle" className="text-[11px] font-mono">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 sm:p-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <Button
              variant="default"
              size="sm"
              onClick={() => onSelect(project)}
              className="text-xs font-semibold"
            >
              Read Full Case Study
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>

            <div className="flex items-center space-x-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-[#8e94a0] hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-[#8e94a0] hover:text-[#00f5a0] rounded-lg hover:bg-white/[0.06] transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Compact / Stacked 3D Tilt Card
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full transition-transform duration-200 ease-out will-change-transform"
    >
      <Card
        glowOnHover
        className="group relative overflow-hidden bg-[#0c0e11]/85 border-white/[0.08] flex flex-col justify-between h-full shadow-xl"
      >
        {/* Dynamic Interactive Specular Sheen */}
        <div
          ref={sheenRef}
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 z-30"
        />

        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2">
              <Badge variant="accent" className="font-mono text-[11px]">
                {project.category}
              </Badge>
              <Badge variant="subtle" className="font-mono text-[11px]">
                {project.year}
              </Badge>
            </div>
            <span className="text-[10px] font-mono text-[#8e94a0]">Case Study</span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00f5a0] transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#8e94a0] leading-relaxed mb-4 line-clamp-2">
            {project.subtitle}
          </p>

          {/* Quick Result Highlight */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] mb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#00f5a0]">
              Key Outcome
            </span>
            <p className="text-xs text-[#ededed] mt-0.5 truncate">
              {project.results[0]}
            </p>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="subtle" className="text-[10px] font-mono">
                {tech}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-[10px] font-mono text-[#71717a]">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelect(project)}
            className="text-xs text-[#00f5a0] hover:text-[#0df2c8] p-0 h-auto"
          >
            View Details <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>

          <div className="flex items-center space-x-1.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-[#8e94a0] hover:text-white rounded-md hover:bg-white/[0.06]"
              aria-label="GitHub Repository"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-[#8e94a0] hover:text-[#00f5a0] rounded-md hover:bg-white/[0.06]"
              aria-label="Live Demo"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
