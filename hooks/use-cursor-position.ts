"use client";

import * as React from "react";

export interface CursorPosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

// Direct global mutable ref for zero-re-render 60 FPS reads inside useFrame
export const globalCursorRef: { current: CursorPosition } = {
  current: { x: 0, y: 0 },
};

export function useCursorPosition() {
  React.useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      targetX = (e.clientX - halfWidth) / halfWidth;
      targetY = -(e.clientY - halfHeight) / halfHeight;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateLoop = () => {
      // Smooth elastic damping
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      globalCursorRef.current.x = currentX;
      globalCursorRef.current.y = currentY;

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return globalCursorRef;
}

export default useCursorPosition;
