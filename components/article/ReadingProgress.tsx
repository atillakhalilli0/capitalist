"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const percent = Math.min(
        100,
        Math.max(0, (scrollTop / documentHeight) * 100)
      );

      setProgress(percent);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-1 bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}