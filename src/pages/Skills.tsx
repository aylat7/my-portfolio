import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollDownArrow from '../components/ScrollDownArrow';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    margin: "0px 0px -200px 0px",
    once: false  // This ensures animations trigger every time
  });

  const skills = {
    'Frontend': ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
    'Backend': ['Node.js', 'Python', 'Express', 'Django', 'SQL'],
    'Tools': ['Git', 'VS Code', 'Figma', 'Eclipse', 'Excel'],
  };

  return (
    <div className="min-h-screen pt-16">
      <section id="skills" className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}  // Update animate
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-green-800 mb-12 text-center"
        >
          Skills
        </motion.h2>
        {/* Update the grid container classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [&>*:last-child]:md:col-span-2 [&>*:last-child]:md:mx-auto [&>*:last-child]:md:w-full [&>*:last-child]:md:max-w-[calc(100%/2-1rem)]">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}  // Update animate
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-green-600 mb-4">{category}</h3>
              <div className="grid grid-cols-2 gap-3">
                {items.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-50 p-3 rounded-lg text-green-800 font-medium text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <ScrollDownArrow targetId="interests" text="Curious about my interests?" />
        </motion.div>
      </section>
    </div>
  );
};

export default Skills;