import { motion, useReducedMotion } from 'framer-motion';
import Container from '../components/layout/Container';
import { hero } from '../data/siteContent';
import { fadeUp, staggerContainer } from '../lib/motion';

function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36"
    >
      <Container>
        <motion.div
          className="mx-auto flex max-w-[880px] flex-col items-center text-center"
          variants={staggerContainer(Boolean(reducedMotion), 0.14, 0.1)}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp(Boolean(reducedMotion))}
            className="theme-chip px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-text-subtle sm:px-5"
          >
            {hero.label}
          </motion.p>

          <motion.h1
            variants={fadeUp(Boolean(reducedMotion), 0.04)}
            className="mt-8 text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-text-primary"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp(Boolean(reducedMotion), 0.08)}
            className="mt-6 max-w-[760px] text-[clamp(1.125rem,2.6vw,1.5rem)] leading-[1.45] text-text-secondary"
          >
            {hero.primaryLine}
          </motion.p>

          <motion.p
            variants={fadeUp(Boolean(reducedMotion), 0.12)}
            className="mt-5 max-w-[660px] text-sm uppercase tracking-[0.22em] text-text-faint sm:text-[0.8rem]"
          >
            {hero.secondaryLine}
          </motion.p>

          <motion.div
            variants={fadeUp(Boolean(reducedMotion), 0.16)}
            className="mt-12 flex w-full max-w-[440px] flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <a href="#systems" className="interactive-accent text-center">
              Explore the systems
            </a>
            <a href="#contact" className="interactive-outline text-center">
              Start a conversation
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default HeroSection;
