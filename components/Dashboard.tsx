
import React from 'react';
import { motion } from 'framer-motion';
import { GovernanceReport } from '../types';

interface DashboardProps {
  onStartIngest: () => void;
  history: GovernanceReport[];
}

const Dashboard: React.FC<DashboardProps> = ({ onStartIngest, history }) => {
  const historyCount = history.length;
  const isHealthy = history.filter(h => h.decision === 'BLOCK').length / (historyCount || 1) < 0.2;

  return (
    <div>
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 tracking-tight font-display"
          >
            Control Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-lg"
          >
            Enterprise-grade AI execution supervision and risk prevention.
          </motion.p>
        </div>

        {/* System State Summary Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-6"
        >
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Global State</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'} animate-pulse`} />
              <span className={`text-sm font-bold ${isHealthy ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isHealthy ? 'Stable' : 'Observation Mode'}
              </span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Reviews Today</span>
            <span className="text-sm font-bold text-white">{historyCount}</span>
          </div>
        </motion.div>
      </header>

      <motion.div 
        whileHover={{ scale: 1.005 }}
        className="glass rounded-[2rem] p-10 relative overflow-hidden mb-8 border border-white/10 group transition-all duration-500 hover:border-emerald-500/30"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative flex-shrink-0">
            <div className="w-48 h-48 rounded-3xl border border-emerald-500/20 flex items-center justify-center relative bg-slate-900/40">
              <svg className="w-20 h-20 text-emerald-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="absolute inset-4 border border-emerald-500/10 rounded-2xl animate-pulse" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3 font-display tracking-tight text-white">Governance Status: Ready</h2>
            <p className="text-slate-400 mb-8 max-w-md">Ingest AI-proposed actions for pre-execution evaluation. Project Z prevents intent drift and unauthorized scope expansion.</p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartIngest}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all flex items-center gap-3 mx-auto md:mx-0 group text-lg"
            >
              <span>Analyze AI Action</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Actions Governed', val: historyCount, color: 'text-white' },
          { label: 'Risks Prevented', val: historyCount > 0 ? history.filter(h => h.decision === 'BLOCK').length : 0, color: 'text-emerald-400' },
          { label: 'System Uptime', val: '99.998%', color: 'text-slate-400' }
        ].map((card, i) => (
          <motion.div 
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass p-6 rounded-3xl border border-white/5"
          >
            <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">{card.label}</p>
            <p className={`text-2xl font-bold font-display ${card.color}`}>{card.val}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
