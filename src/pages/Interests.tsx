import { motion, useInView } from 'framer-motion';
import { Code, Palette, Piano, Mountain, Pencil } from 'lucide-react';
import { useRef } from 'react';
import ScrollDownArrow from '../components/ScrollDownArrow';
import { FaSnowboarding } from 'react-icons/fa';

const Interests = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    margin: "0px 0px -200px 0px",
    once: false  // Add this to make animations repeat
  });

  const interests = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Designing and developing responsive, dynamic web applications using the latest frameworks and technologies.'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Crafting user-centered designs with a focus on aesthetics, functionality, and seamless user experiences.'

    },
    {
      icon: Piano,
      title: 'Piano',
      description: 'A lot of my free time is spent playing a mix of songs, from simple tunes to more challenging pieces, and always trying to improve.'
    },
    {
      icon: Mountain,
      title: 'Hiking',
      description: 'Getting outside, exploring new trails, and enjoying the views along the way.'
    },
    {
      icon: FaSnowboarding,
      title: 'Snowboarding',
      description: 'Riding down slopes, working on new tricks, and enjoying the fresh mountain air.'
    },

    {
      icon: Pencil,
      title: 'Drawing',
      description: 'Sketching ideas, experimenting with different styles, and finding new ways to be creative.'
    }

  ];

  return (
    <div className="min-h-screen pt-16">
      <section id="interests" className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-green-800 mb-12 text-center"
        >
          Interests
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interests.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-green-100 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
                <p className="text-green-600">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <ScrollDownArrow targetId="contact" text="If you've made it this far, contact me!" />
        </motion.div>
      </section>
    </div>
  );
};

export default Interests;