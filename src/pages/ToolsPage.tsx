import { Link } from 'react-router-dom';
import ToolPageLayout from '../shared/layout/ToolPageLayout';

const tools = [
  {
    title: 'Coordinate Converter',
    description: 'Convert decimal degrees to degrees-minutes-seconds and back in a mobile-friendly format.',
    href: '/tools/coordinate-converter',
    status: 'active' as const
  },
  {
    title: 'GeoJSON Viewer',
    description: 'Inspect features, coordinates, and geometry structure directly in the browser.',
    href: '#',
    status: 'coming-soon' as const
  },
  {
    title: 'Area & Distance',
    description: 'Quick browser-based measurements for parcels, boundaries, and field planning.',
    href: '#',
    status: 'coming-soon' as const
  }
];

function ToolsPage() {
  return (
    <ToolPageLayout
      title="Tools"
      intro="Spatialdom tools are frontend-only utilities for practical geospatial work. The structure here is intended to scale cleanly as more micro-tools are added."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.title} className="panel rounded-3xl p-6">
            <div className="flex h-full flex-col gap-5">
              <div className="space-y-3">
                <p className="section-label">{tool.status === 'active' ? 'Active Tool' : 'Coming Soon'}</p>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-text-primary">{tool.title}</h2>
                  <p className="text-sm leading-7 text-text-body">{tool.description}</p>
                </div>
              </div>

              <div className="mt-auto">
                {tool.status === 'active' ? (
                  <Link to={tool.href} className="interactive-accent inline-flex items-center">
                    Open tool
                  </Link>
                ) : (
                  <span className="interactive-outline inline-flex items-center opacity-70">Coming soon</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </ToolPageLayout>
  );
}

export default ToolsPage;
