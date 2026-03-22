import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function IntroHero({ ready = true }: { ready?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-20% 0px' });
  const [waveKey, setWaveKey] = useState(0);
  const [hasTriggeredInitial, setHasTriggeredInitial] = useState(false);

  // Initial wave: wait until loading is done
  useEffect(() => {
    if (ready && !hasTriggeredInitial) {
      setHasTriggeredInitial(true);
      setWaveKey(k => k + 1);
    }
  }, [ready, hasTriggeredInitial]);

  // Re-trigger wave when scrolling back into view (after initial)
  useEffect(() => {
    if (isInView && hasTriggeredInitial) {
      setWaveKey(k => k + 1);
    }
  }, [isInView, hasTriggeredInitial]);

  return (
    <section ref={ref} className="relative z-10 flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <motion.span
          key={waveKey}
          className="text-5xl md:text-7xl inline-block"
          initial={{ rotate: 0 }}
          animate={waveKey > 0 ? { rotate: [0, 14, -8, 14, -4, 10, 0] } : { rotate: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ transformOrigin: '70% 70%' }}
        >
          👋
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream mt-6"
        >
          Hi, I'm Ayla Topuz
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-forest-300/60 text-sm tracking-wider"
        >
          scroll down
        </motion.div>
      </motion.div>
    </section>
  );
}
