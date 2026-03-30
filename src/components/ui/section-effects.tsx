import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── 1. VineBorder ───────────────────────────────────────────────
// Continuous organic vine that wraps all four edges with tendrils and varied leaves.

// Main vine: continuous path wrapping top -> right -> bottom -> left
const mainVinePath =
  // Top edge (right to left, wavy)
  'M 1000 8 C 950 3 920 14 880 6 C 840 -2 800 12 750 7 C 700 2 660 15 600 5 ' +
  'C 540 -3 480 13 420 8 C 360 3 300 16 240 6 C 180 -2 120 12 60 7 C 30 4 10 10 5 12 ' +
  // Left edge (top to bottom, wavy)
  'C 0 60 10 110 6 160 C 2 210 12 260 5 310 C -2 360 8 410 4 460 ' +
  'C 0 510 10 560 6 610 C 2 660 12 710 5 760 C -2 810 8 860 4 910 C 0 950 6 980 10 992 ' +
  // Bottom edge (left to right, wavy)
  'C 60 998 110 986 160 994 C 210 1002 260 988 310 996 C 360 1004 410 986 460 994 ' +
  'C 510 1002 560 988 610 996 C 660 1004 710 986 760 994 C 810 1002 860 988 910 993 C 950 990 980 996 995 992 ' +
  // Right edge (bottom to top, wavy)
  'C 1000 940 990 890 996 840 C 1002 790 988 740 994 690 C 1000 640 990 590 996 540 ' +
  'C 1002 490 988 440 994 390 C 1000 340 990 290 996 240 C 1002 190 988 140 994 90 C 1000 50 996 20 1000 8';

// Branching tendrils that curl inward from the main vine
const tendrils = [
  // From top edge, curling downward
  { d: 'M 800 7 C 790 25 770 40 785 55 C 795 65 780 75 775 60', delay: 0.3 },
  { d: 'M 500 5 C 495 30 510 50 490 60 C 480 65 485 45 495 35', delay: 0.5 },
  { d: 'M 200 8 C 210 35 195 55 215 65 C 225 70 220 50 210 40', delay: 0.7 },
  // From left edge, curling rightward
  { d: 'M 6 250 C 30 245 50 255 60 240 C 68 230 55 225 45 235', delay: 0.6 },
  { d: 'M 5 550 C 35 555 55 540 65 555 C 72 565 58 570 48 560', delay: 0.9 },
  { d: 'M 8 800 C 30 795 50 810 60 795 C 68 785 55 780 45 790', delay: 1.1 },
  // From bottom edge, curling upward
  { d: 'M 300 995 C 305 970 290 950 310 940 C 320 935 315 955 305 965', delay: 0.8 },
  { d: 'M 700 993 C 695 965 710 945 690 938 C 680 935 685 955 695 962', delay: 1.0 },
  // From right edge, curling leftward
  { d: 'M 995 300 C 970 305 950 295 940 310 C 933 320 950 318 960 308', delay: 0.4 },
  { d: 'M 994 650 C 968 645 948 660 940 648 C 935 640 952 638 962 648', delay: 0.8 },
];

// Varied leaf shapes at points along the vine and tendrils
const leaves = [
  // Pointed leaf (classic)
  { x: 880, y: 6, d: 'M 0 0 C 4 -8 12 -10 14 -4 C 16 2 8 6 0 0 Z', rotate: 30, scale: 1.2, delay: 0.4 },
  // Round leaf
  { x: 600, y: 5, d: 'M 0 0 C -3 -6 -1 -12 5 -12 C 11 -12 13 -6 10 0 C 7 4 3 4 0 0 Z', rotate: -20, scale: 1, delay: 0.6 },
  // Heart-shaped leaf
  { x: 300, y: 10, d: 'M 0 0 C -5 -5 -4 -12 0 -14 C 4 -12 5 -5 0 0 Z M 0 0 C 5 -5 4 -12 0 -14', rotate: 45, scale: 1.3, delay: 0.8 },
  // Small pointed leaf
  { x: 100, y: 7, d: 'M 0 0 C 2 -5 8 -7 10 -3 C 12 1 6 4 0 0 Z', rotate: -35, scale: 1, delay: 1.0 },
  // Left edge leaves
  { x: 6, y: 160, d: 'M 0 0 C 4 -8 12 -10 14 -4 C 16 2 8 6 0 0 Z', rotate: 110, scale: 1.1, delay: 0.7 },
  { x: 5, y: 460, d: 'M 0 0 C -3 -6 -1 -12 5 -12 C 11 -12 13 -6 10 0 C 7 4 3 4 0 0 Z', rotate: 80, scale: 1.2, delay: 1.0 },
  { x: 4, y: 760, d: 'M 0 0 C 2 -5 8 -7 10 -3 C 12 1 6 4 0 0 Z', rotate: 130, scale: 1, delay: 1.2 },
  // Bottom edge leaves
  { x: 160, y: 994, d: 'M 0 0 C 4 -8 12 -10 14 -4 C 16 2 8 6 0 0 Z', rotate: -150, scale: 1.1, delay: 0.9 },
  { x: 460, y: 994, d: 'M 0 0 C -3 -6 -1 -12 5 -12 C 11 -12 13 -6 10 0 C 7 4 3 4 0 0 Z', rotate: 200, scale: 1, delay: 1.1 },
  { x: 760, y: 994, d: 'M 0 0 C 5 -5 4 -12 0 -14 C -4 -12 -5 -5 0 0 Z', rotate: -170, scale: 1.3, delay: 1.3 },
  // Right edge leaves
  { x: 995, y: 200, d: 'M 0 0 C 4 -8 12 -10 14 -4 C 16 2 8 6 0 0 Z', rotate: -70, scale: 1.1, delay: 0.5 },
  { x: 994, y: 540, d: 'M 0 0 C 2 -5 8 -7 10 -3 C 12 1 6 4 0 0 Z', rotate: -100, scale: 1.2, delay: 0.9 },
  { x: 996, y: 840, d: 'M 0 0 C -3 -6 -1 -12 5 -12 C 11 -12 13 -6 10 0 C 7 4 3 4 0 0 Z', rotate: -60, scale: 1, delay: 1.2 },
  // Tendril tip leaves
  { x: 775, y: 60, d: 'M 0 0 C 4 -8 12 -10 14 -4 C 16 2 8 6 0 0 Z', rotate: 60, scale: 0.9, delay: 1.5 },
  { x: 490, y: 60, d: 'M 0 0 C -3 -6 -1 -12 5 -12 C 11 -12 13 -6 10 0 C 7 4 3 4 0 0 Z', rotate: -40, scale: 0.8, delay: 1.6 },
  { x: 60, y: 240, d: 'M 0 0 C 2 -5 8 -7 10 -3 C 12 1 6 4 0 0 Z', rotate: 20, scale: 0.9, delay: 1.7 },
  { x: 60, y: 795, d: 'M 0 0 C 5 -5 4 -12 0 -14 C -4 -12 -5 -5 0 0 Z', rotate: 40, scale: 1, delay: 1.8 },
];

