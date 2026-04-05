import { MotionConfig } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import ToolsPage from './pages/ToolsPage';
import MainLayout from './shared/layout/MainLayout';
import CoordinateConverterPage from './tools/coordinate-converter/CoordinateConverterPage';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/coordinate-converter" element={<CoordinateConverterPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </MotionConfig>
  );
}

export default App;
