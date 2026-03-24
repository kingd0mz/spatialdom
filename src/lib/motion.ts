import type { Variants } from 'framer-motion';

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function fadeUp(reducedMotion: boolean, delay = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.01 : 0.72,
        delay,
        ease: easing
      }
    }
  };
}

export function staggerContainer(
  reducedMotion: boolean,
  staggerChildren = 0.12,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerChildren,
        delayChildren
      }
    }
  };
}
