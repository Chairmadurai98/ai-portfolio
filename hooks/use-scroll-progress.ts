"use client";

import * as React from "react";

export interface ScrollProgressData {
  progress: number; // 0 to 1 (interpolated)
  target: number;   // 0 to 1 (raw target)
  velocity: number;
}

// Global mutable ref for 60 FPS Three.js useFrame access without React re-renders
export const globalScrollRef: { current: ScrollProgressData } = {
  current: { progress: 0, target: 0, velocity: 0 },
};

export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let animId: number;
    let lastProgress = 0;

    const calculateRawProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      return Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    const updateLoop = () => {
      const raw = calculateRawProgress();
      globalScrollRef.current.target = raw;

      // Smooth lerp damping towards raw scroll position
      const diff = raw - globalScrollRef.current.progress;
      globalScrollRef.current.progress += diff * 0.08;
      globalScrollRef.current.velocity = globalScrollRef.current.progress - lastProgress;
      lastProgress = globalScrollRef.current.progress;

      // Update React state at a throttled rate if needed (for UI indicators)
      if (Math.abs(diff) > 0.001) {
        setProgress(globalScrollRef.current.progress);
      }

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return {
    progress,
    scrollRef: globalScrollRef,
  };
}

export default useScrollProgress;
