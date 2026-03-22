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
