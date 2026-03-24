import { motion, useReducedMotion } from 'framer-motion';
import Section from '../components/layout/Section';
import { definition } from '../data/siteContent';
import { fadeUp, staggerContainer } from '../lib/motion';

function DefinitionSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="definition" divider={false} className="pb-14 pt-8 sm:pt-10">
      <motion.div
        className="definition-frame mx-auto max-w-[980px] px-0 py-10 sm:py-14"
        variants={staggerContainer(Boolean(reducedMotion), 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid gap-10 px-1 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <motion.div variants={fadeUp(Boolean(reducedMotion))} className="space-y-3 lg:pt-1">
            <p className="text-[clamp(1.35rem,2.4vw,1.8rem)] font-semibold tracking-[-0.05em] text-text-primary">
              {definition.term}
            </p>
            <p className="text-sm uppercase tracking-[0.18em] text-text-faint">
              {definition.pronunciation}
            </p>
            <p className="section-label">{definition.type}</p>
          </motion.div>

          <div>
            <motion.p
              variants={fadeUp(Boolean(reducedMotion), 0.04)}
              className="max-w-[680px] text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-[1.14] tracking-[-0.05em] text-text-primary"
            >
              {definition.statement}
            </motion.p>
            <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4">
              {definition.lines.map((line, index) => (
                <motion.p
                  key={line}
                  variants={fadeUp(Boolean(reducedMotion), 0.08 + index * 0.04)}
                  className="text-lg leading-8 text-text-secondary sm:text-[1.18rem]"
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <motion.p
              variants={fadeUp(Boolean(reducedMotion), 0.22)}
              className="mt-8 max-w-[640px] border-t border-border-subtle pt-5 text-base leading-7 text-text-body sm:mt-10"
            >
              {definition.applied}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

export default DefinitionSection;
