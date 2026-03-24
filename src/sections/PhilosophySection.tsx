import { motion, useReducedMotion } from 'framer-motion';
import Section from '../components/layout/Section';
import { philosophy } from '../data/siteContent';
import { fadeUp, staggerContainer } from '../lib/motion';

function PhilosophySection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="philosophy" tone="soft">
      <motion.div
        className="mx-auto max-w-[900px]"
        variants={staggerContainer(Boolean(reducedMotion), 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.p variants={fadeUp(Boolean(reducedMotion))} className="section-label text-center">
          Philosophy
        </motion.p>
        <div className="mt-8 space-y-4 sm:space-y-5">
          {philosophy.map((statement, index) => (
            <motion.div
              key={statement}
              variants={fadeUp(Boolean(reducedMotion), index * 0.03)}
              className="rounded-[1.5rem] border border-white/8 bg-white/[0.02] px-5 py-5 text-center sm:px-8 sm:py-6"
            >
              <p className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.04em] text-white">
                {statement}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

export default PhilosophySection;
