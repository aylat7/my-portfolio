# Portfolio Complete Upgrade -- CLAUDE.md

## Project Overview
Complete redesign of Ayla Topuz's portfolio site. Dark forest green theme, scroll-based hero, modern component library, real resume content. Existing repo uses React + TypeScript + Tailwind CSS + Framer Motion. Deploy to GitHub Pages.

**IMPORTANT: Execute this file ONE PHASE AT A TIME. After each phase, stop, verify it works with `npm run dev`, then continue to the next phase.**

---

## Design Direction

### Color Palette (Tailwind CSS variables)
```css
:root {
  --forest-900: #0a140f;
  --forest-800: #0f1c14;
  --forest-700: #162118;
  --forest-600: #1e3a2a;
  --forest-500: #2d5a3f;
  --forest-400: #3d7a54;
  --forest-300: #4ade80;
  --forest-200: #86efac;
  --forest-100: #bbf7d0;
  --lime-accent: #39ff14;
  --cream: #f0ede6;
  --cream-muted: #b8b4aa;
}
```

Extend tailwind.config.ts with these as custom colors under `theme.extend.colors.forest` and `theme.extend.colors.lime-accent`.

### Typography
- Headings: `"Instrument Serif"` from Google Fonts (elegant, editorial, nature-appropriate)
- Body: `"DM Sans"` from Google Fonts (clean, modern, excellent readability)
- Code/mono: `"JetBrains Mono"`
- Import via `<link>` in the HTML head

### Visual Effects
- Subtle CSS leaf/particle system in the background (canvas-based, lightweight)
- Grain texture overlay on the body (CSS noise filter, very subtle)
- Smooth scroll behavior site-wide
- Framer Motion for section entrance animations (fade-up on scroll)

---

## Folder Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── scroll-hero-section.tsx   # Phase 1: Scroll word-cycling hero
│   │   ├── tube-light-navbar.tsx     # Phase 2: Floating navbar
│   │   ├── timeline.tsx              # Phase 3: Experience timeline
│   │   ├── bento-grid.tsx            # Phase 3: Projects grid
│   │   ├── scroll-area.tsx           # Phase 3: Timeline dependency
│   │   ├── leaf-particles.tsx        # Phase 2: CSS/Canvas leaf background
│   │   └── section-wrapper.tsx       # Phase 2: Reusable scroll-animated section
│   ├── sections/
│   │   ├── About.tsx                 # Phase 2
│   │   ├── Experience.tsx            # Phase 3
│   │   ├── Projects.tsx              # Phase 3
│   │   ├── Skills.tsx                # Phase 3
│   │   └── Contact.tsx               # Phase 4
│   └── layout/
│       └── Navbar.tsx                # Phase 2: Navbar integration
├── lib/
│   └── utils.ts                      # cn() utility
├── App.tsx                           # Main app, assembles all sections
├── index.css                         # Global styles + CSS variables
└── main.tsx                          # Entry point
```

---

## PHASE 1: Hero Section + Theme Foundation

### What to do
1. Install any missing dependencies:
   ```bash
   npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge
   ```

2. Add Google Fonts to `index.html` (in the `<head>`):
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
   ```

