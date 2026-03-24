function BrandMark() {
  return (
    <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface-strong">
      <span className="absolute inset-[7px] rounded-full border border-border-strong" />
      <span className="absolute inset-[13px] rounded-full bg-accent" />
    </span>
  );
}

export default BrandMark;
