
import React from 'react';
import { motion } from 'framer-motion';

const IntegrationsPage: React.FC = () => {
  const platforms = [
    { name: 'Azure OpenAI', type: 'Gateway Provider', status: 'Connected' },
    { name: 'AWS Bedrock', type: 'Model Broker', status: 'Authorized' },
    { name: 'Anthropic Core', type: 'Direct Integration', status: 'Pending' },
    { name: 'LangChain Orchestrator', type: 'Framework Hook', status: 'Connected' },
    { name: 'Enterprise ERP Z', type: 'Execution Target', status: 'Locked' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <header className="mb-20">
        <h2 className="text-4xl font-black font-display text-white tracking-tighter uppercase italic">Enterprise Sync</h2>
        <p className="text-slate-500 font-medium text-lg mt-2">Plugging Project Z into your autonomous execution pipeline.</p>
      </header>

      <div className="space-y-4">
        {platforms.map((p, i) => (
          <motion.div 
            key={p.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="tech-panel p-8 rounded-2xl flex items-center justify-between group hover:border-white/10"
          >
            <div className="flex items-center gap-8">
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 border border-white/5 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
              </div>
              <div>
                <h4 className="text-xl font-black font-display text-white italic uppercase">{p.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-1">{p.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'Connected' ? 'bg-blue-500' : 'bg-slate-700'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{p.status}</span>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-white transition-all">Config</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 tech-panel p-16 rounded-[3.5rem] bg-blue-600/5 border-blue-600/10">
        <h4 className="text-3xl font-black font-display text-white mb-6 italic uppercase">Integration Architecture</h4>
        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-12">
          Project Z sits as a proxy layer in your execution environment. By wrapping your model clients with our SDK, every proposed tool call or action is automatically intercepted for pre-execution verification.
        </p>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all">View API Documentation</button>
      </div>
    </div>
  );
};

export default IntegrationsPage;
