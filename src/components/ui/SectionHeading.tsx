import { cn } from '../../lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left'
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-prose', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? <p className="section-label">{eyebrow}</p> : null}
      <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-white/60 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
