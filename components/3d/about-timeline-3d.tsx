"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { CanvasContainer } from "./canvas-container";

interface TimelineNodeProps {
  position: [number, number, number];
  title: string;
  badge: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

function TimelineNode({
  position,
  title,
  badge,
  color,
  isActive,
  onClick,
}: TimelineNodeProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    if (isActive) {
      meshRef.current.scale.setScalar(1.3 + Math.sin(time * 4) * 0.08);
      meshRef.current.rotation.y = time * 0.6;
    } else {
      meshRef.current.scale.setScalar(0.95);
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Node Geometry */}
      <mesh ref={meshRef} onClick={onClick}>
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 1.5 : 0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Halo for active node */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.46, 32]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      )}

      {/* 3D Label */}
      <Html position={[0, -0.45, 0]} center distanceFactor={5.5}>
        <div
          onClick={onClick}
          className={`px-3 py-1 rounded-lg text-center cursor-pointer transition-all ${
            isActive
              ? "bg-[#08090a] border border-[#00f5a0] shadow-[0_0_15px_rgba(0,245,160,0.3)] text-white font-bold"
              : "bg-[#0c0e11]/80 border border-white/[0.08] text-[#8e94a0] hover:text-white"
          }`}
        >
          <div className="text-xs whitespace-nowrap">{title}</div>
          <div className="text-[9px] font-mono text-[#00f5a0]">{badge}</div>
        </div>
      </Html>
    </group>
  );
}

// Glowing Conduit Connecting the Timeline
function Conduit({ activeStep }: { activeStep: number }) {
  const pulseRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!pulseRef.current) return;
    const time = state.clock.getElapsedTime();
    // Move pulse back and forth along the conduit line (-2.2 to 2.2)
    const t = (Math.sin(time * 2) + 1) / 2;
    const targetX = -2.2 + t * 4.4;
    pulseRef.current.position.x = targetX;
  });

  return (
    <group>
      {/* Base Line */}
      <Line
        points={[[-2.2, 0, 0], [0, 0, 0], [2.2, 0, 0]]}
        color="#ffffff"
        lineWidth={1.5}
        transparent
        opacity={0.15}
      />

      {/* Highlighted active segment */}
      <Line
        points={
          activeStep === 0
            ? [[-2.2, 0, 0], [-1.0, 0, 0]]
            : activeStep === 1
            ? [[-1.0, 0, 0], [1.0, 0, 0]]
            : [[1.0, 0, 0], [2.2, 0, 0]]
        }
        color="#00f5a0"
        lineWidth={3}
        transparent
        opacity={0.8}
      />

      {/* Animated Traveling Data Pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#00f5a0" />
      </mesh>
    </group>
  );
}

interface AboutTimeline3DProps {
  activeStep: number;
  onSelectStep: (step: number) => void;
}

export function AboutTimeline3D({ activeStep, onSelectStep }: AboutTimeline3DProps) {
  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/[0.08] bg-[#090b0e] overflow-hidden mb-12">
      <CanvasContainer camera={{ position: [0, 0, 4.2], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 2, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-2, -1, 2]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[2, -1, 2]} intensity={0.8} color="#00f5a0" />

        <Conduit activeStep={activeStep} />

        <TimelineNode
          position={[-2.2, 0, 0]}
          title="3 Years Frontend"
          badge="Foundational Craft"
          color="#38bdf8"
          isActive={activeStep === 0}
          onClick={() => onSelectStep(0)}
        />
        <TimelineNode
          position={[0, 0, 0]}
          title="7 Months AI"
          badge="Emerging Frontier"
          color="#0df2c8"
          isActive={activeStep === 1}
          onClick={() => onSelectStep(1)}
        />
        <TimelineNode
          position={[2.2, 0, 0]}
          title="AI + Interface"
          badge="The Multiplier"
          color="#00f5a0"
          isActive={activeStep === 2}
          onClick={() => onSelectStep(2)}
        />
      </CanvasContainer>
    </div>
  );
}

export default AboutTimeline3D;

