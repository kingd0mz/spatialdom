import Reveal from '../components/ui/Reveal';
import Section from '../components/layout/Section';
import { interpretation } from '../data/siteContent';

function InterpretationSection() {
  return (
    <Section id="about" tone="soft" className="py-20 sm:py-24 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <Reveal className="max-w-[720px]">
          <p className="section-label">Interpretation</p>
          <div className="mt-5 space-y-3 text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-text-primary">
            {interpretation.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="max-w-[420px] lg:justify-self-end">
          <p className="text-base leading-7 text-text-body sm:text-lg">{interpretation.detail}</p>
        </Reveal>
      </div>
    </Section>
  );
}

export default InterpretationSection;
