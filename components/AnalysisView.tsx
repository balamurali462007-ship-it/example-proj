
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalysisView: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const statusMessages = [
    "Evaluating execution intent...",
    "Scanning contextual baseline...",
    "Calculating risk surface...",
    "Verifying permission scope...",
    "Detecting intent drift...",
    "Synthesizing governance policy...",
    "Finalizing pre-execution check..."
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return Math.min(100, p + (Math.random() * 2));
      });
    }, 40);

    const stepTimer = setInterval(() => {
      setCurrentStep(s => (s < statusMessages.length - 1 ? s + 1 : s));
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden rounded-[3rem] glass border border-white/5">
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-1.5 mb-16 h-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [10, 60, 20] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              className="w-2 bg-emerald-500 rounded-full"
            />
          ))}
        </div>

        <div className="relative w-64 h-64 mb-12">
           <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-spin-slow" />
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black font-display">{Math.floor(progress)}%</span>
              <span className="text-[10px] uppercase tracking-widest font-black text-emerald-500 mt-2">Supervising</span>
           </div>
        </div>

        <div className="text-center w-full max-w-sm px-10">
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm font-mono text-slate-400 mb-6 h-4"
            >
              {statusMessages[currentStep]}
            </motion.p>
          </AnimatePresence>
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500" 
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
