import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Globe, Shield, Cpu, Network, Database, 
  Layers, Shuffle, Compass, HelpCircle, Award, 
  Sparkles, X, CheckCircle, Terminal
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const levels = [
  { level: 'LEVEL 0', title: 'Cloud Fundamentals', path: '/fundamentals', icon: Globe },
  { level: 'LEVEL 1', title: 'AWS Architect Path', path: '/aws', icon: Cpu, badge: 'AWS', badgeColor: 'text-amber-400 bg-amber-950/60' },
  { level: 'LEVEL 2', title: 'Azure Architect Path', path: '/azure', icon: Layers, badge: 'AZURE', badgeColor: 'text-blue-400 bg-blue-950/60' },
  { level: 'LEVEL 3', title: 'GCP Architect Path', path: '/gcp', icon: Sparkles, badge: 'GCP', badgeColor: 'text-sky-400 bg-sky-950/60' },
  { level: 'LEVEL 4', title: 'Service Comparison', path: '/compare', icon: Shuffle },
  { level: 'LEVEL 5', title: 'Cloud Networking', path: '/networking', icon: Network },
  { level: 'LEVEL 6', title: 'Cloud IAM & Security', path: '/security', icon: Shield },
  { level: 'LEVEL 7', title: 'Architecture Lab', path: '/lab', icon: Terminal },
  { level: 'LEVEL 8', title: 'High Availability', path: '/ha-dr', icon: CheckCircle },
  { level: 'LEVEL 9', title: 'Disaster Recovery', path: '/ha-dr', icon: Shield },
  { level: 'LEVEL 10', title: 'Multi-Cloud Arch', path: '/multicloud', icon: Layers },
  { level: 'LEVEL 11', title: 'Real-World Scenarios', path: '/scenarios', icon: Compass },
  { level: 'LEVEL 12', title: 'Architecture Interview', path: '/interviews', icon: Award },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-30 w-72 h-screen md:h-[calc(100vh-64px)] bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 md:hidden">
          <span className="text-sm font-bold text-slate-200">Academy Progression</span>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Home & Quick Links */}
        <div className="p-3 space-y-1 border-b border-slate-800/80">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`
            }
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Academy Dashboard</span>
          </NavLink>
          <NavLink
            to="/decision-engine"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`
            }
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Which Cloud to Choose?</span>
          </NavLink>
        </div>

        {/* Level Progression Tree */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Curriculum Progression (L0 - L12)
          </div>
          {levels.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 border border-slate-700 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] text-slate-400 leading-none">{item.level}</div>
                    <div className="text-xs text-slate-200 truncate mt-0.5">{item.title}</div>
                  </div>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-current/20 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Fast Links */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-center text-[11px] text-slate-400">
          <NavLink to="/transition" className="hover:text-cyan-300 underline font-medium">
            I know AWS → Teach me Azure / GCP
          </NavLink>
        </div>
      </aside>
    </>
  );
};
