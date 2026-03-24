function BackgroundMotif() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'var(--motif-top), var(--motif-right), var(--motif-left)'
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[42rem] bg-[size:48px_48px] opacity-[0.9] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--motif-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--motif-grid-line) 1px, transparent 1px)'
        }}
      />
      <svg
        className="absolute right-[-10%] top-24 h-[42rem] w-[42rem] opacity-[0.12] blur-[0.5px]"
        viewBox="0 0 700 700"
        fill="none"
        aria-hidden="true"
      >
        <path d="M78 510C168 422 256 420 348 338C423 271 458 160 622 142" style={{ stroke: 'var(--motif-line-1)' }} />
        <path d="M48 604C166 520 228 540 332 470C446 394 460 274 650 250" style={{ stroke: 'var(--motif-line-2)' }} />
        <path d="M114 630C222 566 312 596 420 548C550 490 562 356 664 338" style={{ stroke: 'var(--motif-line-3)' }} />
        <circle cx="620" cy="142" r="4" style={{ fill: 'var(--motif-dot-1)' }} />
        <circle cx="650" cy="250" r="4" style={{ fill: 'var(--motif-dot-2)' }} />
      </svg>
      <div
        className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ backgroundImage: 'var(--motif-glow)' }}
      />
    </div>
  );
}

export default BackgroundMotif;
