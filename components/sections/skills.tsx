"use client";

import * as React from "react";
import { SKILL_CATEGORIES } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Code2, Cpu, Database, Info } from "lucide-react";

export function Skills() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const filteredCategories =
    selectedCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="accent" className="mb-3">
            Technical Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Skills &amp; <span className="text-gradient">Specializations</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-2xl leading-relaxed">
            No arbitrary percentage bars. Hover over any skill to inspect practical production applications, architectures, and implementation context.
          </p>

          {/* Category Filter Pills with a11y tablist */}
          <div
            role="tablist"
            aria-label="Skill domains"
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            <button
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0] ${
                selectedCategory === "all"
                  ? "bg-[#00f5a0] text-[#08090a] font-semibold shadow-[0_0_15px_rgba(0,245,160,0.2)]"
                  : "bg-[#101317] text-[#8e94a0] border border-white/[0.08] hover:text-white hover:border-white/[0.2]"
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0] ${
                    isSelected
                      ? "bg-[#00f5a0] text-[#08090a] font-semibold shadow-[0_0_15px_rgba(0,245,160,0.2)]"
                      : "bg-[#101317] text-[#8e94a0] border border-white/[0.08] hover:text-white hover:border-white/[0.2]"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid by Domain */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <Card
              key={cat.id}
              className="bg-[#0c0e11]/85 border-white/[0.08] flex flex-col justify-between"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {cat.id === "ai" && <Cpu className="h-5 w-5 text-[#00f5a0]" />}
                    {cat.id === "frontend" && <Code2 className="h-5 w-5 text-[#38bdf8]" />}
                    {cat.id === "core" && <Database className="h-5 w-5 text-[#a855f7]" />}
                    <CardTitle className="text-xl text-white">
                      {cat.title}
                    </CardTitle>
                  </div>
                  <Badge variant="accent" className="font-mono text-[11px]">
                    {cat.badge}
                  </Badge>
                </div>
                <CardDescription className="text-xs text-[#8e94a0]">
                  {cat.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cat.skills.map((skill) => (
                    <HoverCard key={skill.name}>
                      <HoverCardTrigger asChild>
                        <div className="group p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#00f5a0]/40 hover:bg-[#00f5a0]/[0.04] transition-all cursor-pointer flex flex-col justify-between h-20">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white group-hover:text-[#00f5a0] transition-colors truncate">
                              {skill.name}
                            </span>
                            <Info className="h-3 w-3 text-white/[0.2] group-hover:text-[#00f5a0]" />
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-[#8e94a0] truncate max-w-[120px]">
                              {skill.context}
                            </span>
                            <span className="text-[9px] font-mono text-[#00f5a0]/80 bg-[#00f5a0]/10 px-1.5 py-0.5 rounded">
                              {skill.tag}
                            </span>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 p-4 bg-[#111419] border-white/[0.12] shadow-2xl">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-white">
                              {skill.name}
                            </h4>
                            <Badge variant="accent" className="text-[10px] font-mono">
                              {skill.tag}
                            </Badge>
                          </div>
                          <p className="text-xs font-mono text-[#00f5a0]">
                            {skill.context}
                          </p>
                          <p className="text-xs text-[#8e94a0] leading-relaxed pt-1">
                            {skill.details}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
