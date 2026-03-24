
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: ViewState.LIVING_PLANE, label: 'Execution Hub', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: ViewState.AUDIT_LOGS, label: 'Audit Flux', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: ViewState.POLICY_CENTER, label: 'Policy Center', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: ViewState.INTEGRATIONS, label: 'Integrations', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
    { id: ViewState.ABOUT_RESEARCH, label: 'Z Research', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.27a1.912 1.912 0 01-2.158-.276l-.214-.214a2.531 2.531 0 00-3.58 0l-.143.143a2.708 2.708 0 01-3.83 0V4a2 2 0 012-2h15a2 2 0 012 2v15a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3.572z' },
  ];

  return (
    <aside className="w-24 lg:w-72 border-r border-white/5 flex flex-col h-full bg-[#030305]/80 backdrop-blur-3xl z-50">
      <div className="p-10 flex items-center justify-center lg:justify-start gap-5">
        <div onClick={() => onNavigate(ViewState.LANDING)} className="w-11 h-11 bg-violet-600 rounded flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-lg shadow-violet-900/30 hover:bg-violet-500">
          <span className="text-white font-black text-xl">Z</span>
        </div>
        <div className="hidden lg:flex flex-col">
          <span className="text-lg font-black tracking-tighter text-white font-display uppercase italic leading-none">Project Z</span>
          <span className="text-[8px] font-black tracking-[0.4em] text-slate-600 uppercase mt-1">Supervision Core</span>
        </div>
      </div>

      <nav className="flex-1 px-6 py-12 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center justify-center lg:justify-start gap-5 px-5 py-4 rounded-xl transition-all group relative ${
              currentView === item.id ? 'bg-white/5 text-white shadow-inner' : 'text-slate-500 hover:text-violet-300 hover:bg-violet-500/5'
            }`}
          >
            <svg className={`w-6 h-6 transition-transform group-hover:scale-110 ${currentView === item.id ? 'text-violet-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="hidden lg:block font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
