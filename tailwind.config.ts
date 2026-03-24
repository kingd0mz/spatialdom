import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'surface-soft': 'var(--color-surface-soft)',
        'surface-overlay': 'var(--color-surface-overlay)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-nav': 'var(--color-surface-nav)',
        'surface-section-soft': 'var(--color-surface-section-soft)',
        'surface-section-elevated': 'var(--color-surface-section-elevated)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-soft': 'var(--color-accent-soft)',
        'text-primary': 'var(--color-text-primary)',
        'text-strong': 'var(--color-text-strong)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-body': 'var(--color-text-body)',
        'text-muted': 'var(--color-text-muted)',
        'text-faint': 'var(--color-text-faint)',
        'text-subtle': 'var(--color-text-subtle)',
        'border-subtle': 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        'border-medium': 'var(--color-border-medium)',
        'border-hover': 'var(--color-border-hover)'
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
        panel: 'var(--shadow-panel)'
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
