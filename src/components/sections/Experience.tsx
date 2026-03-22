import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

const experiences = [
  {
    role: 'Operational Excellence Analyst',
    company: 'Scotiabank',
    period: 'Sep 2025 \u2013 Dec 2025',
    location: 'Toronto, ON',
    bullets: [
      'Assisted with integrating an AI-based analytics system into production, aiming to increase high-risk call monitoring from 2% to 20% of ~15 million calls per fiscal year',
      'Assisted in developing a Python-based executable application used by multiple teams to track task time metrics, enabling data-driven analysis of workflow pain points',
      'Communicated technical concepts to non-technical stakeholders across Business and Retail Banking teams, translating AI analytics requirements into actionable improvements',
    ],
    tags: ['Python', 'AI/ML', 'Data Analytics', 'Agile'],
  },
];

export function Experience() {
  return (
    <SectionWrapper id="experience" title="Experience" subtitle="Where I've worked.">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-forest-600/30" />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative pl-8 md:pl-20 pb-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-8 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-forest-300 ring-4 ring-forest-900" />

            {/* Terminal-style card */}
            <div className="bg-bento/15 border border-bento/25 rounded-xl overflow-hidden">
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-bento/20 bg-bento/10">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-xs text-cream-muted">
                  ~/experience/{exp.company.toLowerCase().replace(/\s/g, '-')}.log
                </span>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-cream">{exp.role}</h3>
                    <p className="text-forest-300 font-medium text-lg">{exp.company}</p>
                  </div>
                  <div className="text-sm text-cream-muted mt-2 md:mt-0 md:text-right">
                    <div>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  {exp.bullets.map((bullet, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + j * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-forest-300 font-mono text-sm mt-0.5 shrink-0">{'>'}</span>
                      <p className="text-cream-muted leading-relaxed">{bullet}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full border border-forest-400/30 text-forest-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
