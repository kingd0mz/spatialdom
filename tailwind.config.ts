import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#050505',
        'surface-elevated': '#0A0A0A',
        accent: '#0B3D91',
        'accent-hover': '#1E5BB8',
        'accent-soft': 'rgba(11,61,145,0.18)',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255,255,255,0.72)',
        'text-muted': 'rgba(255,255,255,0.50)',
        'border-subtle': 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '1100px',
        narrow: '760px',
        prose: '680px'
      },
      boxShadow: {
        panel: '0 24px 80px rgba(0, 0, 0, 0.28)'
      },
      transitionTimingFunction: {
        refined: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;
