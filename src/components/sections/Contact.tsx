import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Github, Linkedin, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

emailjs.init('AA26jC0b5HKZcJnMH');

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/aylat7',
    icon: Github,
    command: 'open github.com/aylat7',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ayla-topuz',
    icon: Linkedin,
    command: 'open linkedin.com/in/ayla-topuz',
  },
  {
    label: 'Email',
    href: 'mailto:aylatopuz2005@gmail.com',
    icon: Mail,
    command: 'send_message()',
  },
];

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_mgoiiod',
        'template_baosn96',
        form.current,
        'AA26jC0b5HKZcJnMH'
      );
      setSubmitStatus('success');
      form.current.reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error:', error);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" title="Contact" subtitle="Let's connect.">
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-cream-muted text-lg mb-10 leading-relaxed"
        >
          I'm always open to new opportunities, collaborations, or just a good conversation.
          Feel free to reach out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-3 px-6 py-4 bg-bento/15 border border-bento/25 rounded-xl hover:border-bento/40 hover:bg-bento/25 transition-all cursor-pointer pointer-events-auto"
            >
              <link.icon className="w-5 h-5 text-forest-300" />
              <span className="font-mono text-sm text-cream-muted group-hover:text-cream transition-colors">
                {'>'} {link.command}
              </span>
            </a>
          ))}
        </motion.div>

        {/* EmailJS Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-bento/15 border border-bento/25 rounded-xl overflow-hidden mb-16 text-left"
        >
          {/* Terminal top bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-bento/20 bg-bento/10">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 font-mono text-xs text-cream-muted">~/contact/send_message.sh</span>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-cream font-mono text-sm mb-2">{'>'} name</label>
              <input
                name="user_name"
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-forest-900/60 border border-bento/20 text-cream placeholder-cream-muted/40 font-mono text-sm focus:outline-none focus:border-forest-300 transition-colors"
              />
            </div>
            <div>
              <label className="block text-cream font-mono text-sm mb-2">{'>'} email</label>
              <input
                name="user_email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-forest-900/60 border border-bento/20 text-cream placeholder-cream-muted/40 font-mono text-sm focus:outline-none focus:border-forest-300 transition-colors"
              />
            </div>
            <div>
              <label className="block text-cream font-mono text-sm mb-2">{'>'} message</label>
              <textarea
                name="message"
                required
                placeholder="Your message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-forest-900/60 border border-bento/20 text-cream placeholder-cream-muted/40 font-mono text-sm focus:outline-none focus:border-forest-300 transition-colors resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full font-mono text-sm py-3 rounded-lg transition-all ${
                isSubmitting
                  ? 'bg-forest-600 cursor-not-allowed text-cream-muted'
                  : 'bg-forest-300 hover:bg-forest-200 text-forest-900 font-semibold'
              }`}
            >
              {isSubmitting ? '> sending...' : '> send_message()'}
            </motion.button>

            {submitStatus === 'success' && (
              <p className="text-forest-300 text-center font-mono text-sm">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-center font-mono text-sm">Failed to send. Please try again.</p>
            )}
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-forest-600/20 pt-8"
        >
          <p className="text-cream-muted/50 text-xs font-mono">
            Designed & built by Ayla Topuz
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
