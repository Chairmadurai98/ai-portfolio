export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "AI" | "Frontend" | "Experiments";
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
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
  githubUrl: string;
  liveUrl: string;
  accentColor: string;
}

export const PROJECTS: Project[] = [
  {
    id: "cortex-ui",
    title: "CortexUI — Speculative Streaming Copilot",
    subtitle: "Low-latency streaming AI interface with speculative execution & tool calling",
    category: "AI",
    tags: ["Next.js", "TypeScript", "LangChain", "WebSockets", "Tailwind CSS", "Server-Sent Events"],
    year: "2024",
    featured: true,
    summary:
      "A high-performance AI copilot interface that eliminates perceived latency through speculative client-side token rendering, streaming tool call visualizations, and interruptible generation buffers.",
    problem:
      "Standard LLM interfaces suffer from unpredictable TTFT (time-to-first-token), choppy token streaming, and black-box tool execution that disconnects the user from what the model is thinking.",
    solution:
      "Engineered a bidirectional streaming UI architecture using Server-Sent Events with client-side token interpolation. Built progressive disclosure cards for intermediate tool calls and speculative branch generation.",
    myContribution:
      "Designed and implemented the entire frontend streaming orchestration layer, custom token parser for Markdown + code diffs, and the reactive state machine managing pause/resume/branch operations.",
    technicalChallenges: [
      "Rendering 60+ tokens/second without triggering heavy React re-renders or DOM thrashing.",
      "Synchronizing multi-part tool execution outputs (structured JSON) with conversational text streams in a single viewport.",
      "Handling abrupt WebSocket/SSE disconnections with automatic backoff reconnection and message state reconciliation."
    ],
    results: [
      "Reduced perceived latency from 1.2s to under 180ms using optimistic UI states.",
      "Achieved stable 60 FPS rendering during high-speed token generation up to 95 tok/s.",
      "40% reduction in user task abandonment during complex multi-step reasoning."
    ],
    architectureFlow: [
      "User Input → Intent Classifier",
      "Speculative Prompt Pre-fetch",
      "SSE Token Streaming + Delta Buffer",
      "Client State Machine & Virtualized DOM",
      "Interactive Result Render"
    ],
    codeSnippet: {
      language: "typescript",
      caption: "Speculative Token Buffer & Streaming State Machine",
      code: `export async function* streamWithSpeculativeBuffer(
  stream: ReadableStream<Uint8Array>,
  onToolCall: (tool: ToolEvent) => void
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    const events = parseSSEChunk(buffer);
    
    for (const event of events) {
      if (event.type === "tool_call") {
        onToolCall(event.data);
      } else if (event.type === "token") {
        yield event.token; // Zero-latency perceptual yield
      }
    }
  }
}`
    },
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    accentColor: "#00f5a0"
  },
  {
    id: "nexus-vector",
    title: "NexusVector — Visual RAG Explorer",
    subtitle: "High-dimensional embedding visualizer & hybrid retrieval diagnostic suite",
    category: "AI",
    tags: ["React", "TypeScript", "Vector DB", "Embeddings", "WebGL/Canvas", "RAG"],
    year: "2024",
    featured: false,
    summary:
      "An interactive diagnostic workspace allowing engineers to visualize vector embeddings in 2D/3D space, inspect chunk boundaries, and audit cosine similarity scores in real time.",
    problem:
      "RAG retrieval failures are notoriously difficult to debug because vector embeddings and distance metrics are abstract mathematical representations hidden behind database queries.",
    solution:
      "Built an interactive Canvas/WebGL embedding projector that maps high-dimensional vector clusters, highlights top-k neighbors dynamically on hover, and contrasts BM25 lexical vs dense semantic retrieval.",
    myContribution:
      "Architected the interactive dimensional reduction visualizer (t-SNE/UMAP projection viewer) and built the inspection drawer for token-level chunk overlap analysis.",
    technicalChallenges: [
      "Rendering 10,000+ vector points smoothly on HTML5 Canvas with fluid zooming, panning, and hit-testing.",
      "Normalizing diverse distance metrics (Cosine, Euclidean, Dot Product) into an intuitive visual proximity model."
    ],
    results: [
      "Cut RAG retrieval debugging cycle times by 65% for engineering teams.",
      "Provided visual proof for chunk size optimization (256 vs 512 tokens) with instant context relevance checks."
    ],
    architectureFlow: [
      "Document Ingestion → Tokenizer Chunking",
      "Embedding Model (Dense & Sparse)",
      "Vector Index + Cosine Similarity",
      "Interactive 2D Canvas Projection",
      "Ground Truth Relevance Audit"
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    accentColor: "#0df2c8"
  },
  {
    id: "pulse-flow",
    title: "PulseFlow — Enterprise Design System",
    subtitle: "Multi-brand token pipeline & headless component architecture for scale",
    category: "Frontend",
    tags: ["Next.js", "TypeScript", "Design Tokens", "Radix UI", "Accessibility", "Tailwind"],
    year: "2023",
    featured: false,
    summary:
      "A battle-tested enterprise design system serving 12+ product squads with automated token synchronization from Figma, zero-runtime CSS, and 100% WCAG AAA accessibility compliance.",
    problem:
      "Inconsistent UI patterns, slow frontend velocity across squads, and recurring accessibility regressions across multiple consumer-facing portals.",
    solution:
      "Engineered an extensible headless component system with strict TypeScript typings, automatic dark/light theme tokens, and comprehensive keyboard navigation tests.",
    myContribution:
      "Lead frontend developer on core primitives (Data Tables, Modal Dialogs, Comboboxes) and automated Figma-to-Code token sync script via GitHub Actions.",
    technicalChallenges: [
      "Ensuring sub-millisecond component mount times and preventing style recalculation bottlenecks in massive data tables.",
      "Achieving complete WCAG 2.1 AAA keyboard navigation and screen reader announcement parity."
    ],
    results: [
      "Adopted by 45+ engineers across 4 business units with zero breaking changes.",
      "Boosted sprint feature velocity by ~35% by eliminating custom styling boilerplate.",
      "100% Lighthouse Accessibility score across all core platform surfaces."
    ],
    architectureFlow: [
      "Figma Tokens API → JSON Schema",
      "Style Dictionary Token Compilation",
      "Headless Radix Primitives + CVA",
      "Strict TypeScript Component Library",
      "Automated Visual Regression CI"
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    accentColor: "#38bdf8"
  },
  {
    id: "synapse-agent-studio",
    title: "Synapse Agent Studio",
    subtitle: "Visual node graph for multi-agent LLM orchestration & human-in-the-loop",
    category: "Experiments",
    tags: ["Next.js", "TypeScript", "AI Agents", "State Machines", "React Flow", "JSON Schema"],
    year: "2024",
    featured: false,
    summary:
      "A node-based visual orchestration canvas to design, simulate, and debug multi-agent collaboration loops with real-time tool execution inspection and manual intervention points.",
    problem:
      "Autonomous agent loops often run wild or get stuck in infinite recursion loops without clear visual observability or mechanisms for human oversight.",
    solution:
      "Created an interactive node graph where agents, tools, and guardrails are connected visually. Supports step-by-step execution stepping, state inspection, and live prompt injection.",
    myContribution:
      "Constructed the reactive canvas interface, execution timeline scrubber, and JSON-schema validator for agent tool outputs.",
    technicalChallenges: [
      "Maintaining bi-directional synchronization between the graph canvas and the underlying asynchronous agent execution engine.",
      "Handling branching agent plans dynamically as models spawn sub-agents."
    ],
    results: [
      "Enabled non-technical product managers to test and review agent toolchains visually.",
      "Eliminated recurring agent infinite loops through visual cycle detection."
    ],
    architectureFlow: [
      "Visual Node Graph Definition",
      "Agent Supervisor Planning Step",
      "Tool Invocation & Guardrail Check",
      "Human-in-the-Loop Intercept Option",
      "Consolidated Final Synthesis"
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    accentColor: "#a855f7"
  }
];
