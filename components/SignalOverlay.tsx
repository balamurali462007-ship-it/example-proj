
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GovernanceSignal } from '../types';

interface SignalOverlayProps {
  signal: GovernanceSignal;
  onClose: () => void;
}

const SignalOverlay: React.FC<SignalOverlayProps> = ({ signal, onClose }) => {
  const [isResolved, setIsResolved] = useState(false);
  const isBlock = signal.decision === 'BLOCK';
  const isEscalate = signal.decision === 'ESCALATE';

  useEffect(() => {
    const timer = setTimeout(() => setIsResolved(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = () => {
    if (isBlock) return 'text-[#e11d48]';
    if (isEscalate) return 'text-[#f59e0b]';
    return 'text-[#10b981]';
  };

  const getStatusBorder = () => {
    if (isBlock) return 'border-[#e11d48]/20';
    if (isEscalate) return 'border-[#f59e0b]/20';
    return 'border-[#10b981]/20';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl pointer-events-auto" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        className={`w-full max-w-3xl tech-panel p-16 rounded-[4rem] shadow-[0_40px_120px_rgba(0,0,0,1)] pointer-events-auto relative overflow-hidden ${signal.ui_vfx_trigger === 'shatter_red' ? 'vfx-shatter' : ''}`}
      >
        <div className={`absolute -top-64 -left-64 w-[40rem] h-[40rem] blur-[200px] opacity-10 rounded-full transition-colors duration-1000 ${
          isBlock ? 'bg-rose-600' : isEscalate ? 'bg-amber-600' : 'bg-emerald-600'
        }`} />

        <div className="relative z-10">
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-8">
              <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center border-2 ${getStatusBorder()} ${getStatusColor()} rotate-45 bg-black/40`}>
                <svg className="w-10 h-10 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 italic mb-2 block">Core Governance Node</span>
                <h2 className={`text-5xl font-black font-display uppercase tracking-tight italic ${getStatusColor()}`}>
                    {signal.decision}
                </h2>
              </div>
            </div>
            <button onClick={onClose} className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all border border-white/5 interact-hover">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>

          <div className="space-y-16">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 italic">Shadow Execution Intent</label>
              <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl italic">
                <p className="text-2xl font-black font-display text-slate-200 leading-tight">"{signal.intent}"</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 block mb-3">Intent Match</span>
                 <p className={`text-4xl font-black font-display italic ${signal.analysis.intent_match === 'High' ? 'text-emerald-400' : signal.analysis.intent_match === 'Low' ? 'text-rose-500' : 'text-amber-500'}`}>
                   {signal.analysis.intent_match}
                 </p>
               </div>
               <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 block mb-3">Risk Index</span>
                 <p className={`text-4xl font-black font-display italic ${getStatusColor()}`}>{signal.risk_score}</p>
               </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 italic">Security Logic & Reasoning</span>
                <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">GATEWAY_PROCESSED_SUCCESS</div>
              </div>
              <div className="text-xl text-slate-400 leading-relaxed font-medium italic border-l-2 border-white/5 pl-8">
                {signal.analysis.reasoning}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Recommended Action:</span>
                <span className={`text-xs font-black uppercase tracking-[0.3em] font-mono ${getStatusColor()}`}>
                  {signal.recommended_action.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Anomaly Trace:</span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  {signal.analysis.detected_anomaly}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignalOverlay;
