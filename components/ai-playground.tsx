"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sparkles,
  Terminal,
  Play,
  RotateCcw,
  Zap,
  Search,
  Cpu,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Database,
  ArrowRight,
} from "lucide-react";

// Preset responses for realistic streaming simulation
const STREAMING_PRESETS = [
  {
    label: "Vector Embeddings for UI",
    prompt: "Explain vector embeddings using web UI analogies.",
    reasoning:
      "1. Identify core concept: high-dimensional spatial representation of semantics.\n2. Translate to frontend: design tokens, color spaces (HSL), flexbox alignment vectors.\n3. Conclude with retrieval analogy: finding closest matching UI component.",
    response: `Think of vector embeddings like an ultra-fine HSL color wheel or design token system, but instead of 3 dimensions (Hue, Saturation, Lightness), it spans 1536 dimensions.

In a design system, colors that 'feel similar' sit close together in HSL space. Similarly, in vector embeddings, words or UI concepts that share semantic meaning (e.g., 'primary button' and 'action submit') are mapped as neighboring coordinate points.

When a user searches for 'checkout trigger', the vector search doesn't just look for exact character strings. It calculates the cosine distance in coordinate space, instantly surfacing your 'Purchase Button' component even if the words don't match.

Frontend takeaway: High-dimensional math enables human-like fuzzy understanding in digital interfaces.`
  },
  {
    label: "Speculative UX vs Blocking",
    prompt: "Why is speculative execution critical for AI copilot UX?",
    reasoning:
      "1. Quantify user threshold: 100ms for instantaneous perception.\n2. Note LLM constraint: average TTFT is 600ms-1500ms.\n3. Solution: speculative prefetching, optimistic branch predictions, progressive streaming.",
    response: `The human brain perceives software as 'instantaneous' when feedback occurs within 100ms. Yet foundation models typically take 600ms to 1,500ms just to return the first token (TTFT).

If your frontend passively blocks with a generic spinner, users feel cognitive fatigue and task hesitation.

With speculative execution:
1. Optimistic Prefetching: As the user finishes typing, client-side intent heuristics pre-warm the SSE stream.
2. Progressive Token Interpolation: We render incoming token deltas using a micro-buffer that smooths out network jitter into a fluid 60 FPS reading cadence.
3. Speculative Branch Cards: While the primary model generates text, secondary lightweight models prepare follow-up action buttons in parallel.

Result: A 1,200ms model latency feels perceptually like 150ms.`
  },
  {
    label: "Agent Tool Calling Schema",
    prompt: "Design a clean JSON schema for an AI code refactoring tool.",
    reasoning:
      "1. Define tool name: refactor_code_block.\n2. Specify strict parameters: targetFile, startLine, endLine, refactoringStrategy, replacementCode.\n3. Validate with JSON Schema draft-07.",
    response: `{
  "name": "refactor_code_block",
  "description": "Applies an atomic refactoring to a target code block with strict AST verification.",
  "parameters": {
    "type": "object",
    "properties": {
      "targetFile": {
        "type": "string",
        "description": "Absolute path to the target component file."
      },
      "startLine": {
        "type": "integer",
        "description": "1-indexed starting line of the target block."
      },
      "endLine": {
        "type": "integer",
        "description": "1-indexed ending line of the target block."
      },
      "refactoringStrategy": {
        "type": "string",
        "enum": ["extract_hook", "memoize_callback", "convert_to_server_component"]
      },
      "replacementCode": {
        "type": "string",
        "description": "Drop-in replacement code maintaining existing exports."
      }
    },
    "required": ["targetFile", "startLine", "endLine", "refactoringStrategy", "replacementCode"]
  }
}`
  }
];

// RAG simulation dataset
const RAG_DOCS = [
  {
    id: "doc-1",
    title: "Speculative Token Buffers",
    content: "Speculative decoding and client-side token buffering reduce perceived latency in conversational AI interfaces.",
    similarity: 0.94,
    matchedTokens: ["speculative", "token", "buffering", "latency"]
  },
  {
    id: "doc-2",
    title: "Vector Search & Cosine Distance",
    content: "Cosine similarity measures the angle between two high-dimensional vectors, invariant to vector magnitude.",
    similarity: 0.88,
    matchedTokens: ["vector", "cosine", "similarity", "distance"]
  },
  {
    id: "doc-3",
    title: "Server-Sent Events in Next.js",
    content: "Next.js App Router Route Handlers can return ReadableStream with text/event-stream headers for real-time AI chunk delivery.",
    similarity: 0.79,
    matchedTokens: ["ReadableStream", "event-stream", "Next.js", "real-time"]
  }
];

