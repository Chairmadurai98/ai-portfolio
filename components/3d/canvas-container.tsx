"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";

interface CanvasContainerProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  gl?: Record<string, unknown>;
  fallback?: React.ReactNode;
}

// Check WebGL availability safely on the client
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

// React Error Boundary to catch any WebGL context or shader errors
interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[CanvasContainer] WebGL scene render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

// Sleek cybernetic 2D fallback for devices without WebGL
function DefaultFallback() {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden">
      <div className="relative flex flex-col items-center space-y-4">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#00f5a0]/30 animate-ping opacity-25" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#00f5a0]/40 animate-spin [animation-duration:12s]" />
          <div className="w-12 h-12 rounded-xl bg-[#00f5a0]/10 border border-[#00f5a0]/50 rotate-45 flex items-center justify-center shadow-[0_0_25px_rgba(0,245,160,0.3)]" />
        </div>
        <span className="text-xs font-mono text-[#8e94a0] tracking-wider uppercase">
          AI Interface Core Active
        </span>
      </div>
    </div>
  );
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeMobile(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getMobileSnapshot() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function CanvasContainer({
  children,
  className = "w-full h-full",
  camera = { position: [0, 0, 5], fov: 45 },
  gl,
  fallback,
}: CanvasContainerProps) {
  const [mounted, setMounted] = React.useState(false);
  const [hasWebGL, setHasWebGL] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    setHasWebGL(checkWebGLSupport());
  }, []);

  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const isMobile = React.useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    () => false
  );

  const fallbackContent = fallback ?? <DefaultFallback />;

  if (!mounted) {
    return (
      <div className={`relative ${className}`} style={{ minHeight: "100%" }}>
        {fallbackContent}
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className={`relative ${className}`} style={{ minHeight: "100%" }}>
        {fallbackContent}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ minHeight: "100%" }}>
      <CanvasErrorBoundary fallback={fallbackContent}>
        <Canvas
          camera={camera}
          dpr={isMobile ? [1, 1] : [1, 1.5]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            ...gl,
          }}
          frameloop={prefersReducedMotion ? "demand" : "always"}
        >
          <React.Suspense fallback={null}>
            {children}
          </React.Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}

export default CanvasContainer;

