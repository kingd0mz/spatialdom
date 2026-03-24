import { motion, useReducedMotion } from 'framer-motion';
import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import { philosophy } from '../data/siteContent';
import { fadeUp, staggerContainer } from '../lib/motion';

function PhilosophySection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="philosophy" tone="soft">
      <div className="grid gap-8 lg:grid-cols-[170px_minmax(0,1fr)]">
        <Reveal className="lg:pt-5">
          <p className="section-label">Philosophy</p>
        </Reveal>

        <motion.div
          className="max-w-[920px]"
          variants={staggerContainer(Boolean(reducedMotion), 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {philosophy.map((statement, index) => (
            <motion.div
              key={statement}
              variants={fadeUp(Boolean(reducedMotion), index * 0.03)}
              className="manifesto-line grid gap-4 py-7 sm:gap-6 sm:py-9 lg:grid-cols-[88px_minmax(0,1fr)]"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-text-faint">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="max-w-[820px] text-[clamp(1.7rem,3.8vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.06em] text-text-primary">
                {statement}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

export default PhilosophySection;
