"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { globalScrollRef } from "@/hooks/use-scroll-progress";
import { globalCursorRef } from "@/hooks/use-cursor-position";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Keyframe {
  t: number;
  pos: [number, number, number];
  lookAt: [number, number, number];
}

const CAMERA_KEYFRAMES: Keyframe[] = [
  { t: 0.00, pos: [0, 0, 5.0], lookAt: [0, 0, 0] },       // Hero
  { t: 0.16, pos: [1.3, 0.4, 6.2], lookAt: [0.3, 0, 0] },  // Projects
  { t: 0.34, pos: [-1.8, -0.3, 6.0], lookAt: [-0.3, 0, 0] },// About
  { t: 0.50, pos: [0.9, -0.5, 5.8], lookAt: [0.1, -0.2, 0] }, // Experience
  { t: 0.66, pos: [0, 0.2, 5.2], lookAt: [0, 0.1, 0] },    // Skills Constellation
  { t: 0.80, pos: [1.6, -0.3, 6.2], lookAt: [0.4, 0, 0] }, // AI Playground
  { t: 0.90, pos: [-0.8, 0.2, 5.5], lookAt: [-0.1, 0, 0] },// Process & Philosophy
  { t: 1.00, pos: [0, 0, 4.4], lookAt: [0, 0, 0] },       // Contact Monolith
];

function interpolateKeyframes(
  t: number,
  keyframes: Keyframe[]
): { pos: THREE.Vector3; lookAt: THREE.Vector3 } {
  const clampedT = Math.max(0, Math.min(1, t));

  // Find surrounding keyframes
  let idx = 0;
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (clampedT >= keyframes[i].t && clampedT <= keyframes[i + 1].t) {
      idx = i;
      break;
    }
  }

  const k1 = keyframes[idx];
  const k2 = keyframes[idx + 1] || keyframes[idx];
  const range = k2.t - k1.t || 1;
  const localT = (clampedT - k1.t) / range;
  // Smooth cubic easing
  const easeT = localT * localT * (3 - 2 * localT);

  const pos = new THREE.Vector3(
    THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], easeT),
    THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], easeT),
    THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], easeT)
  );

  const lookAt = new THREE.Vector3(
    THREE.MathUtils.lerp(k1.lookAt[0], k2.lookAt[0], easeT),
    THREE.MathUtils.lerp(k1.lookAt[1], k2.lookAt[1], easeT),
    THREE.MathUtils.lerp(k1.lookAt[2], k2.lookAt[2], easeT)
  );

  return { pos, lookAt };
}

export function CameraRig() {
  const { camera } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Working vectors to prevent per-frame garbage collection
  const targetPos = React.useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = React.useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = React.useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollT = globalScrollRef.current.progress;
    const cursor = globalCursorRef.current;

    // Calculate base position from scroll spline
    const { pos, lookAt } = interpolateKeyframes(scrollT, CAMERA_KEYFRAMES);
    targetPos.copy(pos);
    targetLookAt.copy(lookAt);

    if (!prefersReducedMotion) {
      // Elastic cursor parallax
      const cursorX = cursor.x * 0.45;
      const cursorY = cursor.y * 0.35;
      targetPos.x += cursorX;
      targetPos.y += cursorY;

      // Subtle breathing motion (keeps world feeling alive even when static)
      const breath = Math.sin(time * 0.9) * 0.04;
      targetPos.y += breath;
      targetPos.z += Math.cos(time * 0.7) * 0.03;
    }

    // Smooth camera position interpolation
    camera.position.lerp(targetPos, prefersReducedMotion ? 0.2 : 0.06);

    // Smooth lookAt interpolation
    currentLookAt.lerp(targetLookAt, prefersReducedMotion ? 0.2 : 0.06);
    camera.lookAt(currentLookAt);
  });

  return null;
}

export default CameraRig;
