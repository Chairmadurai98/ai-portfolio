"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { CanvasContainer } from "./canvas-container";

function MonolithScene() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const ringRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = time * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      {/* Central Dodecahedron */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Halo */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.2, 1.24, 64]} />
        <meshBasicMaterial
          color="#0df2c8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
        />
      </mesh>

      <Sparkles count={25} scale={4} size={1.5} speed={0.4} color="#00f5a0" />
    </Float>
  );
}

export function ContactCore3D() {
  return (
    <div className="w-full h-[180px] max-w-xs mx-auto mb-4">
      <CanvasContainer camera={{ position: [0, 0, 3.8], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 2, 2]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-2, -1, 1]} intensity={0.8} color="#00f5a0" />
        <pointLight position={[2, -1, 1]} intensity={0.8} color="#0df2c8" />
        <MonolithScene />
      </CanvasContainer>
    </div>
  );
}

export default ContactCore3D;

