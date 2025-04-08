import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Interests from './pages/Interests';
import Contact from './pages/Contact';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [loading, setLoading] = useState(true);
  const basename = import.meta.env.DEV ? '/' : '/my-portfolio';

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router basename={basename}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-200 to-green-100">
        <Navbar />
        <main>
          <section id="home"><Home /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <section id="interests"><Interests /></section>
          <section id="contact"><Contact /></section>
        </main>
      </div>
    </Router>
  );
};

export default App;
