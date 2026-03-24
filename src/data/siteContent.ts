export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type SystemItem = {
  name: string;
  category: string;
  description: string;
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
  label: 'Spatial systems / Geospatial infrastructure / Decision architecture',
  title: 'Spatialdom',
  primaryLine: 'A domain where systems, decisions, and intelligence are grounded in space.',
  secondaryLine: 'Geospatial systems. Infrastructure. Decision platforms.'
};

export const definition = {
  term: 'spa\u00B7tial\u00B7dom',
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
  detail:
    'The work sits between infrastructure, operational software, and decision support. It treats geography as first-order architecture rather than presentation.'
};

export const systems: SystemItem[] = [
  {
    name: 'SPARTA',
    category: 'Tax mapping for LGUs',
    description: 'Parcel-based taxation systems for local governments where mapping, records, and revenue logic remain structurally aligned.'
  },
  {
    name: 'Parcel Truth Records',
    category: 'Structured parcel intelligence',
    description: 'An append-only model for parcel intelligence where records are durable, auditable, and ready for downstream decision platforms.'
  },
  {
    name: 'Asset Registry',
    category: 'Private asset records',
    description: 'A Spatialdom registry model for private individuals who need traceable asset records grounded in parcels, location, and history.'
  },
  {
    name: 'Spatialdom Surveying',
    category: 'Survey operations',
    description: 'Surveying workflows designed to connect field capture, parcel structure, and downstream records without fragmentation.'
  },
  {
    name: 'Spatialdom Academy',
    category: 'Training systems',
    description: 'Training programs for teams adopting spatial thinking, geospatial workflows, and operational discipline as system foundations.'
  }
];

export const workItems: WorkItem[] = [
  {
    name: 'SPARTA',
    lens: 'Public-sector revenue systems',
    description: 'Tax mapping for LGUs built around parcel logic, administrative clarity, and durable spatial records.'
  },
  {
    name: 'Parcel Truth Records',
    lens: 'Spatial record architecture',
    description: 'A record model for parcel intelligence that prioritizes append-only structure, auditability, and long-term trust.'
  },
  {
    name: 'Asset Registry',
    lens: 'Private ownership systems',
    description: 'A registry direction for private individuals who need structured asset visibility across parcels, documents, and history.'
  },
  {
    name: 'Spatialdom Surveying',
    lens: 'Field-to-record operations',
    description: 'Surveying positioned as infrastructure: precise in the field, structured in the record, and useful downstream.'
  },
  {
    name: 'Spatialdom Academy',
    lens: 'Training and capability building',
    description: 'A training layer for organizations and practitioners who need spatial systems literacy, not just software exposure.'
  }
];

export const philosophy = [
  'We do not build apps. We build systems.',
  'Data is not collected. It is structured.',
  'Everything is spatial. Most systems ignore it.',
  'The interface is only the visible edge of deeper architecture.'
];

export const contact = {
  email: 'dcfargas@up.edu.ph',
  github: 'https://github.com/kingd0mz/'
};
