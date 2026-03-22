import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import ScrollDownArrow from '../components/ScrollDownArrow';

const projects = [
  {
    filename: 'nba_playoff_predictor.py',
    title: 'NBA Playoff Predictor',
    description:
      'End-to-end ML pipeline predicting whether the Toronto Raptors will make the NBA playoffs using 20+ years of historical data and live NBA API stats.',
    tags: ['Python', 'scikit-learn', 'pandas', 'NBA API', 'matplotlib', 'seaborn', 'joblib'],
    githubLink: 'https://github.com/aylat7/nba_playoff_predictor',
    stats: [
      '92.8% cross-validation accuracy (±1.1%)',
      '96.7% test accuracy',
      '100% historical accuracy across 22 Raptors seasons',
      '96.3% current chance of making 2025-26 playoffs',
    ],
  },
  {
    filename: 'eh_conomy/',
    title: 'Eh-Conomy',
    description:
      'Location-based platform connecting consumers with nearby farmers to encourage local shopping and support the domestic economy during the tariff war. Built at HackCanada 2025.',
    tags: ['React', 'Next.js', 'Node.js', 'TailwindCSS', 'Google Maps API', 'GitHub Actions', 'Vercel'],
    githubLink: 'https://github.com/aylat7',
    stats: [],
  },
  {
    filename: 'library_db.sql',
    title: 'Library Database Management System',
    description:
      'Comprehensive library system using SQL and PhpMyAdmin with member and book management, loan processing, stored procedures, triggers, and scheduled events for automated operations.',
    tags: ['SQL', 'PhpMyAdmin'],
    githubLink: 'https://github.com/aylat7',
    stats: [],
  },
  {
    filename: 'wordrush.swift',
    title: 'WordRush',
    description:
      'Real-time multiplayer Wordle clone iOS app. Race against friends to guess the word first with live state sync.',
    tags: ['Swift', 'Firebase'],
    githubLink: 'https://github.com/aylat7',
    stats: [],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: false });

  return (
    <div className="min-h-screen bg-pastel-bg">
      <section id="projects" className="max-w-6xl mx-auto px-4 py-24" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-sans text-pastel-muted text-xs font-bold tracking-[0.25em] uppercase mb-3">
            Selected Work
          </p>
          <h2 className="font-display text-4xl font-bold text-pastel-forest">
            Projects
          </h2>
          <div className="mt-3 h-1 w-12 bg-pastel-accent rounded-full" />
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <ScrollDownArrow targetId="skills" text="check out my skills" />
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;
