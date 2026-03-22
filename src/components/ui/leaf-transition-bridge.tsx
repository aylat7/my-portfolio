import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf } from '@/components/ui/leaf';

export function LeafTransitionBridge() {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="relative h-[28rem] z-10 pointer-events-none overflow-hidden">
      {/* Slow layer - larger leaves */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <Leaf
            key={i}
            className="absolute text-forest-300 w-10 h-10 opacity-60"
            style={{
              left: `${8 + i * 11}%`,
              top: `${15 + (i % 3) * 20}%`,
              animationDelay: `-${i * 0.8}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Fast layer - smaller, lime leaves */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <Leaf
            key={`fast-${i}`}
            className="absolute text-lime-accent w-7 h-7 opacity-40"
            style={{
              left: `${5 + i * 9}%`,
              top: `${10 + (i % 4) * 18}%`,
              animationDelay: `-${i * 1.3}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Top fade from hero */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a140f] to-transparent" />
      {/* Bottom fade into about */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0a140f]" />
    </div>
  );
}
