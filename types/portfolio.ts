import type { ComponentType } from "react";

export type ProjectCategory = "AI" | "Frontend" | "Experiments";

export interface ProjectCodeSnippet {
  language: string;
  code: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  tags: string[];
  year: string;
  featured?: boolean;
  summary: string;
  problem: string;
  solution: string;
  myContribution: string;
  technicalChallenges: string[];
  results: string[];
  architectureFlow: string[];
  codeSnippet?: ProjectCodeSnippet;
  githubUrl: string;
  liveUrl: string;
  accentColor: string;
}

export type ExperienceType = "AI Engineering" | "Frontend Engineering";

export interface ExperienceItem {
  id: string;
  role: string;
  duration: string;
  period: string;
  summary: string;
  type: ExperienceType;
  responsibilities: string[];
  keyWins: string[];
  technologies: string[];
}

export type SkillCategoryType = "AI Engineering" | "Frontend Engineering" | "Core Engineering";

export interface SkillItem {
  name: string;
  category: SkillCategoryType;
  context: string;
  details: string;
  tag: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  skills: SkillItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  icon: ComponentType<{ className?: string }>;
  goal: string;
  frontendFocus: string;
  aiFocus: string;
  deliverable: string;
}

export interface PipelineNode {
  id: string;
  name: string;
  sub: string;
  icon: ComponentType<{ className?: string }>;
  metric: string;
}

export interface RepositoryItem {
  name: string;
  desc: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  tag: string;
  url: string;
}
