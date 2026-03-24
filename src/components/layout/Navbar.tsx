import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navItems, portfolioUrl } from '../../data/siteContent';
import { cn } from '../../lib/cn';
import { fadeUp } from '../../lib/motion';
import { useScrolled } from '../../hooks/useScrolled';
import BrandMark from '../ui/BrandMark';
import Container from './Container';

function Navbar() {
  const scrolled = useScrolled(20);
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container
        className={cn(
          'mt-4 rounded-[1.25rem] border px-4 py-3 transition-all duration-500 ease-refined sm:mt-5 sm:px-5',
          scrolled ? 'theme-nav-scrolled' : 'border-transparent bg-transparent'
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="inline-flex items-center gap-3 rounded-full text-sm font-medium text-text-primary transition-colors duration-300 hover:text-text-strong"
            aria-label="Go to Spatialdom hero section"
          >
            <BrandMark />
            <span className="text-sm uppercase tracking-[0.18em] text-text-strong">Spatialdom</span>
          </a>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-7" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="interactive-outline inline-flex items-center"
            >
              Portfolio
            </a>
          </div>

          <button
            type="button"
            className="theme-icon-button inline-flex h-11 w-11 items-center justify-center rounded-full transition duration-300 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="relative flex h-4 w-4 flex-col items-center justify-center">
              <span
                className={cn(
                  'absolute h-px w-4 bg-current transition-transform duration-300',
                  menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-[4px]'
                )}
              />
              <span
                className={cn(
                  'absolute h-px w-4 bg-current transition-opacity duration-300',
                  menuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'absolute h-px w-4 bg-current transition-transform duration-300',
                  menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[4px]'
                )}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="theme-mobile-nav mt-4 grid gap-2 pt-4 md:hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeUp(Boolean(reducedMotion))}
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="theme-mobile-link px-4 py-3"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-mobile-link px-4 py-3"
                onClick={() => setMenuOpen(false)}
              >
                Portfolio
              </a>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Navbar;
