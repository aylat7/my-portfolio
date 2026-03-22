import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ForestScrollSceneProps {
  children: React.ReactNode;
}

export function ForestScrollScene({ children }: ForestScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Layer opacities tied to scroll
  const canopyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const midForestOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const deepForestOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const fogOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 0.6]);
  const fogY = useTransform(scrollYProgress, [0.5, 1], [60, 0]);

  // Parallax speeds for background layers
  const canopyY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const deepY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div ref={containerRef} className="relative">
      {/* === FIXED BACKGROUND LAYERS === */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Layer 1: Canopy (bright, open -- visible at top) */}
        <motion.div
          style={{ opacity: canopyOpacity, y: canopyY }}
          className="absolute inset-0"
        >
          {/* Soft light filtering through canopy */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-forest-300/5 blur-3xl" />
          <div className="absolute top-20 right-1/3 w-64 h-64 rounded-full bg-forest-200/[0.03] blur-2xl" />
        </motion.div>

        {/* Layer 2: Mid forest (tree silhouettes appearing) */}
        <motion.div
          style={{ opacity: midForestOpacity, y: midY }}
          className="absolute inset-0"
        >
          {/* Vertical dark bars suggesting tree trunks */}
          <div className="absolute left-[8%] top-0 w-px h-full bg-gradient-to-b from-transparent via-forest-600/20 to-transparent" />
          <div className="absolute left-[22%] top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-forest-600/15 to-transparent" />
          <div className="absolute right-[12%] top-0 w-px h-full bg-gradient-to-b from-transparent via-forest-600/25 to-transparent" />
          <div className="absolute right-[30%] top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-forest-600/10 to-transparent" />
          {/* Soft ambient glow between trees */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-forest-300/[0.03] blur-3xl" />
        </motion.div>

        {/* Layer 3: Deep forest (denser, darker) */}
        <motion.div
          style={{ opacity: deepForestOpacity, y: deepY }}
          className="absolute inset-0"
        >
          <div className="absolute left-[5%] top-0 w-1 h-full bg-gradient-to-b from-transparent via-forest-500/30 to-transparent" />
          <div className="absolute left-[15%] top-0 w-px h-full bg-gradient-to-b from-transparent via-forest-500/20 to-transparent" />
          <div className="absolute right-[7%] top-0 w-1 h-full bg-gradient-to-b from-transparent via-forest-500/25 to-transparent" />
          <div className="absolute right-[20%] top-0 w-px h-full bg-gradient-to-b from-transparent via-forest-500/15 to-transparent" />
          {/* Darker ambient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest-900/30 to-forest-900/50" />
        </motion.div>

        {/* Layer 4: Ground fog (rises from bottom) */}
        <motion.div
          style={{ opacity: fogOpacity, y: fogY }}
          className="absolute bottom-0 left-0 right-0 h-1/3"
        >
          <div className="w-full h-full bg-gradient-to-t from-forest-600/15 via-forest-500/[0.08] to-transparent blur-xl" />
        </motion.div>
      </div>

      {/* === CONTENT (sits on top of forest layers) === */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
