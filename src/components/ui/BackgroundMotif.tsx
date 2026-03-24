function BackgroundMotif() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.045),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(11,61,145,0.18),transparent_18%),radial-gradient(circle_at_10%_40%,rgba(255,255,255,0.025),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-grid-fade bg-[size:48px_48px] opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
      <svg
        className="absolute right-[-10%] top-24 h-[42rem] w-[42rem] opacity-[0.12] blur-[0.5px]"
        viewBox="0 0 700 700"
        fill="none"
        aria-hidden="true"
      >
        <path d="M78 510C168 422 256 420 348 338C423 271 458 160 622 142" stroke="rgba(255,255,255,0.14)" />
        <path d="M48 604C166 520 228 540 332 470C446 394 460 274 650 250" stroke="rgba(11,61,145,0.55)" />
        <path d="M114 630C222 566 312 596 420 548C550 490 562 356 664 338" stroke="rgba(255,255,255,0.1)" />
        <circle cx="620" cy="142" r="4" fill="rgba(255,255,255,0.32)" />
        <circle cx="650" cy="250" r="4" fill="rgba(11,61,145,0.8)" />
      </svg>
      <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(11,61,145,0.16),transparent_68%)] blur-3xl" />
    </div>
  );
}

export default BackgroundMotif;
