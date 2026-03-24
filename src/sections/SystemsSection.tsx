import { motion, useReducedMotion } from 'framer-motion';
import Section from '../components/layout/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { systems } from '../data/siteContent';
import { cn } from '../lib/cn';
import { fadeUp, staggerContainer } from '../lib/motion';

function SystemsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="systems" tone="elevated">
      <SectionHeading
        eyebrow="Systems / Product Lines"
        title="A quiet surface over more substantial infrastructure."
        description="The current lines span public taxation systems, parcel intelligence, private asset records, surveying operations, and training."
      />

      <motion.div
        className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6"
        variants={staggerContainer(Boolean(reducedMotion), 0.12, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        {systems.map((system, index) => (
          <motion.article
            key={system.name}
            variants={fadeUp(Boolean(reducedMotion), index * 0.04)}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.02,
                    borderColor: 'rgba(255,255,255,0.16)',
                    backgroundColor: 'rgba(255,255,255,0.05)'
                  }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'panel panel-elevated flex h-full flex-col rounded-[1.6rem] p-6 sm:p-7',
              index < 2 ? 'xl:col-span-3' : 'xl:col-span-2'
            )}
          >
            <p className="section-label">{system.category}</p>
            <h3 className="mt-5 text-[1.4rem] font-semibold tracking-[-0.04em] text-white">
              {system.name}
            </h3>
            <p className="mt-5 text-base leading-7 text-white/62">{system.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

export default SystemsSection;
