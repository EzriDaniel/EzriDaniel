import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/sections/Home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#030303]">
        {/* Matrix Rain Background */}
        <div className="matrix-rain-background" aria-hidden="true" />

        {/* Subtle scan line */}
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-[0.04]" aria-hidden="true">
          <div className="w-full h-px bg-[var(--c-primary)] animate-scanline" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-24">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>

        {/* Soft vignette */}
        <div
          className="fixed inset-0 pointer-events-none z-30"
          style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)' }}
          aria-hidden="true"
        />
      </div>
    </Router>
  );
}

export default App;
