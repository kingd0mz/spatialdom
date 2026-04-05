import { MotionConfig } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import PrivacyPage from './pages/PrivacyPage';
import ToolsPage from './pages/ToolsPage';
import ContactSection from './sections/ContactSection';
import DefinitionSection from './sections/DefinitionSection';
import HeroSection from './sections/HeroSection';
import InterpretationSection from './sections/InterpretationSection';
import PhilosophySection from './sections/PhilosophySection';
import SystemsSection from './sections/SystemsSection';
import WorkSection from './sections/WorkSection';
import CoordinateConverterPage from './tools/coordinate-converter/CoordinateConverterPage';

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

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppShell>
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/coordinate-converter" element={<CoordinateConverterPage />} />
        </Routes>
        <Footer />
      </AppShell>
    </MotionConfig>
  );
}

export default App;
