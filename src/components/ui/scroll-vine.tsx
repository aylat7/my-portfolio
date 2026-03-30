import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// ── Deterministic pseudo-random ──────────────────────────────────
function srand(seed: number): number {
  return ((Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453) % 1 + 1) % 1;
}

// ── Pothos leaf SVG paths ────────────────────────────────────────
const LEAF_D =
  'M 0 18 C -3 11 -14 4 -17 -5 C -19 -12 -15 -21 -9 -25 ' +
  'C -5 -28 -2 -27 0 -23 C 2 -27 5 -28 9 -25 ' +
  'C 15 -21 19 -12 17 -5 C 14 4 3 11 0 18 Z';

const LEAF_HI =
  'M 0 10 C -1 6 -7 2 -9 -3 C -10 -7 -8 -13 -5 -16 ' +
  'C -3 -18 -1 -17 0 -14 C 1 -17 3 -18 5 -16 ' +
  'C 8 -13 10 -7 9 -3 C 7 2 1 6 0 10 Z';

// ── Leaf color palette ───────────────────────────────────────────
const COLORS = [
  { stops: ['#1a6b35', '#2e8a50'], hi: '#3aa860', vein: '#145028' },
  { stops: ['#2e8a4e', '#50c878'], hi: '#60d888', vein: '#1a6835' },
  { stops: ['#3a9a58', '#70db90'], hi: '#88efa0', vein: '#2a7a42' },
  { stops: ['#48aa62', '#8aef9f'], hi: '#a0f0b0', vein: '#358a50' },
  { stops: ['#3a8a4a', '#5aba70'], hi: '#7ade88', vein: '#2a6a38' },
];

// ── Data types ───────────────────────────────────────────────────
interface Pt { x: number; y: number }

interface LeafInfo {
  x: number; y: number;
  vineX: number; vineY: number;
  rot: number; sc: number;
  ci: number; t: number;
}

interface TendrilInfo {
  d: string; t: number;
  tipLeaf: LeafInfo;
}

// ── Generate a vine that winds across the full page in S-curves ──
function makeWindingVine(
  w: number, h: number, seed: number,
  freq: number, phase0: number
): Pt[] {
  const count = 55;
  const margin = w * 0.03;
  const usableW = w - 2 * margin;
  const pts: Pt[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const r = srand(seed + i);

    // Main sinusoidal sweep across page
    const phase = t * Math.PI * freq + phase0;
    const sinVal = Math.sin(phase);

    // Secondary wobble for organic feel
    const wobble = Math.sin(t * Math.PI * freq * 2.7 + seed * 0.3) * w * 0.018;
    // Tertiary micro-wobble
    const micro = Math.sin(t * Math.PI * freq * 5.3 + seed * 1.7) * w * 0.008;

    const baseX = margin + (sinVal + 1) / 2 * usableW + wobble + micro;
    const sway = (r - 0.5) * w * 0.015;

    pts.push({
      x: Math.max(8, Math.min(w - 8, baseX + sway)),
      y: t * h,
    });
  }
  return pts;
}

