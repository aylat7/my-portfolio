# Forest Scroll Scene with Clearings -- CLAUDE.md Addendum

## Context
This is an ADDENDUM to the main portfolio CLAUDE.md. Execute this AFTER Phase 2 is working (hero + navbar + about + leaf particles all rendering correctly).

This adds an immersive "walking through the woods" scroll experience where the background evolves and each content section has its own "clearing" that opens up as it scrolls into view.

## What This Does
- Background forest layers shift as the user scrolls (canopy fades, deeper forest appears)
- Each section (About, Experience, Projects, Skills, Contact) has a unique "clearing" effect: the forest visually opens up around the text
- Text has subtle opposite parallax (moves slightly upward while background drifts down)
- Leaf bursts trigger when sections enter the viewport
- Each clearing has a small thematic accent (not complex illustrations, just mood-setting elements)

## Design Philosophy
Do NOT try to build detailed campsite illustrations from Lucide icons. That will look bad. Instead:
- Clearings are created with LIGHT and SPACE: soft radial gradients, reduced particle density, warm glowing circles
- Each clearing has 1-2 small Lucide icon accents (not composed scenes)
- The "walking deeper" feeling comes from parallax layers and color temperature shifts, not literal drawings of trees

## Dependencies
Already installed from the main CLAUDE.md:
- framer-motion
- lucide-react
- tailwind with forest color palette

## Create: `src/components/ui/forest-scroll-scene.tsx`

This component creates the layered background that sits BEHIND all content sections.

```tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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
          <div className="absolute top-20 right-1/3 w-64 h-64 rounded-full bg-forest-200/3 blur-2xl" />
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
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-forest-300/3 blur-3xl" />
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
          <div className="w-full h-full bg-gradient-to-t from-forest-600/15 via-forest-500/8 to-transparent blur-xl" />
        </motion.div>
      </div>

      {/* === CONTENT (sits on top of forest layers) === */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
```

## Create: `src/components/ui/section-clearing.tsx`

This wraps each content section. It creates the "clearing" effect: a soft glow that opens up around the text when the section is in view, plus a leaf burst.

```tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionClearingProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  /** Warm glow color for this clearing. Defaults to forest-300. */
  glowColor?: string;
  /** Optional Lucide icon component to show as a small accent */
  accentIcon?: React.ReactNode;
}

export function SectionClearing({
  id,
  children,
  className,
  title,
  subtitle,
  glowColor = 'rgba(74, 222, 128, 0.06)',
  accentIcon,
}: SectionClearingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });

  // Opposite parallax: text moves slightly upward relative to scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Leaf burst state
  const [showLeafBurst, setShowLeafBurst] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      setShowLeafBurst(true);
      setTimeout(() => setShowLeafBurst(false), 2000);
    }
  }, [isInView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ y: textY }}
      className={cn(
        'relative px-6 md:px-12 lg:px-24 py-20 max-w-6xl mx-auto',
        className
      )}
    >
      {/* Clearing glow (soft radial light behind content) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 70%)` }}
        />
      </motion.div>

      {/* Leaf burst (triggers once when section enters view) */}
      {showLeafBurst && (
        <div className="absolute inset-0 -z-5 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0.6,
                x: '50%',
                y: '50%',
                scale: 0.5,
                rotate: Math.random() * 360,
              }}
              animate={{
                opacity: 0,
                x: `${20 + Math.random() * 60}%`,
                y: `${Math.random() * 100}%`,
                scale: 1,
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: i * 0.1,
                ease: 'easeOut',
              }}
              className="absolute w-3 h-4"
            >
              <div className="w-full h-full bg-forest-300/40 rounded-full rotate-45"
                style={{ clipPath: 'ellipse(40% 50% at 50% 50%)' }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Optional accent icon (small, positioned subtly) */}
      {accentIcon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-8 right-8 text-forest-300 pointer-events-none"
        >
          {accentIcon}
        </motion.div>
      )}

      {/* Section header */}
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-2">{title}</h2>
          {subtitle && <p className="text-cream-muted text-lg">{subtitle}</p>}
          <div className="h-px w-16 bg-forest-300 mt-4" />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
