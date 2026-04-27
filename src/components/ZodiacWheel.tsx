const ZODIAC_SIGNS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

const ZodiacWheel = () => {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* Outer cosmic glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl animate-glow-pulse" />

      {/* Twinkling starfield backdrop */}
      <div className="absolute inset-0 rounded-full starfield opacity-70" />

      {/* Rotating outer zodiac ring */}
      <div className="absolute inset-0 animate-rotate-slow">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="190" fill="none" stroke="url(#ringGrad)" strokeWidth="2" opacity="0.75" />
          <circle cx="200" cy="200" r="170" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.5" strokeDasharray="3 6" />

          {/* 12 spokes */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 130;
            const y1 = 200 + Math.sin(angle) * 130;
            const x2 = 200 + Math.cos(angle) * 190;
            const y2 = 200 + Math.sin(angle) * 190;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(var(--primary) / 0.4)"
                strokeWidth="1"
              />
            );
          })}

          {/* Zodiac glyphs */}
          {ZODIAC_SIGNS.map((sign, i) => {
            const angle = ((i * 30 - 90) * Math.PI) / 180;
            const x = 200 + Math.cos(angle) * 160;
            const y = 200 + Math.sin(angle) * 160;
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="22"
                fill="hsl(var(--primary-deep))"
                style={{ fontFamily: "serif", fontWeight: 600 }}
              >
                {sign}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Counter-rotating orbital ring */}
      <div className="absolute inset-[16%] animate-rotate-reverse pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" opacity="0.55" strokeDasharray="2 4" />
          {/* Orbiting moons */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={100 + Math.cos(a) * 95}
                cy={100 + Math.sin(a) * 95}
                r="2.5"
                fill="hsl(var(--accent))"
              />
            );
          })}
        </svg>
      </div>

      {/* 3D Rotating Earth at center */}
      <div className="earth-scene">
        <div className="earth-wrap">
          <div className="earth-atmosphere" />
          <div className="earth" />
        </div>
      </div>
    </div>
  );
};

export default ZodiacWheel;