// ── Smooth cubic bezier path from waypoints ──────────────────────
function toPath(pts: Pt[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const dy = c.y - p.y;
    d += ` C ${p.x.toFixed(1)} ${(p.y + dy * 0.5).toFixed(1)} ${c.x.toFixed(1)} ${(c.y - dy * 0.5).toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }
  return d;
}

// ── Generate leaves along the winding vine ───────────────────────
function makeLeaves(pts: Pt[], w: number, seed: number): LeafInfo[] {
  const center = w / 2;
  const out: LeafInfo[] = [];

  for (let i = 2; i < pts.length - 1; i++) {
    if (srand(seed + i * 13) < 0.28) continue;

    const pt = pts[i];
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];

    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const angle = Math.atan2(dy, dx);

    const r1 = srand(seed + i * 7);
    const r2 = srand(seed + i * 17);
    const r3 = srand(seed + i * 23);
    const r4 = srand(seed + i * 31);

    // Bias leaves outward from center
    const outward = pt.x > center ? 1 : -1;
    const dir = r1 > 0.25 ? outward : -outward;

    const perpAngle = angle + (dir > 0 ? -Math.PI / 2 : Math.PI / 2);
    const dist = 16 + r2 * 14;

    out.push({
      x: pt.x + Math.cos(perpAngle) * dist,
      y: pt.y + Math.sin(perpAngle) * dist,
      vineX: pt.x,
      vineY: pt.y,
      rot: (perpAngle * 180 / Math.PI) + 90 + (r3 - 0.5) * 30,
      sc: 0.55 + r3 * 0.6,
      ci: Math.floor(r4 * COLORS.length),
      t: i / (pts.length - 1),
    });
  }
  return out;
}

// ── Generate tendrils that reach further from the vine ───────────
function makeTendrils(pts: Pt[], w: number, seed: number): TendrilInfo[] {
  const center = w / 2;
  const out: TendrilInfo[] = [];
  const interval = Math.floor(pts.length / 7);

  for (let i = interval; i < pts.length - 2; i += interval) {
    const pt = pts[i];
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];

    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const angle = Math.atan2(dy, dx);

    const r1 = srand(seed + i * 41);
    const r2 = srand(seed + i * 53);
    const r3 = srand(seed + i * 67);

    const outward = pt.x > center ? 1 : -1;
    const perpAngle = angle + (outward > 0 ? -Math.PI / 2 : Math.PI / 2);
    const reach = 60 + r1 * 100;

    const mid1X = pt.x + Math.cos(perpAngle + 0.3) * reach * 0.4;
    const mid1Y = pt.y + Math.sin(perpAngle + 0.3) * reach * 0.4 + 15;
    const mid2X = pt.x + Math.cos(perpAngle - 0.2) * reach * 0.75;
    const mid2Y = pt.y + Math.sin(perpAngle - 0.2) * reach * 0.75 + 25;
    const endX = pt.x + Math.cos(perpAngle) * reach;
    const endY = pt.y + Math.sin(perpAngle) * reach + 15 + r2 * 20;

    const d = `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} C ${mid1X.toFixed(1)} ${mid1Y.toFixed(1)} ${mid2X.toFixed(1)} ${mid2Y.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;

    out.push({
      d,
      t: i / (pts.length - 1),
      tipLeaf: {
        x: endX + Math.cos(perpAngle) * 8,
        y: endY - 4,
        vineX: endX,
        vineY: endY,
        rot: (perpAngle * 180 / Math.PI) + 90 + (r1 - 0.5) * 25,
        sc: 0.6 + r2 * 0.35,
        ci: Math.floor(r3 * COLORS.length),
        t: i / (pts.length - 1),
      },
    });
  }
  return out;
}

// ── Small curling tendrils (decorative spirals) ──────────────────
function makeCurls(pts: Pt[], w: number, seed: number): { d: string; t: number }[] {
  const center = w / 2;
  const out: { d: string; t: number }[] = [];

  for (let i = 4; i < pts.length - 2; i += 3) {
    if (srand(seed + i * 19) < 0.55) continue;

    const pt = pts[i];
    const r = srand(seed + i * 29);
    const outward = pt.x > center ? 1 : -1;

    // Small spiral curl
    const sx = pt.x;
    const sy = pt.y;
    const curl = outward * (8 + r * 12);
    const d = `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${(sx + curl * 0.3).toFixed(1)} ${(sy - 8).toFixed(1)} ${(sx + curl).toFixed(1)} ${(sy - 12).toFixed(1)} ${(sx + curl * 0.7).toFixed(1)} ${(sy - 5).toFixed(1)}`;

    out.push({ d, t: i / (pts.length - 1) });
  }
  return out;
}

// ── Sub-components ───────────────────────────────────────────────

