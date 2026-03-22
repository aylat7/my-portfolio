import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageLoading } from '@/components/ui/message-loading';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 1800);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <motion.div
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-forest-900"
      style={{ pointerEvents: phase === 'visible' ? 'auto' : 'none' }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-serif text-3xl md:text-4xl text-cream mb-6"
      >
        Ayla Topuz
      </motion.h1>
      <div className="text-forest-300">
        <MessageLoading />
      </div>
    </motion.div>
  );
}