export function VineBorder() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {/* Main continuous vine wrapping all four edges */}
      <motion.path
        d={mainVinePath}
        stroke="#4ade80"
        strokeOpacity={0.3}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Branching tendrils */}
      {tendrils.map((t, i) => (
        <motion.path
          key={`tendril-${i}`}
          d={t.d}
          stroke="#4ade80"
          strokeOpacity={0.2}
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay: t.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Varied leaf shapes */}
      {leaves.map((leaf, i) => (
        <motion.g
          key={`leaf-${i}`}
          transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.scale})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: leaf.delay + 0.8, ease: 'easeOut' }}
        >
          <path
            d={leaf.d}
            fill="#4ade80"
            fillOpacity={0.2}
          />
          {/* Leaf vein */}
          <line
            x1="0" y1="0"
            x2={leaf.scale > 1 ? '7' : '5'}
            y2={leaf.scale > 1 ? '-7' : '-5'}
            stroke="#4ade80"
            strokeOpacity={0.15}
            strokeWidth={0.5}
          />
        </motion.g>
      ))}
    </svg>
  );
}

// ─── 2. ParticleSwirl ────────────────────────────────────────────
// Particles scatter inward and settle at the edges when section enters view.

interface Particle {
  id: number;
  size: number;
  color: string;
  opacity: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  midX: number;
  midY: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const scatter = 300 + Math.random() * 400;
    const settle = 80 + Math.random() * 40;
    return {
      id: i,
      size: 3 + Math.random() * 3,
      color: Math.random() > 0.5 ? '#4ade80' : '#39ff14',
      opacity: 0.2 + Math.random() * 0.3,
      startX: 50 + Math.cos(angle) * scatter,
      startY: 50 + Math.sin(angle) * scatter,
      endX: 50 + Math.cos(angle) * settle,
      endY: 50 + Math.sin(angle) * settle,
      midX: 50 + Math.cos(angle + 1.2) * (scatter * 0.6),
      midY: 50 + Math.sin(angle + 1.2) * (scatter * 0.6),
    };
  });
}

export function ParticleSwirl() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particles = useMemo(() => generateParticles(isMobile ? 8 : 18), [isMobile]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            opacity: 0,
          }}
          animate={isInView ? {
            left: [`${p.startX}%`, `${p.midX}%`, `${p.endX}%`],
            top: [`${p.startY}%`, `${p.midY}%`, `${p.endY}%`],
            opacity: [0, p.opacity, p.opacity],
          } : {
            opacity: 0,
          }}
          transition={{
            duration: 2,
            delay: p.id * 0.08,
            ease: 'easeInOut',
          }}
        >
          {/* Gentle floating after settling */}
          {isInView && (
            <motion.div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: p.color, opacity: p.opacity }}
              animate={{
                y: [0, -4, 0, 3, 0],
                x: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2 + p.id * 0.08,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── 3. LightShaft ──────────────────────────────────────────────
// Diagonal light sweep across the section, like sunlight through canopy.

export function LightShaft() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Disable on mobile
  if (isMobile) return null;

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute top-0 h-full w-[200px] -skew-x-12"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(240, 237, 230, 0.04) 40%, rgba(240, 237, 230, 0.04) 60%, transparent 100%)',
        }}
        initial={{ left: '-30%' }}
        whileInView={{ left: '130%' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─── 4. BackgroundShift ─────────────────────────────────────────
// Subtle background color change when section is in view.
// Used as a prop on SectionWrapper rather than a standalone component.
// Export the color map for each section.

export const sectionBgColors: Record<string, string> = {
  about: 'rgba(30, 58, 42, 0.3)',
  experience: 'rgba(15, 28, 20, 0.4)',
  projects: 'rgba(45, 90, 63, 0.2)',
  skills: 'rgba(22, 33, 24, 0.35)',
  contact: 'rgba(40, 60, 45, 0.25)',
};
