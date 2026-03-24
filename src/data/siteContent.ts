export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type SystemItem = {
  code: string;
  name: string;
  category: string;
  description: string;
  emphasis: 'primary' | 'secondary';
};

export type WorkItem = {
  name: string;
  lens: string;
  description: string;
};

export const navItems: NavItem[] = [
  { label: 'About', href: '#definition' },
  { label: 'Systems', href: '#systems' },
  { label: 'Contact', href: '#contact' }
];

export const hero = {
  label: 'Spatial systems / Record architecture / Decision infrastructure',
  lead: 'Everything happens somewhere.',
  title: 'Spatialdom',
  primaryLine: 'A concept brand and operating domain for geospatial systems, durable records, and decision architecture.',
  secondaryLine: 'Parcel logic. Field intelligence. Durable spatial records.',
  signals: ['Parcel logic', 'Field-to-record workflows', 'Georeferenced assets']
};

export const definition = {
  term: 'spa\u00B7tial\u00B7dom',
  pronunciation: '/ˈspā-shəl-dəm/',
  type: 'noun',
  statement: 'The domain of systems, decisions, and intelligence grounded in space.',
  lines: [
    'Where data becomes structure.',
    'Where maps become systems.',
    'Where systems become decisions.'
  ]
};

export const interpretation = {
  lines: ['Every system operates somewhere.', 'Most ignore it.', 'Spatialdom acknowledges it.', 'And builds around it.'],
  detail: 'Location, topology, and field reality are treated as first-order architecture.'
};

export const systems: SystemItem[] = [
  {
    code: '01',
    name: 'SPARTA',
    category: 'Tax mapping for LGUs',
    description: 'Parcel-based taxation systems for local governments where mapping, records, and revenue logic remain structurally aligned.',
    emphasis: 'primary'
  },
  {
    code: '02',
    name: 'Parcel Truth Records',
    category: 'Structured parcel intelligence',
    description: 'An append-only model for parcel intelligence where records are durable, auditable, and ready for downstream decision platforms.',
    emphasis: 'primary'
  },
  {
    code: '03',
    name: 'Asset Registry',
    category: 'Private asset records',
    description: 'A Spatialdom registry model for private individuals who need traceable asset records grounded in parcels, location, and history.',
    emphasis: 'secondary'
  },
  {
    code: '04',
    name: 'Spatialdom Surveying',
    category: 'Survey operations',
    description: 'Surveying workflows designed to connect field capture, parcel structure, and downstream records without fragmentation.',
    emphasis: 'secondary'
  },
  {
    code: '05',
    name: 'Spatialdom Academy',
    category: 'Training systems',
    description: 'Training programs for teams adopting spatial thinking, geospatial workflows, and operational discipline as system foundations.',
    emphasis: 'secondary'
  }
];

export const workItems: WorkItem[] = [
  {
    name: 'SPARTA',
    lens: 'Public-sector revenue systems',
    description: 'Geospatial governance systems for LGUs built around parcel logic, administrative clarity, and durable spatial records.'
  },
  {
    name: 'Parcel Truth Records',
    lens: 'Spatial record architecture',
    description: 'Spatial record architecture for append-only parcel intelligence and decision-support infrastructure.'
  },
  {
    name: 'Asset Registry',
    lens: 'Private ownership systems',
    description: 'Georeferenced assets and ownership records structured for traceability, audit, and continuity.'
  },
  {
    name: 'Spatialdom Surveying',
    lens: 'Field-to-record operations',
    description: 'Field-to-record workflows that keep measurements, parcel boundaries, and downstream systems aligned.'
  },
  {
    name: 'Spatialdom Academy',
    lens: 'Training and capability building',
    description: 'Training systems that teach spatial reasoning, governance workflows, and disciplined implementation.'
  }
];

export const philosophy = [
  'We do not build apps. We build systems.',
  'Data is not collected. It is structured.',
  'Everything is spatial. Most systems ignore it.',
  'The interface is only the visible edge of deeper architecture.'
];

export const contact = {
  label: 'Direct line',
  context: 'For parcel logic, field systems, asset registries, surveying, and training.',
  email: 'spatialdom@gmail.com',
  github: 'https://github.com/kingd0mz/'
};
