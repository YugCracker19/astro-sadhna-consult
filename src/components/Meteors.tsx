import { useMemo } from "react";

const Meteors = ({ number = 14 }: { number?: number }) => {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }).map((_, i) => ({
        id: i,
        top: Math.random() * 60 - 20,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      })),
    [number]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.6)] animate-meteor"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        >
          <span className="absolute top-1/2 -translate-y-1/2 right-0 h-px w-[60px] bg-gradient-to-r from-accent to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