export function AIPlayground() {
  // Mode 1: Streaming State
  const [activePreset, setActivePreset] = React.useState(STREAMING_PRESETS[0]);
  const [customInput, setCustomInput] = React.useState(STREAMING_PRESETS[0].prompt);
  const [streamedText, setStreamedText] = React.useState("");
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [tokenCount, setTokenCount] = React.useState(0);
  const [streamingMetrics, setStreamingMetrics] = React.useState({ ttft: 138, speed: 76.5 });
  const [showReasoning, setShowReasoning] = React.useState(false);
  const streamTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Mode 2: RAG State
  const [ragQuery, setRagQuery] = React.useState("speculative token streaming");
  const [ragResults, setRagResults] = React.useState(RAG_DOCS);
  const [isSearchingRag, setIsSearchingRag] = React.useState(false);

  // Mode 3: Agent State
  const [agentStep, setAgentStep] = React.useState<number>(0);
  const [isAgentRunning, setIsAgentRunning] = React.useState<boolean>(false);

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  // Handle Streaming Execution
  const handleStartStream = (targetResponse: string) => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    setIsStreaming(true);
    setStreamedText("");
    setTokenCount(0);

    const words = targetResponse.split(" ");
    let currentIndex = 0;

    // Simulate TTFT jitter
    const ttftRandom = Math.floor(Math.random() * 40) + 120;
    const speedRandom = (Math.random() * 15 + 72).toFixed(1);
    setStreamingMetrics({ ttft: ttftRandom, speed: Number(speedRandom) });

    streamTimerRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        const nextChunk = words[currentIndex] + " ";
        setStreamedText((prev) => prev + nextChunk);
        setTokenCount((prev) => prev + 1);
        currentIndex++;
      } else {
        if (streamTimerRef.current) clearInterval(streamTimerRef.current);
        setIsStreaming(false);
      }
    }, 28);
  };

  // Handle Preset Select
  const handleSelectPreset = (preset: typeof STREAMING_PRESETS[0]) => {
    setActivePreset(preset);
    setCustomInput(preset.prompt);
    handleStartStream(preset.response);
  };

  // Handle RAG Search
  const handleExecuteRag = () => {
    setIsSearchingRag(true);
    setTimeout(() => {
      setIsSearchingRag(false);
      // Slightly fluctuate scores to feel alive
      const updated = RAG_DOCS.map((doc) => ({
        ...doc,
        similarity: Number((Math.random() * 0.15 + 0.82).toFixed(2))
      })).sort((a, b) => b.similarity - a.similarity);
      setRagResults(updated);
    }, 450);
  };

  // Handle Agent Workflow
  const handleRunAgent = () => {
    setIsAgentRunning(true);
    setAgentStep(1);

    setTimeout(() => {
      setAgentStep(2);
      setTimeout(() => {
        setAgentStep(3);
        setTimeout(() => {
          setAgentStep(4);
          setIsAgentRunning(false);
        }, 800);
      }, 800);
    }, 700);
  };

  return (
    <section id="playground" className="py-24 relative bg-[#08090a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <Badge variant="accent" className="mb-3">
            Interactive Experiments
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            AI <span className="text-gradient">Playground</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8e94a0] max-w-2xl leading-relaxed">
            Live client-side simulations demonstrating how I engineer streaming token pipelines, RAG retrieval diagnostics, and autonomous agent state machines.
          </p>
        </div>

        {/* Playground Tabs */}
        <Tabs defaultValue="streaming" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#0e1116] border border-white/[0.08] p-1 h-auto flex flex-wrap gap-1">
              <TabsTrigger value="streaming" className="text-xs sm:text-sm py-2 px-4 gap-2">
                <Zap className="h-4 w-4" />
                <span>Streaming LLM UI</span>
              </TabsTrigger>
              <TabsTrigger value="rag" className="text-xs sm:text-sm py-2 px-4 gap-2">
                <Database className="h-4 w-4" />
                <span>RAG Vector Retrieval</span>
              </TabsTrigger>
              <TabsTrigger value="agent" className="text-xs sm:text-sm py-2 px-4 gap-2">
                <Bot className="h-4 w-4" />
                <span>Agent Workflow</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Streaming LLM UI */}
          <TabsContent value="streaming" className="space-y-6">
            <Card className="bg-[#0c0e11]/90 border-white/[0.08] overflow-hidden">
              <div className="p-6 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Speculative Streaming Response UI
                  </h3>
                  <p className="text-xs text-[#8e94a0] mt-0.5">
                    Simulates token streaming via SSE with live latency metrics and reasoning inspection.
                  </p>
                </div>

                {/* Telemetry Chips */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/20 px-2.5 py-1 rounded-md">
                    TTFT: {streamingMetrics.ttft}ms
                  </span>
                  <span className="text-[11px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2.5 py-1 rounded-md">
                    Speed: {streamingMetrics.speed} tok/s
                  </span>
                  <span className="text-[11px] font-mono text-[#ededed] bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-md">
                    Tokens: {tokenCount}
                  </span>
                </div>
              </div>

              {/* Prompt Presets */}
              <div className="p-6 pb-2 border-b border-white/[0.04] bg-white/[0.01]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8e94a0]">
                    Select or customize prompt:
                  </span>
                  <span className="text-[11px] text-[#00f5a0]">1-Click Presets</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STREAMING_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        activePreset.label === preset.label
                          ? "bg-[#00f5a0]/15 border-[#00f5a0]/50 text-[#00f5a0] font-medium"
                          : "bg-white/[0.03] border-white/[0.08] text-[#8e94a0] hover:text-white hover:border-white/[0.2]"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input Bar */}
              <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
                <div className="relative flex-1">
                  <Input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Ask an AI engineering question..."
                    className="pr-10 bg-[#101317] border-white/[0.1] text-xs sm:text-sm h-11"
                  />
                  <Terminal className="absolute right-3.5 top-3.5 h-4 w-4 text-[#71717a]" />
                </div>
                <Button
                  onClick={() => handleStartStream(activePreset.response)}
                  disabled={isStreaming}
                  variant="default"
                  className="h-11 px-5 font-semibold text-xs"
                >
                  <Play className="mr-1.5 h-3.5 w-3.5 fill-current" />
                  {isStreaming ? "Streaming..." : "Execute"}
                </Button>
              </div>

              {/* Reasoning Toggle */}
              <div className="px-6 py-2.5 bg-[#090a0d] border-b border-white/[0.04] flex items-center justify-between">
                <button
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="flex items-center space-x-1.5 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                >
                  {showReasoning ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  <span>Chain of Thought Reasoning ({activePreset.reasoning.split("\n").length} steps)</span>
                </button>
                <span className="text-[10px] font-mono text-[#00f5a0]">Speculative Plan</span>
              </div>

              {/* Reasoning Drawer */}
              {showReasoning && (
                <div className="px-6 py-4 bg-[#090b0e] border-b border-white/[0.06] text-xs font-mono text-[#8e94a0] space-y-1">
                  <pre className="whitespace-pre-wrap leading-relaxed">{activePreset.reasoning}</pre>
                </div>
              )}

              {/* Output Stream Terminal */}
              <div className="p-6 bg-[#08090b] min-h-[220px]">
                {streamedText ? (
                  <div className="font-mono text-xs sm:text-sm text-[#ededed] leading-relaxed whitespace-pre-wrap">
                    {streamedText}
                    {isStreaming && (
                      <span className="inline-block w-2 h-4 bg-[#00f5a0] ml-1 animate-pulse align-middle" />
                    )}
                  </div>
                ) : (
                  <div className="h-36 flex flex-col items-center justify-center text-[#525866] text-xs font-mono">
                    <Sparkles className="h-5 w-5 mb-2 text-[#00f5a0]/40 animate-pulse" />
                    <span>Click &quot;Execute&quot; or pick a preset above to stream tokens</span>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* TAB 2: RAG Vector Retrieval */}
          <TabsContent value="rag" className="space-y-6">
            <Card className="bg-[#0c0e11]/90 border-white/[0.08] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Vector Embedding & Cosine Similarity Inspector
                  </h3>
                  <p className="text-xs text-[#8e94a0] mt-0.5">
                    Inspect high-dimensional similarity matching against indexed knowledge chunks.
                  </p>
                </div>
                <Badge variant="accent" className="font-mono text-xs self-start sm:self-auto">
                  Dense Retrieval (1536-dim)
                </Badge>
              </div>

              {/* Query Input */}
              <div className="py-6 flex gap-3">
                <Input
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  placeholder="Enter retrieval query..."
                  className="bg-[#101317] border-white/[0.1] text-xs sm:text-sm h-11"
                />
                <Button
                  onClick={handleExecuteRag}
                  disabled={isSearchingRag}
                  variant="default"
                  className="h-11 px-5 text-xs font-semibold"
                >
                  <Search className="mr-1.5 h-3.5 w-3.5" />
                  {isSearchingRag ? "Retrieving..." : "Search Vector Index"}
                </Button>
              </div>

              {/* Results Matrix */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8e94a0]">
                  Ranked Context Chunks (Top-K = 3):
                </span>

                <div className="space-y-3">
                  {ragResults.map((doc, idx) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl bg-[#111419] border border-white/[0.06] hover:border-[#00f5a0]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="h-5 w-5 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[10px] font-mono text-[#00f5a0]">
                            #{idx + 1}
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {doc.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono text-[#8e94a0]">Similarity:</span>
                          <span className="text-xs font-mono font-bold text-[#00f5a0]">
                            {(doc.similarity * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      {/* Similarity Bar */}
                      <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden mb-3">
                        <div
                          className="bg-gradient-to-r from-[#00f5a0] to-[#0df2c8] h-full rounded-full transition-all duration-500"
                          style={{ width: `${doc.similarity * 100}%` }}
                        />
                      </div>

                      <p className="text-xs text-[#a1a1aa] leading-relaxed mb-3">
                        {doc.content}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {doc.matchedTokens.map((token) => (
                          <span
                            key={token}
                            className="text-[10px] font-mono text-[#00f5a0] bg-[#00f5a0]/10 px-2 py-0.5 rounded border border-[#00f5a0]/20"
                          >
                            +{token}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* TAB 3: Agent Workflow */}
          <TabsContent value="agent" className="space-y-6">
            <Card className="bg-[#0c0e11]/90 border-white/[0.08] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Multi-Agent Workflow Execution Graph
                  </h3>
                  <p className="text-xs text-[#8e94a0] mt-0.5">
                    Visualizes how autonomous agents plan, execute tools, verify guardrails, and synthesize output.
                  </p>
                </div>
                <Button
                  onClick={handleRunAgent}
                  disabled={isAgentRunning}
                  variant="default"
                  size="sm"
                  className="text-xs font-semibold"
                >
                  <Play className="mr-1.5 h-3.5 w-3.5 fill-current" />
                  {isAgentRunning ? "Executing Cycle..." : "Run Agent Loop"}
                </Button>
              </div>

              {/* Steps Flow */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Step 1 */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    agentStep >= 1
                      ? "bg-[#00f5a0]/10 border-[#00f5a0]/60 shadow-[0_0_20px_rgba(0,245,160,0.1)]"
                      : "bg-[#111419] border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#8e94a0]">
                      Step 01
                    </span>
                    {agentStep >= 1 && <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Intent &amp; Plan
                  </h4>
                  <p className="text-xs text-[#8e94a0]">
                    Deconstructs user prompt into discrete sub-goals and tool requirements.
                  </p>
                </div>

                {/* Step 2 */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    agentStep >= 2
                      ? "bg-[#00f5a0]/10 border-[#00f5a0]/60 shadow-[0_0_20px_rgba(0,245,160,0.1)]"
                      : "bg-[#111419] border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#8e94a0]">
                      Step 02
                    </span>
                    {agentStep >= 2 && <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Tool Invocation
                  </h4>
                  <p className="text-xs text-[#8e94a0]">
                    Executes vector query, API fetch, or code sandbox validation.
                  </p>
                </div>

                {/* Step 3 */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    agentStep >= 3
                      ? "bg-[#00f5a0]/10 border-[#00f5a0]/60 shadow-[0_0_20px_rgba(0,245,160,0.1)]"
                      : "bg-[#111419] border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#8e94a0]">
                      Step 03
                    </span>
                    {agentStep >= 3 && <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Guardrail Audit
                  </h4>
                  <p className="text-xs text-[#8e94a0]">
                    Validates schema conformity, halts hallucinations, and verifies constraints.
                  </p>
                </div>

                {/* Step 4 */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    agentStep >= 4
                      ? "bg-[#00f5a0]/10 border-[#00f5a0]/60 shadow-[0_0_20px_rgba(0,245,160,0.1)]"
                      : "bg-[#111419] border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#8e94a0]">
                      Step 04
                    </span>
                    {agentStep >= 4 && <CheckCircle2 className="h-4 w-4 text-[#00f5a0]" />}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Final Synthesis
                  </h4>
                  <p className="text-xs text-[#8e94a0]">
                    Formats structured output for immediate UI consumption.
                  </p>
                </div>
              </div>

              {/* Active State Terminal */}
              <div className="p-4 rounded-xl bg-[#08090b] border border-white/[0.06] font-mono text-xs">
                <div className="text-[#8e94a0] mb-1">// Agent Loop State:</div>
                {agentStep === 0 && (
                  <span className="text-[#525866]">Workflow idle. Click &quot;Run Agent Loop&quot; to begin simulation.</span>
                )}
                {agentStep === 1 && (
                  <span className="text-amber-400">⚡ [PLAN] Decomposed query into 2 tools: vector_search, code_lint.</span>
                )}
                {agentStep === 2 && (
                  <span className="text-sky-400">⚙️ [EXECUTE] Dispatched tool calls in parallel (Latency: 48ms).</span>
                )}
                {agentStep === 3 && (
                  <span className="text-purple-400">🛡️ [GUARDRAIL] Output matches strict JSON Schema draft-07. No cycle detected.</span>
                )}
                {agentStep === 4 && (
                  <span className="text-[#00f5a0]">✓ [COMPLETE] Delivered verified response to frontend state machine.</span>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