function Stem({ d, progress }: { d: string; progress: MotionValue<number> }) {
  return (
    <>
      <motion.path
        d={d} stroke="#1e5a30" strokeOpacity={0.05} strokeWidth={12}
        strokeLinecap="round" fill="none" style={{ pathLength: progress }}
      />
      <motion.path
        d={d} stroke="#1e5a30" strokeOpacity={0.4} strokeWidth={3}
        strokeLinecap="round" fill="none" style={{ pathLength: progress }}
      />
      <motion.path
        d={d} stroke="#4ade80" strokeOpacity={0.1} strokeWidth={1.2}
        strokeLinecap="round" fill="none" style={{ pathLength: progress }}
      />
    </>
  );
}

function TendrilBranch({ tendril, progress }: { tendril: TendrilInfo; progress: MotionValue<number> }) {
  const tp = useTransform(progress, [tendril.t, Math.min(1, tendril.t + 0.05)], [0, 1]);

  return (
    <>
      <motion.path
        d={tendril.d} stroke="#1e5a30" strokeOpacity={0.28} strokeWidth={1.5}
        strokeLinecap="round" fill="none" style={{ pathLength: tp }}
      />
      <Leaf leaf={tendril.tipLeaf} progress={progress} />
    </>
  );
}

function CurlSpiral({ curl, progress }: { curl: { d: string; t: number }; progress: MotionValue<number> }) {
  const cp = useTransform(progress, [curl.t, Math.min(1, curl.t + 0.03)], [0, 1]);
  return (
    <motion.path
      d={curl.d} stroke="#2a6b3a" strokeOpacity={0.2} strokeWidth={0.8}
      strokeLinecap="round" fill="none" style={{ pathLength: cp }}
    />
  );
}

function Leaf({ leaf, progress }: { leaf: LeafInfo; progress: MotionValue<number> }) {
  const op = useTransform(progress, [Math.max(0, leaf.t - 0.01), leaf.t + 0.02], [0, 1]);
  const c = COLORS[leaf.ci % COLORS.length];

  const mx = (leaf.vineX + leaf.x) / 2;
  const my = leaf.vineY - 3;
  const tipY = leaf.y + 16 * leaf.sc;
  const pd = `M ${leaf.vineX.toFixed(1)} ${leaf.vineY.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${leaf.x.toFixed(1)} ${tipY.toFixed(1)}`;

  return (
    <>
      <motion.path
        d={pd} stroke="#1e5a30" strokeOpacity={0.25}
        strokeWidth={1} strokeLinecap="round" fill="none"
        style={{ opacity: op }}
      />

      <g transform={`translate(${leaf.x.toFixed(1)}, ${leaf.y.toFixed(1)}) rotate(${leaf.rot.toFixed(1)}) scale(${leaf.sc.toFixed(2)})`}>
        <motion.g style={{ opacity: op }}>
          <path d={LEAF_D} fill="rgba(0,0,0,0.1)" transform="translate(1.5, 2)" />
          <path d={LEAF_D} fill={`url(#leafG${leaf.ci % COLORS.length})`} />
          <path d={LEAF_HI} fill={c.hi} fillOpacity={0.22} />
          <ellipse cx={-4} cy={-10} rx={5} ry={7} fill={c.hi} fillOpacity={0.08} />
          <line x1="0" y1="16" x2="0" y2="-22" stroke={c.vein} strokeWidth={0.7} strokeOpacity={0.4} />
          <path d="M 0 8 C -5 4 -9 1 -13 -2" stroke={c.vein} strokeWidth={0.5} strokeOpacity={0.25} fill="none" />
          <path d="M 0 8 C 5 4 9 1 13 -2" stroke={c.vein} strokeWidth={0.5} strokeOpacity={0.25} fill="none" />
          <path d="M 0 -1 C -6 -4 -10 -8 -13 -13" stroke={c.vein} strokeWidth={0.4} strokeOpacity={0.2} fill="none" />
          <path d="M 0 -1 C 6 -4 10 -8 13 -13" stroke={c.vein} strokeWidth={0.4} strokeOpacity={0.2} fill="none" />
          <path d="M 0 -9 C -4 -12 -7 -16 -9 -20" stroke={c.vein} strokeWidth={0.35} strokeOpacity={0.16} fill="none" />
          <path d="M 0 -9 C 4 -12 7 -16 9 -20" stroke={c.vein} strokeWidth={0.35} strokeOpacity={0.16} fill="none" />
        </motion.g>
      </g>
    </>
  );
}

