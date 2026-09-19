"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalScrollRef } from "@/hooks/use-scroll-progress";
import { globalCursorRef } from "@/hooks/use-cursor-position";

interface SkillNode {
  id: string;
  name: string;
  pos: [number, number, number];
  color: string;
}

const SKILL_NODES: SkillNode[] = [
  { id: "react", name: "React", pos: [1.6, 1.0, 0.4], color: "#38bdf8" },
  { id: "next", name: "Next.js", pos: [2.0, -0.4, 0.3], color: "#38bdf8" },
  { id: "ts", name: "TypeScript", pos: [1.2, 1.8, -0.4], color: "#38bdf8" },
  { id: "ai", name: "AI Agents", pos: [-1.4, 1.4, 0.3], color: "#00f5a0" },
  { id: "llm", name: "LLM Apps", pos: [-1.9, -0.2, 0.5], color: "#00f5a0" },
  { id: "rag", name: "RAG DB", pos: [-1.2, -1.6, -0.3], color: "#00f5a0" },
  { id: "api", name: "Streaming APIs", pos: [0.3, -1.8, 0.6], color: "#a855f7" },
  { id: "tailwind", name: "Tailwind CSS", pos: [2.1, 0.7, -0.5], color: "#38bdf8" },
  { id: "git", name: "Git & CI/CD", pos: [-0.6, 2.1, -0.2], color: "#0df2c8" },
];

export function SkillNetwork() {
  const groupRef = React.useRef<THREE.Group>(null);
  const coreRef = React.useRef<THREE.Mesh>(null);

  // Reusable node geometry & materials
  const nodeGeo = React.useMemo(() => new THREE.SphereGeometry(0.12, 16, 16), []);
  const coreGeo = React.useMemo(() => new THREE.OctahedronGeometry(0.35, 0), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollT = globalScrollRef.current.progress;
    const cursor = globalCursorRef.current;

    // Skills section active range: 0.52 to 0.78
    const inRange = scrollT >= 0.48 && scrollT <= 0.82;
    let targetScale = 0.001;

    if (inRange) {
      const mid = 0.66;
      const dist = Math.abs(scrollT - mid);
      targetScale = Math.max(0.001, 1 - dist * 4.5);
    }

    // Smooth scaling into view
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    );

    // Continuous slow orbit around central hub
    groupRef.current.rotation.y = time * 0.15 + cursor.x * 0.2;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 - cursor.y * 0.2;

    if (coreRef.current) {
      coreRef.current.rotation.y = -time * 0.5;
      coreRef.current.rotation.z = time * 0.3;
      const pulse = 1.0 + Math.sin(time * 3) * 0.08;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Engineering Node */}
      <mesh ref={coreRef} geometry={coreGeo}>
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Tech Nodes & Conduits */}
      {SKILL_NODES.map((node) => {
        // Line from center to node
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.pos)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={node.id} position={node.pos}>
            {/* Tech Node Sphere */}
            <mesh geometry={nodeGeo}>
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing Halo */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.18, 0.21, 32]} />
              <meshBasicMaterial
                color={node.color}
                side={THREE.DoubleSide}
                transparent
                opacity={0.4}
              />
            </mesh>

            {/* Connecting Conduit Line */}
            <primitive
              object={
                new THREE.Line(
                  lineGeo,
                  new THREE.LineBasicMaterial({
                    color: node.color,
                    transparent: true,
                    opacity: 0.3,
                  })
                )
              }
              position={[-node.pos[0], -node.pos[1], -node.pos[2]]}
            />
          </group>
        );
      })}
    </group>
  );
}

export default SkillNetwork;
