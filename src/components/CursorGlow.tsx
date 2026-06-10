import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
        ref.current.style.opacity = "1";
      }
      // Also push to any element listening for the spotlight vars
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>("[data-spotlight]");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };

    const tick = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.18;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.rx - 18}px, ${pos.current.ry - 18}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 w-[400px] h-[400px] rounded-full z-[5] opacity-0 transition-opacity duration-300 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.18), hsl(var(--accent) / 0.08) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 w-9 h-9 rounded-full z-[60] border border-primary/60 hidden md:block"
        style={{
          boxShadow: "0 0 18px hsl(var(--primary) / 0.55), inset 0 0 10px hsl(var(--accent) / 0.4)",
        }}
      />
    </>
  );
};

export default CursorGlow;
