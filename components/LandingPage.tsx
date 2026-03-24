
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface LandingPageProps {
  onLaunch: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="w-full bg-[#020205]">
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-12 py-10 flex items-center justify-between pointer-events-none">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-5 pointer-events-auto">
          <div className="w-11 h-11 bg-violet-600 rounded flex items-center justify-center shadow-lg shadow-violet-900/30">
            <span className="text-white font-black text-sm">Z</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white font-display uppercase italic">Project Z</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-14 pointer-events-auto">
          {['Governance', 'Automation', 'Control'].map((item, i) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-violet-400 transition-colors">{item}</a>
          ))}
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onLaunch} className="px-10 py-3 rounded-lg border border-white/5 hover:border-violet-500/40 bg-white/[0.02] transition-all clickable">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Initialize Hub</span>
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        <motion.div style={{ opacity }} className="relative z-10 max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} className="mb-14 inline-flex items-center gap-5 px-6 py-2.5 rounded-full border border-violet-500/20 bg-violet-500/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-violet-400">Governance Protocol Online</span>
          </motion.div>
          
          <h1 className="text-[10rem] md:text-[14rem] font-black font-display text-white mb-12 tracking-tighter leading-[0.85] italic uppercase relative">
            Project <span className="text-violet-600">Z</span>
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-medium text-slate-300 mb-14 font-display tracking-tight max-w-5xl mx-auto italic leading-tight">
            The intelligent layer between <span className="text-white font-black">intent</span> and <span className="text-white font-black">execution</span>.
          </h2>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-24 font-medium tracking-tight">
            Enterprise-grade supervision for automated systems. Preventing intent drift and unauthorized execution at the protocol level.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <button onClick={onLaunch} className="group relative bg-violet-600 text-white px-20 py-10 rounded-2xl font-black text-2xl tracking-tight hover:bg-violet-500 transition-all shadow-2xl shadow-violet-900/40 active:scale-95 flex items-center gap-8">
              <span>Initialize Command Center</span>
              <svg className="w-8 h-8 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </motion.div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,rgba(124,58,237,0.03)_0%,transparent_60%)] animate-pulse" />
        </div>
      </section>

      {/* WHY PROJECT Z IS DIFFERENT */}
      <section id="governance" className="py-60 px-8 border-t border-white/[0.02] bg-violet-600/[0.01]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-32 text-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-violet-500 mb-8 italic">The Differentiator</h2>
            <h3 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter italic uppercase">Control, <span className="text-violet-500">Not Detection.</span></h3>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="tech-panel p-16 rounded-[4rem] border-white/5">
              <h4 className="text-4xl font-black font-display text-white mb-8 italic uppercase underline decoration-violet-500 decoration-4 underline-offset-8">Pre-Execution Gate</h4>
              <p className="text-slate-400 text-2xl font-medium leading-relaxed">
                Most tools scan for scams after they land in your inbox. Project Z sits <span className="text-white">inside</span> the AI execution pipeline. If an AI proposes to delete a database or leak PII, we stop the signal before it reaches the target system.
              </p>
            </div>
            <div className="tech-panel p-16 rounded-[4rem] border-white/5">
              <h4 className="text-4xl font-black font-display text-white mb-8 italic uppercase underline decoration-violet-500 decoration-4 underline-offset-8">Intent-Aware Supervision</h4>
              <p className="text-slate-400 text-2xl font-medium leading-relaxed">
                We don't just look at code. We look at <span className="text-white">reason</span>. Project Z analyzes the semantic intent of the AI's proposal. If the intent deviates from the session's baseline, the gate locks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW COMPANIES USE PROJECT Z */}
      <section className="py-60 px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-32">
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-violet-500 mb-8 italic">Enterprise Workflow</h2>
            <h3 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter italic uppercase">Safe AI <span className="text-violet-500">at Scale.</span></h3>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Autonomous Ops", desc: "Allowing agents to handle scheduling and logistics with hard-gated financial thresholds." },
              { title: "Data Governance", desc: "Enforcing GDPR and PII boundaries across LLM-powered data retrieval systems." },
              { title: "Agentic Trust", desc: "Enabling high-privilege AI actions with mandatory human-in-the-loop escalation logic." }
            ].map((item, i) => (
              <motion.div key={i} className="tech-panel p-12 rounded-[3rem] border-white/5 group hover:border-violet-500/20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-500 mb-8 block">Case 0{i+1}</span>
                <h4 className="text-3xl font-black font-display text-white mb-8 tracking-tight italic uppercase">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed font-medium text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Cinematic Close */}
      <section className="py-80 px-8 text-center bg-violet-500/[0.01] border-t border-white/[0.02]">
         <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="relative z-10">
            <p className="text-6xl md:text-[9rem] font-black font-display text-white tracking-tighter mb-24 max-w-7xl mx-auto leading-[0.9] italic uppercase">
              Automation requires <br/><span className="text-violet-500">Governance</span>.
            </p>
            <button onClick={onLaunch} className="bg-white text-black px-24 py-10 rounded-[2.5rem] font-black text-3xl hover:bg-slate-100 transition-all shadow-2xl shadow-white/5 active:scale-95">Enter Command Hub</button>
         </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
