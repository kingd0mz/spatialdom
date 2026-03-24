import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

function SpatialField() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeUp(Boolean(reducedMotion), 0.16)}
    >
      <svg
        className="absolute right-[-4%] top-[8%] h-[84%] w-[78%] max-w-[920px] opacity-[0.82]"
        viewBox="0 0 980 760"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M146 628L234 548L360 514L444 430L608 394L690 310L828 274"
          style={{ stroke: 'var(--motif-line-2)', strokeWidth: 1.2 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M88 664L184 598L268 566L384 548L470 470L626 440L748 354L880 328"
          style={{ stroke: 'var(--motif-line-1)', strokeWidth: 1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.3, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M268 226H404L456 174H600L666 124H818"
          style={{ stroke: 'var(--motif-line-1)', strokeWidth: 1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.05, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M404 174V298L472 344V468"
          style={{ stroke: 'var(--motif-line-3)', strokeWidth: 1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.05, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M540 594C618 582 696 568 746 520C790 478 792 424 844 388C874 366 910 354 942 352"
          style={{ stroke: 'var(--motif-line-3)', strokeWidth: 1 }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.15, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        />
        <g style={{ stroke: 'var(--motif-line-1)', strokeWidth: 1, opacity: 0.86 }}>
          <rect x="456" y="174" width="144" height="122" />
          <path d="M456 232H600" />
          <path d="M508 174V296" />
          <path d="M600 232L666 124" />
          <path d="M600 296L690 310" />
          <path d="M360 514L360 434L444 430" />
          <path d="M234 548L234 434L360 434" />
        </g>
        <g style={{ fill: 'var(--motif-dot-1)' }}>
          <circle cx="600" cy="232" r="3.5" />
          <circle cx="690" cy="310" r="3.5" />
          <circle cx="444" cy="430" r="3.5" />
          <circle cx="828" cy="274" r="4" style={{ fill: 'var(--motif-dot-2)' }} />
        </g>
        <g style={{ stroke: 'var(--motif-line-3)', strokeWidth: 1, opacity: 0.76 }}>
          <path d="M126 214H188" />
          <path d="M126 214V274" />
          <path d="M782 90H858" />
          <path d="M858 90V166" />
        </g>
      </svg>
    </motion.div>
  );
}

export default SpatialField;
