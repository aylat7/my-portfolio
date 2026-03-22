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
};

export function ScrollHeroSection({
  items = ['builds.', 'deploys.', 'predicts.', 'optimizes.', 'automates.', 'engineers.', 'ships.'],
  showFooter = false,
  theme = 'dark',
  animate = true,
  hue = 150,
  startVh = 50,
  spaceVh = 50,
  debug = false,
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
      className="scroll-hero min-h-screen w-full overflow-hidden"
      style={{ ['--count' as string]: items.length } as React.CSSProperties}
    >
      <header className="content fluid">
        <section className="content">
          <h1 className="hero-heading">
            <span aria-hidden="true">I'm a CS student who&nbsp;</span>
            <span className="sr-only">I'm a CS student who ships.</span>
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

        .scroll-hero header {
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
        .scroll-hero header section:first-of-type {
          display: flex; width: 100%;
          align-items: start; justify-content: center;
          padding-top: calc(var(--start) - 0.5lh);
        }
        .hero-heading {
          position: sticky; top: calc(var(--start) - 0.5lh);
          margin: 0; font-weight: 600;
          color: #f0ede6;
        }

        .scroll-hero ul { font-weight: 600; list-style: none; padding: 0; margin: 0; }

        .scroll-hero li {
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

        .scroll-hero footer {
          padding-block: 2rem; font-size: 0.875rem; font-weight: 300;
          color: #b8b4aa; text-align: center; width: 100%;
          background: #0a140f;
        }

        [data-debug='true'] .scroll-hero li { outline: 0.05em dashed currentColor; }
      `}</style>
    </div>
  );
}
