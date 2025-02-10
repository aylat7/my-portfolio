import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollDownArrowProps {
  targetId: string;
  text: string;
}

const ScrollDownArrow = ({ targetId, text }: ScrollDownArrowProps) => {
  const handleClick = () => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="flex flex-col items-center mt-20 cursor-pointer group" 
      onClick={handleClick}
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl text-green-700 mb-4 font-medium group-hover:text-green-600 transition-colors"
      >
        {text}
      </motion.p>
      
      <motion.div
        initial={{ y: 0 }}
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
      >
        <ChevronDown 
          size={32} 
          className="text-green-600 group-hover:text-green-500 transition-colors" 
        />
      </motion.div>
    </div>
  );
};

export default ScrollDownArrow;