// ── Main component ───────────────────────────────────────────────

export function ScrollVine() {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [hide, setHide] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(1);

  useEffect(() => {
    const check = () => setHide(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setDims({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const aboutEl = document.getElementById('about');
      if (aboutEl) setScrollStart(aboutEl.offsetTop - window.innerHeight * 0.3);
      setScrollEnd(document.documentElement.scrollHeight - window.innerHeight);
    };
    measure();
    window.addEventListener('load', measure);
    const timer = setTimeout(measure, 500);
    return () => {
      window.removeEventListener('load', measure);
      clearTimeout(timer);
    };
  }, [dims]);

  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, (v) => {
    if (scrollEnd <= scrollStart) return 0;
    return Math.min(1, Math.max(0, (v - scrollStart) / (scrollEnd - scrollStart)));
  });
  const progress = useSpring(rawProgress, { stiffness: 45, damping: 18 });

  // Second vine offset slightly
  const rawProgress2 = useTransform(scrollY, (v) => {
    if (scrollEnd <= scrollStart) return 0;
    const offset = (scrollEnd - scrollStart) * 0.04;
    return Math.min(1, Math.max(0, (v - scrollStart - offset) / (scrollEnd - scrollStart)));
  });
  const progress2 = useSpring(rawProgress2, { stiffness: 40, damping: 20 });

  const vineData = useMemo(() => {
    if (dims.h === 0 || dims.w === 0) return null;

    // Primary vine: ~5 half-oscillations across the page
    const pts1 = makeWindingVine(dims.w, dims.h, 42, 5.5, 0);
    // Secondary vine: different frequency + phase for visual depth
    const pts2 = makeWindingVine(dims.w, dims.h, 137, 4.2, Math.PI * 0.7);

    return {
      path1: toPath(pts1),
      path2: toPath(pts2),
      leaves1: makeLeaves(pts1, dims.w, 42),
      leaves2: makeLeaves(pts2, dims.w, 137),
      tendrils1: makeTendrils(pts1, dims.w, 42),
      tendrils2: makeTendrils(pts2, dims.w, 137),
      curls1: makeCurls(pts1, dims.w, 42),
      curls2: makeCurls(pts2, dims.w, 137),
    };
  }, [dims.w, dims.h]);

  if (hide || !vineData) {
    return <div ref={ref} className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        fill="none"
      >
        <defs>
          {COLORS.map((c, i) => (
            <linearGradient
              key={i} id={`leafG${i}`}
              x1="0" y1="1" x2="0.7" y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor={c.stops[0]} />
              <stop offset="100%" stopColor={c.stops[1]} />
            </linearGradient>
          ))}
        </defs>

        {/* ── Primary vine ── */}
        <Stem d={vineData.path1} progress={progress} />
        {vineData.curls1.map((c, i) => (
          <CurlSpiral key={`c1-${i}`} curl={c} progress={progress} />
        ))}
        {vineData.tendrils1.map((t, i) => (
          <TendrilBranch key={`t1-${i}`} tendril={t} progress={progress} />
        ))}
        {vineData.leaves1.map((l, i) => (
          <Leaf key={`l1-${i}`} leaf={l} progress={progress} />
        ))}

        {/* ── Secondary vine ── */}
        <Stem d={vineData.path2} progress={progress2} />
        {vineData.curls2.map((c, i) => (
          <CurlSpiral key={`c2-${i}`} curl={c} progress={progress2} />
        ))}
        {vineData.tendrils2.map((t, i) => (
          <TendrilBranch key={`t2-${i}`} tendril={t} progress={progress2} />
        ))}
        {vineData.leaves2.map((l, i) => (
          <Leaf key={`l2-${i}`} leaf={l} progress={progress2} />
        ))}
      </svg>
    </div>
  );
}
