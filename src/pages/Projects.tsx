import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import ScrollDownArrow from '../components/ScrollDownArrow';
import { AnimatePresence } from 'framer-motion';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: 0.2,
    margin: "0px 0px -200px 0px"
  });

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let showTimer: NodeJS.Timeout | undefined;
    let hideTimer: NodeJS.Timeout | undefined;

    if (isInView) {
      // Delay showing the message by 3 seconds
      showTimer = setTimeout(() => {
        setShowMessage(true);
        
        // Hide the message after 5 seconds
        hideTimer = setTimeout(() => {
          setShowMessage(false);
        }, 6000);
      }, 1000);
    } else {
      // Hide message immediately when leaving view
      setShowMessage(false);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isInView]);

  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my projects, skills, and interests. Built with React and TypeScript, featuring smooth animations and a clean, professional design.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "https://image8.photobiz.com/8585/28_20220117155144_6397158_large.jpg",
      githubLink: "https://github.com/yourusername/2048-game",
      features: [
        "Dynamic project showcase with filter options",
        "Smooth scroll animations using Framer Motion",
        "Fully responsive design for mobile and desktop",
        "Integrated GitHub repositories with live previews"
      ]
    },
    {
      title: "Product Barcode Scanner App",
      description: "An innovative mobile app that helps users identify Canadian-made products through barcode scanning. Integrated with API's to provide detailed product information and support local economy.",
      tags: ["Swift", "React", "OpenFoodFacts API"],
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/5d/fd/b6/5dfdb69c-9c85-cb66-1766-8a01bcabade6/pr_source.png/230x0w.webp",
      githubLink: "https://github.com/yourusername/2048-game",
      features: [
        "Real-time barcode scanning with instant results",
        "API integration for up-to-date product information",
        "Local data caching for offline functionality",
        "User-friendly UI with accessibility features"
      ]
    },
    {
      title: "2048 Game",
      description: "A web-based implementation of the popular 2048 puzzle game. Players combine numbered tiles strategically to reach the 2048 tile, featuring smooth animations and responsive design.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.crazygames.com/games/2048/cover_16x9-1707828856995.png?auto=format,compress&q=75&cs=strip",
      githubLink: "https://github.com/aylat7/2048-Game",
      features: [
        "High-score tracking as the game goes on",
        "Responsive layout for mobile and desktop play",
        "Smooth Tile Animations for an engaging user experience",
        "Optimized Game Logic for smooth performance for efficient tile merging"
      ]
    }
  ];
  

  return (
    <div className="min-h-screen pt-16">
      <section id="projects" className="max-w-6xl mx-auto px-4 py-20 relative" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-green-800 mb-12 text-center"
        >
          Projects
        </motion.h2>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }} //   transition speed
                className="absolute right-28 top-[494px] bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
                >
              <p className="text-sm font-medium whitespace-nowrap">
                Click the GitHub icons to view source code!
              </p>
              {/* Arrow pointing to GitHub icon */}
              <div 
                className="absolute w-3 h-3 bg-green-600 transform rotate-45"
                style={{
                  top: '50%',
                  right: '-6px',
                  transform: 'translateY(-50%) rotate(45deg)'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <ScrollDownArrow targetId="skills" text="Check out my skills!" />
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;