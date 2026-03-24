
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GovernanceReport } from '../types';

interface ReportViewProps {
  report: GovernanceReport;
  onReset: () => void;
  onHistory: () => void;
  onUpdateReport?: (updated: GovernanceReport) => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, onReset, onHistory, onUpdateReport }) => {
  const [explanationMode, setExplanationMode] = useState<'simple' | 'technical'>('simple');
  const [note, setNote] = useState(report.operator_notes || '');

  const isBlock = report.decision === 'BLOCK';
  const isEscalate = report.decision === 'ESCALATE';
  
  const colors = isBlock 
    ? { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/40', glow: 'shadow-red-500/20' } 
    : isEscalate 
      ? { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/40', glow: 'shadow-amber-500/20' }
      : { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', glow: 'shadow-emerald-500/20' };

  const bandColors = {
    'Stable': 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30 text-emerald-400',
    'Caution': 'from-amber-500/20 via-amber-500/5 to-transparent border-amber-500/30 text-amber-400',
    'Critical': 'from-red-500/20 via-red-500/5 to-transparent border-red-500/30 text-red-400'
  };

  const handleSaveNote = () => {
    if (onUpdateReport) {
      onUpdateReport({ ...report, operator_notes: note });
    }
  };

  return (
    <div className="pb-20 pt-4 space-y-12">
      {/* Header & Confidence Band */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className={`px-16 py-10 rounded-[3rem] border-2 ${colors.border} ${colors.bg} backdrop-blur-3xl shadow-2xl ${colors.glow} inline-flex flex-col items-center mb-10`}>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-6">Final Governance Decision</p>
          <h2 className={`text-7xl md:text-8xl font-black font-display tracking-tighter uppercase ${colors.text}`}>
            {report.decision}
          </h2>
        </div>

        {/* Confidence Band Indicator */}
        <div className={`px-10 py-4 rounded-full border bg-gradient-to-r ${bandColors[report.confidence_band]} flex items-center gap-4 shadow-2xl`}>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Confidence Profile:</span>
          <span className="text-lg font-black font-display tracking-tight uppercase">{report.confidence_band}</span>
          <div className="w-px h-4 bg-current opacity-20 mx-2" />
          <span className="text-sm font-bold opacity-80">{report.confidence_score}% Pattern Match</span>
        </div>
      </motion.section>

      {/* Decision Trace Panel */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-[3rem] p-12 border border-white/5 shadow-2xl"
      >
        <div className="flex items-center gap-5 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 4h.01M9 16h.01" /></svg>
          </div>
          <h3 className="text-2xl font-black font-display text-white tracking-tight">Audit Decision Trace</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-white/[0.05] -z-0" />
          
          {report.trace.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col gap-5">
              <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-2 bg-slate-950 transition-all duration-500 ${
                step.status === 'normal' ? 'border-emerald-500/30 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]' :
                step.status === 'warning' ? 'border-amber-500/30 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' :
                'border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
              }`}>
                {step.status === 'normal' ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                )}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{step.label}</p>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}

          <div className="relative z-10 flex flex-col gap-5">
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-4 bg-slate-950 ${colors.border} ${colors.text} shadow-2xl`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Gate Status</p>
              <p className={`text-sm font-black uppercase tracking-widest ${colors.text}`}>{report.decision} ISSUED</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Reasoning & Operator Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[3rem] p-12 border border-white/5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 border border-white/5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-black font-display text-white tracking-tight">Governance Analysis</h3>
            </div>

            <div className="flex bg-slate-900/50 rounded-xl p-1.5 border border-white/5">
              <button 
                onClick={() => setExplanationMode('simple')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${explanationMode === 'simple' ? 'bg-slate-700 text-white shadow-xl' : 'text-slate-500'}`}
              >
                Simple
              </button>
              <button 
                onClick={() => setExplanationMode('technical')}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${explanationMode === 'technical' ? 'bg-slate-700 text-white shadow-xl' : 'text-slate-500'}`}
              >
                Technical
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={explanationMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-2xl text-slate-200 leading-relaxed font-medium flex-1 tracking-tight"
            >
              {explanationMode === 'simple' ? report.reason : report.reason_technical}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`glass rounded-[3rem] p-12 border-2 ${colors.border} relative overflow-hidden flex flex-col shadow-2xl`}
        >
          <div className="flex items-center gap-5 mb-10">
            <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text} border border-current opacity-60`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
            <h3 className="text-2xl font-black font-display text-white tracking-tight">Recommended Protocol</h3>
          </div>
          <div className="bg-slate-950/50 p-10 rounded-[2rem] border border-white/5 mb-10 shadow-inner">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-3">Primary Directive:</p>
             <p className={`text-4xl font-black font-display tracking-tighter uppercase ${colors.text}`}>
               {report.recommended_next_step.replace('_', ' ')}
             </p>
          </div>

          <div className="mt-auto space-y-4">
             <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Operator Audit Perspective</label>
             <div className="relative group">
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={handleSaveNote}
                  placeholder="Attach business context or escalation details for permanent audit..."
                  className="w-full bg-slate-950/50 border border-white/5 rounded-3xl px-6 py-5 text-base text-slate-300 focus:outline-none focus:border-white/20 resize-none h-32 transition-all"
                />
                {note !== report.operator_notes && (
                  <button 
                    onClick={handleSaveNote}
                    className="absolute bottom-5 right-5 text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    Commit Note
                  </button>
                )}
             </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-6 mt-16 justify-center max-w-2xl mx-auto"
      >
        <button 
          onClick={onReset}
          className="flex-1 bg-white text-slate-950 px-12 py-6 rounded-[2rem] font-black text-xl tracking-tight hover:scale-105 transition-all shadow-2xl shadow-white/5"
        >
          New Analysis
        </button>
        <button 
          onClick={onHistory}
          className="flex-1 glass border border-white/10 text-white px-12 py-6 rounded-[2rem] font-black text-xl tracking-tight hover:bg-white/5 transition-all"
        >
          Audit History
        </button>
      </motion.div>
    </div>
  );
};

export default ReportView;
