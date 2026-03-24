import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

type CursorVariant = 'default' | 'link' | 'card';

function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [pressed, setPressed] = useState(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 420, damping: 34, mass: 0.25 });
  const ringY = useSpring(pointerY, { stiffness: 420, damping: 34, mass: 0.25 });
  const dotX = useSpring(pointerX, { stiffness: 760, damping: 42, mass: 0.12 });
  const dotY = useSpring(pointerY, { stiffness: 760, damping: 42, mass: 0.12 });

  useEffect(() => {
    if (reducedMotion) {
      setEnabled(false);
      return;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }

    document.documentElement.classList.add('has-custom-cursor');

    const updateVariant = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        setVariant('default');
        return;
      }

      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setVisible(false);
        return;
      }

      if (target.closest('[data-cursor="card"]')) {
        setVariant('card');
        return;
      }

      if (target.closest('[data-cursor="link"], a, button, [role="button"]')) {
        setVariant('link');
        return;
      }

      setVariant('default');
    };

    const handlePointerMove = (event: PointerEvent) => {
      setVisible(true);
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      updateVariant(event.target);
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return null;
  }

  const ringSize = variant === 'link' ? 40 : variant === 'card' ? 34 : 28;
  const ringOffset = ringSize / 2;
  const dotSize = pressed ? 5 : 6;
  const dotOffset = dotSize / 2;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-border-medium bg-surface-soft"
        style={{
          x: ringX,
          y: ringY,
          translateX: -ringOffset,
          translateY: -ringOffset
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.92 : 1,
          borderColor:
            variant === 'link'
              ? 'var(--color-accent)'
              : variant === 'card'
                ? 'var(--color-border-hover)'
                : 'var(--color-border-medium)',
          backgroundColor:
            variant === 'link'
              ? 'var(--color-accent-soft)'
              : variant === 'card'
                ? 'var(--color-surface-overlay)'
                : 'var(--color-surface-soft)'
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.35 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[71] rounded-full bg-text-primary"
        style={{
          x: dotX,
          y: dotY,
          translateX: -dotOffset,
          translateY: -dotOffset
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.88 : 1
        }}
        transition={{ type: 'spring', stiffness: 520, damping: 34, mass: 0.2 }}
      />
    </>
  );
}

export default CustomCursor;
