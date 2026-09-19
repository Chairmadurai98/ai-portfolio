"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalScrollRef } from "@/hooks/use-scroll-progress";
import { globalCursorRef } from "@/hooks/use-cursor-position";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AICore() {
  const groupRef = React.useRef<THREE.Group>(null);
  const innerSphereRef = React.useRef<THREE.Mesh>(null);
  const lattice1Ref = React.useRef<THREE.Mesh>(null);
  const lattice2Ref = React.useRef<THREE.Mesh>(null);
  const ring1Ref = React.useRef<THREE.Group>(null);
  const ring2Ref = React.useRef<THREE.Group>(null);
  const ring3Ref = React.useRef<THREE.Group>(null);
  const beacon1Ref = React.useRef<THREE.Mesh>(null);
  const beacon2Ref = React.useRef<THREE.Mesh>(null);
  const beacon3Ref = React.useRef<THREE.Mesh>(null);

  const prefersReducedMotion = useReducedMotion();

  // Reusable materials & geometries
  const sphereGeo = React.useMemo(() => new THREE.IcosahedronGeometry(0.65, 3), []);
  const latticeGeo1 = React.useMemo(() => new THREE.IcosahedronGeometry(1.35, 1), []);
  const latticeGeo2 = React.useMemo(() => new THREE.OctahedronGeometry(1.7, 1), []);
  const beaconGeo = React.useMemo(() => new THREE.SphereGeometry(0.055, 16, 16), []);
  const ringGeo1 = React.useMemo(() => new THREE.RingGeometry(1.98, 2.02, 64), []);
  const ringGeo2 = React.useMemo(() => new THREE.RingGeometry(2.38, 2.42, 64), []);
  const ringGeo3 = React.useMemo(() => new THREE.RingGeometry(2.78, 2.82, 64), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollT = globalScrollRef.current.progress;
    const cursor = globalCursorRef.current;

    if (!groupRef.current) return;

    // Scroll-driven position, scale, and expansion
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1.0;

    if (scrollT < 0.25) {
      // Hero -> Projects
      const localT = scrollT / 0.25;
      targetX = THREE.MathUtils.lerp(0, -1.4, localT);
      targetY = THREE.MathUtils.lerp(-0.75, 0.2, localT);
      targetZ = THREE.MathUtils.lerp(0, -0.8, localT);
      targetScale = THREE.MathUtils.lerp(1.0, 0.85, localT);
    } else if (scrollT < 0.55) {
      // Projects -> About
      const localT = (scrollT - 0.25) / 0.3;
      targetX = THREE.MathUtils.lerp(-1.4, 1.3, localT);
      targetY = THREE.MathUtils.lerp(0.2, -0.3, localT);
      targetZ = THREE.MathUtils.lerp(-0.8, -0.5, localT);
      targetScale = THREE.MathUtils.lerp(0.85, 1.15, localT);
    } else if (scrollT < 0.8) {
      // About -> Skills & Playground
      const localT = (scrollT - 0.55) / 0.25;
      targetX = THREE.MathUtils.lerp(1.3, 0, localT);
      targetY = THREE.MathUtils.lerp(-0.3, 0.1, localT);
      targetZ = THREE.MathUtils.lerp(-0.5, 0.2, localT);
      targetScale = THREE.MathUtils.lerp(1.15, 0.95, localT);
    } else {
      // Playground -> Contact
      const localT = (scrollT - 0.8) / 0.2;
      targetX = THREE.MathUtils.lerp(0, 0, localT);
      targetY = THREE.MathUtils.lerp(0.1, 0, localT);
      targetZ = THREE.MathUtils.lerp(0.2, 0.5, localT);
      targetScale = THREE.MathUtils.lerp(0.95, 1.1, localT);
    }

    // Smoothly interpolate group transform
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    );

    // Cursor orientation tilt
    if (!prefersReducedMotion) {
      const targetRotY = (cursor.x * Math.PI) / 6;
      const targetRotX = -(cursor.y * Math.PI) / 6;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    // Inner Glowing Core breathing & subtle rotation
    if (innerSphereRef.current) {
      const pulse = Math.sin(time * 2.2) * 0.06;
      innerSphereRef.current.scale.setScalar(1.0 + pulse);
      innerSphereRef.current.rotation.y = time * 0.35;
      innerSphereRef.current.rotation.z = time * 0.2;
    }

    // Outer Geodesic Lattices counter-rotation
    if (lattice1Ref.current) {
      lattice1Ref.current.rotation.y = -time * 0.22;
      lattice1Ref.current.rotation.x = time * 0.15;
    }
    if (lattice2Ref.current) {
      lattice2Ref.current.rotation.y = time * 0.18;
      lattice2Ref.current.rotation.z = -time * 0.12;
    }

    // Orbiting Rings with Satellite Beacons
    if (ring1Ref.current && beacon1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.4;
      const angle = time * 0.8;
      beacon1Ref.current.position.x = Math.cos(angle) * 2.0;
      beacon1Ref.current.position.y = Math.sin(angle) * 2.0;
    }

    if (ring2Ref.current && beacon2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.3;
      const angle = -time * 0.6;
      beacon2Ref.current.position.x = Math.cos(angle) * 2.4;
      beacon2Ref.current.position.y = Math.sin(angle) * 2.4;
    }

    if (ring3Ref.current && beacon3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.25;
      const angle = time * 0.5;
      beacon3Ref.current.position.x = Math.cos(angle) * 2.8;
      beacon3Ref.current.position.y = Math.sin(angle) * 2.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Glowing Core Sphere */}
      <mesh ref={innerSphereRef} geometry={sphereGeo}>
        <meshStandardMaterial
          color="#06281e"
          emissive="#00f5a0"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Wireframe Geodesic Lattice 1 (Emerald) */}
      <mesh ref={lattice1Ref} geometry={latticeGeo1}>
        <meshStandardMaterial
          color="#0df2c8"
          emissive="#0df2c8"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Outer Wireframe Geodesic Lattice 2 (Cyan / Sky) */}
      <mesh ref={lattice2Ref} geometry={latticeGeo2}>
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.25}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbiting Ring 1 (Emerald, tilted 60 deg) */}
      <group rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <group ref={ring1Ref}>
          <mesh geometry={ringGeo1}>
            <meshBasicMaterial
              color="#00f5a0"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        <mesh ref={beacon1Ref} geometry={beaconGeo}>
          <meshStandardMaterial color="#ffffff" emissive="#00f5a0" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* Orbiting Ring 2 (Cyan, tilted -45 deg) */}
      <group rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <group ref={ring2Ref}>
          <mesh geometry={ringGeo2}>
            <meshBasicMaterial
              color="#0df2c8"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        <mesh ref={beacon2Ref} geometry={beaconGeo}>
          <meshStandardMaterial color="#ffffff" emissive="#0df2c8" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* Orbiting Ring 3 (Violet/Sky, tilted horizontal) */}
      <group rotation={[Math.PI / 8, -Math.PI / 3, 0]}>
        <group ref={ring3Ref}>
          <mesh geometry={ringGeo3}>
            <meshBasicMaterial
              color="#a855f7"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        <mesh ref={beacon3Ref} geometry={beaconGeo}>
          <meshStandardMaterial color="#ffffff" emissive="#a855f7" emissiveIntensity={1.6} />
        </mesh>
      </group>
    </group>
  );
}

export default AICore;
