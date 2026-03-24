
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PerspectiveOverlayProps {
  onClose: () => void;
}

const PerspectiveOverlay: React.FC<PerspectiveOverlayProps> = ({ onClose }) => {
  const [tab, setTab] = useState<'everyone' | 'it'>('everyone');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl p-20 relative z-10 text-center"
      >
        <header className="mb-16">
          <h2 className="text-4xl font-black font-display glow-text mb-4 uppercase tracking-tighter">Project Z — Explained</h2>
          <div className="flex justify-center gap-8 mt-10">
            <button 
              onClick={() => setTab('everyone')}
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all pb-2 border-b-2 ${tab === 'everyone' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-600'}`}
            >
              For Everyone
            </button>
            <button 
              onClick={() => setTab('it')}
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all pb-2 border-b-2 ${tab === 'it' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-600'}`}
            >
              For IT Teams
            </button>
          </div>
        </header>

        <div className="min-h-[200px] flex items-center justify-center">
          <motion.p 
            key={tab}
            initial={{ opacity: 0, x: tab === 'everyone' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl text-slate-400 leading-relaxed font-medium tracking-tight max-w-2xl"
          >
            {tab === 'everyone' ? (
              "Project Z watches AI actions like a safety system. It stops unsafe behavior before it causes harm to people or organizations."
            ) : (
              "Project Z is a pre-execution AI governance layer that intercepts AI actions, evaluates intent and risk via multimodal analysis, and enforces cryptographic execution control."
            )}
          </motion.p>
        </div>

        <button 
          onClick={onClose}
          className="mt-20 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors"
        >
          Close Perspective
        </button>
      </motion.div>
    </div>
  );
};

export default PerspectiveOverlay;
