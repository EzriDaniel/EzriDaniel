import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from '../ui/MatrixRain';
import ProfileVisualization from '../ui/ProfileVisualization';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Hero() {
  const [stage, setStage] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullText = 'echo "Welcome to my portfolio"';

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 800),
      setTimeout(() => setStage(3), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage >= 2) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setTypedText(fullText.slice(0, i));
          i++;
        } else clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <section id="hero" className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 -mt-8">
      <MatrixRain />

      <div className="relative z-10 flex flex-col items-center space-y-5 w-full max-w-2xl">
        {/* Profile visualization */}
        <ProfileVisualization />

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 16 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text mb-2">
            Ezri Daniel Gweth
          </h1>
          <p className="text-b text-sm sm:text-base">
            Software Engineer &middot; Full Stack Developer &middot; Tech Innovator
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 16 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-effect p-4 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-red)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-yellow)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-heading)]" />
              <span className="text-d text-xs ml-2">terminal</span>
            </div>
            <div className="font-mono text-xs sm:text-sm">
              <span className="text-h">root@portfolio:~$ </span>
              <span className="text-b">{typedText}</span>
              <span className="text-p animate-blink">{'\u2588'}</span>
            </div>
            <div className="mt-3 h-1 bg-black/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: stage >= 3 ? '100%' : '60%' }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-[var(--c-heading)] to-[var(--c-primary)] rounded-full"
              />
            </div>
            <AnimatePresence>
              {stage >= 2 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-h text-xs mt-2 font-mono">
                  &gt; Loading portfolio data... OK
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {stage >= 3 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-m text-xs mt-1 font-mono">
                  &gt; System ready. Welcome, visitor.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 10 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <button onClick={() => scrollTo('about')} className="btn btn-filled cursor-pointer">
            <span className="text-p mr-2">&gt;</span> About Me
          </button>
          <button onClick={() => scrollTo('projects')} className="btn btn-outline cursor-pointer bg-transparent">
            <span className="text-p mr-2">&gt;</span> Projects
          </button>
          <button onClick={() => scrollTo('contact')} className="btn btn-outline text-[var(--c-cyan)] cursor-pointer bg-transparent">
            <span className="text-[var(--c-cyan)] mr-2">&gt;</span> Contact
          </button>
        </motion.div>

        {/* Scroll indicator - below buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 0.6 : 0 }}
          transition={{ delay: 1 }}
          className="pt-4 cursor-pointer"
          onClick={() => scrollTo('about')}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-1">
            <span className="text-d text-[10px] tracking-widest uppercase">Scroll</span>
            <div className="w-4 h-6 border border-[var(--c-border-hover)] rounded-full flex justify-center pt-1">
              <div className="w-1 h-1.5 bg-[var(--c-heading)] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
