"use client";

import * as React from "react";
import { Project } from "@/lib/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, AlertTriangle, Cpu, Layers } from "lucide-react";
import { Github } from "@/components/icons";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[88vh] overflow-y-auto bg-[#0a0c0f] border-white/[0.12] p-6 sm:p-8">
        <DialogHeader className="pb-4 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="accent" className="font-mono text-xs">
              {project.category}
            </Badge>
            <Badge variant="subtle" className="font-mono text-xs">
              {project.year}
            </Badge>
            {project.featured && (
              <Badge variant="secondary" className="font-mono text-xs bg-[#00f5a0]/15 text-[#00f5a0] border-[#00f5a0]/30">
                ★ Primary Case Study
              </Badge>
            )}
          </div>
          <DialogTitle className="text-2xl sm:text-3xl text-white font-bold tracking-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-[#8e94a0] pt-1">
            {project.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#00f5a0] mb-1.5">
              Project Overview
            </h4>
            <p className="text-sm text-[#ededed] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#12151b] border border-white/[0.08] space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>The Core Problem</span>
              </span>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#12151b] border border-[#00f5a0]/20 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#00f5a0] flex items-center space-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>The Engineered Solution</span>
              </span>
              <p className="text-xs sm:text-sm text-[#ededed] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Flow */}
          {project.architectureFlow && (
            <div className="p-5 rounded-xl bg-[#111419] border border-white/[0.08]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/[0.7] mb-3 flex items-center space-x-2">
                <Layers className="h-4 w-4 text-[#00f5a0]" />
                <span>System & Data Flow</span>
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {project.architectureFlow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#ededed]">
                      {step}
                    </div>
                    {idx < project.architectureFlow.length - 1 && (
                      <span className="text-white/[0.3] font-mono">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* My Contribution & Technical Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/[0.7] mb-3">
                My Direct Contribution
              </h4>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                {project.myContribution}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/[0.7] mb-3">
                Key Technical Challenges
              </h4>
              <ul className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                {project.technicalChallenges.map((challenge, i) => (
                  <li key={i} className="text-xs text-[#a1a1aa] flex items-start space-x-2">
                    <span className="text-[#00f5a0] font-mono mt-0.5">▸</span>
                    <span className="leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Measurable Results */}
          <div className="p-5 rounded-xl bg-[#00f5a0]/[0.04] border border-[#00f5a0]/20">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#00f5a0] mb-3 flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />
              <span>Measurable Results & Outcomes</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.results.map((res, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#0a0c0f] border border-white/[0.06] text-xs text-[#ededed] leading-relaxed">
                  {res}
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet if present */}
          {project.codeSnippet && (
            <div className="rounded-xl border border-white/[0.08] bg-[#0d0f12] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06] text-xs font-mono text-[#8e94a0]">
                <span>{project.codeSnippet.caption}</span>
                <span className="text-[10px] text-[#00f5a0] uppercase">{project.codeSnippet.language}</span>
              </div>
              <pre className="p-4 text-xs font-mono text-[#ededed] overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Technologies Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/[0.7] mb-2.5">
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Badge key={t} variant="subtle" className="font-mono text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" size="sm" className="text-xs">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" /> Source Code
              </a>
            </Button>
            <Button asChild variant="default" size="sm" className="text-xs font-semibold">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Prototype <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs text-[#8e94a0]"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
