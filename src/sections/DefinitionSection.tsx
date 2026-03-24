import { motion, useReducedMotion } from 'framer-motion';
import Section from '../components/layout/Section';
import { definition } from '../data/siteContent';
import { fadeUp, staggerContainer } from '../lib/motion';

function DefinitionSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="definition" divider={false} className="pb-14 pt-8 sm:pt-10">
      <motion.div
        className="mx-auto max-w-narrow rounded-[2rem] border border-white/10 bg-white/[0.025] px-6 py-10 text-center shadow-panel backdrop-blur-sm sm:px-10 sm:py-14"
        variants={staggerContainer(Boolean(reducedMotion), 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p variants={fadeUp(Boolean(reducedMotion))} className="section-label">
          {definition.term} ({definition.type})
        </motion.p>
        <motion.p
          variants={fadeUp(Boolean(reducedMotion), 0.04)}
          className="mx-auto mt-6 max-w-[620px] text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.18] tracking-[-0.05em] text-white"
        >
          {definition.statement}
        </motion.p>
        <div className="mt-8 space-y-3 sm:mt-10">
          {definition.lines.map((line, index) => (
            <motion.p
              key={line}
              variants={fadeUp(Boolean(reducedMotion), index * 0.03)}
              className="text-lg leading-8 text-white/72 sm:text-[1.25rem]"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

export default DefinitionSection;