3. Create `src/lib/utils.ts` if it does not exist:
   ```ts
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

4. Update `tailwind.config.ts` -- extend the theme:
   ```ts
   theme: {
     extend: {
       colors: {
         forest: {
           900: '#0a140f',
           800: '#0f1c14',
           700: '#162118',
           600: '#1e3a2a',
           500: '#2d5a3f',
           400: '#3d7a54',
           300: '#4ade80',
           200: '#86efac',
           100: '#bbf7d0',
         },
         'lime-accent': '#39ff14',
         cream: '#f0ede6',
         'cream-muted': '#b8b4aa',
       },
       fontFamily: {
         serif: ['"Instrument Serif"', 'Georgia', 'serif'],
         sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
         mono: ['"JetBrains Mono"', 'monospace'],
       },
     },
   },
   ```

5. Update global CSS (`src/index.css` or `globals.css`) with base styles:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

   html {
     scroll-behavior: smooth;
     color-scheme: dark;
     scrollbar-color: #4ade80 transparent;
   }

   body {
     font-family: "DM Sans", system-ui, sans-serif;
     background: #0a140f;
     color: #f0ede6;
     -webkit-font-smoothing: antialiased;
   }

   /* Subtle grain overlay */
   body::after {
     content: '';
     position: fixed;
     inset: 0;
     z-index: 9999;
     pointer-events: none;
     opacity: 0.03;
     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
   }

   ::-webkit-scrollbar { width: 6px; }
   ::-webkit-scrollbar-track { background: transparent; }
   ::-webkit-scrollbar-thumb { background: #2d5a3f; border-radius: 3px; }
   ::-webkit-scrollbar-thumb:hover { background: #4ade80; }

   /* shadcn CSS variable overrides for forest theme */
   :root {
     --background: 140 30% 5%;
     --foreground: 40 15% 93%;
     --card: 140 20% 7%;
     --card-foreground: 40 15% 93%;
     --primary: 142 69% 58%;
     --primary-foreground: 140 30% 5%;
     --secondary: 140 15% 12%;
     --secondary-foreground: 40 15% 93%;
     --muted: 140 15% 12%;
     --muted-foreground: 40 10% 70%;
     --accent: 140 15% 12%;
     --accent-foreground: 40 15% 93%;
     --destructive: 0 84% 60%;
     --destructive-foreground: 40 15% 93%;
     --border: 140 15% 18%;
     --input: 140 15% 18%;
     --ring: 142 69% 58%;
     --radius: 0.75rem;
   }

   section { scroll-margin-top: 4rem; }
   ::selection { background: rgba(74, 222, 128, 0.3); color: #f0ede6; }
   a:focus-visible, button:focus-visible {
     outline: 2px solid #4ade80;
     outline-offset: 2px;
     border-radius: 4px;
   }
   ```

6. Create the scroll hero component at `src/components/ui/scroll-hero-section.tsx`:

