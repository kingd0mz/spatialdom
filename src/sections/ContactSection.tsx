import { useState } from 'react';
import Section from '../components/layout/Section';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { contact } from '../data/siteContent';

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="contact" className="pb-24 sm:pb-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="For collaborations, systems, and inquiries."
            description="A direct line is enough. The conversation can begin there."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel rounded-[1.75rem] p-6 sm:p-8">
            <a
              href={`mailto:${contact.email}`}
              className="block text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-[-0.05em] text-white transition-colors duration-300 hover:text-white/84"
            >
              {contact.email}
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" className="interactive-accent" onClick={handleCopy}>
                {copied ? 'Email copied' : 'Copy email'}
              </button>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="interactive-outline text-center"
              >
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default ContactSection;
