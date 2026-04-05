import { MotionConfig } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import ToolsPage from './pages/ToolsPage';
import MainLayout from './shared/layout/MainLayout';

const CoordinateConverterPage = lazy(() => import('./tools/coordinate-converter/CoordinateConverterPage'));
const GeoJSONViewerPage = lazy(() => import('./tools/geojson-viewer/GeoJSONViewerPage'));

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MainLayout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/coordinate-converter" element={<CoordinateConverterPage />} />
            <Route path="/tools/geojson-viewer" element={<GeoJSONViewerPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </MotionConfig>
  );
}

export default App;
