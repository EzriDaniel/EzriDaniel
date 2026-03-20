import { Link } from 'react-router-dom';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/85 backdrop-blur-md border-b border-c">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="w-9 h-9 rounded-lg bg-card border border-c flex items-center justify-center">
            <span className="text-p font-bold text-sm">ED</span>
          </div>
          <span className="text-h font-semibold hidden sm:inline text-sm tracking-wide">Ezri Daniel Gweth</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'contact', label: 'Contact' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => id === 'hero' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : scrollTo(id)}
              className="link px-3 py-2 rounded-md hover:bg-card text-sm cursor-pointer bg-transparent border-0"
            >
              {label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-h p-2" aria-label="Menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