```tsx
'use client';

import { useEffect } from 'react';

type Theme = 'system' | 'light' | 'dark';

export type ScrollHeroProps = {
  items?: string[];
  showFooter?: boolean;
  theme?: Theme;
  animate?: boolean;
  hue?: number;
  startVh?: number;
  spaceVh?: number;
  debug?: boolean;
  taglineHTML?: string;
};

function GitHubSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export function ScrollHeroSection({
  items = ['builds.', 'deploys.', 'predicts.', 'optimizes.', 'automates.', 'engineers.', 'ships.'],
  showFooter = false,
  theme = 'dark',
  animate = true,
  hue = 150,
  startVh = 50,
  spaceVh = 50,
  debug = false,
  taglineHTML = `and i'll show you how.<br /><a href="https://github.com/aylat7">github</a> · <a href="https://linkedin.com/in/ayla-topuz">linkedin</a>`,
}: ScrollHeroProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.animate = String(animate);
    root.dataset.debug = String(debug);
    root.style.setProperty('--hue', String(hue));
    root.style.setProperty('--start', `${startVh}vh`);
    root.style.setProperty('--space', `${spaceVh}vh`);
  }, [theme, animate, debug, hue, startVh, spaceVh]);

  return (
    <div
      className="min-h-screen w-screen"
      style={{ ['--count' as string]: items.length } as React.CSSProperties}
    >
      <header className="content fluid">
        <section className="content">
          <h1 className="sr-only sm:not-sr-only">
            <span aria-hidden="true">a CS student who&nbsp;</span>
            <span className="sr-only">a CS student who ships.</span>
          </h1>
          <ul aria-hidden="true">
            {items.map((word, i) => (
              <li key={i} style={{ ['--i' as string]: i } as React.CSSProperties}>
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>

      <main>
        <section>
          <p className="fluid" dangerouslySetInnerHTML={{ __html: taglineHTML }} />
          <a className="social-link" href="https://github.com/aylat7" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            <GitHubSVG />
          </a>
          <a className="social-link" href="https://linkedin.com/in/ayla-topuz" target="_blank" rel="noreferrer noopener" style={{ left: '4.5rem' }} aria-label="LinkedIn">
            <LinkedInSVG />
          </a>
        </section>
      </main>

      {showFooter && <footer>Ayla Topuz &copy; 2026</footer>}

      <style>{`
        @layer base, stick, demo, debug;

        :root {
          --start: 50vh;
          --space: 50vh;
          --hue: 150;
          --accent: hsl(150 50% 55%);
          --switch: #0a140f;
          --font-size-min: 14;
          --font-size-max: 20;
          --font-ratio-min: 1.1;
          --font-ratio-max: 1.33;
          --font-width-min: 375;
          --font-width-max: 1500;
        }
        [data-theme='dark'] { --switch: #0a140f; color-scheme: dark only; }
        [data-theme='light'] { --switch: #fff; color-scheme: light only; }
        html { color-scheme: light dark; scrollbar-color: var(--accent) #0000; }

        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
        }
        .fluid {
          --fluid-min: calc(var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0)));
          --fluid-max: calc(var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0)));
          --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (var(--font-width-max) - var(--font-width-min)));
          --fluid-type: clamp(
            (var(--fluid-min) / 16) * 1rem,
            ((var(--fluid-min) / 16) * 1rem)
              - (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem)
              + (var(--fluid-preferred) * var(--variable-unit, 100vi)),
            (var(--fluid-max) / 16) * 1rem
          );
          font-size: var(--fluid-type);
        }

        header {
          --font-level: 4;
          --font-size-min: 24;
          position: sticky;
          top: calc((var(--count) - 1) * -1lh);
          line-height: 1.2;
          display: flex;
          align-items: start;
          width: 100%;
          margin-bottom: var(--space);
          font-family: "Instrument Serif", Georgia, serif;
        }
        header section:first-of-type {
          display: flex; width: 100%;
          align-items: start; justify-content: center;
          padding-top: calc(var(--start) - 0.5lh);
        }
        header section:first-of-type h1 {
          position: sticky; top: calc(var(--start) - 0.5lh);
          margin: 0; font-weight: 600;
        }

        ul { font-weight: 600; list-style: none; padding: 0; margin: 0; }

        li {
          --dimmed: color-mix(in oklch, canvasText, #0000 80%);
          background:
            linear-gradient(
              180deg,
              var(--dimmed) 0 calc(var(--start) - 0.5lh),
              var(--accent) calc(var(--start) - 0.55lh) calc(var(--start) + 0.55lh),
              var(--dimmed) calc(var(--start) + 0.5lh)
            );
          background-attachment: fixed;
          color: #0000;
          background-clip: text;
        }

        main {
          width: 100%; height: 100vh; position: relative; z-index: 2;
          color: #f0ede6;
        }
        main::before {
          content: ''; position: absolute; inset: 0; z-index: -1;
          background: #0a140f; border-radius: 1rem 1rem 0 0;
        }
        main section {
          --font-level: 4; --font-size-min: 20;
          height: 100%; width: 100%; display: flex; place-items: center;
          font-family: "Instrument Serif", Georgia, serif;
        }
        main section p { margin: 0; font-weight: 600; white-space: nowrap; }
        main section a:not(.social-link) {
          color: var(--accent); text-decoration: none; text-underline-offset: 0.1lh;
        }
        main section a:not(.social-link):is(:hover, :focus-visible) { text-decoration: underline; }

        .social-link {
          color: #f0ede6;
          position: fixed; top: 1rem; left: 1rem;
          width: 48px; aspect-ratio: 1;
          display: grid; place-items: center; opacity: 0.8;
          transition: opacity 0.2s;
        }
        .social-link:is(:hover, :focus-visible) { opacity: 1; }
        .social-link svg { width: 75%; }

        footer {
          padding-block: 2rem; font-size: 0.875rem; font-weight: 300;
          color: #b8b4aa; text-align: center; width: 100%;
          background: #0a140f;
        }

        @supports (animation-timeline: view()) {
          [data-animate='true'] main { view-timeline: --section; }
          [data-animate='true'] main::before {
            transform-origin: 50% 100%;
            scale: 0.9;
            animation: grow both ease-in-out;
            animation-timeline: --section;
            animation-range: entry 50%;
          }
          [data-animate='true'] main section p {
            position: fixed; top: 50%; left: 50%; translate: -50% -50%;
            animation: reveal both ease-in-out;
            animation-timeline: --section;
            animation-range: entry 50%;
          }
          [data-animate='true'] main .social-link {
            animation: switch both ease-in-out;
            animation-timeline: --section;
            animation-range: entry 50%;
          }
          @keyframes switch { to { color: var(--switch); } }
          @keyframes reveal { from { opacity: 0; } to { opacity: 1; } }
          @keyframes grow { to { scale: 1; border-radius: 0; } }
        }

        [data-debug='true'] li { outline: 0.05em dashed currentColor; }
      `}</style>
    </div>
  );
}
```

7. Create a minimal App.tsx that ONLY renders the hero for Phase 1:
   ```tsx
   import { ScrollHeroSection } from './components/ui/scroll-hero-section';

   function App() {
     return <ScrollHeroSection />;
   }

   export default App;
   ```

### Phase 1 Checklist
- [ ] Dependencies installed
- [ ] Google Fonts added to index.html
- [ ] lib/utils.ts created with cn() helper
- [ ] tailwind.config.ts extended with forest colors + fonts
- [ ] Global CSS updated with dark forest theme + grain overlay + shadcn variable overrides
- [ ] scroll-hero-section.tsx created with all Ayla customizations
- [ ] App.tsx renders only the hero
- [ ] `npm run dev` works and hero scrolls correctly
- [ ] Words cycle through highlight band in forest green
- [ ] Social icons (GitHub, LinkedIn) appear top-left
- [ ] Tagline section reveals on scroll

**STOP HERE. Verify Phase 1 works before continuing.**

---

## PHASE 2: Navbar + Leaf Particles + About Section

### What to do

1. Create the leaf particle background at `src/components/ui/leaf-particles.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swayOffset: number;
  swaySpeed: number;
}

export function LeafParticles({ count = 25 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let leaves: Leaf[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createLeaf = (): Leaf => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.8 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.15 + 0.05,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.01 + 0.005,
    });

    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.size * 0.4, leaf.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach((leaf) => {
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(leaf.swayOffset) * 0.3;
        leaf.rotation += leaf.rotationSpeed;
        leaf.swayOffset += leaf.swaySpeed;
        if (leaf.y > canvas.height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * canvas.width;
        }
        drawLeaf(leaf);
      });
      animationId = requestAnimationFrame(animate);
    };

    resize();
    leaves = Array.from({ length: count }, createLeaf);
    leaves.forEach((l) => { l.y = Math.random() * canvas.height; });
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
```

2. Create section wrapper at `src/components/ui/section-wrapper.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({ id, children, className, title, subtitle }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={cn('relative z-10 px-6 md:px-12 lg:px-24 py-20 max-w-6xl mx-auto', className)}
    >
      {title && (
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-2">{title}</h2>
          {subtitle && <p className="text-cream-muted text-lg">{subtitle}</p>}
          <div className="h-px w-16 bg-forest-300 mt-4" />
        </div>
      )}
      {children}
    </motion.section>
  );
}
```

3. Create Tubelight Navbar at `src/components/ui/tube-light-navbar.tsx`:

```tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  useEffect(() => {
    const handleResize = () => {};
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (item: NavItem) => {
    setActiveTab(item.name);
    const el = document.querySelector(item.url);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={cn(
      "fixed bottom-6 sm:top-0 left-1/2 -translate-x-1/2 z-[200] sm:pt-6",
      className
    )}>
      <div className="flex items-center gap-3 bg-forest-900/80 border border-forest-600/50 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-cream-muted hover:text-forest-300",
                isActive && "bg-forest-700 text-forest-300"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-forest-300/5 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-forest-300 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-forest-300/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-forest-300/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-forest-300/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

4. Create Navbar layout at `src/components/layout/Navbar.tsx`:

```tsx
import { Home, User, Briefcase, FolderOpen, Wrench, Mail } from 'lucide-react';
import { NavBar } from '@/components/ui/tube-light-navbar';

export function Navbar() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: Home },
    { name: 'About', url: '#about', icon: User },
    { name: 'Experience', url: '#experience', icon: Briefcase },
    { name: 'Projects', url: '#projects', icon: FolderOpen },
    { name: 'Skills', url: '#skills', icon: Wrench },
    { name: 'Contact', url: '#contact', icon: Mail },
  ];
  return <NavBar items={navItems} />;
}
```

5. Create About section at `src/components/sections/About.tsx`:

```tsx
import { SectionWrapper } from '@/components/ui/section-wrapper';

export function About() {
  return (
    <SectionWrapper id="about" title="About" subtitle="A bit about me.">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4 text-cream-muted leading-relaxed">
          <p>
            I'm <span className="text-forest-300 font-medium">Ayla Topuz</span>, a third-year
            Computer Science student with an Economics minor at Wilfrid Laurier University.
            First-generation university student. Builder at heart.
          </p>
          <p>
            My work spans machine learning, full-stack development, and data engineering.
            At Scotiabank, I scaled AI-powered call monitoring from 2% to 100% coverage
            and built Python tooling used across multiple teams. I'm currently diving into
            quantum computing research with Dr. Shohini Ghose.
          </p>
          <p>
            Outside of code, I'm the President of For The Girls, a 250+ member student
            organization focused on empowering women through professional development.
            I also enjoy cycling, foraging, and cooking traditional Bosnian food.
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'University', value: 'Wilfrid Laurier' },
              { label: 'Program', value: 'CS + Econ Minor' },
              { label: 'Graduation', value: 'August 2027' },
              { label: 'Co-op', value: 'Scotiabank' },
              { label: 'Research', value: 'Quantum Computing' },
              { label: 'Organization', value: 'For The Girls (Pres.)' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-forest-800 border border-forest-600/30 rounded-lg p-4">
                <div className="text-xs text-cream-muted uppercase tracking-wider mb-1">{label}</div>
                <div className="text-cream font-medium text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

6. Update App.tsx:
```tsx
import { ScrollHeroSection } from './components/ui/scroll-hero-section';
import { LeafParticles } from './components/ui/leaf-particles';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';

function App() {
  return (
    <>
      <LeafParticles count={20} />
      <Navbar />
      <div id="hero">
        <ScrollHeroSection />
      </div>
      <About />
    </>
  );
}

export default App;
```

### Phase 2 Checklist
- [ ] leaf-particles.tsx created
- [ ] section-wrapper.tsx created
- [ ] tube-light-navbar.tsx created with forest theme
- [ ] Navbar.tsx created with section links
- [ ] About.tsx created with real bio
- [ ] App.tsx updated
- [ ] Leaf particles subtle in background
- [ ] Navbar appears and scrolls to sections

**STOP HERE. Verify Phase 2 works before continuing.**

---

## PHASE 3: Experience + Projects + Skills

### What to do

1. Install remaining dependency:
   ```bash
   npm install @radix-ui/react-scroll-area
   ```

2. Create `src/components/ui/scroll-area.tsx` -- copy the FULL scroll-area.tsx code from Document 3 in the conversation (the `preetsuthar17/scroll-area` code block). No modifications needed.

3. Create `src/components/ui/timeline.tsx` -- copy the FULL timeline.tsx code from Document 3 in the conversation. No modifications needed. Remove all the example components at the bottom (BasicTimelineExample, TimelineVariantsExample, etc.) -- only keep the core Timeline component and its types/exports.

4. Create `src/components/ui/bento-grid.tsx` -- copy the FULL bento-grid.tsx code from Document 4 in the conversation. No modifications needed.

5. Create Experience section at `src/components/sections/Experience.tsx`:

```tsx
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Timeline, type TimelineItem } from '@/components/ui/timeline';
import { Briefcase, GraduationCap, FlaskConical } from 'lucide-react';

export function Experience() {
  const items: TimelineItem[] = [
    {
      id: '1',
      title: 'Quantum Computing Research',
      description: 'Full research semester with Dr. Shohini Ghose. Exploring quantum information, teleportation protocols, and algorithm implementation in Qiskit.',
      timestamp: new Date('2026-01-01'),
      status: 'active' as const,
      icon: <FlaskConical className="h-3 w-3" />,
      content: (
        <div className="flex flex-wrap gap-2 mt-1">
          {['Qiskit', 'Quantum Algorithms', 'Python'].map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-forest-700 text-forest-300 border border-forest-600/30">{t}</span>
          ))}
        </div>
      ),
    },
    {
      id: '2',
      title: 'Operational Excellence Analyst -- Scotiabank',
      description: 'Integrated AI analytics to scale call quality monitoring from 2% to 100% coverage. Built Python automation tools adopted across multiple teams. Developed data pipelines that reduced manual reporting time by 40%.',
      timestamp: new Date('2025-09-01'),
      status: 'completed' as const,
      icon: <Briefcase className="h-3 w-3" />,
      content: (
        <div className="flex flex-wrap gap-2 mt-1">
          {['Python', 'AI Analytics', 'Data Pipelines', 'Automation'].map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-forest-700 text-forest-300 border border-forest-600/30">{t}</span>
          ))}
        </div>
      ),
    },
    {
      id: '3',
      title: 'BSc Computer Science -- Wilfrid Laurier University',
      description: 'Computer Science with Economics minor. President of For The Girls (250+ members). First-generation university student.',
      timestamp: new Date('2023-09-01'),
      status: 'completed' as const,
      icon: <GraduationCap className="h-3 w-3" />,
      content: (
        <div className="flex flex-wrap gap-2 mt-1">
          {['OS', 'Networks', 'Data Structures', 'Calculus', 'Macroeconomics'].map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-forest-700 text-forest-300 border border-forest-600/30">{t}</span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper id="experience" title="Experience" subtitle="Where I've been growing.">
      <Timeline items={items} variant="spacious" />
    </SectionWrapper>
  );
}
```

6. Create Projects section at `src/components/sections/Projects.tsx`:

```tsx
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'NBA Playoff Predictor',
    description: 'Gradient Boosting model achieving 92.8% CV accuracy for predicting NBA playoff outcomes. Feature engineering from 20+ season statistics.',
    metrics: '92.8% Accuracy',
    stack: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/aylat7/nba_playoff_predictor',
    className: 'md:col-span-2',
  },
  {
    title: 'Medical Image Segmentation',
    description: 'U-Net and Attention U-Net in PyTorch for nuclei segmentation. Deployed on HuggingFace Spaces with interactive demo.',
    metrics: 'Dice 0.91 / IoU 0.84',
    stack: ['PyTorch', 'Python', 'HuggingFace', 'OpenCV'],
    github: 'https://github.com/aylat7/nuclei-segmentation-ML',
    demo: 'https://huggingface.co/spaces/aylat7/nuclei-segmentation-ML',
    className: 'md:col-span-1',
  },
  {
    title: 'Library Database System',
    description: 'Comprehensive SQL database with stored procedures, triggers, and complex queries for library management operations.',
    metrics: 'Full CRUD + Analytics',
    stack: ['SQL', 'Stored Procedures', 'Triggers', 'ERD Design'],
    className: 'md:col-span-1',
  },
  {
    title: 'Eh-Conomy',
    description: 'Hackathon project: Canadian economic insight platform built with React, Next.js, REST APIs, and CI/CD pipeline.',
    metrics: 'Hackathon Project',
    stack: ['React', 'Next.js', 'REST APIs', 'CI/CD'],
    className: 'md:col-span-2',
  },
];

