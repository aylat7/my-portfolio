import { useState, useCallback } from 'react';
import { ScrollHeroSection } from './components/ui/scroll-hero-section';
import { IntroHero } from './components/ui/intro-hero';
import { LeafParticles } from './components/ui/leaf-particles';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <div className="relative">
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <LeafParticles count={20} />
      <Navbar />
      <div id="hero" className="relative z-10">
        <IntroHero ready={!loading} />
        <ScrollHeroSection />
      </div>
      <div className="relative z-10">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;
