const ZODIAC_SIGNS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

const ZodiacWheel = () => {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl animate-glow-pulse" />

      {/* Rotating outer ring with zodiac symbols */}
      <div className="absolute inset-0 animate-rotate-slow">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="190" fill="none" stroke="url(#ringGrad)" strokeWidth="2" opacity="0.7" />
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

          {/* Zodiac glyphs around the ring */}
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

      {/* Counter-rotating inner ring */}
      <div className="absolute inset-[18%] animate-rotate-reverse">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" opacity="0.6" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1" />
          {/* Star of decoration */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={100 + Math.cos(a) * 85}
                cy={100 + Math.sin(a) * 85}
                r="2"
                fill="hsl(var(--accent))"
              />
            );
          })}
        </svg>
      </div>

      {/* Center om / sun */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-glow via-primary to-primary-deep flex items-center justify-center shadow-[0_0_50px_hsl(var(--primary)/0.6)]">
            <span className="text-5xl text-white" style={{ fontFamily: "serif" }}>ॐ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacWheel;
