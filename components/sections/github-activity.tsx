import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star, GitFork, ExternalLink, GitCommit } from "lucide-react";
import { Github } from "@/components/icons";
import type { RepositoryItem } from "@/types";

const REPOSITORIES: RepositoryItem[] = [
  {
    name: "streaming-sse-buffer",
    desc: "Lightweight speculative token buffer & state machine for Server-Sent Events in React.",
    stars: 128,
    forks: 14,
    language: "TypeScript",
    languageColor: "#3178c6",
    tag: "AI / Streaming",
    url: "https://github.com",
  },
  {
    name: "vector-similarity-canvas",
    desc: "Interactive 2D HTML5 canvas visualizer for high-dimensional vector embeddings and cosine distance.",
    stars: 89,
    forks: 11,
    language: "TypeScript",
    languageColor: "#3178c6",
    tag: "Vector DB",
    url: "https://github.com",
  },
  {
    name: "headless-token-system",
    desc: "Figma-to-Tailwind automated design token compiler with zero-runtime CSS generation.",
    stars: 64,
    forks: 8,
    language: "JavaScript",
    languageColor: "#f7df1e",
    tag: "Design System",
    url: "https://github.com",
  },
];

// Generate realistic commit heatmap blocks (52 weeks x 7 days)
const WEEKS_COUNT = 38;
const DAYS_PER_WEEK = 7;

function generateDeterministicHeatmap(): number[][] {
  let seed = 1337;
  const nextRand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const matrix: number[][] = [];
  for (let w = 0; w < WEEKS_COUNT; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      const isWeekend = d === 0 || d === 6;
      const base = isWeekend ? 0.15 : 0.65;
      const rand = nextRand();
      let level = 0;
      if (rand < base * 0.4) level = 1;
      else if (rand < base * 0.75) level = 2;
      else if (rand < base) level = 3;
      else if (rand < base * 1.1) level = 4;
      week.push(level);
    }
    matrix.push(week);
  }
  return matrix;
}

const HEATMAP_MATRIX = generateDeterministicHeatmap();

function getCellColor(level: number) {
  switch (level) {
    case 1:
      return "bg-[#00f5a0]/20 border-[#00f5a0]/30";
    case 2:
      return "bg-[#00f5a0]/40 border-[#00f5a0]/50";
    case 3:
      return "bg-[#00f5a0]/70 border-[#00f5a0]/80";
    case 4:
      return "bg-[#00f5a0] border-[#0df2c8] shadow-[0_0_8px_rgba(0,245,160,0.4)]";
    default:
      return "bg-white/[0.03] border-white/[0.04]";
  }
}

// Server Component: zero client JS shipped for this section
export function GitHubActivity() {
  return (
    <section className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <Badge variant="subtle" className="mb-3 font-mono text-xs">
            Open Source &amp; Code
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Engineering <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-2xl leading-relaxed">
            Consistent craft across open-source experiments, AI utility libraries, and frontend component architecture.
          </p>
        </div>

        {/* Heatmap Matrix Card */}
        <Card className="bg-[#0c0e11]/85 border-white/[0.08] p-6 sm:p-8 mb-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  GitHub Contribution Activity
                </h3>
                <p className="text-xs text-[#8e94a0]">
                  Public repositories &amp; open-source commits
                </p>
              </div>
            </div>

            <Button asChild variant="outline" size="sm" className="text-xs self-start sm:self-auto border-white/[0.12]">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                View GitHub Profile <ExternalLink className="ml-1.5 h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Matrix Visualization */}
          <div className="py-6 overflow-x-auto">
            <div className="min-w-[680px]">
              <div className="flex gap-1.5 justify-between">
                {HEATMAP_MATRIX.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((level, dIdx) => (
                      <div
                        key={dIdx}
                        className={`h-3 w-3 rounded-sm border transition-colors ${getCellColor(
                          level
                        )}`}
                        title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Level ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between mt-4 text-[11px] font-mono text-[#8e94a0]">
                <span>Past 9 Months of Continuous Delivery</span>
                <div className="flex items-center space-x-1.5">
                  <span>Less</span>
                  <span className="h-2.5 w-2.5 rounded-sm bg-white/[0.04] border border-white/[0.05]" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#00f5a0]/30" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#00f5a0]/60" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#00f5a0]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REPOSITORIES.map((repo) => (
            <Card
              key={repo.name}
              glowOnHover
              className="bg-[#0c0e11]/70 border-white/[0.08] flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-[#8e94a0]">
                    <GitCommit className="h-3.5 w-3.5 text-[#00f5a0]" />
                    <span>Public</span>
                  </div>
                  <Badge variant="subtle" className="text-[10px] font-mono">
                    {repo.tag}
                  </Badge>
                </div>
                <CardTitle className="text-base text-white hover:text-[#00f5a0] transition-colors">
                  <a href={repo.url} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5">
                    <span>{repo.name}</span>
                    <ExternalLink className="h-3 w-3 text-[#8e94a0]" />
                  </a>
                </CardTitle>
                <CardDescription className="text-xs text-[#8e94a0] pt-1 leading-relaxed">
                  {repo.desc}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2 border-t border-white/[0.04]">
                <div className="flex items-center justify-between text-xs text-[#8e94a0] font-mono">
                  <div className="flex items-center space-x-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-amber-400" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="h-3 w-3" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
