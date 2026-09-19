export interface ExperienceItem {
  id: string;
  role: string;
  duration: string;
  period: string;
  summary: string;
  type: "AI Engineering" | "Frontend Engineering";
  responsibilities: string[];
  keyWins: string[];
  technologies: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "ai-engineer",
    role: "AI Engineer",
    duration: "7 Months",
    period: "Recent 7 Months — Present",
    type: "AI Engineering",
    summary:
      "Specializing in production LLM applications, agentic workflows, and bridging complex model capabilities into responsive, intuitive user interfaces.",
    responsibilities: [
      "Architect and build end-to-end AI applications leveraging LLM APIs, prompt engineering, and structured JSON output schemas.",
      "Design and deploy Retrieval-Augmented Generation (RAG) pipelines with hybrid search (dense embeddings + BM25 keyword matching) and vector databases.",
      "Pioneer low-latency streaming UX patterns (Server-Sent Events, WebSockets) with speculative UI updates and graceful fallback states.",
      "Develop autonomous multi-agent tool-calling systems with guardrails, human-in-the-loop controls, and cycle prevention.",
      "Audit model inference latency, token economics, and response quality using systematic evaluation benchmarks."
    ],
    keyWins: [
      "Cut end-to-end perceived AI latency by 70% by designing streaming state machines and speculative UI states.",
      "Shipped 4 production AI feature modules used by thousands of daily active users.",
      "Designed an automated RAG evaluation framework that improved context retrieval precision by 32%."
    ],
    technologies: [
      "LLM APIs",
      "RAG Systems",
      "AI Agents",
      "Vector Databases",
      "Prompt Engineering",
      "Next.js",
      "TypeScript",
      "LangChain",
      "SSE / WebSockets"
    ]
  },
  {
    id: "frontend-engineer",
    role: "Frontend Developer",
    duration: "3 Years",
    period: "3 Years Prior",
    type: "Frontend Engineering",
    summary:
      "Engineered large-scale React and Next.js web applications, building robust design systems, performant interfaces, and accessible digital products.",
    responsibilities: [
      "Architected and maintained mission-critical web applications with Next.js (App & Pages Router), TypeScript, and Tailwind CSS.",
      "Created modular, accessible component libraries and design systems adhering to WCAG 2.1 AAA accessibility guidelines.",
      "Optimized browser rendering performance, Core Web Vitals (LCP, FID, CLS), and reduced JavaScript bundle sizes through strategic code-splitting.",
      "Implemented real-time data synchronization with WebSockets, optimistic UI updates, and client-side caching (TanStack Query / SWR).",
      "Partnered with product managers and UX designers to transform ambiguous feature specs into polished, pixel-perfect user experiences."
    ],
    keyWins: [
      "Scaled a core enterprise dashboard from 10k to 250k+ monthly active users without UI performance degradation.",
      "Reduced bundle size by 42% through tree-shaking, lazy loading, and custom lightweight UI primitives.",
      "Mentored junior developers and established frontend coding standards, linting rules, and CI testing pipelines."
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "State Management",
      "REST & GraphQL",
      "Git / CI/CD",
      "Web Performance"
    ]
  }
];
