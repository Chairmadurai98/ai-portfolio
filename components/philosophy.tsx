"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

const PRINCIPLES = [
  {
    num: "01",
    title: "Build for the user",
    desc: "AI is an amplifier for human capability, not an excuse to ignore ergonomic fundamentals. If the user feels alienated, the system fails."
  },
  {
    num: "02",
    title: "Keep interfaces simple",
    desc: "Complexity belongs in the background orchestration layer. The interface should feel calm, deterministic, and intuitive."
  },
  {
    num: "03",
    title: "Use AI where it creates real value",
    desc: "Never shoehorn an LLM where deterministic code or a standard UI component is faster, cheaper, and more reliable."
  },
  {
    num: "04",
    title: "Prioritize performance",
    desc: "Latency is the silent killer of AI adoption. 100ms perceptual response times transform skeptical users into delighted advocates."
  },
  {
    num: "05",
    title: "Build reusable systems",
    desc: "Invest in design tokens, type-safe API contracts, and modular tool registries. Great architecture scales without linear effort."
  },
  {
    num: "06",
    title: "Ship and iterate",
    desc: "True insight happens when real users collide with your software. Deploy early, observe telemetry rigorously, and polish relentlessly."
  }
];

export function Philosophy() {
  return (
    <section className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="subtle" className="mb-3 font-mono text-xs">
            Guiding Principles
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight mb-4">
            &ldquo;Technology is only useful when people can use it.&rdquo;
          </h2>
          <p className="text-base text-[#8e94a0] max-w-xl leading-relaxed">
            The convictions that guide how I balance AI model capability with interface craftsmanship.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRINCIPLES.map((item) => (
            <div
              key={item.num}
              className="p-6 rounded-2xl border border-white/[0.06] bg-[#0c0e11]/50 backdrop-blur-sm relative group hover:border-[#00f5a0]/30 transition-all duration-300"
            >
              <span className="font-mono text-xs font-bold text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/25 px-2 py-0.5 rounded-md mb-4 inline-block">
                {item.num}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00f5a0] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#8e94a0] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
