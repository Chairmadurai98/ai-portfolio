"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./camera-rig";
import { Lighting } from "./lighting";
import { AICore } from "./ai-core";
import { ParticleField } from "./particle-field";
import { ProjectObjects } from "./project-objects";
import { SkillNetwork } from "./skill-network";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[Scene] 3D WebGL render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function Scene() {
  const [mounted, setMounted] = React.useState(false);
  const [hasWebGL, setHasWebGL] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  // Initialize high-performance hooks
  useScrollProgress();
  useCursorPosition();
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
    setHasWebGL(checkWebGLSupport());
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted || !hasWebGL) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <SceneErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={isMobile ? [1, 1] : [1, 1.5]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          frameloop={prefersReducedMotion ? "demand" : "always"}
        >
          <React.Suspense fallback={null}>
            {/* Cinematic Camera Choreography */}
            <CameraRig />

            {/* Dynamic Scroll-Milestone Lighting */}
            <Lighting />

            {/* Ambient & Reactive Multi-tier Particles */}
            <ParticleField isMobile={isMobile} />

            {/* Flagship Intelligent AI Core */}
            <AICore />

            {/* 3D Floating Project Objects */}
            <ProjectObjects />

            {/* 3D Skill Constellation Network */}
            <SkillNetwork />
          </React.Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}

export default Scene;
