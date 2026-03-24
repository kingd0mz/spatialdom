import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { workItems } from '../data/siteContent';

function WorkSection() {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected Work / Proof"
        title="Selective signals of system-building experience."
        description="Not a portfolio grid. Just enough proof to show the thinking is backed by execution."
      />

      <div className="mt-12 divide-y divide-white/8 rounded-[1.75rem] border border-white/8 bg-white/[0.02]">
        {workItems.map((item, index) => (
          <Reveal
            key={item.name}
            as="article"
            delay={index * 0.03}
            className="group px-5 py-6 transition-colors duration-300 hover:bg-white/[0.025] sm:px-8 sm:py-7"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">{item.lens}</p>
                <h3 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-white">
                  {item.name}
                </h3>
              </div>
              <p className="max-w-[620px] text-base leading-7 text-white/62 transition-colors duration-300 group-hover:text-white/74">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default WorkSection;
