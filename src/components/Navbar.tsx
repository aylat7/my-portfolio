import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(
    (id: string) => {
      const section = document.getElementById(id);
      if (section && !isScrolling) {
        setIsScrolling(true);
        setActiveSection(id);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => setIsScrolling(false), 200);
      }
    },
    [isScrolling]
  );

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    let throttleTimer: NodeJS.Timeout;

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isScrolling) return;
      clearTimeout(throttleTimer);
      throttleTimer = setTimeout(() => {
        const currentPosition = window.scrollY + window.innerHeight / 3;
        sections.forEach((section) => {
          const el = section as HTMLElement;
          if (currentPosition >= el.offsetTop && currentPosition <= el.offsetTop + el.offsetHeight) {
            setActiveSection(section.id);
          }
        });
      }, 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(throttleTimer);
    };
  }, [isScrolling]);

  const navItems = ['home', 'projects', 'skills', 'interests', 'contact'];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-pastel-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleScroll('home')}
            className="font-display text-lg font-bold text-pastel-forest hover:text-pastel-accent transition-colors duration-200"
            aria-label="Go to top"
          >
            AT
          </button>

          <div className="flex items-center space-x-1">
            {navItems.map((id) => (
              <div key={id} className="relative">
                <button
                  onClick={() => handleScroll(id)}
                  className={`font-sans px-3 py-2 text-sm font-600 capitalize transition-colors duration-200 ${
                    activeSection === id
                      ? 'text-pastel-forest font-bold'
                      : 'text-pastel-muted hover:text-pastel-forest'
                  }`}
                >
                  {id}
                </button>

                <AnimatePresence>
                  {activeSection === id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute bottom-1 h-0.5 bg-pastel-accent rounded-full"
                      style={{
                        width: 'calc(100% - 1.5rem)',
                        left: '0.75rem',
                      }}
                      initial={{ scaleX: 0, transformOrigin: 'left' }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0, transformOrigin: 'right' }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}

            <a
              href="https://drive.google.com/file/d/148ETMlNWoa9mdOelu7QNSSb2PnzBw6R4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans ml-4 px-4 py-1.5 text-sm font-bold rounded-full border-2 border-pastel-mint text-pastel-forest hover:bg-pastel-mint transition-all duration-200"
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