export function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Things I've built.">
      <BentoGrid className="auto-rows-[20rem]">
        {projects.map((project, i) => (
          <BentoGridItem
            key={i}
            title={
              <div className="flex items-center justify-between">
                <span className="text-cream">{project.title}</span>
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-cream-muted hover:text-forest-300 transition-colors">
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="text-cream-muted hover:text-forest-300 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            }
            description={
              <div className="space-y-3">
                <p className="text-cream-muted">{project.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-1 rounded bg-forest-300/10 text-forest-300 border border-forest-300/20">
                    {project.metrics}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-forest-700/50 text-cream-muted border border-forest-600/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            }
            header={
              <div className="h-full w-full bg-gradient-to-br from-forest-700 to-forest-800 flex items-center justify-center">
                <span className="text-forest-300/20 text-6xl font-serif">{project.title[0]}</span>
              </div>
            }
            className={`${project.className} bg-forest-800 border-forest-600/30 hover:border-forest-300/30`}
          />
        ))}
      </BentoGrid>
    </SectionWrapper>
  );
}
```

7. Create Skills section at `src/components/sections/Skills.tsx`:

```tsx
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'C', 'HTML/CSS', 'R'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'FastAPI', 'Flask', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Supabase', 'PostgreSQL', 'MongoDB', 'Linux', 'Jupyter'],
  },
  {
    category: 'Concepts',
    skills: ['Machine Learning', 'Data Structures', 'Algorithms', 'REST APIs', 'CI/CD', 'Agile', 'Quantum Computing'],
  },
];

