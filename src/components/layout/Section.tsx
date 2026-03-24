import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';
import Container from './Container';

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  containerClassName?: string;
  divider?: boolean;
  tone?: 'default' | 'soft' | 'elevated';
}>;

function Section({
  children,
  id,
  className,
  containerClassName,
  divider = true,
  tone = 'default'
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-shell scroll-mt-24 sm:scroll-mt-28',
        divider && 'section-divider',
        tone === 'soft' && 'bg-white/[0.015]',
        tone === 'elevated' && 'bg-white/[0.02]',
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export default Section;
