
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '../types';

interface ResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onHistory: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onReset, onHistory }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);
  
  useEffect(() => {
    // Score reveal starts shortly after component mount
    const timer = setTimeout(() => {
      let start = 0;
      const end = result.riskScore;
      if (start === end) {
        setHasRevealed(true);
        return;
      }
      
      const duration = 1500; // Efficient reveal
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const counter = setInterval(() => {
        start += 1;
        setDisplayScore(start);
        if (start >= end) {
          clearInterval(counter);
          setHasRevealed(true);
        }
      }, stepTime);
      
      return () => clearInterval(counter);
    }, 400);

    return () => clearTimeout(timer);
  }, [result.riskScore]);

  const isDangerous = result.riskScore > 60;
  const isModerate = result.riskScore > 30 && result.riskScore <= 60;
  
  const accentColor = isDangerous ? 'red' : isModerate ? 'amber' : 'emerald';
  const colorMap = {
    red: { 
      bg: 'bg-red-500/10', 
      text: 'text-red-500', 
      border: 'border-red-500/40', 
      circle: 'stroke-red-500',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      badge: 'CRITICAL THREAT DETECTED'
    },
    amber: { 
      bg: 'bg-amber-500/10', 
      text: 'text-amber-500', 
      border: 'border-amber-500/40', 
      circle: 'stroke-amber-500',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      badge: 'CAUTION: SUSPICIOUS ACTIVITY'
    },
    emerald: { 
      bg: 'bg-emerald-500/10', 
      text: 'text-emerald-500', 
      border: 'border-emerald-500/40', 
      circle: 'stroke-emerald-500',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      badge: 'SECURITY CLEARANCE GRANTED'
    }
  };
  
  const colors = colorMap[accentColor];

  // Animation variants for staggered reveal
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="pb-20 pt-4"
    >
      {/* Primary Visual Hero: The Risk Score Gauge */}
      <motion.section variants={itemVariants} className="flex flex-col items-center justify-center mb-16 relative text-center">
        <div className="relative w-80 h-80 sm:w-96 sm:h-96">
          {/* Subtle Glow Ring */}
          <motion.div 
            animate={{ 
              boxShadow: hasRevealed ? `0 0 60px ${colors.text.replace('text-', '')}22` : "0 0 0px transparent",
              borderColor: hasRevealed ? colors.text.replace('text-', 'border-') : "rgba(255,255,255,0.05)"
            }}
            className="absolute inset-0 rounded-full border-2 transition-all duration-1000"
          />

          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#1e293b" strokeWidth="8" />
            <motion.circle 
              cx="50" cy="50" r="44" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="9" 
              initial={{ strokeDasharray: "0 277" }}
              animate={{ strokeDasharray: `${displayScore * 2.77} 277` }}
              transition={{ duration: 0.1, ease: "linear" }}
              strokeLinecap="round"
              className={`${colors.circle} transition-colors duration-500`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center">
              <span className={`text-[8rem] sm:text-[10rem] font-black font-display leading-none tracking-tighter ${colors.text}`}>
                {displayScore}
              </span>
              <span className="text-slate-500 font-black text-sm uppercase tracking-[0.4em] -mt-4 opacity-70">
                Risk Index
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Status Badge */}
        <motion.div 
          className={`mt-10 px-10 py-4 rounded-full border ${colors.border} ${colors.bg} backdrop-blur-md shadow-2xl relative overflow-hidden inline-flex`}
        >
          <div className="flex items-center gap-4 relative z-10">
            <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={colors.icon} />
            </svg>
            <span className={`text-xl font-black font-display tracking-tight uppercase ${colors.text}`}>
              {colors.badge}
            </span>
          </div>
        </motion.div>
      </motion.section>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Threat Explanation */}
        <motion.div 
          variants={itemVariants}
          className="glass rounded-[2.5rem] p-8 border border-white/5 relative group"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-display text-slate-200">Deconstructed Analysis</h3>
          </div>
          <p className={`text-lg leading-relaxed ${isDangerous ? 'text-white font-medium' : 'text-slate-300'}`}>
            {result.explanation}
          </p>
          <div className="mt-6 flex items-center gap-3">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Threat Type:</span>
             <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-slate-900 border border-white/5 ${colors.text}`}>
               {result.threatType}
             </span>
          </div>
        </motion.div>

        {/* Protective Action / Recommendation */}
        <motion.div 
          variants={itemVariants}
          className={`glass rounded-[2.5rem] p-8 border-2 ${colors.border} relative overflow-hidden group shadow-2xl`}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-current opacity-20" style={{ color: colors.text.replace('text-', '') }}></div>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-display text-slate-200">Guardian Recommendation</h3>
          </div>
          <div className={`p-6 rounded-3xl ${isDangerous ? 'bg-red-500/5' : 'bg-slate-900/40'} border border-white/5`}>
            <p className={`text-2xl font-black leading-tight tracking-tight ${isDangerous ? 'text-red-400' : 'text-slate-100'}`}>
              {result.recommendation}
            </p>
          </div>
          {isDangerous && (
            <div className="mt-4 flex items-center gap-2 text-red-500/80 font-black text-[10px] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              IMMEDIATE DEFENSIVE ACTION REQUIRED
            </div>
          )}
        </motion.div>

        {/* Safety Guidance Steps Section */}
        {result.safetySteps && result.safetySteps.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 glass rounded-[2.5rem] p-10 border border-white/5 shadow-inner"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black font-display text-white tracking-tight">Essential Safety Steps</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.safetySteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 flex flex-col gap-4 group hover:border-emerald-500/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 mt-12 justify-center max-w-2xl mx-auto"
      >
        <button 
          onClick={onReset}
          className="flex-1 bg-white text-slate-950 px-10 py-5 rounded-[1.5rem] font-black text-lg tracking-tight hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
        >
          New Analysis
        </button>
        <button 
          onClick={onHistory}
          className="flex-1 glass border border-white/10 text-white px-10 py-5 rounded-[1.5rem] font-black text-lg tracking-tight hover:bg-white/5 transition-all active:scale-95"
        >
          Security Logs
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ResultView;
