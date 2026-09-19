"use client";

import * as React from "react";
import { PROJECTS } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { Badge } from "@/components/ui/badge";

const CATEGORIES: readonly ("All" | ProjectCategory)[] = [
  "All",
  "AI",
  "Frontend",
  "Experiments",
] as const;

export function Projects() {
  const [selectedCategory, setSelectedCategory] = React.useState<"All" | ProjectCategory>("All");
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenCaseStudy = (project: Project) => {
    setActiveProject(project);
    setDialogOpen(true);
  };

  // Divide for asymmetric layout
  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section id="work" className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <Badge variant="accent" className="mb-3">
            Featured Engineering
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Selected <span className="text-gradient">Work</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-2xl leading-relaxed">
            In-depth case studies of production AI systems, low-latency streaming interfaces, and enterprise frontend architecture.
          </p>

          {/* Category Filter Tabs with Accessibility Semantics */}
          <div className="mt-8">
            <div
              role="tablist"
              aria-label="Project categories"
              className="inline-flex rounded-full bg-[#0e1116] p-1.5 border border-white/[0.08]"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0] ${
                      isSelected
                        ? "bg-[#00f5a0] text-[#08090a] font-semibold shadow-[0_0_15px_rgba(0,245,160,0.25)]"
                        : "text-[#8e94a0] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Asymmetric Project Layout */}
        {filteredProjects.length > 0 && (
          <div className="space-y-6">
            {/* Top Asymmetric Section: Large on Left, Stacked on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Large Featured Project */}
              {featuredProject && (
                <div className="lg:col-span-7 flex">
                  <ProjectCard
                    project={featuredProject}
                    isLarge={true}
                    onSelect={handleOpenCaseStudy}
                  />
                </div>
              )}

              {/* Stacked Secondary Projects */}
              <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                {secondaryProjects.slice(0, 2).map((project) => (
                  <div key={project.id} className="flex-1">
                    <ProjectCard
                      project={project}
                      isLarge={false}
                      onSelect={handleOpenCaseStudy}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Remaining Projects in 2-column Grid */}
            {secondaryProjects.length > 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {secondaryProjects.slice(2).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isLarge={false}
                    onSelect={handleOpenCaseStudy}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Case Study Dialog Modal */}
        <ProjectDialog
          project={activeProject}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </section>
  );
}
