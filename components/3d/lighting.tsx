"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalScrollRef } from "@/hooks/use-scroll-progress";
import { globalCursorRef } from "@/hooks/use-cursor-position";

interface ColorStop {
  t: number;
  lightA: string; // Primary Key Light
  lightB: string; // Secondary Accent Light
  lightC: string; // Back/Rim Light
  intensityA: number;
  intensityB: number;
}

const LIGHT_STOPS: ColorStop[] = [
  // Hero: Blue & Emerald
  { t: 0.00, lightA: "#0066ff", lightB: "#00f5a0", lightC: "#0df2c8", intensityA: 1.4, intensityB: 1.0 },
  // Projects: Blue → Cyan
  { t: 0.20, lightA: "#3b82f6", lightB: "#0df2c8", lightC: "#6366f1", intensityA: 1.2, intensityB: 1.2 },
  // About: Blue → Violet
  { t: 0.40, lightA: "#6366f1", lightB: "#8b5cf6", lightC: "#00f5a0", intensityA: 1.3, intensityB: 1.1 },
  // Skills: Violet → Purple
  { t: 0.65, lightA: "#a855f7", lightB: "#8b5cf6", lightC: "#38bdf8", intensityA: 1.5, intensityB: 1.2 },
  // Playground: Purple → Cyan / Emerald
  { t: 0.82, lightA: "#00f5a0", lightB: "#a855f7", lightC: "#0df2c8", intensityA: 1.4, intensityB: 1.3 },
  // Contact: Cyan → White & Emerald
  { t: 1.00, lightA: "#0df2c8", lightB: "#ffffff", lightC: "#00f5a0", intensityA: 1.6, intensityB: 1.4 },
];

export function Lighting() {
  const lightARef = React.useRef<THREE.PointLight>(null);
  const lightBRef = React.useRef<THREE.PointLight>(null);
  const lightCRef = React.useRef<THREE.PointLight>(null);

  // Pre-allocated Color objects for zero-allocation performance
  const colA1 = React.useMemo(() => new THREE.Color(), []);
  const colA2 = React.useMemo(() => new THREE.Color(), []);
  const colB1 = React.useMemo(() => new THREE.Color(), []);
  const colB2 = React.useMemo(() => new THREE.Color(), []);
  const colC1 = React.useMemo(() => new THREE.Color(), []);
  const colC2 = React.useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const scrollT = globalScrollRef.current.progress;
    const cursor = globalCursorRef.current;

    // Find surrounding stops
    let idx = 0;
    for (let i = 0; i < LIGHT_STOPS.length - 1; i++) {
      if (scrollT >= LIGHT_STOPS[i].t && scrollT <= LIGHT_STOPS[i + 1].t) {
        idx = i;
        break;
      }
    }

    const s1 = LIGHT_STOPS[idx];
    const s2 = LIGHT_STOPS[idx + 1] || s1;
    const range = s2.t - s1.t || 1;
    const localT = (scrollT - s1.t) / range;
    const easeT = localT * localT * (3 - 2 * localT);

    // Interpolate colors
    colA1.set(s1.lightA);
    colA2.set(s2.lightA);
    colA1.lerp(colA2, easeT);

    colB1.set(s1.lightB);
    colB2.set(s2.lightB);
    colB1.lerp(colB2, easeT);

    colC1.set(s1.lightC);
    colC2.set(s2.lightC);
    colC1.lerp(colC2, easeT);

    if (lightARef.current) {
      lightARef.current.color.copy(colA1);
      lightARef.current.intensity = THREE.MathUtils.lerp(s1.intensityA, s2.intensityA, easeT);
      // Cursor influences light position
      lightARef.current.position.x = 4 + cursor.x * 1.5;
      lightARef.current.position.y = 4 + cursor.y * 1.5;
    }

    if (lightBRef.current) {
      lightBRef.current.color.copy(colB1);
      lightBRef.current.intensity = THREE.MathUtils.lerp(s1.intensityB, s2.intensityB, easeT);
      lightBRef.current.position.x = -4 - cursor.x * 1.5;
      lightBRef.current.position.y = -3 - cursor.y * 1.5;
    }

    if (lightCRef.current) {
      lightCRef.current.color.copy(colC1);
      lightCRef.current.position.z = 2 + cursor.y * 1.0;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 8, 5]} intensity={0.6} color="#ffffff" />
      <pointLight ref={lightARef} position={[4, 4, 3]} intensity={1.4} distance={20} decay={2} />
      <pointLight ref={lightBRef} position={[-4, -3, 2]} intensity={1.0} distance={18} decay={2} />
      <pointLight ref={lightCRef} position={[0, -2, -3]} intensity={0.8} distance={16} decay={2} />
    </>
  );
}

export default Lighting;
