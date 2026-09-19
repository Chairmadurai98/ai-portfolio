"use client";

import * as React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: prefersReducedMotion ? 1 : 0.08,
        duration: prefersReducedMotion ? 0.01 : 1.2,
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default LenisProvider;
