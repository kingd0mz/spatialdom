import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { fadeUp } from '../../lib/motion';

type RevealProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
  children: ReactNode;
  delay?: number;
  once?: boolean;
};

function Reveal<T extends ElementType = 'div'>({
  as,
  children,
  className,
  delay = 0,
  once = true
}: RevealProps<T>) {
  const reducedMotion = useReducedMotion();
  const MotionComponent = motion.create(as ?? 'div');

  return (
    <MotionComponent
      className={cn(className)}
      variants={fadeUp(Boolean(reducedMotion), delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </MotionComponent>
  );
}

export default Reveal;
