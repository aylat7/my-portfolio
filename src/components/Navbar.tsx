import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (section && !isScrolling) {
      setIsScrolling(true);
      setActiveSection(id);
      
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 200);
    }
  }, [isScrolling]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    let throttleTimer: NodeJS.Timeout;
    
    const handleScrollEvent = () => {
      if (isScrolling) return;

      clearTimeout(throttleTimer);
      throttleTimer = setTimeout(() => {
        const currentPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          
          if (currentPosition >= sectionTop && currentPosition <= sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        });
      }, 50); // Throttle scroll events
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    handleScrollEvent();

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      clearTimeout(throttleTimer);
    };
  }, [isScrolling]);

  const navItems = ['home', 'projects', 'skills', 'interests', 'contact'];

  return (
    <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleScroll('home')}
            className="text-2xl font-bold text-green-600"
          >
            AT
          </button>

          <div className="flex space-x-4">
            {navItems.map((id) => (
              <div key={id} className="relative">
                <button
                  onClick={() => handleScroll(id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    activeSection === id
                      ? 'text-green-600'
                      : 'text-green-800 hover:text-green-600'
                  }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>

                <AnimatePresence>
                  {activeSection === id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 h-0.5 bg-green-500"
                      style={{
                        width: 'calc(100% - 1.5rem)',
                        left: '0.75rem',
                        right: '0.75rem'
                      }}
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0, transformOrigin: 'right' }}
                      transition={{ 
                        duration: 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}

            <a
              href="https://drive.google.com/file/d/148ETMlNWoa9mdOelu7QNSSb2PnzBw6R4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-medium text-green-800 hover:text-green-600 transition-colors duration-300"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;