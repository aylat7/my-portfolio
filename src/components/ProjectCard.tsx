import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  filename: string;
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  stats?: string[];
}

const ProjectCard = ({ title, description, tags, githubLink, stats }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(127,191,160,0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="rounded-2xl overflow-hidden glass-card group"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-pastel-forest mb-3 group-hover:text-pastel-accent transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="font-sans text-pastel-muted text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="mb-4 space-y-1.5">
            {stats.map((stat, i) => (
              <p key={i} className="font-sans text-xs text-pastel-forest/80 flex items-start gap-2">
                <span className="text-pastel-accent shrink-0 font-bold">•</span>
                {stat}
              </p>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="font-sans text-xs px-3 py-1 rounded-full bg-pastel-mint/50 text-pastel-forest font-semibold border border-pastel-mint"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn inline-flex items-center gap-2 w-fit text-sm"
          aria-label={`View ${title} on GitHub`}
        >
          View Project
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
