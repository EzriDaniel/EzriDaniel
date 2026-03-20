import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function ProfileVisualization() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    const getSize = () => {
      const w = container?.clientWidth || 180;
      return Math.min(Math.max(w, 150), 260);
    };

    let size = getSize();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // Particles
    const particles = [];
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2;
      const r = size * 0.28 + Math.random() * size * 0.3;
      particles.push({
        x: size / 2 + Math.cos(angle) * r,
        y: size / 2 + Math.sin(angle) * r,
        baseX: size / 2 + Math.cos(angle) * r,
        baseY: size / 2 + Math.sin(angle) * r,
        size: 1 + Math.random() * 1.5,
        speed: 0.4 + Math.random() * 0.8,
        angle, r,
        phase: Math.random() * Math.PI * 2,
        color: ['#00ff41', '#22d3ee', '#67e8f9'][Math.floor(Math.random() * 3)],
      });
    }

    let frame, time = 0, scanAngle = 0;

    const draw = () => {
      time += 0.016;
      const cx = size / 2, cy = size / 2, radius = size / 2 - 14;

      ctx.clearRect(0, 0, size, size);

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Scanning arc
      scanAngle = (scanAngle + 0.025) % (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, scanAngle, scanAngle + 0.4);
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00ff41';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner rings
      for (let i = 1; i <= 2; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * (0.4 + i * 0.15), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 65, ${0.1 + i * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Particles
      particles.forEach(p => {
        p.angle += p.speed * 0.002;
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = hovered && dist < 50 ? (50 - dist) / 50 : 0;

        p.x = p.baseX + Math.cos(p.angle + time * p.speed) * 3 + dx * influence * 0.1;
        p.y = p.baseY + Math.sin(p.angle + time * p.speed) * 3 + dy * influence * 0.1;

        const s = p.size + Math.sin(time * 2.5 + p.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Avatar circle
      const av = radius * 0.26;
      const grad = ctx.createRadialGradient(cx, cy, av * 0.3, cx, cy, av * 1.2);
      grad.addColorStop(0, 'rgba(0, 255, 65, 0.12)');
      grad.addColorStop(1, 'rgba(0, 255, 65, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, av, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, av * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(3, 3, 3, 0.92)';
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // ED initials
      ctx.font = `bold ${Math.max(16, size * 0.11)}px 'IBM Plex Mono', monospace`;
      ctx.fillStyle = '#00ff41';
      ctx.shadowColor = '#00ff41';
      ctx.shadowBlur = 10;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ED', cx, cy);
      ctx.shadowBlur = 0;

      // Status readouts
      const readouts = ['SYS:OK', 'CONN:ON', 'SEC:ON'];
      ctx.font = `${Math.max(6, size * 0.028)}px monospace`;
      ctx.fillStyle = 'rgba(167, 243, 208, 0.7)';
      readouts.forEach((text, i) => {
        const a = (i / readouts.length) * Math.PI * 2 - Math.PI / 2;
        ctx.fillText(text, cx + Math.cos(a) * (av * 1.6), cy + Math.sin(a) * (av * 1.6));
      });

      // Corner markers
      const m = Math.max(5, size * 0.035);
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.5)';
      ctx.lineWidth = 1.5;
      [
        [5, 5 + m, 5, 5, 5 + m, 5],
        [size - 5 - m, 5, size - 5, 5, size - 5, 5 + m],
        [5, size - 5 - m, 5, size - 5, 5 + m, size - 5],
        [size - 5 - m, size - 5, size - 5, size - 5, size - 5, size - 5 - m],
      ].forEach(([x1, y1, x2, y2, x3, y3]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
      });

      frame = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      size = getSize();
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [hovered]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.7 }}
      className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" aria-label="Animated profile visualization" />
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.3) 0%, transparent 70%)', transform: 'scale(0.6)' }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default ProfileVisualization;
