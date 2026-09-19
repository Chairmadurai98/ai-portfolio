"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { CanvasContainer } from "./canvas-container";
import type { SkillItem } from "@/types";

interface NodeData {
  id: string;
  name: string;
  domain: "ai" | "frontend" | "core";
  color: string;
  position: [number, number, number];
  skill: SkillItem;
}

const CONSTELLATION_NODES: NodeData[] = [
  // AI Engineering Cluster (Emerald)
  {
    id: "llm",
    name: "LLM Apps",
    domain: "ai",
    color: "#00f5a0",
    position: [-1.8, 1.2, 0.4],
    skill: {
      name: "LLM Applications",
      category: "AI Engineering",
      context: "Production Copilots & Chat Systems",
      details: "Streaming LLM frontends, token buffers, speculative UI states, and fallback orchestrations.",
      tag: "Core Focus",
    },
  },
  {
    id: "rag",
    name: "RAG Systems",
    domain: "ai",
    color: "#00f5a0",
    position: [-2.2, -0.3, 0.2],
    skill: {
      name: "RAG",
      category: "AI Engineering",
      context: "Retrieval-Augmented Generation",
      details: "Hybrid search combining dense vector embeddings with BM25 sparse keyword search, reranking, and chunk optimization.",
      tag: "High Priority",
    },
  },
  {
    id: "agents",
    name: "AI Agents",
    domain: "ai",
    color: "#00f5a0",
    position: [-1.2, 2.0, -0.5],
    skill: {
      name: "AI Agents",
      category: "AI Engineering",
      context: "Autonomous & Multi-Agent Loops",
      details: "State machines, tool-calling pipelines, guardrail verification, and human-in-the-loop approvals.",
      tag: "Specialized",
    },
  },
  {
    id: "vectordb",
    name: "Vector DB",
    domain: "ai",
    color: "#00f5a0",
    position: [-2.5, 0.8, -0.6],
    skill: {
      name: "Vector Databases",
      category: "AI Engineering",
      context: "Chroma, Pinecone, pgvector",
      details: "Indexing embeddings, cosine & dot-product distance metrics, and fast metadata filtering.",
      tag: "Infrastructure",
    },
  },

  // Frontend Cluster (Cyan / Sky)
  {
    id: "react",
    name: "React 19",
    domain: "frontend",
    color: "#38bdf8",
    position: [1.8, 1.1, 0.5],
    skill: {
      name: "React",
      category: "Frontend Engineering",
      context: "React 18 & 19 Ecosystem",
      details: "Custom hooks, Concurrent Mode, server/client boundary management, Suspense, and state optimization.",
      tag: "Expertise",
    },
  },
  {
    id: "nextjs",
    name: "Next.js",
    domain: "frontend",
    color: "#38bdf8",
    position: [2.2, -0.4, 0.3],
    skill: {
      name: "Next.js",
      category: "Frontend Engineering",
      context: "App Router & Server Components",
      details: "Streaming SSR, Server Actions, Route Handlers, edge runtime, and fine-tuned caching strategies.",
      tag: "Primary Framework",
    },
  },
  {
    id: "typescript",
    name: "TypeScript",
    domain: "frontend",
    color: "#38bdf8",
    position: [1.2, 2.1, -0.3],
    skill: {
      name: "TypeScript",
      category: "Frontend Engineering",
      context: "Strict Type Safety",
      details: "Generics, utility types, discriminated unions, and end-to-end type safety between API and UI.",
      tag: "Everyday Standard",
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    domain: "frontend",
    color: "#38bdf8",
    position: [2.4, 0.7, -0.5],
    skill: {
      name: "Tailwind CSS",
      category: "Frontend Engineering",
      context: "Design Systems & Utility Architecture",
      details: "Custom design token palettes, Tailwind v4 theme engines, micro-animations, and responsive patterns.",
      tag: "Design System",
    },
  },

  // Core Engineering Cluster (Purple / Violet)
  {
    id: "apis",
    name: "Streaming APIs",
    domain: "core",
    color: "#a855f7",
    position: [0.3, -1.8, 0.6],
    skill: {
      name: "REST APIs",
      category: "Core Engineering",
      context: "API Design & Streaming Endpoints",
      details: "Designing clean RESTful conventions, SSE streaming, error schemas, and OpenAPI documentation.",
      tag: "API Architecture",
    },
  },
  {
    id: "cloud",
    name: "Cloud & Edge",
    domain: "core",
    color: "#a855f7",
    position: [-0.6, -2.1, -0.4],
    skill: {
      name: "Cloud & Edge",
      category: "Core Engineering",
      context: "Vercel, AWS, Cloudflare",
      details: "Edge functions, serverless functions, CDN distribution, and environment management.",
      tag: "Cloud Services",
    },
  },
];

function SkillNodeMesh({
  node,
  activeId,
  onHover,
}: {
  node: NodeData;
  activeId: string | null;
  onHover: (id: string | null) => void;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const isHovered = activeId === node.id;
  const isDimmed = activeId !== null && !isHovered;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    if (isHovered) {
      meshRef.current.scale.setScalar(1.35 + Math.sin(time * 6) * 0.08);
    } else {
      meshRef.current.scale.setScalar(1.0);
    }
  });

  return (
    <group position={node.position}>
      {/* Node Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 1.4 : isDimmed ? 0.2 : 0.6}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Connection Line to Origin */}
      <Line
        points={[[0, 0, 0], [-node.position[0], -node.position[1], -node.position[2]]]}
        color={node.color}
        lineWidth={isHovered ? 2.5 : 1}
        transparent
        opacity={isHovered ? 0.8 : isDimmed ? 0.08 : 0.25}
      />

      {/* Floating 3D HTML Label */}
      <Html
        position={[0, 0.28, 0]}
        center
        distanceFactor={6}
        style={{
          pointerEvents: "none",
          transition: "all 0.2s ease",
          transform: `scale(${isHovered ? 1.05 : 0.95})`,
          opacity: isDimmed ? 0.35 : 1,
        }}
      >
        <div
          className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap border transition-all ${
            isHovered
              ? "bg-[#08090a] text-white border-[#00f5a0] shadow-[0_0_12px_rgba(0,245,160,0.4)]"
              : "bg-[#0e1013]/90 text-[#a1a1aa] border-white/[0.08]"
          }`}
        >
          {node.name}
        </div>
      </Html>
    </group>
  );
}

function ConstellationScene({
  activeId,
  setActiveId,
}: {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Slow ambient rotation, pauses slightly or slows down when hovering
    const rotationSpeed = activeId ? 0.04 : 0.12;
    groupRef.current.rotation.y = time * rotationSpeed;

    // Subtle cursor tilt
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = -(state.pointer.y * Math.PI) / 10;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetX,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetY,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Central Engineering Core */}
      <mesh>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={0.8}
          wireframe={true}
        />
      </mesh>

      {/* Central Core Label */}
      <Html position={[0, -0.65, 0]} center distanceFactor={6}>
        <div className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#00f5a0]/15 text-[#00f5a0] border border-[#00f5a0]/40 shadow-[0_0_15px_rgba(0,245,160,0.3)]">
          Engineering Core
        </div>
      </Html>

      {/* Satellite Skill Nodes */}
      {CONSTELLATION_NODES.map((node) => (
        <SkillNodeMesh
          key={node.id}
          node={node}
          activeId={activeId}
          onHover={setActiveId}
        />
      ))}
    </group>
  );
}

export function SkillConstellation() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeNode = CONSTELLATION_NODES.find((n) => n.id === activeId);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl border border-white/[0.08] bg-[#090b0e] overflow-hidden">
      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <span className="h-2 w-2 rounded-full bg-[#00f5a0] animate-pulse" />
        <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa]">
          Interactive 3D Constellation • Hover Nodes to Inspect
        </span>
      </div>

      {/* 3D Canvas */}
      <CanvasContainer camera={{ position: [0, 0, 6.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, 3, 2]} intensity={0.8} color="#00f5a0" />
        <pointLight position={[4, -3, 2]} intensity={0.8} color="#38bdf8" />
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <ConstellationScene activeId={activeId} setActiveId={setActiveId} />
        </Float>
      </CanvasContainer>

      {/* Active Node Detail Card (Bottom Overlay) */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
        <div className="max-w-md mx-auto p-4 rounded-xl bg-[#0c0e11]/95 border border-white/[0.12] backdrop-blur-xl shadow-2xl transition-all duration-300">
          {activeNode ? (
            <div className="space-y-1.5 pointer-events-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {activeNode.skill.name}
                </span>
                <span className="text-[10px] font-mono text-[#00f5a0] bg-[#00f5a0]/10 border border-[#00f5a0]/30 px-2 py-0.5 rounded">
                  {activeNode.skill.tag}
                </span>
              </div>
              <p className="text-xs font-mono text-[#00f5a0]">
                {activeNode.skill.context}
              </p>
              <p className="text-xs text-[#8e94a0] leading-relaxed">
                {activeNode.skill.details}
              </p>
            </div>
          ) : (
            <div className="text-center text-xs font-mono text-[#525866]">
              Hover over any orbiting node to inspect production applications &amp; architecture context.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillConstellation;