export function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="What I work with.">
      <div className="grid md:grid-cols-2 gap-8">
        {skillGroups.map((group, groupIndex) => (
          <div key={group.category} className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-forest-300">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (groupIndex * 0.1) + (skillIndex * 0.03), duration: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(74, 222, 128, 0.15)' }}
                  className="text-sm px-3 py-1.5 rounded-full bg-forest-800 text-cream-muted border border-forest-600/30 cursor-default transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

8. Update App.tsx with all sections:

```tsx
import { ScrollHeroSection } from './components/ui/scroll-hero-section';
import { LeafParticles } from './components/ui/leaf-particles';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';

function App() {
  return (
    <>
      <LeafParticles count={20} />
      <Navbar />
      <div id="hero">
        <ScrollHeroSection />
      </div>
      <About />
      <Experience />
      <Projects />
      <Skills />
      <footer id="contact" className="relative z-10 py-16 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-cream mb-2">Contact</h2>
        <p className="text-cream-muted text-lg mb-2">Let's connect.</p>
        <div className="h-px w-16 bg-forest-300 mt-4 mb-8" />
        <p className="text-cream-muted leading-relaxed mb-8 max-w-xl">
          I'm currently looking for Summer 2026 co-op positions in software engineering,
          machine learning, and technical PM roles. If you're hiring or just want to chat,
          I'd love to hear from you.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="mailto:topu9419@mylaurier.ca" className="px-4 py-2 rounded-full bg-forest-800 border border-forest-600/30 text-cream hover:border-forest-300/30 hover:text-forest-300 transition-colors">topu9419@mylaurier.ca</a>
          <a href="https://github.com/aylat7" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-forest-800 border border-forest-600/30 text-cream hover:border-forest-300/30 hover:text-forest-300 transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/ayla-topuz" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-forest-800 border border-forest-600/30 text-cream hover:border-forest-300/30 hover:text-forest-300 transition-colors">LinkedIn</a>
          <a href="tel:4166293241" className="px-4 py-2 rounded-full bg-forest-800 border border-forest-600/30 text-cream hover:border-forest-300/30 hover:text-forest-300 transition-colors">(416) 629-3241</a>
        </div>
        <div className="mt-16 pt-8 border-t border-forest-600/20 text-center text-cream-muted text-sm">
          Ayla Topuz &copy; 2026
        </div>
      </footer>
    </>
  );
}

export default App;
```

### Phase 3 Checklist
- [ ] `npm install @radix-ui/react-scroll-area` run
- [ ] scroll-area.tsx created (copy from Document 3 dependency)
- [ ] timeline.tsx created (copy from Document 3, remove example components)
- [ ] bento-grid.tsx created (copy from Document 4)
- [ ] Experience.tsx created with Scotiabank + education + research
- [ ] Projects.tsx created with 4 real projects
- [ ] Skills.tsx created with 4 skill groups
- [ ] App.tsx updated with all sections + contact footer
- [ ] `npm run dev` shows full site
- [ ] `npm run build` succeeds
- [ ] Deploy to GitHub Pages

**DONE. Full portfolio upgraded.**

---

## Deployment (GitHub Pages)

If already using GitHub Pages:
1. `npm run build`
2. Make sure build config has `base: '/my-portfolio/'` (in vite.config.ts or equivalent)
3. Push to main
4. Existing GH Actions or `gh-pages` branch handles deployment

If not set up:
```bash
npm install gh-pages --save-dev
```
Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
Run: `npm run deploy`

---

## Style Rules (Enforced Everywhere)
- NEVER use em dashes in any text content
- All text in cream (#f0ede6) or cream-muted (#b8b4aa), never pure white
- Primary accent: forest-300 (#4ade80)
- Lime-accent (#39ff14) used sparingly for active/hover states only
- Headings: Instrument Serif. Body: DM Sans.
- All scroll animations use `viewport={{ once: true }}`
- Leaf particle count stays low (15-25)
- All links to Ayla's profiles use real URLs from her contact info

## Future Addition: NBA Dashboard
When the full-stack NBA Playoff Predictor dashboard is deployed, update the Projects bento grid to feature it with `md:col-span-2`, a "Featured" badge, a live demo link, and a screenshot as the header image.