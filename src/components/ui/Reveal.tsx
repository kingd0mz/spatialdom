import { motion, useReducedMotion } from 'framer-motion';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { fadeUp } from '../../lib/motion';

type RevealProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
  children: ReactNode;
  delay?: number;
  once?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function Reveal<T extends ElementType = 'div'>({
  as,
  children,
  className,
  delay = 0,
  once = true,
  ...props
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
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default Reveal;
