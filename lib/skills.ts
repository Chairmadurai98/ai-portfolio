export interface SkillItem {
  name: string;
  category: "AI Engineering" | "Frontend Engineering" | "Core Engineering";
  context: string;
  details: string;
  tag: string;
}

export const SKILL_CATEGORIES = [
  {
    id: "ai",
    title: "AI Engineering",
    badge: "7 Months Focus",
    description: "Building production-grade LLM applications, retrieval pipelines, and agentic workflows.",
    skills: [
      {
        name: "LLM Applications",
        category: "AI Engineering",
        context: "Production Copilots & Chat Systems",
        details: "Building streaming LLM frontends, token buffers, speculative UI states, and fallback orchestrations.",
        tag: "Core Focus"
      },
      {
        name: "Generative AI",
        category: "AI Engineering",
        context: "Multimodal & Text Synthesis",
        details: "Harnessing modern foundation models for real-time text transformation, summarization, and vision analysis.",
        tag: "In Production"
      },
      {
        name: "RAG",
        category: "AI Engineering",
        context: "Retrieval-Augmented Generation",
        details: "Hybrid search combining dense vector embeddings with BM25 sparse keyword search, reranking, and chunk optimization.",
        tag: "High Priority"
      },
      {
        name: "AI Agents",
        category: "AI Engineering",
        context: "Autonomous & Multi-Agent Loops",
        details: "State machines, tool-calling pipelines, guardrail verification, and human-in-the-loop approvals.",
        tag: "Specialized"
      },
      {
        name: "Prompt Engineering",
        category: "AI Engineering",
        context: "System Prompts & Structured Outputs",
        details: "Few-shot prompting, chain-of-thought elicitation, structured JSON schema enforcement, and eval harnesses.",
        tag: "Daily Practice"
      },
      {
        name: "AI APIs",
        category: "AI Engineering",
        context: "OpenAI, Anthropic, Gemini, Groq",
        details: "Integrating leading model provider SDKs, streaming SSE endpoints, function calling, and token rate management.",
        tag: "Integration"
      },
      {
        name: "Vector Databases",
        category: "AI Engineering",
        context: "Chroma, Pinecone, pgvector",
        details: "Indexing embeddings, cosine & dot-product distance metrics, namespace partitioning, and fast metadata filtering.",
        tag: "Infrastructure"
      },
      {
        name: "AI Automation",
        category: "AI Engineering",
        context: "Automated Workflows & Pipelines",
        details: "Event-driven AI pipelines for automated document parsing, classification, code review, and data enrichment.",
        tag: "Automation"
      }
    ] as SkillItem[]
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    badge: "3 Years Foundation",
    description: "Architecting high-performance, accessible, and beautifully polished web applications.",
    skills: [
      {
        name: "React",
        category: "Frontend Engineering",
        context: "React 18 & 19 Ecosystem",
        details: "Custom hooks, Concurrent Mode, server/client boundary management, Suspense, and state optimization.",
        tag: "Expertise"
      },
      {
        name: "Next.js",
        category: "Frontend Engineering",
        context: "App Router & Server Components",
        details: "Streaming SSR, Server Actions, Route Handlers, edge runtime, and fine-tuned caching strategies.",
        tag: "Primary Framework"
      },
      {
        name: "TypeScript",
        category: "Frontend Engineering",
        context: "Strict Type Safety",
        details: "Generics, utility types, discriminated unions, and end-to-end type safety between API and UI.",
        tag: "Everyday Standard"
      },
      {
        name: "JavaScript",
        category: "Frontend Engineering",
        context: "Modern ECMAScript & Web APIs",
        details: "Async iterators, Web Streams, Web Workers, Event Loop ergonomics, and DOM performance.",
        tag: "Foundational"
      },
      {
        name: "HTML5 & Semantic Web",
        category: "Frontend Engineering",
        context: "Semantic Structure & A11y",
        details: "WCAG 2.1 AAA compliance, ARIA attributes, semantic hierarchy, and screen-reader accessibility.",
        tag: "Accessibility"
      },
      {
        name: "CSS & Modern Layouts",
        category: "Frontend Engineering",
        context: "Grid, Flexbox, Container Queries",
        details: "Sub-pixel precision layouts, fluid typography, responsive ergonomics, and CSS variables.",
        tag: "Styling"
      },
      {
        name: "Tailwind CSS",
        category: "Frontend Engineering",
        context: "Design Systems & Utility Architecture",
        details: "Custom design token palettes, Tailwind v4 theme engines, micro-animations, and responsive patterns.",
        tag: "Design System"
      },
      {
        name: "UI/UX Implementation",
        category: "Frontend Engineering",
        context: "Micro-interactions & Polish",
        details: "Transforming design intent into fluid, responsive interfaces with thoughtful hover states and micro-animations.",
        tag: "Product Craft"
      }
    ] as SkillItem[]
  },
  {
    id: "core",
    title: "Core Engineering",
    badge: "Full Cycle Delivery",
    description: "Reliable engineering practices for deploying, monitoring, and scaling modern systems.",
    skills: [
      {
        name: "REST APIs",
        category: "Core Engineering",
        context: "API Design & Streaming Endpoints",
        details: "Designing clean RESTful conventions, SSE streaming, error schemas, and OpenAPI documentation.",
        tag: "API Architecture"
      },
      {
        name: "Git & Version Control",
        category: "Core Engineering",
        context: "Collaborative Workflows",
        details: "Trunk-based development, semantic commits, code review hygiene, and interactive rebasing.",
        tag: "Collaboration"
      },
      {
        name: "Databases",
        category: "Core Engineering",
        context: "PostgreSQL, Redis, Vector Stores",
        details: "Relational data modeling, indexing, query optimization, connection pooling, and key-value caching.",
        tag: "Data Layer"
      },
      {
        name: "Cloud & Edge",
        category: "Core Engineering",
        context: "Vercel, AWS, Cloudflare",
        details: "Edge functions, serverless functions, CDN distribution, and environment management.",
        tag: "Cloud Services"
      },
      {
        name: "Deployment & CI/CD",
        category: "Core Engineering",
        context: "Automated Build & Test Pipelines",
        details: "GitHub Actions, automated linting/testing, preview deployments, and zero-downtime releases.",
        tag: "DevOps"
      },
      {
        name: "System Integration",
        category: "Core Engineering",
        context: "Connecting Heterogeneous Services",
        details: "Webhooks, third-party authentication, payment gateways, and telemetry pipelines.",
        tag: "Architecture"
      }
    ] as SkillItem[]
  }
];
