"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalScrollRef } from "@/hooks/use-scroll-progress";
import { globalCursorRef } from "@/hooks/use-cursor-position";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParticleFieldProps {
  isMobile?: boolean;
}

export function ParticleField({ isMobile = false }: ParticleFieldProps) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const foregroundPointsRef = React.useRef<THREE.Points>(null);
  const prefersReducedMotion = useReducedMotion();

  const count = isMobile ? 120 : 300;
  const fgCount = isMobile ? 40 : 100;

  // Background ambient data dust
  const [positions, initialPositions] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 16 - 2;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }
    return [pos, initial];
  }, [count]);

  // Foreground luminous dust motes
  const [fgPositions, fgInitialPositions] = React.useMemo(() => {
    const pos = new Float32Array(fgCount * 3);
    const initial = new Float32Array(fgCount * 3);
    for (let i = 0; i < fgCount; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 14;
      const z = Math.random() * 4 + 1; // closer to camera
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }
    return [pos, initial];
  }, [fgCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollT = globalScrollRef.current.progress;
    const scrollVel = globalScrollRef.current.velocity;
    const cursor = globalCursorRef.current;

    // Background particles gentle drift & subtle scroll parallax
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const initX = initialPositions[i3];
        const initY = initialPositions[i3 + 1];

        // Gentle floating wave
        if (!prefersReducedMotion) {
          array[i3] = initX + Math.sin(time * 0.2 + i) * 0.3 + cursor.x * 0.3;
          array[i3 + 1] = initY + Math.cos(time * 0.15 + i) * 0.3 - scrollT * 4;
        } else {
          array[i3 + 1] = initY - scrollT * 2;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Foreground motes react with stronger parallax & velocity drift
    if (foregroundPointsRef.current) {
      const fgGeo = foregroundPointsRef.current.geometry;
      const fgPosAttr = fgGeo.attributes.position;
      const fgArray = fgPosAttr.array as Float32Array;

      for (let i = 0; i < fgCount; i++) {
        const i3 = i * 3;
        const initX = fgInitialPositions[i3];
        const initY = fgInitialPositions[i3 + 1];

        if (!prefersReducedMotion) {
          fgArray[i3] = initX + Math.sin(time * 0.5 + i) * 0.5 + cursor.x * 0.8;
          fgArray[i3 + 1] = initY + Math.cos(time * 0.4 + i) * 0.5 - scrollT * 8 - scrollVel * 10;
        } else {
          fgArray[i3 + 1] = initY - scrollT * 4;
        }
      }
      fgPosAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Distant ambient data dust */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.05}
          color="#00f5a0"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Foreground luminous motes */}
      <points ref={foregroundPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[fgPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.06 : 0.08}
          color="#0df2c8"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default ParticleField;
