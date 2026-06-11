import { useMemo } from "react";
import { useTheme } from "@/lib/theme";

const Galaxy = ({ count = 80 }: { count?: number }) => {
  const { theme } = useTheme();
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
      })),
    [count]
  );

  if (theme !== "dark") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden mix-blend-screen">
      {/* nebula glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl animate-glow-pulse" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary-glow/10 blur-3xl animate-glow-pulse" style={{ animationDelay: "3s" }} />
      {/* stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: `0 0 ${s.size * 3}px hsl(var(--accent) / 0.6)`,
          }}
        />
      ))}
    </div>
  );
};

export default Galaxy;
