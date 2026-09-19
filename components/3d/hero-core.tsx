"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { CanvasContainer } from "./canvas-container";

// Inner Pulsing Core
function InnerCore({ hovered }: { hovered: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // Subtle breathing scale
    const baseScale = hovered ? 1.15 : 1.0;
    const pulse = Math.sin(time * 2.5) * 0.05;
    meshRef.current.scale.setScalar(baseScale + pulse);
    meshRef.current.rotation.y = time * 0.4;
    meshRef.current.rotation.x = time * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial
        color="#00f5a0"
        emissive="#00f5a0"
        emissiveIntensity={hovered ? 0.9 : 0.45}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

// Outer Wireframe Geodesic Lattice
function OuterLattice({ hovered }: { hovered: boolean }) {
  const latticeRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!latticeRef.current) return;
    const time = state.clock.getElapsedTime();
    latticeRef.current.rotation.y = -time * 0.25;
    latticeRef.current.rotation.z = time * 0.15;
  });

  return (
    <mesh ref={latticeRef}>
      <icosahedronGeometry args={[1.45, 1]} />
      <meshStandardMaterial
        color={hovered ? "#0df2c8" : "#8e94a0"}
        emissive={hovered ? "#0df2c8" : "#00f5a0"}
        emissiveIntensity={hovered ? 0.5 : 0.15}
        wireframe={true}
        transparent={true}
        opacity={hovered ? 0.65 : 0.35}
      />
    </mesh>
  );
}

// Orbiting Data Ring with Satellite Beacon
function DataRing({
  radius,
  tiltX,
  tiltY,
  speed,
  color,
}: {
  radius: number;
  tiltX: number;
  tiltY: number;
  speed: number;
  color: string;
}) {
  const ringGroupRef = React.useRef<THREE.Group>(null);
  const beaconRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    ringGroupRef.current.rotation.z = time * speed;

    if (beaconRef.current) {
      const angle = time * speed * 2;
      beaconRef.current.position.x = Math.cos(angle) * radius;
      beaconRef.current.position.y = Math.sin(angle) * radius;
    }
  });

  return (
    <group rotation={[tiltX, tiltY, 0]}>
      {/* Ring Path */}
      <group ref={ringGroupRef}>
        <mesh>
          <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Orbiting Satellite Beacon */}
      <mesh ref={beaconRef}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

// Complete 3D Core with Smooth Mouse Lerping
function CoreScene() {
  const groupRef = React.useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth cursor tracking via lerp
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = -(state.pointer.y * Math.PI) / 8;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetY,
      0.05
    );
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <InnerCore hovered={hovered} />
        <OuterLattice hovered={hovered} />

        {/* Orbiting Ring 1 (Emerald) */}
        <DataRing
          radius={2.0}
          tiltX={Math.PI / 3}
          tiltY={Math.PI / 6}
          speed={0.35}
          color="#00f5a0"
        />

        {/* Orbiting Ring 2 (Cyan) */}
        <DataRing
          radius={2.4}
          tiltX={-Math.PI / 4}
          tiltY={Math.PI / 4}
          speed={-0.25}
          color="#0df2c8"
        />

        {/* Subtle Ambient Data Particles */}
        <Sparkles
          count={35}
          scale={5}
          size={1.6}
          speed={0.4}
          color="#00f5a0"
          opacity={0.4}
        />
      </Float>
    </group>
  );
}

export function HeroCore() {
  return (
    <CanvasContainer
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      className="w-full h-[460px] sm:h-[520px] max-w-2xl mx-auto"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -3, 2]} intensity={0.8} color="#00f5a0" />
      <pointLight position={[3, -2, -2]} intensity={0.5} color="#0df2c8" />
      <CoreScene />
    </CanvasContainer>
  );
}

export default HeroCore;