```

## How to Wire It Up

Replace the current `SectionWrapper` usage in your section components (About.tsx, Experience.tsx, Projects.tsx, Skills.tsx) with `SectionClearing`. Same props, just swap the import.

Then in App.tsx, wrap everything after the hero in `ForestScrollScene`:

```tsx
import { ScrollHeroSection } from './components/ui/scroll-hero-section';
import { LeafParticles } from './components/ui/leaf-particles';
import { ForestScrollScene } from './components/ui/forest-scroll-scene';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
// Import Lucide icons for section accents
import { Tent, Briefcase, FolderOpen, Wrench, Flame } from 'lucide-react';

function App() {
  return (
    <>
      <LeafParticles count={20} />
      <Navbar />

      <div id="hero">
        <ScrollHeroSection />
      </div>

      <ForestScrollScene>
        {/* Each section uses SectionClearing instead of SectionWrapper */}
        {/* Pass accentIcon for the subtle icon in the corner */}
        {/* Pass custom glowColor per section for variety */}

        {/* About -- warm tent clearing */}
        {/* glowColor: warm amber-green */}
        {/* accentIcon: <Tent size={48} /> */}

        {/* Experience -- cabin clearing */}
        {/* accentIcon: <Briefcase size={48} /> */}

        {/* Projects -- tech clearing */}
        {/* accentIcon: <FolderOpen size={48} /> */}

        {/* Skills -- tool shed clearing */}
        {/* accentIcon: <Wrench size={48} /> */}

        {/* Contact -- campfire clearing */}
        {/* glowColor: warmer, slightly orange-tinted green */}
        {/* accentIcon: <Flame size={48} /> */}

        <About />
        <Experience />
        <Projects />
        <Skills />

        <footer id="contact" className="relative z-10 py-16 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          {/* Contact content */}
        </footer>
      </ForestScrollScene>
    </>
  );
}
```

## Important Notes for Claude Code
- The `ForestScrollScene` creates FIXED background layers. The `position: fixed` divs will NOT scroll with content. This is intentional -- it creates the parallax depth.
- The tree "trunks" are just thin gradient divs, not SVG illustrations. This is intentional -- they suggest trees without being literal.
- The clearing glow is a soft radial gradient, not a hard shape. It should feel like light filtering through an opening in the canopy.
- Leaf bursts trigger ONCE per section (first time in view), not every time.
- The opposite parallax on text (y: [40, -40]) is very subtle. Do not make it extreme or text will feel jumpy.
- All of this must work on mobile. On screens < 768px, reduce the tree trunk lines and make glows smaller.
- Do NOT use em dashes in any text content.

## Section-specific Clearing Configs

When updating each section component to use SectionClearing, pass these props:

About:
  - glowColor: "rgba(74, 222, 128, 0.06)"
  - accentIcon: <Tent size={48} />

Experience:
  - glowColor: "rgba(74, 222, 128, 0.05)"
  - accentIcon: <Briefcase size={48} />

Projects:
  - glowColor: "rgba(57, 255, 20, 0.04)"  (slightly more lime)
  - accentIcon: <FolderOpen size={48} />

Skills:
  - glowColor: "rgba(74, 222, 128, 0.05)"
  - accentIcon: <Wrench size={48} />

Contact:
  - glowColor: "rgba(134, 239, 172, 0.06)"  (warmer, lighter green)
  - accentIcon: <Flame size={48} />

## Checklist
- [ ] forest-scroll-scene.tsx created with 4 background layers
- [ ] section-clearing.tsx created with glow + leaf burst + parallax
- [ ] All section components updated to use SectionClearing instead of SectionWrapper
- [ ] App.tsx wraps sections in ForestScrollScene
- [ ] Background layers shift smoothly on scroll (canopy fades, deep forest appears)
- [ ] Each section has visible clearing glow when in viewport
- [ ] Leaf burst triggers once per section
- [ ] Lucide accent icons appear subtly in corners
- [ ] Text stays perfectly readable throughout
- [ ] Works on mobile
