const OmGlow = () => {
  return (
    <div className="relative flex items-center justify-center mb-6">
      <div className="absolute w-28 h-28 rounded-full bg-orange-500/20 blur-2xl animate-pulse" />
      <span className="text-6xl font-black text-orange-600 select-none">
        🕉️
      </span>
    </div>
  );
};

export default OmGlow;
