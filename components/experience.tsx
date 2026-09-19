"use client";

import * as React from "react";
import { EXPERIENCES, ExperienceItem } from "@/lib/experience";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Sparkles, Terminal } from "lucide-react";

export function Experience() {
  const [selectedId, setSelectedId] = React.useState<string>(EXPERIENCES[0].id);

  return (
    <section id="experience" className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="accent" className="mb-3">
            Career Timeline
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Engineering <span className="text-gradient">Trajectory</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-2xl leading-relaxed">
            3 years of rigorous frontend engineering evolved into 7 months of cutting-edge AI systems engineering.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Center/Side Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#00f5a0] via-white/[0.15] to-transparent" />

          <div className="space-y-12 lg:space-y-16">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Center Node on Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                    <div className="h-10 w-10 rounded-full border border-[#00f5a0]/50 bg-[#08090a] flex items-center justify-center shadow-[0_0_15px_rgba(0,245,160,0.3)]">
                      {index === 0 ? (
                        <Sparkles className="h-4 w-4 text-[#00f5a0]" />
                      ) : (
                        <Terminal className="h-4 w-4 text-[#38bdf8]" />
                      )}
                    </div>
                  </div>

                  {/* Content Card Side */}
                  <div className="w-full lg:w-[calc(50%-40px)]">
                    <Card
                      glowOnHover
                      className="bg-[#0c0e11]/85 border-white/[0.08] overflow-hidden"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <Badge
                            variant={index === 0 ? "accent" : "secondary"}
                            className="font-mono text-xs px-3 py-1"
                          >
                            {exp.duration}
                          </Badge>
                          <div className="flex items-center text-xs font-mono text-[#8e94a0] space-x-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{exp.period}</span>
                          </div>
                        </div>

                        <CardTitle className="text-2xl text-white">
                          {exp.role}
                        </CardTitle>
                        <CardDescription className="text-sm text-[#8e94a0]">
                          {exp.summary}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Core Responsibilities */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-white/[0.6] mb-3">
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#a1a1aa]">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start space-x-2.5">
                                <span className="text-[#00f5a0] text-sm mt-0.5 shrink-0">
                                  ▸
                                </span>
                                <span className="leading-relaxed">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Measurable Achievements */}
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#00f5a0] mb-2.5 flex items-center space-x-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Measurable Impact</span>
                          </h4>
                          <ul className="space-y-2 text-xs text-[#ededed]">
                            {exp.keyWins.map((win, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span className="text-[#00f5a0] font-mono">•</span>
                                <span className="leading-relaxed">{win}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-white/[0.6] mb-2.5">
                            Technologies & Tools
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="subtle"
                                className="text-[11px] font-mono"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Empty side for symmetry */}
                  <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
