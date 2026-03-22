import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

const facts = [
  { label: 'University', value: 'Wilfrid Laurier', icon: '🎓' },
  { label: 'Program', value: 'CS + Econ Minor', icon: '💻' },
  { label: 'Co-op', value: 'Scotiabank', icon: '🏦' },
  { label: 'Research', value: 'Coming Soon', icon: '⚛️' },
  { label: 'Organization', value: 'For The Girls (Pres.)', icon: '👑' },
  { label: 'Fun Fact', value: 'I love nature', icon: '🌿' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function About() {
  return (
    <SectionWrapper id="about" title="About" subtitle="A bit about me.">
      <div className="grid lg:grid-cols-5 gap-16 items-start">
        {/* Bio text: takes 3 columns */}
        <div className="lg:col-span-3 space-y-6 text-cream-muted leading-relaxed text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            I'm <span className="text-forest-300 font-semibold">Ayla Topuz</span>, a third-year
            Computer Science student with an Economics minor at Wilfrid Laurier University.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My work spans machine learning, full-stack development, and data engineering.
            At Scotiabank, I helped scale AI-powered call monitoring and built Python tooling
            used across multiple teams.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Outside of code, I'm the President of{' '}
            <span className="text-forest-300 font-medium">For The Girls</span>, a 250+ member
            student organization focused on empowering women through fitness, community, and mental wellbeing.
            I also enjoy hiking, snowboarding, and playing piano.
          </motion.p>

          {/* Terminal-style fun facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-bento/15 border border-bento/25 rounded-xl p-6 font-mono text-sm"
          >
            <div className="text-forest-300 mb-3">{'>'} ayla.values</div>
            <div className="space-y-1 text-cream-muted/80">
              <div>{'>'} Community over competition</div>
              <div>{'>'} Build things that matter</div>
              <div>{'>'} Stay curious, stay kind</div>
              <div>{'>'} Representation matters</div>
            </div>
          </motion.div>
        </div>

        {/* Info cards: takes 2 columns */}
        <motion.div
          className="lg:col-span-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-4">
            {facts.map(({ label, value, icon }) => (
              <motion.div
                key={label}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-bento/15 border border-bento/25 rounded-xl p-5 hover:border-bento/40 transition-colors"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-xs text-cream-muted uppercase tracking-wider mb-1">{label}</div>
                <div className="text-cream font-medium text-sm">{value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
