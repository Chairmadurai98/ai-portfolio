"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalScrollRef } from "@/hooks/use-scroll-progress";
import { globalCursorRef } from "@/hooks/use-cursor-position";

interface ProjectPanelData {
  id: string;
  title: string;
  category: string;
  pos: [number, number, number];
  rot: [number, number, number];
  color: string;
}

const PROJECT_3D_PANELS: ProjectPanelData[] = [
  {
    id: "cortex-ui",
    title: "CortexUI",
    category: "AI Streaming",
    pos: [1.8, 0.4, 0.5],
    rot: [-0.1, -0.3, 0.05],
    color: "#00f5a0",
  },
  {
    id: "agent-evals",
    title: "AgentEval",
    category: "Benchmark Suite",
    pos: [2.6, -1.0, 0.2],
    rot: [0.15, -0.4, -0.05],
    color: "#0df2c8",
  },
  {
    id: "rag-lens",
    title: "RAGLens",
    category: "Vector Visualizer",
    pos: [1.4, -2.2, 0.8],
    rot: [0.05, -0.25, 0.08],
    color: "#38bdf8",
  },
];

function FloatingPanel({
  panel,
  index,
}: {
  panel: ProjectPanelData;
  index: number;
}) {
  const meshRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollT = globalScrollRef.current.progress;
    const cursor = globalCursorRef.current;

    // Active visibility range for Projects section (0.10 to 0.35)
    const inRange = scrollT >= 0.08 && scrollT <= 0.40;
    let targetOpacity = 0;
    let targetZOffset = 0;

    if (inRange) {
      // Smooth bell curve envelope
      const mid = 0.22;
      const dist = Math.abs(scrollT - mid);
      targetOpacity = Math.max(0, 1 - dist * 5.5);
      targetZOffset = (scrollT - 0.22) * (index + 1) * 2;
    }

    // Gentle floating motion
    const floatY = Math.sin(time * 1.4 + index) * 0.08;
    const floatRotX = Math.cos(time * 0.9 + index) * 0.04;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      panel.pos[0] + cursor.x * 0.2,
      0.06
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      panel.pos[1] + floatY + cursor.y * 0.2,
      0.06
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      panel.pos[2] + targetZOffset,
      0.06
    );

    meshRef.current.rotation.x = panel.rot[0] + floatRotX;
    meshRef.current.rotation.y = panel.rot[1] + cursor.x * 0.15;
    meshRef.current.rotation.z = panel.rot[2];

    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetOpacity > 0.05 ? 1 : 0.01, 0.08)
    );
  });

  return (
    <group ref={meshRef} position={panel.pos}>
      {/* 3D Glass Hologram Slab */}
      <mesh>
        <boxGeometry args={[1.5, 0.9, 0.04]} />
        <meshPhysicalMaterial
          color="#0c1015"
          emissive={panel.color}
          emissiveIntensity={0.25}
          roughness={0.1}
          metalness={0.1}
          transmission={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer Glowing Wireframe Rim */}
      <mesh>
        <boxGeometry args={[1.52, 0.92, 0.045]} />
        <meshStandardMaterial
          color={panel.color}
          emissive={panel.color}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Floating Holographic Beacon */}
      <mesh position={[0.6, 0.35, 0.05]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={panel.color} />
      </mesh>
    </group>
  );
}

export function ProjectObjects() {
  return (
    <group>
      {PROJECT_3D_PANELS.map((panel, idx) => (
        <FloatingPanel key={panel.id} panel={panel} index={idx} />
      ))}
    </group>
  );
}

export default ProjectObjects;
