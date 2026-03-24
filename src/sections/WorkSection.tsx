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

      <div className="theme-list mt-12 rounded-[1.75rem]">
        {workItems.map((item, index) => (
          <Reveal
            key={item.name}
            as="article"
            delay={index * 0.03}
            className="theme-list-item group px-5 py-6 transition-colors duration-300 sm:px-8 sm:py-7"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-text-faint">{item.lens}</p>
                <h3 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.04em] text-text-primary transition-colors duration-300 group-hover:text-text-primary">
                  {item.name}
                </h3>
              </div>
              <p className="max-w-[620px] text-base leading-7 text-text-body transition-colors duration-300 group-hover:text-text-secondary">
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
