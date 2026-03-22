import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import ScrollDownArrow from '../components/ScrollDownArrow';

const Home = () => {
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  const headshotSrc = import.meta.env.DEV
    ? '/images/headshot.jpg'
    : '/my-portfolio/images/headshot.jpg';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgWrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
  };

  const handleMouseLeave = () => {
    const el = imgWrapperRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-pastel-bg">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full animate-blob-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(178,223,200,0.45) 0%, rgba(178,223,200,0) 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(127,191,160,0.3) 0%, rgba(127,191,160,0) 70%)',
            filter: 'blur(50px)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute top-[40%] left-[35%] w-[30vw] h-[30vw] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,216,188,0.25) 0%, rgba(168,216,188,0) 70%)',
            filter: 'blur(35px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-sans text-pastel-muted text-sm font-semibold tracking-widest uppercase mb-4"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
              className="font-display font-bold text-pastel-forest leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
            >
              Ayla Topuz
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-sans text-pastel-accent text-xl md:text-2xl font-semibold mb-8 h-8 flex items-center"
            >
              <TypeAnimation
                sequence={[
                  'CS Student.',
                  1800,
                  'Builder.',
                  1800,
                  'Community Leader.',
                  1800,
                  'Creative.',
                  1800,
                  'Problem Solver.',
                  1800,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="pill-btn"
                aria-label="View my work"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="pill-btn-outline"
                aria-label="Contact me"
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex gap-6 font-sans text-sm text-pastel-muted font-semibold mb-10"
            >
              <a
                href="https://github.com/aylat7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pastel-forest transition-colors duration-200"
              >
                GitHub
              </a>
              <span className="text-pastel-mint">•</span>
              <a
                href="https://www.linkedin.com/in/ayla-topuz-31313a29a/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pastel-forest transition-colors duration-200"
              >
                LinkedIn
              </a>
              <span className="text-pastel-mint">•</span>
              <a
                href="https://drive.google.com/file/d/148ETMlNWoa9mdOelu7QNSSb2PnzBw6R4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pastel-forest transition-colors duration-200"
              >
                Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <ScrollDownArrow targetId="projects" text="scroll to explore" />
            </motion.div>
          </div>

          {/* Right: Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="flex-shrink-0 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex' }}
            >
              <div
                ref={imgWrapperRef}
                style={{
                  transition: 'transform 0.15s ease',
                  borderRadius: '2rem',
                  padding: '6px',
                  background: 'linear-gradient(135deg, #b2dfc8 0%, #7fbfa0 50%, #b2dfc8 100%)',
                  boxShadow: '0 20px 60px rgba(127,191,160,0.35)',
                }}
              >
                <img
                  src={headshotSrc}
                  alt="Ayla Topuz"
                  className="block object-cover"
                  style={{
                    width: 'clamp(220px, 28vw, 360px)',
                    height: 'clamp(220px, 28vw, 360px)',
                    borderRadius: '1.65rem',
                  }}
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Home;
