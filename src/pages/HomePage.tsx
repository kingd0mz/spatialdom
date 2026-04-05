import ContactSection from '../sections/ContactSection';
import DefinitionSection from '../sections/DefinitionSection';
import HeroSection from '../sections/HeroSection';
import InterpretationSection from '../sections/InterpretationSection';
import PhilosophySection from '../sections/PhilosophySection';
import SystemsSection from '../sections/SystemsSection';
import WorkSection from '../sections/WorkSection';

function HomePage() {
  return (
    <main>
      <HeroSection />
      <DefinitionSection />
      <InterpretationSection />
      <SystemsSection />
      <WorkSection />
      <PhilosophySection />
      <ContactSection />
    </main>
  );
}

export default HomePage;
