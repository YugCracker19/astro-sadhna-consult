import { useMemo } from "react";

const SYMBOLS = ["ॐ", "✦", "☉", "✺", "❋", "✧", "☽", "❉"];

const FloatingSymbols = ({ count = 14 }: { count?: number }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        char: SYMBOLS[i % SYMBOLS.length],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 14 + Math.random() * 28,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        opacity: 0.08 + Math.random() * 0.18,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute font-display text-primary animate-float animate-twinkle select-none"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: `${it.size}px`,
            opacity: it.opacity,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
            textShadow: "0 0 12px hsl(var(--accent) / 0.5)",
          }}
        >
          {it.char}
        </span>
      ))}
    </div>
  );
};

export default FloatingSymbols;
