
import React from 'react';
import { motion } from 'framer-motion';
import { GovernanceSignal } from '../types';

interface ControlCoreProps {
  signals: GovernanceSignal[];
  onSignalSelect: (s: GovernanceSignal) => void;
  isProcessing: boolean;
  onInitiate: () => void;
  explainMode: boolean;
}

const ControlCore: React.FC<ControlCoreProps> = ({ signals, onSignalSelect, isProcessing, onInitiate, explainMode }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* The Central Reactor: "Synapse Hub" */}
      <div className="relative z-10 mb-20">
        <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Orchestrated Telemetry Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-violet-500/20 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-white/5 rounded-full"
            />
            
            {/* The Command Core */}
            <motion.div 
              animate={{ 
                scale: isProcessing ? [1, 1.01, 1] : 1,
                borderColor: isProcessing ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255, 255, 255, 0.05)'
              }}
              className={`w-72 h-72 rounded-[3.5rem] tech-panel flex flex-col items-center justify-center cursor-pointer relative interact-hover interact-click transition-colors ${isProcessing ? 'vfx-pulse-violet' : ''}`}
              onClick={onInitiate}
            >
              <div className="text-center relative z-10 pointer-events-none">
                <span className="text-[11px] font-black text-violet-500/60 uppercase tracking-[0.6em] block mb-4 italic">Baseline Core</span>
                <h2 className="text-4xl font-black font-display tracking-tighter text-[#E0E0E0] mb-3 italic uppercase">Project Z</h2>
                <div className="w-12 h-1 bg-violet-600/30 mx-auto rounded-full shadow-[0_0_15px_rgba(124,58,237,0.3)]" />
              </div>

              {/* Internal Ingestion Visualizer */}
              <div className="absolute inset-0 overflow-hidden rounded-[3.5rem] opacity-20 pointer-events-none">
                {isProcessing && [...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [-150, 400] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-40 bg-gradient-to-b from-transparent via-violet-400 to-transparent"
                  />
                ))}
              </div>
            </motion.div>
        </div>
      </div>

      {/* Orbiting Execution Vectors */}
      <div className="absolute inset-0 pointer-events-none">
        {signals.map((s, idx) => {
          const angle = (idx * 22) % 360;
          return (
            <SignalVector 
              key={s.id} 
              signal={s} 
              angle={angle} 
              onSelect={onSignalSelect} 
            />
          );
        })}
      </div>

      {/* Execution Trigger */}
      <div className="relative z-20">
        <button 
          onClick={onInitiate}
          className="group relative px-16 py-8 rounded-[2rem] tech-panel border-white/5 overflow-hidden interact-click shadow-2xl hover:border-violet-500/20"
        >
          <div className="flex items-center gap-6">
            <div className="w-3 h-3 bg-violet-600 rounded-sm rotate-45 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-[#E0E0E0] transition-colors italic">
              Ingest Execution Signal
            </span>
          </div>
        </button>
      </div>

      {/* Passive Telemetry Background */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-2 opacity-40">
        <div className="text-[9px] font-black text-slate-800 uppercase tracking-[0.4em]">Node Connectivity</div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-1 bg-violet-600/30 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

const SignalVector: React.FC<{ signal: GovernanceSignal; angle: number; onSelect: (s: GovernanceSignal) => void }> = ({ signal, angle, onSelect }) => {
  const isAllow = signal.decision === 'ALLOW';
  const isEscalate = signal.decision === 'ESCALATE';
  const distance = 350 + (signal.risk_score * 2);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-1/2 left-1/2 origin-left pointer-events-auto"
      style={{ rotate: `${angle}deg`, width: distance }}
    >
      <div 
        onClick={() => onSelect(signal)}
        className="absolute right-0 top-1/2 -translate-y-1/2 group cursor-pointer"
      >
        <div className={`w-3.5 h-3.5 rounded-sm rotate-45 transition-all duration-700 border border-white/10 ${
          isAllow ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 
          isEscalate ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' :
          'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.5)]'
        } group-hover:scale-150`} />
        
        <div className="absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 tech-panel px-6 py-3 rounded-2xl whitespace-nowrap z-50 border-white/10 shadow-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] italic text-[#E0E0E0]">
            <span className={isAllow ? 'text-emerald-400' : isEscalate ? 'text-amber-500' : 'text-rose-500'}>
              {signal.decision}
            </span> :: {signal.intent.slice(0, 20)}...
          </p>
        </div>
      </div>
      
      <div className="h-[1px] w-full absolute top-1/2 -translate-y-1/2 -z-10 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.08]" />
    </motion.div>
  );
};

export default ControlCore;
