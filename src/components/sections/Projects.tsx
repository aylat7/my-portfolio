import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

interface Project {
  title: string;
  filename: string;
  date?: string;
  description: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  repo?: string;
  hackathon?: string;
}

const projects: Project[] = [
  {
    title: 'NBA Playoff Predictor',
    filename: 'nba_playoff_predictor.py',
    description:
      'End-to-end ML pipeline predicting whether the Toronto Raptors will make the NBA playoffs using 20+ years of historical data and live NBA API stats.',
    stats: [
      { label: 'CV Accuracy', value: '92.8%' },
      { label: 'Test Accuracy', value: '96.7%' },
      { label: 'Historical', value: '100%' },
      { label: '2025-26 Prediction', value: '96.3%' },
    ],
    tags: ['Python', 'scikit-learn', 'pandas', 'NBA API', 'matplotlib', 'seaborn'],
    repo: 'https://github.com/aylat7/nba_playoff_predictor',
  },
  {
    title: 'Eh-Conomy',
    filename: 'eh-conomy.tsx',
    date: 'Mar 2025',
    hackathon: 'HackCanada',
    description:
      'Location-based platform connecting consumers with nearby farmers to encourage local shopping and support the domestic economy during the tariff war.',
    tags: ['React', 'Next.js', 'Node.js', 'TailwindCSS', 'Google Maps API', 'Vercel'],
  },
  {
    title: 'Library Database System',
    filename: 'library_db.sql',
    date: 'Nov 2024',
    description:
      'Comprehensive library system with member/book management, loan processing, stored procedures, triggers, and scheduled events. Integrated role-based access controls for librarians and administrators.',
    tags: ['SQL', 'PhpMyAdmin'],
  },
  {
    title: 'WordRush',
    filename: 'WordRush.swift',
    description:
      'Real-time multiplayer Wordle clone iOS app with live game rooms and competitive play.',
    tags: ['Swift', 'Firebase'],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-bento/15 border border-bento/25 rounded-xl overflow-hidden hover:border-bento/40 transition-colors group"
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-bento/20 bg-bento/10">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono text-xs text-cream-muted">{project.filename}</span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl text-cream group-hover:text-forest-300 transition-colors">
            {project.title}
          </h3>
          {project.hackathon && (
            <span className="text-xs font-mono px-2 py-1 rounded-full bg-forest-600/20 text-forest-300 shrink-0 ml-3">
              {project.hackathon}
            </span>
          )}
        </div>

        {project.date && (
          <p className="text-xs text-cream-muted font-mono mb-3">{project.date}</p>
        )}

        <p className="text-cream-muted leading-relaxed mb-4 text-sm">{project.description}</p>

        {/* Stats grid */}
        {project.stats && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {project.stats.map(s => (
              <div key={s.label} className="bg-bento/10 rounded-lg p-3 text-center">
                <div className="text-forest-300 font-mono font-bold text-lg">{s.value}</div>
                <div className="text-cream-muted text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono rounded-full border border-forest-400/30 text-forest-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-forest-300 hover:text-forest-200 transition-colors"
          >
            <span className="text-cream-muted">{'>'}</span> view_source.sh
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Things I've built.">
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
