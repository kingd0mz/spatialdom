import { MotionConfig } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import ContactSection from './sections/ContactSection';
import DefinitionSection from './sections/DefinitionSection';
import HeroSection from './sections/HeroSection';
import InterpretationSection from './sections/InterpretationSection';
import PhilosophySection from './sections/PhilosophySection';
import SystemsSection from './sections/SystemsSection';
import WorkSection from './sections/WorkSection';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppShell>
        <Navbar />
        <main>
          <HeroSection />
          <DefinitionSection />
          <InterpretationSection />
          <SystemsSection />
          <WorkSection />
          <PhilosophySection />
          <ContactSection />
        </main>
        <Footer />
      </AppShell>
    </MotionConfig>
  );
}

export default App;
