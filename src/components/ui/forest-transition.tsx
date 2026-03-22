import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Hill({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={className} style={style} />;
}

function TreeSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" fill="currentColor" className={className} aria-hidden="true">
      {/* Minimal abstract tree: tapered blob + trunk */}
      <ellipse cx="30" cy="35" rx="22" ry="32" opacity="0.9" />
      <ellipse cx="30" cy="20" rx="16" ry="22" />
      <rect x="26" y="60" width="8" height="60" rx="4" opacity="0.7" />
    </svg>
  );
}

export function ForestTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: background slowest, foreground fastest
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  // Fog builds up in the middle, fades at edges
  const fogOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 0.5, 0.4, 0]);

  // Floating shapes: very slow drift
  const float1Y = useTransform(scrollYProgress, [0, 1], [20, -30]);
  const float2Y = useTransform(scrollYProgress, [0, 1], [10, -50]);

  return (
    <div ref={ref} className="relative h-[110vh] z-10 overflow-hidden">
      {/* ── Base gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a140f] via-[#0c1a10] to-[#0a140f]" />

      {/* ── Ambient glow: soft green light near top center ── */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse at center, #4ade80 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Background layer: distant rolling hills ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Wide distant hill - left */}
        <Hill
          className="absolute bottom-[28%] -left-[5%] w-[55%] h-[22%] rounded-full"
          style={{ background: 'linear-gradient(to top, #0f1c14, #142a1b)', filter: 'blur(2px)' }}
        />
        {/* Wide distant hill - right */}
        <Hill
          className="absolute bottom-[32%] -right-[8%] w-[60%] h-[18%] rounded-full"
          style={{ background: 'linear-gradient(to top, #0f1c14, #112116)', filter: 'blur(3px)' }}
        />
        {/* Center distant hill */}
        <Hill
          className="absolute bottom-[25%] left-[20%] w-[60%] h-[25%] rounded-full"
          style={{ background: 'linear-gradient(to top, #101d14, #162118)', filter: 'blur(1px)' }}
        />
      </motion.div>

      {/* ── Midground layer: closer hills + abstract tree silhouettes ── */}
      <motion.div style={{ y: midY }} className="absolute inset-0">
        {/* Left hill */}
        <Hill
          className="absolute bottom-[12%] -left-[10%] w-[50%] h-[30%] rounded-full"
          style={{ background: 'linear-gradient(to top, #0a140f, #1e3a2a)' }}
        />
        {/* Right hill */}
        <Hill
          className="absolute bottom-[15%] -right-[5%] w-[45%] h-[28%] rounded-full"
          style={{ background: 'linear-gradient(to top, #0a140f, #1a3325)' }}
        />
        {/* Center hill overlap */}
        <Hill
          className="absolute bottom-[8%] left-[15%] w-[70%] h-[32%] rounded-full"
          style={{ background: 'linear-gradient(to top, #0a140f, #1e3a2a)' }}
        />

        {/* Abstract tree silhouettes on hills */}
        <TreeSilhouette className="absolute bottom-[28%] left-[18%] w-10 h-20 text-[#162118]" />
        <TreeSilhouette className="absolute bottom-[30%] left-[28%] w-8 h-16 text-[#142a1b]" />
        <TreeSilhouette className="absolute bottom-[26%] right-[22%] w-12 h-24 text-[#162118]" />
        <TreeSilhouette className="absolute bottom-[29%] right-[35%] w-7 h-14 text-[#1a3325]" />
        <TreeSilhouette className="absolute bottom-[32%] left-[45%] w-9 h-18 text-[#142a1b]" />
      </motion.div>

      {/* ── Foreground layer: closest hills + trees ── */}
      <motion.div style={{ y: fgY }} className="absolute inset-0">
        {/* Large foreground hill */}
        <Hill
          className="absolute -bottom-[5%] -left-[8%] w-[55%] h-[35%] rounded-full"
          style={{ background: 'linear-gradient(to top, #0a140f, #0f1c14)' }}
        />
        <Hill
          className="absolute -bottom-[3%] -right-[10%] w-[50%] h-[32%] rounded-full"
          style={{ background: 'linear-gradient(to top, #0a140f, #0d1a10)' }}
        />
        {/* Center foreground mass */}
        <Hill
          className="absolute -bottom-[8%] left-[10%] w-[80%] h-[28%] rounded-full"
          style={{ background: '#0a140f' }}
        />

        {/* Close tree silhouettes */}
        <TreeSilhouette className="absolute bottom-[18%] left-[8%] w-14 h-28 text-[#0f1c14]" />
        <TreeSilhouette className="absolute bottom-[20%] right-[12%] w-16 h-32 text-[#0d1a10]" />
        <TreeSilhouette className="absolute bottom-[15%] left-[40%] w-10 h-20 text-[#0f1c14]" />
      </motion.div>

      {/* ── Floating shapes: slow ambient drift ── */}
      <motion.div
        style={{ y: float1Y }}
        className="absolute top-[20%] left-[15%] w-40 h-40 rounded-full opacity-[0.04]"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: float2Y }}
        className="absolute top-[35%] right-[10%] w-56 h-56 rounded-full opacity-[0.03]"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, #39ff14 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* ── Fog overlay ── */}
      <motion.div style={{ opacity: fogOpacity }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 10%, rgba(15, 28, 20, 0.4) 40%, rgba(15, 28, 20, 0.3) 60%, transparent 90%)',
          }}
        />
        {/* Horizontal fog band */}
        <div
          className="absolute top-[40%] left-0 right-0 h-[20%]"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(10, 20, 15, 0.25), transparent)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      {/* ── Section blends ── */}
      <div className="absolute top-0 left-0 right-0 h-[18%] bg-gradient-to-b from-[#0a140f] to-transparent z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-b from-transparent to-[#0a140f] z-20" />
    </div>
  );
}
