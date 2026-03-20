import { useEffect, useRef } from 'react';

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(0);
    let speeds = drops.map(() => 0.5 + Math.random());

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const intensity = 1 - dist / 100;
          ctx.fillStyle = `rgb(0, ${255}, ${Math.floor(intensity * 100)})`;
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 8 * intensity;
        } else {
          const b = 80 + Math.floor(Math.random() * 60);
          ctx.fillStyle = `rgb(0, ${b}, 0)`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 50);

    const onResize = () => {
      const newCols = Math.floor(canvas.width / fontSize);
      if (newCols !== columns) {
        const old = [...drops];
        columns = newCols;
        drops = Array(columns).fill(0).map((_, i) => old[i] || 0);
        speeds = Array(columns).fill(0).map(() => 0.5 + Math.random());
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1]" aria-hidden="true" />
  );
}

export default MatrixRain;
