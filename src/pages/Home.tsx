import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, FileText } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useRef } from 'react';
import ScrollDownArrow from '../components/ScrollDownArrow';


const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    margin: "0px 0px -200px 0px",
    once: false  // This ensures the animation triggers every time the element comes into view
  });

  return (
    <div className="min-h-screen pt-16">
      <section id="home" className="max-w-6xl mx-auto px-4 py-20" ref={ref}>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4">
              {isInView && (
                <TypeAnimation
                  key={isInView ? "visible" : "hidden"} // Add this key prop to force remount
                  sequence={[
                    'Ayla Topuz',
                    1000,
                  ]}
                  wrapper="span"
                  speed={10}
                  
                  repeat={0}
                />
              )}
            </h1>
            <p className="text-xl md:text-2xl text-green-700 mb-8">
              Second year Computer Science student & Economics Minor @ WLU
            </p>
            <p className="text-green-600 mb-8 text-lg">
              Hi, I'm Ayla - a developer who loves turning ideas into impactful applications. When I'm not coding, I'm probably hitting the slopes, playing piano, or going on hikes!
              <br />
              <br />
              Feel free to contact me! I'm always open to new opportunities and collaborations.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                href="https://github.com/aylat7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <Github className="text-green-600" size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                href="https://www.linkedin.com/in/ayla-topuz-31313a29a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <Linkedin className="text-green-600" size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                href="https://drive.google.com/file/d/13buyg-GUYy0_bZpY9_UbO6Or0OZ3Y7dO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <FileText className="text-green-600" size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 flex justify-center"
          >
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="absolute inset-0 bg-green-200 rounded-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img
                src="/public/images/headshot.jpg"
                alt="Ayla Topuz"
                className="absolute inset-0 w-full h-full object-cover rounded-lg border-4 border-white shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <ScrollDownArrow targetId="projects" text="See my projects below!" />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;