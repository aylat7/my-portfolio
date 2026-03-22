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
        <div className="absolute inset-0 -z-[5] pointer-events-none overflow-hidden">
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
