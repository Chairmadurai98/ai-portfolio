"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { CanvasContainer } from "./canvas-container";

interface PipelineStage {
  id: string;
  name: string;
  sub: string;
  position: [number, number, number];
  color: string;
}

const STAGES: PipelineStage[] = [
  { id: "user", name: "User Intent", sub: "Input", position: [-2.6, 0, 0], color: "#ededed" },
  { id: "prompt", name: "Prompt Schema", sub: "Structuring", position: [-1.3, 0.4, 0], color: "#38bdf8" },
  { id: "core", name: "AI Core", sub: "LLM / Agents", position: [0, -0.2, 0.2], color: "#00f5a0" },
  { id: "rag", name: "RAG Vector DB", sub: "Hybrid Search", position: [1.3, 0.4, 0], color: "#0df2c8" },
  { id: "stream", name: "Streaming UI", sub: "SSE Buffer", position: [2.6, 0, 0], color: "#a855f7" },
];

function PipelineMesh({ isStreaming }: { isStreaming: boolean }) {
  const packetRef = React.useRef<THREE.Mesh>(null);
  const coreMeshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Data packet traveling along pipeline
    if (packetRef.current) {
      const speed = isStreaming ? 3.5 : 1.2;
      const progress = ((time * speed) % 5.2) - 2.6;
      packetRef.current.position.x = progress;
      packetRef.current.position.y = Math.sin(progress * 2) * 0.25;
    }

    // AI Core rotation and pulse
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = time * 1.5;
      coreMeshRef.current.rotation.x = time * 0.8;
      const scale = isStreaming ? 1.35 + Math.sin(time * 8) * 0.1 : 1.0;
      coreMeshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Connecting Conduit Line */}
      <Line
        points={STAGES.map((s) => s.position)}
        color="#ffffff"
        lineWidth={1.5}
        transparent
        opacity={0.2}
      />

      {/* Active Streaming Pipeline Line */}
      {isStreaming && (
        <Line
          points={STAGES.map((s) => s.position)}
          color="#00f5a0"
          lineWidth={3}
          transparent
          opacity={0.8}
        />
      )}

      {/* Moving Energy Data Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00f5a0" />
      </mesh>

      {/* Central AI Core (Stage 3) */}
      <mesh ref={coreMeshRef} position={[0, -0.2, 0.2]}>
        <dodecahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={isStreaming ? 1.6 : 0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={!isStreaming}
        />
      </mesh>

      {/* Stage Nodes */}
      {STAGES.map((stage) => {
        if (stage.id === "core") return null; // rendered specially above
        return (
          <group key={stage.id} position={stage.position}>
            <mesh>
              <octahedronGeometry args={[0.18, 0]} />
              <meshStandardMaterial
                color={stage.color}
                emissive={stage.color}
                emissiveIntensity={isStreaming ? 1.0 : 0.4}
              />
            </mesh>

            {/* 3D Stage Label */}
            <Html position={[0, -0.38, 0]} center distanceFactor={5.5}>
              <div className="px-2 py-0.5 rounded bg-[#090b0e]/90 border border-white/[0.08] text-center whitespace-nowrap shadow-lg">
                <div className="text-[10px] font-mono text-white font-medium">
                  {stage.name}
                </div>
                <div className="text-[8px] font-mono text-[#8e94a0]">
                  {stage.sub}
                </div>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Subtle Data Sparkles */}
      <Sparkles
        count={isStreaming ? 40 : 15}
        scale={6}
        size={1.5}
        speed={isStreaming ? 1.2 : 0.4}
        color="#00f5a0"
      />
    </group>
  );
}

export function AIPipeline3D({ isStreaming }: { isStreaming: boolean }) {
  return (
    <div className="relative w-full h-[200px] sm:h-[240px] rounded-2xl border border-white/[0.08] bg-[#090b0e] overflow-hidden mb-6">
      <div className="absolute top-3 left-4 z-10 flex items-center space-x-2">
        <span
          className={`h-2 w-2 rounded-full ${
            isStreaming ? "bg-[#00f5a0] animate-ping" : "bg-[#00f5a0]"
          }`}
        />
        <span className="text-[11px] font-mono text-[#a1a1aa] uppercase tracking-wider">
          3D Digital Laboratory Pipeline • {isStreaming ? "Synthesizing Tokens" : "System Standby"}
        </span>
      </div>

      <CanvasContainer camera={{ position: [0, 0, 4.4], fov: 42 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 2, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, 0, 2]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[3, 0, 2]} intensity={0.8} color="#a855f7" />
        <PipelineMesh isStreaming={isStreaming} />
      </CanvasContainer>
    </div>
  );
}

export default AIPipeline3D;

