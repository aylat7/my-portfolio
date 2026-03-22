import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

const categories = [
  {
    title: 'Languages',
    skills: ['Python', 'C', 'C++', 'Java', 'SQL', 'JavaScript', 'HTML', 'CSS', 'R', 'MatLab'],
  },
  {
    title: 'Frameworks & Tools',
    skills: [
      'React', 'Next.js', 'Node.js', 'Git', 'GitHub', 'VS Code',
      'Figma', 'Power BI', 'MySQL', 'sklearn', 'JIRA', 'Agile', 'SDLC', 'AWS',
    ],
  },
  {
    title: 'Technologies',
    skills: ['REST APIs', 'AWS', 'OOP', 'DS&A'],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const catVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Tools of the trade.">
      <motion.div
        className="space-y-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {categories.map(cat => (
          <motion.div key={cat.title} variants={catVariant}>
            <h3 className="font-mono text-sm text-forest-300 uppercase tracking-wider mb-4">
              {'>'} {cat.title}
            </h3>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {cat.skills.map(skill => (
                <motion.span
                  key={skill}
                  variants={tagVariant}
                  whileHover={{
                    scale: 1.08,
                    borderColor: 'rgba(74, 222, 128, 0.5)',
                    transition: { duration: 0.15 },
                  }}
                  className="px-4 py-2 font-mono text-sm rounded-lg border border-bento/25 text-cream bg-bento/15 hover:text-forest-300 hover:border-bento/40 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
