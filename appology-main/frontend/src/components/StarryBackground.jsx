import { useEffect, useRef } from "react";

export const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width, height, raf;
    let stars = [];
    let shootingStars = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(320, Math.floor((width * height) / 6000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.004,
        gold: Math.random() < 0.12,
      }));
    };

    const spawnShootingStar = () => {
      if (shootingStars.length < 1 && Math.random() < 0.006) {
        shootingStars.push({
          x: Math.random() * width * 0.7 + width * 0.15,
          y: Math.random() * height * 0.3,
          vx: -(Math.random() * 6 + 5),
          vy: Math.random() * 3 + 2,
          life: 1,
        });
      }
    };

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const twinkle = reduced ? 1 : Math.sin(s.phase + t * s.speed) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.35 + twinkle * 0.65);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(255, 224, 150, ${alpha})`
          : `rgba(248, 245, 238, ${alpha})`;
        ctx.fill();
        if (s.r > 1.1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = s.gold
            ? `rgba(255, 224, 150, ${alpha * 0.08})`
            : `rgba(248, 245, 238, ${alpha * 0.06})`;
          ctx.fill();
        }
      }

      if (!reduced) {
        spawnShootingStar();
        shootingStars = shootingStars.filter((st) => st.life > 0);
        for (const st of shootingStars) {
          st.x += st.vx;
          st.y += st.vy;
          st.life -= 0.012;
          const grad = ctx.createLinearGradient(
            st.x, st.y, st.x - st.vx * 12, st.y - st.vy * 12
          );
          grad.addColorStop(0, `rgba(255, 240, 200, ${st.life})`);
          grad.addColorStop(1, "rgba(255, 240, 200, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(st.x, st.y);
          ctx.lineTo(st.x - st.vx * 12, st.y - st.vy * 12);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="starry-background"
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};
