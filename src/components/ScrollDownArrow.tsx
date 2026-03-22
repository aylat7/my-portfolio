import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollDownArrowProps {
  targetId: string;
  text: string;
}

const ScrollDownArrow = ({ targetId, text }: ScrollDownArrowProps) => {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="flex flex-col items-center mt-8 cursor-pointer group"
      onClick={handleClick}
      role="button"
      aria-label={`Scroll to ${targetId}`}
    >
      <p className="font-sans text-xs text-pastel-muted mb-3 tracking-wide group-hover:text-pastel-forest transition-colors duration-200">
        {text}
      </p>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="border-2 border-pastel-mint rounded-full p-1.5 group-hover:border-pastel-accent group-hover:shadow-[0_4px_12px_rgba(127,191,160,0.3)] transition-all duration-200 bg-white/50"
      >
        <ChevronDown size={18} className="text-pastel-accent" />
      </motion.div>
    </div>
  );
};

export default ScrollDownArrow;
