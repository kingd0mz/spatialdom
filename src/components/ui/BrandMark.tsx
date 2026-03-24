function BrandMark() {
  return (
    <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
      <span className="absolute inset-[7px] rounded-full border border-white/10" />
      <span className="absolute inset-[13px] rounded-full bg-accent/80" />
    </span>
  );
}

export default BrandMark;
