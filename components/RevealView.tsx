
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Decision } from '../types';

interface RevealViewProps {
  decision: Decision;
  onComplete: () => void;
}

const RevealView: React.FC<RevealViewProps> = ({ decision, onComplete }) => {
  const [traceId] = useState(() => Math.random().toString(16).slice(2, 10).toUpperCase());
  
  const isBlock = decision === 'BLOCK';
  const isEscalate = decision === 'ESCALATE';

  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getStatusConfig = () => {
    if (isBlock) return {
      label: 'PROTOCOL LOCKED',
      sub: 'EXECUTION TERMINATED',
      color: 'text-[#e11d48]',
      border: 'border-[#e11d48]/40',
      bg: 'bg-[#e11d48]/5',
      glow: 'shadow-[0_0_50px_rgba(225,29,72,0.15)]',
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    };
    if (isEscalate) return {
      label: 'ESCALATION ISSUED',
      sub: 'PENDING HUMAN TOKEN',
      color: 'text-[#f59e0b]',
      border: 'border-[#f59e0b]/40',
      bg: 'bg-[#f59e0b]/5',
      glow: 'shadow-[0_0_50px_rgba(245,158,11,0.15)]',
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    };
    return {
      label: 'GATEWAY OPEN',
      sub: 'PROCEED TO EXECUTION',
      color: 'text-[#10b981]',
      border: 'border-[#10b981]/40',
      bg: 'bg-[#10b981]/5',
      glow: 'shadow-[0_0_50px_rgba(16,185,129,0.15)]',
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    };
  };

  const config = getStatusConfig();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#020205]/98 backdrop-blur-3xl"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative flex flex-col items-center max-w-2xl w-full text-center px-12">
        {/* State Icon Container */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-48 h-48 mb-16 flex items-center justify-center rounded-[2rem] border-2 bg-[#0a0a0a] ${config.border} ${config.color} ${config.glow}`}
        >
          {config.icon}
          
          {/* Subtle Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className={`absolute left-0 w-full h-[1px] ${isBlock ? 'bg-rose-500/30' : 'bg-emerald-500/30'}`}
          />
        </motion.div>

        {/* Technical Labeling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-[11px] font-black font-mono tracking-[0.5em] text-slate-600 uppercase">
            Trace ID: {traceId} // Internal Governance Sequence
          </span>
        </motion.div>

        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`text-7xl font-black font-display mb-2 tracking-tighter italic uppercase ${config.color}`}
        >
          {config.label}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 font-bold tracking-[0.3em] uppercase text-sm mb-20"
        >
          {config.sub}
        </motion.p>

        {/* Finalizing Progress Bar */}
        <div className="w-80 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "linear" }}
            className={`h-full ${isBlock ? 'bg-[#e11d48]' : isEscalate ? 'bg-[#f59e0b]' : 'bg-[#10b981]'}`}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-6"
        >
          <span className="text-[9px] font-mono text-slate-700 tracking-widest uppercase">
            Writing to permanent audit flux...
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RevealView;
