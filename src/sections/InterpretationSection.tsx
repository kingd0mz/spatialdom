import Reveal from '../components/ui/Reveal';
import Section from '../components/layout/Section';
import { authority, interpretation } from '../data/siteContent';

function InterpretationSection() {
  return (
    <Section id="about" tone="soft" className="py-20 sm:py-24 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
        <Reveal className="max-w-[860px]">
          <p className="section-label">Interpretation</p>
          <div className="mt-6 space-y-3 text-[clamp(1.9rem,4.4vw,3.65rem)] font-semibold leading-[1.04] tracking-[-0.065em] text-text-primary">
            {interpretation.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={0.12}
          className="max-w-[220px] border-l border-border-subtle pl-5 lg:justify-self-end lg:pb-2"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-text-faint">{interpretation.detail}</p>
        </Reveal>
      </div>
      <Reveal delay={0.16} className="mt-12 border-t border-border-subtle pt-5">
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <p className="section-label">{authority.descriptor}</p>
          <p className="max-w-[720px] text-base leading-7 text-text-secondary sm:text-lg">
            {authority.line}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

export default InterpretationSection;
