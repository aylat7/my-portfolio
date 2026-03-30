import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'C', 'C++', 'Java', 'SQL', 'JavaScript', 'HTML', 'CSS', 'R', 'MatLab'],
  },
  {
    category: 'Frameworks & Tools',
    skills: ['React', 'Next.js', 'Node.js', 'Git', 'GitHub', 'VS Code', 'Figma', 'Power BI', 'MySQL', 'sklearn', 'JIRA', 'Agile', 'SDLC', 'AWS'],
  },
  {
    category: 'Technologies',
    skills: ['REST APIs', 'AWS', 'OOP', 'DS&A'],
  },
];

export function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Tools of the trade.">
      <div className="space-y-10">
        {skillGroups.map((group, groupIndex) => (
          <div key={group.category} className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-forest-300">
              {'> '}{group.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (groupIndex * 0.1) + (skillIndex * 0.03), duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-sm px-4 py-2 rounded-lg bg-bento/15 text-cream-muted border border-bento/25 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
