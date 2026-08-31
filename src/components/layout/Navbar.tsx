import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStoredProgress } from '../../lib/progressStore';
import { 
  Cloud, Search, Shield, Award, Sparkles, 
  Menu, X, Compass, Layers, CheckCircle2 
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onToggleSidebar }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      const p = getStoredProgress();
      setCompletedCount(p.completedLessons.length);
    };
    update();
    window.addEventListener('progress_updated', update);
    return () => window.removeEventListener('progress_updated', update);
  }, []);

  const navLinks = [
    { path: '/aws', label: 'AWS Track', badgeColor: 'hover:text-amber-400' },
    { path: '/azure', label: 'Azure Track', badgeColor: 'hover:text-blue-400' },
    { path: '/gcp', label: 'GCP Track', badgeColor: 'hover:text-sky-400' },
    { path: '/compare', label: 'Compare Clouds', badgeColor: 'hover:text-cyan-400' },
    { path: '/lab', label: 'Architecture Lab', badgeColor: 'hover:text-cyan-400' },
    { path: '/decision-engine', label: 'Decision Engine', badgeColor: 'hover:text-cyan-400' },
    { path: '/interviews', label: 'Interviews', badgeColor: 'hover:text-cyan-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
        {/* Brand Logo & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Cloud className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-100 flex items-center gap-1.5">
                Cloud Architecture Academy <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">PRO</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400">AWS • Azure • GCP Enterprise Mastery</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300 shadow-sm'
                    : `text-slate-400 ${link.badgeColor}`
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search + Progress */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all shadow-inner"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search Academy...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Progress Widget */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:border-cyan-500/40 transition-colors"
            title="Completed Lessons"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{completedCount}</span>
            <span className="hidden sm:inline text-slate-400 font-normal text-[10px]">done</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
