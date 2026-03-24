
import React from 'react';
import { motion } from 'framer-motion';

const ResearchPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <header className="mb-24 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-500 mb-8 italic">Research & Thesis</h2>
        <h3 className="text-6xl md:text-8xl font-black font-display text-white tracking-tighter italic uppercase leading-[0.85] mb-12">
          Gating the <br/><span className="text-blue-500">Autonomous</span> Wave.
        </h3>
        <p className="text-2xl text-slate-500 max-w-3xl mx-auto font-medium tracking-tight">
          How Project Z redefined pre-execution governance for the agentic age.
        </p>
      </header>

      <div className="space-y-16">
        <section className="tech-panel p-16 rounded-[4rem] border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10">
            <span className="text-[100px] font-black text-white/[0.02] leading-none tracking-tighter select-none">01</span>
          </div>
          <div className="relative z-10 max-w-4xl">
            <h4 className="text-4xl font-black font-display text-white mb-10 italic uppercase underline decoration-blue-500 decoration-4 underline-offset-8">Intent vs. Syntax</h4>
            <p className="text-xl text-slate-400 leading-relaxed font-medium italic">
              Legacy security tools analyze syntax—signatures of known malware or phishing strings. In an AI world, actions look "valid" but the intent is drifted. Project Z deconstructs the semantic intent behind an action, comparing it to the session baseline to detect unauthorized behavior before it triggers an API call.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="tech-panel p-12 rounded-[3rem] border-white/5 bg-white/[0.01]">
            <h5 className="text-2xl font-black font-display text-white mb-6 italic uppercase">The Trust Gap</h5>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              We identified that the biggest risk in AI isn't the model's output—it's the automation's reach. Project Z was built to bridge the gap between "what the model thinks it should do" and "what the business allows to happen."
            </p>
          </div>
          <div className="tech-panel p-12 rounded-[3rem] border-white/5 bg-white/[0.01]">
            <h5 className="text-2xl font-black font-display text-white mb-6 italic uppercase">Future Parity</h5>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              As AI agents become cross-platform, Project Z provides a unified control plane. One policy, enforced across every model provider, agent framework, and internal system.
            </p>
          </div>
        </section>

        <section className="py-32 text-center border-t border-white/5">
           <h4 className="text-4xl font-black font-display text-white mb-8 italic uppercase">Research Collaborators</h4>
           <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
             <span>Z-Intelligence Labs</span>
             <span>Safe Agentic Network</span>
             <span>Deterministic AI Foundation</span>
           </div>
        </section>
      </div>
    </div>
  );
};

export default ResearchPage;
